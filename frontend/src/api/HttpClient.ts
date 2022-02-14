import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig, AxiosPromise } from 'axios';

export type { AxiosPromise, AxiosError };
import { getAuthToken, logoutUser } from '@src/store';

import { TypeNameEnum } from '@src/types/models';

const API_URL = '/api';

export enum RESTAPIMetodsEnum {
  GET = 'get',
  POST = 'post', //создание
  PUT = 'put', //обновление
  PATCH = 'patch', //частичное обновление
  DELETE = 'delete',
}

class HttpClient {
  public readonly axios: AxiosInstance;
  private static classInstance?: HttpClient;

  protected constructor(baseURL: string = API_URL) {
    this.axios = axios.create({
      baseURL,
    });
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new this();
    }
    return this.classInstance;
  }
  public static getAppAPI<ResponseT = void, RequestT = object | undefined>(
    url: TypeNameEnum,
    dataRequest?: RequestT,
    method: RESTAPIMetodsEnum = RESTAPIMetodsEnum.GET
  ): AxiosPromise<ResponseT> {
    const httpClient = this.getInstance();
    const onParams = method === RESTAPIMetodsEnum.GET || method === RESTAPIMetodsEnum.DELETE;
    const data = onParams ? null : dataRequest;
    const params = onParams ? dataRequest : null;

    return httpClient.axios({
      method,
      url,
      data,
      params,
    });
  }

  protected _initializeRequestInterceptor = () => {
    this.axios.interceptors.request.use(this._handleRequest, this._handleErrorRequest);
  };

  protected _initializeResponseInterceptor = () => {
    this.axios.interceptors.response.use(this._handleResponse, this._handleErrorResponse);
  };

  protected _handleRequest = (config: AxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      if (!config.headers) {
        config.headers = { Authorization: token };
      } else {
        config.headers.Authorization = token;
      }
    }

    return config;
  };
  protected _handleErrorRequest = (error: AxiosError) => Promise.reject(error);
  protected _handleResponse = (response: AxiosResponse) => response;
  protected _handleErrorResponse = (error: AxiosError) => {
    if (error?.response?.status === 401) {
      // Do something, call refreshToken() request;
      logoutUser();
    }
    return Promise.reject(error);
  };
}

export { HttpClient };
