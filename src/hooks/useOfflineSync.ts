import { useEffect, useState } from 'react';

const useOfflineSync = () => {
    const [offlineData, setOfflineData] = useState(() => {
        const savedData = localStorage.getItem('offlineProcedures');
        return savedData ? JSON.parse(savedData) : [];
    });

    const addOfflineProcedure = (procedure) => {
        setOfflineData((prevData) => {
            const updatedData = [...prevData, procedure];
            localStorage.setItem('offlineProcedures', JSON.stringify(updatedData));
            return updatedData;
        });
    };

    const syncData = async () => {
        if (navigator.onLine) {
            const proceduresToSync = offlineData;

            // Aquí se debe implementar la lógica para enviar los procedimientos al servidor
            // Por ejemplo, usando fetch o axios para hacer una solicitud POST

            // Después de sincronizar, limpiar los datos offline
            setOfflineData([]);
            localStorage.removeItem('offlineProcedures');
        }
    };

    useEffect(() => {
        window.addEventListener('online', syncData);
        return () => {
            window.removeEventListener('online', syncData);
        };
    }, [offlineData]);

    return { offlineData, addOfflineProcedure };
};

export default useOfflineSync;