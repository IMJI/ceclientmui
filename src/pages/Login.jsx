import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Alert, AlertTitle } from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/LocalStorage';
import Fetch from '../services/Fetch';

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage('user', {});
    const [errorMessage, setErrorMessage] = useState('');

    const login = async (email, password) => {
        const fetchLogin = new Fetch('/login');
        const response = await fetchLogin.post({ email, password });
        if (response.successful) {
            const data = response.data;
            if (!data) {
                setErrorMessage('Невозможно подключиться к серверу');
                return;
            }
            setUser({
                email: data?.user.email,
                token: data?.token
            });
            navigate('/');
        } else {
            const error = response.error;
            setErrorMessage(error?.message || '');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        login(data.get('email'), data.get('password'))
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Войти
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {
                            errorMessage
                            ? (
                                <Alert severity="error">
                                    <AlertTitle>Ошибка входа</AlertTitle>
                                    {errorMessage}
                                </Alert>
                            ) : ''
                        }
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Электронная почта"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Запомнить меня"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

// import axios, { AxiosError } from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import useLocalStorage from '../hooks/LocalStorage';
// import Fetch from '../services/Fetch';
// import classes from './Login.module.css';

// function Login() {
//     const navigate = useNavigate();
//     const [user, setUser] = useLocalStorage('user', {});
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const login = async () => {
//         const fetchLogin = new Fetch('/login');
//         const response = await fetchLogin.post({ email, password });
//         if (response.successful) {
//             const data = response.data;
//             setUser({
//                 email: data?.user.email,
//                 token: data?.token
//             });
//             navigate('/');
//         } else {
//             const error = response.error;
//             setErrorMessage(error?.message || '');
//         }
//     }

//     return (
//         <div className={classes.container}>
//             {/* <div className={classes.column}>
//                 <div className={classes.titles}>
//                     <h1 className={classes.title}>Commercial Enerprise</h1>
//                     <h3 className={classes.titleSecondary}>Вход в систему</h3>
//                 </div>
//                 <div className={classes.errorContainer}>
//                     {errorMessage !== ''
//                         ? <Notification type="error" showIcon>{errorMessage}</Notification>
//                         : ''
//                     }
//                 </div>
//                 <div className={classes.card}>
//                     <div className={classes.inputGroup}>
//                         <InputField
//                             type="email"
//                             label="Электронная почта"
//                             id="emailInput"
//                             placeholder="example@email.com"
//                             value={email}
//                             onValueChange={setEmail}
//                         />
//                         <InputField
//                             type="password"
//                             label="Пароль"
//                             id="passwordInput"
//                             value={password}
//                             onValueChange={setPassword}
//                         />
//                     </div>
//                     <Button onClick={() => login()}>Войти</Button>
//                 </div>
//             </div> */}
//         </div>
//     );
// }

// export default Login;