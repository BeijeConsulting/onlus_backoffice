import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";

//Style
import css from "./header.module.scss";
import common from "./../../../assets/styles/common.module.scss";

//Componenti MUI
import {
  Box,
  Toolbar,
  Stack,
  Menu,
  MenuItem,
  MenuProps,
  styled,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

//API
import { fetchData } from "../../../utils/fetchData";
import { getApiGeneral } from "../../../services/api/general/generalApi";

//Routes
import PAGES from "../../../router/pages";
import { useNavigate } from "react-router-dom";

//Utils
import useLogout from "../../../customHooks/useLogout";
import checkRole from "../../../utils/checkRoles";

//translation
import { useTranslation } from 'react-i18next';

/*
TO DO
- i18n
- img backend
- title backend
- user backend
 */

type User = {
  email: string;
  id: number;
  token: string;
  refreshToken: string;
  permission: Array<string>;
}

interface State {
  logo: string;
  siteName: string;
}

const initialState: State = {
  logo: '',
  siteName: '',
}

const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(() => ({
  "& .MuiPaper-root": {
    backgroundColor: common.primaryColor,
    color: common.fifthColor,
  },
}));

const Header: FC = (): JSX.Element => {
  const [state, setState] = useState(initialState)

  const [langIta, setLangIta] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation();

  const [handleLogout, isReady] = useLogout(1000);
  const navigate = useNavigate();

  const user: User = useSelector((state: any) => state.userDuck.user);

  useEffect(() => {
    getHeaderData()
  }, [])

  //fetchAPI
  const getHeaderData = async (): Promise<void> => {
    let res = await fetchData(getApiGeneral);
    console.log(res.data)
    setState({
      ...state,
      logo: res?.data?.logoContent,
      siteName: res?.data?.websiteName
    })
  }

  //Funzioni per aprire e chiudere il menù
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToPersonalArea = (): void => {
    navigate(PAGES.personalArea);
    handleClose();
  };

  //Funzioni per cambiare la lingua
  const changeLangIta = (): void => {
    setLangIta(true);
    i18n.changeLanguage('it');
  };

  const changeLangEng = (): void => {
    setLangIta(false);
    i18n.changeLanguage('en');
  };

  //Funzione di logout
  const logout = (): void => {
    handleLogout()
    if (isReady) {
      navigate(PAGES.login)
    }
  }

  return (
    <header>
      <Toolbar className={css.toolbar}>
        <img src={state.logo} alt={""} className={css.logo} />

        <p className={css.title}>{state.siteName}</p>

        <Box className={css.boxRight}>
          <div className={css.buttonDiv} onClick={handleMenu}>
            <span className={css.iconSpan}>
              <PersonIcon fontSize="large" />
              <p>{user?.email}</p>
            </span>
            <span className={css.authSpan}>
              {
                !!user?.permission && checkRole(user?.permission) === "3" ?
                  "SUPERADMIN"
                : checkRole(user?.permission) === "2" ?
                    "ADMIN"
                  :
                    "BLOGGER"
              }
            </span>
          </div>

          <StyledMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={goToPersonalArea}>{t("headerMenu")}</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </StyledMenu>

          <Stack direction="row" spacing={1} alignItems="center">
            <p
              onClick={changeLangIta}
              className={`${langIta ? css.langBtnSelected : ""} ${css.langBtn}`}
            >
              IT
            </p>
            <p>●</p>
            <p
              onClick={changeLangEng}
              className={`${langIta ? "" : css.langBtnSelected} ${css.langBtn}`}
            >
              EN
            </p>
          </Stack>
        </Box>
      </Toolbar>
    </header>
  );
};

export default Header;