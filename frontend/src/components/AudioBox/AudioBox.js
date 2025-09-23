import React, { useRef, useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

const songs = [
    {
        label: "Matt - Audio Log #1",
        url: "https://www.classicals.de/s/Classicalsde-Chopin-Nocturne-in-F-minor-Op-55-No-1.mp3"
    },
    {
        label: "Nocturne Op. 55 No. 1",
        url: "https://www.classicals.de/s/Classicalsde-Chopin-Nocturne-in-F-minor-Op-55-No-1.mp3"
    },
    {
        label: "Moonlight Sonata",
        url: "https://www.classicals.de/s/Classicalsde-Beethoven-Moonlight-Sonata.mp3"
    },
    {
        label: "Clair de Lune",
        url: "https://www.classicals.de/s/Classicalsde-Debussy-Clair-de-Lune.mp3"
    }
];

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioBox() {
    const [playing, setPlaying] = useState(false);
    const [selectedSong, setSelectedSong] = useState(songs[0]);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (!playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        setPlaying(p => !p);
    };

    const handleSongSelect = (song) => {
        setPlaying(false);
        setSelectedSong(song);
        setCurrentTime(0);
        setDuration(0);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration || 0);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, [selectedSong]);

    const handleSeek = (e) => {
        if (!duration) return;
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;
        const seekTime = percent * duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    // Calculate the left position for the circle
    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 50,
                left: 50,
                zIndex: 13,
                bgcolor: '#222',
                color: '#fff',
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minWidth: 320,
            }}
        >
            <Box sx={{ width: '100%' }}>
                <List
                    sx={{
                        maxHeight: 120,
                        overflowY: 'auto',
                        bgcolor: '#333',
                        borderRadius: 1,
                        p: 0,
                    }}
                >
                    {songs.map(song => (
                        <ListItem key={song.url} disablePadding>
                            <ListItemButton
                                selected={selectedSong.url === song.url}
                                onClick={() => handleSongSelect(song)}
                                sx={{
                                    color: '#fff',
                                    bgcolor: selectedSong.url === song.url ? '#444' : 'inherit',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <span>{song.label}</span>
                                <Tooltip title="Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0)">
                                    <IconButton
                                        size="small"
                                        sx={{ color: '#fff', ml: 1 }}
                                        onClick={e => e.stopPropagation()}
                                        href="https://creativecommons.org/licenses/by/4.0/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <InfoOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <IconButton
                    color="inherit"
                    onClick={handlePlayPause}
                >
                    {playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Typography variant="body2" sx={{ ml: 1 }}>
                    Now Playing: {selectedSong.label}
                </Typography>
            </Box>
            <Box sx={{ width: '100%', mt: 2, display: 'flex', alignItems: 'center' }}>
                <Box
                    sx={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: '#333', // bar background stays dark
                        mr: 2,
                        position: 'relative',
                        cursor: duration ? 'pointer' : 'default',
                        transition: 'background-color 0.2s',
                    }}
                    onClick={handleSeek}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: duration ? `${progressPercent}%` : '0%',
                            bgcolor: isHovered ? '#1976d2' : '#fff', // progress is white, blue on hover
                            borderRadius: 4,
                        }}
                    />
                    {isHovered && duration > 0 && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: `calc(${progressPercent}% - 6px)`,
                                transform: 'translateY(-50%)',
                                width: 12,
                                height: 12,
                                bgcolor: '#1976d2',
                                borderRadius: '50%',
                                border: '2px solid #fff',
                                boxShadow: 1,
                                pointerEvents: 'none',
                            }}
                        />
                    )}
                </Box>
                <Typography variant="body2" sx={{ minWidth: 70, textAlign: 'right' }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </Typography>
            </Box>
            <audio
                ref={audioRef}
                src={selectedSong.url}
                onEnded={() => setPlaying(false)}
                style={{ display: 'none' }}
            />
        </Box>
    );
}