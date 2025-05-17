import axios from 'axios'

const axiosBase = axios.create({
    // baseURL: 'http://localhost:5700/api'
    baseURL: 'https://evangadi-forum-server-r645.onrender.com/api'
})
export default axiosBase