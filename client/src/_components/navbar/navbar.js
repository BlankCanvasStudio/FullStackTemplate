import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import AuthService from '../../_services/auth';

import './navbar.css'
import { Link } from 'react-router-dom';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const logged_in_settings = ['Profile', 'Settings', 'Logout'];
const logged_out_settings = [ 'Login' ]


export default function HideAppBar(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const pages = ['hub', 'discover', ...props.recentlyVisited];

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

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar color="darkbackground">
                <Container maxWidth="x10">
                    <Toolbar disableGutters>
                    <Link to='/home' className="appbar">
                        <AdbIcon color="lighttext" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    </Link>

                    <Typography
                        variant="h6"
                        noWrap
                        component={Link} 
                        to={'/home'}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'lighttext.main',
                            textDecoration: 'none',
                        }}
                        
                    >   
                        FS Template
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="lighttext.main"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Link to={'/'+page.toLowerCase()} className="appbar">
                                    <Typography  textAlign="center">{page}</Typography>
                                </Link>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    <Link to='/home' className="appbar">
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    </Link>
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/home"
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        FS Template
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Link style={{textDecoration:"none"}} to={'/'+page.toLowerCase()} key={page}>
                            <Button
                                key={page}
                                sx={{ my: 2,display: 'block' }} 
                                color="lighttext"
                            >
                                {page}
                            </Button>
                        </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open Settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Profile" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {
                            AuthService.verifyLogin() 
                            ?
                            logged_in_settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu} >
                                    <Link to={'/'+setting.toLowerCase()} className="appbar">
                                        <Typography  textAlign="center">{setting}</Typography>
                                    </Link>
                                </MenuItem>
                            ))
                            :
                            logged_out_settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu} >
                                    <Link to={'/'+setting.toLowerCase()} className="appbar">
                                        <Typography  textAlign="center">{setting}</Typography>
                                    </Link>
                                </MenuItem>
                            ))
                        }
                        </Menu>
                    </Box>
                    </Toolbar>
                </Container>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            </React.Fragment>
    );
}
