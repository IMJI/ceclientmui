import React from 'react';
import { Alert } from '@mui/material'
import useAlert from '../hooks/useAlert';

export default function AlertPopup() {
    const { type, text } = useAlert();

    if (text && type) {
        return (
            <Alert
                severity={type}
                sx={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '20px',
                    zIndex: 10,
                }}
            >
                {text}
            </Alert>
        );
    }
    return '';
}