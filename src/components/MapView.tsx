import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getProcedures } from '../services/procedureService';

const MapView: React.FC = () => {
    const [procedures, setProcedures] = useState([]);

    useEffect(() => {
        const fetchProcedures = async () => {
            const data = await getProcedures();
            setProcedures(data);
        };

        fetchProcedures();
    }, []);

    return (
        <MapContainer center={[-33.4489, -70.6693]} zoom={12} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {procedures.map((procedure) => (
                <Marker key={procedure.id} position={[procedure.latitude, procedure.longitude]}>
                    <Popup>
                        <strong>Tipo de Procedimiento:</strong> {procedure.type}<br />
                        <strong>Dirección:</strong> {procedure.address}<br />
                        <strong>Resultado:</strong> {procedure.result}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;