import { FC, useState } from "react";

//Style
import style from "./customSelect.module.scss";

//mui
import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, FormHelperText } from "@mui/material";

interface selectProps {
    label: string;
    defaultValue?: string;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    items: Array<Item>;
}

type Item = {
    name: string,
    value: string,
}

const CustomSelect: FC<selectProps> = (props) => {

    const [value, setValue] = useState(!!props.defaultValue ? props.defaultValue : '');

    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setValue(event.target.value as string);
    };

    return (
        <FormControl fullWidth disabled={props.disabled} error={props.error}>
            <InputLabel id="demo-simple-select-label" className={style.label}>{props.label}</InputLabel>
            <Select
                className={style.select}
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
            <FormHelperText>
                {
                    props.error &&
                    props.errorMessage
                }
            </FormHelperText>
        </FormControl>
    );
}

export default CustomSelect;