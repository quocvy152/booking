const BASE_APP_USERS = '/AppUsers';
const BASE_CARS      = '/Cars';
const BASE_LOCATION  = '/Location';
const BASE_BRANDS    = '/Brands';
const BASE_TOKEN     = '/Token';

const VERSION_1      = '/v1';
const VERSION_2      = '/v2';

/* eslint-disable */
export const ENDPOINT = {
  
  // AppUsers
  REGISTER: `${VERSION_1}${BASE_APP_USERS}/Registration`,
  RESET_PASSWORD: `${VERSION_1}${BASE_APP_USERS}/ResetPassword`,
  INFO_USER: `${VERSION_1}${BASE_APP_USERS}/Info`,

  // Cars
  LIST_CAR_PREPARE: `${VERSION_1}${BASE_CARS}/cars`,
  REGISTER_CAR: `${VERSION_1}${BASE_CARS}`,
  REGISTER_CAR_V2: `${VERSION_2}${BASE_CARS}`,
  DETAIL_INFO: `${VERSION_1}/Detail`,

  // Brands
  LIST_BRAND: `${VERSION_1}${BASE_BRANDS}`,

  // Location
  LIST_PROVINCE: `${VERSION_1}${BASE_LOCATION}/provinces`,
  LIST_DISTRICT: `${VERSION_1}${BASE_LOCATION}/districts`,
  LIST_DISTRICT_OF_PROVINCE: `${VERSION_1}${BASE_LOCATION}/district-by-province`,
  LIST_WARD_OF_DISTRICT: `${VERSION_1}${BASE_LOCATION}/ward-by-distric`,
  LIST_WARD_OF_PROVINCE: `${VERSION_1}${BASE_LOCATION}/ward-by-province`,

  // Token
  CREATE_TOKEN: `${VERSION_1}${BASE_TOKEN}`,

};


