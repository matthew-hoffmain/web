import Container from "@mui/material/Container";
import MarkdownWithTooltips from "../../MarkdownWithTooltips/MarkdownWithTooltips";
import {useEffect, useState} from "react";
import AnimatedTypography from "../../AnimatedTypography/AnimatedTypography";
import Box from "@mui/material/Box";
import FooterBar from "../../FooterBar/FooterBar";
import CookieModal from '../../CookieModal/CookieModal';
import Highlight from "../../Highlight/Highlight";
import * as React from "react";
import {Link} from "react-router";
import { fetchMarkdownFiles } from "../../../utils/fetchMarkdownFiles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReactMarkdown from "react-markdown";
import {Divider} from "@mui/material";

export default function Homepage() {
    const [messages, setMessages] = useState({});
    const [cookieModalOpen, setCookieModalOpen] = useState(false);

    // Function to fetch multiple markdown files using the utility
    const loadMarkdownFiles = async () => {
        const messagesDict = await fetchMarkdownFiles('Homepage');
        setMessages(messagesDict);
    };

    useEffect(() => {
        loadMarkdownFiles();
    }, []);

    return (
        <Container
            maxWidth="100%"
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                bgcolor: '#ffffff',
                justifyContent: 'flex-start',
                mt: 30,
            }}
        >
            <CookieModal open={cookieModalOpen} onClose={() => setCookieModalOpen(false)} />

            {/* Welcome Section */}
            <Container
                maxWidth="md"
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    align: 'center',
                    bgcolor: '#ffffff'
                }}
            >
                <AnimatedTypography align="center" variant="body1" delay={0.2}>
                    <MarkdownWithTooltips>
                        {messages['welcome.md'] || ''}
                    </MarkdownWithTooltips>
                </AnimatedTypography>
            </Container>

            <MarkdownWithTooltips sx={{mt:10, mx: 'auto', maxWidth: '800px', textAlign: 'center'}}>
                {"## Articles"}
            </MarkdownWithTooltips>

            {/* Highlights Section with Background */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden', // Ensures background image respects border radius
                }}
            >

                {/* Background Image Layer */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: '10%',
                        right: '10%',
                        bottom: 0,
                        borderRadius: 5,
                        backgroundImage: 'url(/static/images/a_view_of_the_mountain_pass_called_the_notch_of_the_white_mountains_crawford_notch_1967.8.1.jpg)',
                        backgroundSize: '100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 1,
                        zIndex: 0,
                    }}
                />

                {/* Content Layer */}
                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        zIndex: 0,
                        p: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            p: 2,
                            gap: 5,
                            flexWrap: { xs: 'wrap', md: 'nowrap' },
                            justifyContent: 'center'
                        }}
                    >
                        <Highlight highlightLink={'articles/website_licensing'}>
                            <MarkdownWithTooltips>
                                {messages['Highlights/website_licensing.md'] || ''}
                            </MarkdownWithTooltips>
                        </Highlight>


                        <Highlight highlightLink={'articles/ai_in_law'}>
                            <MarkdownWithTooltips>
                                {messages['Highlights/ai_in_law.md'] || ''}
                            </MarkdownWithTooltips>
                        </Highlight>

                    </Box>



                    <Box
                        sx={{
                            display: 'flex',
                            p: 2,
                            gap: 5,
                            flexWrap: { xs: 'wrap', md: 'nowrap' },
                            justifyContent: 'center'
                        }}
                    >
                        <Highlight highlightLink={'timeline'}>
                            <MarkdownWithTooltips>
                                {messages['Highlights/timeline.md'] || ''}
                            </MarkdownWithTooltips>
                        </Highlight>
                    </Box>
                </Container>
            </Box>


            <MarkdownWithTooltips sx={{mt:10, mx: 'auto', maxWidth: '800px', textAlign: 'center'}}>
                {"## Projects"}
            </MarkdownWithTooltips>

            <Box
                sx={{
                    position: 'relative',
                    mt: 0,
                    overflow: 'hidden', // Ensures background image respects border radius
                }}
            >
                {/* Background Image Layer */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: '10%',
                        right: '10%',
                        bottom: 0,
                        borderRadius: 5,
                        backgroundImage: 'url(/static/images/the_departure_2014.79.13.jpg)',
                        backgroundSize: '100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 1,
                        zIndex: 0,
                    }}
                />

                {/* Content Layer */}
                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        zIndex: 0,
                        p: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            p: 2,
                            gap: 5,
                            flexWrap: { xs: 'wrap', md: 'nowrap' },
                            justifyContent: 'center'
                        }}
                    >
                        <Highlight>
                            <MarkdownWithTooltips>
                                {messages['Highlights/highlight_1.md'] || ''}
                            </MarkdownWithTooltips>
                        </Highlight>

                        <Highlight>
                            <MarkdownWithTooltips>
                                {messages['Highlights/highlight_2.md'] || ''}
                            </MarkdownWithTooltips>
                        </Highlight>
                    </Box>
                </Container>
            </Box>

            <FooterBar onOpenCookieModal={() => setCookieModalOpen(true)} />
        </Container>
    );
}
