import axios from 'axios';
import axiosInstance from '../axios-orders';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getGeoLocation = (successCb, failCb) => {
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(successCb, failCb);
    } else {
        failCb();
    }
};

export const getLocationFromGeoCode = async (lat, lng, errorCb) => {
    try {
        const res = await axios.get(`https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=fpdDD1FgeIHoenEB1gGY&app_code=iRyAT-y97a1ZoPSBwouP_g&mode=retrieveAddresses&prox=${lat},${lng}`);
        // simply return the state
        return res.data.Response.View[0].Result[0].Location.Address;
    } catch(err) {
        console.error(err);
        errorCb();
    }
};

export const getLocationFromIP = async (errorCb) => {
    try {
        const res = await axios.get('https://ipapi.co/json');
        return res.data;
    } catch (err) {
        console.error(err);
        errorCb();
    }
}

export const getJobFromLatLng = async (lat, lng, errorCb) => {
    try {
        const res = await axiosInstance.get(`positions.json?lat=${lat}&long=${lng}`);
        return res.data;
    } catch (err) {
        console.error(err);
        errorCb();
    }
}

export const getJobFromLocation = async (loc, errorCb) => {
    try {
        const res = await axiosInstance.get(`positions.json?location=${loc}`);
        return res.data;
    } catch (err) {
        console.error(err);
        errorCb();
    }
}

export const getJobFromSearch = async (loc, desc, errorCb) => {
    try {
        const res = await axiosInstance.get(`positions.json?location=${loc}&description=${desc}`);
        return res.data;
    } catch (err) {
        console.error(err);
        errorCb();
    }
}

export const getRecommendJobs = async (userId, errorCb) => {
    try {
        const res = await axios.get(`http://localhost:8080/Linkedin_war_exploded/recommend?userId=${userId}`);
        return res.data;
    } catch (err) {
        console.log(err);
        errorCb();
    }
}


