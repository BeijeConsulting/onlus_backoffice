import { FC, MouseEvent } from "react";

//style
import common from "./../../../assets/styles/common.module.scss";

//mui
import { Box } from "@mui/material";

interface buttonIconProps {
  callback?: Function;
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
        backgroundColor: common.fifthColor,
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
