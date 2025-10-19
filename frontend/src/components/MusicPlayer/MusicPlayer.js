import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    IconButton,
    Typography,
    Slider,
    Paper
} from '@mui/material';
import {
    PlayArrow,
    Pause,
    SkipNext,
    SkipPrevious,
    VolumeUp,
    VolumeDown,
    DragIndicator,
    Close
} from '@mui/icons-material';

const MusicPlayer = ({ onClose, playlist: externalPlaylist, startingTrack = 0, onPlayingStateChange }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);
    const [isDragging, setIsDragging] = useState(false);
    const [isSliderActive, setIsSliderActive] = useState(false);
    const audioRef = useRef(null);
    const playerRef = useRef(null);

    // Default playlist - will be overridden by external playlist
    const defaultPlaylist = [
        {
            title: "Nocturne Op. 55 No. 1",
            artist: "Frederic Chopin - Performed by Matthew Hoffman",
            src: "https://www.classicals.de/s/Classicalsde-Chopin-Nocturne-in-F-minor-Op-55-No-1.mp3",
            license: {
                type: "Non-Commercial License",
                url: "https://www.classicals.de/licensing#non-commercial"
            }
        }
    ];

    const playlist = externalPlaylist || defaultPlaylist;
    const [currentTrack, setCurrentTrack] = useState(0);

    // Reset to starting track when playlist changes
    useEffect(() => {
        if (externalPlaylist) {
            setCurrentTrack(startingTrack);
            setIsPlaying(false);
        }
    }, [externalPlaylist, startingTrack]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handlePlay = () => {
            setIsPlaying(true);
            onPlayingStateChange?.(true);
        };
        const handlePause = () => {
            setIsPlaying(false);
            onPlayingStateChange?.(false);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [currentTrack, onPlayingStateChange]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeChange = (_, newValue) => {
        const audio = audioRef.current;
        audio.currentTime = newValue;
        setCurrentTime(newValue);
    };

    const handleVolumeChange = (_, newValue) => {
        const audio = audioRef.current;
        audio.volume = newValue / 100;
        setVolume(newValue);
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
        setIsPlaying(false);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(false);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSliderStart = () => {
        setIsSliderActive(true);
    };

    const handleSliderEnd = () => {
        setIsSliderActive(false);
    };

    const setMinVolume = () => {
        const audio = audioRef.current;
        audio.volume = 0;
        setVolume(0);
    };

    const setMaxVolume = () => {
        const audio = audioRef.current;
        audio.volume = 1;
        setVolume(100);
    };

    return (
        <motion.div
            ref={playerRef}
            drag={!isSliderActive}
            dragMomentum={false}
            dragListener={!isSliderActive}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.3
            }}
            style={{
                position: 'fixed',
                bottom: 20,
                left: 20,
                transform: 'translateX(-50%)',
                zIndex: 1300,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
            whileDrag={{ scale: 1.0 }}
        >
            <Paper
                elevation={8}
                sx={{
                    p: 2,
                    minWidth: 400,
                    maxWidth: 500,
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    borderRadius: 5,
                    backdropFilter: 'blur(10px)',
                    position: 'relative'
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': {
                            color: 'white',
                            bgcolor: 'rgba(255, 255, 255, 0.1)'
                        },
                        zIndex: 1
                    }}
                    size="small"
                >
                    <Close fontSize="small" />
                </IconButton>

                {/* Drag Handle */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <DragIndicator sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                </Box>

                {/* Track Info */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" noWrap>
                        {playlist[currentTrack]?.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {playlist[currentTrack]?.artist}
                    </Typography>
                </Box>

                {/* Progress Bar */}
                <Box
                    onPointerDown={(e) => e.stopPropagation()}
                    style={{ touchAction: 'none' }}
                >
                    <Box
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <Slider
                            value={currentTime}
                            max={duration || 100}
                            onChange={handleTimeChange}
                            onMouseDown={handleSliderStart}
                            onTouchStart={handleSliderStart}
                            onPointerDown={handleSliderStart}
                            onMouseUp={handleSliderEnd}
                            onTouchEnd={handleSliderEnd}
                            onPointerUp={handleSliderEnd}
                            sx={{
                                color: '#fff',
                                '& .MuiSlider-thumb': {
                                    bgcolor: '#fff',
                                },
                                '& .MuiSlider-track': {
                                    bgcolor: '#fff',
                                },
                                '& .MuiSlider-root': {
                                    touchAction: 'none'
                                }
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="caption">
                            {formatTime(currentTime)}
                        </Typography>
                        <Typography variant="caption">
                            {formatTime(duration)}
                        </Typography>
                    </Box>
                </Box>

                {/* Controls */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <IconButton onClick={prevTrack} sx={{ color: 'white' }}>
                        <SkipPrevious />
                    </IconButton>
                    <IconButton
                        onClick={togglePlayPause}
                        sx={{
                            color: 'white',
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                        }}
                    >
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton onClick={nextTrack} sx={{ color: 'white' }}>
                        <SkipNext />
                    </IconButton>
                </Box>

                {/* Volume Control */}
                <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    style={{ touchAction: 'none', pointerEvents: 'auto' }}
                >
                    <IconButton onClick={setMinVolume} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
                        <VolumeDown />
                    </IconButton>
                    <Box
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        style={{ flex: 1, pointerEvents: 'auto' }}
                    >
                        <Slider
                            value={volume}
                            onChange={handleVolumeChange}
                            onMouseDown={handleSliderStart}
                            onTouchStart={handleSliderStart}
                            onPointerDown={handleSliderStart}
                            onMouseUp={handleSliderEnd}
                            onTouchEnd={handleSliderEnd}
                            onPointerUp={handleSliderEnd}
                            sx={{
                                color: '#fff',
                                '& .MuiSlider-thumb': {
                                    bgcolor: '#fff',
                                },
                                '& .MuiSlider-track': {
                                    bgcolor: '#fff',
                                },
                                '& .MuiSlider-root': {
                                    touchAction: 'none'
                                }
                            }}
                        />
                    </Box>
                    <IconButton onClick={setMaxVolume} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
                        <VolumeUp />
                    </IconButton>
                </Box>

                {/* Hidden Audio Element */}
                <audio
                    ref={audioRef}
                    src={playlist[currentTrack]?.src}
                    onEnded={nextTrack}
                />
            </Paper>
        </motion.div>
    );
};

export default MusicPlayer;
