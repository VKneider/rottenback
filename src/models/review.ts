import { model, Schema, Document, Types  } from "mongoose";

export interface IReview extends Document {
    userId: Types.ObjectId;
    mediaId: Types.ObjectId;
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
        type: Schema.Types.ObjectId,
        ref: "Movie",
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