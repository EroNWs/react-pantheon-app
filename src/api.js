// api.js
import axios from 'axios';

export const fetchConfigurations = async () => {
    try {
        const response = await axios.get('https://pathneonapi20230824160910.azurewebsites.net/api/BuildingConfiguration');
        return response.data; 
    } catch (error) {
        console.error('Error fetching configurations:', error);
        return [];
    }
};
