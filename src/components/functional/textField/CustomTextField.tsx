import React, { FC, useState } from "react";

//style
import style from "./textFieldStyle.module.scss";

//mui
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

//props
interface textFieldProps {
  error: boolean;
  placeholder?: string;
  minrow?: number;
  maxrow?: number;
  multiline?: boolean;
}

const CustomTextField: FC<textFieldProps> = (props) => {
  return (
    <TextField
      minRows={props.multiline ? props.minrow : 1}
      maxRows={props.multiline ? props.maxrow : 1}
      multiline={props.multiline ? props.multiline : false}
      className={style.textField}
      size="small"
      error={props.error}
      helperText={props.error ? "Inserire valore" : ""}
      placeholder={props.placeholder}
    />
  );
};

export default CustomTextField;
