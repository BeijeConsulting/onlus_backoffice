import { FC, useEffect, useState } from "react";
import userDuck from "../../../redux/ducks/userDuck";
//mui
import { Box } from "@mui/material";
//style
import common from "../../../assets/styles/common.module.scss";
import style from "./home-Style.module.scss";
//function component
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import { useSelector } from "react-redux/es/exports";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";
//data
import { home } from "../../../utils/mockup/data";
//translation
import { useTranslation } from "react-i18next";

type home = {
  hero: {
    img: any;
    title: string;
    text: string;
  };
  results: {
    img: null;
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
const Home: FC = () => {
  const [state, setState] = useState<State>(initState);
  function handleClick(e: any): void {}
  const { t } = useTranslation();

  const stampa: any = useSelector((state: any) => state.userDuck.user);

  function editHome(e: any): void {
    setState({
      ...state,
      snackIsOpen: true,
    });

    let newHome: home = {
      hero: {
        img: e.target.form[0].value,
        title: e.target.form[1].value,
        text: e.target.form[3].value,
      },
      results: {
        title: e.target.form[6].value,
        img: e.target.form[8].value,
        text: e.target.form[9].value,
      },
    };
    console.log(stampa);
  }

  function closeSnack(): void {
    setState({
      ...state,
      snackIsOpen: false,
    });
  }

  return (
    <form className={common.component}>
      <Box className={common.doubleComponent}>
        <Box className={common.left}>
          <LabelText>
            <Title text={t("Home.Hero.title")} textInfo={t("Home.Hero.info")} />
            <ButtonAddFile callback={handleClick} />
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
            <ButtonAddFile callback={handleClick} />
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
