import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import ReviewCollection from "../models/review.js";

export default class ReviewController {

    static getReviewsFromMedia = async (req: Request, res: Response) => {
        const { mediaId } = req.params;
        let reviews = await ReviewCollection.find({ mediaId }).populate("userId").populate("mediaId")

        if (!reviews) {
            return ApiResponse.success(res, "No reviews on film", []);
        }

        return ApiResponse.success(res, "Reviews found", reviews);
    }

    static getReviewsFromUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const reviews = await ReviewCollection.find({ userId }).populate("userId").populate("mediaId")

        if (!reviews) {
            return ApiResponse.success(res, "No reviews from user", []);
        }

        return ApiResponse.success(res, "Reviews found", reviews);
    }
    


    static createReview = async (req: any, res: any) => {
        
        try {
                const { userId, mediaId, content, rating } = req.body;
                const review = await ReviewCollection.create({ userId, mediaId, content, rating });
    
            if (!review) {
                return ApiResponse.error(res, "Error creating review", 500);
            }
    
            return ApiResponse.success(res, "Review created", review);
        } catch (error:any) {
            console.log(error)
        }
        
    }


    static updateReview = async (req: any, res: any) => {
        const { content, rating, reviewId } = req.body;

        const review = await ReviewCollection.findOneAndUpdate({ reviewId }, { content, rating });

        if (!review) {
            return ApiResponse.error(res, "Error updating review", 500);
        }

        return ApiResponse.success(res, "Review updated", review);
    }


    static deleteReview = async (req: any, res: any) => {
        const { reviewId } = req.params;

        const review = await ReviewCollection.findOneAndDelete({ reviewId });

        if (!review) {
            return ApiResponse.error(res, "Error deleting review", 500);
        }

        return ApiResponse.success(res, "Review deleted", review);
    }

}