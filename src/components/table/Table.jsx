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

function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

// const rows = [
// 	createData('Cupcake', 305, 3.7, 67, 4.3),
// 	createData('Donut', 452, 25.0, 51, 4.9),
// 	createData('Eclair', 262, 16.0, 24, 6.0),
// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9),
// 	createData('Honeycomb', 408, 3.2, 87, 6.5),
// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// 	createData('Jelly Bean', 375, 0.0, 94, 0.0),
// 	createData('KitKat', 518, 26.0, 65, 7.0),
// 	createData('Lollipop', 392, 0.2, 98, 0.0),
// 	createData('Marshmallow', 318, 0, 81, 2.0),
// 	createData('Nougat', 360, 19.0, 9, 37.0),
// 	createData('Oreo', 437, 18.0, 63, 4.0)
// ];
const rows = [
	{ id: 1, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 2, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 3, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 4, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 5, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 6, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 7, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 8, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 9, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 10, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 11, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 12, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 13, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 14, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 15, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 16, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 17, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 18, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 19, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 20, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 21, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 22, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 23, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 24, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 25, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 26, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 27, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 28, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 29, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 },
	{ id: 30, product: { id: 1, name: 'Черные брюки', category: { id: 1, name: 'Одежда' }, description: '' }, tax: { id: 1, name: 'Акцизный налог', value: 0.07 }, status: { dateFrom: new Date(), status: 'Доставлен' }, date: new Date(), count: 20, cost: 30000 }
]

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

export default function EnhancedTable() {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('product');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  	return (
		<Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
			<EnhancedTableToolbar numSelected={selected.length} />
			
			<TableContainer sx={{ flex: '0 1 calc(100% - 52px)', overflowY: 'auto' }}>
				<Table
					sx={{ minWidth: 750 }}
					aria-labelledby="tableTitle"
					size={dense ? 'small' : 'medium'}
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
						{stableSort(rows, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
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
													{row.tax.name}
												</Typography>
												<Typography variant='body2'>
													{toPercentString(row.tax.value)}
												</Typography>
											</Stack>
										</TableCell>
										<TableCell>
											<Chip label="Доставлено" size="small" color="success" icon={<CheckIcon />} />
										</TableCell>
										<TableCell>
											<Typography variant='body1'>
												{DateFormater.toTableFormat(row.date)}
											</Typography>
										</TableCell>
										<TableCell align="right">{row.count}</TableCell>
										<TableCell align="right">{row.cost}</TableCell>
									</TableRow>
								);
						})}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: (dense ? 33 : 53) * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
			 	sx={{ height: '52px', overflowY: 'hidden' }}
				rowsPerPageOptions={[10, 25, 30, 50]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
  	);
}