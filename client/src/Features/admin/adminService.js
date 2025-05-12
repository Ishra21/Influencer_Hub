import axios from "axios"
import { BASE_URL } from "../../config";

const fetchAllUsersForAdmin  = async (token)=>{

const options = {
    headers : {
        authorization : `Bearer ${token}`
    }
}
    const response = await axios.get(`${BASE_URL}/api/admin/users`, options)
    // console.log(response.data)
    return response.data;   
}

const fetchAllCommentsForAdmin  = async (token)=>{

    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    
        const response = await axios.get(`${BASE_URL}/api/admin/comments`, options)
        // console.log(response.data)
        return response.data;   
    }

    const addInfluencer = async (formData, token) => {
        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    
        const response = await axios.post(`${BASE_URL}/api/admin/influencer`, formData, options)
        // console.log(response.data)
        return response.data; // ✅ Return the data to thunk
    }
    

    const updateInfluencer = async (formData, token) => {
        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    
        const response = await axios.put(`${BASE_URL}/api/admin/influencer/` + formData._id, formData, options)
        // console.log(response.data)
        return response.data; // Return the data to thunk
    }
    

    const deleteInfluencer = async (id, token) => {
        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    
        const response = await axios.delete(`${BASE_URL}/api/admin/influencer/${id}`, options);
        // console.log(response.data)
        return response.data; // Return the data to thunk
    }

    const  replyToCommentByAdmin = async (formData, token) => {
    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
        // console.log(formData)
const response = await axios.post(`${BASE_URL}/api/booking/${formData.bid}/comment` , formData, options)
        // console.log(response.data)
        return response.data; // Return the data to thunk           
      }
    
const adminService = {fetchAllUsersForAdmin, fetchAllCommentsForAdmin, addInfluencer, updateInfluencer, deleteInfluencer, replyToCommentByAdmin}

export default adminService;