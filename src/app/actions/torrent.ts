'use server';

export interface Torrent {
    url: string;
    hash: string;
    quality: string;
    type: string;
    seeds: number;
    peers: number;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
}

export interface YTSMovieData {
    id: number;
    url: string;
    imdb_code: string;
    title: string;
    year: number;
    torrents: Torrent[];
}

export async function getTorrents(imdbId: string): Promise<Torrent[]> {
    if (!imdbId) return [];

    try {
        const response = await fetch(`https://yts.bz/api/v2/movie_details.json?imdb_id=${imdbId}`);
        if (!response.ok) throw new Error('Failed to fetch torrents');

        const json = await response.json();

        if (json.status === 'ok' && json.data && json.data.movie && json.data.movie.torrents) {
            return json.data.movie.torrents;
        }

        return [];
    } catch (error) {
        console.error('Error fetching torrents:', error);
        return [];
    }
}
