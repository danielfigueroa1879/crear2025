import { Procedure } from '../types';

const procedures: Procedure[] = [];

export const createProcedure = (procedure: Procedure): void => {
    procedures.push(procedure);
};

export const getProcedures = (): Procedure[] => {
    return procedures;
};

export const updateProcedure = (id: string, updatedProcedure: Partial<Procedure>): void => {
    const index = procedures.findIndex(proc => proc.id === id);
    if (index !== -1) {
        procedures[index] = { ...procedures[index], ...updatedProcedure };
    }
};