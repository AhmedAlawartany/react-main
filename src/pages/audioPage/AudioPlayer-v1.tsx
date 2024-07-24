import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import toWav from 'audiobuffer-to-wav';

const regions = RegionsPlugin.create();

const random = (min, max) => Math.random() * (max - min) + min;
const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

const AudioPlayer = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [trimmedAudioURL, setTrimmedAudioURL] = useState(null);

    const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());

    const waveSurferRef = useRef(null);

    useEffect(() => {
        if (audioFile) {
            // Initialize WaveSurfer with RegionsPlugin
            waveSurferRef.current = WaveSurfer.create({
                container: '#waveform',
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
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
                    content: 'Cramped region',
                    color: randomColor(),
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

            return () => {
                if (waveSurferRef.current) {
                    waveSurferRef.current.destroy();
                }
            };
        }
    }, [audioFile]);

    const handleFileChange = async (event) => {
        setAudioFile(URL.createObjectURL(event.target.files[0]));
        const file = event.target.files[0];
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
    console.log(regions, 'regionsregionsregions');
    const handleTrim = async () => {
        if (!audioBuffer) return;

        const region = regions?.regions[0];
        // Extract start and end times

        const start = region.start;
        const end = region.end;
        console.log(waveSurferRef, 'waveSurferRefwaveSurferRef');
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
        <div>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            {audioFile && (
                <div>
                    <div id="waveform" />

                    <button onClick={handlePlayTrimmed}>Play </button>
                    <button onClick={handleTrim}> Trimmed Audio</button>
                </div>
            )}
            {trimmedAudioURL && (
                <div>
                    <h3>Trimmed Audio</h3>
                    <audio controls src={trimmedAudioURL} />
                </div>
            )}
        </div>
    );
};

export default AudioPlayer;
