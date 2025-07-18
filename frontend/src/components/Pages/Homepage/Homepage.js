import Container from "@mui/material/Container";
import ReactMarkdown from 'react-markdown';
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";

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
                sx={{ display: 'flex', flexDirection: 'column', my: 4, gap: 4 , bgcolor:'white'}}
            >
                <Container
                    maxWidth="md"
                    component="main"
                    sx={{ display: 'flex', flexDirection: 'column', my: 4, gap: 4 , bgcolor:'white'}}
                >
                    <Typography
                        align="justify"
                        variant="body1"
                        href="/"
                        sx={{
                            fontFamily: 'monospace',
                        }}>
                        <ReactMarkdown>
                            {message}
                        </ReactMarkdown>
                    </Typography>
                </Container>

            </Container>
    );
}