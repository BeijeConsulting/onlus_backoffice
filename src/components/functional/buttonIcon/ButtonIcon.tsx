import { FC, MouseEvent } from "react";

//style
import style from "./buttonGenericStyle.module.scss";

//mui
import { Button, Box, Typography } from "@mui/material";

interface buttonIconProps {
  callback: Function;
  children: any;
}

const ButtonIcon: FC<buttonIconProps> = (props) => {
  const handleClick = (e: MouseEvent): void => {
    props.callback(e);
  };
  return (
    <Box
      onClick={handleClick}
      sx={{
        backgroundColor: "#e9e3e6",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.children}
    </Box>
  );
};
export default ButtonIcon;
