"use client";

import React, { useState, useEffect } from "react";
import "./confirmation.css";

export default function RescuePage() {
  
  // 获取当前时间
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-GB'));
  }, []);

  return (
    <main className="rescue-container">
      <header className="rescue-header">
        <h1>Rescue on the way</h1>
      </header>

      <section className="rescue-body">
        <h2 className="rescue-title">Help is coming</h2>
        <p className="rescue-subtitle">
          Rescue team has received your alert
        </p>

        {/* 救护车插图 */}
        <div className="rescue-ambulance">
         <img src="ambulance.png" alt="Description of image" width="500" height="600"></img>
    
        </div>

        <p className="rescue-time">Alert sent: {time}</p>
      </section>
    </main>
  );
}
