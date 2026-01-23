'use server';

const GDRIVEPLAYER_SEARCH_API = process.env.GDRIVEPLAYER_SEARCH_API || 'https://api.gdriveplayer.us/v1/movie/search';

export interface SearchResult {
    title: string;
    year: string;
    imdb: string;
}

export async function searchMovies(query: string): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];

    try {
        const response = await fetch(`${GDRIVEPLAYER_SEARCH_API}?title=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Search failed');
        return await response.json();
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}
