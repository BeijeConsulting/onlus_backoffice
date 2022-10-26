//mui
import { Box, Button } from "@mui/material";

//component function
import LabelText from "../../components/functional/labelText/LabelText";
import CustomTextField from "../../components/functional/textField/CustomTextField";

//style
import style from "./login.module.scss";
import commonStyle from "../../assets/styles/common.module.scss";
//img stock
import logo from "../../assets/media/logo.png";
import { Link } from "react-router-dom";
import { BaseSyntheticEvent } from "react";

/*
TO DO
- i18n
- link password dimenticata
- img da backend

*/

type User = {
  id: string;
  password: string;
};

const Login = (): JSX.Element => {
  function onLogin(e: BaseSyntheticEvent): void {
    let user: User = {
      id: e.target.form[0].value,
      password: e.target.form[2].value,
    };
    console.log(user);
    console.log(e);
  }
  return (
    <div className={style.container}>
      <Box className={style.boxLogin}>
        <form className={style.form}>
          <LabelText>
            <img className={style.img} src={logo} alt="" />
            <CustomTextField error={false}></CustomTextField>
            <CustomTextField error={false}></CustomTextField>
            <Link className={style.link} to={"/login"}>
              Password Dimenticata?
            </Link>
            <Button
              variant="contained"
              className={style.button}
              onClick={onLogin}
            >
              Login
            </Button>
          </LabelText>
        </form>
      </Box>
    </div>
  );
};

export default Login;
