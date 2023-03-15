import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography, Grid, Input, Stack } from '@mui/material';

function valuetext(value) {
    return `${value}`;
}

export default function RangeSlider({ name, min, max, step, values, setValues }) {
    // const [value, setValue] = React.useState([min, max]);
    const [from, setFrom] = React.useState(min);
    const [to, setTo] = React.useState(max);

    const handleChange = (event, newValue) => {
        setFrom(newValue[0]);
        setTo(newValue[1]);
        setValues(newValue);
    };

    const handleFromInputChange = (event) => {
        setFrom(event.target.value === '' ? '' : Number(event.target.value));
        setValues([from, to]);
    }

    const handleToInputChange = (event) => {
        setTo(event.target.value === '' ? '' : Number(event.target.value));
        setValues([from, to]);
    }

    const handleBlur = () => {
        if (from < min) {
          setFrom(min);
        } else if (from > max) {
          setFrom(max);
        }
        if (to < min) {
            setTo(min);
          } else if (to > max) {
            setTo(max);
          }
    };

    return (
        <Box>
            <Typography id="input-slider" gutterBottom>
                {name}
            </Typography>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Input
                        value={from}
                        size="small"
                        onChange={handleFromInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: step,
                            min: min,
                            max: max,
                            type: 'number',
                            'aria-labelledby': 'input-slider'
                        }}
                        xs={{ width: '2%'}}
                    />
                    <Slider
                        getAriaLabel={() => { return name }}
                        value={values}
                        min={min}
                        max={max}
                        step={step}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                    <Input
                        value={to}
                        size="small"
                        onChange={handleToInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: step,
                            min: min,
                            max: max,
                            type: 'number',
                            'aria-labelledby': 'input-slider'
                        }}
                        xs={{ width: '2%'}}
                    />
            </Stack>
        </Box>
    );
}