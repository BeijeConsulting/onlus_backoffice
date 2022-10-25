import { useState } from 'react';

//Componenti MUI
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ArrowDropDown';
import ExpandMore from '@mui/icons-material/ArrowDropUp';

//Style
import css from './navBar.module.scss';

interface State {
    editor: boolean;
    articles: boolean;
    users: boolean;
}

const initialState: State = {
    editor: false,
    articles: false,
    users: false,
}

//NAVBAR
export default function NavBar() {

    const [state, setState] = useState<State>(initialState);

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
    const handleNavigate = () => (params: any): void => {
        console.log(params)
    }

    return (
        <>
            <List
                className={css.container}
                component="nav"
            >
                <ListItemButton className={css.father} onClick={openEditor}>
                    <ListItemText primary="EDITOR SITO" />
                    {state.editor ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>

                <Collapse in={state.editor} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton className={css.child}>
                            <ListItemText primary="Generale" />
                        </ListItemButton>

                        <ListItemButton className={css.child}>
                            <ListItemText primary="Home" />
                        </ListItemButton>

                        <ListItemButton className={css.child}>
                            <ListItemText primary="About" />
                        </ListItemButton>

                        <ListItemButton className={css.child}>
                            <ListItemText primary="Supportaci" />
                        </ListItemButton>

                        <ListItemButton className={css.child}>
                            <ListItemText primary="FAQ" />
                        </ListItemButton>

                    </List>
                </Collapse>

                <ListItemButton className={css.father}>
                    <ListItemText primary="EVENTI" />
                </ListItemButton>

                <ListItemButton className={css.father} onClick={openArticles}>
                    <ListItemText primary="ARTICOLI" />
                    {state.articles ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>

                <Collapse in={state.articles} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton className={css.child}>
                            <ListItemText primary="Gestisci articoli" />
                        </ListItemButton>

                        <ListItemButton className={css.child}>
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
                        <ListItemButton className={css.child}>
                            <ListItemText primary="Collaboratori" />
                        </ListItemButton>

                        <ListItemButton className={css.child}>
                            <ListItemText primary="Volontari" />
                        </ListItemButton>

                    </List>
                </Collapse>

                <ListItemButton className={css.father}>
                    <ListItemText primary="DONAZIONI" />
                </ListItemButton>

            </List>
        </>
    )
}