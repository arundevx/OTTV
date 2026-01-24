<div align="center">

# 🎬 OTTVirus
### Premium Auto-Embed Streaming Engine

![OTTVirus Hero](https://github.com/arundevx/OTTV/blob/OTTV/public/OTTV-banner.png?raw=true)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Performance](https://img.shields.io/badge/Performance-Optimized-orange?style=for-the-badge)](https://nextjs.org/)

**OTTVirus** is a state-of-the-art, high-performance streaming engine built with **Next.js 15**. It delivers a premium cinematic experience with instant playback, multi-server redundancy, and intelligent metadata integration.

</div>

---

## 📸 Experience the Magic

<div align="center">
  <p><b>Home UI: The Gateway to Cinema</b></p>
  <img src="https://github.com/arundevx/OTTV/blob/OTTV/preview/home.png?raw=true" width="90%" style="border-radius: 20px; border: 1px solid #333;" />
  <br/><br/>
  
  <p><b>Cinematic Details: Rich Metadata & Visuals</b></p>
  <img src="https://github.com/arundevx/OTTV/blob/OTTV/preview/details_page_1.png?raw=true" width="90%" style="border-radius: 20px; border: 1px solid #333;" />
  <br/><br/>
  
  <p><b>Multi-Server Player: Uninterrupted Streaming</b></p>
  <img src="https://github.com/arundevx/OTTV/blob/OTTV/preview/player.png?raw=true" width="90%" style="border-radius: 20px; border: 1px solid #333;" />
</div>

---

## 🔥 Key Features

### 💎 Cinematic Excellence
- **Ultra-Modern UI**: Glassmorphism, velvet-dark themes, and high-fidelity animations.
- **Rich Metadata**: Powered by **TMDB API**, providing high-res posters, backdrops, cast details, and crew info.
- **Responsive Mastery**: Fluid performance across all devices—Mobile, Tablet, and Desktop.

### 🎥 Multi-Server Engine
- **Triple-Server Redundancy**: Choose between 3 different servers for the best streaming quality.
- **Instant Switching**: Change servers on-the-fly without refreshing the page.
- **Intelligent Loading**: Custom alerts and pre-loaders for a smooth buffering-free start.

### 🚀 Speed & Reliability
- **Smart Proxying**: Integrated AllOrigins proxy to bypass TMDB geo-restrictions and CORS issues.
- **Proactive Caching**: 1-hour revalidation cycles for lightning-fast metadata loading.
- **Fail-Fast Logic**: Intelligent timeout and fallback mechanisms for direct vs. proxy connections.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Server Components)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [TMDB API](https://www.themoviedb.org/documentation/api)
- **Streaming**: Multi-Provider Auto-Embed System

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or later
- A TMDB API Key ([Get it here](https://www.themoviedb.org/settings/api))

### Installation
1. **Clone & Enter**:
   ```bash
   git clone https://github.com/arundevx/OTTV.git
   cd OTTV
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Create a `.env.local` file:
   ```env
   # TMDB Configuration
   TMDB_API_KEY=your_key_here
   TMDB_ENABLE_PROXY=true # Set to true to bypass geo-blocks
   
   # Server Toggles
   ENABLE_SERVER_1=true
   ENABLE_SERVER_2=true
   ENABLE_SERVER_3=true
   
   # Custom Server URLs (optional)
   SERVER_2_URL=https://player.autoembed.cc/embed/movie/{id}
   SERVER_3_URL=https://multiembed.mov/?video_id={id}
   ```
4. **Launch**:
   ```bash
   npm run dev
   ```

---

## 📂 Folder Architecture

```text
src/
├── app/              # Routes, Pages, and Layouts
├── components/       # Premium UI components (Player, Search, etc.)
├── lib/              # TMDB Library & Connectivity Logic
└── globals.css       # Design Tokens & Global Styles
```

---

## ⚖️ Legal Disclaimer

**OTTVirus does not host or store any video content.**

The platform acts as a metadata engine and provides a user-friendly interface to access publicly available third-party embedding services. Users are responsible for complying with local laws and regulations. Built for educational and research purposes.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/arundevx">Arun</a>.
</p>
