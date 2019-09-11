import axios from 'axios';
import axiosInstance from '../axios-orders';
import { database } from '../firebase/firebase';

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

export const saveJobsIntoDB = (jobs) => {
    console.log('save');
    jobs.forEach(job => {
        database.ref('jobs/' + job.id).set({
            type: job.type,
            url: job.how_to_apply.match(/href="(.*?)"/)[1],
            created_at: job.created_at,
            company: job.company,
            location: job.location,
            title: job.title,
            description: job.description,
            company_logo: job.company_logo
        });
    });
}
