import axios from 'axios';


const client = axios.create({
    //baseURL: 'http://localhost:4000', 
    //baseURL: 'https://backend-nc0v.onrender.com/', 
    //baseURL: 'https://medi-booker-backend.onrender.com/',
    //baseURL: 'https://pbl6-backend-i7pb.onrender.com/',
    baseURL: 'https://medibackend.azurewebsites.net',
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
