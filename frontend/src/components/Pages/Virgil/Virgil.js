import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import MarkdownWithTooltips from "../../MarkdownWithTooltips/MarkdownWithTooltips";
import { fetchMarkdownFiles } from "../../../utils/fetchMarkdownFiles";

export default function Virgil() {
    const [messages, setMessages] = useState('');

    // Function to fetch multiple markdown files using the utility
    const loadMarkdownFiles = async () => {
        const messagesDict = await fetchMarkdownFiles('Virgil');
        setMessages(messagesDict);
    };

    useEffect(() => {
        loadMarkdownFiles();
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
                sx={{ display: 'flex', flexDirection: 'column', gap: 4 , mt:15, bgcolor:''}}
            >
                <Typography
                    align="justify"
                    variant="body1"
                    href="/"
                >
                    <MarkdownWithTooltips>
                        {messages['virgil.md'] || ''}
                    </MarkdownWithTooltips>
                </Typography>
            </Container>

        </Container>
    );
}