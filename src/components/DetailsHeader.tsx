'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Menu, X } from 'lucide-react';

export default function DetailsHeader() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4 flex items-center justify-between ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-gradient-to-b from-black/80 to-transparent'
                    }`}
            >
                <div className="flex items-center gap-4 md:gap-8">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center -ml-2 group"
                        title="Go Back"
                    >
                        <ArrowLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
                        OTT<span className="text-red-600">Virus</span>
                    </Link>
                </div>

                {/* Desktop Nav - placeholder for now */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">Home</Link>
                    <Link href="/?type=movie" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">Movies</Link>
                    <Link href="/?type=tv" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">TV Shows</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[99] bg-black/95 backdrop-blur-2xl md:hidden animate-in fade-in duration-300 pt-24 px-8">
                    <nav className="flex flex-col gap-8">
                        <Link
                            href="/"
                            className="text-3xl font-black text-white"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/?type=movie"
                            className="text-3xl font-black text-white"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Movies
                        </Link>
                        <Link
                            href="/?type=tv"
                            className="text-3xl font-black text-white"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            TV Shows
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
}
