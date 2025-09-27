import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Message from './Message/Message';
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import IconButton from '@mui/material/IconButton';
import {Avatar, CircularProgress} from "@mui/material";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [idCounter, setIdCounter] = useState(0);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        fetch('/chat/init')
            .then(response => response.json())
            .then(data => {
                setMessages(data.content);
                // Find the max id in the loaded messages
                const maxId = data.content.reduce((max, msg) => msg.id > max ? msg.id : max, -1);
                setIdCounter(maxId + 1);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleInputChange = (e) => setInput(e.target.value);

    const handleInputKeyDown = async (e) => {
        if (e.key === 'Enter' && input.trim()) {
            const newMessage = { id: idCounter, role: 'user', content: input, visible: true };
            setMessages([...messages, newMessage]);
            setIdCounter(idCounter + 1);
            setInput('');
            setWaiting(true);
            const res = await fetch('/chat/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    { messages: [...messages, newMessage],
                            idCounter: idCounter},),
            });
            const data = await res.json();
            // Assign ids to new assistant messages
            const newAssistantMessages = data.content.map(msg => ({
                ...msg,
                id: msg.id !== undefined ? msg.id : idCounter + 1 // fallback if backend doesn't provide id
            }));
            setIdCounter(idCounter + newAssistantMessages.length + 1);
            setWaiting(false);
            setMessages(prev => [...prev, ...newAssistantMessages]);
        }
    };

    return (
        <Paper elevation={24} component="section" sx={{
            p: 2,
            bgcolor: '#333333',
            borderRadius: "1rem",
            position: 'fixed',
            bottom: 50,
            right: 50,
            height: '80vh', // Use a fixed or percentage height
            width: '35vw',  // Adjust as needed
            display: 'flex',
            flexDirection: 'column',
        }}>

            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, height: 48, flexShrink: 0 }}>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        variant="dot"
                    >
                        <Avatar>VX</Avatar>
                    </StyledBadge>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                        }}>
                        Virgil
                    </Typography>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                        onClick={() => setMuted(m => !m)}
                        sx={{ color: 'white' }}
                        aria-label={muted ? "Unmute" : "Mute"}
                    >
                        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </IconButton>
                </Box>
            </Box>

            {/* Middle (messages) area */}
            <Box
                bgcolor="black"
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: 'auto',
                    borderRadius: '1rem',
                    padding: '.5rem',
                }}
            >
                {messages.map((message) => (
                    message.visible ?
                        <Message
                            key={message.id}
                            id={message.id}
                            role={message.role}
                            content={message.content}
                            latestId={messages[messages.length - 1]?.id}
                            muted={muted}
                        /> :
                        null
                ))}
                {waiting ? <CircularProgress /> : null}
            </Box>

            {/* Input area */}
            <Box sx={{ flexShrink: 0 }}>
                <Input
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Type your message..."
                    fullWidth
                    sx={{
                        color: 'white',
                        mt: 2,
                        fontFamily: 'monospace',
                        width: '100%'
                    }}
                />
            </Box>
        </Paper>
    );
}