import React, { FC } from 'react'

//Navigazione
import { useLocation, useNavigate } from "react-router-dom";
import PAGES from "../../../router/pages";

//Data
import { users } from "../../../utils/mockup/data";

//Style
import common from "../../../assets/styles/common.module.scss";
import style from "./volunteers.module.scss";

//MUI
import Box from "@mui/material/Box";

//Components
import Title from '../../../components/functional/title/Title';
import LabelText from '../../../components/functional/labelText/LabelText';
import CustomTextField from '../../../components/functional/textField/CustomTextField';
import CustomSelect from '../../../components/functional/customSelect/CustomSelect';

//Item del CustomSelect
type Item = {
  name: string,
  value: string,
}

const lang: Array<Item> = [
  {
    name: 'Italiano',
    value: 'it'
  },
  {
    name: 'Inglese',
    value: 'en'
  },
]

const roles: Array<Item> = [
  {
    name: 'Owner',
    value: 'owner'
  },
  {
    name: 'Admin',
    value: 'admin'
  },
  {
    name: 'Blogger',
    value: 'blogger'
  },
]

const EditVolunteers: FC = (): JSX.Element => {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className={common.component}>
      <Box className={common.doubleComponent}>
        <LabelText>
          <Title
            text={"Dati dell'utente"}
            textInfo={"Clicca sul pulsante Salva modifiche per completare l'operazione di aggiornamento o clicca sul pulsante Elimina utente per cancellare i dati dell'utente dal sistema"}
          />

          <Box className={style.textFields}>

            <Box className={style.row}>
              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.name ? location?.state?.row?.name : ""
                }
                errorMessage="Inserisci un nome"
                error={false}
                placeholder={'Nome'}
              />

              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.surname ? location?.state?.row?.surname : ""
                }
                errorMessage="Inserisci un cognome"
                error={false}
                placeholder={'Cognome'}
              />
            </Box>

            <Box className={style.row}>
              <CustomSelect
                label={'Lingua'}
                items={lang}
              />

              <CustomSelect
                label={'Ruolo'}
                items={roles}
              />
            </Box>

            <Box className={style.row}>
              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.email ? location?.state?.row?.email : ""
                }
                errorMessage="Inserisci una email"
                error={false}
                placeholder={'Email'}
              />

              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.phone ? location?.state?.row?.phone : ""
                }
                errorMessage="Inserisci un numero di telefono"
                error={false}
                placeholder={'Telefono'}
              />
            </Box>

            <Box className={style.row}>
              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.password ? location?.state?.row?.password : ""
                }
                errorMessage="Inserisci una password"
                error={false}
                placeholder={'Password'}
                type={'password'}
              />

              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.password ? location?.state?.row?.password : ""
                }
                errorMessage="Inserisci una password uguale"
                error={false}
                placeholder={'Conferma password'}
                type={'password'}
              />
            </Box>
          </Box>

        </LabelText>
      </Box>
    </Box>
  )
}

export default EditVolunteers