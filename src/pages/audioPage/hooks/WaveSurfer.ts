import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import toWav from 'audiobuffer-to-wav';

const regions = RegionsPlugin.create();

function useWaveSurfer({ audioFile, audioBuffer, loop = false }: any) {
    const waveSurferRef = useRef<WaveSurfer | null>(null);
    const audioContextRef = useRef(new (window.AudioContext || window.AudioContext)());

    const [trimmedAudioURL, setTrimmedAudioURL] = useState<string | null>(null);

    const [activeRegion, setActiveRegion] = useState<any | null>(null);

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
                regions.addRegion({
                    start: 9,
                    end: 10,
                    color: 'rgba(13, 25, 28,.2)',
                });
            });

            regions.on('region-in', (region) => {
                console.log('region-in', region);

                setActiveRegion(region);
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

    useEffect(() => {
        if (!activeRegion) return;

        regions.on('region-out', (region) => {
            if (activeRegion === region) {
                if (loop) {
                    region.play();
                } else {
                    setActiveRegion(null);
                }
            }
        });

        regions.on('region-click', (region, e) => {
            e.stopPropagation();
            if (e.shiftKey) {
                region.remove();
            } else {
                alert(`Annotation: ${region.attributes.label}`);
            }
        });

        waveSurferRef.current.on('interaction', () => {
            setActiveRegion(null);
        });
    }, [activeRegion]);

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

    return { handlePlayTrimmed, handleTrim, trimmedAudioURL, audioContextRef };
}

export default useWaveSurfer;
