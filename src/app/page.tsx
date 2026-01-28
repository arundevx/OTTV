import Image from 'next/image';
import SearchInput from '@/components/SearchInput';
import Footer from '@/components/Footer';
import MovieGrid from '@/components/MovieGrid';

async function getMovies() {
  try {
    const res = await fetch('https://yts.bz/api/v2/list_movies.json', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.movies || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export default async function Home() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen flex flex-col bg-black">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Blur and Darkening */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Cinematic Background"
            fill
            className="object-cover opacity-60 blur-[3px] scale-105"
            priority
          />
          {/* Black Gradient Fade at Bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black z-10" />
        </div>

        {/* Content Section */}
        <div className="relative z-20 w-full max-w-4xl px-6 text-center animate-in fade-in zoom-in-95 duration-1000">
          <div className="inline-block px-4 py-1.5 bg-red-600/10 backdrop-blur-xl rounded-full text-[10px] font-black text-red-500 border border-red-600/20 uppercase tracking-[0.3em] mb-8">
            Ultimate Streaming Experience
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl uppercase">
            OTT<span className="text-red-600">Virus</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 font-bold max-w-2xl mx-auto leading-relaxed">
            Discover thousands of movies and TV shows. Stream instantly in high quality with no subscriptions.
          </p>

          <SearchInput />
        </div>
      </section>

      {/* Movies Section */}
      <section className="flex-grow bg-black pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <span className="w-2 h-10 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
              <h2 className="text-4xl font-black uppercase tracking-tight text-white">Trending Now</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black text-gray-400 border border-white/5 uppercase tracking-widest">
                Recently Added
              </span>
            </div>
          </div>

          <MovieGrid movies={movies} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
