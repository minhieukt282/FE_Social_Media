import axios from "axios";

const customAxios = axios.create({
    baseURL: 'http://118.70.117.39:3001/'
})
export default customAxios;