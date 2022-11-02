import { FC, useState } from "react";

//mui
import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from "@mui/material";

interface selectProps {
    label: string;
    disabled?: boolean;
    items: Array<Item>;
}

type Item = {
    name: string,
    value: string,
}

const CustomSelect: FC<selectProps> = (props) => {

    const [value, setValue] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setValue(event.target.value as string);
    };

    return (
        <FormControl fullWidth disabled={props.disabled}>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={props.label}
                onChange={handleChange}
            >
                {
                    props.items.map((item, key) =>
                        <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    );
}

export default CustomSelect;