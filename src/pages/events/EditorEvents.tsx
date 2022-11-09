import { useState, FC, BaseSyntheticEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PAGES from "../../router/pages";

//MUI
import { Box, TextField } from "@mui/material";

//components
import CustomTextField from "../../components/functional/textField/CustomTextField";
import LabelText from "../../components/functional/labelText/LabelText";
import Title from "../../components/functional/title/Title";
import ButtonGeneric from "../../components/functional/buttonGeneric/ButtonGeneric";
import ButtonAddFile from "../../components/functional/buttonAddFile/ButtonAddFile";

//date picker
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

//style
import common from "../../assets/styles/common.module.scss";
import editorStyle from "./eventEditorStyle.module.scss";

interface state {
  selectedDate: any;
}

const initialState: state = {
  selectedDate: dayjs(),
};

const EditorEvents: FC = () => {
  const [state, setState] = useState(initialState);

  const navigate = useNavigate();
  const location = useLocation();

  //torno alla pagina eventi
  const onCancel = (): void => {
    navigate(PAGES.events)
  }

  //salvo le modifiche
  const onSave = (e: BaseSyntheticEvent): void => {    
    if(location?.state?.showAdd){
      navigate(PAGES.events, { state: { openAdd: true } });
    }else{
      navigate(PAGES.events, { state: { open: true } });
    } 
  };

  return (
    <form>
      <Box className={common.component}>
        <Box className={common.doubleComponent}>


          <Box className={common.left}>
            <LabelText>
              <Title
                text={"Titolo"}
                textInfo={"Inserisci il titolo dell'evento"}
              />
              <CustomTextField placeholder={"Titolo"} error={false} />
            </LabelText>

            <LabelText>
              <Title
                text={"Data e ora"}
                textInfo={"Inserisci la data e l'ora dell'evento"}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField size="small" {...props} />}
                  label="Seleziona"
                  value={state.selectedDate}
                  onChange={(newValue) => {
                    setState({
                      ...state,
                      selectedDate: newValue,
                    });
                  }}
                />
              </LocalizationProvider>
            </LabelText>

            <LabelText>
              <Title
                text={"Descrizione"}
                textInfo={"Inserisci una descrizione esplicativa dell'evento"}
              />
              <CustomTextField
                placeholder={"Inserisci testo"}
                error={false}
                multiline={true}
                minrow={6}
              />
            </LabelText>
          </Box>
          <Box className={common.right}>
            <LabelText>
              <Title
                text={"Copertina"}
                textInfo={"Inserisci una foto di copertina per l'evento"}
              />
              <ButtonAddFile
                callback={() => { console.log('ciao') }}
              />
            </LabelText>

            <LabelText>
              <Title
                text={"Luogo"}
                textInfo={"Inserisci il luogo in cui si svolgerà l'evento"}
              />
              <CustomTextField
                placeholder={"Inserisci indirizzo"}
                error={false}
              />
            </LabelText>

            <LabelText>
              <Title
                text={"Requisiti"}
                textInfo={"Specifica i requisiti per partecipare all'evento"}
              />
              <CustomTextField
                placeholder={"Inserisci testo"}
                error={false}
                multiline={true}
                minrow={6}
              />
            </LabelText>

            <Box className={editorStyle.buttonsContainer}>
              {location?.state?.showAdd ? (
                <>
                  <ButtonGeneric
                    color={"green"}
                    callback={onSave}
                  >
                    Aggiungi
                  </ButtonGeneric>
                  <ButtonGeneric
                    color={common.secondaryColor}
                    callback={onCancel}
                  >
                    Annulla
                  </ButtonGeneric>
                </>
              ) : (
                <>
                  <ButtonGeneric
                    color={common.saveButtonColor}
                    callback={onSave}
                  >
                    Salva modifiche
                  </ButtonGeneric>
                  <ButtonGeneric
                    color={common.secondaryColor}
                    callback={onCancel}
                  >
                    Annulla modifiche
                  </ButtonGeneric>
                </>
              )}
            </Box>
          </Box>


        </Box>
      </Box >
    </form>
  );
};

export default EditorEvents;