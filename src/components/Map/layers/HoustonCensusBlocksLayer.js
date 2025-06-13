// Logic for handling the Houston Census Blocks layer on the map

const CENSUS_BLOCKS_SOURCE_ID = 'houston-census-blocks';
const CENSUS_BLOCKS_LAYER_ID = 'houston-census-blocks';
const CENSUS_BLOCKS_GEOJSON_URL = '/houston-census-blocks.geojson';

// Add the Houston Census Blocks layer to the map
export async function addHoustonCensusBlocksLayer(map) {
  if (!map.getSource(CENSUS_BLOCKS_SOURCE_ID)) {
    const response = await fetch(CENSUS_BLOCKS_GEOJSON_URL);
    const data = await response.json();
    map.addSource(CENSUS_BLOCKS_SOURCE_ID, {
      type: 'geojson',
      data,
    });
  }
  if (!map.getLayer(CENSUS_BLOCKS_LAYER_ID)) {
    map.addLayer({
      id: CENSUS_BLOCKS_LAYER_ID,
      type: 'fill',
      source: CENSUS_BLOCKS_SOURCE_ID,
      paint: {
        'fill-color': '#FF0000',
        'fill-opacity': 0.4,
        'fill-outline-color': '#000000',
      },
      layout: {
        visibility: 'visible',
      },
    });
  } else {
    map.setLayoutProperty(CENSUS_BLOCKS_LAYER_ID, 'visibility', 'visible');
  }
}

// Remove (hide) the Houston Census Blocks layer from the map
export function removeHoustonCensusBlocksLayer(map) {
  if (map.getLayer(CENSUS_BLOCKS_LAYER_ID)) {
    map.setLayoutProperty(CENSUS_BLOCKS_LAYER_ID, 'visibility', 'none');
  }
}

// Check if the Houston Census Blocks layer is currently visible
export function isHoustonCensusBlocksLayerVisible(map) {
  if (!map.getLayer(CENSUS_BLOCKS_LAYER_ID)) return false;
  return map.getLayoutProperty(CENSUS_BLOCKS_LAYER_ID, 'visibility') === 'visible';
} 