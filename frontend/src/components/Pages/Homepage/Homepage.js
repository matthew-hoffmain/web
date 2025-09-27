import Container from "@mui/material/Container";
import ReactMarkdown from 'react-markdown';
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FooterBar from "../../FooterBar/FooterBar";

export default function Homepage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/static/pages/homepage.md')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                bgcolor: '#ffffff',
                minHeight: '100vh',
                justifyContent: 'flex-start',
            }}
        >
            <Container
                maxWidth="md"
                component="main"
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 4, bgcolor: '#ffffff' }}
            >
                <Typography align="justify" variant="body1">
                    <ReactMarkdown>
                        {message}
                    </ReactMarkdown>
                </Typography>
            </Container>

            <FooterBar/>
        </Container>
    );
}