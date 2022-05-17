
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

export async function getListCarPrepare(querys) {
 
    return await requestAPI(`${ENDPOINT.LIST_CAR_PREPARE}?${querys}`, method.GET);
}

export async function createCar(infoCar) {
    const parseInfoCarBody = convertObjectToFormData(infoCar);

    return await requestFileAPI(`${ENDPOINT.REGISTER_CAR}`, method.POST, parseInfoCarBody, 'multipart/form-data');
}

export async function updateCar(infoCar) {
    const body = {
        id: 67,
        name: "string",
        description: "string",
        price: 220000,
        brandId: 1,
        provinceId: 1,
        districtId: 1,
        wardId: 1,
        address_booking: "sssss",
        rules: "ssss",
        detail_ids: "34,21"
      }

    const parseInfoCarBody = convertObjectToFormData(body);

    return await requestAPI(`${ENDPOINT.REGISTER_CAR}`, method.PUT, parseInfoCarBody);
}

export async function bookingCar(infoCar) {

    return await requestAPI(`${ENDPOINT.BOOKING_CAR}`, method.POST, infoCar);
}

export async function getListMyCar(type) {

    return await requestAPI(`${ENDPOINT.GET_LIST_MY_CAR}?type=${type}`, method.GET);
}

export async function removeCar(carID) {

    return await requestAPI(`${ENDPOINT.REMOVE_CAR}?carId=${carID}`, method.DELETE);
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