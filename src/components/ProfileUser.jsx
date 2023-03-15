import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/LocalStorage';
import Fetch from '../services/Fetch';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate, Link } from 'react-router-dom';

export default function ProfileUser() {
    const [user, setUser] = useLocalStorage('user', null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            const fetchUser = new Fetch('/api/users').auth(user.token);
            const response = await fetchUser.get();
            if (response && response.successful) {
                setData(response.data);
                setError(null);
            } else {
                setError(response.error.message);
                setData(null);
                if (response.error.name === 'AuthException') {
                    navigate('/login');
                }
            }
            setIsLoading(false);
            // console.log(isLoading + ' ' + data + ' ' + error)
        };
        getData();
    }, []);

    return (
        <div>
            {
            isLoading || error || !data
            ? (
                <ListItemButton>
                    <ListItemIcon>
                        <Skeleton variant="circular" width={40} height={40} />
                    </ListItemIcon>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '75%' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '45%' }} />
                    </Box>
                    
                </ListItemButton>
            )
            : (
                <ListItemButton component={Link} to="/profile">
                    <ListItemIcon>
                    <Avatar>{`${data.firstName[0]}${data.lastName[0]}`}</Avatar>
                    </ListItemIcon>
                    <Box>
                        <ListItemText sx={{ margin: 0 }} primary={`${data.firstName} ${data.lastName}`} />
                        <ListItemText sx={{ margin: 0 }} primary={data.role} />
                    </Box>
                    
                </ListItemButton>
            )
        }
        </div>
        
    );
}