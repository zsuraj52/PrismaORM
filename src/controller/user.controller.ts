import { Request, Response } from "express";
import { createUserService, getAllUsersService, getUserByIdService, updateUserByIdService, deleteUserByIdService } from "../service/user.service";



export const createUserController = async (req:Request , res:Response) => {
    try{
        console.log("req.body | ",req.body);
        const { username, email, password, address } = req.body;
        if(!username || !email || !password){
            return res.status(400).send({"Status":"FAILED" , "Message": "Failed to create user entry" , "Response":"Please Provide all provided fields"})
        }
        return await createUserService(req.body).then((user:any) => {
            console.log("createUserService | response ",user);
            return res.status(201).send({"Status": "SUCCESS" , "Message": "User Created Successfully" , "Response": user})
        })
    }
    catch(e){
        console.log(`Error in createUserController | ${e}`);
        return res.status(400).send({"Status":"FAILED" , "Message": "Failed to created user entry" , "Response": e })

    }
}


export const getAllUsersController = async (_req:Request , res:Response) => {
    try {
        const users = await getAllUsersService();
        console.log("uuuuuu ",users);
        if(users){   
            console.log("getAllUsersService | response ",users);
            return res.status(200).send({"Status": "SUCCESS" , "Message": "Users Fetched Successfully" , "Response": users})
        }
        else{
            return 'No Users Found!'
        }
    } 
    catch (e) {
        console.log(`Error in getAllUsersController | ${e}`);
        return res.status(400).send({"Status":"FAILED" , "Message": "Failed to retrieve users" , "Response": e })

    }
}

export const getUserByIdController = async (req:Request, res:Response) => {
    try {
        console.log("userId ",req.params?.userId);
        const userId = req.params?.userId;
        if(!userId){
            return res.status(400).send({"Status":"FAILED" , "Message": "Failed to retrieve user" , "Response": `Please Provide User Id` })
        }
        return await getUserByIdService(userId).then((user:any) => {
            console.log("getUserByIdService response ",user);
            if(!user){
            return res.status(400).send({"Status":"FAILED" , "Message": "Failed to retrieve user" , "Response": `No User fFound For Given User Id` })
            }
            return res.status(200).send({"Status":"SUCCESS" , "Message": "User retrieved successfully" , "Response": user })            
        })

    } 
    catch (e) {
        console.log(`Error in getUserByIdController | ${e}`);
        return res.status(400).send({"Status":"FAILED" , "Message": "Failed to retrieve user" , "Response": e })

    }
}

export const updateUserById = async (req:Request , res:Response) => {
    try {
        const userId = req.params?.userId;      
        console.log("🚀 updateUserById ~ userId: ", userId);
        
        const userData = req.body;
        console.log("🚀 updateUserById ~ userData: ", userData)
        
        if( !userId || !userData ){
            return res.status(400).send({"Status":"FAILED" , "Message": "Failed to update user" , "Response": `Please Provide User Id or data to update` })
        }
        return await updateUserByIdService( userId, userData ).then((updatedUser:any) => {
            console.log("🚀 UserByIdService ~ updatedUser:", updatedUser)
            if(!updatedUser){
                throw 'User Updation Failed'
            }
            return res.status(200).send({"Status":"SUCCESS" , "Message": "User updated successfully" , "Response": updatedUser })            
        	
        })
    } 
    catch (e) {
        console.log(`Error in updateUserById | ${e}`);
        return res.status(400).send({"Status":"FAILED" , "Message": "Failed to update user" , "Response": e })
    }
}

export const deleteUserByIdController = async (req:Request , res:Response) => {
    try {
        const userId = req.params?.userId;
        console.log("🚀 deleteUserByIdController ~ userId: ", userId);
        if(!userId){
            return res.status(400).send({"Status":"FAILED" , "Message": "Failed to delete user" , "Response": `Please Provide User Id` })
        }
        return await deleteUserByIdService(userId).then((userResponse:any) => {
            console.log("🚀 returnawaitdeleteUserByIdService ~ userResponse: ", userResponse)
            return res.status(200).send({"Status":"SUCCESS" , "Response": userResponse })
        } )

    } catch (e) {
        console.log(`Error in updateUserById | ${e}`);
        return res.status(400).send({"Status":"FAILED" , "Message": "Failed to delete user" , "Response": e })
    }
} 