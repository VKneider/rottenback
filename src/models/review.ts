import { model, Schema, Document, Types  } from "mongoose";
import { number } from "yup";

export interface IReview extends Document {
    userId: Types.ObjectId;
    mediaId: number;
    rating: number;
    content : string;

}

const reviewSchema = new Schema<IReview>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    mediaId: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    content : {
        type : String,
        required : true,
    }
});

const ReviewCollection = model<IReview>("Review", reviewSchema);

export default ReviewCollection;