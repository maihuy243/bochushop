import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',   // luôn trỏ vào App Routes
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})
