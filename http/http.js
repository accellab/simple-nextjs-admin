import Axios from 'axios';
import Config from '../config/config';

const defaultHeaders = {
  'x-custom-fitco-shop-guest-authentication': 'FITCO-SHOP',
  'Access-Control-Allow-Origin': '*',
};

const getBaseUrl = (url) => {
  return Config.api.host + url;
};

export const Request = async (url, method, params, body, headers = {}) => {
  try {
    const { data } = await Axios({
      url: getBaseUrl(url),
      headers: { ...defaultHeaders, ...headers },
      method,
      params: params || '',
      data: body || '',
      withCredentials: true
    });
    return data;
  } catch (error) {
    throw error;
  }
};
