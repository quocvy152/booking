
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

export async function getInfoAboutCar(code) {
 
    return await requestAPI(`${ENDPOINT.DETAIL_INFO}?code=${code}`, method.GET);
}

export async function getListProvince() {
 
    return await requestAPI(`${ENDPOINT.LIST_PROVINCE}`, method.GET);
}

export async function getListDistrict(provinceID) {
    // if(provinceID) {
        return await requestAPI(`${ENDPOINT.LIST_DISTRICT_OF_PROVINCE}?province_id=${provinceID}`, method.GET);
    // } else {
    //     return await requestAPI(`${ENDPOINT.LIST_DISTRICT}`, method.GET);
    // }
}

export async function getListWard(districtID) {
    // if(districtID) {
        return await requestAPI(`${ENDPOINT.LIST_WARD_OF_DISTRICT}?district_id=${districtID}`, method.GET);
    // } else {
    //     return await requestAPI(`${ENDPOINT.LIST_WARD_OF_PROVINCE}?province_id=${provinceID}`, method.GET);
    // }
}