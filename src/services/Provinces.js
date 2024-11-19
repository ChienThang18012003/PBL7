import axios from "axios";

export const apiGetPublicProvinces = async () => {
    try {
        const response = await axios.get('https://vapi.vnappmob.com/api/province/');
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
