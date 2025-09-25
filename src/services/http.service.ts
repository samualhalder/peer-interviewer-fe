import axios from "axios";
import TokenUtils from "../utils/token.utils";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;
axios.defaults.baseURL = baseURL + "/api/";
const token = TokenUtils?.getToken() as string;
const setJWT = (tk: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${tk}`;
};

setJWT(token);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWT,
};
