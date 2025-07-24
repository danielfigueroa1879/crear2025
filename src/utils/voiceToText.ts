import { useEffect, useState } from 'react';

const useVoiceToText = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error('Speech recognition not supported in this browser.');
            return;
        }

        const SpeechRecognition = window.webkitSpeechRecognition;
        const newRecognition = new SpeechRecognition();

        newRecognition.continuous = false;
        newRecognition.interimResults = false;
        newRecognition.lang = 'es-ES';

        newRecognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            setTranscript(result);
            setIsListening(false);
        };

        newRecognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        setRecognition(newRecognition);

        return () => {
            newRecognition.stop();
        };
    }, []);

    const startListening = () => {
        if (recognition) {
            setTranscript('');
            setIsListening(true);
            recognition.start();
        }
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    return { transcript, isListening, startListening, stopListening };
};

export default useVoiceToText;