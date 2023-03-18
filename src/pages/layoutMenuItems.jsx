import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link, useNavigate } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Панель" />
        </ListItemButton>
        <ListItemButton component={Link} to="/outgoings">
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Продажи" />
        </ListItemButton>
        <ListItemButton component={Link} to="/stock">
            <ListItemIcon>
                <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Склад" />
        </ListItemButton>
        <ListItemButton component={Link} to="/subordinates">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Подчиненные" />
        </ListItemButton>
        <ListItemButton component={Link} to="/statistics">
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Статистика" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/settings">
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
        </ListItemButton>
        <ListItemButton
            onClick={
                () => {
                    localStorage.removeItem('user');
                }
            }
            component={Link}
            to="/login"
        >
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Выход" />
        </ListItemButton>
    </React.Fragment>
);