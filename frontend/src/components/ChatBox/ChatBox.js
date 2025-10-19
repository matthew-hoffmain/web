import React, {useEffect, useState, useRef} from 'react';
import Paper from '@mui/material/Paper';
import Message from './Message/Message';
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import {Avatar, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import {Link} from "react-router";
import AssistantIcon from '@mui/icons-material/Assistant';


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

export default function ChatBox({ onExternalMessage, onRegisterMessageHandler, visible = false, onVisibilityChange }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [idCounter, setIdCounter] = useState(0);
    const [muted, setMuted] = useState(true);
    const [showScrollArrow, setShowScrollArrow] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const messagesContainerRef = useRef(null);
    const prevMessageCountRef = useRef(0);
    const abortControllerRef = useRef(null);

    // Add a function to handle sending a message (from input or suggestion)
    const sendMessage = async (text) => {
        if (!text.trim()) return;

        // Cancel any existing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller for this request
        abortControllerRef.current = new AbortController();

        const newMessage = { id: idCounter, role: 'user', content: text, visible: true };
        setMessages([...messages, newMessage]);
        setIdCounter(idCounter + 1);
        setInput('');
        setWaiting(true);

        try {
            const res = await fetch('/chat/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    { messages: [...messages, newMessage],
                            idCounter: idCounter},),
                signal: abortControllerRef.current.signal
            });

            if (res.ok) {
                const data = await res.json();
                // Assign ids to new assistant messages
                const newAssistantMessages = data.content.map(msg => ({
                    ...msg,
                    id: msg.id !== undefined ? msg.id : idCounter + 1 // fallback if backend doesn't provide id
                }));
                setIdCounter(idCounter + newAssistantMessages.length + 1);
                setMessages(prev => [...prev, ...newAssistantMessages]);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request was cancelled');
            } else {
                console.error('Error sending message:', error);
            }
        } finally {
            setWaiting(false);
            abortControllerRef.current = null;
        }
    };

    // Add effect to register the message handler (now after sendMessage is declared)
    useEffect(() => {
        if (onRegisterMessageHandler) {
            const messageHandler = (message) => {
                // Open the ChatBox if it's minimized
                // Send the message after a brief delay to allow UI to update
                setTimeout(() => {
                    sendMessage(message);
                }, 100);
            };
            onRegisterMessageHandler(messageHandler);
        }
    }, [onRegisterMessageHandler, sendMessage]);

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
            await sendMessage(input);
        }
    };

    const clearConversation = async () => {
        try {
            // Cancel any ongoing prompt request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                abortControllerRef.current = null;
                setWaiting(false);
            }

            const response = await fetch('/chat/clear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // Instead of clearing everything, restore to the original init state
                const initResponse = await fetch('/chat/init');
                if (initResponse.ok) {
                    const initData = await initResponse.json();
                    setMessages(initData.content);
                    // Set idCounter to continue from the highest ID in init messages
                    const maxId = initData.content.reduce((max, msg) => msg.id > max ? msg.id : max, -1);
                    setIdCounter(maxId + 1);
                } else {
                    // Fallback to empty state if init fails
                    setMessages([]);
                    setIdCounter(0);
                }
                setShowDeleteConfirm(false);
            }
        } catch (error) {
            console.error('Error clearing conversation:', error);
            setShowDeleteConfirm(false);
        }
    };

    // Cleanup abort controller on component unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // Check if we should show the scroll arrow when messages change
    useEffect(() => {
        const visibleMessages = messages.filter(msg => msg.visible);
        const currentCount = visibleMessages.length;

        // If message count increased (new message sent/received)
        if (currentCount > prevMessageCountRef.current) {
            const container = messagesContainerRef.current;
            if (container) {
                const { scrollTop, clientHeight, scrollHeight } = container;
                // Show arrow if not already at bottom
                if (scrollHeight - scrollTop > clientHeight + 10) { // 10px threshold
                    setShowScrollArrow(true);
                }
            }
        }
        prevMessageCountRef.current = currentCount;
    }, [messages]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = container;
            // Hide arrow when user scrolls to bottom
            const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10; // 10px threshold
            if (isAtBottom) {
                setShowScrollArrow(false);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    // If not visible, don't render anything (the icon handles the minimized state)
    if (!visible) {
        return null;
    }

    return (
        <Paper elevation={24} component="section" sx={{
            p: 2,
            bgcolor: '#333333',
            borderRadius: "1rem",
            position: 'fixed',
            bottom: 50,
            right: 50,
            height: '80vh',
            width: '35vw',
            display: 'flex',
            flexDirection: 'column',
        }}>

            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, height: 48, flexShrink: 0 }}>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    <Link to="/virgil" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant="dot"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Avatar sx={{ cursor: 'pointer' }}>VX</Avatar>
                        </StyledBadge>
                    </Link>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <Link to="/virgil" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: '#ccc'
                                }
                            }}>
                            Virgil
                        </Typography>
                    </Link>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <IconButton
                        onClick={() => setShowDeleteConfirm(true)}
                        sx={{ color: 'white' }}
                        aria-label="Clear conversation"
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => setMuted(m => !m)}
                        sx={{ color: 'white' }}
                        aria-label={muted ? "Unmute" : "Mute"}
                    >
                        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </IconButton>
                    <IconButton
                        onClick={() => onVisibilityChange && onVisibilityChange(false)}
                        sx={{
                            color: 'white',
                            '&:hover': {
                                color: '#ccc'
                            }
                        }}
                        aria-label="Minimize chat"
                    >
                        <CloseIcon />
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
                    position: 'relative', // Add this for absolute positioning of arrow
                }}
                ref={messagesContainerRef}
            >
                {messages.map((message) => (
                    message.visible ?
                        <Message
                            key={message.id}
                            id={message.id}
                            role={message.role}
                            content={message.content}
                            audioFilename={message.audio_filename}
                            latestId={messages[messages.length - 1]?.id}
                            muted={muted}
                        /> :
                        null
                ))}
                {waiting ? <CircularProgress /> : null}
                {/* Scroll to bottom arrow */}
                {showScrollArrow && (
                    <IconButton
                        onClick={() => {
                            const container = messagesContainerRef.current;
                            if (container) {
                                container.scrollTop = container.scrollHeight;
                                setShowScrollArrow(false);
                            }
                        }}
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            color: 'white',
                            bgcolor: 'rgba(68, 68, 68, 0.9)',
                            backdropFilter: 'blur(4px)',
                            '&:hover': {
                                bgcolor: 'rgba(85, 85, 85, 0.9)',
                            },
                            zIndex: 1,
                        }}
                    >
                        <KeyboardArrowDownIcon />
                    </IconButton>
                )}
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
            {/* Suggested messages area */}
            <Box sx={{ flexShrink: 0, mt: 1 }}>
                {/* #here: Insert suggested messages */}
                <React.Suspense fallback={null}>
                    {React.createElement(require('./SuggestedResponses/SuggestedResponses').default, { onSend: sendMessage })}
                </React.Suspense>
            </Box>

            {/* Delete Confirmation Modal */}
            <Dialog
                open={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                PaperProps={{
                    sx: {
                        bgcolor: '#333333',
                        color: 'white',
                        borderRadius: '1rem',
                        border: '1px solid #555',
                    }
                }}
                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }
                }}
            >
                <DialogTitle sx={{
                    color: 'white',
                    fontFamily: 'monospace',
                    textAlign: 'center'
                }}>
                    Clear Conversation
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{
                        color: 'white',
                        fontFamily: 'monospace',
                        textAlign: 'center'
                    }}>
                        Are you sure you want to delete this conversation? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
                    <Button
                        onClick={() => setShowDeleteConfirm(false)}
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            fontFamily: 'monospace',
                            '&:hover': {
                                borderColor: '#ccc',
                                bgcolor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={clearConversation}
                        sx={{
                            bgcolor: '#d32f2f',
                            color: 'white',
                            fontFamily: 'monospace',
                            '&:hover': {
                                bgcolor: '#b71c1c'
                            }
                        }}
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
