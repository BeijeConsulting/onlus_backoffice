import { FC, MouseEvent } from "react";

//style
import style from "./buttonGenericStyle.module.scss";

//mui
import { Button, Box, Typography } from "@mui/material";

interface buttonGenericProps {
  callback: Function;
  color: string;
  children: any;
}

const ButtonGeneric: FC<buttonGenericProps> = (props) => {
  const handleClick = (e: MouseEvent): void => {
    props.callback(e);
  };
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        backgroundColor: props.color,
        textTransform: "initial",
        width: 150,
      }}
    >
      {props.children}
    </Button>
  );
};
export default ButtonGeneric;
