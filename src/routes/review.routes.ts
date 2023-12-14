import {Router} from 'express'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import ReviewController
 from '../controllers/review.controller.js';
let ReviewRouter = Router();

ReviewRouter.get("/media/:mediaId", ReviewController.getReviewsFromMedia);
ReviewRouter.get("/user/:userId", ReviewController.getReviewsFromUser);
ReviewRouter.post("/",  ReviewController.createReview);
ReviewRouter.put("/",  ReviewController.updateReview);
ReviewRouter.delete("/:reviewId",  ReviewController.deleteReview);

export default ReviewRouter;
