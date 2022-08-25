
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
 
    // return await requestAPI(`${ENDPOINT.LIST_CAR_PREPARE}?${querys}`, method.GET);
    return await requestAPI(`${ENDPOINT.LIST_CAR_PREPARE}`, method.GET);
}

export async function createCar(body) {
    const parseBody = convertObjectToFormData(body);

    return await requestFileAPI(`${ENDPOINT.REGISTER_CAR_v2}`, method.POST, parseBody, 'multipart/form-data;');
};

export async function updateCar(infoCar) {
    const parseInfoCarBody = convertObjectToFormData(infoCar);

    return await requestFileAPI(`${ENDPOINT.UPDATE_CAR}/${infoCar.id}`, method.PUT, parseInfoCarBody, 'multipart/form-data;');
}

export async function bookingCar(infoCar) {

    return await requestAPI(`${ENDPOINT.BOOKING_CAR}`, method.POST, infoCar);
}

// export async function getListMyCar(type, page) {

//     return await requestAPI(`${ENDPOINT.GET_LIST_MY_CAR}?status=${type}&pageIndex=${page}&limit=${100}`, method.GET);
// }
export async function getListMyCar() {

    return await requestAPI(`${ENDPOINT.GET_LIST_MY_CAR}`, method.GET);
}

export async function getListCarBooking(type, page) {

    return await requestAPI(`${ENDPOINT.GET_LIST_CAR_BOOKING}?status=${type}&pageIndex=${page}&limit=${100}`, method.GET);
}

export async function removeCar(carID) {

    return await requestAPI(`${ENDPOINT.REMOVE_CAR}?carId=${carID}`, method.DELETE);
}

export async function acceptBookingCar(bodyAcceptBooking) {

    return await requestAPI(`${ENDPOINT.ACCEPT_BOOKING_CAR}`, method.PUT, bodyAcceptBooking);
}

export async function cancelBookingCar(bodyCancelBooking) {

    return await requestAPI(`${ENDPOINT.CANCEL_BOOKING_CAR}`, method.PUT, bodyCancelBooking);
}

export async function payedBookingCar(bodyPayedBooking) {

    return await requestAPI(`${ENDPOINT.PAYED_BOOKING_CAR}`, method.PUT, bodyPayedBooking);
}

export async function acceptPayedBookingCar(bodyAcceptPayedBooking) {

    return await requestAPI(`${ENDPOINT.ACCEPT_PAYED_BOOKING_CAR}`, method.PUT, bodyAcceptPayedBooking);
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