import prisma from "../../prismaConfig";

export const createUserRepo = async(userData:any) => {
    return await prisma.user.create({
        data: userData,
    })
}

export const getAllUsersRepo = async () => {
    return await prisma.user.findMany({
        where:{
            isDeleted:false
        }
    })
}

export const gteUserByIdRepo = async ( userId:string ) => {
    return await prisma.user.findMany({
        where:{
            AND:[
                {
                    id: userId,
                },
                {
                    isDeleted: false
                }

            ],
        },
        
    })
}

export const updateUserByIdRepo = async ( userId:string, userData:any ) =>{
    return await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            ...userData
        }
    })
}

export const deleteUserByIdRepo = async (userId:string) => {
    const userData = await gteUserByIdRepo(userId);
    console.log("🚀 deleteUserByIdRepo ~ userData: ", userData)
    
    if(!userData.length){
        throw(`No User Found `)
    }
    userData[0].isDeleted = true;
    console.log("isDeleted ",userData[0].isDeleted);
    delete (userData[0].id);
    return await updateUserByIdRepo(userId,userData[0]).then((user:any) => {
        console.log("🚀 updateUserByIdRepo ~ user: Response after deleting | ", user)
        return 'User Deleted Successfully';
    })

}