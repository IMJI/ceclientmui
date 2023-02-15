import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './Routes';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {
                        AppRoutes.map((route, index) => {
                            let { element, ...rest } = route;
                            return <Route
                                key={index}
                                {...rest}
                                element={element}
                            />
                        })
                    }
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
