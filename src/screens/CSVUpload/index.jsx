import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadCsv } from '../../services/fileService';
import './style.css';
import { useNavigate } from 'react-router-dom';

const CSVUpload = ({ setRoutesData }) => {
  const [routeCsvFile, setRouteCsvFile] = useState(null);
  const [landfillCsvFile, setLandFilleCsvFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const navigate = useNavigate();

  // Handle file selection for the route CSV file
  const handleRouteFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setRouteCsvFile(file);
    } else {
      toast.error('Please upload a valid Route CSV file');
      setRouteCsvFile(null);
    }
  };

  const handleLandFillFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setLandFilleCsvFile(file);
    } else {
      toast.error('Please upload a valid Route CSV file');
      setLandFilleCsvFile(null);
    }
  };

  // Handle the file upload
  const handleFileUpload = async () => {
    if (!routeCsvFile) {
      toast.error('Please select a CSV file first!');
      return;
    }

    if (!landfillCsvFile) {
      toast.error('Please select a CSV file first!');
      return;
    }

    setUploadStatus('Uploading...');
    toast.info('Uploading...', { autoClose: 2000 });

    try {
      // Upload the file (uploadCsv will create the FormData)
      const response = await uploadCsv(routeCsvFile, landfillCsvFile);
      setRoutesData(response);

      setUploadStatus('Upload successful!');
      toast.success('Upload successful!');
      navigate('/home');
    } catch (error) {
      setUploadStatus('Upload failed!');
      toast.error('Upload failed!');
      console.error('Error uploading file:', error);
    }
  };

  // Toggle the display of CSV column guidelines
  const toggleInstructions = () => {
    setShowInstructions((prevState) => !prevState);
  };

  return (
    <div className="upload-container">
      <h1 className="welcome-heading">Welcome to Republic Services</h1>
      <h2 className="upload-title">Upload CSV File</h2>
      
      <div className="instructions-container">
        <button className="toggle-btn" onClick={toggleInstructions}>
          {showInstructions ? 'Hide CSV Column Guidelines' : 'Show CSV Column Guidelines'}
        </button>
        {showInstructions && (
          <div className="csv-guidelines">
            <p>Your CSV should have the following columns:</p>
            <ul>
              <li>PK_ACTIVE_ROUTE_DETAILS_ID</li>
              <li>SITE_NUMBER</li>
              <li>ACCOUNT_NAME</li>
              <li>ADDRESS</li>
              <li>CITY</li>
              <li>STATE</li>
              <li>ZIPCODE</li>
              <li>Latitude</li>
              <li>Longitude</li>
              <li>SERVICE_DATE</li>
              <li>date_text</li>
              <li>Route #</li>
              <li>ROUTE_NUM</li>
              <li>DIVISION</li>
              <li>SERVICE_TYPE_CD</li>
              <li>ROUTE_TYPE</li>
              <li>CURRENT_CONTAINER_TYPE</li>
              <li>CURRENT_CONTAINER_SIZE</li>
              <li>CONTAINER_GROUP</li>
              <li>SEQUENCE</li>
              <li>ACCOUNT</li>
              <li>PERM_NOTES</li>
              <li>NOTES1</li>
              <li>NOTES2</li>
              <li>NOTES3</li>
              <li>NOTES4</li>
              <li>SERVICE_STATUS</li>
              <li>ACTIVE_ROUTE_DETAILS_ID</li>
              <li>DISPOSAL_CD</li>
              <li>DISPOSAL_PRICE_CD</li>
              <li>RN</li>
              <li>ROUTE_START_TIME</li>
              <li>ROUTE_STOP_TIME</li>
              <li>ROUTE_START_LATITUDE</li>
              <li>ROUTE_START_LONGITUDE</li>
              <li>DISPOSAL_CD1</li>
              <li>DISPOSAL_PRICE_CD1</li>
              <li>HF_DIVISION_NAME</li>
              <li>HF_SITE_NAME</li>
              <li>HF_ADDRESS_LINE1</li>
              <li>HF_ADDRESS_LINE2</li>
              <li>HF_ADDRESS_CITY</li>
              <li>HF_ADDRESS_STATE</li>
              <li>HF_ADDRESS_POSTAL_CODE</li>
              <li>HL_Lat</li>
              <li>HL_Longt</li>
              <li>DF_FACILITY_NAME</li>
              <li>DF_ADDRESS_LINE1</li>
              <li>DF_ADDRESS_LINE2</li>
              <li>DF_ADDRESS_CITY</li>
              <li>DF_ADDRESS_STATE</li>
              <li>DF_ADDRESS_POSTAL_CODE</li>
              <li>DF_Lat</li>
              <li>DF_Longt</li>
              <li>SERVICE_WINDOW_TIME</li>
            </ul>
          </div>
        )}
      </div>

      <div className="file-input-container">
        <input
          type="file"
          accept=".csv"
          onChange={handleRouteFileChange}
          id="route-csv-file"
          className="file-input"
        />
        <label htmlFor="route-csv-file" className="file-label">
          {routeCsvFile ? routeCsvFile.name : 'Choose Route CSV'}
        </label>
      </div>

      <div className="file-input-container">
        <input
          type="file"
          accept=".csv"
          onChange={handleLandFillFileChange}
          id="landfill-csv-file"
          className="file-input"
        />
        <label htmlFor="landfill-csv-file" className="file-label">
          {landfillCsvFile ? landfillCsvFile.name : 'Choose LandFill CSV'}
        </label>
      </div>

      <button className="upload-btn" onClick={handleFileUpload}>
        Upload
      </button>
      <p className="status">{uploadStatus}</p>
    </div>
  );
};

export default CSVUpload;
