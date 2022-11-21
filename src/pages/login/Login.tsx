import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PAGES from "../../router/pages";

//Componenti MUI
import { Box, Button } from "@mui/material";

//Component function
import LabelText from "../../components/functional/labelText/LabelText";
import CustomTextField from "../../components/functional/textField/CustomTextField";

//Style
import style from "./login.module.scss";

//img stock
import { Link } from "react-router-dom";
import { BaseSyntheticEvent } from "react";

//api
import { signinApi } from "../../services/api/login/loginApi";
import { fetchData } from "../../utils/fetchData";
import { getApiNoAuthGeneral } from "../../services/api/general/generalApi";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/ducks/loginDuck";

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
  logo: string;
}

type User = {
  email: string;
  password: string;
};

//initState
const initState: State = {
  emailError: false,
  passwordError: false,
  logo: "",
};

const Login: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);

  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const user: any = useSelector((state: any) => state.userDuck.user);

  useEffect(() => {
    if (user.logedIn === true) {
      navigate(PAGES.personalArea);
    }
  }, [user]);

  useEffect(() => {
    getLoginData();
  }, []);

  const getLoginData = async (): Promise<void> => {
    let resp = await fetchData(getApiNoAuthGeneral);
    setState({
      ...state,
      logo: resp?.data?.logoContent,
    });
  };

  async function onLogin(e: BaseSyntheticEvent): Promise<void> {
    let eError = false;
    let pError = false;
    let formIsValid = true;
    if (
      e.target.form[0].value === "" ||
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(e.target.form[0].value) ===
        false
    ) {
      eError = true;
      formIsValid = false;
    }
    if (e.target.form[2].value === "") {
      pError = true;
      formIsValid = false;
    }

    if (formIsValid) {
      let user: User = {
        email: e.target.form[0].value,
        password: e.target.form[2].value,
      };

      //get
      let tempUser: any = await signinApi(user);
      if (tempUser?.status === 401) {
        pError = true;
        eError = true;
      } else {
        console.log("token", tempUser?.data?.token);
        console.log("refreshToken", tempUser?.data?.refreshToken);

        //localStorage for Token
        localStorage.setItem("onlusToken", tempUser?.data?.token);
        localStorage.setItem("onlusRefreshToken", tempUser?.data?.refreshToken);

        //set sessionStorage
        sessionStorage.setItem("user", JSON.stringify(tempUser?.data));
        sessionStorage.setItem("userLogedIn", JSON.stringify(true));
        dispatch(setLogin({ loginToken: true }));

        //navigation
        navigate(PAGES.personalArea);
      }
    }

    setState({
      ...state,
      emailError: eError,
      passwordError: pError,
    });
  }

  return (
    <Box className={style.container}>
      <Box className={style.boxLogin}>
        <form className={style.form}>
          <LabelText>
            <img className={style.img} src={state.logo} alt="logo sito" />
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
