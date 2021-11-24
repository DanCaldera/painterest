import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://api.imgur.com/',
  timeout: 1000,
  headers: {
    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_IMGUR_TOKEN,
  },
})
