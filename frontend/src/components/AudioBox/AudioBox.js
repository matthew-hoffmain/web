import React, { useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AudioBox() {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (!playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        setPlaying(p => !p);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 24,
                left: 24,
                zIndex: 1301,
                bgcolor: '#222',
                color: '#fff',
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                minWidth: 220,
            }}
        >
            <IconButton
                color="inherit"
                onClick={handlePlayPause}
                sx={{ mr: 2 }}
            >
                {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <Typography variant="body2">
                Now Playing: Nocturne Op. 55 No. 1 (matt)
            </Typography>
            <audio
                ref={audioRef}
                src="https://www.classicals.de/s/Classicalsde-Chopin-Nocturne-in-F-minor-Op-55-No-1.mp3"
                onEnded={() => setPlaying(false)}
                style={{ display: 'none' }}
            />
        </Box>
    );
}