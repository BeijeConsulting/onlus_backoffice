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
}

const initState: State = {
  answerError: false,
  questionError: false,
};

const EditorFaq: FC = (): JSX.Element => {
  const [error, setError] = useState<State>(initState);

  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

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

    setError({
      questionError: questionErr,
      answerError: answerErr,
    });

    if (!questionErr && !answerErr) {
      let qna: QNA = {
        question: e.target.form[0].value,
        answer: e.target.form[2].value,
      };

      console.log(qna);

      //controlla se bisogna fare PUT o POST
      if(!!location?.state?.row?.id){
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
  }

  //PutAPI
  const putApi = async (id: number, qna: QNA): Promise<void> => {
    let res = await fetchData(putQnaBydId, id, qna)
    console.log("QNA: ", res)
  }

  //Funzione per cancellare l'operazione
  const onCancel = (): void => {
    navigate(PAGES.editFaq);
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
                error={error.answerError}
                placeholder={t("FaqEditor.question")}
              />

              <CustomTextField
                defaultValue={
                  !!location?.state?.row?.answer
                    ? location?.state?.row?.answer
                    : ""
                }
                errorMessage="Inserisci una risposta"
                error={error.questionError}
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
    </Box>
  );
};

export default EditorFaq;
