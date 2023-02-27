import { Box, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import { TablePagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DataTable from '../components/table/Table';
import { useNavigate } from 'react-router-dom';
import Fetch from '../services/Fetch';
import useLocalStorage from '../hooks/LocalStorage';
import Spinner from '../components/Spinner';

export default function Outgoings() {
    const [user, setUser] = useLocalStorage('user', null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const getData = async () => {
            const fetchOutgoings = new Fetch('/api/outgoings').auth(user.token);
            const response = await fetchOutgoings.get();
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
            <Spinner />
        )
        : (
            <Container maxWidth="lg" sx={{ pt: 4, pb: 4, height: 'calc(100% - 64px)' }}>
                <Box sx={{height: '100%'}}>
                    <Paper sx={{height: '100%' }}>
                        <DataTable rows={data.rows} />
                    </Paper>
                </Box>
            </Container>
        )
    );
}