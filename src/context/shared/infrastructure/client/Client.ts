import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import AxiosClientFactory from './AxiosClientFactory';
import { HttpVerbs } from '../constants/HttpVerbs';

export default class Client extends AxiosClientFactory {
  private headers: AxiosRequestHeaders;

  constructor() {
    super();
    this.headers = {
      'Accept': 'application/json',
    }
  }

  async get<R>(url: string): Promise<AxiosResponse<R>> {
    return this.invoke<R, void>(url, HttpVerbs.GET, this.headers)
  }

  async post<D, R>(url: string, body: D | any = {}): Promise<AxiosResponse<R>> {
    return this.invoke<R, D>(url, HttpVerbs.POST, this.headers, body)
  }

  async patch<D, R>(url: string, body: D): Promise<AxiosResponse<R>> {
    return this.invoke<R, D>(url, HttpVerbs.PATCH, this.headers, body)
  }

  async put<D, R>(url: string, body: D): Promise<AxiosResponse<R>> {
    return this.invoke<R, D>(url, HttpVerbs.PUT, this.headers, body)
  }

  async delete(url: string): Promise<AxiosResponse<void>> {
    return this.invoke<void, void>(url, HttpVerbs.DELETE, this.headers)
  }
}
