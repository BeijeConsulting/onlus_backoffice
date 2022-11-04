import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import PAGES from "../../../router/pages";
import roles from "../../../utils/roles";

//Componenti MUI
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ArrowDropDown";
import ExpandMore from "@mui/icons-material/ArrowDropUp";

//Style
import common from "../../../assets/styles/common.module.scss";
import css from "./navBar.module.scss";

interface State {
  editor: boolean;
  articles: boolean;
  users: boolean;
}

const initialState: State = {
  editor: false,
  articles: false,
  users: false,
};

//NAVBAR
const NavBar: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initialState);

  //redux and auth
  const user: any = useSelector((state: any) => state.userDuck.user);

  const navigate = useNavigate();
  const location = useLocation();

  //Funzioni per aprire e chiudere i collapse
  const openEditor = (): void => {
    setState({
      ...state,
      editor: !state.editor,
      articles: false,
      users: false,
    });
  };

  const openArticles = (): void => {
    setState({
      ...state,
      articles: !state.articles,
      editor: false,
      users: false,
    });
  };

  const openUsers = (): void => {
    setState({ ...state, users: !state.users, articles: false, editor: false });
  };

  function checkSelectedPage(page: string): object {
    let font: string = "";
    let text: string = "";
    if (location.pathname === page) {
      font = "900 !important";
      text = "underline !important";
    }
    return {
      fontWeight: font,
      textDecoration: text,
    };
  }

  //Navigazione
  const handleNavigate = (params: string) => (): void => {
    navigate(params);
  };

  return (
    <List className={css.nav} component="nav">
      {user?.role?.includes(roles.admin) && (
        <>
          <ListItemButton className={css.father} onClick={openEditor}>
            <p className={css.text}>EDITOR SITO</p>
            {state.editor ? <ExpandMore /> : <ExpandLess />}
          </ListItemButton>

          <Collapse in={state.editor} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                className={css.child}
                onClick={handleNavigate(PAGES.editGeneral)}
              >
                <ListItemText
                  primary="Generale"
                  disableTypography={true}
                  sx={checkSelectedPage(PAGES.editGeneral)}
                />
              </ListItemButton>

              <ListItemButton
                className={css.child}
                onClick={handleNavigate(PAGES.editHome)}
              >
                <ListItemText
                  primary="Home"
                  disableTypography={true}
                  sx={checkSelectedPage(PAGES.editHome)}
                />
              </ListItemButton>

              <ListItemButton
                className={css.child}
                onClick={handleNavigate(PAGES.editAbout)}
              >
                <ListItemText
                  primary="About"
                  disableTypography={true}
                  sx={checkSelectedPage(PAGES.editAbout)}
                />
              </ListItemButton>

              <ListItemButton
                className={css.child}
                onClick={handleNavigate(PAGES.editSupportUs)}
              >
                <ListItemText
                  primary="Supportaci"
                  disableTypography={true}
                  sx={checkSelectedPage(PAGES.editSupportUs)}
                />
              </ListItemButton>

              <ListItemButton
                className={css.child}
                onClick={handleNavigate(PAGES.editFaq)}
              >
                <ListItemText
                  primary="FAQ"
                  disableTypography={true}
                  sx={checkSelectedPage(PAGES.editFaq)}
                />
              </ListItemButton>

              <ListItemButton
                className={css.child}
                onClick={handleNavigate(PAGES.editSocial)}
              >
                <ListItemText
                  primary="Social"
                  disableTypography={true}
                  sx={checkSelectedPage(PAGES.editSocial)}
                />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton
            className={css.father}
            onClick={handleNavigate(PAGES.events)}
          >
            <p>EVENTI</p>
          </ListItemButton>
        </>
      )}

      <ListItemButton className={css.father} onClick={openArticles}>
        <p>ARTICOLI</p>
        {state.articles ? <ExpandMore /> : <ExpandLess />}
      </ListItemButton>

      <Collapse in={state.articles} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            className={css.child}
            onClick={handleNavigate(PAGES.articlesBlog)}
          >
            <ListItemText
              primary="Gestisci articoli"
              disableTypography={true}
              sx={checkSelectedPage(PAGES.articlesBlog)}
            />
          </ListItemButton>

          <ListItemButton
            className={css.child}
            onClick={handleNavigate(PAGES.articlesCategories)}
          >
            <ListItemText
              primary="Gestisci categorie"
              disableTypography={true}
              sx={checkSelectedPage(PAGES.articlesCategories)}
            />
          </ListItemButton>
        </List>
      </Collapse>

      {user?.role?.includes(roles.admin) && (
        <>
          <ListItemButton className={css.father} onClick={openUsers}>
            <p>UTENTI</p>
            {state.users ? <ExpandMore /> : <ExpandLess />}
          </ListItemButton>

          <Collapse in={state.users} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                className={css.child}
                onClick={handleNavigate(PAGES.usersCollaborators)}
              >
                <ListItemText
                  primary="Collaboratori"
                  disableTypography={true}
                  sx={checkSelectedPage(PAGES.usersCollaborators)}
                />
              </ListItemButton>

              <ListItemButton
                className={css.child}
                onClick={handleNavigate(PAGES.usersVolunteers)}
              >
                <ListItemText
                  primary="Volontari"
                  disableTypography={true}
                  sx={checkSelectedPage(PAGES.usersVolunteers)}
                />
              </ListItemButton>
            </List>
          </Collapse>
        </>
      )}
      <ListItemButton
        className={css.father}
        onClick={handleNavigate(PAGES.donations)}
      >
        <p>DONAZIONI</p>
      </ListItemButton>
    </List>
  );
};

export default NavBar;
