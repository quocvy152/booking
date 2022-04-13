
import { ENDPOINT } from './utils/uri'
import { requestAPI } from './index'
import queryString from 'query-string'
const method = {
    POST: 'POST',
    GET: 'GET',
};

export async function getListBrand(querys) {
 
    let query = queryString.stringify(querys, {sort: false});
    return await requestAPI(`${ENDPOINT.LIST_BRAND}?${query}`, method.GET);
}