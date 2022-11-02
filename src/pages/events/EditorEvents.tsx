import { useState, useEffect, FC } from "react";

//MUI
import { Box, TextField } from "@mui/material";

//components
import CustomTextField from "../../components/functional/textField/CustomTextField";
import LabelText from "../../components/functional/labelText/LabelText";
import Title from "../../components/functional/title/Title";
import ButtonGeneric from "../../components/functional/buttonGeneric/ButtonGeneric";
import ButtonAddFile from "../../components/functional/buttonAddFile/ButtonAddFile";

//date picker
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

//style
import style from "../../assets/styles/common.module.scss";
import editorStyle from "./eventEditorStyle.module.scss";

interface editorEventProps {}

interface state {
  selectedDate: any,
  buttonColor: string,
}

const initialState: state = {
  selectedDate: dayjs(),
  buttonColor: style.ternaryColor,
};



const EditorEvents: FC<editorEventProps> = (props: any) => {
  const [state, setState] = useState(initialState);

  // useEffect(()=>{
  //   console.log(state.selectedDate.$d);
    
  // },[state.selectedDate])

  return (
      <Box className={style.component}>
        <Box className={style.doubleComponent}>
          <Box className={style.left}>
            <Box className={editorStyle.leftContainer}>
              {/* <LabelText>
                <Title
                    text={"Titolo"}
                    textInfo={"Inserisci il titolo dell'evento"}
                  />
                  {state.selectedDate}
              </LabelText> */}
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
                    renderInput={(props) => (
                      <TextField size="small" {...props} />
                    )}
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
          </Box>
          <Box className={style.right}>
            <Box className={editorStyle.leftContainer}>
              <LabelText>
                <Title
                  text={"Copertina"}
                  textInfo={"Inserisci una foto di copertina per l'evento"}
                />
                <ButtonAddFile
                  callback={() => {
                    console.log("ciao");
                  }}
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
            </Box>
            <Box className={editorStyle.buttonsContainer}>
              <ButtonGeneric
                color={state.buttonColor}
                callback={() => {
                  console.log("ciao");
                }}
              >
                Salva modifiche
              </ButtonGeneric>

              <ButtonGeneric
                color={style.secondaryColor}
                callback={() => {
                  console.log("ciao");
                }}
              >
                Elimina evento
              </ButtonGeneric>
            </Box>
          </Box>
        </Box>
      </Box>

  );
};

export default EditorEvents;
