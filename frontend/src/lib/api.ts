import axios from 'axios';

const API = axios.create({ baseURL: 'https://collage-finder-production.up.railway.app/api' });

export default API;