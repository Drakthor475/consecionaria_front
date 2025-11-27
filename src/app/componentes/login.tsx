"use client";

import { useRouter } from "next/navigation";
import "./estilos/login.css";

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirige al QR después del login
    router.push("/Reportes/QR");
  };

  return (
    <div className="contenedor-login">
      <div className="caja-login">
        <h2 className="titulo-login">caFES</h2>

        <label htmlFor="usuario">Usuario</label>
        <input
          type="text"
          id="usuario"
          placeholder="Coloca tu nombre de usuario"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="Coloca tu contraseña"
        />

        <button onClick={handleLogin}>Iniciar sesión</button>

        <div className="separador">
          <span>o</span>
        </div>

        <button className="google-btn">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
          />
          Iniciar sesión con Google
        </button>

        <p className="registro-text">
          ¿No estás registrado? <a href="#">Regístrate con Google</a>
        </p>
      </div>
    </div>
  );
}
