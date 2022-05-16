
import { ENDPOINT } from './utils/uri'
import { requestAPI, requestFileAPI } from './index'
import queryString from 'query-string'
import { convertObjectToFormData } from '../utils/utils';

const method = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export async function getListBrand() {
 
    return await requestAPI(`${ENDPOINT.LIST_BRAND}`, method.GET);
}

export async function createCar(infoCar) {
    // const body = {
    //     Name: 'Innova Create',
    //     Description: 'asaassa',
    //     Price: 800000,
    //     BrandId: 1,
    //     ProvinceId: 1,
    //     DistrictId: 1,
    //     WardId: 1,
    //     Address_booking: 'Đây là địa chỉ giao hàng',
    //     Rules: 'Luật lệ',
    //     Detail_ids: '36,44,48,42,58,57,76,77',
    // }

    const parseInfoCarBody = convertObjectToFormData(infoCar);
    return await requestFileAPI(`${ENDPOINT.REGISTER_CAR}`, method.POST, parseInfoCarBody, 'multipart/form-data');
}

export async function getInfoAboutCar(code) {
 
    return await requestAPI(`${ENDPOINT.DETAIL_INFO}?code=${code}`, method.GET);
}

export async function getListProvince() {
 
    return await requestAPI(`${ENDPOINT.LIST_PROVINCE}`, method.GET);
}

export async function getListDistrict(provinceID) {

    return await requestAPI(`${ENDPOINT.LIST_DISTRICT_OF_PROVINCE}?province_id=${provinceID}`, method.GET);
}

export async function getListWard(districtID) {

    return await requestAPI(`${ENDPOINT.LIST_WARD_OF_DISTRICT}?district_id=${districtID}`, method.GET);
}