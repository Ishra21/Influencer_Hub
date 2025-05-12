import axios from "axios";
import { BASE_URL } from "../../config";

const fetchInfluencers = async () => {
    const response = await axios.get(`${BASE_URL}/api/influencer`);
    return response.data;
};

const fetchInfluencer = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/influencer/single/` + id);
    // console.log(response.data);  // ✅ You can keep this for debugging
    return response.data;        // ❗️You MUST return the data
};

const influencerService = { fetchInfluencers, fetchInfluencer };

export default influencerService;
