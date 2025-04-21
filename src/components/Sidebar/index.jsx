/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import RouteDetails from '../RouteDetails';
import './style.css';
import { downloadFull } from '../../services/routeService';

const Sidebar = ({ routes, selectedRoute, onRouteSelect, setOptimizeRoute, showOptimizeRoute, setShowComparison, showComparison, isToggled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRouteChange = async (event) => {
    const route_number = event.target.value;
    setOptimizeRoute(false)
    onRouteSelect(route_number)
  };

  const handleFullDownloadClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await downloadFull();
      if (!data.success) {
        setError(data.error);
        return;
      }
    } catch (err) {
      console.error('Error downloading CSV:', err);
      setError('Failed to download CSV. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);


  return (
    <div className="sidebar">
      <h2>Select Route</h2>
      <select value={selectedRoute} onChange={handleRouteChange} className='mb-0'>
        <option value="">Select Route</option>
        {routes?.map((route, index) => (
          <option key={index} value={route.route_number}>
            {route.route_number}
          </option>
        ))}
      </select>
      <button className="download-button" onClick={handleFullDownloadClick} disabled={isLoading}>{isLoading ? "Downloading..." : "Download CSV"}</button>
      {error && <small className="color-red">{error}</small>}
      {selectedRoute && <RouteDetails 
        key={`${selectedRoute}-${isToggled}`}
        routeId={selectedRoute} 
        setOptimizeRoute={setOptimizeRoute} 
        showOptimizeRoute={showOptimizeRoute} 
        setShowComparison={setShowComparison} 
        showComparison={showComparison} 
      />}
    </div>
  );
};

export default Sidebar;
