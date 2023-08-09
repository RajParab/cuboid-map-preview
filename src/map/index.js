import React from "react";

import ReactMapGL from "react-map-gl";
import { TOKEN } from "./Geocoder";

const AppMap = ({ mapRef, viewport, setViewport }) => {
  const updateMapImage = () => {
    mapRef?.current.on("load", () =>
      console.log(mapRef?.current.getCanvas().toDataURL())
    );
  };

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxAccessToken={TOKEN}
      container="map"
      initialViewState={viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/rajpparab/cll1w7pjm00ax01pi3o2vbk1d"
      onDblClick={updateMapImage}
      transitionDuration="200"
      attributionControl={true}
      preserveDrawingBuffer={true}
    ></ReactMapGL>
  );
};

export default AppMap;
