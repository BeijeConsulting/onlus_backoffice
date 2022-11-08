import { FC, useState } from "react";

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
import { useSelector } from "react-redux/es/exports";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//data
import { home } from "../../../utils/mockup/data";

//interface
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

interface State{
  snackIsOpen: boolean
}

const initState: State = {
  snackIsOpen: false
};
 const Home: FC = () => {

  const [state,setState] = useState<State>(initState)
  function handleClick(e: any): void {}
 
  const stampa: any = useSelector((state: any) => state.userDuck.user);

  function editHome(e: any): void {
    setState({
      ...state,
      snackIsOpen: true
    })

    console.log(stampa);
  }

  function closeSnack(): void{
    setState({
      ...state,
      snackIsOpen: false
    })
  }

  return (
    <form className={common.component}>
      <Box className={common.doubleComponent}>
        <Box className={common.left}>
          <LabelText>
            <Title text="Hero" textInfo="crea home" />
            <ButtonAddFile callback={handleClick} />
            <CustomTextField error={false} defaultValue={home.hero.title} />
            <CustomTextField
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
            <Title text="Risultati" textInfo="crea risultati" />
            <CustomTextField error={false} defaultValue={home.results.title} />
            <ButtonAddFile callback={handleClick} />
            <CustomTextField
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
        Salva modifiche
      </ButtonGeneric>

      {/* snackbar */}
      {
        state.snackIsOpen && 
        <CustomSnackbar 
          message={"Modifiche avvenute con successo"}
          severity={"success"}
          callback={closeSnack}
        />
      }

    </form>
  );
}

export default Home;