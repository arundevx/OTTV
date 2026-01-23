'use client';

import React from 'react';

interface PlayerEmbedProps {
    imdbId: string;
}

const PlayerEmbed: React.FC<PlayerEmbedProps> = ({ imdbId }) => {
    return (
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
                src={`https://database.gdriveplayer.us/player.php?imdb=${imdbId}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
                referrerPolicy="no-referrer"
                loading="lazy"
            />
        </div>
    );
};

export default PlayerEmbed;
