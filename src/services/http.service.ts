import axios from "axios";
import TokenUtils from "../utils/token.utils";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;
axios.defaults.baseURL = baseURL;
const token = TokenUtils.getToken() as string;
const setJWT = (token: string) => {
  axios.defaults.headers.common["Authorization"] = token;
};
setJWT(token);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWT,
};
