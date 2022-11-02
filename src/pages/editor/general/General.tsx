import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

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

//interface
interface State {
  nameSiteError: boolean;
  workTextError: boolean;
  workEmailError: boolean;
  contactPhoneError: boolean;
  contactEmailError: boolean;
  contactAdressError: boolean;
  contactVatError: boolean;
  contactCFError: boolean;
}

const initState: State = {
  nameSiteError: false,
  workTextError: false,
  workEmailError: false,
  contactPhoneError: false,
  contactEmailError: false,
  contactAdressError: false,
  contactVatError: false,
  contactCFError: false,
};

const General: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);

  const handleImage = (): void => {};

  const log = (params: any) => {
    console.log(params);
  };

  return (
    <Box className={common.component}>
      <Box className={common.doubleComponent}>
        <Box className={common.left}>
          <LabelText>
            <Title
              text="Nome Sito"
              textInfo="Qua va inserito il nome del tuo sito, che sarà visibile a tutti i visitatori del sito"
            />
            <CustomTextField
              error={state.nameSiteError}
              placeholder="inserisci il nome per il tuo sito"
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
              error={state.workTextError}
              placeholder="inserisci il testo"
            />
            <CustomTextField
              error={state.workEmailError}
              placeholder="inserisci la tua email lavorativa"
            />
          </LabelText>
          <LabelText>
            <Title
              text="Contatti"
              textInfo="Questi saranno i contatti e le infomazioni su di te/la tua azienda. Saranno mostrati nel footer (fondo pagina) di ogni schermata del sito disponibile ai visitatori"
            />
            <CustomTextField
              error={state.contactPhoneError}
              placeholder="inserisci il tuo numero di telefono"
            />
            <CustomTextField
              error={state.contactEmailError}
              placeholder="inserisci la tua email"
            />
            <CustomTextField
              error={state.contactAdressError}
              placeholder="inserisci il tuo indirizzo"
            />
            <CustomTextField
              error={state.contactVatError}
              placeholder="inserisci la tua partitia IVA"
            />
            <CustomTextField
              error={state.contactCFError}
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
                error={state.workTextError}
                placeholder="inserisci il titolo"
              />
              <CustomTextField
                error={state.workTextError}
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
                    error={state.workTextError}
                    placeholder="Inserisci call to action bottone primario"
                  />
                </Box>
                <Box style={{ width: "47%" }}>
                  <CustomTextField
                    error={state.workTextError}
                    placeholder="Inserisci call to action bottone secondario"
                  />
                </Box>
              </Box>
              <CustomTextField
                error={state.workTextError}
                placeholder="link alla pagina"
              />
            </Box>
          </Box>
        </LabelText>
      </Box>
      <ButtonGeneric callback={log} color="#a4b3ad">
        Salva Modifiche
      </ButtonGeneric>
    </Box>
  );
};
export default General;
