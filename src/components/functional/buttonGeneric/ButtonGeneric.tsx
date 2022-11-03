import { BaseSyntheticEvent, FC, MouseEvent } from "react";

//Style
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
        display: "flex",
        flexDirection: "row",
        justifyContent:"center",
        alignItems: "center",
        width: 170,
        height: 40,
        '&:hover': {
          cursor: 'pointer',
          opacity: 0.7,
          backgroundColor: props.color
        },
      }}
    >
      {props.children}
    </Button>
  );
};
export default ButtonGeneric;