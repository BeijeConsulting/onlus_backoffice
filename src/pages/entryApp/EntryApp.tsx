import React from 'react'

//Componenti
import Header from '../../components/hook/Header/Header'
import NavBar from '../../components/hook/NavBar/NavBar'

//Componenti MUI
import Box from '@mui/material/Box'

//Style
import style from "../../assets/styles/common.module.scss";

function EntryApp() {
  return (
    <Box className={style.container}>
        <Header />

        <Box className={style.content}>
            <NavBar />

        </Box>

        <footer></footer>
    </Box>
  )
}

export default EntryApp