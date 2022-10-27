import React, { FC, useState } from "react";

//Style
import css from "./header.module.scss";

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

/*
TO DO
- i18n
- logout
- img backend
- title backend
- user backend
 */

const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(() => ({
  "& .MuiPaper-root": {
    backgroundColor: css.primaryColor,
    color: css.fifthColor,
  },
}));

const Header: FC = (): JSX.Element => {
  const [langIta, setLangIta] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  //Funzioni per aprire e chiudere il menù
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToPersonalArea = (): void => {
    navigate(PAGES.personalArea);
  };

  const logout = (): void => {
    //esegue logout
  };

  //Funzioni per cambiare la lingua
  const changeLangIta = (): void => {
    setLangIta(true);
  };

  const changeLangEng = (): void => {
    setLangIta(false);
  };

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
            <span className={css.authSpan}>admin</span>
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
}

export default Header;
