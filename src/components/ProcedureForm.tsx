import React, { useState } from 'react';
import { Procedure, ProcedureType } from '../types';
import './ProcedureForm.css';

// Array con los valores del tipo ProcedureType para generar el <select> dinámicamente.
const procedureTypes: ProcedureType[] = [
    'Control de Identidad',
    'Violencia Intrafamiliar',
    'Robo',
    'Accidente de Tránsito',
    'Alteración del Orden Público',
    'Otro'
];

interface ProcedureFormProps {
    // Función que se llamará cuando el formulario sea enviado con un nuevo procedimiento.
    onSubmit: (procedure: Procedure) => void;
}

const ProcedureForm: React.FC<ProcedureFormProps> = ({ onSubmit }) => {
    // Estados para cada campo del formulario.
    const [type, setType] = useState<ProcedureType>('Control de Identidad');
    const [quadrant, setQuadrant] = useState('');
    const [address, setAddress] = useState('');
    const [interviewedPerson, setInterviewedPerson] = useState('');
    const [resultSummary, setResultSummary] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validaciones básicas (se pueden expandir)
        if (!quadrant.trim() || !address.trim()) {
            alert('Por favor, complete los campos de Cuadrante y Dirección.');
            return;
        }

        const newProcedure: Procedure = {
            id: crypto.randomUUID(), // Genera un ID único.
            timestamp: new Date(), // Timestamp automático.
            status: 'Recibido', // Estado inicial por defecto.
            type,
            quadrant,
            address,
            interviewedPerson,
            resultSummary,
        };

        onSubmit(newProcedure);

        // Limpiar el formulario después de enviar
        setType('Control de Identidad');
        setQuadrant('');
        setAddress('');
        setInterviewedPerson('');
        setResultSummary('');
    };

    return (
        <form className="procedure-form" onSubmit={handleSubmit}>
            <h2>Registrar Nuevo Procedimiento</h2>

            <label htmlFor="type">Tipo de Procedimiento</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value as ProcedureType)}>
                {procedureTypes.map((procType) => (
                    <option key={procType} value={procType}>
                        {procType}
                    </option>
                ))}
            </select>

            <label htmlFor="quadrant">Cuadrante</label>
            <input
                id="quadrant"
                type="text"
                value={quadrant}
                onChange={(e) => setQuadrant(e.target.value)}
                placeholder="Ej: 1"
            />

            <label htmlFor="address">Dirección</label>
            <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Ej: Av. Libertador 123" />

            <label htmlFor="interviewedPerson">Persona Entrevistada</label>
            <input id="interviewedPerson" type="text" value={interviewedPerson} onChange={(e) => setInterviewedPerson(e.target.value)} placeholder="Nombre o descripción" />

            <label htmlFor="resultSummary">Resultado / Resumen</label>
            <textarea id="resultSummary" value={resultSummary} onChange={(e) => setResultSummary(e.target.value)} placeholder="Notas del procedimiento..." rows={4}></textarea>

            <button type="submit" className="submit-button">Guardar Procedimiento</button>
        </form>
    );
};

export default ProcedureForm;