import axios from 'axios';

export const fetchUser = async (data) => {
    try {
        const response = 
        	await axios.post('http://127.0.0.1:8000/api/login/', );
        return response.data;
    } catch (error) {
        throw error;
    }
};