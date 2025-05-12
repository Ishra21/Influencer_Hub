import axios from "axios";

const fetchInfluencers = async () => {
    const response = await axios.get("/api/influencer");
    return response.data;
};

const fetchInfluencer = async (id) => {
    const response = await axios.get("/api/influencer/single/" + id);
    // console.log(response.data);  // ✅ You can keep this for debugging
    return response.data;        // ❗️You MUST return the data
};

const influencerService = { fetchInfluencers, fetchInfluencer };

export default influencerService;
