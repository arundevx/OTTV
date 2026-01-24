# OTTVirus - A modern auto-embed streaming engine for movies & TV

![OTTVirus Hero](https://github.com/arundevx/OTTV/blob/OTTV/public/OTTV-banner.png?raw=true)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

OTTVirus is a state-of-the-art OTT platform built with Next.js 15, offering a seamless and high-performance movie discovery and streaming experience. Featuring a dark cinematic theme, responsive design, and integration with TMDB for rich metadata.

## ✨ Features

- 🚀 **Next.js 15 App Router**: High-performance client-side routing and server-side rendering.
- 🎬 **Rich Movie Metadata**: Full integration with TMDB API for cast, crew, ratings, and high-quality backdrops.
- 🎥 **Intelligent Streaming Engine**: Responsive 16:9 player with auto-loading and fallback mechanisms.
- 🔍 **Real-time Search**: Instant search with skeleton loaders and smart debouncer.
- 📱 **Mobile First**: Fully responsive layout optimized for mobile, tablet, and desktop.
- ⚡ **Global Preloader**: Custom premium route transition animations.
- 🛡️ **Legal Compliance**: Strict adherence to non-piracy guidelines with clear disclaimers.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Metadata**: TMDB (The Movie Database) API
- **Deployment**: Vercel / Docker

## 📸 Screenshots

| Home Page | Movie Details | Mobile View |
| :---: | :---: | :---: |
| ![Home](https://placehold.co/600x400/000000/FFFFFF/png?text=OTTVirus+Home) | ![Details](https://placehold.co/600x400/000000/FFFFFF/png?text=Rich+Movie+Details) | ![Mobile](https://placehold.co/300x600/000000/FFFFFF/png?text=Mobile+Optimized) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- NPM or Bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/ottvirus.git
   cd ottvirus
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   TMDB_API_KEY=your_tmdb_api_key
   TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Folder Structure

```text
src/
├── app/              # App Router pages and loading states
├── components/       # Reusable UI components
├── lib/              # API wrappers and utilities
├── actions/          # Server actions for data fetching
└── globals.css       # Global styles and tailwind directives
```

## ⚖️ Legal Disclaimer

**OTTVirus does not support or promote piracy in any form.**

This application does not host, upload, or store any video files on its servers. All media content is fetched from third-party services and publicly available sources via standard embedding protocols. This project is intended for educational and informational purposes only.

---

Built with ❤️ for Movie Lovers.
