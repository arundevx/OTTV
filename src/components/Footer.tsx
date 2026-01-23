import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-500 py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-2xl font-black tracking-tighter">
            OTT<span className="text-red-600">Virus</span>
          </h2>
          <p className="text-sm leading-relaxed">
            The ultimate destination for movie enthusiasts. Discover, track, and stream your favorite content with a premium cinematic experience.
          </p>
        </div>

        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-3">Explore</h3>
          <ul className="text-sm space-y-3 font-medium">
            <li><a href="/" className="hover:text-red-500 transition-colors">Home Experience</a></li>
            <li><a href="/?type=movie" className="hover:text-red-500 transition-colors">Trending Movies</a></li>
            <li><a href="/?type=tv" className="hover:text-red-500 transition-colors">TV Series</a></li>
            <li><a href="/?type=top" className="hover:text-red-500 transition-colors">Top Rated</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-3">Support</h3>
          <ul className="text-sm space-y-3 font-medium">
            <li><a href="#" className="hover:text-red-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-3">App Status</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-300">Systems Operational</span>
          </div>
          <p className="text-xs mt-4 leading-relaxed">
            Serving over 10,000+ titles daily with lightning fast speeds and high quality streams.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5">
        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl mb-8">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-50 text-center">Legal Disclaimer</h4>
          <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed text-center max-w-4xl mx-auto">
            OTTVirus does not support or promote piracy in any form.
            This application does not host, upload, or store any video files on its servers.
            All media content is fetched from third-party services and publicly available sources.
            This project is intended for educational and informational purposes only.
            Any copyright concerns should be addressed to the respective file hosting services.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest font-bold">
          <p>&copy; {new Date().getFullYear()} OTTVirus. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">DMCA</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
            <a href="#" className="hover:text-white transition-colors">v2.4.0</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
