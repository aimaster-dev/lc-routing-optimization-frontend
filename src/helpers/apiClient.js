import axios from 'axios';

const apiClient = (baseUrl) => {
  const createApiClient = axios.create({
    baseURL: baseUrl || import.meta.VITE_BACKEND_API_URL || 'http://localhost:8000/api/v1',
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json',
      ...(typeof window === 'undefined' && { 'User-Agent': 's@gmail.com' }) // Only add User-Agent in non-browser environments
    },
  });

  createApiClient.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  createApiClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return createApiClient;
}

export default apiClient;
