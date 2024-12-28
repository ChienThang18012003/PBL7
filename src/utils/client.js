import axios from 'axios';


const client = axios.create({
    baseURL: 'https://medibackend.azurewebsites.net',
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
