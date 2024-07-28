import React, { useRef, useState } from 'react';

import { Button } from 'components';
import useWaveSurfer from './hooks/WaveSurfer';

const AudioPlayer: React.FC = () => {
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

    const { audioContextRef, handlePlayTrimmed, handleTrim, trimmedAudioURL } = useWaveSurfer({
        audioFile,
        audioBuffer,
        loop: true,
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        setAudioFile(URL.createObjectURL(file));

        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
            setAudioBuffer(buffer);
        }
    };

    return (
        <div className=" w-full p-16">
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            {audioFile && (
                <>
                    <div className="relative">
                        <div id="waveform">
                            <div id="time">0:00</div>
                            <div id="duration">0:00</div>
                            <div id="hover"></div>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col ">
                        <Button
                            className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
                            onClick={handlePlayTrimmed}
                        >
                            Play / Pause
                        </Button>
                        <Button
                            className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
                            onClick={handleTrim}
                        >
                            Trimmed Audio
                        </Button>
                    </div>
                </>
            )}
            {trimmedAudioURL && (
                <>
                    <h3>Trimmed Audio</h3>
                    <audio className="w-full" controls src={trimmedAudioURL} />
                </>
            )}
        </div>
    );
};

export default AudioPlayer;
