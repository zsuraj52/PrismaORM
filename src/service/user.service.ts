import { createUserRepo, getAllUsersRepo, gteUserByIdRepo, updateUserByIdRepo, deleteUserByIdRepo } from "../repository/user.repository"

export const createUserService = async (userData:any) => {
    try {
        return await createUserRepo(userData);   
    } 
    catch (e) {
        console.log("createUserRepo catch ",e);
        throw(e);
    }
}

export const getAllUsersService = async () =>{
    try {
        const users = await getAllUsersRepo();
        console.log("users ",users);
        if(!users){
            return `NO Users Found!`
        }
        return users;
    } 
    catch (e) {
        console.log("Catch ",e);
        throw(e);
    }
}

export const getUserByIdService = async (userId:string) => {
    try {
        return await gteUserByIdRepo(userId);
    } 
    catch (e) {
        console.log("getUserByIdService | Catch ",e);
        throw(e);
    }
}

export const updateUserByIdService = async ( userId:string, userData:any ) => {
    try {
        return await updateUserByIdRepo(userId,userData);
    } 
    catch (e) {
        console.log("updateUserByIdService | Catch ",e);
        throw(e);    
    }
}

export const deleteUserByIdService = async (userId:string) => {
    try {
        return await deleteUserByIdRepo(userId);
    } catch (e) {
        console.log("deleteUserByIdService | Catch ",e);
        throw(e);    
    }
}