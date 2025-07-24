import React from 'react';
import { Procedure } from '../types';
import './ProcedureList.css';

interface ProcedureListProps {
    procedures: Procedure[];
}

const getStatusClass = (status: Procedure['status']) => {
    // Convierte "En Curso" a "en-curso" para que sea un nombre de clase CSS válido.
    return `status-${status.toLowerCase().replace(' ', '-')}`;
}

const ProcedureList: React.FC<ProcedureListProps> = ({ procedures }) => {
    if (procedures.length === 0) {
        return (
            <div className="procedure-list-empty">
                <p>No hay procedimientos registrados en este turno.</p>
            </div>
        );
    }

    return (
        <div className="procedure-list-container">
            <h2>Historial del Turno</h2>
            <ul className="procedure-list">
                {procedures.map((proc) => (
                    <li key={proc.id} className="procedure-item">
                        <div className="procedure-header">
                            <strong>{proc.type}</strong>
                            <span>{proc.timestamp.toLocaleString('es-CL')}</span>
                        </div>
                        <div className="procedure-body">
                            <p><strong>Dirección:</strong> {proc.address}</p>
                            <p><strong>Cuadrante:</strong> {proc.quadrant}</p>
                            <p><strong>Estado:</strong> <span className={`status ${getStatusClass(proc.status)}`}>{proc.status}</span></p>
                            {proc.resultSummary && <p><strong>Resumen:</strong> {proc.resultSummary}</p>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProcedureList;