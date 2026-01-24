import React from 'react';
import { fetchTMDBMovieByImdbId, getTMDBImageUrl } from '@/lib/tmdb';
import MovieDetailClient from '@/components/MovieDetailClient';

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

    const movie = await fetchTMDBMovieByImdbId(imdbId);
    const isKeyMissing = !process.env.TMDB_API_KEY || process.env.TMDB_API_KEY === 'YOUR_TMDB_API_KEY_HERE';

    // Use TMDB data if available, otherwise use fallbacks from query params
    const displayTitle = movie?.title || (fallbackTitle as string) || 'Unknown Movie';
    const displayYear = movie?.release_date ? new Date(movie.release_date).getFullYear() : (fallbackYear as string) || 'N/A';
    const displayOverview = movie?.overview || 'No description available for this title yet.';
    const displayRating = movie?.vote_average?.toFixed(1) || 'N/A';
    const displayRuntime = movie?.runtime || 0;
    const displayGenres = movie?.genres || [];
    const displayLanguages = movie?.spoken_languages?.map(l => l.english_name).join(', ') || 'N/A';
    const displayCountries = movie?.production_countries?.map(c => c.name).join(', ') || 'N/A';

    const backdropUrl = movie ? getTMDBImageUrl(movie.backdrop_path, 'original') : null;
    const posterUrl = movie ? getTMDBImageUrl(movie.poster_path, 'w500') : null;

    // Get key crew members
    const director = movie?.credits?.crew.find(c => c.job === 'Director');
    const writers = movie?.credits?.crew?.filter(c => c.job === 'Writer' || c.job === 'Screenplay').slice(0, 2) || [];

    return (
        <MovieDetailClient
            imdbId={imdbId}
            movie={movie}
            displayTitle={displayTitle}
            displayYear={displayYear}
            displayOverview={displayOverview}
            displayRating={displayRating}
            displayRuntime={displayRuntime}
            displayGenres={displayGenres}
            displayLanguages={displayLanguages}
            displayCountries={displayCountries}
            backdropUrl={backdropUrl}
            posterUrl={posterUrl}
            director={director}
            writers={writers}
            isKeyMissing={isKeyMissing}
            initialWatch={watch === 'true'}
        />
    );
}
