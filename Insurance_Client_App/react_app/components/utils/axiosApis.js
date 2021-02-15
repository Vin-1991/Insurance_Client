import axios from 'axios';

//Get API Call function
export const getApiCall = async (apiURL) => {
    try {
        const response = await axios.get(apiURL);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

//Post API Call function
export const postApiCall = async (apiURL, params) => {
    try {
        const response = await axios.post(apiURL, params);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

//Patch API Call function
export const patchApiCall = async (apiURL, params) => {
    try {
        const response = await axios.patch(apiURL, params);
        return response;
    } catch (err) {
        console.log(err);
    }
}