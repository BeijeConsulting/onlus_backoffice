import React from 'react'

//Componenti
import Header from '../../components/hook/Header/Header'
import NavBar from '../../components/hook/NavBar/NavBar'

//Componenti MUI
import Box from '@mui/material/Box'

//Style
import common from "../../assets/styles/common.module.scss";
import style from "./entryApp.module.scss";


function EntryApp() {
  return (
    <Box className={common.container}>
        <Header />

        <Box className={common.content}>
            <NavBar />

        </Box>

        <footer className={style.footer}></footer>
    </Box>
  )
}

export default EntryApp