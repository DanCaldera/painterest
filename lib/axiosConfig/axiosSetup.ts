import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://api.imgur.com/',
  timeout: 10000,
  headers: {
    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_IMGUR_TOKEN,
  },
})
