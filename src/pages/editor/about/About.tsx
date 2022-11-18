import { FC, useState, useEffect, BaseSyntheticEvent } from "react";

//api
import { getApiAbout, postApiAbout} from "../../../services/api/about/aboutApi";

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
import { AboutType, AboutContent } from "../../../utils/mockup/types";

//interface
interface State {
  ready: boolean;
  addLeft: Array<AboutContent>;
  addRight: Array<AboutContent>;
  error: Array<boolean>;
  aboutContentError: Array<boolean>;
  snackIsOpen: boolean;
  snackErrorIsOpen: boolean;
  snackWarningIsOpen: boolean;
  about: AboutType;
}

const initialState: State = {
  ready: false,
  addLeft: [],
  addRight: [],
  error: [],
  aboutContentError: [],
  snackIsOpen: false,
  snackErrorIsOpen: false,
  snackWarningIsOpen: false,
  about: {
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
  }
};

const About: FC = (): JSX.Element => {
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
    let addLeft: Array<AboutContent> = [];
    let addRight: Array<AboutContent> = [];
    let aboutContentError: Array<boolean> = [];

    let about: AboutType = null

    let dataAbout = await fetchData(getApiAbout);
    console.log("About", dataAbout.data);

    about = {
      content: dataAbout.data.content,
      hero: dataAbout.data.hero,
      title: dataAbout.data.title,
    };

    for (let i = 0; i < about.content.length; i++)
      aboutContentError.push(false);

    for (let i = 2; i < dataAbout.data.content.length; i++) {
      if (i % 2 === 0)
        addLeft.push({
          id: about.content[i].id,
          mediaContent: about.content[i].mediaContent,
          mediaTitle: about.content[i].mediaTitle,
          mediaType: about.content[i].mediaType,
          paragraph: about.content[i].paragraph
        })
      else
        addRight.push({
          id: about.content[i].id,
          mediaContent: about.content[i].mediaContent,
          mediaTitle: about.content[i].mediaTitle,
          mediaType: about.content[i].mediaType,
          paragraph: about.content[i].paragraph
        });
    }

    indSx = 0
    indDx = 1

    setState({
      ...state,
      about: about,
      aboutContentError: aboutContentError,
      error: [false, false, false],
      ready: true,
      addLeft: addLeft,
      addRight: addRight,
    });
  };

  //ritorno l'elemento con il contenuto
  const getContent = (content: AboutContent = null, key: number = null, index: number): JSX.Element => {
    return (
      <LabelText key={key}>
        <Title
          text={t("About.Content.title")}
          textInfo={t("About.Content.info")}
        />
        <CustomTextField
          error={state?.aboutContentError[index]}
          minrow={3}
          maxrow={10}
          multiline={true}
          placeholder={t("About.Content.placeHolderText")}
          defaultValue={content?.paragraph}
        />
        <ButtonAddFile
          callback={log}
          error={state?.aboutContentError[index]}
          mediaContent={state?.about?.content[index]?.mediaContent}
          mediaTitle={state?.about?.content[index]?.mediaTitle}
          mediaType={state?.about?.content[index]?.mediaType}
          customKey={key}
        ></ButtonAddFile>
      </LabelText>
    );
  };

  //aggiungo un altro slot contenuto
  const addSlot = async (): Promise<void> => {
    let aboutContentError: Array<boolean> = state?.aboutContentError;
    aboutContentError?.push(true);
    await setAboutContentError(aboutContentError);

    let left: Array<AboutContent> = state?.addLeft;
    let right: Array<AboutContent> = state?.addRight;
    if (left?.length === right?.length) {
      //aggiungo a sinistra
      left.push({
        id: state?.about?.content[state.aboutContentError.length]?.id + 1,
        mediaContent: "",
        mediaType: "",
        mediaTitle: "",
        paragraph: ""
      });
    }
    //aggiungo a destra
    else {
      right.push({
        id: state?.about?.content[state.aboutContentError.length]?.id + 1,
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
    let aboutContentError: Array<boolean> = state.aboutContentError;
    let left: Array<AboutContent> = state.addLeft;
    let right: Array<AboutContent> = state.addRight;
    let about: AboutType = state.about;

    if (left.length === right.length) {
      //tolgo a destra
      right.pop();
    }
    //tolgo a sinistra
    else {
      left.pop();
    }

    about.content.pop()
    aboutContentError.pop();

    setState({
      ...state,
      about: about,
      addLeft: left,
      addRight: right,
      aboutContentError: aboutContentError,
    });
  };

  //aggiorno lo stato che contiente gli errori relativi al contenuto dell'articolo
  const setAboutContentError = async (aboutContentError: Array<boolean>): Promise<void> => {
    setState({
      ...state,
      aboutContentError: aboutContentError,
    });
  };

  //salvo
  const onSave = async (e: BaseSyntheticEvent): Promise<void> => {
    let about: AboutType = {
      content: [
        {
          id: 0,
          mediaContent: e.target.form[9 + state.addLeft.length * 4].name.split(" ")[0],
          mediaTitle: e.target.form[9 + state.addLeft.length * 4].name.split(" ")[1],
          mediaType: e.target.form[9 + state.addLeft.length * 4].name.split(" ")[2],
          paragraph: e.target.form[6 + state.addLeft.length * 4].value,
        },
        {
          id: 1,
          mediaContent: e.target.form[9 + state.addLeft.length * 4 + 4].name.split(" ")[0],
          mediaTitle: e.target.form[9 + state.addLeft.length * 4 + 4].name.split(" ")[1],
          mediaType: e.target.form[9 + state.addLeft.length * 4 + 4].name.split(" ")[2],
          paragraph: e.target.form[6 + state.addLeft.length * 4 + 4].value,
        },
      ],
      hero: {
        mediaContent: e.target.form[0].name.split(" ")[0],
        mediaTitle: e.target.form[0].name.split(" ")[1],
        mediaType: e.target.form[0].name.split(" ")[2],
        text: e.target.form[1].value
      },
      title: {
        id: state.about.title.id,
        title: e.target.form[4].value,
      },
    };

    //aggiungo i contenuti dinamici
    about.content = getDynamicAboutContents(about, e);

    //gestisco gli errori
    let error: Array<boolean> = handleErrors(about);
    let aboutContentError: Array<boolean> = handleContentErrors(about);
    let errors: boolean = getErrors(error);
    let aboutContentErrors: boolean = getErrors(aboutContentError);

    if (!errors && !aboutContentErrors) {
      //update
      updateAbout(about, error, aboutContentError);
    } else {
      indSx = 0
      indDx = 1
      setState({
        ...state,
        snackErrorIsOpen: true,
        error: error,
        aboutContentError: aboutContentError,
      });
    }
  };

  //gestisco i contenuti dinamici
  const getDynamicAboutContents = (about: AboutType, e: BaseSyntheticEvent): Array<AboutContent> => {
    let contentLeft: Array<AboutContent> = [];
    let contentRight: Array<AboutContent> = [];
    let contentIndex: number = 2;

    //sx
    for (let i = 0; i < state.addLeft.length; i++) {
      contentLeft.push({
        id: state.about.content[contentIndex].id,
        mediaContent: e.target.form[9 + 4 * i].name.split(" ")[0],
        mediaTitle: e.target.form[9 + 4 * i].name.split(" ")[1],
        mediaType: e.target.form[9 + 4 * i].name.split(" ")[2],
        paragraph: e.target.form[6 + 4 * i].value,
      });
      contentIndex += 2;
    }

    contentIndex = 3;
    //dx
    for (let i = 0; i < state.addRight.length; i++) {
      contentRight.push({
        id: state.about.content[contentIndex].id,
        mediaContent: e.target.form[9 + state.addLeft.length * 4 + 4 * i + 8].name.split(" ")[0],
        mediaTitle: e.target.form[9 + state.addLeft.length * 4 + 4 * i + 8].name.split(" ")[1],
        mediaType: e.target.form[9 + state.addLeft.length * 4 + 4 * i + 8].name.split(" ")[2],
        paragraph: e.target.form[6 + state.addLeft.length * 4 + 4 * i + 8].value
      });
      contentIndex += 2;
    }
    //aggiungo sx e dx al content
    for (let i = 0; i < contentLeft.length; i++) {
      about.content.push(contentLeft[i]);
      if (i < contentRight.length) about.content.push(contentRight[i]);
    }
    return about.content;
  };

  //gestisco gli errori
  const handleErrors = (about: AboutType): Array<boolean> => {
    let error: Array<boolean> = [false, false, false];

    if (about.hero.mediaContent.length === 0)
      error[0] = true;
    if (about.hero.text.length === 0)
      error[1] = true
    if (about.title.title.length === 0)
      error[2] = true;

    return error;
  };

  //gestisco gli errori del content
  const handleContentErrors = (about: AboutType): Array<boolean> => {
    let aboutContentError: Array<boolean> = [];

    for (let i = 0; i < about.content.length; i++) {
      if (
        about.content[i].paragraph.length === 0 ||
        about.content[i].mediaContent.length === 0
      )
        aboutContentError[i] = true;
      else aboutContentError[i] = false;
    }

    return aboutContentError;
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

  //modifico about
  const updateAbout = async (about: AboutType, error: Array<boolean>, aboutContentError: Array<boolean>): Promise<void> => {
    console.log("ABout prima di aggiornare", about)
    let response = await postApiAbout(about);
    handleUpdateResponse(response.status, error, aboutContentError, about);
  };

  //gestisco la risposta all'eliminazione
  const handleUpdateResponse = async (status: number, error: Array<boolean>, aboutContentError: Array<boolean>, about: AboutType) => {
    let snack: boolean = state.snackIsOpen;
    let snackWarning: boolean = state.snackWarningIsOpen;
    let snackError: boolean = state.snackErrorIsOpen;
    let response: any = {}

    console.log(status);
    if (status === 200) {
      response = await fetchData(getApiAbout);
      console.log("About", response.data);
      about = response.data
      snack = true;
    } else if (status === 500 || status === undefined) snackWarning = true;
    else snackError = true;

    setState({
      ...state,
      snackIsOpen: snack,
      snackWarningIsOpen: snackWarning,
      snackErrorIsOpen: snackError,
      about: about,
      error: error,
      aboutContentError: aboutContentError,
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
                      text={t("About.Hero.title")}
                      textInfo={t("About.Hero.info")}
                    />
                    <ButtonAddFile
                      callback={log}
                      error={state?.error[0]}
                      mediaContent={state?.about?.hero?.mediaContent}
                      mediaTitle={state?.about?.hero?.mediaTitle}
                      mediaType={state?.about?.hero?.mediaType}
                      customKey={999}
                    ></ButtonAddFile>
                    <CustomTextField
                      error={state?.error[1]}
                      minrow={7}
                      maxrow={10}
                      multiline={true}
                      placeholder={t("About.Hero.placeHolderText")}
                      defaultValue={state?.about?.hero?.text}
                    />
                  </LabelText>
                  {/*titolo*/}
                  <LabelText>
                    <Title
                      text={t("About.Title.title")}
                      textInfo={t("About.Title.info")}
                    />
                    <CustomTextField
                      error={state?.error[2]}
                      placeholder={t("About.Title.placeHolderText")}
                      defaultValue={state?.about?.title?.title}
                    />
                  </LabelText>
                  {/*contenuto*/}
                  {state?.addLeft?.map((element: AboutContent) => {
                    indSx += 2
                    return getContent(element, element?.id, indSx)
                  })}
                </Box>

                <Box className={style.right}>
                  {/*contenuto*/}
                  {getContent(state?.about?.content[0], 0, 0)}
                  {getContent(state?.about?.content[1], 1, 1)}
                  {state?.addRight?.map((element: AboutContent) => {
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

export default About;
