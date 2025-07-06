import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Message from './Message/Message';
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import SuggestedResponses from "./SuggestedResponses/SuggestedResponses";
import PortraitIcon from '@mui/icons-material/Portrait';
import {Avatar, CircularProgress} from "@mui/material";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
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

    useEffect(() => {
        fetch('/chat/init')
            .then(response => response.json())
            .then(data => setMessages(data.content))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleInputChange = (e) => setInput(e.target.value);

    const handleInputKeyDown = async (e) => {
        if (e.key === 'Enter' && input.trim()) {
            const newMessages = [...messages, { role: 'user', content: input }];
            setMessages(newMessages);
            setInput('');
            setWaiting(true);
            const res = await fetch('/chat/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });
            const data = await res.json();
            setWaiting(false);
            setMessages(prev => [...prev, ...data.content]);
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
            height: .5,
            width: .5
        }}>

            <StyledBadge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="dot"
            >
                <   Avatar sx={{}}>VX</Avatar>
            </StyledBadge>
            <Typography
                variant="h5"
                href="/"
                sx={{
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                }}>
                Virgil
            </Typography>
            <Box
                bgcolor="black"
                style={{
                    height: '500px',
                    overflowY: 'auto',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '1rem',
                    padding: '.5rem',
                }}
            >
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        role={message.role}
                        content={message.content}
                    />
                ))}
                {waiting ? <CircularProgress /> : null}
            </Box>
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
        </Paper>
    );
}