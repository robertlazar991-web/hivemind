import { useState, useCallback, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import {
  MAP_COLORS,
  DEFAULT_CENTER,
  GEO_URL,
  US_STATES_URL,
  MIN_ZOOM,
  MAX_ZOOM,
} from './constants';

// Threshold to determine if we're "zoomed in" on a country
const ZOOMED_IN_THRESHOLD = 1.8;

function HiveMap({ hivekeepers, onMarkerClick }) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [hoveredKeeper, setHoveredKeeper] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  // Determine if we're currently zoomed in (viewing a country close-up)
  const isZoomedIn = zoom > ZOOMED_IN_THRESHOLD;

  // Calculate marker size based on zoom
  const getMarkerSize = useCallback((currentZoom) => {
    const baseSize = 8;
    return Math.max(4, Math.min(20, baseSize / Math.sqrt(currentZoom)));
  }, []);

  // Calculate border width based on zoom (thinner when zoomed in)
  const getBorderWidth = useCallback((currentZoom, isStateBorder = false) => {
    const baseWidth = isStateBorder ? 0.3 : 0.5;
    return Math.max(0.1, baseWidth / Math.sqrt(currentZoom));
  }, []);

  // Show state borders when zoomed in enough
  const showStateBorders = zoom >= 3;

  // Handle zoom change from ZoomableGroup
  const handleMoveEnd = useCallback(({ coordinates, zoom: newZoom }) => {
    setCenter(coordinates);
    setZoom(newZoom);
  }, []);

  // Reset to world view
  const resetToWorldView = useCallback(() => {
    setCenter(DEFAULT_CENTER);
    setZoom(1);
  }, []);

  // Calculate zoom to fit a country in the container
  const calculateCountryZoom = useCallback((geo) => {
    const geometry = geo.geometry || geo;
    let minLng = Infinity, maxLng = -Infinity;
    let minLat = Infinity, maxLat = -Infinity;

    // Extract coordinates based on geometry type
    const extractCoords = (coords) => {
      if (typeof coords[0] === 'number') {
        minLng = Math.min(minLng, coords[0]);
        maxLng = Math.max(maxLng, coords[0]);
        minLat = Math.min(minLat, coords[1]);
        maxLat = Math.max(maxLat, coords[1]);
      } else {
        coords.forEach(extractCoords);
      }
    };

    if (geometry.coordinates) {
      extractCoords(geometry.coordinates);
    }

    const lngSpan = maxLng - minLng;
    const latSpan = maxLat - minLat;

    // Handle edge cases
    if (lngSpan === 0 || latSpan === 0 || !isFinite(lngSpan) || !isFinite(latSpan)) {
      return 8;
    }

    // Container aspect ratio (width / height)
    const containerAspect = 800 / 500;
    const countryAspect = lngSpan / latSpan;

    // Calculate zoom with padding (85% of container)
    const padding = 0.85;
    let newZoom;

    if (countryAspect > containerAspect) {
      // Wide country - fit by width
      // 360 degrees = full world width, we want lngSpan to fill 85% of container
      newZoom = (360 / lngSpan) * padding * 0.14;
    } else {
      // Tall country - fit by height
      // ~150 degrees visible latitude in mercator, we want latSpan to fill 85% of container
      newZoom = (150 / latSpan) * padding * 0.22;
    }

    // Clamp to reasonable bounds (minimum 2 for large countries, max 15 for small ones)
    return Math.max(2, Math.min(15, newZoom));
  }, []);

  // Handle click on a country - toggle between zoomed in and world view
  const handleCountryClick = useCallback((geo) => {
    if (isZoomedIn) {
      // Already zoomed in - zoom back out to world view
      resetToWorldView();
    } else {
      // Zoomed out - zoom in to fit the clicked country
      const centroid = geoCentroid(geo);
      const newZoom = calculateCountryZoom(geo);
      setCenter(centroid);
      setZoom(newZoom);
    }
  }, [isZoomedIn, resetToWorldView, calculateCountryZoom]);

  // Handle marker hover
  const handleMarkerHover = useCallback((keeper, event) => {
    if (keeper) {
      const rect = mapRef.current?.getBoundingClientRect();
      if (rect) {
        setTooltipPos({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    }
    setHoveredKeeper(keeper);
  }, []);

  // Zoom in/out buttons
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev * 1.5, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev / 1.5, MIN_ZOOM));
  }, []);

  const markerSize = getMarkerSize(zoom);
  const countryBorderWidth = getBorderWidth(zoom, false);
  const stateBorderWidth = getBorderWidth(zoom, true);

  return (
    <div
      ref={mapRef}
      className="relative w-full h-[500px] rounded-xl overflow-hidden"
      style={{ backgroundColor: MAP_COLORS.ocean }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
          center: [0, 20],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup
          center={center}
          zoom={zoom}
          onMoveEnd={handleMoveEnd}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          translateExtent={[
            [-200, -100],
            [1000, 600],
          ]}
          // Enable smooth transitions
          filterZoomEvent={(evt) => !evt.type.includes('wheel') || true}
        >
          {/* Render world map (countries) */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleCountryClick(geo)}
                  fill={MAP_COLORS.land}
                  stroke={MAP_COLORS.border}
                  strokeWidth={countryBorderWidth}
                  style={{
                    default: { outline: 'none', cursor: 'pointer' },
                    hover: { fill: MAP_COLORS.landHover, outline: 'none', cursor: 'pointer' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Render US state borders when zoomed in */}
          {showStateBorders && (
            <Geographies geography={US_STATES_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="transparent"
                    stroke={MAP_COLORS.stateBorder}
                    strokeWidth={stateBorderWidth}
                    style={{
                      default: { outline: 'none', pointerEvents: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>
          )}

          {/* Render hivekeeper markers */}
          {hivekeepers.map((keeper) => (
            <Marker
              key={keeper.id}
              coordinates={[keeper.coordinates.longitude, keeper.coordinates.latitude]}
            >
              <g
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkerClick(keeper);
                }}
                onMouseEnter={(e) => handleMarkerHover(keeper, e)}
                onMouseLeave={() => handleMarkerHover(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Pulsating ring */}
                <circle
                  r={markerSize * 1.8}
                  fill={MAP_COLORS.pulse}
                  opacity={0.3}
                  className="animate-ping"
                />
                {/* Outer ring */}
                <circle
                  r={markerSize}
                  fill={MAP_COLORS.marker}
                  stroke={MAP_COLORS.markerBorder}
                  strokeWidth={1.5 / Math.sqrt(zoom)}
                />
                {/* Profile image */}
                <clipPath id={`clip-${keeper.id}`}>
                  <circle r={markerSize - 2} />
                </clipPath>
                <image
                  href={keeper.photo}
                  x={-(markerSize - 2)}
                  y={-(markerSize - 2)}
                  width={(markerSize - 2) * 2}
                  height={(markerSize - 2) * 2}
                  clipPath={`url(#clip-${keeper.id})`}
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredKeeper && (
        <div
          className="absolute z-20 bg-white rounded-lg shadow-lg p-3 pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 10,
          }}
        >
          <p className="font-semibold text-amber-800">{hoveredKeeper.name}</p>
          <p className="text-sm text-gray-600">{hoveredKeeper.location}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {hoveredKeeper.circles.slice(0, 2).map((circle) => (
              <span
                key={circle}
                className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full"
              >
                {circle}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white/95 rounded-xl p-2 shadow-lg">
        <button
          onClick={handleZoomIn}
          disabled={zoom >= MAX_ZOOM}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
          title="Zoom in"
        >
          +
        </button>
        <button
          onClick={resetToWorldView}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
          title="Reset to world view"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          disabled={zoom <= MIN_ZOOM}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
          title="Zoom out"
        >
          −
        </button>
      </div>

      {/* Instructions - changes based on zoom state */}
      <div className="absolute left-4 top-4 bg-white/95 rounded-lg px-3 py-1.5 shadow-sm">
        <span className="text-xs text-gray-600">
          {isZoomedIn
            ? 'Click anywhere to zoom out • Drag to pan'
            : 'Click country to zoom in • Drag to pan • Scroll to zoom'}
        </span>
      </div>
    </div>
  );
}

export default HiveMap;
