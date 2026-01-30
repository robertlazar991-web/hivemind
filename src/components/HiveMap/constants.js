// Map color theme (orange/gold with warm beige background)
export const MAP_COLORS = {
  land: '#f59e0b',        // amber-500
  landHover: '#d97706',   // amber-600
  border: '#92400e',      // amber-800
  stateBorder: '#b45309', // amber-700 (for state borders)
  ocean: '#fef3c7',       // amber-100 (warm beige/yellow background)
  marker: '#f59e0b',      // amber-500
  markerBorder: '#ffffff', // white
  pulse: '#fbbf24',       // amber-400
};

// Default center (USA focused since all hivekeepers are there)
export const DEFAULT_CENTER = [-98, 38];

// World map TopoJSON URL
export const GEO_URL = '/world-110m.json';

// US States TopoJSON URL (for state borders when zoomed in)
export const US_STATES_URL = '/us-states.json';

// Zoom constraints
export const MIN_ZOOM = 1;
export const MAX_ZOOM = 20;

// Map bounds (to prevent getting lost)
export const MAP_BOUNDS = {
  minLongitude: -180,
  maxLongitude: 180,
  minLatitude: -85,
  maxLatitude: 85,
};
