
import { ENDPOINT } from './utils/uri';
import { requestAPI, requestFileAPI } from './index';

const method = {
    POST: 'POST',
    GET: 'GET',
};


export async function loginAPI(body) {
 
    return await requestAPI(`${ENDPOINT.LOGIN}`, method.POST, body);
};

export async function registerUser(body) {
 
    return await requestFileAPI(`${ENDPOINT.REGISTER}`, method.POST, body, 'multipart/form-data');
};