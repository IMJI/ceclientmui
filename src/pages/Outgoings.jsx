import { Box, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import { TablePagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DataTable from '../components/table/Table';
import { useNavigate } from 'react-router-dom';
import Fetch from '../services/Fetch';
import useLocalStorage from '../hooks/LocalStorage';
import Spinner from '../components/Spinner';
import OutgoingService from '../services/OutgoingService';
import useFetching from '../hooks/useFetching';
import SkeletonTable from '../components/table/skeleton/SkeletonTable';
import useAlert from '../hooks/useAlert';

export default function Outgoings() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const { setAlert } = useAlert();

    const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('date');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
    const [totalCount, setTotalCount] = useState(0);
    const [filter, setFilter] = useState({});

    const [fetchOutgoings, isLoading, error] = useFetching(async () => {
        const outgoings = await OutgoingService.getAll(rowsPerPage, page, order, orderBy, filter);
        setData(outgoings);
        setTotalCount(outgoings.count);
        console.log(outgoings)
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const cols = [
        {
            type: 'checkbox',
            align: 'left'
        },
        {
            type: 'stack',
            align: 'left'
        },
        {
            type: 'stack',
            align: 'left'
        },
        {
            type: 'status',
            align: 'left'
        },
        {
            type: 'stack',
            align: 'left'
        },
        {
            type: 'stack',
            align: 'right'
        },
        {
            type: 'stack',
            align: 'right'
        }
    ]

    // const getOutgoings = async () => {
    //     // const fetchOutgoings = new Fetch('/api/outgoings').auth(user.token);
    //     // const response = await fetchOutgoings.get();
    //     // if (response && response.successful) {
    //     //     setData(response.data);
    //     //     setError(null);
    //     // } else {
    //     //     setError(response.error.message);
    //     //     setData(null);
    //     //     if (response.error.name === 'AuthException') {
    //     //         navigate('/login');
    //     //     }
    //     // }
    //     // setIsLoading(true);
        
    //     // setIsLoading(false);
    //     // console.log(`Fetched ${outgoings.data.rows.length} rows`);
    // };

    useEffect(() => {
        fetchOutgoings();
        console.log(`error: ${error}`)
        if (error) {
            setAlert(error.message);
        }
    }, [order, orderBy, page, rowsPerPage, filter]);

    return (
        <Container maxWidth="lg" sx={{ pt: 4, pb: 4, height: 'calc(100% - 64px)' }}>
            <Box sx={{height: '100%'}}>
                <Paper sx={{height: '100%' }}>
                    {
                        isLoading || error || (!data)
                        ? <SkeletonTable
                            rowsCount={rowsPerPage}
                            order={order}
                            orderBy={orderBy}
                            cols={cols}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            totalCount={totalCount}
                        />
                        : <DataTable
                            rows={data.rows}
                            order={order}
                            setOrder={setOrder}
                            orderBy={orderBy}
                            setOrderBy={setOrderBy}
                            page={page}
                            setPage={setPage}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            totalCount={totalCount}
                            filter={filter}
                            setFilter={setFilter}
                            refresh={() => fetchOutgoings()}
                        />
                    }
                </Paper>
            </Box>
        </Container>
    );

    // return (
    //     isLoading || error || (!data)
    //     ? (
    //         <Spinner />
    //     )
    //     : (
    //         <Container maxWidth="lg" sx={{ pt: 4, pb: 4, height: 'calc(100% - 64px)' }}>
    //             <Box sx={{height: '100%'}}>
    //                 <Paper sx={{height: '100%' }}>
    //                     <DataTable
    //                         rows={data.rows}
    //                         order={order}
    //                         setOrder={setOrder}
    //                         orderBy={orderBy}
    //                         setOrderBy={setOrderBy}
    //                         page={page}
    //                         setPage={setPage}
    //                         rowsPerPage={rowsPerPage}
    //                         setRowsPerPage={setRowsPerPage}
    //                         totalCount={totalCount}
    //                     />
    //                 </Paper>
    //             </Box>
    //         </Container>
    //     )
    // );
}