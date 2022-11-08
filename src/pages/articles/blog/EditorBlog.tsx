import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
//import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//styles
import style from "./editorBlogStyle.module.scss";
import common from "../../../assets/styles/common.module.scss";

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
  const [state,setState] = useState();

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
    navigate(PAGES.articlesBlog,{state:{open:true}})
  }

  //torno alla pagina articoli
  const goBack = (): void => {
    navigate(PAGES.articlesBlog)
  }

  return (
    <form>
      <Box className={common.component}>
        <Box className={common.doubleComponent}>
          <Box className={common.left}>
            <LabelText>
              <Title
                text={"Titolo"}
                textInfo={"Inserisci il titolo dell'articolo"}
              />
              <CustomTextField placeholder={"Titolo"} error={false} />
            </LabelText>

            <LabelText>
              <Title text={"Contenuto"} textInfo={"Scrivi il tuo articolo"} />
              <CustomTextField
                placeholder={"Inserisci testo"}
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
                text={"Copertina"}
                textInfo={"Inserisci una foto di copertina per l'evento"}
              />
              <ButtonAddFile callback={log} />
            </LabelText>

            <LabelText>
              <Title
                text={"Categorie"}
                textInfo={"Specifica le categorie da attribuire all'articolo"}
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
              <ButtonGeneric
                color={common.buttonColor}
                callback={save}
              >
                Salva modifiche
              </ButtonGeneric>

              <ButtonGeneric
                color={common.secondaryColor}
                callback={goBack}
              >
                Annulla modifiche
              </ButtonGeneric>
            </Box>
          </Box>
        </Box>
      
      </Box>
    </form>
  );
}

export default EditorBlog;
