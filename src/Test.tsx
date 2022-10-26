//style
import style from "./assets/styles/common.module.scss";

//mui
import Box from "@mui/material/Box";

//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import LockIcon from "@mui/icons-material/Lock";

//components
import LabelText from "./components/functional/labelText/LabelText";
import Title from "./components/functional/title/Title";
import CustomTextField from "./components/functional/textField/CustomTextField";
import ButtonAddFile from "./components/functional/buttonAddFile/ButtonAddFile";
import ButtonGeneric from "./components/functional/buttonGeneric/ButtonGeneric";
import ButtonIcon from "./components/functional/buttonIcon/ButtonIcon";
import CustomSwitch from "./components/functional/customSwitch/CustomSwitch";

function Test() {
  const onSelectedFile = (value: string): void => {};

  const log = (att: any) => {
    console.log(att);
  };

  return (
    <Box className={style.component}>
      <Box className={style.doubleComponent}>
        <Box className={style.left}>
          <LabelText>
            <Title text={"Nome sito"} textInfo={"Inserisci il nome del sito"} />
            <CustomTextField error={false}></CustomTextField>
            <CustomTextField
              error={false}
              minrow={4}
              maxrow={20}
              multiline={true}
            ></CustomTextField>
            <CustomTextField error={false}></CustomTextField>

            <ButtonAddFile callback={onSelectedFile}></ButtonAddFile>

            <ButtonGeneric color="red" callback={log}>
              Salva modifiche
            </ButtonGeneric>
            <ButtonIcon callback={log}>
              <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
            </ButtonIcon>
            <ButtonIcon callback={log}>
              <CreateIcon sx={{ fontSize: "18px" }} />
            </ButtonIcon>
            <ButtonIcon callback={log}>
              <RemoveRedEyeOutlinedIcon sx={{ fontSize: "18px" }} />
            </ButtonIcon>
            <LockIcon sx={{ fontSize: "18px" }} />
            <CustomSwitch label="ciaoneSwitchProps" callback={log} />
          </LabelText>
        </Box>
        <Box className={style.right}></Box>
      </Box>

      <Box className={style.singleComponent}></Box>
    </Box>
  );
}

export default Test;
