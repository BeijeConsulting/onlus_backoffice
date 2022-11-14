import { FC, useState, useEffect, BaseSyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//api
import {
  getApiCategories
} from "../../../services/api/categories/categoriesApi";

import {
  getApiArticleById,
  postApiArticle,
  putApiArticleById
} from "../../../services/api/blog/blogApi";

//components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import CustomLink from "../../../components/functional/link/CustomLink";
//import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//data
import { fetchData } from '../../../utils/fetchData'

//styles
import style from "./editorBlogStyle.module.scss";
import common from "../../../assets/styles/common.module.scss";
//translation
import { useTranslation } from "react-i18next";

//Mui
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Link
} from "@mui/material";

//pages
import PAGES from "../../../router/pages";

//types
import { Article, Category, ArticleContent} from '../../../utils/mockup/types'
import { ConnectedTv } from "@mui/icons-material";

//interface
interface State {
  ready: boolean,
  checked: Array<number>,
  categories: Array<Category>,
  article: Article,
  addLeft: Array<JSX.Element>;
  addRight: Array<JSX.Element>;
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
    title: ""
  },
  addLeft: [],
  addRight: [],
};

const EditorBlog: FC = (): JSX.Element => {
  const [state, setState] = useState(initialState);
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  //component did mount
  useEffect(() => {
    getData();
  }, []);

  //fetchAPI
  const getData = async (): Promise<void> => {
    let checked: Array<number> = []
    let addLeft: Array<JSX.Element> = []
    let addRight: Array<JSX.Element> = []
    let article: Article = {
      category: [],
      content: [],
      cover: "",
      date: "",
      status: "",
      title: ""
    }

    //se sto modificando
    if (!location?.state?.showAdd) {
      let dataArticle = await fetchData(getApiArticleById, location?.state?.id);
      console.log("Article", dataArticle.data)
      article = {
        category: dataArticle.data.category,
        content: dataArticle.data.content,
        cover: dataArticle.data.cover,
        date: dataArticle.data.date,
        status: dataArticle.data.status,
        title: dataArticle.data.title
      }

      //assegno le categorie
      dataArticle.data.category.forEach((element: Category) => {
        checked.push(element.id)
      })

      for (let i = 1; i < dataArticle.data.content.length; i++) {
        if (i % 2 !== 0)
          addLeft.push(getContent(dataArticle.data.content[i],i))
        else
          addRight.push(getContent(dataArticle.data.content[i],i))
      }
    }

    let categories = await fetchData(getApiCategories);
    console.log("Categories", categories.data)

    setState({
      ...state,
      categories: categories.data,
      article: article,
      ready: true,
      checked: checked,
      addLeft: addLeft,
      addRight: addRight
    })
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
      checked: newChecked
    });
  };

  //ritorno l'elemento con il contenuto
  const getContent = (content:ArticleContent=null,key: number=null): JSX.Element => {
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
          error={false}
          multiline={true}
          minrow={10}
          maxrow={25}
          defaultValue={content?.paragraph}
        />
        <ButtonAddFile callback={log} image={content?.media[0]?.content} customKey={key} />
      </LabelText>
    );
  };

  //aggiungo un altro slot contenuto
  const addSlot = (): void => {
    let left: Array<JSX.Element> = state.addLeft;
    let right: Array<JSX.Element> = state.addRight;

    if (left.length === right.length) {
      //aggiungo a sinistra
      left.push(getContent(null, state?.article?.content.length + left.length + right.length +1));
    }
    //aggiungo a destra
    else {
      right.push(getContent(null, state?.article?.content.length + left.length + right.length +1));
    }

    setState({
      ...state,
      addLeft: left,
      addRight: right,
    });
  };

  //salvo
  const onSave = (e:BaseSyntheticEvent): void => {
    if (location?.state?.showAdd) {
      navigate(PAGES.articlesBlog, { state: { openAdd: true } });
    }
    else {
      let article: Article = {
        category: [],
        content: [],
        cover: "",
        date: "",
        status: "",
        title: ""
      }

      console.log(e.target)
      navigate(PAGES.articlesBlog, { state: { open: true } });
    }
  };

  function log() {
    console.log()
  }

  //torno alla pagina articoli
  const onCancel = (): void => {
    navigate(PAGES.articlesBlog);
  };

  return (
    <Box>
      {state.ready && (
        <>
          <form>
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
                      error={false}
                      defaultValue={location?.state?.showAdd ? "" : state.article.title}
                    />
                  </LabelText>

                  {getContent(state?.article?.content[0],0)}
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
                    <ButtonAddFile callback={log} image={state?.article?.cover} customKey={999}/>
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
                        '&::-webkit-scrollbar': {
                          display: "none"
                        }
                      }}
                    >
                      {state.categories.map((element) => {
                        const labelId = `checkbox-list-secondary-label-${element}`;
                        return (
                          <ListItem
                            key={element.id}
                            secondaryAction={
                              <Checkbox
                                edge="end"
                                onChange={handleToggle(element.id)}
                                checked={state.checked.indexOf(element.id) !== -1}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            }
                            disablePadding
                          >
                            <ListItemButton>
                              <ListItemText id={labelId} primary={element.name} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
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
