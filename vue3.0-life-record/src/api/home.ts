import { CATEGORY_TYPES } from '@/typings/home';
import axios from './index'


// 声明获取轮播图的接口api
export function getSliders<T>() {
  return axios.get<T, T>('/slider/list');
}


export function getLessons<T>(
  category: CATEGORY_TYPES,
  offset = 0,
  limit = 0
) {
  return axios.get<T, T>(`/lesson/list?category=${category}&offset=${offset}&limit=${limit}`);
}