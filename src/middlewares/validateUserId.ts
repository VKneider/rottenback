import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/ApiResponse.js";


function areValuesEqual(value1: string, value2: string): boolean {
    return value1 === value2;
}


export default function validateUserIdToken(req:any, res: Response, next: NextFunction) {


    const httpMethod = req.method; 

    if (httpMethod === "GET" || httpMethod === "DELETE") {
        let userId;
        
        if(req.params.userId){
            userId = req.params.userId;
        }

        if(req.query.userId){
            userId = req.query.userId as string;
        }

        const idUserToken = req.user.id as any;

        if (!areValuesEqual(userId as string, idUserToken)) {
            return ApiResponse.unauthorized(res, "Unauthorized access");
        }else{
            next();
        }

    } else {
        
        const {idUserToken, userId} = req.body;
        
        if (!areValuesEqual(userId, idUserToken)) {
            return ApiResponse.unauthorized(res, "Unauthorized access");
        }else{
            next();
        }
       
    }

}

