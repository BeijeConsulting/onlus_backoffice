import React, { FC } from 'react'

//Data
import { users } from "../../../utils/mockup/data";

//Style
import common from "../../../assets/styles/common.module.scss";

//MUI
import Box from "@mui/material/Box";

//Components
import Title from '../../../components/functional/title/Title';
import LabelText from '../../../components/functional/labelText/LabelText';

const EditVolunteers: FC = (): JSX.Element => {
  return (
    <Box className={common.component}>
      <Box className={common.singleComponent}>
        <LabelText>
          <Title
            text={"Dati dell'utente"}
            textInfo={"Clicca sul pulsante Salva modifiche per completare l'operazione di aggiornamento o clicca sul pulsante Elimina utente per cancellare i dati dell'utente dal sistema"} />
        </LabelText>
      </Box>
    </Box>
  )
}

export default EditVolunteers