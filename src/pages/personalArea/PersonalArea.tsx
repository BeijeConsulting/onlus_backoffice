import { FC, useEffect, useState, BaseSyntheticEvent } from 'react'

//Navigazione
import { useLocation, useNavigate } from "react-router-dom";
import PAGES from "../../router/pages";

//Style
import common from "../../assets/styles/common.module.scss";
import style from "./personalArea.module.scss";
import modal from "../../components/functional/deleteModal/deleteModal.module.scss";

//MUI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

//Components
import Title from "../../components/functional/title/Title";
import LabelText from "../../components/functional/labelText/LabelText";
import CustomTextField from "../../components/functional/textField/CustomTextField";
import CustomSelect from "../../components/functional/customSelect/CustomSelect";
import ButtonGeneric from "../../components/functional/buttonGeneric/ButtonGeneric";
import CustomSnackbar from "../../components/functional/customSnackbar/CustomSnackbar";

//API
import { fetchData } from '../../utils/fetchData';
import { getPersonalArea, putPersonalAreaById } from "../../services/api/personalArea/personalArea";

//Redux
import { useSelector } from 'react-redux/es/exports'

//Utils
import { User } from '../../utils/mockup/types';
import checkRole from '../../utils/checkRoles';
import useLogout from "../../utils/logout";

//Translation
import { useTranslation } from "react-i18next";

//Item del CustomSelect
type Item = {
  name: string;
  value: string;
};

const rolesPerAdmin: Array<Item> = [
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

interface State {
  error: Array<boolean>;
  snackIsOpen: boolean;
  modalIsOpen: boolean;
  ready: boolean;
  personalData: User;
}

const initState: State = {
  error: [false, false, false, false, false, false, false, false],
  snackIsOpen: false,
  modalIsOpen: false,
  ready: false,
  personalData: {
    email: '',
    id: 0,
    language: '',
    name: '',
    surname: '',
    password: '',
    phone: '',
    publishedArticles: 0,
    role: [],
  },
};

const PersonalArea: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);
  const { t } = useTranslation();

  const currentUser = useSelector((state: any) => state.userDuck.user)

  const [handleLogout, isReady] = useLogout(1000);
  const location = useLocation();
  const navigate = useNavigate();

  const lang: Array<Item> = [
    {
      name: t("personalArea.ita"),
      value: "IT",
    },
    {
      name: t("personalArea.eng"),
      value: "EN",
    },
  ];

  useEffect(() => {
    getData()
  }, []);

  //fetchAPI
  const getData = async (): Promise<void> => {
    let res = await fetchData(getPersonalArea, currentUser.id);

    setState({
      ...state,
      error: [false, false, false, false, false, false, false, false],
      personalData: res.data,
      ready: true,
      snackIsOpen: location?.state?.open
    })
  }

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
    });
  };

  //Funzione per salvare i dati
  const onSave = async (e: BaseSyntheticEvent): Promise<void> => {

    let tmp: Array<boolean> = [false, false, false, false, false, false, false, false]
    let open: boolean = false;
    let showModal: boolean = false;

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
        id: state.personalData.id,
        name: e.target.form[0].value,
        surname: e.target.form[2].value,
        language: e.target.form[4].value,
        role: parseInt(e.target.form[6].value),
        email: e.target.form[8].value,
        phone: e.target.form[10].value,
        password: e.target.form[12].value,
      };

      //API
      await putApi(state.personalData.id, user)
      open = true;
      showModal = true;
    }

    setState({
      ...state,
      error: tmp,
      modalIsOpen: showModal,
    });
  };

  //PutApi
  const putApi = async (id: number, user: User): Promise<void> => {
    let res = await fetchData(putPersonalAreaById, id, user)
  }

  //esegue logout e porta al login dopo le modifiche
  const toLogin = (): void => {
    handleLogout()
    if(isReady){
      navigate(PAGES.login)
    }
  }

  return (
    <Box className={common.component}>
      {state.ready && (
        <>
          <Box className={common.singleComponent}>
            <form>
              <LabelText>
                <Title
                  text={t("personalArea.title")}
                  textInfo={t("personalArea.info")}
                />

                <Box className={style.textFields}>
                  <Box className={style.row}>
                    <CustomTextField
                      defaultValue={
                        state.personalData.name
                      }
                      errorMessage="Inserisci un nome"
                      error={state.error[0]}
                      placeholder={t("personalArea.placeholderName")}
                    />

                    <CustomTextField
                      defaultValue={
                        state.personalData.surname
                      }
                      errorMessage="Inserisci un cognome"
                      error={state.error[1]}
                      placeholder={t("personalArea.placeholderSurname")}
                    />
                  </Box>

                  <Box className={style.row}>
                    <CustomSelect
                      label={t("personalArea.placeholderLanguage")}
                      items={lang}
                      defaultValue={
                        state.personalData.language
                      }
                      error={state.error[2]}
                      errorMessage="Inserisci una lingua"
                    />

                    <CustomSelect
                      label={t("personalArea.placeholderRole")}
                      items={rolesPerAdmin}
                      disabled={true}
                      defaultValue={
                        checkRole(state.personalData.role)
                      }
                      error={state.error[3]}
                      errorMessage="Inserisci un ruolo"
                    />
                  </Box>

                  <Box className={style.row}>
                    <CustomTextField
                      defaultValue={
                        state.personalData.email
                      }
                      errorMessage="Inserisci una email"
                      error={state.error[4]}
                      placeholder={t("personalArea.placeholderEmail")}
                    />

                    <CustomTextField
                      defaultValue={
                        state.personalData.phone
                      }
                      errorMessage="Inserisci un numero di telefono"
                      error={state.error[5]}
                      placeholder={t("personalArea.placeholderTelephone")}
                    />
                  </Box>

                  <Box className={style.row}>
                    <CustomTextField
                      defaultValue={
                        state.personalData.password
                      }
                      errorMessage="Inserisci una password"
                      error={state.error[6]}
                      placeholder={t("personalArea.placeholderPassword")}
                      type={"password"}
                    />

                    <CustomTextField
                      defaultValue={
                        state.personalData.password
                      }
                      errorMessage="Inserisci una password uguale"
                      error={state.error[7]}
                      placeholder={t("personalArea.placeholderConfirmPassword")}
                      type={"password"}
                    />
                  </Box>
                </Box>
              </LabelText>

              <Box className={style.saveBtn}>
                <ButtonGeneric color={common.saveButtonColor} callback={onSave}>
                  {t("saveButton")}
                </ButtonGeneric>
              </Box>
            </form>

            <Modal
              open={state.modalIsOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={modal.modal}>
                <Typography>{t("personalArea.modalText")}</Typography>
                <Box className={modal.modalButtons}>
                  <ButtonGeneric color={style.secondaryColor} callback={toLogin}>
                    {t("personalArea.confirmButton")}
                  </ButtonGeneric>
                </Box>
              </Box>
            </Modal>
          </Box>

          {state.snackIsOpen && (
            <Box className={common.singleComponent}>
              <CustomSnackbar
                message={t("changesSnack")}
                severity={"success"}
                callback={handleClose}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default PersonalArea;
