import createApiClient from '../helpers/apiClient';

const apiClient = createApiClient();

export const uploadCsv = async (file, landfill_file) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // Use 'file' (matching the FastAPI endpoint)
    formData.append('landfill_file', landfill_file);

    const response = await apiClient.post('/upload-csv/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Return the extracted data from the single file upload response.
    return response.data.data;
  } catch (error) {
    console.error('Error uploading CSV:', error);
    throw error;
  }
};
