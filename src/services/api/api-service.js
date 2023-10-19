import axios from "axios";

const BASE_URL = 'https://systemapi.mzxt.in';

const getDiskDetails = async () => {
    return axios.get(`${BASE_URL}/disk`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            throw new Error();
        });
}

const getSystemDetails = async () => {
    return axios.get(`${BASE_URL}/system`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            throw new Error();
        });
}

const getOSDetails = async () => {
    return axios.get(`${BASE_URL}/os`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            throw new Error();
        });
}

const getCPUDetails = async () => {
    return axios.get(`${BASE_URL}/cpu`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            throw new Error();
        });
}

const getBatteryDetails = async () => {
    return axios.get(`${BASE_URL}/battery`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            throw new Error();
        });
}

export {
    getDiskDetails,
    getSystemDetails,
    getOSDetails,
    getBatteryDetails,
    getCPUDetails
}