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

//interface
type error = {
  nameSite: boolean;
  workText: boolean;
  workEmail: boolean;
  contactPhone: boolean;
  contactEmail: boolean;
  contactAdress: boolean;
  contactVat: boolean;
  contactCF: boolean;
};

interface State {
  ready: boolean;
  error: error;
  customization: Customization;
  open: boolean;
}

const initState: State = {
  ready: false,
  error: {
    nameSite: false,
    workText: false,
    workEmail: false,
    contactPhone: false,
    contactEmail: false,
    contactAdress: false,
    contactVat: false,
    contactCF: false,
  },
  customization: {
    websiteName: "",
    mediaContent: "",
    mediaTitle: "",
    mediaType: "",
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
};

const General: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);
  const { t } = useTranslation();

  //
  const componentReady = async (): Promise<any> => {
    const res = await fetchData(getApiGeneral);
    const data = res.data;
    console.log(data);
    setState({
      ...state,
      customization: data,
      ready: true,
    });
  };

  useEffect(() => {
    componentReady();
  }, []);
  const handleImage = (): void => {};

  async function updateData(e: BaseSyntheticEvent): Promise<void> {
    const form = e.target.form;
    console.log(e);

    const newData: Customization = {
      websiteName: form[0].value,
      mediaContent: form[2].name.split(" ")[0],
      mediaTitle: form[2].name.split(" ")[1],
      mediaType: form[2].name.split(" ")[2],
      palette: [
        {
          id: 1,
          name: "primary",
          bgColor: state.customization.palette[0].bgColor,
          textColor: state.customization.palette[0].textColor,
        },
        {
          id: 2,
          name: "secondary",
          bgColor: state.customization.palette[1].bgColor,
          textColor: state.customization.palette[1].textColor,
        },
        {
          id: 3,
          name: "tertiary",
          bgColor: state.customization.palette[2].bgColor,
          textColor: state.customization.palette[2].textColor,
        },
      ],
      contacts: {
        id: 4,
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
        id: 1,
        title: form[17].value,
        subtitle: form[19].value,
        btnText1: form[22].value,
        btnText2: form[24].value,
        link: form[26].value,
      },
    };

    console.log(newData);

    const putRes = await putApiGeneral(1, newData);
    console.log(putRes);
  }

  const onSaveGeneral = (e: BaseSyntheticEvent) => {
    updateData(e);
    setState({
      ...state,
      open: true,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  //funzione per colo handling
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
                  error={state.error.nameSite}
                  placeholder={t("general.nameSite.placeholder")}
                  defaultValue={state.customization.websiteName}
                />
              </LabelText>
              <LabelText>
                <Title text="Logo" textInfo={t("general.logo.info")} />
                <ButtonAddFile
                  callback={handleImage}
                  mediaContent={state.customization.mediaContent}
                  mediaTitle={state.customization.mediaTitle}
                  mediaType={state.customization.mediaType}
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
                  bg={state.customization.palette[0].bgColor}
                  txt={state.customization.palette[0].textColor}
                  background={t("general.palettes.primary.background")}
                  text={t("general.palettes.primary.text")}
                />
                <ColorPicker
                  callbackBg={setColorBg(1)}
                  callbackTxt={setColorTxt(1)}
                  bg={state.customization.palette[1].bgColor}
                  txt={state.customization.palette[1].textColor}
                  background={t("general.palettes.secondary.background")}
                  text={t("general.palettes.secondary.text")}
                />
                <ColorPicker
                  callbackBg={setColorBg(2)}
                  callbackTxt={setColorTxt(2)}
                  bg={state.customization.palette[2].bgColor}
                  txt={state.customization.palette[2].textColor}
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
                  error={state.error.workText}
                  placeholder={t("general.workSection.placeholderText")}
                  defaultValue={state.customization.sectionWork.text}
                />
                <CustomTextField
                  error={state.error.workEmail}
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
                  error={state.error.contactPhone}
                  placeholder={t("general.contacts.placeholderTelephone")}
                  defaultValue={state.customization.contacts.site}
                />
                <CustomTextField
                  error={state.error.contactEmail}
                  placeholder={t("general.contacts.placeholderEmail")}
                  defaultValue={state.customization.contacts.email}
                />
                <CustomTextField
                  error={state.error.contactAdress}
                  placeholder={t("general.contacts.placeholderAddress")}
                  defaultValue={state.customization.contacts.address}
                />
                <CustomTextField
                  error={state.error.contactVat}
                  placeholder={t("general.contacts.placeholderCf")}
                  defaultValue={state.customization.contacts.fiscalCode}
                />
                <CustomTextField
                  error={state.error.contactCF}
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
                    error={state.error.workText}
                    placeholder={t("general.banner.placeholderTitle")}
                    defaultValue={state.customization.banner.title}
                  />
                  <CustomTextField
                    error={state.error.workText}
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
                        error={state.error.workText}
                        placeholder={t(
                          "general.banner.placeholderCallToAction"
                        )}
                        defaultValue={state.customization.banner.btnText1}
                      />
                    </Box>
                    <Box style={{ width: "47%" }}>
                      <CustomTextField
                        error={state.error.workText}
                        placeholder={t(
                          "general.banner.placeholderCallToAction"
                        )}
                        defaultValue={state.customization.banner.btnText2}
                      />
                    </Box>
                  </Box>
                  <CustomTextField
                    error={state.error.workText}
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
        </Box>
      )}
    </form>
  );
};
export default General;
