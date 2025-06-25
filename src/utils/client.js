import axios from 'axios';


const client = axios.create({
    baseURL: 'https://new-backend-4ljf.onrender.com',
    //baseURL: 'https://hirehub-backend-j38m.onrender.com/',
    //baseURL: 'http://localhost:4000',
    timeout: 20000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
