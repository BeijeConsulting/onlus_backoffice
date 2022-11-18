import { FC, useState, BaseSyntheticEvent } from "react";

//Navigazione
import { useLocation, useNavigate } from "react-router-dom";
import PAGES from "../../../router/pages";

//Style
import common from "../../../assets/styles/common.module.scss";
import style from "./faq.module.scss";

//MUI
import { Box } from "@mui/system";

//Components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//API
import { fetchData } from "../../../utils/fetchData";
import { putQnaBydId, postQna } from "../../../services/api/faq/faqApi";

//Translation
import { useTranslation } from "react-i18next";

type QNA = {
  question: string;
  answer: string;
}

interface State {
  answerError: boolean;
  questionError: boolean;
  snackErrorIsOpen: boolean;
  snackWarningIsOpen: boolean;
}

const initState: State = {
  answerError: false,
  questionError: false,
  snackErrorIsOpen: false,
  snackWarningIsOpen: false,
};

const EditorFaq: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);

  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  //Funzione per salvare domanda e risposta
  const onSaveQna = async (e: BaseSyntheticEvent): Promise<void> => {
    let questionErr = false;
    let answerErr = false;

    if (e.target.form[0].value === "") {
      questionErr = true;
    }

    if (e.target.form[2].value === "") {
      answerErr = true;
    }

    setState({
      ...state,
      questionError: questionErr,
      answerError: answerErr,
    });

    if (!questionErr && !answerErr) {
      let qna: QNA = {
        question: e.target.form[0].value,
        answer: e.target.form[2].value,
      };

      //controlla se bisogna fare PUT o POST
      if (!!location?.state?.row?.id) {
        await putApi(location?.state?.row?.id, qna)
      } else {
        await postApi(qna)
      }

      if (location?.state?.showAdd) {
        navigate(PAGES.editFaq, { state: { openAdd: true } });
      } else {
        navigate(PAGES.editFaq, { state: { open: true } });
      }
    }
  };

  //PostAPI
  const postApi = async (qna: QNA): Promise<void> => {
    let res = await fetchData(postQna, qna)
    console.log("QNA: ", res)
    handleResponse(res.status)
  }

  //PutAPI
  const putApi = async (id: number, qna: QNA): Promise<void> => {
    let res = await fetchData(putQnaBydId, id, qna)
    console.log("QNA: ", res)
    handleResponse(res.status)
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

  //Funzione per cancellare l'operazione
  const onCancel = (): void => {
    navigate(PAGES.editFaq);
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
    <Box className={common.component}>
      <Box className={common.singleComponent}>
        <form>
          <LabelText>
            <Title text={t("FaqEditor.title")} textInfo={t("FaqEditor.info")} />

            <Box className={style.editorFaqBox}>
              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.question
                    ? location?.state?.row?.question
                    : ""
                }
                errorMessage="Inserisci una domanda"
                error={state.answerError}
                placeholder={t("FaqEditor.question")}
              />

              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.answer
                    ? location?.state?.row?.answer
                    : ""
                }
                errorMessage="Inserisci una risposta"
                error={state.questionError}
                placeholder={t("FaqEditor.answer")}
                minrow={12}
                maxrow={20}
                multiline={true}
              />
            </Box>
          </LabelText>

          <Box className={style.buttonsContainer}>
            {location?.state?.showAdd ? (
              <>
                <ButtonGeneric color={"green"} callback={onSaveQna}>
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
                <ButtonGeneric
                  color={common.saveButtonColor}
                  callback={onSaveQna}
                >
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
        </form>
      </Box>
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
  );
};

export default EditorFaq;
