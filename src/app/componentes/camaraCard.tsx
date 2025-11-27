"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./estilos/camara.css";

export default function CameraCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [hasCamera, setHasCamera] = useState(false);

  // Activar cámara automáticamente al montar
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setHasCamera(true);
        }
      } catch (err) {
        console.error("Error activando cámara:", err);
      }
    };

    startCamera();

    // Limpiar cámara al desmontar
    return () => {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = (video.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = photoRef.current;
    if (!video || !canvas) return;

    const width = 300;
    const height = 300;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video, 0, 0, width, height);

    // Obtener imagen en base64 (opcional)
    const imageData = canvas.toDataURL("image/png");
    console.log("Foto capturada:", imageData);

    // Redirigir a Reportes/Types
    router.push("/Reportes/Type");
  };

  return (
    <div className="camera-card">
      <h2 className="camera-title">Tomar fotografía</h2>

      <video
        ref={videoRef}
        className="camera-video"
        style={{ width: "100%", maxWidth: "400px" }}
      ></video>

      {hasCamera && (
        <button className="camera-btn" onClick={takePhoto}>
          Tomar foto
        </button>
      )}

      <canvas ref={photoRef} style={{ display: "none" }} />
    </div>
  );
}
