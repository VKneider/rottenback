import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import movieCollection from "../models/movie.js";
import fetchHandler from "../utils/FetchHandler.js";

export default class MovieController {

    static searchMovie = async (req: Request, res: Response) => {
        const { query } = req.params;
        const request = await fetchHandler.request("GET", "/search/movie", undefined, `query=${query}`);

        if (!request.success) {
            return ApiResponse.error(res, "Error searching movie", 500);
        }        

        return ApiResponse.success(res, "Movies found", request);
    }


    static getMovie = async (req: Request, res: Response) => {
        const { movieId } = req.params;
        const movie = await movieCollection.findById(movieId);

        if (!movie) {
            return ApiResponse.notFound(res, "Movie not found");
        }

        return ApiResponse.success(res, "Movie found", movie);
    }

    

}