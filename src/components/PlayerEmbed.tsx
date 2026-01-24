'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Server, ShieldCheck } from 'lucide-react';

interface PlayerEmbedProps {
    imdbId: string;
    serverConfig: {
        server1: boolean;
        server2: boolean;
        server3: boolean;
        server2Url: string;
        server3Url: string;
    };
}

const PlayerEmbed: React.FC<PlayerEmbedProps> = ({ imdbId, serverConfig }) => {
    const servers = [
        { id: 1, name: 'Server 1', url: `https://database.gdriveplayer.us/player.php?imdb=${imdbId}`, enabled: serverConfig.server1 },
        { id: 2, name: 'Server 2', url: serverConfig.server2Url.replace('{id}', imdbId), enabled: serverConfig.server2 },
        { id: 3, name: 'Server 3', url: serverConfig.server3Url.replace('{id}', imdbId), enabled: serverConfig.server3 },
    ].filter(s => s.enabled);

    const [activeServer, setActiveServer] = useState(servers[0] || null);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setShowAlert(true); // Reset alert visibility when switching servers
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 30000); // Show alert for 30 seconds
        return () => clearTimeout(timer);
    }, [activeServer]);

    if (!activeServer) {
        return (
            <div className="w-full aspect-video bg-gray-900 rounded-2xl flex items-center justify-center border border-white/10">
                <p className="text-gray-500 font-bold uppercase tracking-widest">No servers available</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Server Selection UI */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 mr-2">
                    <Server className="w-4 h-4 text-red-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Switch Server:</span>
                </div>
                {servers.map((server) => (
                    <button
                        key={server.id}
                        onClick={() => {
                            if (activeServer.id !== server.id) {
                                setActiveServer(server);
                            }
                        }}
                        className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${activeServer.id === server.id
                            ? 'bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                            }`}
                    >
                        {server.name}
                    </button>
                ))}
            </div>

            {/* Loading Alert */}
            {showAlert && (
                <div className="bg-red-600/10 border border-red-600/20 px-6 py-4 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold text-gray-100 italic">
                            Please wait for <span className="text-red-500">5 seconds</span> for the player to load.
                        </p>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                            If you encounter any issues, please choose another server using the buttons above.
                        </p>
                    </div>
                </div>
            )}

            {/* Video Player Container */}
            <div className="relative w-full aspect-video bg-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-4 border-red-600/10 rounded-full" />
                            <div className="absolute inset-0 border-4 border-t-red-600 rounded-full animate-spin" />
                        </div>
                        <div className="mt-6 flex flex-col items-center gap-2">
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-white animate-pulse">Establishing Secure Stream</p>
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase">
                                <ShieldCheck className="w-3 h-3 text-green-500" />
                                <span>SSL Encrypted Connection</span>
                            </div>
                        </div>
                    </div>
                )}

                <iframe
                    key={activeServer.id}
                    src={activeServer.url}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    onLoad={() => setIsLoading(false)}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
                    referrerPolicy="no-referrer"
                />
            </div>
        </div>
    );
};

export default PlayerEmbed;
