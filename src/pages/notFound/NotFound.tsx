//navigation
import { useNavigate } from "react-router-dom";

//Componenti MUI
import { Box, Button } from "@mui/material";

//style
import style from "./notFoundStyle.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = (): void => {
    navigate(-1);
  };

  return (
    <Box className={style.container}>
      <Box className={style.textContainer}>
        <span className={style.oops}>Oops!</span>
      </Box>
      <Box className={style.btnContainer}>
        <Button variant="contained" className={style.button} onClick={goBack}>
          TORNA INDIETRO
        </Button>
      </Box>
    </Box>
  );
};
export default NotFound;
