import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import ReactMarkdown from "react-markdown";
import Button from "@mui/material/Button";
import MarkdownWithTooltips from "../../MarkdownWithTooltips/MarkdownWithTooltips";
import AnimatedTypography from "../../AnimatedTypography/AnimatedTypography";

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
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                bgcolor: '#ffffff',
                justifyContent: 'flex-start',
            }}
        >
            <Container
                maxWidth="md"
                component="main"
                sx={{ display: 'flex',
                    flexDirection: 'column',
                    gap: 4 ,
                    mt: 15,
                    bgcolor:''}}
            >
                <MarkdownWithTooltips
                    align="justify"
                >
                    {message}
                </MarkdownWithTooltips>
            </Container>
        </Container>
    );
}