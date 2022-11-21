import { FC, BaseSyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//mui
import { Box } from "@mui/material";

//function component
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import CustomSwitch from "../../../components/functional/customSwitch/CustomSwitch";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//style
import common from "../../../assets/styles/common.module.scss";
import style from "./editorSocial-Style.module.scss";

//route
import PAGES from "../../../router/pages";

//translation
import { useTranslation } from "react-i18next";

//utils
import { isValidURL } from "../../../utils/checkUrl";

//api
import {
  createNewSocialApi,
  getSocialById,
  updateSocialById,
} from "../../../services/api/social/socialApi";

//types
import { SingleSocial } from "../../../utils/mockup/types";
import checkEmptyText from "../../../utils/checkEmptyText";

interface State {
  currentSocial: SingleSocial;
  isReady: boolean;
  nameError: boolean;
  linkError: boolean;
  iconError: boolean;
  snackErrorIsOpen: boolean;
  snackWarningIsOpen: boolean;
}

const initialState: State = {
  currentSocial: {
    footerOn: false,
    homepageOn: false,
    iconContent: "",
    iconTitle: "",
    iconType: "",
    id: null,
    link: "",
    name: "",
  },
  isReady: false,
  nameError: false,
  linkError: false,
  iconError: false,
  snackErrorIsOpen: false,
  snackWarningIsOpen: false,
};

const EditorSocial: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initialState);
  const navigate = useNavigate();

  const location = useLocation();
  const idCurrentSocial = location?.state?.data?.id;
  const { t } = useTranslation();

  useEffect(() => {
    if (!location?.state?.showAdd) {
      getCurrentSocial();
    }
  }, []);

  useEffect(() => {
    console.log(state?.currentSocial);
  }, [state?.currentSocial]);

  //recupero il social corrente
  async function getCurrentSocial(): Promise<void> {
    let resp: any = await getSocialById(idCurrentSocial);
    if (resp?.status === 200) {
      setState({
        ...state,
        currentSocial: resp?.data,
        isReady: true,
      });
    }
  }

  const handleClick = (): void => {};

  const onCancel = (): void => {
    navigate(PAGES.editSocial);
  };

  const onSave = (e: BaseSyntheticEvent): void => {
    validateForm(e);
  };

  function validateForm(e: BaseSyntheticEvent) {
    let formIsValid = true;

    console.log(e);

    //prendo i valori dal form
    const socialName = e.target.form[0].value;
    const iconContent = e.target.form[2].name.split(" ")[0];
    const iconTitle = e.target.form[2].name.split(" ")[1];
    const iconType = e.target.form[2].name.split(" ")[2];
    const socialLink = e.target.form[3].value;
    const footerOn = e.target.form[5].checked;
    const homepageOn = e.target.form[6].checked;

    let errorName: boolean = false;
    let errorLink: boolean = false;
    let errorIcon: boolean = false;

    if (checkEmptyText(socialName)) {
      formIsValid = false;
      errorName = true;
    }
    if (checkEmptyText(socialLink) || !isValidURL(socialLink)) {
      formIsValid = false;
      errorLink = true;
    }
    // if (checkEmptyText(socialIcon)) {
    //   formIsValid = false;
    //   errorIcon = true;
    // }

    if (formIsValid) {
      //i valori inseriti dall'utente sono corretti

      let newSocial: SingleSocial = {
        name: socialName,
        iconContent: iconContent,
        iconTitle: iconTitle,
        iconType: iconType,
        link: socialLink,
        homepageOn: homepageOn,
        footerOn: footerOn,
      };
      console.log(newSocial);

      if (location?.state?.showAdd) {
        sendData(newSocial);
      } else {
        updateSocial(newSocial);
        navigate(PAGES.editSocial, { state: { open: true } });
      }
    } else {
      //i valori inseriti dall'utente sono sbagliati
      setState({
        ...state,
        nameError: errorName,
        linkError: errorLink,
        iconError: errorIcon,
      });
    }
  }

  //creo un nuovo social
  async function sendData(newSocial: SingleSocial): Promise<void> {
    let resp = await createNewSocialApi(newSocial);
    handleResponse(resp.status);
    if (resp?.status === 200) {
      let response = await getCurrentSocial();
      navigate(PAGES.editSocial, { state: { openAdd: true } });
    }
  }

  //aggiorno un social già esistente
  async function updateSocial(newSocial: SingleSocial): Promise<void> {
    let resp = await updateSocialById(state?.currentSocial?.id, newSocial);
    handleResponse(resp.status);
    if (resp?.status === 200) {
      navigate(PAGES.editSocial, { state: { openChange: true } });
    }
  }

  //gestisce status snackbar
  const handleResponse = async (status: number) => {
    let snackWarning: boolean = state.snackWarningIsOpen;
    let snackError: boolean = state.snackErrorIsOpen;

    if (status === 200) {
    } else if (status === 500 || status === undefined) snackWarning = true;
    else snackError = true;

    setState({
      ...state,
      snackWarningIsOpen: snackWarning,
      snackErrorIsOpen: snackError,
    });
  };

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackErrorIsOpen: false,
      snackWarningIsOpen: false,
    });
  };

  return (
    <form className={common.component}>
      {state?.isReady || location?.state?.showAdd ? (
        <>
          <Box className={`${common.singleComponent}`}>
            <LabelText>
              <Box className={common.row}>
                <Box className={common.rowLeft}>
                  <Title
                    text={t("social.editorSocial.socialSection.title")}
                    textInfo={t("social.editorSocial.socialSection.info")}
                  />
                  <CustomTextField
                    defaultValue={state?.currentSocial?.name}
                    placeholder={t(
                      "social.editorSocial.socialSection.placeholderSocial"
                    )}
                    error={state?.nameError}
                    errorMessage={t("social.editorSocial.socialSection.error")}
                  />
                  <Title
                    text={t("social.editorSocial.iconSection.title")}
                    textInfo={t("social.editorSocial.iconSection.info")}
                  />
                  <ButtonAddFile
                    callback={handleClick}
                    mediaContent={state?.currentSocial?.iconContent}
                    mediaTitle={state?.currentSocial?.iconTitle}
                    mediaType={state?.currentSocial?.iconType}
                  />
                </Box>
                <Box className={common.rowRight}>
                  <Title
                    text={t("social.editorSocial.linkSection.title")}
                    textInfo={t("social.editorSocial.linkSection.info")}
                  />
                  <CustomTextField
                    defaultValue={state?.currentSocial?.link}
                    placeholder={t(
                      "social.editorSocial.linkSection.placeholderLink"
                    )}
                    error={state?.linkError}
                    errorMessage={t("social.editorSocial.linkSection.error")}
                  />
                  <CustomSwitch
                    defaultChecked={state?.currentSocial?.footerOn}
                    label={t("social.editorSocial.toggleFooter")}
                  />
                  <CustomSwitch
                    defaultChecked={state?.currentSocial?.homepageOn}
                    label={t("social.editorSocial.toggleHome")}
                  />
                </Box>
              </Box>
            </LabelText>
          </Box>

          <Box className={style.buttonsContainer}>
            {location?.state?.showAdd ? (
              <>
                <ButtonGeneric color={"green"} callback={onSave}>
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
                <ButtonGeneric color={common.saveButtonColor} callback={onSave}>
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
        </>
      ) : null}
      {state?.snackErrorIsOpen && (
        <CustomSnackbar
          message={t("responseErrorSnack")}
          severity={"error"}
          callback={handleClose}
        />
      )}
      {state?.snackWarningIsOpen && (
        <CustomSnackbar
          message={t("responseWarningSnack")}
          severity={"warning"}
          callback={handleClose}
        />
      )}
    </form>
  );
};

export default EditorSocial;
