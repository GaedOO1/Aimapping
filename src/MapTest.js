import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapTest = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      alert("Mapbox token is missing!");
      return;
    }
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />;
};

export default MapTest; 