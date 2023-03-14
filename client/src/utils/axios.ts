import axios from "axios";
import {API_LINK} from "../data";

const instance = axios.create({
    baseURL: `${API_LINK}/api`
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem("token")

    return config
})

export default instance