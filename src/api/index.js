import axios from 'axios';
import { getTokenUser } from '../api/ManagerToken'
import { DEV_ENVI } from './utils/constants' 

// -----------CORE------------
export async function requestAPI(path, method, body, injectHeader) {
    let token           = await getTokenUser();
    const headers = {
      'Content-Type': 'application/json',
      ...injectHeader,
    };
    if(token) {
      headers.Authorization = `Bearer ${token}`,
      headers.token = token
    }

    const url = `${DEV_ENVI.BASE_URL_V2}${path}`;

    let objMeta = {
      method,
      url,
      headers,
    };
    
    if(body) 
      objMeta.data = body

    console.log({ objMeta });

    return await axios(objMeta);
}

export async function requestFileAPI(path, method, body, type, injectHeader) {
  let token           = await getTokenUser();
  const headers = {
    'Content-Type': type,
    ...injectHeader,
  };
  if(token) {
    headers.Authorization = `Bearer ${token}`
  }

  const url = `${DEV_ENVI.BASE_URL_V2}${path}`;

  let objMeta = {
    method,
    url,
    headers,
  };
  
  if(body) 
    objMeta.data = body

  console.log({ objMeta });

  return await axios(objMeta);
}