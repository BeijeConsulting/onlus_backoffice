import React, { FC, useEffect, useState } from 'react'

//Navigazione
import { useLocation, useNavigate } from "react-router-dom";
import PAGES from "../../../router/pages";

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

//i18n
import { useTranslation } from 'react-i18next';

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

interface State {
  error: Array<boolean>;
}

const initState: State = {
  error: [false, false, false, false, false, false, false, false],
};

const EditVolunteers: FC = (): JSX.Element => {

  const [state, setState] = useState<State>(initState);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setState({
      ...state,
      error: [false, false, false, false, false, false, false, false]
    })
  }, [])

  //Funzione per salvare domanda e risposta
  const onSaveGuest = (e: any): void => {

    let tmp: Array<boolean> = [false, false, false, false, false, false, false, false]

    //controllo che tutti i campi siano pieni
    let errors: boolean = false
    for (let i = 0; i < 14; i += 2) {
      if (e.target.form[i].value.length === 0) {
        tmp[i / 2] = true
        if (!errors)
          errors = true
      }
    }

    if (e.target.form[12].value !== e.target.form[14].value) {
      errors = true
      tmp[7] = true
    }

    if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(e.target.form[8].value) === false){
      errors = true
      tmp[4] = true
    }

    if (!errors) {
      /*let guest = {
        name: e.target.form[0].value,
        surname: e.target.form[2].value,
        lang: e.target.form[4].value,
        role: e.target.form[6].value,
        email: e.target.form[8].value,
        phone: e.target.form[10].value,
        password: e.target.form[12].value,
        confirmPassword: e.target.form[14].value,
      };*/
      
      if(location?.state?.showAdd){
        navigate(PAGES.usersVolunteers, { state: { openAdd: true } });
      }else{
        navigate(PAGES.usersVolunteers, { state: { open: true } });
      } 
    }

    setState({
      ...state,
      error: tmp,
    })
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
              text={t("volunteers.editorVolunteers.title")}
              textInfo={t("volunteers.editorVolunteers.info")}
            />

            <Box className={style.textFields}>
              <Box className={style.row}>
                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.name ? location?.state?.row?.name : ""
                  }
                  errorMessage="Inserisci un nome"
                  error={state.error[0]}
                  placeholder={t("volunteers.editorVolunteers.placeholderName")}
                />

                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.surname ? location?.state?.row?.surname : ""
                  }
                  errorMessage="Inserisci un cognome"
                  error={state.error[1]}
                  placeholder={t("volunteers.editorVolunteers.placeholderSurname")}
                />
              </Box>

              <Box className={style.row}>
                <CustomSelect
                  label={t("volunteers.editorVolunteers.placeholderLanguage")}
                  items={lang}
                  defaultValue={
                    !!location?.state?.row?.language ? location?.state?.row?.language : ""
                  }
                />

                <CustomTextField
                  defaultValue={"User"}
                  error={false}
                  disabled={true}
                />
              </Box>

              <Box className={style.row}>
                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.email ? location?.state?.row?.email : ""
                  }
                  errorMessage="Inserisci una email"
                  error={state.error[4]}
                  placeholder={t("volunteers.editorVolunteers.placeholderEmail")}
                />

                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.phone ? location?.state?.row?.phone : ""
                  }
                  errorMessage="Inserisci un numero di telefono"
                  error={state.error[5]}
                  placeholder={t("volunteers.editorVolunteers.placeholderTelephone")}
                />
              </Box>

              <Box className={style.row}>
                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.password ? location?.state?.row?.password : ""
                  }
                  errorMessage="Inserisci una password"
                  error={state.error[6]}
                  placeholder={t("volunteers.editorVolunteers.placeholderPassword")}
                  type={'password'}
                />

                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.password ? location?.state?.row?.password : ""
                  }
                  errorMessage="Inserisci una password uguale"
                  error={state.error[7]}
                  placeholder={t("volunteers.editorVolunteers.placeholderConfirmPassword")}
                  type={'password'}
                />
              </Box>
            </Box>
          </LabelText>

          <Box className={style.saveBtn}>
            {location?.state?.showAdd ? (
              <>
                <ButtonGeneric
                  color={"green"}
                  callback={onSaveGuest}
                >
                  {t("addButton")}
                </ButtonGeneric>
                <ButtonGeneric
                  color={common.secondaryColor}
                  callback={onCancel}
                >
                  {t("cancelButton")}
                </ButtonGeneric>
              </>
            ) : (
              <>
              <ButtonGeneric
                color={common.saveButtonColor}
                callback={onSaveGuest}
              >
                {t("saveButton")}
              </ButtonGeneric>
              <ButtonGeneric
                color={common.secondaryColor}
                callback={onCancel}
              >
                {t("cancelButton")}
              </ButtonGeneric>
            </>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default EditVolunteers