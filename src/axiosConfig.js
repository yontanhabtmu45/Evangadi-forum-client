import axios from 'axios'

const axiosBase = axios.create({
    // local
    // baseURL: 'http://localhost:5700/api'
    
    // production
    baseURL: 'https://evangadi-forum-server-r645.onrender.com/api'
})
export default axiosBase