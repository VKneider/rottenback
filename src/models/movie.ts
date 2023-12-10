import { model, Schema, Document } from "mongoose";

import "dotenv/config"

export interface IMovie extends Document {
title : string;
description : string;
duration : number;
releaseDate : Date;
genres : string[];
posterUrl : string;
trailerUrl : string;
movieId : number;
isAdult : boolean;

}

const movieSchema = new Schema<IMovie>({
    title : {
    type : String,
    required : true,
    },
    movieId : {
    type : Number,
    required : true,
    },
    description : {
    type : String,
    required : false,
    },
    duration : {
    type : Number,
    required : false,
    },
    releaseDate : {
    type : Date,
    required : true,
    },
    genres : {
    type : [Number],
    required : true,
    },
    posterUrl : {
    type : String,
    required : true,
    },
    trailerUrl : {
    type : String,
    required : true,
    },
    isAdult : {
    type : Boolean,
    required : true,
    }
});

const movieCollection = model<IMovie>("Movie", movieSchema);

export default movieCollection;

