"use client";

import React, { useState, useEffect, useRef } from 'react';
import { fileSystem, FileSystemItem } from './FileSystem';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Mail, Phone, Github, Linkedin, Cpu, User, Layers } from 'lucide-react';

type HistoryItem = {
    type: 'input' | 'output' | 'error';
    content: string;
    path?: string;
};

const Typewriter = ({ text }: { text: string }) => (
    <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.01 }}
    >
        {text}
    </motion.span>
);

export default function Shell() {
    const [history, setHistory] = useState<HistoryItem[]>([
        { type: 'output', content: 'Initializing Kernel... OK' },
        { type: 'output', content: 'Loading Modules... OK' },
        { type: 'output', content: 'Welcome to HugoOS v1.0. Type "help" to start.' }
    ]);
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [viewMode, setViewMode] = useState<{ file: string; meta: any } | null>(null);

    // Command History State
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, input]);

    useEffect(() => {
        const handleClick = () => !viewMode && inputRef.current?.focus();
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [viewMode]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (viewMode && (e.key === 'Escape' || e.key.toLowerCase() === 'x' || e.key.toLowerCase() === 'q')) {
                setViewMode(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [viewMode]);

    const getDirectory = (path: string[]): Record<string, FileSystemItem> | null => {
        let current: any = fileSystem;
        for (const segment of path) {
            if (current[segment] && current[segment].type === 'folder') {
                current = current[segment].children;
            } else {
                return null;
            }
        }
        return current;
    };

    const currentPathString = currentPath.length === 0 ? '~' : `~/${currentPath.join('/')}`;

    const handleCommand = (cmdStr: string) => {
        const trimmed = cmdStr.trim();
        if (!trimmed) {
            setHistory(prev => [...prev, { type: 'input', content: '', path: currentPathString }]);
            return;
        }

        // Save to command history
        setCommandHistory(prev => [...prev, trimmed]);
        setHistoryIndex(-1);

        const [cmd, ...args] = trimmed.split(' ');
        const arg = args.join(' ');

        const newHistory: HistoryItem[] = [...history, { type: 'input', content: trimmed, path: currentPathString }];
        const addToHistory = (type: 'output' | 'error', content: string) => newHistory.push({ type, content });

        switch (cmd.toLowerCase()) {
            case 'help':
                addToHistory('output', `
AVAILABLE COMMANDS:
  ls           List files in current directory
  cd [dir]     Change directory
  cat [file]   Read file content
  view [file]  Open file in graphic mode
  clear        Clear screen
  open [url]   Open external URL
  whoami       Display user info
`);
                break;

            case 'clear':
                setHistory([]);
                setInput('');
                return;

            case 'ls':
            case 'll':
                const dir = getDirectory(currentPath);
                if (dir) {
                    const items = Object.entries(dir).map(([key, item]) =>
                        item.type === 'folder' ? `[${key}/]` : key
                    );
                    addToHistory('output', items.join('   '));
                } else {
                    addToHistory('error', 'Error: Corrupted directory.');
                }
                break;

            case 'cd':
                if (!arg || arg === '~') setCurrentPath([]);
                else if (arg === '..') setCurrentPath(prev => prev.slice(0, -1));
                else {
                    const d = getDirectory(currentPath);
                    if (d && d[arg] && d[arg].type === 'folder') setCurrentPath(prev => [...prev, arg]);
                    else addToHistory('error', `cd: no such directory: ${arg}`);
                }
                break;

            case 'cat':
                const dCat = getDirectory(currentPath);
                if (dCat && dCat[arg]) {
                    if (dCat[arg].type === 'file') addToHistory('output', dCat[arg].content || '');
                    else addToHistory('error', `cat: ${arg}: Is a directory`);
                } else addToHistory('error', `cat: ${arg}: No such file`);
                break;

            case 'view':
            case 'show':
                const dView = getDirectory(currentPath);
                if (dView && dView[arg]) {
                    const item = dView[arg];
                    if (item.type === 'file' && item.meta) {
                        setViewMode({ file: arg, meta: item.meta });
                        addToHistory('output', `Launching Viewer for ${arg}...`);
                    } else if (item.type === 'file') {
                        addToHistory('error', `view: ${arg}: No graphic data. Use cat.`);
                    } else {
                        addToHistory('error', `view: ${arg}: Is a directory`);
                    }
                } else {
                    addToHistory('error', `view: ${arg}: No such file`);
                }
                break;

            case 'open':
                if (arg) {
                    addToHistory('output', `Opening ${arg}...`);
                    window.open(arg.startsWith('http') ? arg : `https://${arg}`, '_blank');
                } else addToHistory('error', 'Usage: open [url]');
                break;

            case 'whoami':
                addToHistory('output', 'guest@hugo.dev');
                break;

            default:
                addToHistory('error', `Command not found: ${cmd}`);
        }

        setHistory(newHistory);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); // Prevent cursor move
            if (commandHistory.length > 0) {
                let newIdx = historyIndex;
                if (historyIndex === -1) { // Currently typing new command, go to most recent
                    newIdx = commandHistory.length - 1;
                } else { // Go back in history
                    newIdx = Math.max(0, historyIndex - 1);
                }

                setHistoryIndex(newIdx);
                setInput(commandHistory[newIdx] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) { // Only navigate down if currently in history
                const newIdx = historyIndex + 1;
                if (newIdx >= commandHistory.length) { // Went past the end of history, back to new command
                    setHistoryIndex(-1);
                    setInput('');
                } else { // Go forward in history
                    setHistoryIndex(newIdx);
                    setInput(commandHistory[newIdx] || '');
                }
            }
        }
    };

    // --- RENDERERS FOR VIEW MODAL ---

    const renderProject = (meta: any) => (
        <div className="grid md:grid-cols-2 gap-8 h-full">
            <div className="flex flex-col justify-center">
                {meta.image ? (
                    <div className="aspect-video relative rounded-lg border-2 border-[#00ff41] overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.2)] group">
                        <img src={meta.image} alt={meta.title} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    </div>
                ) : (
                    <div className="aspect-video bg-[#00ff41]/5 flex items-center justify-center border border-[#00ff41]/30 text-[#00ff41]">NO_IMAGE</div>
                )}
            </div>
            <div className="flex flex-col justify-center space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{meta.title}</h2>
                    <p className="text-[#00ff41] font-mono text-sm tracking-wider">{meta.subtitle}</p>
                    {meta.description && (
                        <p className="text-gray-300 mt-4 leading-relaxed text-sm md:text-base border-l-2 border-[#00ff41]/50 pl-4">
                            {meta.description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-[#00ff41]/30 pt-4">
                    {meta.details && Object.entries(meta.details).map(([k, v]: any) => (
                        <div key={k}>
                            <span className="text-gray-500 text-xs block mb-1 uppercase tracking-widest">{k}</span>
                            <span className="text-white font-mono text-sm">{v}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    {meta.stack?.map((s: string) => (
                        <span key={s} className="px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] text-xs font-bold rounded">{s}</span>
                    ))}
                </div>

                {meta.link && (
                    <a href={meta.link} target="_blank" className="inline-flex items-center gap-2 bg-[#00ff41] text-black font-bold px-6 py-3 rounded hover:bg-[#00cc33] transition-colors w-max shadow-[0_0_15px_rgba(0,255,65,0.4)]">
                        Launch Project <ExternalLink size={16} />
                    </a>
                )}
            </div>
        </div>
    );

    const renderAbout = (meta: any) => (
        <div className="flex flex-col items-center justify-start h-full text-center space-y-8 max-w-3xl mx-auto w-full">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-full border-2 border-[#00ff41] flex items-center justify-center bg-[#00ff41]/10 shadow-[0_0_30px_rgba(0,255,65,0.3)]">
                    <User size={64} className="text-[#00ff41]" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2">{meta.title}</h2>
                    <p className="text-[#00ff41] font-mono text-lg">{meta.subtitle}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-left w-full border-y border-[#00ff41]/30 py-8">
                {meta.details && Object.entries(meta.details).map(([k, v]: any) => (
                    <div key={k}>
                        <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">{k}</div>
                        <div className="text-white font-medium">{v}</div>
                    </div>
                ))}
            </div>

            {meta.timeline && (
                <div className="w-full text-left space-y-6 pb-8">
                    <h3 className="text-[#00ff41] font-bold text-xl mb-4 border-b border-[#00ff41]/30 pb-2">Experience Log</h3>
                    <div className="space-y-8 border-l border-[#00ff41]/30 ml-2 pl-6 relative">
                        {meta.timeline.map((item: any, idx: number) => (
                            <div key={idx} className="relative">
                                {/* Dot */}
                                <div className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-[#0d0d0d] ${idx === 0 ? 'bg-[#00ff41] animate-pulse' : 'bg-[#00ff41]/50'}`} />

                                <div className="flex flex-col md:flex-row gap-2 mb-1 items-baseline">
                                    <span className="text-[#00ff41] font-mono text-xs">{item.date}</span>
                                    <h4 className="text-white font-bold text-lg flex items-center gap-2">
                                        {item.title}
                                        {item.badge && <span className="bg-[#00ff41] text-black text-[10px] px-2 py-0.5 rounded font-bold">{item.badge}</span>}
                                    </h4>
                                </div>
                                <div className="text-gray-400 text-sm mb-2">{item.role}</div>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xl">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderStack = (meta: any) => (
        <div className="space-y-8 h-full flex flex-col justify-center">
            <div className="text-center mb-4">
                <Cpu size={48} className="text-[#00ff41] mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white">{meta.title}</h2>
                <p className="text-gray-400 font-mono text-sm">{meta.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {meta.details && Object.entries(meta.details).map(([cat, items]: any) => (
                    <div key={cat} className="bg-[#00ff41]/5 border border-[#00ff41]/20 p-4 rounded-lg">
                        <h3 className="text-[#00ff41] font-bold mb-4 border-b border-[#00ff41]/20 pb-2">{cat}</h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map((item: string) => (
                                <span key={item} className="text-white text-sm bg-black/50 px-2 py-1 rounded border border-gray-800">{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContact = (meta: any) => (
        <div className="flex flex-col justify-center h-full space-y-12 max-w-2xl mx-auto w-full">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-2">{meta.title}</h2>
                <p className="text-[#00ff41] font-mono">{meta.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <a href={`mailto:${meta.details.Email}`} className="flex items-center gap-6 p-4 border border-[#00ff41]/30 rounded-lg hover:bg-[#00ff41]/10 transition-colors group">
                    <div className="p-3 bg-[#00ff41]/20 rounded-full text-[#00ff41]"><Mail size={24} /></div>
                    <div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest">Email</div>
                        <div className="text-white font-bold group-hover:text-[#00ff41] transition-colors">{meta.details.Email}</div>
                    </div>
                </a>
                <a href={`tel:${meta.details.Phone}`} className="flex items-center gap-6 p-4 border border-[#00ff41]/30 rounded-lg hover:bg-[#00ff41]/10 transition-colors group">
                    <div className="p-3 bg-[#00ff41]/20 rounded-full text-[#00ff41]"><Phone size={24} /></div>
                    <div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest">Phone</div>
                        <div className="text-white font-bold group-hover:text-[#00ff41] transition-colors">{meta.details.Phone}</div>
                    </div>
                </a>
                <a href={`https://${meta.details.GitHub}`} target="_blank" className="flex items-center gap-6 p-4 border border-[#00ff41]/30 rounded-lg hover:bg-[#00ff41]/10 transition-colors group">
                    <div className="p-3 bg-[#00ff41]/20 rounded-full text-[#00ff41]"><Github size={24} /></div>
                    <div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest">GitHub</div>
                        <div className="text-white font-bold group-hover:text-[#00ff41] transition-colors">/HugoOuwerkerk</div>
                    </div>
                </a>
                <a href={`https://${meta.details.LinkedIn}`} target="_blank" className="flex items-center gap-6 p-4 border border-[#00ff41]/30 rounded-lg hover:bg-[#00ff41]/10 transition-colors group">
                    <div className="p-3 bg-[#00ff41]/20 rounded-full text-[#00ff41]"><Linkedin size={24} /></div>
                    <div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest">LinkedIn</div>
                        <div className="text-white font-bold group-hover:text-[#00ff41] transition-colors">/in/hugo-ouwerkerk</div>
                    </div>
                </a>
            </div>
        </div>
    );

    const renderContent = () => {
        if (!viewMode) return null;
        switch (viewMode.meta.type) {
            case 'project': return renderProject(viewMode.meta);
            case 'about': return renderAbout(viewMode.meta);
            case 'stack': return renderStack(viewMode.meta);
            case 'contact': return renderContact(viewMode.meta);
            default: return renderProject(viewMode.meta); // Fallback
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] font-mono text-[#00ff41] p-4 md:p-8 text-sm md:text-base leading-relaxed overflow-hidden selection:bg-[#003b00] selection:text-white relative">

            {/* CRT Overlay Effects */}
            <div className="pointer-events-none fixed inset-0 z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            <div className="pointer-events-none fixed inset-0 z-30 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] opacity-80" />

            {/* Content Container */}
            <div className={`max-w-4xl mx-auto relative z-10 transition-opacity duration-300 ${viewMode ? 'opacity-0 blur-md pointer-events-none' : 'opacity-100'}`}>
                {/* History */}
                <div className="mb-4 space-y-3">
                    {history.map((item, i) => (
                        <div key={i} className="break-words font-normal">
                            {item.type === 'input' ? (
                                <div className="text-white/90 mt-6 mb-2">
                                    <span className="mr-3 text-[#00ff41] font-bold">{item.path || '~'}$</span>
                                    <span>{item.content}</span>
                                </div>
                            ) : (
                                <div className={`${item.type === 'error' ? 'text-red-500' : 'text-[#00ff41]/90'} whitespace-pre-wrap pl-4 border-l-2 border-[#00ff41]/20 ml-1`}>
                                    <Typewriter text={item.content} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Prompt */}
                <div className="flex items-center mt-4">
                    <span className="mr-2 text-[#00ff41] font-bold">{currentPathString}$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-white font-bold caret-[#00ff41]"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                        disabled={!!viewMode}
                    />
                </div>
                <div ref={bottomRef} className="h-20" />
            </div>

            {/* View Mode Overlay */}
            <AnimatePresence>
                {viewMode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setViewMode(null)} />

                        {/* Window */}
                        <div className="relative w-full max-w-5xl bg-[#111] border border-[#00ff41] shadow-[0_0_50px_rgba(0,255,65,0.15)] rounded-lg overflow-hidden flex flex-col h-[85vh]">

                            {/* Window Header */}
                            <div className="bg-[#00ff41]/10 border-b border-[#00ff41]/30 p-3 flex justify-between items-center px-4 select-none">
                                <div className="flex items-center gap-2">
                                    <Layers size={16} className="text-[#00ff41]" />
                                    <span className="font-bold text-[#00ff41] tracking-wider text-xs md:text-sm">HUGO_OS // VIEWER // {viewMode.file.toUpperCase()}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="hidden md:inline text-[#00ff41]/50 text-xs font-mono">PRESS 'ESC' TO CLOSE</span>
                                    <button onClick={() => setViewMode(null)} className="text-[#00ff41] hover:text-white hover:bg-[#00ff41]/20 rounded p-1 transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Window Body */}
                            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative">
                                {/* Grid Pattern BG for modal */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10" />
                                {renderContent()}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
