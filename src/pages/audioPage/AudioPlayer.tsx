import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import toWav from 'audiobuffer-to-wav';
import { Button } from 'components';

const regions = RegionsPlugin.create();

const AudioPlayer: React.FC = () => {
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
    const [trimmedAudioURL, setTrimmedAudioURL] = useState<string | null>(null);

    const waveSurferRef = useRef<WaveSurfer | null>(null);
    const audioContextRef = useRef(new (window.AudioContext || window.AudioContext)());

    useEffect(() => {
        if (audioFile) {
            // Initialize WaveSurfer with RegionsPlugin
            waveSurferRef.current = WaveSurfer.create({
                container: '#waveform',
                waveColor: 'rgb(203, 239, 128)',
                progressColor: 'rgb(151, 222, 0)',
                // url: '/examples/audio/audio.wav',
                plugins: [regions],
            });
            // Load the audio file
            waveSurferRef.current.load(audioFile);

            waveSurferRef.current.on('decode', () => {
                // Regions

                regions.addRegion({
                    start: 9,
                    end: 10,
                    color: 'rgba(13, 25, 28,.2)',
                    minLength: 1,
                    maxLength: 10,
                });
            });

            waveSurferRef.current.on('region-click', (region, e) => {
                e.stopPropagation();
                if (e.shiftKey) {
                    region.remove();
                } else {
                    alert(`Annotation: ${region.attributes.label}`);
                }
            });

            const formatTime = (seconds) => {
                const minutes = Math.floor(seconds / 60);
                const secondsRemainder = Math.round(seconds) % 60;
                const paddedSeconds = `0${secondsRemainder}`.slice(-2);
                return `${minutes}:${paddedSeconds}`;
            };

            const timeEl = document.querySelector('#time');
            const durationEl = document.querySelector('#duration');
            waveSurferRef.current.on(
                'decode',
                (duration) => (durationEl.textContent = formatTime(duration)),
            );
            waveSurferRef.current.on(
                'timeupdate',
                (currentTime) => (timeEl.textContent = formatTime(currentTime)),
            );

            return () => {
                if (waveSurferRef.current) {
                    waveSurferRef.current.destroy();
                }
            };
        }
    }, [audioFile]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        setAudioFile(URL.createObjectURL(file));

        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
            setAudioBuffer(buffer);
        }
    };

    const handlePlayTrimmed = () => {
        if (waveSurferRef.current) {
            waveSurferRef.current.playPause();
        }
    };

    const handleTrim = async () => {
        if (!audioBuffer) return;

        const region = regions?.regions[0];
        // Extract start and end times

        const start = region.start;
        const end = region.end;

        const sampleRate = audioBuffer.sampleRate;
        const startSample = Math.floor(start * sampleRate);
        const endSample = Math.floor(end * sampleRate);

        const trimmedBuffer = audioContextRef.current.createBuffer(
            audioBuffer.numberOfChannels,
            endSample - startSample,
            sampleRate,
        );

        for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
            const channelData = audioBuffer.getChannelData(i);
            trimmedBuffer.copyToChannel(channelData.subarray(startSample, endSample), i);
        }

        // Convert trimmed buffer to WAV
        const wavArrayBuffer = toWav(trimmedBuffer);
        const wavBlob = new Blob([wavArrayBuffer], { type: 'audio/wav' });

        // Create URL for playback
        const trimmedURL = URL.createObjectURL(wavBlob);
        setTrimmedAudioURL(trimmedURL);
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
