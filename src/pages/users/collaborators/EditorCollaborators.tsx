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
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//API
import { fetchData } from "../../../utils/fetchData";
import { postCollaborator, putApiCollaboratorById } from "../../../services/api/collaborators/collaborators";

//i18n
import { useTranslation } from 'react-i18next';

//Redux
import { useSelector } from 'react-redux/es/exports'
import roles from '../../../utils/roles'

//Utils
import { User } from "../../../utils/mockup/types";
import checkRole from '../../../utils/checkRoles';

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

const rolesForGuest: Array<Item> = [
  {
    name: "User",
    value: "1",
  },
];

interface State {
  error: Array<boolean>;
  snackAlreadyExistsIsOpen: boolean;
  snackErrorIsOpen: boolean;
  snackWarningIsOpen: boolean;
}

const initState: State = {
  error: [false, false, false, false, false, false, false, false],
  snackAlreadyExistsIsOpen: false,
  snackErrorIsOpen: false,
  snackWarningIsOpen: false,
};

const EditorCollaborators: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);
  const { t } = useTranslation();

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
  const onSave = async (e: BaseSyntheticEvent): Promise<void> => {
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
    let err: boolean = false;

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
        id: location?.state?.row?.id,
        name: e.target.form[0].value,
        surname: e.target.form[2].value,
        language: e.target.form[4].value,
        role: parseInt(e.target.form[6].value),
        email: e.target.form[8].value,
        phone: e.target.form[10].value,
        password: e.target.form[12].value,
      };

      if (!!location?.state?.row?.id) {
        err = await putApi(location?.state?.row?.id, user)
      } else {
        err = await postApi(user)
      }

      if (!err) {
        if (location?.state?.showAdd) {
          if (window.location.href.includes('editorCollaborators')) {
            navigate(PAGES.usersCollaborators, { state: { openAdd: true } });
          } else {
            navigate(PAGES.usersVolunteers, { state: { openAdd: true } });
          }
        } else {
          if (window.location.href.includes('editorCollaborators')) {
            navigate(PAGES.usersCollaborators, { state: { open: true } });
          } else {
            navigate(PAGES.usersVolunteers, { state: { open: true } });
          }
        }
      }
    }

    setState({
      ...state,
      error: tmp,
      snackErrorIsOpen: err,
    });
  };

  //PostAPI
  const postApi = async (user: User): Promise<boolean> => {
    let res = await fetchData(postCollaborator, user)
    let err = handleResponse(res.status)
    return err;
  }

  //PutApi
  const putApi = async (id: number, user: User): Promise<boolean> => {
    let res = await fetchData(putApiCollaboratorById, id, user)
    let err = handleResponse(res.status)
    return err;
  }

  //gestione risposta
  const handleResponse = async (status: number): Promise<boolean> => {
    let snackExists: boolean = state.snackAlreadyExistsIsOpen;
    let snackError: boolean = state.snackErrorIsOpen;
    let snackWarning: boolean = state.snackWarningIsOpen;

    if (status === 200) {
      snackExists = false;
      snackError = false;
      snackWarning = false;
    } else if (status === 503 || status === 400) {
      snackExists = true;
    } else if (status === 500 || status === undefined){
      snackWarning = true;
    } else {
      snackError = true;
    }

    setState({
      ...state,
      snackAlreadyExistsIsOpen: snackExists,
      snackWarningIsOpen: snackWarning,
      snackErrorIsOpen: snackError,
    });

    return snackExists
  };

  //Funzione per cancellare l'operazione
  const onCancel = (): void => {
    if (window.location.href.includes('editorCollaborators')) {
      navigate(PAGES.usersCollaborators);
    } else {
      navigate(PAGES.usersVolunteers);
    }
  };

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackErrorIsOpen: false,
    });
  };

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

                {
                  window.location.href.includes('editorCollaborators') ?
                    <CustomSelect
                      label={t("CollaboratorsEditor.placeholderRole")}
                      items={
                        currentUser.permission.includes(roles.owner)
                          ? rolesForSuper
                          : rolesForAdmin
                      }
                      defaultValue={
                        !!location?.state?.row?.role
                          ? checkRole(location?.state?.row.role)
                          : ""
                      }
                      error={state.error[3]}
                      errorMessage="Inserisci un ruolo"
                    />
                    :
                    <CustomSelect
                      disabled
                      label={t("CollaboratorsEditor.placeholderRole")}
                      items={rolesForGuest}
                      defaultValue={
                        !!location?.state?.row?.role
                          ? checkRole(location?.state?.row.role)
                          : "1"
                      }
                      error={state.error[3]}
                      errorMessage="Inserisci un ruolo"
                    />
                }
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
                  callback={onSave}
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
                  callback={onSave}
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
      {state.snackAlreadyExistsIsOpen && (
        <CustomSnackbar
          message={t("userAlreadyExists")}
          severity={"error"}
          callback={handleClose}
        />
      )}
      {state.snackErrorIsOpen && (
        <CustomSnackbar
          message={t("userAlreadyExists")}
          severity={"error"}
          callback={handleClose}
        />
      )}
      {state.snackWarningIsOpen && (
        <CustomSnackbar
          message={t("responseWarningSnack")}
          severity={"warning"}
          callback={handleClose}
        />
      )}
    </Box>
  );
};

export default EditorCollaborators;
