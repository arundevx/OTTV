import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">About</h3>
          <p className="text-sm leading-relaxed">
            OTTVirus is your ultimate destination for discovering movies and series.
            We provide a sleek interface to explore the latest titles and classics.
          </p>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Movies</a></li>
            <li><a href="#" className="hover:text-white transition-colors">TV Series</a></li>
            <li><a href="#" className="hover:text-white transition-colors">IMDb Search</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
          <p className="text-sm">
            Email: support@ottvirus.cc<br />
            Follow us on social media for updates.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center">
        <div className="bg-red-900/10 border border-red-900/20 p-4 rounded-lg mb-6">
          <p className="text-xs text-red-500/80 leading-relaxed max-w-2xl mx-auto">
            Disclaimer: This site does not host or store any files on its own server.
            All content is provided by third-party services.
          </p>
        </div>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} OTTVirus. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
