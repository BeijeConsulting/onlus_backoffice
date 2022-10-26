//style
import style from "./assets/styles/common.module.scss";

//mui
import { StyledEngineProvider } from "@mui/material";
import Box from "@mui/material/Box";

//components
import LabelText from "./components/functional/labelText/LabelText";
import Title from "./components/functional/title/Title";
import CustomTextField from "./components/functional/textField/CustomTextField";
import ButtonAddFile from "./components/functional/buttonAddFile/ButtonAddFile";

function Test() {
  const onSelectedFile = (value: string): void => {};

  return (
    <Box className={style.component}>
      <Box className={style.doubleComponent}>
        <Box className={style.left}>
          <LabelText>
            <Title text={"Nome sito"} textInfo={"Inserisci il nome del sito"} />
            <CustomTextField error={false}></CustomTextField>
            <CustomTextField error={false}></CustomTextField>

            <ButtonAddFile callback={onSelectedFile}></ButtonAddFile>
          </LabelText>
        </Box>
        <Box className={style.right}></Box>
      </Box>

      <Box className={style.singleComponent}></Box>
    </Box>
  );
}

export default Test;
