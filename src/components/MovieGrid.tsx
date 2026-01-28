'use client';

import MovieCard from './MovieCard';

interface MovieGridProps {
    movies: any[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
    if (!movies || movies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-gray-500 mb-4 font-black text-4xl uppercase tracking-tighter opacity-20 italic">No Movies Found</div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
