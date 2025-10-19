import Container from "@mui/material/Container";
import ReactMarkdown from 'react-markdown';
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button,
    Divider
} from "@mui/material";
import {
    PlayArrow,
    Pause,
    MusicNote,
    QueueMusic,
    Link
} from "@mui/icons-material";
import FooterBar from "../../FooterBar/FooterBar";
import MarkdownWithTooltips from "../../MarkdownWithTooltips/MarkdownWithTooltips";
import * as React from "react";
import Highlight from "../../Highlight/Highlight";
import AnimatedTypography from "../../AnimatedTypography/AnimatedTypography";

export default function Radio({ showMusicPlayer, onShowMusicPlayer, onPlaylistSelect }) {
    const [message, setMessage] = useState('');

    // Available playlists
    const playlists = [
        {
            id: 'nocturnes',
            name: 'Nocturnes',
            description: 'A set of my favorite nocturnes by various composers.',
            tracks: [
                {
                    title: "Nocturne Op. 55 No. 1",
                    artist: "Frederic Chopin",
                    src: "https://www.classicals.de/s/Classicalsde-Chopin-Nocturne-in-F-minor-Op-55-No-1.mp3",
                    license: {
                        type: "Non-Commercial License",
                        url: "https://www.classicals.de/licensing#non-commercial"
                    }
                },
            ]
        },
    ];

    useEffect(() => {
        fetch('/static/pages/radio.md')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handlePlayPlaylist = (playlist) => {
        onPlaylistSelect(playlist.tracks);
        if (!showMusicPlayer) {
            onShowMusicPlayer();
        }
    };

    const handlePlayTrack = (playlist, trackIndex) => {
        onPlaylistSelect(playlist.tracks, trackIndex);
        if (!showMusicPlayer) {
            onShowMusicPlayer();
        }
    };

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
                mt: 15,
            }}
        >

            {/* Detail Section */}
            <Container
                maxWidth="md"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', gap: 4 , bgcolor:''}}
            >
                <AnimatedTypography
                    align="justify"
                    variant="body1"
                    >
                    <MarkdownWithTooltips>
                        {message}
                    </MarkdownWithTooltips>
                </AnimatedTypography>
            </Container>

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
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 5,
                        backgroundImage: 'url(/static/images/the_oxbow.jpg)',
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
                    {/* Playlist Selection */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: 2,
                        alignItems: 'start'
                    }}>


                        {playlists.map((playlist) => (
                            <Card key={playlist.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant="h6" gutterBottom>
                                                {playlist.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                {playlist.description}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {playlist.tracks.length} tracks
                                            </Typography>
                                        </Box>

                                        <IconButton
                                            onClick={() => handlePlayPlaylist(playlist)}
                                            color="primary"
                                            size="large"
                                            sx={{
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                '&:hover': { bgcolor: 'primary.dark' }
                                            }}
                                        >
                                            <PlayArrow />
                                        </IconButton>
                                    </Box>

                                    {/* Track List */}
                                    <List dense sx={{ mt: 2 }}>
                                        {playlist.tracks.map((track, index) => (
                                            <ListItem
                                                key={index}
                                                sx={{
                                                    py: 0.5,
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                                                        borderRadius: 1
                                                    }
                                                }}
                                                onClick={() => handlePlayTrack(playlist, index)}
                                            >
                                                <ListItemIcon>
                                                    <MusicNote fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={track.title}
                                                    secondary={track.artist}
                                                />
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: 'primary.main',
                                                        opacity: 0.7,
                                                        '&:hover': { opacity: 1 }
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handlePlayTrack(playlist, index);
                                                    }}
                                                >
                                                    <PlayArrow fontSize="small" />
                                                </IconButton>

                                                {/* License Info */}
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        ml: 1,
                                                        opacity: 0.7,
                                                        '&:hover': { opacity: 1 }
                                                    }}
                                                    component="a"
                                                    href={track.license.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={`License: ${track.license.type}`}
                                                >
                                                    <Link fontSize="small" />
                                                </IconButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>



            <FooterBar/>
        </Container>
    );
}