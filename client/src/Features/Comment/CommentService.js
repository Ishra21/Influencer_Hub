import axios from "axios";
import { BASE_URL } from "../../config";

const fetchComments = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BASE_URL}/api/booking/${id}/comment`, options);
  return response.data;
};

const createComment = async (formData, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${BASE_URL}/api/booking/${formData.id}/comment`, formData, options);
  return response.data;
};

const commentService = { fetchComments, createComment };
export default commentService;
