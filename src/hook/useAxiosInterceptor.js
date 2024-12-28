import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxiosInterceptor = () => {
    const navigate = useNavigate();

    axios.interceptors.request.use(
        (config) => {
            const item = localStorage.getItem('isLoginSuccess');
            if (item) {
                let obj = JSON.parse(item);
                const token = obj.token;
                const base64Url = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(base64Url));
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedPayload.exp < currentTime) {
                    localStorage.removeItem('isLoginSuccess');
                    alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
                    navigate('/login');
                    return Promise.reject(new Error('Token expired'));
                }

                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
};

export default useAxiosInterceptor;
