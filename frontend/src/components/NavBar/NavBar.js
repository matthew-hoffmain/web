import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import {Drawer} from "@mui/material";
import {Link} from "react-router";
import PersonIcon from '@mui/icons-material/Person';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import MemoryIcon from '@mui/icons-material/Memory';
import ForumIcon from '@mui/icons-material/Forum';
import RadioIcon from '@mui/icons-material/Radio';
import HighlightIcon from '@mui/icons-material/Highlight';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Tooltip } from '@mui/material';
import { useHighlight } from '../../contexts/HighlightContext';

// Glitch animation styles
const glitchStyles = {
    '.glitch-text': {
        position: 'relative',
        animation: 'glitch 3s infinite linear, glitch-shadow 3s infinite linear',
    },
};

const pages = [
    ['Timeline', 'timeline', <PersonIcon/>],
    // ['Projects', 'projects', <MemoryIcon/>],
    ['Radio', 'radio', <RadioIcon/>],
    // ['Showdown', 'showdown', <CatchingPokemonIcon/>],
    ['FAQ', 'faq', <ForumIcon/>],
];
const settings = ['Account', 'Logout'];

function NavBar(props) {
    const { highlightEnabled, toggleHighlight } = useHighlight();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // temp drawer stuff
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            hi
        </Box>
    );

    return (
        <AppBar position="fixed" sx={{
            bgcolor:'#2e3133',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            boxShadow: '0 8px 8px rgba(0,0,0,0.2)',
            '@keyframes glitch': {
                '0%, 90%, 100%': {
                    transform: 'translate(0)',
                    filter: 'hue-rotate(0deg)',
                },
                '92%': {
                    transform: 'translate(-2px, 2px)',
                    filter: 'hue-rotate(0deg)',
                },
                '94%': {
                    transform: 'translate(-2px, -2px)',
                    filter: 'hue-rotate(90deg)',
                },
                '96%': {
                    transform: 'translate(2px, 2px)',
                    filter: 'hue-rotate(180deg)',
                },
                '98%': {
                    transform: 'translate(2px, -2px)',
                    filter: 'hue-rotate(270deg)',
                },
            },
            '@keyframes glitch-shadow': {
                '0%, 90%, 100%': {
                    textShadow: '0 0 0 transparent',
                },
                '92%': {
                    textShadow: '-2px 0 0 #ff0000, 2px 0 0 #00ff00',
                },
                '94%': {
                    textShadow: '2px 0 0 #ff0000, -2px 0 0 #00ffff',
                },
                '96%': {
                    textShadow: '0 -2px 0 #ff0000, 0 2px 0 #ffff00',
                },
                '98%': {
                    textShadow: '-1px 1px 0 #ff0000, 1px -1px 0 #00ffff',
                },
            },
        }}
        >
            <Container maxWidth="xl">
                {/*<Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>*/}
                <Toolbar disableGutters sx={{ position: 'relative', display: 'flex', alignItems: 'center', minHeight: '64px', py: 1 }}>
                    {/* Left: Title */}
                    <Box sx={{ flex: '1 1 0', display: 'flex', alignItems: 'center', zIndex: 1 }}>
                        <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography
                                variant="h1"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'Oranienbaum',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                HOFFMA
                                <span style={{
                                    ...glitchStyles['.glitch-text'],
                                    display: 'inline-block'
                                }}>
                                    I
                                </span>
                                N<sup style={{ fontSize: '0.35em', verticalAlign: 'super', marginLeft: '0.1em' }}>&copy;</sup>
                            </Typography>
                        </Link>
                    </Box>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={page[1]} style={{ textDecoration: 'none', color: 'inherit' }} key={page[0]}>
                                <Button
                                    key={page[0]}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 1,
                                        mx: 1,
                                        borderRadius: 4,
                                        display: 'block',
                                        backgroundColor: '#535661',
                                        color: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: '#444',
                                        },
                                }}
                                >
                                    {page[2] ? page[2] : null}
                                    <Typography fontFamily={'Domine'} fontWeight={'bold'}
                                                letterSpacing={'0.1rem'}>
                                        {page[0]}
                                    </Typography>
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {/* Right: Highlight Toggle and GitHub Icon */}
                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1, zIndex: 1 }}>
                        <Tooltip title={highlightEnabled ? "Disable Text Highlighting" : "Enable Text Highlighting"}>
                            <IconButton
                                color="inherit"
                                onClick={toggleHighlight}
                                sx={{
                                    backgroundColor: highlightEnabled ? '#4caf50' : '#666',
                                    '&:hover': {
                                        backgroundColor: highlightEnabled ? '#45a049' : '#555',
                                    },
                                }}
                            >
                                {highlightEnabled ? <HighlightIcon /> : <HighlightOffIcon />}
                            </IconButton>
                        </Tooltip>
                        <IconButton color="inherit" href="https://github.com/matthew-hoffmain" target="_blank">
                            <GitHubIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
}
export default NavBar;
