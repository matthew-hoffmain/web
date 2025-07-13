import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Drawer} from "@mui/material";
import {Link} from "react-router";

const pages = [
    ['About Me', 'about_me'],
    ['Showdown', 'showdown'],
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


                    {/*<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>*/}
                    {/*    <IconButton*/}
                    {/*        size="large"*/}
                    {/*        aria-label="account of current user"*/}
                    {/*        aria-controls="menu-appbar"*/}
                    {/*        aria-haspopup="true"*/}
                    {/*        onClick={handleOpenNavMenu}*/}
                    {/*        color="inherit"*/}
                    {/*    >*/}
                    {/*        <MenuIcon />*/}
                    {/*    </IconButton>*/}
                    {/*    <Menu*/}
                    {/*        id="menu-appbar"*/}
                    {/*        anchorEl={anchorElNav}*/}
                    {/*        anchorOrigin={{*/}
                    {/*            vertical: 'bottom',*/}
                    {/*            horizontal: 'left',*/}
                    {/*        }}*/}
                    {/*        keepMounted*/}
                    {/*        transformOrigin={{*/}
                    {/*            vertical: 'top',*/}
                    {/*            horizontal: 'left',*/}
                    {/*        }}*/}
                    {/*        open={Boolean(anchorElNav)}*/}
                    {/*        onClose={handleCloseNavMenu}*/}
                    {/*        sx={{ display: { xs: 'block', md: 'none' } }}*/}
                    {/*    >*/}
                    {/*        {pages.map((page) => (*/}
                    {/*            <MenuItem key={page} onClick={handleCloseNavMenu}>*/}
                    {/*                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>*/}
                    {/*            </MenuItem>*/}
                    {/*        ))}*/}
                    {/*    </Menu>*/}
                    {/*</Box>*/}
                    {/*<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}
                    {/*<Typography*/}
                    {/*    variant="h4"*/}
                    {/*    noWrap*/}
                    {/*    component="a"*/}
                    {/*    href="#app-bar-with-responsive-menu"*/}
                    {/*    sx={{*/}
                    {/*        mr: 2,*/}
                    {/*        display: { xs: 'flex', md: 'none' },*/}
                    {/*        flexGrow: 1,*/}
                    {/*        fontFamily: 'monospace',*/}
                    {/*        fontWeight: 700,*/}
                    {/*        letterSpacing: '.3rem',*/}
                    {/*        color: 'inherit',*/}
                    {/*        textDecoration: 'none',*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    HOFFMAIN*/}
                    {/*</Typography>*/}

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
                                    <Typography fontFamily={'monospace'} fontWeight={'bold'}>
                                        {page[0]}
                                    </Typography>
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {/*<Box sx={{ flexGrow: 0 }}>*/}
                    {/*    <Tooltip title="Open settings">*/}
                    {/*        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>*/}
                    {/*            <Avatar alt="Anonymous User" src="/static/images/avatar/2.jpg" />*/}
                    {/*        </IconButton>*/}
                    {/*    </Tooltip>*/}
                    {/*    <Menu*/}
                    {/*        sx={{ mt: '45px' }}*/}
                    {/*        id="menu-appbar"*/}
                    {/*        anchorEl={anchorElUser}*/}
                    {/*        anchorOrigin={{*/}
                    {/*            vertical: 'top',*/}
                    {/*            horizontal: 'right',*/}
                    {/*        }}*/}
                    {/*        keepMounted*/}
                    {/*        transformOrigin={{*/}
                    {/*            vertical: 'top',*/}
                    {/*            horizontal: 'right',*/}
                    {/*        }}*/}
                    {/*        open={Boolean(anchorElUser)}*/}
                    {/*        onClose={handleCloseUserMenu}*/}
                    {/*    >*/}
                    {/*        {settings.map((setting) => (*/}
                    {/*            <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                    {/*                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>*/}
                    {/*            </MenuItem>*/}
                    {/*        ))}*/}
                    {/*    </Menu>*/}
                    {/*</Box>*/}
                </Toolbar>
            </Container>

        </AppBar>

    );
}
export default NavBar;
