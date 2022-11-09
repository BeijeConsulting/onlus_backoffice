import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

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
} from "@mui/material";

//pages
import PAGES from "../../../router/pages";

//data
import { categories } from "../../../utils/mockup/data";

const EditorBlog: FC = () => {
  const [checked, setChecked] = useState([1]);
  const [state, setState] = useState();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const log = (e: any): void => {
    console.log(e);
  };

  //salvo
  const save = (): void => {
    navigate(PAGES.articlesBlog, { state: { open: true } });
  };

  //torno alla pagina articoli
  const goBack = (): void => {
    navigate(PAGES.articlesBlog);
  };

  return (
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
              />
            </LabelText>

            <LabelText>
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
                minrow={15}
                maxrow={25}
              />
              <ButtonAddFile callback={log} />
            </LabelText>
          </Box>
          <Box className={common.right}>
            <LabelText>
              <Title
                text={t("articles.editorBlog.coverSection.title")}
                textInfo={t("articles.editorBlog.coverSection.info")}
              />
              <ButtonAddFile callback={log} />
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
                }}
              >
                {categories.map((element) => {
                  const labelId = `checkbox-list-secondary-label-${element}`;
                  return (
                    <ListItem
                      key={element.id}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(element.id)}
                          checked={checked.indexOf(element.id) !== -1}
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

            <Box className={style.row}>
              <ButtonGeneric color={common.buttonColor} callback={save}>
                {t("saveButton")}
              </ButtonGeneric>

              <ButtonGeneric color={common.secondaryColor} callback={goBack}>
                {t("cancelButton")}
              </ButtonGeneric>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default EditorBlog;
