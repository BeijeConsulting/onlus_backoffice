import { useState } from "react";

//Componenti MUI
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ArrowDropDown";
import ExpandMore from "@mui/icons-material/ArrowDropUp";
import { Outlet, useNavigate } from "react-router-dom";
import PAGES from "../../../router/pages";

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
export default function NavBar() {
    const [state, setState] = useState<State>(initialState);

    const navigate = useNavigate();

    //Funzioni per aprire e chiudere i collapse
    const openEditor = (): void => {
        setState({ editor: !state.editor, articles: false, users: false });
    };

    const openArticles = (): void => {
        setState({ articles: !state.articles, editor: false, users: false });
    };

    const openUsers = (): void => {
        setState({ users: !state.users, articles: false, editor: false });
    };

    //Navigazione
    const handleNavigate = (params: string) => (): void => {
        navigate(params)
    };

    return (
        <>
            <List className={common.nav} component="nav">
                <ListItemButton className={css.father} onClick={openEditor}>
                    <ListItemText primary="EDITOR SITO" />
                    {state.editor ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>

                <Collapse in={state.editor} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            className={css.child}
                            onClick={handleNavigate(PAGES.editGeneral)}
                        >
                            <ListItemText primary="Generale" />
                        </ListItemButton>

                        <ListItemButton
                            className={css.child}
                            onClick={handleNavigate(PAGES.editHome)}
                        >
                            <ListItemText primary="Home" />
                        </ListItemButton>

                        <ListItemButton
                            className={css.child}
                            onClick={handleNavigate(PAGES.editAbout)}
                        >
                            <ListItemText primary="About" />
                        </ListItemButton>

                        <ListItemButton
                            className={css.child}
                            onClick={handleNavigate(PAGES.editSupportUs)}
                        >
                            <ListItemText primary="Supportaci" />
                        </ListItemButton>

                        <ListItemButton
                            className={css.child}
                            onClick={handleNavigate(PAGES.editFaq)}
                        >
                            <ListItemText primary="FAQ" />
                        </ListItemButton>

                        <ListItemButton
                            className={css.child}
                            onClick={handleNavigate(PAGES.editSocial)}
                        >
                            <ListItemText primary="Social" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton
                    className={css.father}
                    onClick={handleNavigate(PAGES.events)}
                >
                    <ListItemText primary="EVENTI" />
                </ListItemButton>

                <ListItemButton className={css.father} onClick={openArticles}>
                    <ListItemText primary="ARTICOLI" />
                    {state.articles ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>

                <Collapse in={state.articles} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            className={css.child}
                            onClick={handleNavigate(PAGES.articlesBlog)}
                        >
                            <ListItemText primary="Gestisci articoli" />
                        </ListItemButton>

                        <ListItemButton
                            className={css.child}
                            onClick={handleNavigate(PAGES.articlesCategories)}
                        >
                            <ListItemText primary="Gestisci categorie" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton className={css.father} onClick={openUsers}>
                    <ListItemText primary="UTENTI" />
                    {state.users ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>

                <Collapse in={state.users} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            className={css.child}
                            onClick={handleNavigate(PAGES.usersCollaborators)}
                        >
                            <ListItemText primary="Collaboratori" />
                        </ListItemButton>

                        <ListItemButton
                            className={css.child}
                            onClick={handleNavigate(PAGES.usersVolunteers)}
                        >
                            <ListItemText primary="Volontari" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton
                    className={css.father}
                    onClick={handleNavigate(PAGES.donations)}
                >
                    <ListItemText primary="DONAZIONI" />
                </ListItemButton>
            </List>
            <Outlet />
        </>
    );
}
