import { FC, useState, BaseSyntheticEvent } from "react";

//mui
import { Box } from "@mui/material";

//style
import common from "../../../assets/styles/common.module.scss";

//components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//data
import { home } from "../../../utils/mockup/data";
//translation
import { useTranslation } from "react-i18next";

//interface
type home = {
  hero: {
    img: any;
    title: string;
    text: string;
  };
  results: {
    img: any;
    title: string;
    text: string;
  };
};

interface State {
  snackIsOpen: boolean;
}

const initState: State = {
  snackIsOpen: false,
};
const Home: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);
  const { t } = useTranslation();

  function editHome(e: BaseSyntheticEvent): void {
    console.log(e);
    setState({
      ...state,
      snackIsOpen: true,
    });
  }

  function closeSnack(): void {
    setState({
      ...state,
      snackIsOpen: false,
    });
  }

  //funzione di comodo
  function log() {
    console.log("handleClick");
  }

  return (
    <form className={common.component}>
      <Box className={common.doubleComponent}>
        <Box className={common.left}>
          <LabelText>
            <Title text={t("Home.Hero.title")} textInfo={t("Home.Hero.info")} />
            <ButtonAddFile callback={log} />
            <CustomTextField
              placeholder={t("Home.Hero.placeHolderSubTitle")}
              error={false}
              defaultValue={home.hero.title}
            />
            <CustomTextField
              placeholder={t("Home.Hero.placeHolderText")}
              defaultValue={home.hero.text}
              error={false}
              multiline={true}
              minrow={7}
              maxrow={10}
            />
          </LabelText>
        </Box>
        <Box className={common.right}>
          <LabelText>
            <Title
              text={t("Home.Results.title")}
              textInfo={t("Home.Results.info")}
            />
            <CustomTextField
              placeholder={t("Home.Results.placeHolderSubTitle")}
              error={false}
              defaultValue={home.results.title}
            />
            <ButtonAddFile callback={log} />
            <CustomTextField
              placeholder={t("Home.Results.placeHolderSubTitle")}
              defaultValue={home.results.text}
              error={false}
              multiline={true}
              minrow={7}
              maxrow={15}
            />
          </LabelText>
        </Box>
      </Box>
      <ButtonGeneric callback={editHome} color={common.saveButtonColor}>
        {t("saveButton")}
      </ButtonGeneric>

      {/* snackbar */}
      {state.snackIsOpen && (
        <CustomSnackbar
          message={t("changesSnack")}
          severity={"success"}
          callback={closeSnack}
        />
      )}
    </form>
  );
};

export default Home;
