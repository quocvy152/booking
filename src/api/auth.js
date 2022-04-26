
import { ENDPOINT } from './utils/uri';
import { requestAPI, requestFileAPI } from './index';
import { convertObjectToFormData } from '../utils/utils';

const method = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export async function loginAPI(body) {
    
    return await requestAPI(`${ENDPOINT.CREATE_TOKEN}`, method.POST, body);
};

export async function registerUser(body) {
    const parseBody = convertObjectToFormData(body);

    return await requestFileAPI(`${ENDPOINT.REGISTER}`, method.POST, parseBody, 'application/json');
};

export async function getInfoUser() {
 
    return await requestAPI(`${ENDPOINT.INFO_USER}`, method.GET);
};

export async function resetPassword(Username) {
 
    return await requestAPI(`${ENDPOINT.RESET_PASSWORD}?username=${Username}`, method.PUT);
};