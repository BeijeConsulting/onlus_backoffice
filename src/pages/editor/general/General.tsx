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

//api
import {
  getApiGeneral,
  putApiGeneral,
} from "../../../services/api/general/generalApi";

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
  websiteName: string;
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
  websiteName: "",
  open: false,
};

const General: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);
  const { t, i18n } = useTranslation();

  const fetchData = async (): Promise<any> => {
    const data = await getApiGeneral();
    console.log(data);

    return data;
  };

  const componentReady = async (): Promise<any> => {
    const res = await fetchData();
    const data = res.data;
    console.log(data);
    setState({
      ...state,
      websiteName: data.websiteName,
      ready: true,
    });
  };

  useEffect(() => {
    componentReady();
  }, []);
  const handleImage = (): void => {};

  async function updateData(e: BaseSyntheticEvent): Promise<void> {
    console.log(state.websiteName);
    const form = e.target.form;
    console.log(e);

    const newData = {
      data: {
        general: {
          websiteName: form[0].value,
          logo: "https://st2.depositphotos.com/1035649/10943/v/600/depositphotos_109435792-stock-illustration-panda-bear-template.jpg",
          palette: [
            {
              name: "primary",
              bgColor: "#262E36",
              textColor: "#fff",
            },
            {
              name: "secondary",
              bgColor: "#B12009",
              textColor: "#000",
            },
            {
              name: "tertiary",
              bgColor: "#CFC36F",
              textColor: "#000",
            },
          ],
          contacts: {
            phone: 3395039550,
            email: "panda@gmail.com",
            address: "Via Ticino 7, Milano",
            PIva: "0000000034345345345",
            CF: "1111111134345345345",
          },
          sectionWork: {
            text: "Lorem esgrasegareg",
            email: "panda.info@gmail.com",
          },
          banner: {
            title: "Titolo del banner",
            subtitle: "Sottotitolo del banner",
            btnText1: "testo1",
            btnText2: "testo2",
            link: "panda.com",
          },
        },
      },
    };

    putApiGeneral(newData);
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

  //funzione di comodo
  const log = (params: any) => {
    console.log(params);
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
                  defaultValue={state.websiteName}
                />
              </LabelText>
              <LabelText>
                <Title text="Logo" textInfo={t("general.logo.info")} />
                <ButtonAddFile callback={handleImage} />
              </LabelText>
              <LabelText>
                <Title
                  text={t("general.palettes.title")}
                  textInfo={t("general.palettes.info")}
                />
                <ColorPicker
                  callback={log}
                  bg="bgColorOne"
                  txt="txtColorOne"
                  background={t("general.palettes.primary.background")}
                  text={t("general.palettes.primary.text")}
                />
                <ColorPicker
                  callback={log}
                  bg="bgColorOne"
                  txt="txtColorOne"
                  background={t("general.palettes.secondary.background")}
                  text={t("general.palettes.secondary.text")}
                />
                <ColorPicker
                  callback={log}
                  bg="bgColorOne"
                  txt="txtColorOne"
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
                />
                <CustomTextField
                  error={state.error.workEmail}
                  placeholder={t("general.workSection.placeholderEmail")}
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
                />
                <CustomTextField
                  error={state.error.contactEmail}
                  placeholder={t("general.contacts.placeholderEmail")}
                />
                <CustomTextField
                  error={state.error.contactAdress}
                  placeholder={t("general.contacts.placeholderAddress")}
                />
                <CustomTextField
                  error={state.error.contactVat}
                  placeholder={t("general.contacts.placeholderCf")}
                />
                <CustomTextField
                  error={state.error.contactCF}
                  placeholder={t("general.contacts.placeholderIva")}
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
                  />
                  <CustomTextField
                    error={state.error.workText}
                    minrow={5}
                    maxrow={5}
                    multiline={true}
                    placeholder={t("general.banner.placeholderSubtitle")}
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
                      />
                    </Box>
                    <Box style={{ width: "47%" }}>
                      <CustomTextField
                        error={state.error.workText}
                        placeholder={t(
                          "general.banner.placeholderCallToAction"
                        )}
                      />
                    </Box>
                  </Box>
                  <CustomTextField
                    error={state.error.workText}
                    placeholder={t("general.banner.placeholderLink")}
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
