import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import movieCollection from "../models/movie.js";
import fetchHandler from "../utils/FetchHandler.js";

export default class MovieController {

    static searchMovie = async (req: Request, res: Response) => {
        const { query } = req.params;
        let { page } = req.query as any;

        if (!page){page= 1}

        const request = await fetchHandler.request("GET", "/search/movie", undefined, `query=${query}&page=${page}`);

        if (!request.success) {
            return ApiResponse.error(res, "Error searching movie", 500);
        }        

        return ApiResponse.success(res, "Movies found", request);
    }


    static getMovie = async (req: Request, res: Response) => {
        const { movieId } = req.params;
        const movie = await movieCollection.findOne({ movieId });

        if (!movie) {
            const request = await fetchHandler.request("GET", `/movie/${movieId}`, undefined, `append_to_response=videos,images,similar`);

            if (!request.success) {
                return ApiResponse.error(res, "Error searching movie", 500);
            }

            let movieData = request.fetchData as MovieApi;
            const genres =movieData.genres.map((genre: any) => genre.id);
            
            const newMovie = new movieCollection({
                title: movieData.title,
                movieId: movieData.id,
                description: movieData.overview,
                duration: movieData.runtime,
                releaseDate: movieData.release_date,
                genres: genres,
                posterUrl: movieData.poster_path,
                trailerUrl: movieData.poster_path,
                isAdult: movieData.adult,
           });

            return ApiResponse.success(res, "Movie found", {
                movie: newMovie,
                similar: movieData.similar,           
            } );

         
        }

        const requestSimilar = await fetchHandler.request("GET", `/movie/${movieId}/similar`, undefined, `append_to_response=videos,images,similar`);

        if (!requestSimilar.success) {
            return ApiResponse.error(res, "Error searching similar movies", 500);
        }

        let similarMovies = requestSimilar.fetchData as similar;

        return ApiResponse.success(res, "Movie found", {
            movie,
            similar:similarMovies  
        });
    }


    static getSimilarMovies = async (req: Request, res: Response) => {
        const { movieId } = req.params;
        const request = await fetchHandler.request("GET", `/movie/${movieId}/similar`);

        if (!request.success) {
            return ApiResponse.error(res, "Error searching movie", 500);
        }

        return ApiResponse.success(res, "Movies found", request);
    }
    
    static discoverMovies = async (req: Request, res: Response) => {
        let { page, popularity, genres } = req.query as any;

        if (!page){page= 1}
        if (!popularity){popularity= "desc"}
        if (!genres){genres= ""}

        const request = await fetchHandler.request("GET", `/discover/movie`, undefined, `page=${page}&sort_by=popularity.${popularity}&with_genres=${genres}`);

        if (!request.success) {
            return ApiResponse.error(res, "Error searching movie", 500);
        }


        return ApiResponse.success(res, "Movies found", request);
    }


}

interface similar{
    results: any[];
    page: number;
}

interface MovieApi {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: null | { };
    budget?: number;
    genres: {
      id: number;
      name: string;
    }[];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }[];
    production_countries?: {
      iso_3166_1: string;
      name: string;
    }[];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    videos?: {
      results: any[]; // Puedes definir un tipo más específico si es necesario
    };
    similar:{
        results: any[];
        page: number;
    };
    }
  

