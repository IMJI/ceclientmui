import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import CheckIcon from '@mui/icons-material/Check';
import { Chip } from '@mui/material';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { toPercentString } from '../../utils/formater';
import DateFormater from '../../utils/DateFormater';
import Outgoing from '../../models/Outgoing';
import Status from '../../models/Status';

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable({
		rows, order, setOrder, orderBy, setOrderBy, page, setPage, rowsPerPage, setRowsPerPage, totalCount, filter, setFilter, refresh
	}) {
		console.log(filter)
	const [selected, setSelected] = React.useState([]);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
	console.log(`Empty rows: ${emptyRows}`)

  	return (
		<Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
			<EnhancedTableToolbar numSelected={selected.length} filter={filter} setFilter={setFilter} refresh={refresh} />
			
			<TableContainer sx={{ flex: '0 1 calc(100% - 52px)', overflowY: 'auto' }}>
				<Table
					sx={{ minWidth: 750 }}
					aria-labelledby="tableTitle"
					size='medium'
					stickyHeader
				>
					<EnhancedTableHead
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
					/>
						<TableBody>
						{
							rows.map((row, index) => {
								const isItemSelected = isSelected(row.id);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, row.id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													'aria-labelledby': labelId,
												}}
											/>
										</TableCell>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="none"
										>
											<Stack direction='column'>
												<Typography variant='body1'>
													{row.product.name}
												</Typography>
												<Typography variant='body2'>
													{row.product.category.name}
												</Typography>
											</Stack>
										</TableCell>
										<TableCell>
											<Stack direction='column'>
												<Typography variant='body1'>
													{row.tax ? row.tax.name : 'Не облагается'}
												</Typography>
												<Typography variant='body2'>
													{row.tax ? toPercentString(row.tax.value) : ''}
												</Typography>
											</Stack>
										</TableCell>
										<TableCell>
											{Status.getStatusChip(Outgoing.getLastStatus(row.statuses).status)}
										</TableCell>
										<TableCell>
											<Stack direction='column'>
												<Typography variant='body1'>
													{DateFormater.dateToTableFormat(row.date)}
												</Typography>
												<Typography variant='body2'>
												{DateFormater.timeToTableFormat(row.date)}
												</Typography>
											</Stack>
										</TableCell>
										<TableCell align="right">
											<Stack direction='column'>
												<Typography variant='body1'>
													{row.quantity}
												</Typography>
												<Typography variant='body2'>
													штук
												</Typography>
											</Stack>
										</TableCell>
										<TableCell align="right">
											<Stack direction='column'>
												<Typography variant='body1'>
													{row.cost}
												</Typography>
												<Typography variant='body2'>
													рублей
												</Typography>
											</Stack>
										</TableCell>
									</TableRow>
								);
						})}
						{/* {emptyRows > 0 && (
							<TableRow
								style={{
									height: 53 * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)} */}
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
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
  	);
}