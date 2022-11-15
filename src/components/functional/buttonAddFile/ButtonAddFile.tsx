import { ChangeEvent, FC, useState, useEffect } from "react";

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
  callback: any;
  image?: string;
  customKey?: number;
}
//state
interface State {
  selectedImage: string | null;
  file: string;
}
const initialState: State = {
  selectedImage: "",
  file: ""
};
const ButtonAddFile: FC<buttonAddFileProps> = (props):JSX.Element => {
  const [state, setState] = useState<State>(initialState);
  const { t } = useTranslation();

  useEffect(() => {
    setState({
      ...state,
      selectedImage: !!props.image ? props.image : "",
      file: !!props.image ? props.image : ""
    })
    
  }, [])
  
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
        name={`selectImage${!!props.customKey ? props.customKey : ""}`}
        id={`selectImage${!!props.customKey ? props.customKey : ""}`}
        style={{ display: "none" }}
        onChange={onChangeInput}
      />
      <label htmlFor={`selectImage${!!props.customKey ? props.customKey : ""}`}>
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
