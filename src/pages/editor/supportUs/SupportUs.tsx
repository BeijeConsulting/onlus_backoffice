import { FC, useState } from "react";

//style
import style from "../../../assets/styles/common.module.scss";

//mui
import Box from "@mui/material/Box";

//components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";
import CustomLink from "../../../components/functional/link/CustomLink";
//translation
import { useTranslation } from "react-i18next";

//state
interface State {
  addLeft: Array<JSX.Element>;
  addRight: Array<JSX.Element>;
  snackIsOpen: boolean;
}
//init state
const initialState: State = {
  addLeft: [],
  addRight: [],
  snackIsOpen: false,
};

let key: number = 0;

const SupportUs: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initialState);

  const { t } = useTranslation();

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
    });
  };

  //ritorno l'elemento con il contenuto
  const getContent = (): JSX.Element => {
    return (
      <LabelText key={key++}>
        <Title
          text={t("supportUs.content.title")}
          textInfo={t("supportUs.content.info")}
        />
        <CustomTextField
          error={false}
          minrow={4}
          maxrow={10}
          multiline={true}
          placeholder={t("supportUs.content.placeholderText")}
        />
        <ButtonAddFile callback={onSelectedFile}></ButtonAddFile>
      </LabelText>
    );
  };

  //alla selezione dell'immagine
  const onSelectedFile = (value: string): void => {
    console.log(value);
  };

  //aggiungo un altro slot contenuto
  const addSlot = (): void => {
    let left: Array<JSX.Element> = state.addLeft;
    let right: Array<JSX.Element> = state.addRight;
    if (left.length === right.length)
      //aggiungo a sinistra
      left.push(getContent());
    //aggiungo a destra
    else right.push(getContent());

    setState({
      ...state,
      addLeft: left,
      addRight: right,
    });
  };

  //salvo le modifiche
  const save = (): void => {
    setState({
      ...state,
      snackIsOpen: true,
    });
  };

  return (
    <Box className={style.component}>
      <Box className={style.doubleComponent}>
        <Box className={style.left}>
          {/*hero*/}
          <LabelText>
            <Title
              text={t("supportUs.hero.title")}
              textInfo={t("supportUs.hero.info")}
            />
            <ButtonAddFile callback={onSelectedFile}></ButtonAddFile>
            <CustomTextField
              error={false}
              placeholder={t("supportUs.hero.placeholderText")}
            />
            <CustomTextField
              error={false}
              minrow={7}
              maxrow={10}
              multiline={true}
              placeholder={t("supportUs.hero.placeholderText")}
            />
          </LabelText>
          {/*titolo*/}
          <LabelText>
            <Title
              text={t("supportUs.sectionTitle.title")}
              textInfo={t("supportUs.sectionTitle.info")}
            />
            <CustomTextField
              error={false}
              placeholder={t("supportUs.sectionTitle.placeholderTitle")}
            />
          </LabelText>
          {/*contenuto*/}
          {state?.addLeft.map((element: JSX.Element) => {
            return element;
          })}
        </Box>

        <Box className={style.right}>
          {/*contenuto*/}
          {getContent()}
          {getContent()}
          {state?.addRight.map((element: JSX.Element) => {
            return element;
          })}
          {/*link*/}
          <CustomLink text={t("link")} callback={addSlot} />
          {/*salva modifiche*/}
          <ButtonGeneric color={"rgb(25, 118, 210)"} callback={save}>
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
    </Box>
  );
};

export default SupportUs;
