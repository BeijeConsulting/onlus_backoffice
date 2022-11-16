import { FC, useEffect, useState, BaseSyntheticEvent } from "react";

//Navigazione
import { useLocation, useNavigate } from "react-router-dom";
import PAGES from "../../../router/pages";

//Style
import common from "../../../assets/styles/common.module.scss";
import style from "./collaborators.module.scss";

//MUI
import Box from "@mui/material/Box";

//Components
import Title from "../../../components/functional/title/Title";
import LabelText from "../../../components/functional/labelText/LabelText";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import CustomSelect from "../../../components/functional/customSelect/CustomSelect";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";

//API
import { fetchData } from "../../../utils/fetchData";
import { postCollaborator } from "../../../services/api/collaborators/collaborators";

//i18n
import { useTranslation } from 'react-i18next';

//Redux
import { useSelector } from 'react-redux/es/exports'
import roles from '../../../utils/roles'

type User = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  language: string;
  password: string;
  role: number;
}

//Item del CustomSelect
type Item = {
  name: string;
  value: string;
};

const lang: Array<Item> = [
  {
    name: "Italiano",
    value: "IT",
  },
  {
    name: "Inglese",
    value: "EN",
  },
];

const rolesForSuper: Array<Item> = [
  {
    name: "Superadmin",
    value: "3",
  },
  {
    name: "Admin",
    value: "2",
  },
  {
    name: "Blogger",
    value: "4",
  },
];

const rolesForAdmin: Array<Item> = [
  {
    name: "Admin",
    value: "2",
  },
  {
    name: "Blogger",
    value: "4",
  },
];

interface State {
  error: Array<boolean>;
}

const initState: State = {
  error: [false, false, false, false, false, false, false, false],
};

const EditorCollaborators: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);
  const { t, i18n } = useTranslation();

  const currentUser = useSelector((state: any) => state.userDuck.user)

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setState({
      ...state,
      error: [false, false, false, false, false, false, false, false],
    });
  }, []);

  //Funzione per salvare i dati dell'admin
  const onSaveAdmin = async (e: BaseSyntheticEvent): Promise<void> => {
    let tmp: Array<boolean> = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    //controllo che tutti i campi siano pieni
    let errors: boolean = false;
    for (let i = 0; i < 14; i += 2) {
      if (e.target.form[i].value.length === 0) {
        tmp[i / 2] = true;
        if (!errors) errors = true;
      }
    }

    if (e.target.form[12].value !== e.target.form[14].value) {
      errors = true;
      tmp[7] = true;
    }

    if (
      /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(e.target.form[8].value) ===
      false
    ) {
      errors = true;
      tmp[4] = true;
    }

    if (!errors) {
      let user: User = {
        name: e.target.form[0].value,
        surname: e.target.form[2].value,
        language: e.target.form[4].value,
        role: parseInt(e.target.form[6].value),
        email: e.target.form[8].value,
        phone: e.target.form[10].value,
        password: e.target.form[12].value,
      };

      if(!!location?.state?.row?.id){
        //inserire putApi
      } else {
        await postApi(user)
      }

      if(location?.state?.showAdd){
        navigate(PAGES.usersCollaborators, { state: { openAdd: true } });
      }else{
        navigate(PAGES.usersCollaborators, { state: { open: true } });
      } 
    }

    setState({
      ...state,
      error: tmp,
    });
  };

  //PostAPI
  const postApi = async (user: User): Promise<void> => {
    let res = await fetchData(postCollaborator, user)
    console.log("Collaborator: ", res)
  }

  //Funzione per cancellare l'operazione
  const onCancel = (): void => {
    navigate(PAGES.usersCollaborators);
  };

  const log = (): void => {

  }

  const checkRole = (): string => {
    if(location?.state?.row.role.includes('SUPERADMIN')) {
      return '3'
    } else if(location?.state?.row.role.includes('ADMIN')) {
      return '2'
    } else {
      return '4'
    }
  }

  return (
    <Box className={common.component}>
      <Box className={common.singleComponent}>
        <form>
          <LabelText>
            <Title
              text={t("CollaboratorsEditor.title")}
              textInfo={
                t("CollaboratorsEditor.info")
              }
            />

            <Box className={style.textFields}>
              <Box className={style.row}>
                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.name
                      ? location?.state?.row?.name
                      : ""
                  }
                  errorMessage="Inserisci un nome"
                  error={state.error[0]}
                  placeholder={t("CollaboratorsEditor.placeholderName")}
                />

                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.surname
                      ? location?.state?.row?.surname
                      : ""
                  }
                  errorMessage="Inserisci un cognome"
                  error={state.error[1]}
                  placeholder={t("CollaboratorsEditor.placeholderSurname")}
                />
              </Box>

              <Box className={style.row}>
                <CustomSelect
                  label={t("CollaboratorsEditor.placeholderLang")}
                  items={lang}
                  defaultValue={
                    !!location?.state?.row?.language
                      ? location?.state?.row?.language
                      : ""
                  }
                  error={state.error[2]}
                  errorMessage="Inserisci una lingua"
                />

                <CustomSelect
                  label={t("CollaboratorsEditor.placeholderRole")}
                  items={
                    currentUser.permission.includes(roles.owner)
                    ? rolesForSuper
                    : rolesForAdmin
                  }
                  defaultValue={
                    !!location?.state?.row?.role
                      ? checkRole()
                      : ""
                  }
                  error={state.error[3]}
                  errorMessage="Inserisci un ruolo"
                />
              </Box>

              <Box className={style.row}>
                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.email
                      ? location?.state?.row?.email
                      : ""
                  }
                  errorMessage="Inserisci una email"
                  error={state.error[4]}
                  placeholder={t("CollaboratorsEditor.placeholderEmail")}
                />

                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.phone
                      ? location?.state?.row?.phone
                      : ""
                  }
                  errorMessage="Inserisci un numero di telefono"
                  error={state.error[5]}
                  placeholder={t("CollaboratorsEditor.placeholderPhone")}
                />
              </Box>

              <Box className={style.row}>
                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.password
                      ? location?.state?.row?.password
                      : ""
                  }
                  errorMessage="Inserisci una password"
                  error={state.error[6]}
                  placeholder={t("CollaboratorsEditor.placeholderPassword")}
                  type={"password"}
                />

                <CustomTextField
                  defaultValue={
                    !!location?.state?.row?.password
                      ? location?.state?.row?.password
                      : ""
                  }
                  errorMessage="Inserisci una password uguale"
                  error={state.error[7]}
                  placeholder={t("CollaboratorsEditor.placeholderConfirmPassword")}
                  type={"password"}
                />
              </Box>
            </Box>
          </LabelText>

          <Box className={style.saveBtn}>
            {location?.state?.showAdd ? (
              <>
                <ButtonGeneric
                  color={"green"}
                  callback={onSaveAdmin}
                >
                  {t("addButton")}
                </ButtonGeneric>
                <ButtonGeneric
                  color={common.secondaryColor}
                  callback={onCancel}
                >
                  {t("deleteModal.DiscardChangesButton")}
                </ButtonGeneric>
              </>
            ) : (
              <>
              <ButtonGeneric
                color={common.saveButtonColor}
                callback={log /*sostituire con onSaveAdmin*/}
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
  );
};

export default EditorCollaborators;
