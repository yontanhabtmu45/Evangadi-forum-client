import axios from 'axios'

const axiosBase = axios.create({
    baseURL: 'http://localhost:7777/api'
})
export default axiosBase