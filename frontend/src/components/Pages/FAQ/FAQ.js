import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";
import Button from "@mui/material/Button";

export default function FAQ() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/static/pages/faq.md')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', gap: 4 , bgcolor:'white'}}
        >
            <Container
                maxWidth="md"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', gap: 4 , bgcolor:''}}
            >
                <Button>
                    Show answer
                </Button>
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