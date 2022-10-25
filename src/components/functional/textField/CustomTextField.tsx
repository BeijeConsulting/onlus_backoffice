import React, { FC, useState } from "react";

//style
import style from "./textFieldStyle.module.scss";

//mui
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

//props
interface textFieldProps {
    error: boolean;
}

const CustomTextField: FC<textFieldProps> = (props) => {

    return (
        <TextField
            className={style.textField}
            size="small"
            error={props.error}
            helperText={props.error ? "Inserire valore" : ""}
        />
    );
};

export default CustomTextField;
