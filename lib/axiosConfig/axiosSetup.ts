import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://api.imgur.com/',
  timeout: 1000,
  headers: {
    Authorization: 'Bearer ' + 'd611872356a1a8421c74561e9c1e0e3db41f0d9f',
  },
})
