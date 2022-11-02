import { BaseSyntheticEvent, FC, MouseEvent } from "react";
import common from "../../../assets/styles/common.module.scss"
//mui
import { Button } from "@mui/material";

interface buttonGenericProps {
  callback: Function;
  color: string;
  children: any;
}

const ButtonGeneric: FC<buttonGenericProps> = (props) => {
  const handleClick = (e: BaseSyntheticEvent): void => {
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
        '&:hover': {
          backgroundColor: props.color,
          cursor: 'pointer',
        },
      }}
    >
      {props.children}
    </Button>
  );
};
export default ButtonGeneric;
