import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import BuildIcon from '@mui/icons-material/Build';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import Clientes from '../Clientes/Clientes'; // Importe o componente correto
import Pecas from '../Pecas/Pecas'; // Importe o componente correto
import Fechamento from '../Fechamento/Fechamento'; // Importe o componente correto
import Orcamento from '../Orçamento/Orcamento'; // Importe o componente correto

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  background: '#000',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

const modalStyle = {
  position: 'absolute',
  top: '10%',
  left: '4rem',
  right: '4rem',
  width: 'calc(100% - 8rem)',
  maxHeight: '80%',
  bgcolor: '#fff',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const modalStyleOrçamento = {
  position: 'absolute',
  top: '10%',
  left: '12rem',
  right: '12rem',
  width: 'calc(100% - 24rem)',
  maxHeight: '80%',
  bgcolor: '#fff',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenModal = (modalName) => {
    setOpenModal(modalName);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                background: '#000',
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mecanica Fogaça
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inicio', 'Clientes', 'Peças', 'Orçamento', 'Fechamento'].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleOpenModal(text)}>
                  <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <AccountCircleIcon />}
                    {index === 2 && <BuildIcon />}
                    {index === 3 && <ReceiptIcon />}
                    {index === 4 && <EqualizerIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ),
          )}
        </List>
        <Divider />
        <List>
          {['Logout'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleOpenModal(text)}>
                <ListItemIcon>{index === 0 && <LogoutIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Modais para cada item da lista */}
        <Modal
          open={openModal === 'Clientes'}
          onClose={handleCloseModal}
          aria-labelledby="modal-clientes"
          aria-describedby="modal-clientes-description"
        >
          <Box sx={modalStyle}>
            <Clientes />
          </Box>
        </Modal>

        <Modal
          open={openModal === 'Peças'}
          onClose={handleCloseModal}
          aria-labelledby="modal-pecas"
          aria-describedby="modal-pecas-description"
        >
          <Box sx={modalStyle}>
            <Pecas />
          </Box>
        </Modal>

        <Modal
          open={openModal === 'Fechamento'}
          onClose={handleCloseModal}
          aria-labelledby="modal-fechamento"
          aria-describedby="modal-fechamento-description"
        >
          <Box sx={modalStyle}>
            <Fechamento />
          </Box>
        </Modal>

        <Modal
          open={openModal === 'Orçamento'}
          onClose={handleCloseModal}
          aria-labelledby="modal-Orcamento"
          aria-describedby="modal-Orcamento-description"
        >
          <Box sx={modalStyleOrçamento}>
            <Orcamento />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
