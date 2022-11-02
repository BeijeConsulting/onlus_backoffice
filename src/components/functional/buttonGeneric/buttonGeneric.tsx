import { BaseSyntheticEvent, FC, MouseEvent } from "react";

//style
import style from '../../../assets/styles/common.module.scss';

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
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        "&:hover": {
          backgroundColor: props.color
        }
      }}
    >
      {props.children}
    </Button>
  );
};
export default ButtonGeneric;
