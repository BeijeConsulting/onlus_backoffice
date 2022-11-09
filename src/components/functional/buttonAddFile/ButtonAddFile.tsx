import { ChangeEvent, FC, useState } from "react";

//style
import style from "./buttonAddFile.module.scss";
import common from "./../../../assets/styles/common.module.scss";

//mui
import { Button, Box, Typography } from "@mui/material";

//translation
import { useTranslation } from "react-i18next";

//props
interface buttonAddFileProps {
  children?: any;
  callback: Function;
}
//state
interface State {
  selectedImage: string | null;
  file: string;
}
const initialState: State = {
  selectedImage: "",
  file: "",
};
const ButtonAddFile: FC<buttonAddFileProps> = (props):JSX.Element => {
  const [state, setState] = useState<State>(initialState);
  const { t } = useTranslation();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      selectedImage: e.target!.files[0]!.name,
      file: URL.createObjectURL(e.target.files[0]),
    });

    props.callback(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Box className={style.inputFileContainer}>
      <input
        accept="image/*"
        type="file"
        name="selectImage"
        id="selectImage"
        style={{ display: "none" }}
        onChange={onChangeInput}
      />
      <label htmlFor="selectImage">
        <Button
          variant="contained"
          sx={{
            backgroundColor: common.fifthColor,
            color: "black",
            textTransform: "initial",
          }}
          component="span"
        >
          {t("buttonAddFile.selection")}
        </Button>
      </label>
      {state.selectedImage !== "" && (
        <Typography className={style.inputFileName}>
          {state.selectedImage}
        </Typography>
      )}
      {state.selectedImage === "" && (
        <Typography className={style.inputFileName}>
         {t("buttonAddFile.file")}
        </Typography>
      )}
    </Box>
  );
};

export default ButtonAddFile;
