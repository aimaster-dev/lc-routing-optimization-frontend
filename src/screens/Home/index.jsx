import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';
import RouteSegmentsTable from '../../components/Tables';  // Assumes your Tables component's index.jsx exports RouteSegmentsTable
import './style.css';

const HomeScreen = ({ routesData }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showOptimizeRoute, setOptimizeRoute] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleToggleChange = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="home-container">
      <Header />
      <Sidebar
        routes={routesData}
        selectedRoute={selectedRoute}
        onRouteSelect={handleRouteSelect}
        setOptimizeRoute={setOptimizeRoute}
        showOptimizeRoute={showOptimizeRoute}
        setShowComparison={setShowComparison}
        showComparison={showComparison}
        isToggled={isToggled}
      />
      <div className="map-section">
      {showComparison &&
        <div className="toggle-container" style={{justifyContent: 'flex-end'}}>
          <label className="toggle-label" htmlFor="toggleSwitch">
            Enable Conversion
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="toggleSwitch"
              checked={isToggled}
              onChange={handleToggleChange}
            />
            <span className="slider"></span>
          </label>
        </div>
        }
        <div className="map-container">
          <Map 
            route_id={selectedRoute} 
            showOptimizeRoute={showOptimizeRoute}
            showComparison={showComparison}
            isToggled={isToggled}
          />
        </div>
        {showComparison && (
          <div className="compare-routes-section">
            <RouteSegmentsTable 
              route_id={selectedRoute} 
              isToggled={isToggled}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
