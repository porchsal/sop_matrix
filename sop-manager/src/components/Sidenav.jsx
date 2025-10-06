import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
//import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';  // Para el submenú
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';


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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
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
  }),
);

function Sidenav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false); // Drawer abierto por defecto
  const [openSubMenu, setOpenSubMenu] = React.useState(null); // "sop" | "employee" | null
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const canSeeAdminOptions = role === "Manager" || role === "Administrator";

  const toggleSubMenu = (menu) => {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {/* SOP */}
          <ListItem 
            disablePadding 
            sx={{ display: "block" }} 
            onClick={() => {
              toggleSubMenu("sop")
              open || setOpen(true);
              }}>
            <ListItemButton>
              <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
              <ListItemText primary="SOP" sx={{ opacity: open ? 1 : 0 }} />
              {openSubMenu === "sop" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openSubMenu === "sop"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={() => navigate("/sop")}>
                <ListItemText primary="SOP List" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/sop/inactive")}>
                <ListItemText primary="Inactive SOP" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Training */}
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/training")}>
            <ListItemButton>
              <ListItemIcon><SystemUpdateAltIcon /></ListItemIcon>
              <ListItemText primary="Training" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          {/* Employee */}
          <ListItem 
            disablePadding 
            sx={{ display: "block" }} 
            onClick={() => {
              toggleSubMenu("employee")
              open || setOpen(true);
              }}>
            <ListItemButton>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Employees" sx={{ opacity: open ? 1 : 0 }} />
              {openSubMenu === "employee" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openSubMenu === "employee"} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={() => navigate("/employee")}>
                <ListItemText primary="Employee List" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/employee/inactive")}>
                <ListItemText primary="Inactive Employees" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Settings & Users (solo admin/manager) */}
          {canSeeAdminOptions && (
            <>
              <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/settings")}>
                <ListItemButton>
                  <ListItemIcon><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/users")}>
                <ListItemButton>
                  <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
                  <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/audit-trail")}>
                <ListItemButton>
                  <ListItemIcon><ManageHistoryIcon /></ListItemIcon>
                  <ListItemText primary="Audit Trail" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidenav;