import { FC, MouseEvent } from "react";

//style
import common from "./../../../assets/styles/common.module.scss";
import buttonIconsStyle from './buttonIconsStyle.module.scss';

//mui
import { Box } from "@mui/material";

interface buttonIconProps {
  callback?: Function;
  children: any;
  disable?: boolean;
}

const ButtonIcon: FC<buttonIconProps> = (props): JSX.Element => {
  const handleClick = (e: MouseEvent): void => {
    props.callback(e);
  };

  const log = (): void => {

  }

  return (
    <Box
      onClick={props.disable ? log : handleClick}
      sx={!props.disable ?
        {
          backgroundColor: common.fifthColor,
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          '&:hover': {
            backgroundColor: common.ternaryColor,
            cursor: 'pointer',
          },
        }
        :
        {
          backgroundColor: common.fifthColor,
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
    }
    >
      {props.children}
    </Box>
  );
};
export default ButtonIcon;
