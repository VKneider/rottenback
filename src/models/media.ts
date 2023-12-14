import { model, Schema, Document } from "mongoose";

import "dotenv/config"

export interface IMedia extends Document {
title : string;
description : string;
duration : number;
releaseDate : Date;
genres : string[];
posterUrl : string;
trailerUrl : string;
MediaId : number;
isAdult : boolean;

}

const MediaSchema = new Schema<IMedia>({
    title : {
    type : String,
    required : true,
    },
    MediaId : {
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

const MediaCollection = model<IMedia>("Media", MediaSchema);

export default MediaCollection;

