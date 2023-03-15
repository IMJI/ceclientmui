import { Skeleton, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/LocalStorage';
import { useNavigate } from 'react-router-dom';
import Fetch from '../services/Fetch';
import { Stack } from '@mui/system';


export default function Profit() {
    const [user, setUser] = useLocalStorage('user', null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const fetchProfit = new Fetch('/api/profit/latest').auth(user.token);
            const response = await fetchProfit.get();
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
        };
        getData();
    }, []);

    return (
        isLoading || error || (!data)
        ? (
            <Skeleton />
        )
        : (
            <Stack>
                <Typography component='span' variant='h3'>{`${data.profit}₽`}</Typography>
                <Typography component='span' variant='subtitle1'>{`Заработано за ${(new Date()).toLocaleString('ru-RU', { month: 'long' })}`}</Typography>
            </Stack>
        )
    );
}