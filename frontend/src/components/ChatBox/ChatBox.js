import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Message from './Message/Message';
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import SuggestedResponses from "./SuggestedResponses/SuggestedResponses";
import PortraitIcon from '@mui/icons-material/Portrait';
import {Avatar} from "@mui/material";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';


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

    useEffect(() => {
        fetch('/chat/init')
            .then(response => response.json())
            .then(data => setMessages(data.content))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Paper elevation={24} component="section" sx={{ p: 2, bgcolor: '#333333', borderRadius:"1rem", position:'fixed', bottom:50, right:50, height:.5, width:.5}}>

            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
            {messages.map((message) => (
                <Message
                    key={message.id}
                    sender={message.sender}
                    content={message.content}
                >
                </Message>
            ))}
            <Input></Input>
        </Paper>
    );
}