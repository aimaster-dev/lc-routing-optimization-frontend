import React, { useEffect, useState } from 'react';
import { getComparisonData } from '../../services/routeService';

const CompareRoutes = ({ route_id }) => {
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComparisonData = async (route_id) => {
      if (route_id) {
        try {
          const data = await getComparisonData(false, route_id);
          if (data && data.success) {
            //console.log(JSON.stringify(data),"data");
            // Assuming your backend returns an object like:
            // { route: { aggregate: [ { "Driving Time (min.) Manual": ..., ... } ], sequence: [...] }, ... }
            const agg = data.route.aggregate && data.route.aggregate.length > 0
              ? data.route.aggregate[0]
              : null;
            if (agg) {
              setComparisonData({
                selectedRouteTime: parseFloat(agg["Driving Time (min.) Manual"]) || 0,
                selectedRouteDistance: parseFloat(agg["Driving Distance (mile) Manual"]) || 0,
                optimalRouteTime: parseFloat(agg["Driving Time (min) Optimal"]) || 0,
                optimalRouteDistance: parseFloat(agg["Driving Distance (mile) Optimal"]) || 0,
              });
            } else {
              setError('No aggregate route data found.');
            }
          } else {
            setError('No data returned from the service.');
          }
        } catch (err) {
          setError('Failed to fetch comparison data.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchComparisonData(route_id);
  }, [route_id]);

  if (loading) {
    return <p>Loading comparison data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!comparisonData) {
    return <p>No comparison data available.</p>;
  }

  return (
    <div>
      <h3>Compare Routes</h3>
      <div>
        <strong>Selected Route Driving Time:</strong>{" "}
        {comparisonData.selectedRouteTime.toFixed(2)} Hours
      </div>
      <div>
        <strong>Optimal Route Driving Time:</strong>{" "}
        {comparisonData.optimalRouteTime.toFixed(2)} Hours
      </div>
      <div>
        <strong>Selected Route Driving Distance:</strong>{" "}
        {comparisonData.selectedRouteDistance.toFixed(2)} miles
      </div>
      <div>
        <strong>Optimal Route Driving Distance:</strong>{" "}
        {comparisonData.optimalRouteDistance.toFixed(2)} miles
      </div>
    </div>
  );
};

export default CompareRoutes;
