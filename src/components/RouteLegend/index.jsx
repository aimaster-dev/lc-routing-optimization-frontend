import React from 'react';
import './style.css';  

const OPERATION_COLORS = {
    "SWING": "#28a745",  
    "DRT": "#dc3545",    
    "MAIN_ROUTE": "#007bff",  
    "LANDFILL": "#6c757d"  
};

const RouteLegend = () => {
   return (
       <div className="route-legend">
           <h4>Route Legend</h4>
           <div className="route-legend-item">
               <div className="color-box" style={{ backgroundColor: OPERATION_COLORS["MAIN_ROUTE"] }}></div>
               Main Route
           </div>
           <div className="route-legend-item">
               <div className="color-box" style={{ backgroundColor: OPERATION_COLORS["LANDFILL"], borderStyle: "dashed" }}></div>
               Landfill Trip
           </div>
           <div className="route-legend-item">
               <div className="circle-box swing">1</div>
               Swing Stop
           </div>
           <div className="route-legend-item">
               <div className="circle-box drt">1</div>
               DRT Stop
           </div>
           <div className="route-legend-item">
               <div className="circle-box main-route">H</div>
               Hauling Facility
           </div>
           <div className="route-legend-item">
               <div className="circle-box landfill">L</div>
               Landfill
           </div>
       </div>
   );
}

export default RouteLegend;
