import Message from "../Message/Message";
import React from "react";
import Button from "@mui/material/Button";
import {styled} from "@mui/material";
import Box from "@mui/material/Box";

const ResponseButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    color: 'white',
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});


export default function SuggestedResponses() {

    const samples = ["How are you?", "Who are you?", "Where am I?", "Can you tell me about Matt?"];

    return <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>
        {samples.map((sample) => (
            <ResponseButton
                key={sample}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {sample}
            </ResponseButton>
        ))}
    </Box>

}