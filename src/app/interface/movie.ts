export interface Movie {
    id: number;
    imdbId?: string;
    imdbRating?: number;
    title: string;
    poster: string;
    // 背景
    backdrop: string;

    // 预告片
    trailer: string;

    overview: string;
    director: string;
    cast: string[];
    release_date: string;
    start_date: string;
    end_date: string;
    // 电影时长
    runtime: number;
    mpaa: string;
    like_count?: number;
    type?: string[];
    is_like?: boolean;
}

