import React, { FC, useState } from "react";

//Navigazione
import { useLocation, useNavigate } from "react-router-dom";
import PAGES from "../../../router/pages";

//Style
import common from "../../../assets/styles/common.module.scss";
import style from "./faq.module.scss";

//MUI
import { Box } from '@mui/system';

//Components
import LabelText from '../../../components/functional/labelText/LabelText';
import Title from '../../../components/functional/title/Title';
import CustomTextField from '../../../components/functional/textField/CustomTextField';
import ButtonGeneric from '../../../components/functional/buttonGeneric/ButtonGeneric';

interface State {
  answerError: boolean;
  questionError: boolean;
}

const initState: State = {
  answerError: false,
  questionError: false,
};

const EditorFaq: FC = (): JSX.Element => {

  const [error, setError] = useState<State>(initState);

  const navigate = useNavigate();
  const location = useLocation()
  console.log(location)

  //Funzione per salvare domanda e risposta
  const onSaveQna = (e: any): void => {

    let answerErr = false;
    let questionErr = false;

    if (e.target.form[0].value === "") {
      answerErr = true;
    }

    if (e.target.form[2].value === "") {
      questionErr = true;
    }

    setError({
      answerError: answerErr,
      questionError: questionErr,
    })

    if (!answerErr && !questionErr) {
      let qna = {
        answer: e.target.form[0].value,
        question: e.target.form[2].value,
      };

      console.log(qna);
      navigate(PAGES.editFaq, {state: {open:true}})
    }
  }

  //Funzione per cancellare l'operazione
  const onCancel = (): void => {
    navigate(PAGES.editFaq)
  }

  return (
    <Box className={common.component}>
      <Box className={common.singleComponent}>
        <form>
          <LabelText>
            <Title text={"Faq"} textInfo={"Aggiungi una nuova domanda e risposta, clicca sul pulsante Salva modifiche per completare l'operazione oppure clicca sul pulsante Annulla modifiche per cancellare l'operazione"} />

            <Box className={style.editorFaqBox}>
              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.question ? location?.state?.row?.question : ""
                }
                errorMessage="Inserisci una domanda"
                error={error.answerError}
                placeholder={'Domanda frequente'}
              />

              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.answer ? location?.state?.row?.answer : ""
                }
                errorMessage="Inserisci una risposta"
                error={error.questionError}
                placeholder={'Inserisci una risposta...'}
                minrow={12}
                maxrow={20}
                multiline={true}
              />
            </Box>
          </LabelText>

          <Box className={style.buttonsContainer}>
            <ButtonGeneric color={common.saveButtonColor} callback={onSaveQna}>
              Salva modifiche
            </ButtonGeneric>

            <ButtonGeneric color={common.secondaryColor} callback={onCancel}>
              Annulla modifiche
            </ButtonGeneric>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default EditorFaq;

