import React, { useState } from 'react'

//Style
import common from "../../../assets/styles/common.module.scss"
import css from './header.module.scss'

//Componenti MUI
import { Box, AppBar, Toolbar, Typography, Button, Stack, Menu, MenuItem } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';

//Assets
import logo from '../../../assets/media/logo.png'

function Header() {

    const [langIta, setLangIta] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    //Funzioni per aprire e chiudere il menù
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToPersonalArea = (): void => {
        //naviga alla pagina personalArea
    }

    const logout = (): void => {
        //esegue logout
    }

    //Funzioni per cambiare la lingua
    const changeLangIta = (): void => {
        setLangIta(true)
    }

    const changeLangEng = (): void => {
        setLangIta(false)
    }

    return (
        <header>
            <Toolbar className={css.toolbar}>
                <img src={logo} className={css.logo} />

                <p className={css.title}>
                    Nome Onlus
                </p>

                <Box className={css.boxRight}>

                    <div className={css.buttonDiv} onClick={handleMenu}>
                        <span className={css.iconSpan}>
                            <PersonIcon fontSize='large' />
                            <p>Nome Utente</p>
                        </span>
                        <span className={css.authSpan}>
                            admin
                        </span>
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className={css.menu}
                    >
                        <MenuItem onClick={goToPersonalArea}>Area personale</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <p
                            onClick={changeLangIta}
                            className={`${langIta ? css.langBtnSelected : ''} ${css.langBtn}`}
                        >
                            IT
                        </p>
                        <p>●</p>
                        <p
                            onClick={changeLangEng}
                            className={`${langIta ? '' : css.langBtnSelected} ${css.langBtn}`}
                        >
                            EN
                        </p>
                    </Stack>
                </Box>
            </Toolbar>
        </header>
    )
}

export default Header