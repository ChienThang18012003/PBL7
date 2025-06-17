import axios from 'axios';


const client = axios.create({
    //baseURL: 'https://medibackend.azurewebsites.net',
    baseURL: 'http://localhost:4000',
    timeout: 20000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
