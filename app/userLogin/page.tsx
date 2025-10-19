"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { getCurrentLocation, GeoResult } from "@/app/userLogin/geolocation"; 
import { useMap } from './map'; // Import the useMap hook
import { importLibrary } from "@googlemaps/js-api-loader";
import "./userLogin.css"; // 独立样式

export default function EmergencyDetailsPage() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [urgency, setUrgency] = useState('high'); // Default urgency level
  const formData = { location, title, description, latitude, longitude, urgency };

  const mapRef = useRef<HTMLDivElement>(null);
  useMap(mapRef, { lat: latitude, lng: longitude });

  const handleAutoLocate = async () => {
    try {
      const pos: GeoResult = await getCurrentLocation();
      const fullAddress = `${pos.streetNumber ?? ""} ${pos.street ?? ""}, ${pos.city ?? ""}, ${pos.state ?? ""}`;
      setLocation(fullAddress.trim());
      setLatitude(pos.lat);
      setLongitude(pos.lng);
      console.log("📍 auto location: ", pos);
    } catch (err) {
      console.error("failure to get current location", err);
      alert("unable to fetch current location, please check location permission.");
    }
  };

  const handleAddressGeocode = async () => {
    if (!location) return;
    try {
      const geocoding = await importLibrary("geocoding");
      const geocoder = new geocoding.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setLatitude(lat());
          setLongitude(lng());
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  useEffect(() => {
    // Set a default location if none is available
    if (latitude === null || longitude === null) {
      setLatitude(-37.8136); // Default to Melbourne
      setLongitude(144.9631);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/confirmation');
  };

  return (
    <main className="ed-container">
      <header className="ed-header">
        <h1>Emergency Details</h1>
      </header>

      <div ref={mapRef} className="ed-map-container" />

      <form className="ed-body" onSubmit={handleSubmit}>
        <label className="ed-field">
          <span className="ed-label">Location: (required)</span>
          <input
            type="text"
            className="ed-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={handleAddressGeocode} // Geocode on blur
            placeholder="e.g., 139 Main Street & 2nd Ave, New York, NY"
            required
          />
          <button
              type="button"
              onClick={handleAutoLocate}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >📍 Auto
          </button>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="ed-field">
            <span className="ed-label">Latitude:</span>
            <input
              type="number"
              className="ed-input"
              value={latitude ?? ''}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
              placeholder="Latitude"
            />
          </label>
          <label className="ed-field">
            <span className="ed-label">Longitude:</span>
            <input
              type="number"
              className="ed-input"
              value={longitude ?? ''}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
              placeholder="Longitude"
            />
          </label>
        </div>

        <label className="ed-field">
          <span className="ed-label">Urgency:</span>
          <select
            className="ed-input"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label className="ed-field">
          <span className="ed-label">Title:</span>
          <input 
            type="text" 
            className="ed-input" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Need for Water"
          />
        </label>

        <label className="ed-field">
          <span className="ed-label">Description:</span>
          <textarea 
            className="ed-input ed-textarea" 
            rows={4} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a brief description of the situation"
          />
        </label>

        <button type="submit" className="ed-send">
          Send Alert
        </button>
      </form>
    </main>
  );
}