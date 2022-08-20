
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
    
    return await requestAPI(`${ENDPOINT.LOGIN}`, method.POST, body);
};

export async function registerUser(body) {
    const parseBody = convertObjectToFormData(body);

    return await requestFileAPI(`${ENDPOINT.REGISTER}`, method.POST, parseBody, 'application/json');
};

export async function getInfoUser() {
 
    return await requestAPI(`${ENDPOINT.INFO_USER_CURRENT}`, method.GET);
};

export async function updateUser(infoUserUpdate) {
 
    return await requestFileAPI(`${ENDPOINT.UPDATE_USER}`, method.PUT, infoUserUpdate, 'application/json-patch+json');
};

export async function changePassword(bodyChangePass) {
 
    return await requestFileAPI(`${ENDPOINT.CHANGE_PASSWORD}`, method.POST, bodyChangePass, 'application/json-patch+json');
};

export async function resetPassword(Username) {
 
    return await requestAPI(`${ENDPOINT.RESET_PASSWORD}?username=${Username}`, method.PUT);
};

export async function changeAvatar(infoAvatar) {
    const parseBody = convertObjectToFormData(infoAvatar);

    return await requestFileAPI(`${ENDPOINT.CHANGE_AVATAR}`, method.POST, parseBody, 'multipart/form-data;');
}