
import { ENDPOINT } from './utils/uri';
import { requestAPI, requestFileAPI } from './index';
import objectToFormData from "object-to-formdata";
import { convertObjectToFormData } from '../utils/utils';

const method = {
    POST: 'POST',
    GET: 'GET',
};


export async function loginAPI(body) {
 
    return await requestAPI(`${ENDPOINT.LOGIN}`, method.POST, body);
};

export async function registerUser(body) {
    const parseBody = convertObjectToFormData(body);

    return await requestFileAPI(`${ENDPOINT.REGISTER}`, method.POST, parseBody, 'application/json;');
};