import axios from 'axios'

const api = axios.create({
   baseURL: 'htttps:api.github.com'
});

export default api;