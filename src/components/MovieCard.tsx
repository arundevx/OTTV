'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface MovieCardProps {
    movie: any;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const torrents = [...(movie.torrents || [])];

    // Sort torrents to find the best quality
    // 1. Higher resolution first (e.g. 2160p > 1080p > 720p)
    // 2. If same resolution, bluray over web/others
    const bestTorrent = torrents.sort((a, b) => {
        const resA = parseInt(a.quality) || 0;
        const resB = parseInt(b.quality) || 0;

        if (resB !== resA) {
            return resB - resA;
        }

        const typeA = a.type?.toLowerCase() === 'bluray' ? 1 : 0;
        const typeB = b.type?.toLowerCase() === 'bluray' ? 1 : 0;
        return typeB - typeA;
    })[0];

    const qualityLabel = bestTorrent
        ? `${bestTorrent.quality} ${bestTorrent.type === 'bluray' ? 'BR' : 'WEB'}`
        : '';

    return (
        <Link
            href={`/movie/${movie.imdb_code}`}
            className="group relative block overflow-hidden rounded-2xl bg-gray-900 border border-white/5 transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
        >
            <div className="aspect-[2/3] w-full relative overflow-hidden">
                <Image
                    src={movie.medium_cover_image || '/placeholder-poster.png'}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 20vw"
                />

                {/* Quality/Rating Badge */}
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 scale-90 group-hover:scale-100 transition-transform origin-top-right">
                    {movie.rating > 0 && (
                        <div className="flex items-center gap-1.5 rounded-lg bg-black/80 px-2.5 py-1.5 text-xs font-black text-white backdrop-blur-xl border border-white/10 shadow-2xl">
                            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                            <span>{movie.rating}</span>
                        </div>
                    )}
                    {qualityLabel && (
                        <div className="rounded-lg bg-red-600/90 px-2.5 py-1 text-[10px] font-black text-white backdrop-blur-xl border border-white/10 shadow-2xl uppercase tracking-tighter">
                            {qualityLabel}
                        </div>
                    )}
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="px-3 py-1 bg-white text-black text-[10px] font-black rounded-full uppercase tracking-widest">
                            Watch Now
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gradient-to-b from-gray-900 to-black">
                <h3 className="line-clamp-1 text-sm font-black text-white group-hover:text-red-500 transition-colors uppercase tracking-tight">
                    {movie.title}
                </h3>
                <div className="mt-2 flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                        {movie.language}
                    </span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full" />
                    <span>{movie.year}</span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full" />
                    <span className="truncate">{movie.genres?.[0] || 'Action'}</span>
                </div>
            </div>
        </Link>
    );
}
