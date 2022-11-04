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
  defaultValue?: string;
  refCustom?: any;
}

const CustomTextField: FC<textFieldProps> = (props) => {

  return (
    <TextField
      inputRef={props.refCustom ? props.refCustom: null}
      type={props.type ? props.type : "default"}
      minRows={props.multiline ? props.minrow : 1}
      maxRows={props.multiline ? props.maxrow : 1}
      multiline={props.multiline ? props.multiline : false}
      className={style.textField}
      size="small"
      defaultValue={!!props.defaultValue ? props.defaultValue : ""}
      error={props.error}
      helperText={
        props.error
          ? props.errorMessage
            ? props.errorMessage
            : "inserimento non valido"
          : ""
      }
      placeholder={props.placeholder}
      sx={{
        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
          backgroundColor: "white"
        }
      }}
    />
  );
};

export default CustomTextField;
