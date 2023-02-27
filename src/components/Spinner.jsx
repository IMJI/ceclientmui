import React from 'react';
import classes from './Spinner.module.css';

export default function Spinner() {
    return (
        <div class={classes.container}>
            <span class={classes.spinner}></span>
        </div>
    );
}