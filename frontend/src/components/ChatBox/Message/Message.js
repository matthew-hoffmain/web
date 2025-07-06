import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";


export default function Message(props) {
    const isUser = props.role === "user";
    return (
        <Box
            component="section"
            sx={{
                my: 2,
                bgcolor: isUser ? '#1976d2' : '#888888',
                color: 'white',
                display: 'block',
                padding: '1rem',
                borderRadius: "1rem",
                width: 'fit-content',
                maxWidth: '75%',
                marginLeft: isUser ? 'auto' : 0,
                marginRight: isUser ? 0 : 'auto',
                textAlign: isUser ? 'right' : 'left',
                wordBreak: 'break-word',
            }}
        >
            <Typography sx={{
                color: 'white',
                fontFamily: 'monospace',
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
        </Box>
    );
}