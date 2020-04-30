/*
 * @Author: your name
 * @Date: 2020-04-29 16:28:27
 * @LastEditTime: 2020-04-29 16:39:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react_zufang/src/utils/api.js
 */
import axios from 'axios'

import { BASE_URL } from './url'

const API = axios.create({
  baseURL: BASE_URL
})

export { API }