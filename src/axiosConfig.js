import axios from 'axios'

const axiosBase = axios.create({
    baseURL: 'http://localhost:5700/api'
})
export default axiosBase