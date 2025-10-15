"use client";

import React from "react";
import { useRouter } from 'next/navigation';

export default function EmergencySOS() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-[#0b1828]">
      {/* 顶部红色标题栏 */}
      <header className="w-full bg-red-600 py-4 flex justify-center">
        <h1 className="text-white text-2xl font-bold">Emergency SOS</h1>
      </header>

      {/* 内容区域 */}
      <section className="flex flex-col items-center justify-center flex-1 gap-8">
        <button
          onClick={() => router.push('/userLogin')}
          className="
            rounded-full bg-red-500 text-white text-5xl font-black 
            h-56 w-56 flex items-center justify-center border-8 border-white 
            shadow-[0_12px_0_0_rgba(0,0,0,0.2)]
            transition active:translate-y-0.5 active:shadow-[0_8px_0_0_rgba(0,0,0,0.2)]
          "
        >
          HELP!
        </button>
        <p className="text-gray-300 text-center">
          Tap to send emergency alert
        </p>
      </section>
    </main>
  );
}
