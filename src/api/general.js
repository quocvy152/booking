
import { ENDPOINT } from './utils/uri'
import { requestAPI } from './index'
import queryString from 'query-string'

const method = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export async function getListBrand() {
 
    return await requestAPI(`${ENDPOINT.LIST_BRAND}`, method.GET);
}