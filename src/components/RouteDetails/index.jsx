import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import CompareRoutes from '../CompareRoutes';
import './style.css';
import { downloadCSV, fetchRouteData } from '../../services/routeService';

const RouteDetails = ({
  routeId,
  setOptimizeRoute,
  showOptimizeRoute,
  setShowComparison,
  showComparison
}) => {
  const [route, setRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch route details
  const fetchRouteDetails = useCallback(async () => {
    if (!routeId) return;

    try {
      setIsLoading(true);
      setError(null);
      const routeData = await fetchRouteData(routeId);

      // Detailed console logging
      // console.group('Route Data Details');
      // console.log('Full Route Data:', routeData);
      // console.log('Route Details:', routeData.route);
      if (routeData.route) {
        // console.log('Route Number:', routeData.route.route_number);
        // console.log('Customer Name:', routeData.route.customer_name);
        // console.log('Service Date:', routeData.route.service_date);
        // console.log('Address:', routeData.route.address);
        // console.log('City:', routeData.route.city);
        // console.log('State:', routeData.route.state);
        // console.log('ZIP:', routeData.route.zip);
        console.log('Container Details:', {
          type: routeData.route.current_container_type,
          size: routeData.route.current_container_size
        });
        console.log('Service Details:', {
          type: routeData.route.service_type_cd,
          window: routeData.route.SERVICE_WINDOW_TIME
        });
        // console.log('Driver Code:', routeData.route.driver_code);
        // console.log('Notes:', routeData.route.notes_1);
      }
      console.groupEnd();

      setRoute(routeData.route);
    } catch (err) {
      console.error('Error Details:', {
        message: err.message,
        stack: err.stack,
        response: err.response
      });
      setError('Failed to fetch route details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [routeId]);

  useEffect(() => {
    fetchRouteDetails();
  }, [fetchRouteDetails]);

  // Event handlers
  const handleCompareClick = useCallback(() => {
    setShowComparison(prev => !prev);
  }, [setShowComparison]);

  const handleDownloadCsvClick = useCallback(async () => {
    try {
      setIsLoading(true);
      await downloadCSV(routeId);
    } catch (err) {
      console.error('Error downloading CSV:', err);
      setError('Failed to download CSV. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [routeId]);

  const handleOptimizeRoute = useCallback(() => {
    setOptimizeRoute(true);
  }, [setOptimizeRoute]);

  const handleHideComparison = useCallback(() => {
    setShowComparison(false);
    setOptimizeRoute(false);
  }, [setShowComparison, setOptimizeRoute]);

  // Loading state
  if (isLoading) {
    return <div className="route-details">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="route-details">{error}</div>;
  }

  // No route data
  if (!route) {
    return <div className="route-details">No route details available</div>;
  }

  const {
    route_number,
    customer_name,
    address,
    city,
    state,
    service_date,
    ticket_number,
    current_container_type,
    current_container_size,
    service_type_cd,
    zip,
    driver_code,
    service_time
    ,
    notes_1,
  } = route;

  return (
    <div className="route-details">
      <h2>Route Details</h2>

      {/* Route Information */}
      {!showComparison && (
        <div className="route-info">
          <h3>Route ID: {route_number}</h3>
          <p><strong>Customer Name:</strong> {customer_name || 'N/A'}</p>
          <p><strong>Address:</strong> {[address, city, state, zip].filter(Boolean).join(', ') || 'N/A'}</p>
          <p><strong>Service Date:</strong> {service_date || 'N/A'}</p>
          <p><strong>Ticket Number:</strong> {ticket_number || 'N/A'}</p>
          <p><strong>Container Type:</strong> {current_container_type || 'N/A'}</p>
          <p><strong>Container Size:</strong> {current_container_size || 'N/A'}</p>
          <p><strong>Service Type:</strong> {service_type_cd || 'N/A'}</p>
          <p><strong>Driver Code:</strong> {driver_code || 'N/A'}</p>
          {notes_1 && <p><strong>Notes:</strong> {notes_1}</p>}
        </div>
      )}

      {/* Compare Routes Component */}
      {showComparison && (
        <div className={`compare-routes ${showComparison ? '' : 'hidden'}`}>
          <CompareRoutes route_id={routeId} />
        </div>
      )}

      {/* Action Buttons */}
      <div className="buttons-container">
        {!showOptimizeRoute && !showComparison && (
          <button
            className="compare-button"
            onClick={handleOptimizeRoute}
            disabled={isLoading}
          >
            Optimize Route
          </button>
        )}

        {showOptimizeRoute && !showComparison && (
          <button
            className="compare-button"
            onClick={handleCompareClick}
            disabled={isLoading}
          >
            Compare Routes
          </button>
        )}

        {showComparison && (
          <>
            <button
              className="compare-button hide-button"
              onClick={handleHideComparison}
              disabled={isLoading}
            >
              Hide Comparison
            </button>
            <button
              className="compare-button"
              onClick={handleDownloadCsvClick}
              disabled={isLoading}
            >
              Download CSV
            </button>
          </>
        )}
      </div>
    </div>
  );
};

RouteDetails.propTypes = {
  routeId: PropTypes.string.isRequired,
  setOptimizeRoute: PropTypes.func.isRequired,
  showOptimizeRoute: PropTypes.bool.isRequired,
  setShowComparison: PropTypes.func.isRequired,
  showComparison: PropTypes.bool.isRequired,
};

export default RouteDetails;