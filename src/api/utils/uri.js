const BASE_USERS = '/users';
const BASE_CARS      = '/cars';
const BASE_BOOKINGS  = '/bookings';
const BASE_LOCATION  = '/location';
const BASE_BRANDS    = '/brands';
const BASE_TOKEN     = '/Token';
const BASE_FILE      = '/File';
const BASE_CHARACTERISTIC = '/characteristics';

const VERSION_1      = '/v1';
const VERSION_2      = '/v2';

/* eslint-disable */
export const ENDPOINT = {
  
  // AppUsers
  LOGIN: `${BASE_USERS}/login`,
  REGISTER: `${BASE_USERS}`,
  RESET_PASSWORD: `${BASE_USERS}/reset-password`,
  INFO_USER_CURRENT: `${BASE_USERS}/info/current`,
  UPDATE_USER: `${BASE_USERS}`,
  CHANGE_PASSWORD: `${BASE_USERS}/change-password`,
  UPDATE_AVATAR: `${BASE_USERS}/avatar/update`,

  // File
  UPLOAD_FILE: `${BASE_FILE}/upload-file`,

  // Cars
  LIST_CAR_PREPARE: `${BASE_CARS}`,
  REGISTER_CAR: `${BASE_CARS}`,
  REGISTER_CAR_v2: `${BASE_CARS}/register`,
  UPDATE_CAR: `${BASE_CARS}/update`,
  REGISTER_CAR_V2: `${BASE_CARS}`,
  DETAIL_INFO: `${BASE_CHARACTERISTIC}/characteristic-type/list-detail`,
  BOOKING_CAR: `${BASE_BOOKINGS}`,
  GET_LIST_MY_CAR: `${BASE_CARS}/list/my-cars`,
  GET_LIST_CUSTOMER_BOOKING_MY_CAR: `${BASE_BOOKINGS}/list/customer-booking-my-car`,
  GET_LIST_CAR_BOOKING: `${BASE_BOOKINGS}/list/my-booking`,
  REMOVE_CAR: `${BASE_CARS}`,
  CANCEL_BOOKING_CAR: `${BASE_BOOKINGS}/action/cancel-booking`,
  ACCEPT_BOOKING_CAR: `${BASE_BOOKINGS}/action/accept-booking`,
  PAYED_BOOKING_CAR: `${BASE_BOOKINGS}/action/pay-booking`,
  ACCEPT_PAYED_BOOKING_CAR: `${BASE_BOOKINGS}/action/accept-paying`,
  
  // Brands
  LIST_BRAND: `${BASE_BRANDS}`,

  // Location
  LIST_PROVINCE: `${BASE_LOCATION}/provinces`,
  LIST_DISTRICT: `${BASE_LOCATION}/districts`,
  LIST_DISTRICT_OF_PROVINCE: `${BASE_LOCATION}/district-by-province`,
  LIST_WARD_OF_DISTRICT: `${BASE_LOCATION}/ward-list-district`,
  LIST_WARD_OF_PROVINCE: `${BASE_LOCATION}/ward-by-province`,

  // Token
  CREATE_TOKEN: `${BASE_TOKEN}`,

};


