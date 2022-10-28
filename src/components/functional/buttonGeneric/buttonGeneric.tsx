import { BaseSyntheticEvent, FC, MouseEvent } from "react";

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
        alignItems:'center'
      }}
    >
      {props.children}
    </Button>
  );
};
export default ButtonGeneric;
