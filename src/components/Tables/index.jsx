import { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getComparisonData } from '../../services/routeService';
import './style.css';

const RouteSegmentsTable = ({ route_id, isToggled }) => {
  // State management
  const [tableData, setTableData] = useState([]);
  const [manualStandardData, setManualStandardData] = useState([]);
  const [optimalStandardData, setOptimalStandardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Memoized fetch function to prevent recreation on each render
  const fetchTableData = useCallback(async () => {
    if (!route_id) return;
    
    setLoading(true);
    setError(null); // Clear any previous errors
    
    try {
      const data = await getComparisonData(isToggled, route_id);
      console.log("Fetched table data:", data);
      
      if (data.success) {
        setTableData(data.route.sequence || []);
        setManualStandardData(data.route.aggregate[0]['Table Manual Data'] || []);
        setOptimalStandardData(data.route.aggregate[0]['Table Optimal Data'] || []);
        setDataLoaded(true);
      } else {
        setError(data.error || 'Failed to fetch data');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Failed to fetch table data.');
    } finally {
      setLoading(false);
    }
  }, [route_id, isToggled]);

  // Fetch data when route_id or isToggled changes
  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  // Memoized filtered segments to prevent recalculation on every render
  const optimalSegments = useMemo(() => 
    tableData.filter(row => row.Route_Type === "Optimal"), 
    [tableData]
  );
  
  const manualSegments = useMemo(() => 
    tableData.filter(row => row.Route_Type === "Manual"), 
    [tableData]
  );

  // Memoized calculation functions
  const calculateTotalTime = useCallback((segments) => {
    return segments.reduce((acc, row) => acc + Number(row["Time (min)"] || 0), 0);
  }, []);

  const calculateTotalDistance = useCallback((segments) => {
    return segments.reduce((acc, row) => acc + Number(row["Distance (km)"] || 0), 0);
  }, []);

  // Memoized totals
  const totalManualTime = useMemo(() => calculateTotalTime(manualSegments), [manualSegments, calculateTotalTime]);
  const totalManualDistance = useMemo(() => calculateTotalDistance(manualSegments), [manualSegments, calculateTotalDistance]);
  const totalOptimalTime = useMemo(() => calculateTotalTime(optimalSegments), [optimalSegments, calculateTotalTime]);
  const totalOptimalDistance = useMemo(() => calculateTotalDistance(optimalSegments), [optimalSegments, calculateTotalDistance]);

  // Memoized standard data processing
  const mSData = useMemo(() => {
    if (!manualStandardData[0] || !manualSegments.length) return [];
    
    return manualStandardData[0].map((name, index) => {
      const isLastIndex = index === manualStandardData[0].length - 1;
      const distance = isLastIndex 
        ? manualSegments.length - manualStandardData[2][index] + 1 
        : manualStandardData[2][index + 1] - manualStandardData[2][index];
      
      return {
        name,
        distance,
        index: manualStandardData[2][index],
        type: manualStandardData[1][index]
      };
    });
  }, [manualStandardData, manualSegments]);

  const oSData = useMemo(() => {
    if (!optimalStandardData[0] || !optimalSegments.length) return [];
    
    return optimalStandardData[0].map((name, index) => {
      const isLastIndex = index === optimalStandardData[0].length - 1;
      const distance = isLastIndex 
        ? optimalSegments.length - optimalStandardData[2][index] + 1 
        : optimalStandardData[2][index + 1] - optimalStandardData[2][index];
      
      return {
        name,
        distance,
        index: optimalStandardData[2][index],
        type: optimalStandardData[1][index]
      };
    });
  }, [optimalStandardData, optimalSegments]);

  // Loading state
  if (loading) {
    return <div className="loading-container"><p>Loading table data...</p></div>;
  }

  // Error state with retry button
  if (error && !dataLoaded) {
    return (
      <div className="error-container">
        <div>
          <p>Error: {error}</p>
          <button 
            className="retry-button"
            onClick={fetchTableData}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!dataLoaded || !tableData.length) {
    return (
      <div className="empty-container">
        <div>
          <p>No table data available.</p>
          <button 
            className="retry-button"
            onClick={fetchTableData}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render the tables
  return (
    <div className="table-container">
      <h3>Route Segments</h3>
      <div className="segments-tables-container">
        {/* Actual Segments Table */}
        <div className="segments-table manual-table">
          <h4>Actual Routes</h4>
          <table className="results-table">
            <thead>
              <tr>
                <th>Service Window</th>
                <th>Segment</th>
                <th>Time (min)</th>
                <th>Distance (Mile)</th>
              </tr>
            </thead>
            <tbody>
              {manualSegments.map((row, index) => {
                const stop = mSData.find(stop => stop.index === index + 1);
                return (
                  <tr key={index}>
                    {stop ? <td rowSpan={stop.distance}>{stop.name}-{stop.type}</td> : null}
                    <td>{row.Segment}</td>
                    <td>{row["Time (min)"]}</td>
                    <td>{row["Distance (km)"]}</td>
                  </tr>
                );
              })}

              <tr className="totals-row">
                <td></td>
                <td><strong>Total</strong></td>
                <td><strong>{totalManualTime.toFixed(2)} hours</strong></td>
                <td><strong>{totalManualDistance.toFixed(1)}</strong></td>
              </tr>
            </tbody>
          </table>
          {/* Actual PERM Notes Table */}
          <div className="notes-table">
            <h5>Actual Service Time</h5>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Service Window</th>
                  <th>Segment</th>
                  <th>Service Time</th>
                </tr>
              </thead>
              <tbody>
                {manualSegments.map((row, index) => {
                  const stop = mSData.find(stop => stop.index === index + 1);
                  return (
                    <tr key={index}>
                      {stop ? <td rowSpan={stop.distance}>{stop.name}-{stop.type}</td> : null}
                      <td>{row.Segment}</td>
                      <td>{row["PERM_NOTES"] || "N/A"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Optimal Segments Table */}
        <div className="segments-table optimal-table">
          <h4>Optimal Routes</h4>
          <table className="results-table">
            <thead>
              <tr>
                <th>Service Window</th>
                <th>Segment</th>
                <th>Time (min)</th>
                <th>Distance (Mile)</th>
              </tr>
            </thead>
            <tbody>
              {optimalSegments.map((row, index) => {
                const stop = oSData.find(stop => stop.index === index + 1);
                return (
                  <tr key={index}>
                    {stop ? <td rowSpan={stop.distance}>{stop.name}-{stop.type}</td> : null}
                    <td>{row.Segment}</td>
                    <td>{row["Time (min)"]}</td>
                    <td>{row["Distance (km)"]}</td>
                  </tr>
                );
              })}

              <tr className="totals-row">
                <td></td>
                <td><strong>Total</strong></td>
                <td><strong>{totalOptimalTime.toFixed(2)} hours</strong></td>
                <td><strong>{totalOptimalDistance.toFixed(1)}</strong></td>
              </tr>
            </tbody>
          </table>
          {/* Optimal PERM Notes Table */}
          <div className="notes-table">
            <h5>Optimal Service Time</h5>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Service Window</th>
                  <th>Segment</th>
                  <th>Service Time</th>
                </tr>
              </thead>
              <tbody>
                {optimalSegments.map((row, index) => {
                  const stop = oSData.find(stop => stop.index === index + 1);
                  return (
                    <tr key={index}>
                      {stop ? <td rowSpan={stop.distance}>{stop.name}-{stop.type}</td> : null}
                      <td>{row.Segment}</td>
                      <td>{row["PERM_NOTES"] || "N/A"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
RouteSegmentsTable.propTypes = {
  route_id: PropTypes.string.isRequired,
  isToggled: PropTypes.bool.isRequired
};

export default RouteSegmentsTable;