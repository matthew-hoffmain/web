import Container from "@mui/material/Container";
import ReactMarkdown from 'react-markdown';
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import MyTimeline from "./MyTimeline/MyTimeline";
import FooterBar from "../../FooterBar/FooterBar";
import MarkdownWithTooltips from "../../MarkdownWithTooltips/MarkdownWithTooltips";


export default function Timeline(props) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/static/pages/about_me.md')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column',
                bgcolor:'#ffffff',
        }}
        >
            <Container
                maxWidth="xl"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', gap: 4 ,
                    bgcolor:'#ffffff',
                    mt: 15,
            }}
            >
                <Typography
                    align="justify"
                    variant="body1"
                    href="/"
                    sx={{
                        fontFamily: 'domine',
                    }}>
                    <MarkdownWithTooltips>
                        {message}
                    </MarkdownWithTooltips>
                </Typography>

                <MyTimeline topRef={props.topRef}/>
                <div/>
            </Container>
            <FooterBar/>
        </Container>
    );
}