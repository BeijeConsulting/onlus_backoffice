import { FC, useState, useEffect, BaseSyntheticEvent } from "react";

//api
import {
  getApiSupport,
  putApiSupport,
  postApiSupport
} from "../../../services/api/supportUs/supportUsApi";

//components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//data
import { fetchData } from "../../../utils/fetchData";

//mui
import { Box, Link } from "@mui/material";

//style
import style from "../../../assets/styles/common.module.scss";

//translation
import { useTranslation } from "react-i18next";

//types
import { Support, SupportContent } from "../../../utils/mockup/types";

//interface
interface State {
  ready: boolean;
  addLeft: Array<SupportContent>;
  addRight: Array<SupportContent>;
  error: Array<boolean>;
  supportContentError: Array<boolean>;
  snackIsOpen: boolean;
  snackErrorIsOpen: boolean;
  snackWarningIsOpen: boolean;
  support: Support;
}

const initialState: State = {
  ready: false,
  addLeft: [],
  addRight: [],
  error: [],
  supportContentError: [],
  snackIsOpen: false,
  snackErrorIsOpen: false,
  snackWarningIsOpen: false,
  support: {
    content: [],
    hero: {
      mediaContent: "",
      mediaTitle: "",
      mediaType: "",
      subtitle: "",
      text: "",
    },
    title: {
      id: null,
      title: "",
    },
  },
};

const SupportUs: FC = (): JSX.Element => {
  const [state, setState] = useState(initialState);
  const { t } = useTranslation();

  let indSx: number = 0
  let indDx: number = 1

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
      snackErrorIsOpen: false,
      snackWarningIsOpen: false,
    });
  };

  //component did mount
  useEffect(() => {
    getData();
  }, []);

  //fetchAPI
  const getData = async (): Promise<void> => {
    let addLeft: Array<SupportContent> = [];
    let addRight: Array<SupportContent> = [];
    let supportContentError: Array<boolean> = [];

    let support: Support = {
      content: [],
      hero: {
        mediaContent: "",
        mediaTitle: "",
        mediaType: "",
        subtitle: "",
        text: "",
      },
      title: {
        id: null,
        title: "",
      },
    };

    //se sto modificando
    let dataSupport = await fetchData(getApiSupport);
    console.log("Support", dataSupport.data);

    support = {
      content: dataSupport.data.content,
      hero: dataSupport.data.hero,
      title: dataSupport.data.title,
    };

    for (let i = 0; i < support.content.length; i++)
      supportContentError.push(false);

    for (let i = 2; i < dataSupport.data.content.length; i++) {
      if (i % 2 !== 0)
        addLeft.push({
          id: support.content[i].id,
          mediaContent: support.content[i].mediaContent,
          mediaTitle: support.content[i].mediaTitle,
          mediaType: support.content[i].mediaType,
          paragraph: support.content[i].paragraph
        });
      else
        addRight.push({
          id: support.content[i].id,
          mediaContent: support.content[i].mediaContent,
          mediaTitle: support.content[i].mediaTitle,
          mediaType: support.content[i].mediaType,
          paragraph: support.content[i].paragraph
        });
    }

    indSx = 0
    indDx = 1

    setState({
      ...state,
      support: support,
      supportContentError: supportContentError,
      error: [false, false, false, false],
      ready: true,
      addLeft: addLeft,
      addRight: addRight,
    });
  };

  //ritorno l'elemento con il contenuto
  const getContent = (content: SupportContent = null,key: number = null,index: number): JSX.Element => {
    return (
      <LabelText key={key}>
        <Title
          text={t("Support.Content.title")}
          textInfo={t("Support.Content.info")}
        />
        <CustomTextField
          error={state.supportContentError[index]}
          minrow={3}
          maxrow={10}
          multiline={true}
          placeholder={t("Support.Content.placeholderText")}
          defaultValue={content?.paragraph}
        />
        <ButtonAddFile
          callback={log}
          error={state.supportContentError[index]}
          mediaContent={state?.support?.content[index]?.mediaContent}
          mediaTitle={state?.support?.content[index]?.mediaTitle}
          mediaType={state?.support?.content[index]?.mediaType}
          customKey={key}
        ></ButtonAddFile>
      </LabelText>
    );
  };

  //aggiungo un altro slot contenuto
  const addSlot = async (): Promise<void> => {
    let supportContentError: Array<boolean> = state.supportContentError;
    supportContentError.push(true);
    await setSupportContentError(supportContentError);

    let left: Array<SupportContent> = state.addLeft;
    let right: Array<SupportContent> = state.addRight;
    if (left.length === right.length) {
      //aggiungo a sinistra
      left.push({
        id: state?.support?.content[state.supportContentError.length]?.id + 1,
        mediaContent: "",
        mediaType: "",
        mediaTitle: "",
        paragraph: ""
      });
    }
    //aggiungo a destra
    else {
      right.push({
        id: state?.support?.content[state.supportContentError.length]?.id + 1,
        mediaContent: "",
        mediaType: "",
        mediaTitle: "",
        paragraph: ""
      });
    }

    setState({
      ...state,
      addLeft: left,
      addRight: right,
    });
  };

  //elimino l'ultimo slot
  const deleteSlot = (): void => {
    let supportContentError: Array<boolean> = state.supportContentError;
    let left: Array<SupportContent> = state.addLeft;
    let right: Array<SupportContent> = state.addRight;
    let support: Support = state.support;

    if (left.length === right.length) {
      //tolgo a destra
      right.pop();
    }
    //tolgo a sinistra
    else {
      left.pop();
    }

    support.content.pop();
    supportContentError.pop();

    setState({
      ...state,
      support: support,
      addLeft: left,
      addRight: right,
      supportContentError: supportContentError,
    });
  };

  //aggiorno lo stato che contiente gli errori
  const setSupportContentError = async (
    supportContentError: Array<boolean>
  ): Promise<void> => {
    setState({
      ...state,
      supportContentError: supportContentError,
    });
  };

  //salvo
  const onSave = (e: BaseSyntheticEvent): void => {
    let support: Support = {
      content: [
        {
          id: state?.support?.content[0]?.id,
          mediaContent: e.target.form[11 + state.addLeft.length * 4].name.split(" ")[0],
          mediaTitle: e.target.form[11 + state.addLeft.length * 4].name.split(" ")[1],
          mediaType: e.target.form[11 + state.addLeft.length * 4].name.split(" ")[2],
          paragraph: e.target.form[8 + state.addLeft.length * 4].value
        },
        {
          id: state?.support?.content[1]?.id,
          mediaContent: e.target.form[11 + state.addLeft.length * 4 + 4].name.split(" ")[0],
          mediaTitle: e.target.form[11 + state.addLeft.length * 4 + 4].name.split(" ")[1],
          mediaType: e.target.form[11 + state.addLeft.length * 4 + 4].name.split(" ")[2],
          paragraph: e.target.form[8 + state.addLeft.length * 4 + 4].value,
        },
      ],
      hero: {
        mediaContent: e.target.form[0].name.split(" ")[0],
        mediaTitle: e.target.form[0].name.split(" ")[1],
        mediaType: e.target.form[0].name.split(" ")[2],
        subtitle: e.target.form[1].value,
        text: e.target.form[3].value,
      },
      title: {
        id: state.support.title.id,
        title: e.target.form[6].value,
      },
    };

    //aggiungo i contenuti dinamici
    support.content = getDynamicSupportContents(support, e);

    //gestisco gli errori
    let error: Array<boolean> = handleErrors(support);
    let supportContentError: Array<boolean> = handleContentErrors(support);
    let errors: boolean = getErrors(error);
    let supportContentErrors: boolean = getErrors(supportContentError);

    console.log(error, state.error);
    if (!errors && !supportContentErrors) {
      //update
      updateSupport(support, error, supportContentError);
    } else {
      indSx = 0
      indDx = 1
      setState({
        ...state,
        snackErrorIsOpen: true,
        error: error,
        supportContentError: supportContentError,
      });
    }
  };

  //gestisco i contenuti dinamici
  const getDynamicSupportContents = (support: Support,e: BaseSyntheticEvent): Array<SupportContent> => {
    let contentLeft: Array<SupportContent> = [];
    let contentRight: Array<SupportContent> = [];
    let contentIndex: number = 2;

    //sx
    for (let i = 0; i < state.addLeft.length; i++) {
      contentLeft.push({
        id: state.support.content[contentIndex].id,
        mediaContent: e.target.form[11 + 4 * i].name.split(" ")[0],
        mediaTitle: e.target.form[11 + 4 * i].name.split(" ")[1],
        mediaType: e.target.form[11 + 4 * i].name.split(" ")[2],
        paragraph: e.target.form[8 + 4 * i].value,
      });
      contentIndex += 2;
    }

    contentIndex = 3;
    //dx
    for (let i = 0; i < state.addRight.length; i++) {
      contentRight.push({
        id: state.support.content[contentIndex].id,
        mediaContent: e.target.form[11 + state.addLeft.length * 4 + 4 * i + 8].name.split(" ")[0],
        mediaTitle: e.target.form[11 + state.addLeft.length * 4 + 4 * i + 8].name.split(" ")[1],
        mediaType: e.target.form[11 + state.addLeft.length * 4 + 4 * i + 8].name.split(" ")[2],
        paragraph: e.target.form[8 + state.addLeft.length * 4 + 4 * i + 8].value,
      });
      contentIndex += 2;
    }
    //aggiungo sx e dx al content
    for (let i = 0; i < contentLeft.length; i++) {
      support.content.push(contentLeft[i]);
      if (i < contentRight.length) support.content.push(contentRight[i]);
    }
    return support.content;
  };

  //gestisco gli errori
  const handleErrors = (support: Support): Array<boolean> => {
    let error: Array<boolean> = [false, false];

    if (support.hero.mediaContent.length === 0) error[0] = true;
    if (support.hero.subtitle.length === 0) error[1] = true;
    if (support.hero.text.length === 0) error[2] = true;
    if (support.title.title.length === 0) error[3] = true;

    return error;
  };

  //gestisco gli errori del content
  const handleContentErrors = (support: Support): Array<boolean> => {
    let supportContentError: Array<boolean> = [];

    for (let i = 0; i < support.content.length; i++) {
      if (
        support.content[i].paragraph.length === 0 ||
        support.content[i].mediaContent.length === 0
      )
        supportContentError[i] = true;
      else supportContentError[i] = false;
    }

    return supportContentError;
  };

  //ritorno true se l'array è composto da tutti true o viceversa
  const getErrors = (error: Array<boolean>): boolean => {
    let errors: boolean = false;
    for (let i = 0; i < error.length; i++) {
      if (error[i]) {
        errors = true;
      }
    }
    return errors;
  };

  //modifico support
  const updateSupport = async (support: Support,error: Array<boolean>,supportContentError: Array<boolean>): Promise<void> => {
    console.log("Support prima di aggiornare",support)
    let response = await postApiSupport(support);
    handleUpdateResponse(response.status, error, supportContentError, support);
  };

  //gestisco la risposta all'eliminazione dell'articolo
  const handleUpdateResponse = async (status: number,error: Array<boolean>,supportContentError: Array<boolean>, support: Support) => {
    let snack: boolean = state.snackIsOpen;
    let snackWarning: boolean = state.snackWarningIsOpen;
    let snackError: boolean = state.snackErrorIsOpen;
    let response: any = {};

    console.log(status);
    if (status === 200) {
      response = await fetchData(getApiSupport);
      console.log("Support", response.data);
      support = response.data
      snack = true;
    } else if (status === 500 || status === undefined) 
      snackWarning = true;
    else 
      snackError = true;

    setState({
      ...state,
      snackIsOpen: snack,
      snackWarningIsOpen: snackWarning,
      snackErrorIsOpen: snackError,
      support: support,
      error: error,
      supportContentError: supportContentError,
    });
  };

  //stampo l'immagine caricata
  const log = (mediaContent: string, mediaTitle: string, mediaType: string): void => {

  };

  return (
    <Box>
      {state?.ready && (
        <>
          <form onSubmit={onSave}>
            <Box className={style.component}>
              <Box className={style.doubleComponent}>
                <Box className={style.left}>
                  {/*hero*/}
                  <LabelText>
                    <Title
                      text={t("Support.Hero.title")}
                      textInfo={t("Support.Hero.info")}
                    />
                    <ButtonAddFile
                      callback={log}
                      error={state?.error[0]}
                      mediaContent={state?.support?.hero?.mediaContent}
                      mediaTitle={state?.support?.hero?.mediaTitle}
                      mediaType={state?.support?.hero?.mediaType}
                      customKey={999}
                    ></ButtonAddFile>
                    <CustomTextField
                      error={state?.error[1]}
                      placeholder={t("Support.Hero.placeholderText")}
                      defaultValue={state?.support?.hero?.subtitle}
                    />
                    <CustomTextField
                      error={state?.error[2]}
                      minrow={7}
                      maxrow={10}
                      multiline={true}
                      placeholder={t("Support.Hero.placeholderText")}
                      defaultValue={state?.support?.hero?.text}
                    />
                  </LabelText>
                  {/*titolo*/}
                  <LabelText>
                    <Title
                      text={t("Support.Title.title")}
                      textInfo={t("Support.Title.info")}
                    />
                    <CustomTextField
                      error={state?.error[3]}
                      placeholder={t("Support.Title.placeholderTitle")}
                      defaultValue={state?.support?.title?.title}
                    />
                  </LabelText>
                  {/*contenuto*/}
                  {state?.addLeft?.map((element: SupportContent) => {
                    indSx += 2
                    return getContent(element, element?.id, indSx)
                  })}
                </Box>

                <Box className={style.right}>
                  {/*contenuto*/}
                  {getContent(state?.support?.content[0], 0, 0)}
                  {getContent(state?.support?.content[1], 1, 1)}
                  {state?.addRight?.map((element: SupportContent) => {
                    indDx += 2
                    return getContent(element, element?.id, indDx)
                  })}
                  {/*link*/}
                  <Link
                    color="#000000"
                    variant="body2"
                    onClick={addSlot}
                    sx={{ cursor: "pointer" }}
                  >
                    {t("link")}
                  </Link>
                  {/*link*/}
                  {state?.addLeft?.length > 0 && (
                    <Link
                      color="#000000"
                      variant="body2"
                      onClick={deleteSlot}
                      sx={{ cursor: "pointer" }}
                    >
                      {t("deleteSlot")}
                    </Link>
                  )}
                  {/*salva modifiche*/}
                  <ButtonGeneric color={"rgb(25, 118, 210)"} callback={onSave}>
                    {t("saveButton")}
                  </ButtonGeneric>
                </Box>
              </Box>
              {state?.snackIsOpen && (
                <CustomSnackbar
                  message={t("changesSnack")}
                  severity={"success"}
                  callback={handleClose}
                />
              )}
              {state?.snackErrorIsOpen && (
                <CustomSnackbar
                  message={t("responseErrorSnack")}
                  severity={"error"}
                  callback={handleClose}
                />
              )}
              {state?.snackWarningIsOpen && (
                <CustomSnackbar
                  message={t("responseWarningSnack")}
                  severity={"warning"}
                  callback={handleClose}
                />
              )}
            </Box>
          </form>
        </>
      )}
    </Box>
  );
};

export default SupportUs;
