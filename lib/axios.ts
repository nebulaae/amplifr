import axios from 'axios';

export const api = axios.create({
  baseURL: `http://${process.env.NEXT_PUBLIC_BACKEND_API}`, // backend URL
});