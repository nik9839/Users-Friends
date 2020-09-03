import axios from 'axios'

{/* Function to get all User */}
export const getUsers = async (page, size) => {
    try{
        let url = "/api/v1/users?page="+(page+1)+"&size="+size;
        let response  = await axios.get(url)
        return response.data
    }
    catch(error){
        throw error
    }     
}

{/* Function to get deatils of a  User */}
export const getUser = async (userId) =>{
    try{
        let url = "/api/v1/users/"+userId;
        let response  = await axios.get(url)
        return response.data
    }
    catch(error){
        throw error
    }    
}

{/* Function to get friends of a  User */}
export const getFriends = async(userId, page, size) => {
    try{
        let url = "/api/v1/user/"+userId+"/friends?page="+(page+1)+"&size="+size;
        let response = await axios.get(url)
        return response.data
    }
    catch(error){
        throw error
    }   
}

{/* Function to get friends-of-friends of a  User */}
export const getFriendsOfFriends = async(userId, page, size) => {
    try{
        let url = "/api/v1/user/"+userId+"/friends-of-friends?page="+(page+1)+"&size="+size;
        let response = await axios.get(url)
        return response.data
    }
    catch(error){
        throw error
    }     
}
