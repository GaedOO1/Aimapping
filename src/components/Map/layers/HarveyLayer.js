// Logic for handling the Harvey layers (harvy1 and harvy2) on the map

const HARVEY1_SOURCE_ID = 'harvy1';
const HARVEY2_SOURCE_ID = 'harvy2';
const HARVEY1_LAYER_ID = 'harvy1';
const HARVEY2_LAYER_ID = 'harvy2';
const HARVEY1_GEOJSON_URL = '/harvy1.geojson';
const HARVEY2_GEOJSON_URL = '/harvy2.geojson';

// Default and gradient paint styles
const defaultPaint1 = {
  'circle-radius': 4,
  'circle-color': '#1E90FF',
  'circle-opacity': 0.7,
};
const defaultPaint2 = {
  'circle-radius': 4,
  'circle-color': '#FF4500',
  'circle-opacity': 0.7,
};
const gradientPaint = {
  'circle-radius': 6,
  'circle-color': [
    'interpolate',
    ['linear'],
    ['get', 'severity'],
    0, '#ffcccc',
    1, '#ff9999',
    2, '#ff6666',
    3, '#ff3333',
    4, '#cc0000',
    5, '#990000',
  ],
  'circle-opacity': 0.8,
};

let useGradient = false;

// Add the Harvey layers to the map
export async function addHarveyLayers(map) {
  // Add harvy1
  if (!map.getSource(HARVEY1_SOURCE_ID)) {
    const response1 = await fetch(HARVEY1_GEOJSON_URL);
    const data1 = await response1.json();
    map.addSource(HARVEY1_SOURCE_ID, {
      type: 'geojson',
      data: data1,
    });
  }
  if (!map.getLayer(HARVEY1_LAYER_ID)) {
    map.addLayer({
      id: HARVEY1_LAYER_ID,
      type: 'circle',
      source: HARVEY1_SOURCE_ID,
      paint: useGradient ? gradientPaint : defaultPaint1,
      layout: {
        visibility: 'visible',
      },
    });
  } else {
    map.setLayoutProperty(HARVEY1_LAYER_ID, 'visibility', 'visible');
    map.setPaintProperty(
      HARVEY1_LAYER_ID,
      'circle-color',
      (useGradient ? gradientPaint['circle-color'] : defaultPaint1['circle-color'])
    );
    map.setPaintProperty(
      HARVEY1_LAYER_ID,
      'circle-radius',
      (useGradient ? gradientPaint['circle-radius'] : defaultPaint1['circle-radius'])
    );
    map.setPaintProperty(
      HARVEY1_LAYER_ID,
      'circle-opacity',
      (useGradient ? gradientPaint['circle-opacity'] : defaultPaint1['circle-opacity'])
    );
  }

  // Add harvy2
  if (!map.getSource(HARVEY2_SOURCE_ID)) {
    const response2 = await fetch(HARVEY2_GEOJSON_URL);
    const data2 = await response2.json();
    map.addSource(HARVEY2_SOURCE_ID, {
      type: 'geojson',
      data: data2,
    });
  }
  if (!map.getLayer(HARVEY2_LAYER_ID)) {
    map.addLayer({
      id: HARVEY2_LAYER_ID,
      type: 'circle',
      source: HARVEY2_SOURCE_ID,
      paint: useGradient ? gradientPaint : defaultPaint2,
      layout: {
        visibility: 'visible',
      },
    });
  } else {
    map.setLayoutProperty(HARVEY2_LAYER_ID, 'visibility', 'visible');
    map.setPaintProperty(
      HARVEY2_LAYER_ID,
      'circle-color',
      (useGradient ? gradientPaint['circle-color'] : defaultPaint2['circle-color'])
    );
    map.setPaintProperty(
      HARVEY2_LAYER_ID,
      'circle-radius',
      (useGradient ? gradientPaint['circle-radius'] : defaultPaint2['circle-radius'])
    );
    map.setPaintProperty(
      HARVEY2_LAYER_ID,
      'circle-opacity',
      (useGradient ? gradientPaint['circle-opacity'] : defaultPaint2['circle-opacity'])
    );
  }
}

// Remove (hide) the Harvey layers from the map
export function removeHarveyLayers(map) {
  if (map.getLayer(HARVEY1_LAYER_ID)) {
    map.setLayoutProperty(HARVEY1_LAYER_ID, 'visibility', 'none');
  }
  if (map.getLayer(HARVEY2_LAYER_ID)) {
    map.setLayoutProperty(HARVEY2_LAYER_ID, 'visibility', 'none');
  }
}

// Check if the Harvey layers are currently visible
export function areHarveyLayersVisible(map) {
  const visible1 = map.getLayer(HARVEY1_LAYER_ID) && map.getLayoutProperty(HARVEY1_LAYER_ID, 'visibility') === 'visible';
  const visible2 = map.getLayer(HARVEY2_LAYER_ID) && map.getLayoutProperty(HARVEY2_LAYER_ID, 'visibility') === 'visible';
  return visible1 && visible2;
}

// Toggle between default and gradient style
export function toggleHarveyGradient(map) {
  useGradient = !useGradient;
  if (map.getLayer(HARVEY1_LAYER_ID)) {
    map.setPaintProperty(
      HARVEY1_LAYER_ID,
      'circle-color',
      (useGradient ? gradientPaint['circle-color'] : defaultPaint1['circle-color'])
    );
    map.setPaintProperty(
      HARVEY1_LAYER_ID,
      'circle-radius',
      (useGradient ? gradientPaint['circle-radius'] : defaultPaint1['circle-radius'])
    );
    map.setPaintProperty(
      HARVEY1_LAYER_ID,
      'circle-opacity',
      (useGradient ? gradientPaint['circle-opacity'] : defaultPaint1['circle-opacity'])
    );
  }
  if (map.getLayer(HARVEY2_LAYER_ID)) {
    map.setPaintProperty(
      HARVEY2_LAYER_ID,
      'circle-color',
      (useGradient ? gradientPaint['circle-color'] : defaultPaint2['circle-color'])
    );
    map.setPaintProperty(
      HARVEY2_LAYER_ID,
      'circle-radius',
      (useGradient ? gradientPaint['circle-radius'] : defaultPaint2['circle-radius'])
    );
    map.setPaintProperty(
      HARVEY2_LAYER_ID,
      'circle-opacity',
      (useGradient ? gradientPaint['circle-opacity'] : defaultPaint2['circle-opacity'])
    );
  }
} 