/* eslint-disable no-unused-vars */
import createApiClient from '../helpers/apiClient';
import { optimizedRouteResponse, results, manualRouteResponse } from "../data/results";

export const fetchRouteData = async (routeId) => {
  try {
    const apiClient = createApiClient();
    const response = await apiClient.get(`/get-route-details/${routeId}`);
    
    return { success: true, route: response.data.route[0] };
  } catch (error) {
    console.error("Error fetching route data:", error);
    return { success: false, error: error.message };
  }
};

  export const optimizeRouteData = async(isToggled, routeId) => {
      try {
        const baseUrl = isToggled ? 'http://localhost:8000/api/v2' : 'http://localhost:8000/api/v1';
        const apiClient = createApiClient(baseUrl);
        const response = await apiClient.get(`/route-map/optimal/${routeId}`);
        
        return { success: true, html: response.data };
      } catch (error) {
        console.error("Error fetching route data:", error);
        return { success: false, error: error.message };
      }
  };

  export const manualRouteData = async(isToggled, routeId) => {
      try {
        const baseUrl = isToggled ? 'http://localhost:8000/api/v2' : 'http://localhost:8000/api/v1';
        const apiClient = createApiClient(baseUrl);
        const response = await apiClient.get(`/route-map/manual/${routeId}`);
        
        //console.log(response)
        return { success: true, html: response.data };
      } catch (error) {
        console.error("Error fetching route data:", error);
        return { success: false, error: error.message };
      }
  };
  export const getComparisonMap = async(isToggled, routeId) => {
      try {
        const baseUrl = isToggled ? 'http://localhost:8000/api/v2' : 'http://localhost:8000/api/v1';
        const apiClient = createApiClient(baseUrl);
        const response = await apiClient.get(`/route-map/comparison/${routeId}`);
        
        return { success: true, html_manual: response.data.html_manual, html_optimal: response.data.html_optimal };
      } catch (error) {
        console.error("Error fetching route data:", error);
        return { success: false, error: error.message };
      }
  };
  export const getComparisonData = async (isToggled, routeId) => {
    try {
      const baseUrl = isToggled ? 'http://localhost:8000/api/v2' : 'http://localhost:8000/api/v1';
      const apiClient = createApiClient(baseUrl);
      const response = await apiClient.get(`/route-comparison/${routeId}`);
      //console.log(JSON.stringify(response),"response")
      return { success: true, route: response.data.route };
    } catch (error) {
      console.error("Error fetching route data:", error);
      return { success: false, error: error.message };
    }
  };
  const BACKEND_URL = import.meta.VITE_BACKEND_API_URL || 'http://localhost:8000/api/v1'

  export const downloadCSV = async () => {
    try {
      // Hardcode the filename as "sequence_row.csv"
      const filename = "sequence_row.csv";
      // URL-encode the filename (optional since it's already safe)
      const encodedFilename = encodeURIComponent(filename);
      // Call the backend endpoint with the query parameter "filename"
      const apiClient = createApiClient();
      const response = await apiClient.get(`/download-csv?filename=${encodedFilename}`, { responseType: 'blob' });
  
      // Create a URL for the blob and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
  
      return { success: true };
    } catch (error) {
      console.error("Error downloading CSV:", error);
      return { success: false, error: error.message };
    }
  };

  export const downloadFull = async () => {
    try {
      const apiClient = createApiClient();
      const response = await apiClient.get(`/download-full`, { responseType: 'blob', timeout: 600000});
  
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'download.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
  
      return { success: true };
    } catch (error) {
      console.error("Error downloading ZIP:", error);
      return { success: false, error: error.message };
    }
  };
  