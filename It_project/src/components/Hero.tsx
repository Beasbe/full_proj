"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Проверяем, может ли видео воспроизводиться
    const handleCanPlay = () => {
      setIsVideoLoading(false);
      setIsVideoVisible(true);
    };

    const handleError = () => {
      console.error("Video loading error");
      setHasError(true);
      setIsVideoLoading(false);
    };

    // Таймаут на случай долгой загрузки
    const timeout = setTimeout(() => {
      if (isVideoLoading) {
        console.warn("Video loading timeout");
        handleError();
      }
    }, 10000);

    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("error", handleError);
      clearTimeout(timeout);
    };
  }, [isVideoLoading]);

  return (
    <section className="relative w-full h-screen overflow-hidden group">
      {/* Фоновое видео */}
      <div className="absolute inset-0 w-full h-full">
        {/* Постер/превью во время загрузки */}
        {isVideoLoading && !hasError && (
          <div className="relative w-full h-full">
            <Image
              src="/service-4.webp"
              alt="Загрузка видео..."
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Спиннер загрузки */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-white/30 rounded-full" />
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-white text-sm font-medium animate-pulse">
                  Загрузка видео...
                </p>
              </div>
            </div>
          </div>
        )}

        {hasError && (
          <div className="relative w-full h-full">
            <Image
              src="/service-4.webp"
              alt="Строительная индустрия"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}
        {!hasError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-1000
              ${isVideoVisible && !isVideoLoading ? "opacity-100" : "opacity-0"}
            `}
            style={{
              visibility:
                isVideoVisible && !isVideoLoading ? "visible" : "hidden",
            }}
          >
            <source src="./movieeq.mp4" type="video/mp4" />
            {/* WebM формат для лучшей совместимости */}
            Ваш браузер не поддерживает видео.
          </video>
        )}

        {/* Осветление внизу */}
        <div className="absolute inset-0 bg-linear-to-t from-white/70 via-transparent to-transparent" />
      </div>

      {/* Полупрозрачный прямоугольник при наведении */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
        <div className="bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-lg max-w-3xl mx-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            ИТ решения в строительной индустрии
          </h1>
          <p className="text-xl md:text-2xl text-black/90">
            Проектирование зданий и сооружений на передовой
            <br />
            информационных технологий
          </p>
        </div>
      </div>

      {/* Альтернативный вариант с текстом, который всегда виден (если нужно) */}
      {/* <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white bg-gradient-to-t from-black/50 to-transparent">
        <h2 className="text-2xl font-bold">ИТ решения в строительной индустрии</h2>
      </div> */}
    </section>
  );
}
