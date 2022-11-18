import { FC, useState, useEffect, BaseSyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//api
import { getApiCategories } from "../../../services/api/categories/categoriesApi";

import {
  getApiArticleById,
  postApiArticle,
  putApiArticleById,
} from "../../../services/api/blog/blogApi";

//components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//data
import { fetchData } from "../../../utils/fetchData";

//Mui
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Link,
} from "@mui/material";

//pages
import PAGES from "../../../router/pages";

//styles
import style from "./editorBlogStyle.module.scss";
import common from "../../../assets/styles/common.module.scss";

//translation
import { useTranslation } from "react-i18next";

//types
import { Article, Category, ArticleContent } from "../../../utils/mockup/types";

//interface
interface State {
  ready: boolean;
  checked: Array<number>;
  categories: Array<Category>;
  article: Article;
  addLeft: Array<JSX.Element>;
  addRight: Array<JSX.Element>;
  error: Array<boolean>;
  articleContentError: Array<boolean>;
  snackErrorIsOpen: boolean;
  snackWarningIsOpen: boolean;
}
const initialState: State = {
  ready: false,
  checked: [],
  categories: [],
  article: {
    category: [],
    content: [],
    cover: "",
    date: "",
    status: "",
    title: "",
  },
  addLeft: [],
  addRight: [],
  error: [],
  articleContentError: [],
  snackErrorIsOpen: false,
  snackWarningIsOpen: false,
};

const EditorBlog: FC = (): JSX.Element => {
  const [state, setState] = useState(initialState);
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
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
    let checked: Array<number> = [];
    let addLeft: Array<JSX.Element> = [];
    let addRight: Array<JSX.Element> = [];
    let articleContentError: Array<boolean> = [];

    let article: Article = {
      category: [],
      content: [],
      cover: "",
      title: "",
    };

    //se sto modificando
    if (!location?.state?.showAdd) {
      let dataArticle = await fetchData(getApiArticleById, location?.state?.id);
      console.log(dataArticle);

      console.log("Article", dataArticle.data);
      article = {
        category: dataArticle.data.category,
        content: dataArticle.data.content,
        cover: dataArticle.data.cover,
        title: dataArticle.data.title,
      };

      for (let i = 0; i < article.content.length; i++) {
        articleContentError.push(false);
      }

      //assegno le categorie
      dataArticle.data.category.forEach((element: Category) => {
        checked.push(element.id);
      });

      for (let i = 1; i < dataArticle.data.content.length; i++) {
        if (i % 2 !== 0)
          addLeft.push(
            getContent(
              dataArticle.data.content[i],
              i,
              addLeft.length + addRight.length + 1
            )
          );
        else
          addRight.push(
            getContent(
              dataArticle.data.content[i],
              i,
              addLeft.length + addRight.length + 1
            )
          );
      }
    }

    let categories = await fetchData(getApiCategories);
    console.log("Categories", categories.data);

    setState({
      ...state,
      categories: categories.data,
      article: article,
      ready: true,
      checked: checked,
      addLeft: addLeft,
      addRight: addRight,
      error: [false, false, false],
      articleContentError: articleContentError,
    });
  };

  //se seleziono/deseleziono una checkbox cambia lo stato
  const handleToggle = (value: number) => () => {
    const currentIndex = state.checked.indexOf(value);
    const newChecked = [...state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setState({
      ...state,
      checked: newChecked,
    });
  };

  //ritorno l'elemento con il contenuto
  const getContent = (
    content: ArticleContent = null,
    key: number = null,
    index: number
  ): JSX.Element => {
    return (
      <LabelText key={key}>
        <Title
          text={t("articles.editorBlog.contentSection.title")}
          textInfo={t("articles.editorBlog.contentSection.info")}
        />
        <CustomTextField
          placeholder={t(
            "articles.editorBlog.contentSection.placeholderContent"
          )}
          error={state.articleContentError[index]}
          multiline={true}
          minrow={10}
          maxrow={25}
          defaultValue={content?.paragraph}
        />
        <ButtonAddFile
          callback={log}
          error={state.articleContentError[index]}
          customKey={key}
        />
      </LabelText>
    );
  };

  //aggiungo un altro slot contenuto
  const addSlot = async (): Promise<void> => {
    let articleContentError: Array<boolean> = state?.articleContentError;
    articleContentError?.push(true);
    await setArticleContentError(articleContentError);

    let left: Array<JSX.Element> = state?.addLeft;
    let right: Array<JSX.Element> = state?.addRight;
    if (left?.length === right?.length) {
      //aggiungo a sinistra
      left?.push(
        getContent(
          null,
          state?.article?.content?.length + left.length + right.length + 1,
          left.length + right.length + 1
        )
      );
    }
    //aggiungo a destra
    else {
      right?.push(
        getContent(
          null,
          state?.article?.content?.length + left.length + right.length + 1,
          left.length + right.length + 1
        )
      );
    }

    setState({
      ...state,
      addLeft: left,
      addRight: right,
    });
  };

  //elimino l'ultimo slot
  const deleteSlot = (): void => {
    let articleContentError: Array<boolean> = state.articleContentError;
    let left: Array<JSX.Element> = state?.addLeft;
    let right: Array<JSX.Element> = state?.addRight;

    if (left?.length === right?.length) {
      //tolgo a destra
      right?.pop();
    }
    //tolgo a sinistra
    else {
      left?.pop();
    }

    articleContentError.pop();

    setState({
      ...state,
      addLeft: left,
      addRight: right,
      articleContentError: articleContentError,
    });
  };

  //aggiorno l ostato che contiente gli errori relativi al contenuto dell'articolo
  const setArticleContentError = async (
    articleContentError: Array<boolean>
  ): Promise<void> => {
    setState({
      ...state,
      articleContentError: articleContentError,
    });
  };

  //salvo
  const onSave = (e: BaseSyntheticEvent): void => {
    let article: Article = {
      category: [],
      content: [
        {
          articleId: 0,
          media: [
            {
              content: e.target.form[5].name,
              type: "image",
            },
          ],
          paragraph: e.target.form[2].value,
        },
      ],
      cover: e.target.form[6 + state.addLeft.length * 4].name,
      title: e.target.form[0].value,
    };

    //inserisco solo categorie selezionate
    article.category = state.categories.filter((element) => {
      return state.checked.some((f) => {
        return f === element.id;
      });
    });

    //aggiungo i contenuti dinamici
    article.content = getDynamicArticleContents(article, e);

    //gestisco gli errori
    let error: Array<boolean> = handleErrors(article);
    let articleContentError: Array<boolean> = handleContentErrors(article);
    let errors: boolean = getErrors(error);
    let articleContentErrors: boolean = getErrors(articleContentError);

    if (!errors && !articleContentErrors) {
      if (location?.state?.showAdd) {
        //add
        addArticle(article, error, articleContentError);
      } else {
        //update
        updateArticle(article, error, articleContentError);
      }
    } else {
      setState({
        ...state,
        snackErrorIsOpen: true,
        error: error,
        articleContentError: articleContentError,
      });
    }
  };

  //gestisco i contenuti dinamici
  const getDynamicArticleContents = (
    article: Article,
    e: BaseSyntheticEvent
  ): Array<ArticleContent> => {
    let contentLeft: Array<ArticleContent> = [];
    let contentRight: Array<ArticleContent> = [];
    let contentIndex: number = 1;
    //sx
    for (let i = 0; i < state.addLeft.length; i++) {
      contentLeft.push({
        articleId: contentIndex,
        media: [
          {
            content: e.target.form[9 + 4 * i].name,
            type: "image",
          },
        ],
        paragraph: e.target.form[6 + 4 * i].value,
      });
      contentIndex += 2;
    }

    contentIndex = 2;
    //dx
    for (let i = 0; i < state.addRight.length; i++) {
      contentRight.push({
        articleId: contentIndex,
        media: [
          {
            content:
              e.target.form[
                9 +
                  state.addLeft.length * 4 +
                  state.categories.length +
                  1 +
                  4 * i
              ].name,
            type: "image",
          },
        ],
        paragraph:
          e.target.form[
            6 + state.addLeft.length * 4 + state.categories.length + 1 + 4 * i
          ].value,
      });
      contentIndex += 2;
    }

    //aggiungo sx e dx l content
    for (let i = 0; i < contentLeft.length; i++) {
      article.content.push(contentLeft[i]);
      if (i < contentRight.length) article.content.push(contentRight[i]);
    }

    return article.content;
  };

  //gestisco gli errori
  const handleErrors = (article: Article): Array<boolean> => {
    let error: Array<boolean> = [false, false, false];

    if (article.title.length === 0) error[0] = true;
    if (article.cover.length === 0) error[1] = true;
    if (article.category.length === 0) error[2] = true;

    return error;
  };

  //gestisco gli errori del content
  const handleContentErrors = (article: Article): Array<boolean> => {
    let articleContentError: Array<boolean> = [];

    for (let i = 0; i < article.content.length; i++) {
      if (
        article.content[i].paragraph.length === 0 ||
        article.content[i].media[0].content.length === 0
      )
        articleContentError[i] = true;
      else articleContentError[i] = false;
    }

    return articleContentError;
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

  //modifico l'articolo
  const updateArticle = async (
    article: Article,
    error: Array<boolean>,
    articleContentError: Array<boolean>
  ): Promise<void> => {
    article.id = location?.state?.id;
    console.log(article);
    let response = await putApiArticleById(article.id, article);

    if (response.status === 200)
      navigate(PAGES.articlesBlog, { state: { open: true } });
    else handleAddUpdateResponse(response.status, error, articleContentError);
  };

  //aggiungo l'articolo
  const addArticle = async (
    article: Article,
    error: Array<boolean>,
    articleContentError: Array<boolean>
  ): Promise<void> => {
    let response = await postApiArticle(article);

    if (response.status === 200)
      navigate(PAGES.articlesBlog, { state: { openAdd: true } });
    else handleAddUpdateResponse(response.status, error, articleContentError);
  };

  //gestisco la risposta all'eliminazione dell'articolo
  const handleAddUpdateResponse = async (
    status: number,
    error: Array<boolean>,
    articleContentError: Array<boolean>
  ) => {
    let snackWarning: boolean = state.snackWarningIsOpen;
    let snackError: boolean = state.snackErrorIsOpen;

    if (status === 500 || status === undefined) snackWarning = true;
    else snackError = true;

    setState({
      ...state,
      snackWarningIsOpen: snackWarning,
      snackErrorIsOpen: snackError,
      error: error,
      articleContentError: articleContentError,
    });
  };

  //stampo l'immagine caricata
  const log = (s: string): void => {
    console.log(s);
  };

  //torno alla pagina articoli
  const onCancel = (): void => {
    navigate(PAGES.articlesBlog);
  };

  return (
    <Box>
      {state?.ready && (
        <>
          <form onSubmit={onSave}>
            <Box className={common.component}>
              <Box className={common.doubleComponent}>
                <Box className={common.left}>
                  <LabelText>
                    <Title
                      text={t("articles.editorBlog.titleSection.title")}
                      textInfo={t("articles.editorBlog.titleSection.info")}
                    />
                    <CustomTextField
                      placeholder={t(
                        "articles.editorBlog.titleSection.placeholderTitle"
                      )}
                      error={state?.error[0]}
                      defaultValue={
                        location?.state?.showAdd ? "" : state?.article?.title
                      }
                    />
                  </LabelText>

                  {getContent(state?.article?.content[0], 0, 0)}
                  {state?.addLeft?.map((element: JSX.Element) => {
                    return element;
                  })}
                </Box>
                <Box className={common.right}>
                  <LabelText>
                    <Title
                      text={t("articles.editorBlog.coverSection.title")}
                      textInfo={t("articles.editorBlog.coverSection.info")}
                    />
                    <ButtonAddFile
                      callback={log}
                      error={state?.error[1]}
                      customKey={999}
                    />
                  </LabelText>

                  <LabelText>
                    <Title
                      text={t("articles.editorBlog.categoriesSection.title")}
                      textInfo={t("articles.editorBlog.categoriesSection.info")}
                    />
                    <List
                      dense
                      sx={{
                        width: "100%",
                        height: "298px",
                        overflowY: "scroll",
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                          display: "none",
                        },
                      }}
                    >
                      {state?.categories?.map((element) => {
                        const labelId = `checkbox-list-secondary-label-${element}`;
                        return (
                          <ListItem
                            key={element.id}
                            secondaryAction={
                              <Checkbox
                                edge="end"
                                onChange={handleToggle(element.id)}
                                checked={
                                  state?.checked?.indexOf(element.id) !== -1
                                }
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            }
                            disablePadding
                          >
                            <ListItemButton>
                              <ListItemText
                                id={labelId}
                                primary={element.name}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                      <ListItemText sx={{ color: "red", paddingLeft: "16px" }}>
                        {state?.error[2]
                          ? t("articles.editorBlog.categoriesError")
                          : ""}
                      </ListItemText>
                    </List>
                  </LabelText>

                  {state?.addRight?.map((element: JSX.Element) => {
                    return element;
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

                  <Box className={style.row}>
                    {location?.state?.showAdd ? (
                      <>
                        <ButtonGeneric color={"green"} callback={onSave}>
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
                          callback={onSave}
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
                </Box>
              </Box>
            </Box>
          </form>
        </>
      )}
    </Box>
  );
};

export default EditorBlog;
