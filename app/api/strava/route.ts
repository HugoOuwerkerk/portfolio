import { NextResponse } from "next/server";

const {
    STRAVA_CLIENT_ID,
    STRAVA_CLIENT_SECRET,
    STRAVA_REFRESH_TOKEN,
} = process.env;

const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const ACTIVITIES_ENDPOINT = "https://www.strava.com/api/v3/athlete/activities";

async function getAccessToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            refresh_token: STRAVA_REFRESH_TOKEN,
            grant_type: "refresh_token",
        }),
    });

    return response.json();
}

async function getActivities(accessToken: string) {
    const response = await fetch(`${ACTIVITIES_ENDPOINT}?per_page=1`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.json();
}

export async function GET() {
    if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
        return NextResponse.json({ error: "Missing Strava credentials" }, { status: 500 });
    }

    try {
        const tokenData = await getAccessToken();

        if (tokenData.errors) {
            console.error("Strava Token Error:", tokenData);
            return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
        }

        const accessToken = tokenData.access_token;
        const activities = await getActivities(accessToken);

        if (!Array.isArray(activities)) {
            console.error("Strava API returned non-array:", activities);
            return NextResponse.json({ error: "Failed to fetch activities. Check server logs." }, { status: 500 });
        }

        if (activities.length === 0) {
            return NextResponse.json({ message: "No recent activities found" });
        }

        const latestActivity = activities[0];

        const seconds = latestActivity.moving_time;
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const timeString = h > 0 ? `${h}h ${m}m` : `${m}m`;

        const formattedData = {
            type: latestActivity.sport_type || latestActivity.type,
            name: latestActivity.name,
            distance: (latestActivity.distance / 1000).toFixed(1),
            time: timeString,
            calories: latestActivity.kilojoules ? Math.round(latestActivity.kilojoules) : "N/A",
            date: new Date(latestActivity.start_date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            heartRate: latestActivity.average_heartrate ? Math.round(latestActivity.average_heartrate) : "N/A",
            elevation: latestActivity.total_elevation_gain ? Math.round(latestActivity.total_elevation_gain) + "m" : "N/A",
            pace: latestActivity.average_speed ? (16.666666666667 / latestActivity.average_speed).toFixed(2).replace('.', ':') + " /km" : "N/A",
            mapPolyline: latestActivity.map?.summary_polyline || null,
        };

        return NextResponse.json(formattedData);
    } catch (error) {
        console.error("Strava API Error:", error);
        return NextResponse.json({ error: "Failed to fetch Strava data" }, { status: 500 });
    }
}
