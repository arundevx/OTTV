'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchMovies, SearchResult } from '@/app/actions/search';

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
        }, 3000); // 3 seconds debounce as requested

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
        <div className="relative group max-w-2xl mx-auto" ref={dropdownRef}>
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                {isLoading ? (
                    <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
                ) : (
                    <Search className="h-6 w-6 text-gray-400 group-focus-within:text-white transition-colors" />
                )}
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all shadow-2xl text-lg md:text-xl"
                placeholder="Search movies, series, or IMDb ID..."
            />

            {/* Results Dropdown */}
            {isOpen && (query.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        {isLoading ? (
                            <div className="p-8 text-center text-gray-400 italic">
                                Searching for "{query}"...
                            </div>
                        ) : results.length > 0 ? (
                            results.map((movie) => (
                                <div
                                    key={movie.imdb}
                                    onClick={() => handleResultClick(movie)}
                                    className="flex items-center gap-4 p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                >
                                    <div className="w-12 h-16 bg-gray-800 rounded flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                                        {/* Placeholder Poster */}
                                        <span className="text-[10px] text-gray-500 uppercase font-bold text-center px-1">No Image</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold line-clamp-1">{movie.title}</span>
                                        <span className="text-gray-400 text-sm">{movie.year}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-400">
                                No results found for "{query}"
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
