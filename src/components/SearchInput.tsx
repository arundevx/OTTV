'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchMovies, SearchResult } from '@/app/actions/search';

const SkeletonLoader = () => (
    <div className="flex items-center gap-4 p-4 border-b border-white/5 last:border-0 animate-pulse">
        <div className="w-12 h-16 bg-white/10 rounded flex-shrink-0" />
        <div className="flex flex-col gap-2 flex-grow">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/10 rounded w-1/4" />
        </div>
    </div>
);

const SearchInput = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setIsLoading(true);
            setIsOpen(true);
            try {
                const searchResults = await searchMovies(query);
                setResults(searchResults);
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setIsLoading(false);
            }
        }, 500); // Reduced debounce for better UX, original was 3000ms

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleResultClick = (result: SearchResult) => {
        setIsOpen(false);
        const queryParams = new URLSearchParams({
            title: result.title,
            year: result.year,
        });
        router.push(`/movie/${result.imdb}?${queryParams.toString()}`);
    };

    return (
        <div className="relative group w-full max-w-2xl mx-auto" ref={dropdownRef}>
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                {isLoading ? (
                    <Loader2 className="h-5 w-5 md:h-6 md:w-6 text-red-500 animate-spin" />
                ) : (
                    <Search className="h-5 w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                )}
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.trim() && setIsOpen(true)}
                className="block w-full pl-14 md:pl-16 pr-6 py-4 md:py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:bg-white/10 transition-all shadow-2xl text-base md:text-xl"
                placeholder="Search movies, series, or IMDb ID..."
            />

            {/* Results Dropdown */}
            {isOpen && (query.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="max-h-[60vh] md:max-h-[400px] overflow-y-auto custom-scrollbar">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => <SkeletonLoader key={i} />)
                        ) : results.length > 0 ? (
                            results.map((movie) => (
                                <button
                                    key={movie.imdb}
                                    onClick={() => handleResultClick(movie)}
                                    className="w-full flex items-center gap-4 p-4 hover:bg-white/10 cursor-pointer transition-all border-b border-white/5 last:border-0 text-left group/item"
                                >
                                    <div className="w-10 h-14 md:w-12 md:h-16 bg-gray-800 rounded flex items-center justify-center flex-shrink-0 relative overflow-hidden ring-1 ring-white/10 group-hover/item:ring-red-500/50 transition-all">
                                        <span className="text-[10px] text-gray-500 uppercase font-bold text-center px-1">Poster</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold line-clamp-1 group-hover/item:text-red-500 transition-colors">{movie.title}</span>
                                        <span className="text-gray-400 text-xs md:text-sm font-medium">{movie.year}</span>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <Search className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-400 font-medium">No results found for "{query}"</p>
                                <p className="text-gray-600 text-sm mt-1">Try different keywords or check spelling</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
