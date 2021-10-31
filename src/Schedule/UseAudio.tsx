import React, {useEffect, useState} from "react";

export interface Props {
    isPlaying: boolean;
    setPlaying: (playing: boolean) => void;
}

export interface Callback {
    (): void;
}

const useAudio = (url: string, onDone: Callback) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing, audio]
    );

    if (!started) {
        setStarted(true);
        audio.addEventListener('ended', () => {
            setPlaying(false);
            onDone();
        });
    }


    return [playing, setPlaying] as const;
};

export default useAudio;