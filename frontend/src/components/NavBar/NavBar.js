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

const pages = [
    ['Timeline', 'timeline', <PersonIcon/>],
    ['Cyforge', 'cyforge', <MemoryIcon/>],
    ['Radio', 'radio', <RadioIcon/>],
    ['Showdown', 'showdown', <CatchingPokemonIcon/>],
    ['FAQ', 'faq', <ForumIcon/>],
];
const settings = ['Account', 'Logout'];

function NavBar(props) {
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
        <AppBar position="static" sx={{bgcolor:'black'}} >
            <Container maxWidth="xl">
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography
                            variant="h4"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            HOFFMAIN
                        </Typography>
                    </Link>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={page[1]} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button
                                    key={page[0]}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 1,
                                        mx: 1,
                                        borderRadius: 4,
                                        display: 'block',
                                        backgroundColor: '#222',
                                        color: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: '#444',
                                        },
                                }}
                                >
                                    {page[2] ? page[2] : null}
                                    <Typography fontFamily={'monospace'} fontWeight={'bold'}>
                                        {page[0]}
                                    </Typography>
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
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
