'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Star, Calendar, Clock, Play, Globe, Languages, Users } from 'lucide-react';
import { getTMDBImageUrl } from '@/lib/tmdb';
import PlayerEmbed from './PlayerEmbed';
import Footer from './Footer';
import DetailsHeader from './DetailsHeader';

interface MovieDetailClientProps {
    imdbId: string;
    movie: any;
    displayTitle: string;
    displayYear: string | number;
    displayOverview: string;
    displayRating: string;
    displayRuntime: number;
    displayGenres: any[];
    displayLanguages: string;
    displayCountries: string;
    backdropUrl: string | null;
    posterUrl: string | null;
    director: any;
    writers: any[];
    isKeyMissing: boolean;
    initialWatch: boolean;
}

export default function MovieDetailClient({
    imdbId,
    movie,
    displayTitle,
    displayYear,
    displayOverview,
    displayRating,
    displayRuntime,
    displayGenres,
    displayLanguages,
    displayCountries,
    backdropUrl,
    posterUrl,
    director,
    writers,
    isKeyMissing,
    initialWatch
}: MovieDetailClientProps) {
    const [isWatching, setIsWatching] = useState(initialWatch);
    const playerRef = useRef<HTMLDivElement>(null);

    const handleWatchNow = () => {
        setIsWatching(true);
        // Using requestAnimationFrame or setTimeout to wait for the DOM to update
        setTimeout(() => {
            if (playerRef.current) {
                playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    useEffect(() => {
        if (initialWatch && playerRef.current) {
            playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [initialWatch]);

    return (
        <main className="min-h-screen bg-black text-white flex flex-col selection:bg-red-600 selection:text-white pt-16 md:pt-20">
            <DetailsHeader />

            {/* Backdrop Section */}
            <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
                {isKeyMissing && (
                    <div className="absolute top-24 left-6 z-50 bg-red-600/90 text-white px-4 py-2 rounded-lg text-xs font-bold animate-pulse shadow-xl backdrop-blur-md">
                        DEV: TMDB_API_KEY IS MISSING (Showing Fallback Data)
                    </div>
                )}
                {backdropUrl && (
                    <div className="absolute inset-0">
                        <Image
                            src={backdropUrl}
                            alt={displayTitle}
                            fill
                            className="object-cover opacity-60 scale-105"
                            priority
                        />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-7xl mx-auto w-full px-6 pb-20 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 items-end">
                        {/* Poster Card */}
                        <div className="hidden md:block relative aspect-[2/3] w-full rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10 transform hover:scale-[1.02] transition-transform duration-500 bg-gray-900 group">
                            {posterUrl ? (
                                <Image src={posterUrl} alt={displayTitle} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gray-800">
                                    <div className="text-gray-500 mb-2 font-black text-4xl">?</div>
                                    <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{displayTitle}</div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Movie Info */}
                        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-10 duration-700">
                            <div className="flex flex-wrap gap-2">
                                {displayGenres.length > 0 ? displayGenres.map((g: any) => (
                                    <span key={g.id} className="px-4 py-1.5 bg-red-600/10 backdrop-blur-xl rounded-full text-[10px] md:text-xs font-bold text-red-500 border border-red-600/20 uppercase tracking-wider">
                                        {g.name}
                                    </span>
                                )) : (
                                    <span className="px-4 py-1.5 bg-white/5 backdrop-blur-xl rounded-full text-[10px] md:text-xs font-bold text-gray-500 border border-white/5 uppercase tracking-wider">
                                        Genre N/A
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-7xl font-black tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                                {displayTitle}
                            </h1>

                            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm md:text-lg font-bold text-gray-200">
                                <div className="flex items-center gap-2 group">
                                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 group-hover:scale-110 transition-transform" />
                                    <span className="text-white">{displayRating}</span>
                                    <span className="text-gray-400 font-medium">/ 10</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-red-600" />
                                    <span>{displayYear}</span>
                                </div>
                                {displayRuntime > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-6 h-6 text-red-600" />
                                        <span>{displayRuntime} min</span>
                                    </div>
                                )}
                            </div>

                            <p className="max-w-3xl text-gray-300 leading-relaxed text-sm md:text-lg font-medium drop-shadow-md">
                                {displayOverview}
                            </p>

                            {!isWatching && (
                                <button
                                    onClick={handleWatchNow}
                                    className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-3.5 rounded-full font-black text-lg hover:bg-red-600 hover:text-white transition-all shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.5)] w-fit overflow-hidden"
                                >
                                    <Play className="w-5 h-5 fill-current relative z-10" />
                                    <span className="relative z-10">WATCH NOW</span>
                                    <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Player Section - Positioned AFTER hero */}
            {isWatching && (
                <section
                    ref={playerRef}
                    id="player"
                    className="max-w-7xl mx-auto w-full px-6 py-24 animate-in fade-in zoom-in-95 duration-700"
                >
                    <div className="flex flex-col gap-10">
                        <div className="flex items-center gap-6">
                            <span className="w-2 h-10 bg-red-600 rounded-full" />
                            <h2 className="text-4xl font-black uppercase tracking-tight">Cinema Engine</h2>
                        </div>
                        <PlayerEmbed imdbId={imdbId} />
                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-sm text-gray-400 leading-relaxed backdrop-blur-md">
                            <p className="mb-4 font-black text-white uppercase tracking-[0.2em] text-xs">Streaming Intelligent Note:</p>
                            We recommend a high-speed fiber connection for 4K streaming. If you experience buffering, try pausing the video for a few seconds or switch to a different server. Our engine automatically optimizes playback for your device.
                        </div>
                    </div>
                </section>
            )}

            {/* Extended Info Section */}
            <div className="max-w-7xl mx-auto w-full px-6 py-20 border-t border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Additional Metadata */}
                    <div className="flex flex-col gap-10">
                        <div>
                            <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                <Languages className="w-4 h-4" /> Spoken Languages
                            </h3>
                            <p className="text-xl font-bold text-gray-100">{displayLanguages}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Production Countries
                            </h3>
                            <p className="text-xl font-bold text-gray-100">{displayCountries}</p>
                        </div>

                        {(director || writers) && (
                            <div className="flex flex-col gap-8 pt-8 border-t border-white/5">
                                {director && (
                                    <div>
                                        <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">Director</h3>
                                        <div className="flex items-center gap-4">
                                            {director.profile_path && (
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-red-600/20">
                                                    <Image src={getTMDBImageUrl(director.profile_path, 'w500')!} alt={director.name} fill className="object-cover" />
                                                </div>
                                            )}
                                            <p className="text-lg font-bold text-white">{director.name}</p>
                                        </div>
                                    </div>
                                )}
                                {writers && writers.length > 0 && (
                                    <div>
                                        <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">Writers</h3>
                                        <p className="text-lg font-bold text-white">{writers.map((w: any) => w.name).join(', ')}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Cast Section */}
                    <div className="lg:col-span-2 overflow-hidden">
                        <div className="flex items-center justify-between mb-8 px-2 md:px-0">
                            <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <Users className="w-4 h-4" /> Principal Cast
                            </h3>
                            <div className="md:hidden text-[10px] text-gray-600 font-bold uppercase tracking-widest">Swipe for more →</div>
                        </div>

                        {movie?.credits?.cast && movie.credits.cast.length > 0 ? (
                            <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-6 pb-6 md:pb-0 custom-scrollbar snap-x">
                                {movie.credits.cast.slice(0, 12).map((actor: any) => (
                                    <div key={actor.id} className="group flex flex-col gap-3 min-w-[140px] md:min-w-0 snap-start">
                                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 border border-white/5 group-hover:border-red-600/50 transition-colors duration-300">
                                            {actor.profile_path ? (
                                                <Image
                                                    src={getTMDBImageUrl(actor.profile_path, 'w500')!}
                                                    alt={actor.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-700 bg-gray-800 font-bold">No Photo</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold text-sm line-clamp-1 group-hover:text-red-500 transition-colors uppercase">{actor.name}</span>
                                            <span className="text-gray-500 text-xs line-clamp-1 italic">{actor.character}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 italic">Cast information unavailable for this title.</p>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
