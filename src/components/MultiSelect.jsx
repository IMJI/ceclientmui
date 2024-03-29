import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            //width: 250,
        },
    },
};

function getStyles(item, selected, theme) {
    return {
        fontWeight:
        selected.indexOf(item) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip({id, name, items, selected, setSelected, alias='id'}) {
    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelected(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const getNameById = id => {
        // console.log(id)
        const item = items.find(i => i[alias] === id);
        return item ? item.name : 'Не найдено';
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: '100%' }}>
                <InputLabel id={`${id}-label`}>{name}</InputLabel>
                <Select
                    labelId={`${id}-label`}
                    id={id}
                    multiple
                    value={selected}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(sel) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {sel.map((value) => (
                            <Chip key={value} label={getNameById(value)} />
                        ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                {items.map((item) => (
                    <MenuItem
                        key={item[alias]}
                        value={item[alias]}
                        style={getStyles(item[alias], selected, theme)}
                    >
                        {item.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    );
}