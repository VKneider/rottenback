import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import MediaCollection from "../models/media.js";
import fetchHandler from "../utils/FetchHandler.js";

export default class MediaController {

    static searchMedia = async (req: Request, res: Response) => {
        const { query } = req.params;
        let { page } = req.query as any;

        if (!page){page= 1}

        const request = await fetchHandler.request("GET", "/search/Media", undefined, `query=${query}&page=${page}`);

        if (!request.success) {
            return ApiResponse.error(res, "Error searching Media", 500);
        }        

        return ApiResponse.success(res, "Medias found", request);
    }


    static getMedia = async (req: Request, res: Response) => {
        const { mediaId } = req.params;
        const Media = await MediaCollection.findOne({ mediaId });

        if (!Media) {
            const request = await fetchHandler.request("GET", `/Media/${mediaId}`, undefined, `append_to_response=videos,images,similar`);

            if (!request.success) {
                return ApiResponse.error(res, "Error searching Media", 500);
            }

            let MediaData = request.fetchData as MediaApi;
            const genres =MediaData.genres.map((genre: any) => genre.id);
            
            const newMedia = new MediaCollection({
                title: MediaData.title,
                MediaId: MediaData.id,
                description: MediaData.overview,
                duration: MediaData.runtime,
                releaseDate: MediaData.release_date,
                genres: genres,
                posterUrl: MediaData.poster_path,
                trailerUrl: MediaData.poster_path,
                isAdult: MediaData.adult,
           });

            return ApiResponse.success(res, "Media found", {
                Media: newMedia,
                similar: MediaData.similar,           
            } );

         
        }

        const requestSimilar = await fetchHandler.request("GET", `/Media/${mediaId}/similar`, undefined, `append_to_response=videos,images,similar`);

        if (!requestSimilar.success) {
            return ApiResponse.error(res, "Error searching similar Medias", 500);
        }

        let similarMedias = requestSimilar.fetchData as similar;

        return ApiResponse.success(res, "Media found", {
            Media,
            similar:similarMedias  
        });
    }


    static getSimilarMedias = async (req: Request, res: Response) => {
        const { MediaId } = req.params;
        const request = await fetchHandler.request("GET", `/Media/${MediaId}/similar`);

        if (!request.success) {
            return ApiResponse.error(res, "Error searching Media", 500);
        }

        return ApiResponse.success(res, "Medias found", request);
    }
    
    static discoverMedias = async (req: Request, res: Response) => {
        let { page, popularity, genres } = req.query as any;

        if (!page){page= 1}
        if (!popularity){popularity= "desc"}
        if (!genres){genres= ""}

        const request = await fetchHandler.request("GET", `/discover/Media`, undefined, `page=${page}&sort_by=popularity.${popularity}&with_genres=${genres}`);

        if (!request.success) {
            return ApiResponse.error(res, "Error searching Media", 500);
        }


        return ApiResponse.success(res, "Medias found", request);
    }


}

interface similar{
    results: any[];
    page: number;
}

interface MediaApi {
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
  

