import { AppConfig } from '@/config';
import axios from 'axios';

// Tạo một instance axios dùng chung
const apiClient = axios.create({
  baseURL: `${AppConfig.API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
