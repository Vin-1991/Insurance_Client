import axios from 'axios';

export const getApiCall = async (apiURL) => {
    try {
        const response = await axios.get(apiURL);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const postApiCall = async (apiURL, params) => {
    try {
        const response = await axios.post(apiURL, params);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const patchApiCall = async (apiURL, params) => {
    try {
        const response = await axios.patch(apiURL, params);
        return response;
    } catch (err) {
        console.log(err);
    }
}