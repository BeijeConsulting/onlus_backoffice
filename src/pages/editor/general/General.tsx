import { BaseSyntheticEvent, FC, useEffect, useState } from "react";

//Mui
import { Box } from "@mui/material";

//styles
import style from "./generalStyle.module.scss";
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
import { useTranslation } from 'react-i18next';

//api
import {
  getApiGeneral,
  putApiGeneral,
} from "../../../services/api/general/generalApi";

//interface\

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
    return data;
  };

  const componentReady = async (): Promise<any> => {
    const res = await fetchData();
    const data = res.data.attributes.general;
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

  function setPrimary(color: any): void {}

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

  const log = (params: any) => {
    console.log(params);
  };

  // async function fetchData(): Promise<void>{
  //    const data = await getApiGeneral();
  //    console.log(data);
  // }

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
                  placeholder="inserisci il nome per il tuo sito"
                  defaultValue={state.websiteName}
                />
              </LabelText>
              <LabelText>
                <Title
                  text="Logo"
                  textInfo="Qua va inserito il logo del tuo sito che sarà visibile anche ai visitatori"
                />
                <ButtonAddFile callback={handleImage} />
              </LabelText>
              <LabelText>
                <Title
                  text="Seleziona Palette"
                  textInfo="Qua vanno inseriti i colori del tuo sito visibile ai clienti, attenzione a mettere un buon contrasto tra lo sfondo e il testo"
                />
                <ColorPicker callback={log} bg="bgColorOne" txt="txtColorOne" />
                <ColorPicker callback={log} bg="bgColorOne" txt="txtColorOne" />
                <ColorPicker callback={log} bg="bgColorOne" txt="txtColorOne" />
              </LabelText>
            </Box>
            <Box className={common.right}>
              <LabelText>
                <Title
                  text="Sezione di contatti per lavoro"
                  textInfo="Qua vanno inseriti i contatti che veranno mostrati a tutti i visitatori del sito a fondo pagina che doovrebbero essere usati per scopi di lavoro"
                />
                <CustomTextField
                  error={state.error.workText}
                  placeholder="inserisci il testo"
                />
                <CustomTextField
                  error={state.error.workEmail}
                  placeholder="inserisci la tua email lavorativa"
                />
              </LabelText>
              <LabelText>
                <Title
                  text="Contatti"
                  textInfo="Questi saranno i contatti e le infomazioni su di te/la tua azienda. Saranno mostrati nel footer (fondo pagina) di ogni schermata del sito disponibile ai visitatori"
                />
                <CustomTextField
                  error={state.error.contactPhone}
                  placeholder="inserisci il tuo numero di telefono"
                />
                <CustomTextField
                  error={state.error.contactEmail}
                  placeholder="inserisci la tua email"
                />
                <CustomTextField
                  error={state.error.contactAdress}
                  placeholder="inserisci il tuo indirizzo"
                />
                <CustomTextField
                  error={state.error.contactVat}
                  placeholder="inserisci la tua partitia IVA"
                />
                <CustomTextField
                  error={state.error.contactCF}
                  placeholder="inserisci il tuo codice fiscale"
                />
              </LabelText>
            </Box>
          </Box>
          <Box className={common.doubleComponent}>
            <LabelText>
              <Title
                text="Banner in evidenza"
                textInfo="Qua va personalizzato il banner in evidenza delle call to action, i color vngono presi dalla palette che si può trovare più in alto della pagina"
              />
              <Box className={common.row}>
                <Box className={common.rowLeft}>
                  <CustomTextField
                    error={state.error.workText}
                    placeholder="inserisci il titolo"
                  />
                  <CustomTextField
                    error={state.error.workText}
                    minrow={5}
                    maxrow={5}
                    multiline={true}
                    placeholder="inserisci il sottotitolo"
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
                        placeholder="Inserisci call to action bottone primario"
                      />
                    </Box>
                    <Box style={{ width: "47%" }}>
                      <CustomTextField
                        error={state.error.workText}
                        placeholder="Inserisci call to action bottone secondario"
                      />
                    </Box>
                  </Box>
                  <CustomTextField
                    error={state.error.workText}
                    placeholder="link alla pagina"
                  />
                </Box>
              </Box>
            </LabelText>
          </Box>
          <ButtonGeneric
            callback={onSaveGeneral}
            color={common.saveButtonColor}
          >
            Salva Modifiche
          </ButtonGeneric>
          {state.open && (
            <CustomSnackbar
              message={"Modifiche ad info salvate con successo"}
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
