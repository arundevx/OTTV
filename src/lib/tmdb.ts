const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

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

export async function fetchTMDBMovieByImdbId(imdbId: string): Promise<TMDBMovie | null> {
    if (!TMDB_API_KEY) {
        console.error('TMDB_API_KEY is not defined');
        return null;
    }

    try {
        // 1. Find TMDB ID using external ID (IMDb)
        const findRes = await fetch(
            `${TMDB_BASE_URL}/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        );
        const findData = await findRes.json();

        const movie = findData.movie_results?.[0];
        if (!movie) return null;

        // 2. Fetch full movie details with credits
        const detailRes = await fetch(
            `${TMDB_BASE_URL}/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,images`
        );
        return await detailRes.json();
    } catch (error) {
        console.error('Error fetching TMDB movie:', error);
        return null;
    }
}

export function getTMDBImageUrl(path: string | null, size: 'w500' | 'original' = 'w500') {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
}
