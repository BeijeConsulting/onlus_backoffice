import { FC } from "react";

//style
import style from "./labelTextStyle.module.scss";

//mui
import Box from "@mui/material/Box";

//props
interface labelTextProps {
  children?: any;
}

const LabelText: FC<labelTextProps> = (props):JSX.Element => {
  return (
    <>
      <Box className={style.containerLabelText}>{props.children}</Box>
    </>
  );
};

export default LabelText;
