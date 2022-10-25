import { useState } from 'react';

//Componenti MUI
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ArrowDropDown';
import ExpandMore from '@mui/icons-material/ArrowDropUp';

//Style
import { container, divider, father, child } from './navBarStyle';

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

    const openEditor = (): void => {
        setState({ editor: !state.editor, articles: false, users: false });
    };

    const openArticles = (): void => {
        setState({ articles: !state.articles, editor: false, users: false });
    };

    const openUsers = (): void => {
        setState({ users: !state.users, articles: false, editor: false });
    };

    return (
        <>
            <AppBar sx={{height: '120px'}}></AppBar>
            <List
                sx={container}
                component="nav"
            >
                <ListItemButton
                    sx={[father, divider]}
                    onClick={openEditor}>
                    <ListItemText primary="EDITOR SITO" />
                    {state.editor ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>

                <Collapse in={state.editor} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={[child, divider]}>
                            <ListItemText primary="Generale" />
                        </ListItemButton>

                        <ListItemButton sx={[child, divider]}>
                            <ListItemText primary="Home" />
                        </ListItemButton>

                        <ListItemButton sx={[child, divider]}>
                            <ListItemText primary="About" />
                        </ListItemButton>

                        <ListItemButton sx={[child, divider]}>
                            <ListItemText primary="Supportaci" />
                        </ListItemButton>

                        <ListItemButton sx={[child, divider]}>
                            <ListItemText primary="FAQ" />
                        </ListItemButton>

                    </List>
                </Collapse>

                <ListItemButton sx={[father, divider]}>
                    <ListItemText primary="EVENTI" />
                </ListItemButton>

                <ListItemButton sx={[father, divider]} onClick={openArticles}>
                    <ListItemText primary="ARTICOLI" />
                    {state.articles ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>

                <Collapse in={state.articles} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={[child, divider]}>
                            <ListItemText primary="Gestisci articoli" />
                        </ListItemButton>

                        <ListItemButton sx={[child, divider]}>
                            <ListItemText primary="Gestisci categorie" />
                        </ListItemButton>

                    </List>
                </Collapse>

                <ListItemButton sx={[father, divider]} onClick={openUsers}>
                    <ListItemText primary="UTENTI" />
                    {state.users ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>

                <Collapse in={state.users} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={[child, divider]}>
                            <ListItemText primary="Collaboratori" />
                        </ListItemButton>

                        <ListItemButton sx={[child, divider]}>
                            <ListItemText primary="Volontari" />
                        </ListItemButton>

                    </List>
                </Collapse>

                <ListItemButton sx={[father, divider]}>
                    <ListItemText primary="DONAZIONI" />
                </ListItemButton>

            </List>
            <footer style={{height: '70px', border: 'solid black'}}></footer>
        </>
    )
}