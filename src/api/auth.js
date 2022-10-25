
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
    // const parseBody = convertObjectToFormData(body);

    return await requestFileAPI(`${ENDPOINT.REGISTER}`, method.POST, body, 'application/json');
};

export async function getInfoUser() {
 
    return await requestAPI(`${ENDPOINT.INFO_USER_CURRENT}`, method.GET);
};

export async function getListUser({ name }) {
 
    return await requestAPI(`${ENDPOINT.LIST_USER}?name=${name}`, method.GET);
};

export async function updateStatuUser({ userID }) {
 
    return await requestAPI(`${ENDPOINT.UPDATE_STATUS_USER}?user=${userID}`, method.POST);
};

export async function updateUser(infoUserUpdate) {
    // const parseBody = convertObjectToFormData(infoUserUpdate);
    return await requestFileAPI(`${ENDPOINT.UPDATE_USER}/update/${infoUserUpdate.userID}`, method.PUT, infoUserUpdate);
};

export async function updateValidateInfo(infoUserUpdate) {
    // const parseBody = convertObjectToFormData(infoUserUpdate);
 
    return await requestFileAPI(`${ENDPOINT.UPDATE_VALIDATE_INFO}?user=${infoUserUpdate.userID}`, method.PUT, infoUserUpdate);
};

export async function changePassword(bodyChangePass) {

    return await requestAPI(`${ENDPOINT.CHANGE_PASSWORD}`, method.POST, bodyChangePass);
};

export async function resetPassword(body) {
 
    return await requestAPI(`${ENDPOINT.RESET_PASSWORD}`, method.PUT, body);
};

export async function changeAvatar(infoAvatar) {
    const parseBody = convertObjectToFormData(infoAvatar);

    return await requestFileAPI(`${ENDPOINT.UPDATE_AVATAR}`, method.POST, parseBody, 'multipart/form-data;');
}