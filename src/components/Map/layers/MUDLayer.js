// Logic for handling the MUDs layer on the map

const MUD_SOURCE_ID = 'mud-districts';
const MUD_LAYER_ID = 'mud-districts';
const MUD_GEOJSON_URL = '/MUD.geojson';

// Add the MUDs layer to the map
export async function addMUDLayer(map) {
  if (!map.getSource(MUD_SOURCE_ID)) {
    const response = await fetch(MUD_GEOJSON_URL);
    const data = await response.json();
    map.addSource(MUD_SOURCE_ID, {
      type: 'geojson',
      data,
    });
  }
  if (!map.getLayer(MUD_LAYER_ID)) {
    map.addLayer({
      id: MUD_LAYER_ID,
      type: 'fill',
      source: MUD_SOURCE_ID,
      paint: {
        'fill-color': '#0080ff',
        'fill-opacity': 0.5,
        'fill-outline-color': '#0066cc',
      },
      layout: {
        visibility: 'visible',
      },
    });
  } else {
    map.setLayoutProperty(MUD_LAYER_ID, 'visibility', 'visible');
  }
}

// Remove (hide) the MUDs layer from the map
export function removeMUDLayer(map) {
  if (map.getLayer(MUD_LAYER_ID)) {
    map.setLayoutProperty(MUD_LAYER_ID, 'visibility', 'none');
  }
}

// Check if the MUDs layer is currently visible
export function isMUDLayerVisible(map) {
  if (!map.getLayer(MUD_LAYER_ID)) return false;
  return map.getLayoutProperty(MUD_LAYER_ID, 'visibility') === 'visible';
} 