
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
    //const parseInfoCarBody = convertObjectToFormData(body);

    return await requestFileAPI(`${ENDPOINT.UPDATE_CAR}`, method.PUT, infoCar, 'application/json-patch+json');
}

export async function bookingCar(infoCar) {

    return await requestAPI(`${ENDPOINT.BOOKING_CAR}`, method.POST, infoCar);
}

export async function getListMyCar(type, page) {

    return await requestAPI(`${ENDPOINT.GET_LIST_MY_CAR}?type=${type}&pageIndex=${page}&limit=${10}`, method.GET);
}

export async function removeCar(carID) {

    return await requestAPI(`${ENDPOINT.REMOVE_CAR}?carId=${carID}`, method.DELETE);
}

export async function cancelBookingCar(carID) {

    return await requestAPI(`${ENDPOINT.CANCEL_BOOKING_CAR}?carId=${carID}`, method.PUT);
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