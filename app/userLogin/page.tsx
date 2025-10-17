"use client";

import React, { useState} from "react";
import { useRouter } from 'next/navigation';
import { getCurrentLocation, GeoResult } from "@/app/userLogin/geolocation"; 
import "./userLogin.css"; // 独立样式

export default function EmergencyDetailsPage() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const formData = { location, title, description };


    const handleAutoLocate = async () => {
    try {
      const pos: GeoResult = await getCurrentLocation();
      // 拼接一个完整的地址字符串
      const fullAddress = `${pos.streetNumber ?? ""} ${pos.street ?? ""}, ${pos.city ?? ""}, ${pos.state ?? ""}`;
      setLocation(fullAddress.trim());
      console.log("📍 auto location: ", pos);
    } catch (err) {
      console.error("failare to get current location", err);
      alert("unable to fetch current location, please check location permission.");
    }
  };


  /*transmit the input data to backend server*/
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    /*try {
      const response = await fetch('/api/emergency-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      // Handle success
      console.log('Alert sent successfully:', await response.json());*/
      router.push('/confirmation');

    /*} catch (error) {
      console.error('Failed to send alert:', error);
      // Here you could add state to show an error message to the user
    }*/
  };

  return (
    <main className="ed-container">
      <header className="ed-header">
        <h1>Emergency Details</h1>
      </header>

      <form className="ed-body" onSubmit={handleSubmit}>
        {/* Location */}
        <label className="ed-field">
          <span className="ed-label">Location: (required)</span>
          <input
            type="text"
            className="ed-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Main Street & 2nd Ave"
            required
          />
          <button
              type="button"
              onClick={handleAutoLocate}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >📍 Auto
          </button>

        </label>

        {/* Title */}
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

        {/* Description */}
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

        {/* Send Button */}
        <button type="submit" className="ed-send">
          Send Alert
        </button>
      </form>
    </main>
  );
}