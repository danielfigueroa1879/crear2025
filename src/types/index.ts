// src/types/index.ts

// ✅ Idea: Clasificación Estandarizada
// Se define un tipo para los procedimientos, lo que permite estandarizar la data
// y facilita el análisis y las estadísticas.
export type ProcedureType =
    | 'Violencia Intrafamiliar'
    | 'Robo'
    | 'Control de Identidad'
    | 'Accidente de Tránsito'
    | 'Alteración del Orden Público'
    | 'Otro'; // Siempre es bueno tener una opción de respaldo

// ✅ Idea: Geolocalización Automática
// Se añade una interfaz para las coordenadas geográficas.
export interface Geolocation {
    latitude: number;
    longitude: number;
}

export interface Procedure {
    id: string;
    type: ProcedureType; // Se utiliza el tipo estandarizado
    quadrant: string;
    address: string;
    geolocation?: Geolocation; // Opcional, para la geolocalización automática
    interviewedPerson: string; // Nombre o descripción
    resultSummary: string; // Notas del procedimiento
    timestamp: Date; // Fecha y hora del registro
    status: 'Recibido' | 'En Curso' | 'Finalizado' | 'Pendiente'; // Estado del procedimiento
}

export interface User {
    id: string;
    username: string;
    // Se elimina el campo 'password'. La contraseña nunca debe ser almacenada
    // o manejada en el estado de la aplicación cliente. La autenticación
    // debe ser gestionada por un backend seguro que devuelva, por ejemplo, un token (JWT).
    role: 'Funcionario' | 'Administrador'; // Rol del usuario
    token?: string; // Ejemplo de lo que sí podría almacenarse en el estado del cliente
}

export interface DashboardStats {
    totalProcedures: number;
    mostFrequentType: ProcedureType | 'N/A'; // Usar el tipo estandarizado. 'N/A' si no hay procedimientos.
    averageTimePerProcedure: number; // En minutos
}

