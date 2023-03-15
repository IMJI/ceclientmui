import { Skeleton, TableCell, TableRow, TableBody, Box, TableContainer, Table, TablePagination, Stack } from '@mui/material';
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import EnhancedTableHead from '../EnhancedTableHead';
import React from 'react';

function SkeletonColumn({ index, type, align = 'left' }) {
    if (type === 'checkbox')
        return (
            <TableCell align={align}>
                <Skeleton variant="rounded" width={24} height={24} />
            </TableCell>
        );
    else if (type === 'status')
        return (
            <TableCell align={align}>
                <Skeleton variant="rounded" width={90} height={24} />
            </TableCell>
        );
    return (
        <TableCell align={align}>
            <Stack direction='column'>
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '50%' }}  />
                <Skeleton variant="text" sx={{ fontSize: '0.875rem', width: '35%' }}  />
            </Stack>
        </TableCell>
    );
}

function SkeletonRow({ index, cols }) {
    const columns = [];
    for (let i = 0; i < cols.length; i++) {
        columns.push(<SkeletonColumn key={i} type={cols[i].type} right={cols[i].right} />);
    }

    return (
        <TableRow
            role="checkbox"
            tabIndex={-1}
        >
            {columns}
        </TableRow>
    )
}

export default function SkeletonTable({ rowsCount, cols, order, orderBy, page, rowsPerPage, totalCount }) {
    const rows = [];
    for (let i = 0; i < rowsCount; i++) {
        rows.push(<SkeletonRow key={i} cols={cols} />);
    }


    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
			<EnhancedTableToolbar numSelected={0} filter={{}} setFilter={() => {}} refresh={() => {}} />
            <TableContainer sx={{ flex: '0 1 calc(100% - 52px)', overflowY: 'auto' }}>
				<Table
					sx={{ minWidth: 750 }}
					aria-labelledby="tableTitle"
					size='medium'
					stickyHeader
				>
					<EnhancedTableHead
						numSelected={0}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={() => {}}
						onRequestSort={() => {}}
						rowCount={rows.length}
					/>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
			 	sx={{ height: '52px', overflowY: 'hidden' }}
				rowsPerPageOptions={[10, 25, 30, 50]}
				component="div"
				count={totalCount}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={() => {}}
				onRowsPerPageChange={() => {}}
			/>
        </Box>
    )
}