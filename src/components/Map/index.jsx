import { useState, useEffect } from 'react';
import { optimizeRouteData, manualRouteData, getComparisonMap } from '../../services/routeService';
import './style.css';

const Map = ({ route_id, showOptimizeRoute, showComparison, isToggled }) => {
  const [manualHtml, setManualHtml] = useState(null);
  const [optimzeHtml, setoptimzeHtml] = useState(null);

  const fetchRouteData = async (isToggled) => {
    try {
      let routeData;
      if (showComparison) {
        // In comparison mode, fetch both maps
        
        routeData = await getComparisonMap(isToggled, route_id);
        // Left side: Optimal; Right side: Manual.
        setoptimzeHtml(routeData.html_optimal);
        setManualHtml(routeData.html_manual);
      } else {
        // Non-comparison mode:
        // When showOptimizeRoute is true, show optimal map.
        // When showOptimizeRoute is false, show manual map.
        if (showOptimizeRoute) {
          routeData = await optimizeRouteData(isToggled, route_id);
          setoptimzeHtml(routeData.html);
          setManualHtml(null);
        } else {
          routeData = await manualRouteData(isToggled, route_id);
          setManualHtml(routeData.html);
          setoptimzeHtml(null);
        }
      }
    } catch (error) {
      console.error('Error fetching route data:', error);
    }
  };

  useEffect(() => {
    if (route_id) {
      fetchRouteData(isToggled);
    }
  }, [route_id, showOptimizeRoute, showComparison, isToggled]);

  return (
    <>
      {showComparison ? (
        <div className='all-container'>
          <div className='headings-container'>
            <h2 className='map-heading'>Actual Route</h2>
            <h2 className='map-heading'>Optimal Route</h2>
          </div>
          <div className="comparison-container">
            <div className="map-half">
              <iframe className='map-frame' srcDoc={manualHtml} title="Actual Route" />
            </div>
            <div className="map-half">
              <iframe className='map-frame' srcDoc={optimzeHtml} title="Optimal Route" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {showOptimizeRoute ? (
            // When showOptimizeRoute is true, show the Optimal Route map.
            <div className='all-map'>
              <h2 className='map-heading-full'>Optimal Route</h2>
              <iframe className="map" srcDoc={optimzeHtml} title="Optimal Route" />
            </div>
          ) : (
            // When showOptimizeRoute is false, show the Actual Route map.
            <div className='all-map'>
              <h2 className='map-heading-full'>Actual Route</h2>
              <iframe className="map" srcDoc={manualHtml} title="Actual Route" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Map;
