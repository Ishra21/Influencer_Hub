import axios from "axios"
import { BASE_URL } from "../../config"

const  register = async(formData)=>{
    const response = await axios.post(`${BASE_URL}/api/auth/register`, formData)
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
}


const  login = async(formData)=>{
    const response = await axios.post(`${BASE_URL}/api/auth/login`, formData)
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
}


const authService = {register, login}

export default authService;