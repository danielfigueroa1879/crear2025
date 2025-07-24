import React from 'react';

const Dashboard: React.FC = () => {
    // Placeholder data for demonstration
    const totalProcedures = 25;
    const mostFrequentType = 'Violencia Intrafamiliar';
    const averageTimePerProcedure = '15 mins';

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="stats">
                <div className="stat">
                    <h3>Total de Procedimientos</h3>
                    <p>{totalProcedures}</p>
                </div>
                <div className="stat">
                    <h3>Tipo Más Frecuente</h3>
                    <p>{mostFrequentType}</p>
                </div>
                <div className="stat">
                    <h3>Tiempo Promedio por Procedimiento</h3>
                    <p>{averageTimePerProcedure}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;