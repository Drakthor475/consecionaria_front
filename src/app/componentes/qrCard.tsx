"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./estilos/qr.css";

export default function QRCard() {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrData, setQrData] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false); // para mostrar "Continuar"
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const router = useRouter();

  const startScan = async () => {
    if (!qrRef.current) return;
    setScanning(true);

    const divId = qrRef.current.id;
    const html5QrCode = new Html5Qrcode(divId);
    html5QrCodeRef.current = html5QrCode;

    try {
      const cameras = await Html5Qrcode.getCameras();
      if (!cameras || cameras.length === 0) {
        alert("No se encontró ninguna cámara");
        setScanning(false);
        return;
      }

      const backCam =
        cameras.find((cam) =>
          ["back", "rear", "environment"].some((word) =>
            cam.label.toLowerCase().includes(word)
          )
        ) || cameras[cameras.length - 1];

      await html5QrCode.start(
        backCam.id,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setQrData(decodedText);
          setScanned(true);
          setScanning(false);
          html5QrCode.stop();
          html5QrCode.clear();
        },
        (err) => {
          if (!err.includes("NotFoundException")) console.warn("Error leyendo QR:", err);
        }
      );
    } catch (err) {
      console.error("Error iniciando cámara:", err);
      setScanning(false);
    }
  };

  const handleContinue = () => {
    router.push("/Reportes/Camara");
  };

  return (
    <div className="qr-card">
      <h2 className="qr-title">Lector QR</h2>

      <div ref={qrRef} id="qr-reader" className="qr-reader"></div>

      <div style={{ margin: "10px 0" }}>
        {!scanning && !scanned && <button onClick={startScan}>Escanear</button>}
        {scanning && <button disabled>Escaneando...</button>}
        {scanned && <button onClick={handleContinue}>Continuar</button>}
      </div>

      <h3 className="qr-subtitle">Resultado del QR</h3>
      <textarea value={qrData} readOnly rows={5} />
    </div>
  );
}
