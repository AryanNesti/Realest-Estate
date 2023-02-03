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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
const pages = ['Login', 'Register'];

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  const onFavorite = () => {
    navigate('/favorites')
  }
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu_page = (page) => {
    navigate(`/${page}`)
    setAnchorElNav(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              onClick={() => handleCloseNavMenu_page("/")}
              sx={{
                mt: .2,
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
                REALEST ESTATE
            </Typography>
            
            {!user ? (
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: -2 }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
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
                    <MenuItem  onClick={() => handleCloseNavMenu_page("Dashboard")}>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={() => handleCloseNavMenu_page(page)}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
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
                    <MenuItem  onClick={() => handleCloseNavMenu_page("Dashboard")}>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                    <MenuItem key="Favorites" onClick={onFavorite}>
                      <Typography textAlign="center">Favorites</Typography>
                    </MenuItem>
                    <MenuItem key="logout" onClick={onLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
              </Box>
            )}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xl:'none', xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                flexgrow: 1

              }}
            >
              REALEST ESTATE
            </Typography>
            <Box sx={{ flexGrow: 1, display: {xl:'flex', xs: 'none', md: 'flex' }}}>
              <Button 
              onClick={() => handleCloseNavMenu_page("Dashboard")}
              sx={{ my: 2, color: 'white', display: 'block' }}>
                Dashboard
              </Button>
            </Box>
            {!user ? (
              <Box sx={{ justifyContent: "flex-end" , flexGrow: 0, display: { xs: 'none', md: 'flex' }}}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu_page(page)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                  onClick={onFavorite}
                  sx={{ my: 2, color: 'white', display: 'block' , flexGrow: 1 }}
                  >
                    Favorites
                  </Button>
                  <Button
                  onClick={onLogout}
                  sx={{ my: 2, color: 'white', display: 'block' , flexGrow: 1 }}
                  >
                    Logout
                  </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;