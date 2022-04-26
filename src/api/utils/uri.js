const BASE_APP_USERS = '/AppUsers';
const BASE_CARS      = '/Cars';
const BASE_LOCATION  = '/Location';
const BASE_BRANDS     = '/Brands';
const BASE_TOKEN     = '/Token';

/* eslint-disable */
export const ENDPOINT = {
  
  // AppUsers
  REGISTER: `${BASE_APP_USERS}/Registration`,
  RESET_PASSWORD: `${BASE_APP_USERS}/ResetPassword`,
  INFO_USER: `${BASE_APP_USERS}/Info`,

  // Cars
  CREATE_CAR: `${BASE_CARS}`,

  // Brands
  LIST_BRAND: `${BASE_BRANDS}`,

  // Location
  LIST_PROVINCE: `${BASE_LOCATION}/provinces`,
  LIST_DISTRICT: `${BASE_LOCATION}/districts`,
  LIST_DISTRICT_OF_PROVINCE: `${BASE_LOCATION}/district-by-province`,
  LIST_WARD_OF_DISTRICT: `${BASE_LOCATION}/ward-by-district`,
  LIST_WARD_OF_PROVINCE: `${BASE_LOCATION}/ward-by-province`,

  // Token
  CREATE_TOKEN: `${BASE_TOKEN}`,

};


