import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import PAGES from "../../router/pages";

//Componenti MUI
import { Box, Button } from "@mui/material";

//Component function
import LabelText from "../../components/functional/labelText/LabelText";
import CustomTextField from "../../components/functional/textField/CustomTextField";

//Style
import style from "./login.module.scss";

//img stock
import logo from "../../assets/media/logo.png";
import { Link } from "react-router-dom";
import { BaseSyntheticEvent } from "react";
//api
import { signinApi } from "../../services/api/login/loginApi";

/*
TO DO
- i18n
- link password dimenticata
- img da backend
- controllo utenti da backend
*/

//interfaces
interface State {
  emailError: boolean;
  passwordError: boolean;
}

type User = {
  email: string;
  password: string;
};

//initState
const initState: State = {
  emailError: false,
  passwordError: false,
};
const Login: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  async function onLogin(e: BaseSyntheticEvent): Promise<void> {
    let eError = false;
    let pError = false;
    if (
      e.target.form[0].value === "" ||
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(e.target.form[0].value) ===
        false
    ) {
      eError = true;
    }
    if (e.target.form[2].value === "") {
      pError = true;
    }
    setState({
      ...state,
      emailError: eError,
      passwordError: pError,
    });
    let user: User = {
      email: e.target.form[0].value,
      password: e.target.form[2].value,
    };

    //get
    let tempUser: any = await signinApi(user);
    console.log("token", tempUser?.data?.token);
    console.log("refreshToken", tempUser?.data?.refreshToken);

    //localStorage for Token
    localStorage.setItem("onlusToken", tempUser?.data?.token);
    localStorage.setItem("onlusRefreshToken", tempUser?.data?.refreshToken);

    //setcookie
    setCookie("user", tempUser);

    //navigation
    navigate(PAGES.personalArea);
  }

  return (
    <Box className={style.container}>
      <Box className={style.boxLogin}>
        <form className={style.form}>
          <LabelText>
            <img className={style.img} src={logo} alt="" />
            <CustomTextField
              errorMessage="email non valida"
              type="email"
              error={state.emailError}
              placeholder="E-mail"
            ></CustomTextField>
            <CustomTextField
              errorMessage="password errata"
              type="password"
              error={state.passwordError}
              placeholder="Password"
            ></CustomTextField>
            <Link className={style.link} to={"/login"}>
              Password Dimenticata?
            </Link>
            <Button
              variant="contained"
              className={style.button}
              onClick={onLogin}
            >
              ACCEDI
            </Button>
          </LabelText>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
