import { FC } from "react";

//style
import style from "./textFieldStyle.module.scss";

//mui
import TextField from "@mui/material/TextField";

//props
interface textFieldProps {
  type?: string;
  error: boolean;
  placeholder?: string;
  minrow?: number;
  maxrow?: number;
  multiline?: boolean;
  errorMessage?: string;
}

const CustomTextField: FC<textFieldProps> = (props) => {
  return (
    <TextField
      type={props.type ? props.type : "default"}
      minRows={props.multiline ? props.minrow : 1}
      maxRows={props.multiline ? props.maxrow : 1}
      multiline={props.multiline ? props.multiline : false}
      className={style.textField}
      size="small"
      error={props.error}
      helperText={
        props.error
          ? props.errorMessage
            ? props.errorMessage
            : "inserimento non valido"
          : ""
      }
      placeholder={props.placeholder}
    />
  );
};

export default CustomTextField;
