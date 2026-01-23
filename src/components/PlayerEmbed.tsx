'use client';

import React from 'react';

interface PlayerEmbedProps {
    imdbId: string;
}

const PlayerEmbed: React.FC<PlayerEmbedProps> = ({ imdbId }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);

    const playerUrl = `https://database.gdriveplayer.us/player.php?imdb=${imdbId}`;

    return (
        <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80">
                    <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-500 animate-pulse">Initializing Streams...</p>
                </div>
            )}

            {hasError ? (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900 px-6 text-center">
                    <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Player Failed to Load</h3>
                    <p className="text-gray-400 text-sm max-w-md">
                        We're having trouble connecting to the streaming server. Please try refreshing the page or check your connection.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform"
                    >
                        RETRY PLAYER
                    </button>
                </div>
            ) : (
                <iframe
                    src={playerUrl}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default PlayerEmbed;
