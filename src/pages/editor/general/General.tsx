import { BaseSyntheticEvent, FC, useEffect, useState } from "react";

//Mui
import { Box } from "@mui/material";

//styles
import common from "../../../assets/styles/common.module.scss";

//components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import ColorPicker from "../../../components/functional/colorPicker/ColorPicker";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//translation
import { useTranslation } from "react-i18next";

//types
import { Customization } from "../../../utils/mockup/types";

//api
import {
  getApiGeneral,
  putApiGeneral,
} from "../../../services/api/general/generalApi";
import { fetchData } from "../../../utils/fetchData";

interface State {
  ready: boolean;
  error: Array<boolean>;
  customization: Customization;
  open: boolean;
  snackErrorIsOpen: boolean;
  snackWarningIsOpen: boolean;
}

const initState: State = {
  ready: false,
  error: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  customization: {
    websiteName: "",
    logoContent: "",
    logoTitle: "",
    logoType: "",
    banner: {
      btnText1: "",
      btnText2: "",
      link: "",
      subtitle: "",
      title: "",
    },
    contacts: {
      address: "",
      email: "",
      fiscalCode: "",
      site: "",
      vatNumber: "",
    },
    palette: [],
    sectionWork: {
      email: "",
      text: "",
    },
  },
  open: false,
  snackErrorIsOpen: false,
  snackWarningIsOpen: false,
};

const General: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);
  const { t } = useTranslation();

  //fetchAPI
  const componentReady = async (): Promise<any> => {
    const res = await fetchData(getApiGeneral);
    const data = res.data;

    setState({
      ...state,
      customization: data,
      ready: true,
    });
  };

  useEffect(() => {
    componentReady();
  }, []);
  const handleImage = (): void => { };

  //putAPI
  async function updateData(e: BaseSyntheticEvent): Promise<void> {
    const form = e.target.form;
    console.log(e)

    const newData: Customization = {
      id: 1,
      websiteName: form[0].value,
      logoContent: form[2].name.split(" ")[0],
      logoTitle: form[2].name.split(" ")[1],
      logoType: form[2].name.split(" ")[2],
      palette: [
        {
          name: "primary",
          bgColor: state.customization.palette[0].bgColor,
          textColor: state.customization.palette[0].textColor,
        },
        {
          name: "secondary",
          bgColor: state.customization.palette[1].bgColor,
          textColor: state.customization.palette[1].textColor,
        },
        {
          name: "tertiary",
          bgColor: state.customization.palette[2].bgColor,
          textColor: state.customization.palette[2].textColor,
        },
      ],
      contacts: {
        site: form[7].value,
        email: form[9].value,
        address: form[11].value,
        vatNumber: form[13].value,
        fiscalCode: form[15].value,
      },
      sectionWork: {
        text: form[3].value,
        email: form[5].value,
      },
      banner: {
        title: form[17].value,
        subtitle: form[19].value,
        btnText1: form[22].value,
        btnText2: form[24].value,
        link: form[26].value,
      },
    };

    const putRes = await putApiGeneral(1, newData);
    handleResponse(putRes.status)
  }

  const onSaveGeneral = (e: BaseSyntheticEvent) => {
    let errors: Array<boolean> = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    let isError: boolean = false;
    let errorSnack: boolean = false;

    //controlla che tutti i campi siano pieni
    let count: number = 0;
    for (let i = 0; i <= 26; i++) {
      if (i !== 2) {
        if (e.target.form[i].value?.length === 0) {
          errors[count] = true;
          if (!isError) isError = true;
        }
      }

      if (!!e.target.form[i].value || e.target.form[i].value?.length === 0) count++;
    }

    if (e.target.form[22].value?.length === 0) {
      errors[11] = true;
      isError = true;
    }

    if (!isError) {
      updateData(e);
    } else {
      errorSnack = true
    }

    setState({
      ...state,
      snackErrorIsOpen: errorSnack,
      error: errors,
    });
  };

  //gestione risposta
  const handleResponse = async (status: number): Promise<void> => {
    let snackError: boolean = state.snackErrorIsOpen;
    let snackWarning: boolean = state.snackWarningIsOpen;
    let snackSuccess: boolean = state.snackWarningIsOpen;

    if (status === 200) {
      snackError = false;
      snackWarning = false;
      snackSuccess = true;
    } else if (status === 500 || status === undefined) {
      snackWarning = true;
      snackSuccess = false;
    } else {
      snackError = true;
      snackSuccess = false;
    }

    setState({
      ...state,
      open: snackSuccess,
      snackWarningIsOpen: snackWarning,
      snackErrorIsOpen: snackError,
    });
  };

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      open: false,
      snackWarningIsOpen: false,
      snackErrorIsOpen: false,
    });
  };

  //funzione per color handling
  const setColorBg = (index: number) => (params: any) => {
    const newState = { ...state };
    newState.customization.palette[index].bgColor = params;
    setState(newState);
  };

  const setColorTxt = (index: number) => (params: any) => {
    const newState = { ...state };
    newState.customization.palette[index].textColor = params;
    setState(newState);
  };

  return (
    <form>
      {state.ready && (
        <Box className={common.component}>
          <Box className={common.doubleComponent}>
            <Box className={common.left}>
              <LabelText>
                <Title
                  text={t("general.nameSite.title")}
                  textInfo={t("general.nameSite.info")}
                />
                <CustomTextField
                  error={state.error[0]}
                  errorMessage={t("general.nameSite.error")}
                  placeholder={t("general.nameSite.placeholder")}
                  defaultValue={state.customization.websiteName}
                />
              </LabelText>
              <LabelText>
                <Title text="Logo" textInfo={t("general.logo.info")} />
                <ButtonAddFile
                  callback={handleImage}
                  mediaContent={state.customization.logoContent}
                  mediaTitle={state.customization.logoTitle}
                  mediaType={state.customization.logoType}
                />
              </LabelText>
              <LabelText>
                <Title
                  text={t("general.palettes.title")}
                  textInfo={t("general.palettes.info")}
                />
                <ColorPicker
                  callbackBg={setColorBg(0)}
                  callbackTxt={setColorTxt(0)}
                  bg={state?.customization?.palette[0].bgColor}
                  txt={state?.customization?.palette[0].textColor}
                  background={t("general.palettes.primary.background")}
                  text={t("general.palettes.primary.text")}
                />
                <ColorPicker
                  callbackBg={setColorBg(1)}
                  callbackTxt={setColorTxt(1)}
                  bg={state?.customization?.palette[1].bgColor}
                  txt={state?.customization?.palette[1].textColor}
                  background={t("general.palettes.secondary.background")}
                  text={t("general.palettes.secondary.text")}
                />
                <ColorPicker
                  callbackBg={setColorBg(2)}
                  callbackTxt={setColorTxt(2)}
                  bg={state?.customization?.palette[2].bgColor}
                  txt={state?.customization?.palette[2].textColor}
                  background={t("general.palettes.ternary.background")}
                  text={t("general.palettes.ternary.text")}
                />
              </LabelText>
            </Box>
            <Box className={common.right}>
              <LabelText>
                <Title
                  text={t("general.workSection.title")}
                  textInfo={t("general.workSection.info")}
                />
                <CustomTextField
                  error={state.error[2]}
                  errorMessage={t("general.workSection.errorText")}
                  placeholder={t("general.workSection.placeholderText")}
                  defaultValue={state.customization.sectionWork.text}
                />
                <CustomTextField
                  error={state.error[3]}
                  errorMessage={t("general.workSection.errorEmail")}
                  placeholder={t("general.workSection.placeholderEmail")}
                  defaultValue={state.customization.sectionWork.email}
                />
              </LabelText>
              <LabelText>
                <Title
                  text={t("general.contacts.title")}
                  textInfo={t("general.contacts.info")}
                />
                <CustomTextField
                  error={state.error[4]}
                  errorMessage={t("general.contacts.errorTelephone")}
                  placeholder={t("general.contacts.placeholderTelephone")}
                  defaultValue={state.customization.contacts.site}
                />
                <CustomTextField
                  error={state.error[5]}
                  errorMessage={t("general.contacts.errorEmail")}
                  placeholder={t("general.contacts.placeholderEmail")}
                  defaultValue={state.customization.contacts.email}
                />
                <CustomTextField
                  error={state.error[6]}
                  errorMessage={t("general.contacts.errorAddress")}
                  placeholder={t("general.contacts.placeholderAddress")}
                  defaultValue={state.customization.contacts.address}
                />
                <CustomTextField
                  error={state.error[7]}
                  errorMessage={t("general.contacts.errorCf")}
                  placeholder={t("general.contacts.placeholderCf")}
                  defaultValue={state.customization.contacts.fiscalCode}
                />
                <CustomTextField
                  error={state.error[8]}
                  errorMessage={t("general.contacts.errorIva")}
                  placeholder={t("general.contacts.placeholderIva")}
                  defaultValue={state.customization.contacts.vatNumber}
                />
              </LabelText>
            </Box>
          </Box>
          <Box className={common.doubleComponent}>
            <LabelText>
              <Title
                text={t("general.banner.title")}
                textInfo={t("general.workSection.info")}
              />
              <Box className={common.row}>
                <Box className={common.rowLeft}>
                  <CustomTextField
                    error={state.error[9]}
                    errorMessage={t("general.banner.errorTitle")}
                    placeholder={t("general.banner.placeholderTitle")}
                    defaultValue={state.customization.banner.title}
                  />
                  <CustomTextField
                    error={state.error[10]}
                    errorMessage={t("general.banner.errorSubtitle")}
                    minrow={5}
                    maxrow={5}
                    multiline={true}
                    placeholder={t("general.banner.placeholderSubtitle")}
                    defaultValue={state.customization.banner.subtitle}
                  />
                </Box>
                <Box className={common.rowRight}>
                  <Box
                    className={`${common.row} `}
                    style={{ justifyContent: "space-between" }}
                  >
                    <Box style={{ width: "47%" }}>
                      <CustomTextField
                        error={state.error[11]}
                        errorMessage={t("general.banner.errorCallToAction")}
                        placeholder={t(
                          "general.banner.placeholderCallToAction"
                        )}
                        defaultValue={state.customization.banner.btnText1}
                      />
                    </Box>
                    <Box style={{ width: "47%" }}>
                      <CustomTextField
                        error={state.error[13]}
                        errorMessage={t("general.banner.errorCallToAction")}
                        placeholder={t(
                          "general.banner.placeholderCallToAction"
                        )}
                        defaultValue={state.customization.banner.btnText2}
                      />
                    </Box>
                  </Box>
                  <CustomTextField
                    error={state.error[14]}
                    errorMessage={t("general.banner.errorLink")}
                    placeholder={t("general.banner.placeholderLink")}
                    defaultValue={state.customization.banner.link}
                  />
                </Box>
              </Box>
            </LabelText>
          </Box>
          <ButtonGeneric
            callback={onSaveGeneral}
            color={common.saveButtonColor}
          >
            {t("saveButton")}
          </ButtonGeneric>
          {state.open && (
            <CustomSnackbar
              message={t("changesSnack")}
              severity={"success"}
              callback={handleClose}
            />
          )}
          {state.snackErrorIsOpen && (
            <CustomSnackbar
              message={t("responseErrorSnack")}
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
      )}
    </form>
  );
};
export default General;
