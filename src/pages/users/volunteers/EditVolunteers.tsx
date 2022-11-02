import React, { FC, useEffect, useState } from 'react'

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
import ButtonGeneric from '../../../components/functional/buttonGeneric/ButtonGeneric';

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
  {
    name: 'Guest',
    value: 'guest'
  },
]

interface State {
  error: Array<boolean>;
}

const initState: State = {
  error: [false, false, false, false, false, false, false],
};

const EditVolunteers: FC = (): JSX.Element => {

  const [state, setState] = useState<State>(initState);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setState({
      ...state,
      error: [false, false, false, false, false, false, false]
    })
  }, [])

  //Funzione per salvare domanda e risposta
  const onSaveGuest = (e: any): void => {

    let tmp: Array<boolean> = state.error

    if (e.target.form[12].value === e.target.form[14].value) {

      let guest = {
        name: e.target.form[0].value,
        surname: e.target.form[2].value,
        lang: e.target.form[4].value,
        role: e.target.form[6].value,
        email: e.target.form[8].value,
        phone: e.target.form[10].value,
        password: e.target.form[12].value,
        confirmPassword: e.target.form[14].value,
      };

      console.log(guest);
      navigate(PAGES.usersVolunteers)

    } else {

      tmp[6] = true

      setState({
        ...state,
        error: tmp,
      })
    }
  }

  //Funzione per cancellare l'operazione
  const onCancel = (): void => {
    navigate(PAGES.usersVolunteers)
  }

  return (
    <Box className={common.component}>
      <Box className={common.singleComponent}>
        <form>
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
                  defaultValue={
                    !!location?.state?.row?.language ? location?.state?.row?.language : ""
                  }
                />

                <CustomSelect
                  label={'Ruolo'}
                  items={roles}
                  defaultValue={
                    !!location?.state?.row?.role ? location?.state?.row?.role : ""
                  }
                  disabled={true}
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
                  error={state.error[6]}
                  placeholder={'Conferma password'}
                  type={'password'}
                />
              </Box>
            </Box>
          </LabelText>

          <Box className={style.saveBtn}>
            <ButtonGeneric color={common.ternaryColor} callback={onSaveGuest}>
              Salva modifiche
            </ButtonGeneric>

            <ButtonGeneric color={common.secondaryColor} callback={onCancel}>
              Annulla modifiche
            </ButtonGeneric>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default EditVolunteers