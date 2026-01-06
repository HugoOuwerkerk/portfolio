# Gebruik een lichte Node.js versie
FROM node:20-alpine AS runner
WORKDIR /app

# Kopieer de package bestanden en installeer alles
COPY package*.json ./
RUN npm install

# Kopieer de rest van je code en bouw de site
COPY . .
RUN npm run build

# De poort waarop Next.js draait
EXPOSE 3000

# Start de applicatie
CMD ["npm", "start"]
