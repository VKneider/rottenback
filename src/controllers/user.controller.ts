import UserCollection, { IUser } from "../models/user.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";

export default class UserController {

    static deleteUser = async (req: Request, res: Response) => {
        const { userId: id } = req.body;
        const user = await UserCollection.findById(id);
        if (!user) {
            return ApiResponse.notFound(res, "User not found");
        }

        await user.deleteOne();
        return ApiResponse.success(res, "User deleted");
    }



    static updateUserData = async (req: Request, res: Response) => {
        const { userId: id } = req.body;
        const user = await UserCollection.findById(id);
        if (!user) {
            return ApiResponse.notFound(res, "User not found");
        }

        const updated = await user.updateData(req.body);
        if (!updated) {
            return ApiResponse.error(res, "Error updating user", 400);
        }

        return ApiResponse.success(res, "User updated");
    }

    static searchUser = async (req: Request, res: Response) => {
        const { userId: id, query } = req.params;
        const users = await UserCollection.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { fullName: { $regex: query, $options: "i" } }
            ],
            isDisabled: false
        });

        if (!users) {
            return ApiResponse.notFound(res, "Users not found");
        }

        return ApiResponse.success(res, "Users found", users);
    }

    static getProfileData = async (req: Request, res: Response) => {
        const { userId: id } = req.params;
        const user = await UserCollection.findById(id);

        //tell typescript that req.user is not undefined

        if (!user) {
            return ApiResponse.notFound(res, "User not found");
        }

        if(user.isDisabled){
            return ApiResponse.error(res, "User is disabled");
        }

       

        return ApiResponse.success(res, "User found", {
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            bio: user.bio,
            profilePicture: user.profilePicture,
            isCritic: user.isCritic,
        });
    }

    static getAllUsers = async (req: Request, res: Response) => {

        const { userId: id } = req.params;

        const users = await UserCollection.find({isDisabled: false});
        if (!users) {
            return ApiResponse.notFound(res, "Users not found");
        }

        return ApiResponse.success(res, "Users found", users);
    }
    

}

