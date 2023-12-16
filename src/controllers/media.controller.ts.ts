import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import MediaCollection from "../models/media.js";
import fetchHandler from "../utils/FetchHandler.js";

export default class MediaController {

    static searchMedia = async (req: Request, res: Response) => {
        const { query } = req.params;
        let { page } = req.query as any;

        if (!page){page= 1}

        const {mediaType} = req.query as any;
        let endpoint;
        if(mediaType === "movie"){
            endpoint=`"/search/movie"`}
        else{
            endpoint=`"/search/tv"`
        }

        const request = await fetchHandler.request("GET", endpoint, undefined, `query=${query}&page=${page}`);

        if (!request.success) {
            return ApiResponse.error(res, "Error searching Media", 500);
        }        

        return ApiResponse.success(res, "Medias found", request);
    }


    static getMedia = async (req: Request, res: Response) => {
        const { mediaId } = req.params;
        const Media = await MediaCollection.findOne({ MediaId:mediaId });
        const {mediaType} = req.query as any;

        let endpoint;
        if(mediaType === "movie"){
            endpoint=`/movie/${mediaId}`}
        else{
            endpoint=`/tv/${mediaId}`
        }


        if (!Media) {
            const request = await fetchHandler.request("GET", endpoint, undefined, `append_to_response=videos,images,similar`);

            if (!request.success) {
                return ApiResponse.error(res, "Error searching Media", 500);
            }

            let MediaData = request.fetchData as MediaApi;
            const genres =MediaData.genres.map((genre: any) => genre.id);
            
            let title ;
            if(mediaType === "movie"){
                title = MediaData.title}
            else{
                title = MediaData.original_name;
            }

            let release;
            if(mediaType === "movie"){
                release = MediaData.release_date}
            else{
                release = MediaData.first_air_date;
            }

            let trailerUrl = MediaData.videos?.results.find((video: any) => video.type === "Trailer" && video.site === "YouTube")?.key;
            
            if (!trailerUrl) {
                trailerUrl = MediaData.videos?.results.find((video: any) => video.site === "YouTube")?.key;
            }
            

            trailerUrl = `https://www.youtube.com/watch?v=${trailerUrl}`

            const newMedia = new MediaCollection({
                title: title,
                MediaId: MediaData.id,
                description: MediaData.overview,
                duration: MediaData.runtime,
                releaseDate: release,
                genres: genres,
                posterUrl: MediaData.poster_path,
                trailerUrl: trailerUrl,
                isAdult: MediaData.adult,
           });

              await newMedia.save();



            return ApiResponse.success(res, "Media found", {
                Media: newMedia,
                similar: MediaData.similar,           
            } );

         
        }

        let similarEndpoint;

        if(mediaType === "movie"){
            similarEndpoint=`/movie/${mediaId}/similar`}
        else{
            similarEndpoint=`/tv/${mediaId}/similar`
        }

        const requestSimilar = await fetchHandler.request("GET", similarEndpoint, undefined, `append_to_response=videos,images,similar`);

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
        const { mediaId } = req.params;

        const {mediaType} = req.query as any;
        let endpoint;

        if(mediaType === "movie"){
            endpoint=`/movie/${mediaId}/similar`}
        else{
            endpoint=`/tv/${mediaId}/similar`
        }

        const request = await fetchHandler.request("GET", endpoint);

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

        const {mediaType} = req.query as any;
        let endpoint;
        if(mediaType === "movie"){
            endpoint=`/discover/movie`}
        else{
            endpoint=`/discover/tv`
        }

        let request = await fetchHandler.request("GET", endpoint, undefined, `page=${page}&sort_by=popularity.${popularity}&with_genres=${genres}`);

        if (!request.success) {
            return ApiResponse.error(res, "Error searching Media", 500);
        }

        return ApiResponse.success(res, "Medias found", request);
    }

    static trendingMedias = async (req: Request, res: Response) => {
        let { page, popularity, genres } = req.query as any;

        let {time} = req.params;

        if(!time){time="day"}

        const {mediaType} = req.query as any;
        let endpoint;
        if(mediaType === "movie"){
            endpoint=`/trending/movie/${time}`}
        else{
            endpoint=`/trending/tv/${time}`
        }

        let request = await fetchHandler.request("GET", endpoint, undefined, ``);

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
    original_name?: string;
    first_air_date?: string;
    }
  

