import { FC, useState, BaseSyntheticEvent, useEffect } from "react";

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
import { getApiHome, postApiHome } from "../../../services/api/home/homeApi";
//translation
import { useTranslation } from "react-i18next";

//interface
type home = {
  hero: {
    image: any;
    subtitle: string;
    text: string;
  };
  result: {
    image: any;
    title: string;
    text: string;
  };
  story: {
    image: any;
    text: string;
  };
};

interface State {
  snackIsOpen: boolean;
  home: home;
  ready: boolean;
}

const initState: State = {
  snackIsOpen: false,
  home: {
    hero: {
      image: null,
      subtitle: "",
      text: "",
    },
    result: {
      image: null,
      title: "",
      text: "",
    },
    story: {
      image: null,
      text: "",
    },
  },
  ready: false,
};
const Home: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);
  const { t } = useTranslation();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const homeData: any = await getApiHome();

    setState({
      ...state,
      ready: true,
      home: {
        hero: {
          image: homeData.data.hero.image,
          subtitle: homeData.data.hero.subtitle,
          text: homeData.data.hero.text,
        },
        result: {
          image: homeData.data.result.image,
          title: homeData.data.result.title,
          text: homeData.data.result.text,
        },
        story: {
          image: homeData.data.story.image,
          text: homeData.data.story.text,
        },
      },
    });
  }

  async function editHome(e: BaseSyntheticEvent): Promise<void> {
    let home: home = {
      hero: {
        image: e.target.form[0].name,
        subtitle: e.target.form[1].value,
        text: e.target.form[3].value,
      },
      result: {
        image: e.target.form[12].name,
        title: e.target.form[10].value,
        text: e.target.form[13].value,
      },
      story: {
        image: e.target.form[6].name,
        text: e.target.form[7].value,
      },
    };
    console.log(home);

    const editHome: any = await postApiHome(home);
    console.log(editHome);

    if (editHome.status === 200) {
      setState({
        ...state,
        snackIsOpen: true,
      });
    }
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
      {state.ready && (
        <>
          <Box className={common.doubleComponent}>
            <Box className={common.left}>
              <LabelText>
                <Title
                  text={t("Home.Hero.title")}
                  textInfo={t("Home.Hero.info")}
                />
                <ButtonAddFile
                  callback={log}
                  image={state?.home?.hero?.image}
                />
                <CustomTextField
                  defaultValue={state?.home?.hero?.subtitle}
                  placeholder={t("Home.Hero.placeHolderSubTitle")}
                  error={false}
                />
                <CustomTextField
                  placeholder={t("Home.Hero.placeHolderText")}
                  defaultValue={state?.home?.hero?.text}
                  error={false}
                  multiline={true}
                  minrow={7}
                  maxrow={10}
                />
              </LabelText>
              <LabelText>
                <Title
                  text={t("Home.Story.title")}
                  textInfo={t("Home.Story.info")}
                />
                <ButtonAddFile
                  callback={log}
                  image={state?.home?.story?.image}
                />

                <CustomTextField
                  placeholder={t("Home.Story.placeHolderText")}
                  defaultValue={state?.home?.story?.text}
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
                  defaultValue={state?.home?.result?.title}
                />
                <ButtonAddFile
                  callback={log}
                  image={state?.home?.result?.image}
                />
                <CustomTextField
                  placeholder={t("Home.Results.placeHolderSubTitle")}
                  defaultValue={state?.home?.result?.text}
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
        </>
      )}
    </form>
  );
};

export default Home;
