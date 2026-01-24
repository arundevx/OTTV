const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_DIRECT_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_PROXY_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.allorigins.win/raw?url=https://api.themoviedb.org/3';

export interface TMDBMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    genres: { id: number; name: string }[];
    runtime: number;
    credits?: {
        cast: TMDBActor[];
        crew: TMDBCrew[];
    };
    production_countries?: { name: string }[];
    spoken_languages?: { english_name: string }[];
}

export interface TMDBActor {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface TMDBCrew {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
}

async function tmdbFetch(url: string, isProxy = false) {
    try {
        console.log(`[TMDB] Fetching (${isProxy ? 'Proxy' : 'Direct'}): ${url}`);
        const response = await fetch(url, {
            cache: 'no-store',
            next: { revalidate: 0 },
            // Add a shorter timeout for direct calls to fail fast
            signal: isProxy ? undefined : AbortSignal.timeout(5000)
        } as any);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[TMDB] API Error: ${response.status} ${response.statusText}`, {
                url,
                response: errorText.slice(0, 500)
            });
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        if (error.name === 'TimeoutError' || error.name === 'AbortError') {
            console.error(`[TMDB] Fetch Timeout: ${url}`);
        } else {
            console.error('[TMDB] Fetch Network/Parsing Error:', error.message || error);
        }
        return null;
    }
}

async function tmdbRequest(endpoint: string) {
    // 1. Try Direct
    const directUrl = `${TMDB_DIRECT_BASE_URL}${endpoint}`;
    let data = await tmdbFetch(directUrl, false);

    if (data) return data;

    // 2. Try Proxy
    // We need to parse the base proxy URL to handle the nested query params correctly
    const proxyBase = TMDB_PROXY_BASE_URL.split('?url=')[0];
    const targetBase = TMDB_PROXY_BASE_URL.split('?url=')[1] || TMDB_DIRECT_BASE_URL;

    const fullTargetUrl = `${targetBase}${endpoint}`;
    const proxyUrl = `${proxyBase}?url=${encodeURIComponent(fullTargetUrl)}`;

    console.log(`[TMDB] Falling back to proxy...`);
    return await tmdbFetch(proxyUrl, true);
}

export async function fetchTMDBMovieByImdbId(imdbId: string): Promise<TMDBMovie | null> {
    if (!TMDB_API_KEY) {
        console.error('TMDB_API_KEY is not defined');
        return null;
    }

    // 1. Find TMDB ID using external ID (IMDb)
    const findEndpoint = `/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`;
    const findData = await tmdbRequest(findEndpoint);

    if (!findData) {
        console.error(`[TMDB] Failed to get data for IMDb ID: ${imdbId}`);
        return null;
    }

    const movie = findData.movie_results?.[0];
    if (!movie) {
        console.warn(`[TMDB] No movie results for IMDb ID: ${imdbId}`, findData);
        return null;
    }

    // 2. Fetch full movie details with credits
    const detailEndpoint = `/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,images`;
    return await tmdbRequest(detailEndpoint);
}

export function getTMDBImageUrl(path: string | null, size: 'w500' | 'original' = 'w500') {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
}
