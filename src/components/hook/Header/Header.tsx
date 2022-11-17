import React, { FC, useState } from "react";
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

//Assets
import logo from "../../../assets/media/logo.png";
import { useNavigate } from "react-router-dom";

//Routes
import PAGES from "../../../router/pages";

//Utils
import useLogout from "../../../utils/logout";

//translation
import { useTranslation } from 'react-i18next';

/*
TO DO
- i18n
- logout
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

const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(() => ({
  "& .MuiPaper-root": {
    backgroundColor: common.primaryColor,
    color: common.fifthColor,
  },
}));

const Header: FC = (): JSX.Element => {
  const [langIta, setLangIta] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation();

  const [handleLogout, isReady] = useLogout(1000);
  const navigate = useNavigate();

  const user: User = useSelector((state: any) => state.userDuck.user);

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
    if(isReady){
      navigate(PAGES.login)
    }
  }

  return (
    <header>
      <Toolbar className={css.toolbar}>
        <img src={logo} alt={""} className={css.logo} />

        <p className={css.title}>Nome Onlus</p>

        <Box className={css.boxRight}>
          <div className={css.buttonDiv} onClick={handleMenu}>
            <span className={css.iconSpan}>
              <PersonIcon fontSize="large" />
              <p>Nome Utente</p>
            </span>
            <span className={css.authSpan}>{!!user?.permission && user?.permission[0]}</span>
          </div>

          <StyledMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={goToPersonalArea}>Area personale</MenuItem>
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