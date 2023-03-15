import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useLocalStorage from '../hooks/LocalStorage';
import Fetch from '../services/Fetch';
import { useNavigate } from 'react-router-dom';
import { FormControl, Grid } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Box } from '@mui/material';
import Spinner from './Spinner';
import MultipleSelectChip from './MultiSelect';
import useFetching from '../hooks/useFetching';
import ProductService from '../services/ProductService';
import TaxService from '../services/TaxService';
import { CircularProgress } from '@mui/material';
import RangeSlider from './RangeSlider';
import RangeService from '../services/RangeService';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FilterModal({ filter, setFilter, children }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      	setOpen(true);
    };

    const handleClose = () => {
      	setOpen(false);
    };

	const handleFilter = () => {
        setFilter({
            products: selectedProducts,
            taxes: selectedTaxes,
            costFrom: selectedCostRange[0],
            costTo: selectedCostRange[1],
            quantityFrom: selectedQuantityRange[0],
            quantityTo: selectedQuantityRange[1]
        });
		setOpen(false);
  	};

    const [products, setProducts] = React.useState([]);
    const [selectedProducts, setSelectedProducts] = React.useState(filter.products ? filter.products : []);
    const [taxes, setTaxes] = React.useState([]);
    const [selectedTaxes, setSelectedTaxes] = React.useState(filter.taxes ? filter.taxes : []);
    const [costRange, setCostRange] = React.useState([0, 1]);
    const [quantityRange, setQuantityRange] = React.useState([0, 1]);
    const [selectedCostRange, setSelectedCostRange] = React.useState(filter.costRange ? filter.costRange : [0, 100]);
    const [selectedQuantityRange, setSelectedQuantityRange] = React.useState(filter.quantityRange ? filter.quantityRange : [0, 100]);

    const [fetchProducts, isProductsLoading, errorProducts] = useFetching(async () => {
        const products = await ProductService.getAll();
        setProducts(products.rows);
    });

    const [fetchTaxes, isTaxesLoading, errorTaxes] = useFetching(async () => {
        const taxes = await TaxService.getAll();
        setTaxes(taxes.rows);
    });

    const [fetchCostRange, isCostRangeLoading, errorCostRange] = useFetching(async () => {
        const costRange = await RangeService.get('cost');
        setCostRange([costRange.min, costRange.max]);
        setSelectedCostRange(filter.costFrom && filter.costTo ? [filter.costFrom, filter.costTo] : [costRange.min, costRange.max]);
    });

    const [fetchQuantityRange, isQuantityRangeLoading, errorQuantityRange] = useFetching(async () => {
        const quantityRange = await RangeService.get('quantity');
        setQuantityRange([quantityRange.min, quantityRange.max]);
        setSelectedQuantityRange(filter.quantityFrom && filter.quantityTo ? [filter.quantityFrom, filter.quantityTo] : [quantityRange.min, quantityRange.max]);
    });

    React.useEffect(() => {
        fetchProducts();
        fetchTaxes();
        fetchCostRange();
        fetchQuantityRange();
    }, [open]);

    return (
        <div>
			<div onClick={handleClickOpen}>
				{children}
			</div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
                PaperProps={{ sx: { width: '100%', maxWidth: '800px' } }}
			>
				<DialogTitle>{"Добавить фильтры"}</DialogTitle>
				{
					isProductsLoading || errorProducts || (!products) ||
                    isTaxesLoading || errorTaxes || (!taxes) ||
                    isCostRangeLoading || errorCostRange || (!costRange) ||
                    isQuantityRangeLoading || errorQuantityRange || (!quantityRange)
					? (
						// <Spinner />
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CircularProgress color="inherit" />
                        </Box>
					)
					: (
						<DialogContent>
							<Grid container spacing={3}>
								<Grid item xs={6}>
                                    <MultipleSelectChip
                                        id="products"
                                        name="Товары"
                                        items={products}
                                        selected={selectedProducts}
                                        setSelected={setSelectedProducts}
                                        alias='vendorCode'
                                    />
								</Grid>
								<Grid item xs={6}>
                                <MultipleSelectChip
                                        id="taxes"
                                        name="Налоги"
                                        items={taxes}
                                        selected={selectedTaxes}
                                        setSelected={setSelectedTaxes}
                                    />
								</Grid>
                                <Grid item xs={6}>
                                    <RangeSlider
                                        name='Стоимость'
                                        min={costRange[0]}
                                        max={costRange[1]}
                                        step={0.01}
                                        values={selectedCostRange}
                                        setValues={setSelectedCostRange}
                                    />
								</Grid>
                                <Grid item xs={6}>
                                    <RangeSlider
                                        name='Количество'
                                        min={quantityRange[0]}
                                        max={quantityRange[1]}
                                        step={1}
                                        values={selectedQuantityRange}
                                        setValues={setSelectedQuantityRange}
                                    />
								</Grid>
							</Grid>
						</DialogContent>
					)
				}
				<DialogActions>
					<Button onClick={handleClose}>Отменить</Button>
					<Button onClick={handleFilter}>Применить</Button>
				</DialogActions>
			</Dialog>
        </div>
    );
}