import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from '@mui/material';
import CreateModal from '../CreateModal';
import FilterModal from '../FilterModal';

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTableToolbar({ numSelected, filter, setFilter, refresh }) {
	const [isModalOpened, setIsModalOpened] = useState(false);
	// console.log(filter)
  
    return (
      	<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
					alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				}),
			}}
		>
			{isModalOpened ? <CreateModal /> : ''}
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%' }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					
				</Typography>
			)}
	
			{numSelected > 0 ? (
				<Stack direction='row'>
					<Tooltip title="Редактировать">
						<IconButton>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Удалить">
						<IconButton>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			) : (
				<Stack direction='row'>
					<FilterModal filter={filter} setFilter={setFilter}>
						<Tooltip title="Фильтровать">
							<IconButton>
								<FilterListIcon />
							</IconButton>
						</Tooltip>
					</FilterModal>
					<CreateModal refresh={refresh}>
						<Tooltip title="Добавить">
							<IconButton onClick={() => setIsModalOpened(true)}>
								<AddIcon />
							</IconButton>
						</Tooltip>
					</CreateModal>
				</Stack>
			)}
      	</Toolbar>
    );
}
  