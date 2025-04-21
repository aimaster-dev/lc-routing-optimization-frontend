export const results = [
  {
    route_id: 1304,
    driving_time_optimal: 111.63,
    driving_distance_optimal: 71.2,
    driving_time_manual: 111.62,
    driving_distance_manual: 71.2,
    percentage_drt: 100,
    percentage_swing: 0,
    number_of_stops: 1,
  },
  {
    route_id: 1315,
    driving_time_optimal: 100.51,
    driving_distance_optimal: 68.7,
    driving_time_manual: 100.53,
    driving_distance_manual: 68.7,
    percentage_drt: 100,
    percentage_swing: 0,
    number_of_stops: 2,
  }
];

export const optimizedRouteResponse = {
  stops: [
    { id: "1", latitude: 41.658, longitude: -86.011, container_size: "Large", name: "Stop 1" },
    { id: "2", latitude: 41.660, longitude: -86.015, container_size: "Medium", name: "Stop 2" },
    { id: "3", latitude: 41.662, longitude: -86.017, container_size: "Small", name: "Stop 3" },
    { id: "4", latitude: 41.664, longitude: -86.018, container_size: "Large", name: "Stop 4" },
    { id: "5", latitude: 41.666, longitude: -86.020, container_size: "Small", name: "Stop 5" },
    { id: "6", latitude: 41.670, longitude: -86.022, container_size: "Medium", name: "Stop 6" },
    { id: "7", latitude: 41.672, longitude: -86.025, container_size: "Large", name: "Stop 7" }
  ],
  haulingLoc: [41.655032, -86.0097],
  landfillLocations: [
    { id: "landfill-1", name: "Landfill 1", latitude: 41.6560, longitude: -86.0100 }, 
    { id: "landfill-2", name: "Landfill 2", latitude: 41.6565, longitude: -86.0105 }, 
    { id: "landfill-3", name: "Landfill 3", latitude: 41.6500, longitude: -86.0040 }, 
    { id: "landfill-4", name: "Landfill 4", latitude: 41.6750, longitude: -86.0200 }, 
    { id: "landfill-5", name: "Landfill 5", latitude: 41.6850, longitude: -86.0300 }, 
    { id: "landfill-6", name: "Landfill 6", latitude: 41.6900, longitude: -86.0050 }, 
    { id: "landfill-7", name: "Landfill 7", latitude: 41.6600, longitude: -86.0050 }, 
    { id: "landfill-8", name: "Landfill 8", latitude: 41.6690, longitude: -86.0140 },
    { id: "landfill-9", name: "Landfill 9", latitude: 41.6550, longitude: -86.0400 }, 
    { id: "landfill-10", name: "Landfill 10", latitude: 41.6450, longitude: -86.0500 }, 
    { id: "landfill-11", name: "Landfill 11", latitude: 41.6400, longitude: -86.0450 }  
]

  
};

export const manualRouteResponse = {
  stops: [
    { id: "3", latitude: 41.662, longitude: -86.017, container_size: "Small", name: "Stop 3" },
    { id: "1", latitude: 41.658, longitude: -86.011, container_size: "Large", name: "Stop 1" },
    { id: "5", latitude: 41.666, longitude: -86.020, container_size: "Small", name: "Stop 5" },
    { id: "2", latitude: 41.660, longitude: -86.015, container_size: "Medium", name: "Stop 2" },
    { id: "7", latitude: 41.672, longitude: -86.025, container_size: "Large", name: "Stop 7" },
    { id: "6", latitude: 41.670, longitude: -86.022, container_size: "Medium", name: "Stop 6" },
    { id: "4", latitude: 41.664, longitude: -86.018, container_size: "Large", name: "Stop 4" }
  ],
  haulingLoc: [41.655032, -86.0097],
  landfillLocations: [
    { id: "landfill-1", name: "Landfill 1", latitude: 41.6560, longitude: -86.0100 }, 
    { id: "landfill-2", name: "Landfill 2", latitude: 41.6565, longitude: -86.0105 }, 
    { id: "landfill-3", name: "Landfill 3", latitude: 41.6500, longitude: -86.0040 }, 
    { id: "landfill-4", name: "Landfill 4", latitude: 41.6750, longitude: -86.0200 }, 
    { id: "landfill-5", name: "Landfill 5", latitude: 41.6850, longitude: -86.0300 }, 
    { id: "landfill-6", name: "Landfill 6", latitude: 41.6900, longitude: -86.0050 }, 
    { id: "landfill-7", name: "Landfill 7", latitude: 41.6600, longitude: -86.0050 }, 
    { id: "landfill-8", name: "Landfill 8", latitude: 41.6690, longitude: -86.0140 },
    { id: "landfill-9", name: "Landfill 9", latitude: 41.6550, longitude: -86.0400 }, 
    { id: "landfill-10", name: "Landfill 10", latitude: 41.6450, longitude: -86.0500 }, 
    { id: "landfill-11", name: "Landfill 11", latitude: 41.6400, longitude: -86.0450 }  
]

};
