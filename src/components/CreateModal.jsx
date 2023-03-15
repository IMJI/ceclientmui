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
import { Box, Grid } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { TextField } from '@mui/material';
import Spinner from './Spinner';
import { CircularProgress } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateModal({ children, refresh }) {
	const [user, setUser] = useLocalStorage('user', null);
    const [open, setOpen] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState(null);
	const [products, setProducts] = React.useState(null);
	const [taxes, setTaxes] = React.useState(null);
	const [product, setProduct] = React.useState('');
	const [tax, setTax] = React.useState('');
	const [quantity, setQuantity] = React.useState(0);
	const navigate = useNavigate();

	React.useEffect(() => {
        const getData = async () => {
            const fetchProducts = new Fetch('/api/products').auth(user.token);
			const fetchTaxes = new Fetch('/api/taxes').auth(user.token);
            const responseProducts = await fetchProducts.get();
			const responseTaxes = await fetchTaxes.get();
            if (responseProducts && responseProducts.successful && responseTaxes && responseTaxes.successful) {
                setProducts(responseProducts.data);
				setTaxes(responseTaxes.data)
                setError(null);
				// console.log(responseProducts.data)
				// console.log('Taxes: ' + taxes)
            } else {
                setError(responseProducts.error.message + ' ' + responseTaxes.error.message);
                setProducts(null);
				setTaxes(null)
                if (responseProducts.error.name === 'AuthException' || responseTaxes.error.name === 'AuthException') {
                    navigate('/login');
                }
            }
            setIsLoading(false);
        };
        getData();
    }, []);

    const handleClickOpen = () => {
      	setOpen(true);
    };

    const handleClose = () => {
      	setOpen(false);
    };

	const handleAdd = () => {
		const fetchOutgoing = new Fetch('/api/outgoings').auth(user.token);
		const response = fetchOutgoing.post({
			product,
			tax,
			quantity
		});
		setOpen(false);
		refresh();
  	};

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
				PaperProps={{ sx: { width: '100%' } }}
			>
				<DialogTitle>{"Добавить продажу"}</DialogTitle>
				{
					isLoading || error || (!products) || (!taxes)
					? (
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
									<InputLabel id="product-label">Товар</InputLabel>
									<Select
										labelId="product-label"
										id="product-select"
										value={product}
										label="Товар"
										onChange={event => setProduct(event.target.value)}
										sx={{ width: '100%' }}
									>
										{
											products.rows.map(product => {
												return (
													<MenuItem key={product.vendorCode} value={product.vendorCode}>{product.name}</MenuItem>
												);
											})
										}
									</Select>
								</Grid>
								<Grid item xs={6}>
									<InputLabel id="tax-label">Налог</InputLabel>
									<Select
										labelId="tax-label"
										id="tax-select"
										value={tax}
										label="Налог"
										onChange={event => setTax(event.target.value)}
										sx={{ width: '100%' }}
									>
										{
											taxes.rows.map(tax => {
												return (
													<MenuItem key={tax.id} value={tax.id}>{tax.name}</MenuItem>
												);
											})
										}
									</Select>
								</Grid>
								<Grid item xs={6}>
									<TextField
										margin="dense"
										id="quantity"
										label="Количество"
										type="number"
										fullWidth
										variant="standard"
										value={quantity}
										onChange={event => setQuantity(event.target.value)}
									/>
								</Grid>
							</Grid>
						</DialogContent>
					)
				}
				<DialogActions>
					<Button onClick={handleClose}>Отменить</Button>
					<Button onClick={handleAdd}>Добавить</Button>
				</DialogActions>
			</Dialog>
        </div>
    );
}