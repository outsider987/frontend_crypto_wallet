/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { setAlertDialog } from '../store/global';
import { store } from '../store';
// import { getCookie } from '~/utils/cookie';
import { setTokenStorage, cleanTokenStorage } from '~/utils/storage';
import { getTokenStorage } from '../utils/storage';
// import { useNavigate } from 'react-router-dom';

export interface APIResponse<T = any> {
  [x: string]: any;
  data?: T;
  message?: string;
  success?: boolean;
}
export interface APIEorrorResponse<T = any> {
  error?: T;
  message?: string;
  success?: boolean;
}

export const publicApi = (subPath: string = '') => {
  const url = `${process.env.API_URL}/${subPath}`;
  const api = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': process.env.API_URL
    }
  });

  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse<APIResponse, any>) => {
      checkErrorCdoe(response);
      return response;
    },
    (error) => {
      checkErrorCdoe(error.response);
      return error.response;
    }
  );

  return api;
};

export const privateApi = (subPath: string = '') => {
  const api = axios.create({
    baseURL: `${process.env.API_URL}/${subPath}`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });

  api.interceptors.request.use(
    async (config) => {
      const { accessToken } = getTokenStorage();
      if (config.headers)
        config.headers.authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    async (response: AxiosResponse<APIResponse, any>) => {
      checkErrorCdoe(response);
      return response;
    },

    async (error: AxiosError) => {
      if (error.response) {
        // Access Token was expired
        if (error.response.status === 401) {
          // const refreshToken = getCookie('refreshToken');
          const { refreshToken } = getTokenStorage();
          // const navigate = useNavigate();

          try {
            const rs = await axios.post(
              `${process.env.API_URL}/auth/refresh`,
              {
                refreshToken: refreshToken
              },
              {
                headers: {
                  authorization: `Bearer ${refreshToken}`
                }
              }
            );
            checkErrorCdoe(rs);

            if (rs.data.success) cleanTokenStorage();
            setTokenStorage(rs.data.data);

            return api(error.config);
          } catch (_error: any) {
            console.log(_error);

            if (_error.response.status === 401) {
              cleanTokenStorage();
              window.location.reload();
            }
            checkErrorCdoe(_error.response);

            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

async function checkErrorCdoe(
  response: AxiosResponse<APIResponse, any>
  // catchError: any = 'good'
) {
  switch (response.data.success) {
    case false:
      store.dispatch(
        setAlertDialog({
          show: true,
          msg: JSON.stringify(response.data),
          title: 'Error'
        })
      );
      break;

    case true:
      break;

    default:
      break;
  }
}
