import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import MarkdownWithTooltips from "../../MarkdownWithTooltips/MarkdownWithTooltips";
import { fetchMarkdownFiles } from "../../../utils/fetchMarkdownFiles";
import FooterBar from "../../FooterBar/FooterBar";
import CookieModal from '../../CookieModal/CookieModal';
import * as React from "react";

export default function Ai_in_law() {
    const [messages, setMessages] = useState('');
    const [cookieModalOpen, setCookieModalOpen] = useState(false);

    // Function to fetch multiple markdown files using the utility
    const loadMarkdownFiles = async () => {
        const messagesDict = await fetchMarkdownFiles('Articles');
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
                        {messages['ai_in_law.md'] || ''}
                    </MarkdownWithTooltips>
                </Typography>
            </Container>

            <FooterBar onOpenCookieModal={() => setCookieModalOpen(true)} />
        </Container>
    );
}