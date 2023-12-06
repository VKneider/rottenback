import { model, Schema, Document } from "mongoose";

import "dotenv/config"

export interface IMovie extends Document {
  
title : string;
description : string;
duration : number;
releaseDate : Date;
actors : string[];
directors : string[];
writers : string[];
genres : string[];
posterUrl : string;
trailerUrl : string;
}

const movieSchema = new Schema<IMovie>({
    title : {
    type : String,
    required : true,
    },
    description : {
    type : String,
    required : true,
    },
    duration : {
    type : Number,
    required : true,
    },
    releaseDate : {
    type : Date,
    required : true,
    },
    actors : {
    type : [String],
    required : true,
    },
    directors : {
    type : [String],
    required : true,
    },
    writers : {
    type : [String],
    required : true,
    },
    genres : {
    type : [String],
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
});

const movieCollection = model<IMovie>("Movie", movieSchema);

export default movieCollection;