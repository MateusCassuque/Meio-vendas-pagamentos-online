const axios = require('axios')

const setBearerToken = token => {
    api.defaults.headers['Authorization'] = `Bearer ${token}`

}

const api = axios.create({
    // baseURL: 'http://192.168.1.100:3000/'
    // baseURL: 'http://127.0.0.1:3000/'
    baseURL: 'https://mvpo-back-end.onrender.com/'
})


export { api, setBearerToken }