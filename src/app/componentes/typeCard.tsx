"use client";
import { useState } from "react";
import "./estilos/types.css";

export default function TypeCard() {

    const opciones: string[] = [
        "Malas prácticas de higiene",
        "Comida en mal estado",
        "Trato inadecuado",
        "Precios injustos",
        "Productos caducados",
        "Malas condiciones en instalaciones",
        "Uso de áreas no designadas",
        "Máquinas expendedoras",
        "Falta de seguridad y protección civil",
        "Porciones inadecuadas"
    ];

    const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
    const [descripcion, setDescripcion] = useState<string>("");

    const toggleChip = (opcion: string) => {
        if (seleccionadas.includes(opcion)) {
            setSeleccionadas(seleccionadas.filter(i => i !== opcion));
        } else {
            setSeleccionadas([...seleccionadas, opcion]);
        }
    };

    return (
        <div className="card-incident">
            <h2 className="title">Reporta un incidente</h2>
            <p className="subtitle">
                Selecciona el tipo de problema y cuéntanos brevemente qué ocurrió.
            </p>

            <div className="chips-container">
                {opciones.map((op, i) => (
                    <button
                        key={i}
                        className={`chip ${seleccionadas.includes(op) ? "chip-selected" : ""}`}
                        onClick={() => toggleChip(op)}
                    >
                        {op}
                    </button>
                ))}
            </div>

            <textarea
                className="textarea"
                placeholder="Ejemplo: Encontré comida en mal estado en la vitrina de postres cerca de la caja 2..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>

            <button className="btn-submit">Enviar reporte</button>
        </div>
    );
}
