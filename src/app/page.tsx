import Image from 'next/image';
import SearchInput from '@/components/SearchInput';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Blur and Darkening */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Cinematic Background"
            fill
            className="object-cover opacity-60 blur-[2px]"
            priority
          />
          {/* Black Gradient Fade at Bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10" />
        </div>

        {/* Content Section */}
        <div className="relative z-20 w-full max-w-4xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">
            OTTVirus
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-medium drop-shadow-md">
            Stream your favorite movies and series instantly.
          </p>

          <SearchInput />
        </div>
      </section>

      {/* Spacer / Content Area (Optional) */}
      <section className="flex-grow bg-black pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* You could add trending items or other info here */}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
