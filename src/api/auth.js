
import { ENDPOINT } from './utils/uri';
import { requestAPI } from './index';

const method = {
    POST: 'POST',
    GET: 'GET',
};


export async function loginAPI(body) {
 
    return await requestAPI(`${ENDPOINT.LOGIN}`, method.POST, body);
};

export async function registerAPI(body) {
 
    return await requestAPI(`${ENDPOINT.REGISTER}`, method.POST, body);
};