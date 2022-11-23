
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
    return await requestAPI(`${ENDPOINT.LIST_CAR_PREPARE}?${querys}`, method.GET);
}

export async function createCar(body) {
    // const parseBody = convertObjectToFormData(body);

    return await requestFileAPI(`${ENDPOINT.REGISTER_CAR_v2}`, method.POST, body);
};

export async function updateCar(infoCar) {
    // const parseInfoCarBody = convertObjectToFormData(infoCar);

    return await requestFileAPI(`${ENDPOINT.UPDATE_CAR}/${infoCar.id}`, method.PUT, infoCar);
}

export async function bookingCar(infoCar) {

    return await requestAPI(`${ENDPOINT.BOOKING_CAR}`, method.POST, infoCar);
}

export async function getListMyCar({ name }) {

    return await requestAPI(`${ENDPOINT.GET_LIST_MY_CAR}?name=${name}`, method.GET);
}

export async function unFavouriteCar({ favouriteID }) {

    return await requestAPI(`${ENDPOINT.UN_FAVOURITE_CAR}/${favouriteID}`, method.DELETE);
}

export async function favouriteCar(body) {

    return await requestAPI(`${ENDPOINT.FAVOURITE_CAR}`, method.POST, body);
}

export async function getListCarFavourite({ userID, name }) {

    return await requestAPI(`${ENDPOINT.GET_LIST_MY_FAVOURITE_CAR}?user=${userID}&name=${name}`, method.GET);
}

export async function getListCustomerBookingMyCar(type, name, typeGetList) {

    return await requestAPI(`${ENDPOINT.GET_LIST_CUSTOMER_BOOKING_MY_CAR}?type=${type}&name=${name}&isActive=${typeGetList}`, method.GET);
}

export async function getListCustomerReturnMyCar(type, name, typeGetList) {

    return await requestAPI(`${ENDPOINT.GET_LIST_CUSTOMER_RETURN_MY_CAR}?type=${type}&name=${name}&isActive=${typeGetList}`, method.GET);
}

export async function getListBookingAdmin(status) {

    return await requestAPI(`${ENDPOINT.GET_LIST_BOOKING_ADMIN}?status=${status}`, method.GET);
}

export async function getListCarBooking(type, name, isActive) {

    return await requestAPI(`${ENDPOINT.GET_LIST_CAR_BOOKING}?type=${type}&name=${name}&isActive=${isActive}`, method.GET);
}

export async function removeCar(carID) {

    return await requestAPI(`${ENDPOINT.REMOVE_CAR}/${carID}`, method.DELETE);
}

export async function acceptBookingCar(bodyAcceptBooking) {

    return await requestAPI(`${ENDPOINT.ACCEPT_BOOKING_CAR}?bookingID=${bodyAcceptBooking.bookingID}`, method.PUT);
}

export async function cancelBookingCar(bodyCancelBooking) {

    // return await requestAPI(`${ENDPOINT.CANCEL_BOOKING_CAR}`, method.PUT, bodyCancelBooking);
    return await requestAPI(`${ENDPOINT.CANCEL_BOOKING_CAR}?bookingID=${bodyCancelBooking.bookingID}`, method.PUT);
}

export async function payedBookingCar(bodyPayedBooking) {

    return await requestAPI(`${ENDPOINT.PAYED_BOOKING_CAR}?bookingID=${bodyPayedBooking.bookingID}`, method.PUT);
}

export async function acceptPayedBookingCar(bodyAcceptPayedBooking) {

    return await requestAPI(`${ENDPOINT.ACCEPT_PAYED_BOOKING_CAR}?bookingID=${bodyAcceptPayedBooking.bookingID}`, method.PUT, bodyAcceptPayedBooking);
}

export async function getListBookingOfCar({ carID, type }) {
    return await requestAPI(`${ENDPOINT.LIST_BOOKING_OF_CAR}?car=${carID}&type=${type}`, method.GET);
}

export async function getListBookingFilter({ carID, type }) {
    return await requestAPI(`${ENDPOINT.LIST_BOOKING_FILTER}?car=${carID}&type=${type}`, method.GET);
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

export async function uploadImgBB({ file }) {
    const parseBody = convertObjectToFormData({ file });

    return await requestAPI(`${ENDPOINT.UPLOAD_IMGBB}`, method.POST, parseBody, 'multipart/form-data;');
}