"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useRef } from "react";
import "./globals.css";
import "./reset.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use useRef to persist the audioContext reference across renders
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // AudioContext 초기화 및 권한 요청
    const initializeAudioContext = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // 마이크 장치가 제대로 연결되었는지 확인
        if (stream.getAudioTracks().length === 0) {
          console.log("여기");
          throw new Error();
        }

        const AudioContext =
          window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();

        console.log("AudioContext initialized:", audioContextRef.current);
      } catch (e: any) {
        if (e.name === "NotFoundError" || e.name === "NotAllowedError") {
          console.log(
            "오디오 장치를 찾을 수 없습니다. 장치가 제대로 연결되었는지 확인해주세요."
          );
        } else if (e.name === "PermissionDeniedError") {
          console.log("오디오 권한이 거부되었습니다. 권한을 허용해주세요.");
        } else {
          console.log(`Audio permissions denied: ${e.message}`);
        }
      }
    };

    initializeAudioContext();

    // Cleanup function for cleanup during unmount
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        console.log("AudioContext closed");
      }
    };
  }, []); // 빈 배열을 넣어 최초 한 번만 실행되게

  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
