"use client";

import { useEffect } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

interface MapOptions {
  lat: number | null;
  lng: number | null;
}

export function useMap(
  mapRef: React.RefObject<HTMLDivElement>,
  options: MapOptions
) {
  useEffect(() => {
    if (!mapRef.current || options.lat === null || options.lng === null) {
      return;
    }

    const { lat, lng } = options;

    const initMap = async () => {
      // Configure the API key
      setOptions({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      });

      // Dynamically load the Maps and Marker libraries
      const { Map } = (await importLibrary("maps")) as google.maps.MapsLibrary;
      const { Marker } = (await importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      // Initialize the map
      const map = new Map(mapRef.current as HTMLDivElement, {
        center: { lat, lng },
        zoom: 14,
      });

      // Add a marker
      new Marker({
        position: { lat, lng },
        map: map,
      });
    };

    initMap();
  }, [mapRef, options.lat, options.lng]);
}