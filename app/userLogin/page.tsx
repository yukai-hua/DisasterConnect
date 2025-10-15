"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import "./userLogin.css"; // 独立样式

export default function EmergencyDetailsPage() {
  const router = useRouter();
  return (
    <main className="ed-container">
      <header className="ed-header">
        <h1>Emergency Details</h1>
      </header>

      <section className="ed-body">
        {/* Location */}
        <label className="ed-field">
          <span className="ed-label">Location:</span>
          <input
            type="text"
            className="ed-input"
            placeholder="" // 不展示任何预填文字
          />
        </label>

        {/* Title */}
        <label className="ed-field">
          <span className="ed-label">Title:</span>
          <input type="text" className="ed-input" placeholder="" />
        </label>

        {/* Description */}
        <label className="ed-field">
          <span className="ed-label">Description:</span>
          <textarea className="ed-input ed-textarea" rows={4} placeholder="" />
        </label>

        {/* Send Button */}
        <button onClick={() => router.push('/confirmation')} className="ed-send">Send Alert</button>
      </section>
    </main>
  );
}
