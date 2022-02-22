import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = `http://www.fullstackjavascript.cn:3000`;
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

axios.interceptors.response.use((response: AxiosRequestConfig) => {
  if(response.data.err === 1) {
    return Promise.reject(response.data.data)
  }
  return response.data.data
}, err => {
  return Promise.resolve(err)
  // return Promise.reject(err)
})


export default axios;
