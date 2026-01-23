import React from 'react';
import Image from 'next/image';
import { Star, Calendar, Clock, Play } from 'lucide-react';
import { fetchTMDBMovieByImdbId, getTMDBImageUrl } from '@/lib/tmdb';
import PlayerEmbed from '@/components/PlayerEmbed';
import Footer from '@/components/Footer';

interface MoviePageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{
        watch?: string;
        title?: string;
        year?: string;
    }>;
}

export default async function MoviePage({ params, searchParams }: MoviePageProps) {
    const { id: imdbId } = await params;
    const resolvedSearchParams = await searchParams;
    const { watch, title: fallbackTitle, year: fallbackYear } = resolvedSearchParams;

    // Create new URLSearchParams string with existing params
    const updatedSearchParams = new URLSearchParams();
    Object.entries(resolvedSearchParams).forEach(([key, value]) => {
        if (value) updatedSearchParams.set(key, value as string);
    });
    updatedSearchParams.set('watch', 'true');
    const watchUrl = `?${updatedSearchParams.toString()}`;

    const movie = await fetchTMDBMovieByImdbId(imdbId);
    const isKeyMissing = process.env.TMDB_API_KEY === 'YOUR_TMDB_API_KEY_HERE' || !process.env.TMDB_API_KEY;

    // Use TMDB data if available, otherwise use fallbacks from query params
    const displayTitle = movie?.title || (fallbackTitle as string) || 'Unknown Movie';
    const displayYear = movie?.release_date ? new Date(movie.release_date).getFullYear() : (fallbackYear as string) || 'N/A';
    const displayOverview = movie?.overview || 'No description available for this title yet.';
    const displayRating = movie?.vote_average?.toFixed(1) || 'N/A';
    const displayRuntime = movie?.runtime || 0;
    const displayGenres = movie?.genres || [];

    const backdropUrl = movie ? getTMDBImageUrl(movie.backdrop_path, 'original') : null;
    const posterUrl = movie ? getTMDBImageUrl(movie.poster_path, 'w500') : null;

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            {/* Backdrop Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                {isKeyMissing && (
                    <div className="absolute top-4 left-4 z-50 bg-red-600/90 text-white px-4 py-2 rounded-lg text-xs font-bold animate-pulse">
                        DEV: TMDB_API_KEY IS MISSING (Showing Fallback Data)
                    </div>
                )}
                {backdropUrl && (
                    <Image
                        src={backdropUrl}
                        alt={displayTitle}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-7xl mx-auto w-full px-6 pb-12 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-end">
                        {/* Poster Card */}
                        <div className="hidden md:block relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform -translate-y-12 bg-gray-900">
                            {posterUrl ? (
                                <Image src={posterUrl} alt={displayTitle} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gray-800">
                                    <div className="text-gray-500 mb-2 font-black text-4xl">?</div>
                                    <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{displayTitle}</div>
                                </div>
                            )}
                        </div>

                        {/* Movie Info */}
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {displayGenres.length > 0 ? displayGenres.map((g) => (
                                    <span key={g.id} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-gray-300 border border-white/5">
                                        {g.name}
                                    </span>
                                )) : (
                                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-gray-400 border border-white/5 italic">
                                        Genre N/A
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-xl">
                                {displayTitle}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span>{displayRating} / 10</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <span>{displayYear}</span>
                                </div>
                                {displayRuntime > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-400" />
                                        <span>{displayRuntime} min</span>
                                    </div>
                                )}
                            </div>

                            <p className="max-w-3xl text-gray-300 leading-relaxed text-sm md:text-lg mb-4 line-clamp-4 md:line-clamp-none">
                                {displayOverview}
                            </p>

                            {!watch && (
                                <a
                                    href={watchUrl}
                                    className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-2xl w-fit"
                                >
                                    <Play className="w-6 h-6 fill-black" />
                                    WATCH NOW
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Player Section */}
            {watch && (
                <section id="player" className="max-w-7xl mx-auto w-full px-6 py-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
                    <div className="flex flex-col gap-8">
                        <h2 className="text-3xl font-bold flex items-center gap-4">
                            <span className="w-2 h-8 bg-white rounded-full" />
                            Streaming Options
                        </h2>
                        <PlayerEmbed imdbId={imdbId} />
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-sm text-gray-400 leading-relaxed">
                            <p className="mb-2 font-bold text-white uppercase tracking-widest text-xs">Note:</p>
                            If the player doesn't load or shows an error, try refreshing the page. Some servers may be slower than others.
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <Footer />
        </main>
    );
}
