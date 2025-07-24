import { Geolocation } from '@capacitor/geolocation';

export const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number }> => {
    try {
        const position = await Geolocation.getCurrentPosition();
        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };
    } catch (error) {
        console.error('Error getting location', error);
        throw error;
    }
};

export const watchPosition = (callback: (position: { latitude: number; longitude: number }) => void) => {
    const watchId = Geolocation.watchPosition({}, (position, err) => {
        if (err) {
            console.error('Error watching position', err);
            return;
        }
        if (position) {
            callback({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }
    });
    return watchId;
};

export const clearWatch = (watchId: number) => {
    Geolocation.clearWatch({ id: watchId });
};