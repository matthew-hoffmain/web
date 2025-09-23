import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReactMarkdown from "react-markdown";

export default function Message(props) {
    const isUser = props.role === "user";
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);
    const id = props.id;

    useEffect(() => {
        if (props.latestId === id && audioRef.current && !isUser && !props.muted) {
            audioRef.current.play();
            setPlaying(true);
        }
    }, [props.latestId, id, props.muted]);

    const handlePlayPause = () => {
        if (props.muted) return;
        if (!playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        setPlaying(p => !p);
    };

    return (
        <Box
            component="section"
            sx={{
                my: 2,
                bgcolor: isUser ? '#19af93' : '#222',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                borderRadius: "1rem",
                width: 'fit-content',
                maxWidth: isUser ? '75%' : '75%',
                marginLeft: isUser ? 'auto' : 0,
                marginRight: isUser ? 0 : 'auto',
                textAlign: isUser ? 'right' : 'left',
                wordBreak: 'break-word',
                boxShadow: 3,
            }}
        >
            {!isUser &&
            <IconButton
                color="inherit"
                onClick={handlePlayPause}
                sx={{ mr: 2 }}
            >
                {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            }
            <Typography sx={{
                color: 'white',
                fontFamily: 'monospace',
                flex: 1,
            }}>
                <ReactMarkdown
                    components={{
                        p: ({node, ...props}) => (
                            <Typography
                                fontFamily={'monospace'} sx={{margin: 0}} {...props} />
                        ),
                    }}>
                    {props.content}
                </ReactMarkdown>
            </Typography>
            <audio
                ref={audioRef}
                src={`/static/audio/virgil/test${id}.mp3`}
                onEnded={() => setPlaying(false)}
                style={{ display: 'none' }}
            />
        </Box>
    );
}