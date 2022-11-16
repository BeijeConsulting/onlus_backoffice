import { ChangeEvent, FC, useState, useEffect } from "react";

//functions 
import { fromBlobToBase64 } from "../../../utils/fromBlobToBase64"

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
  error?: boolean;
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
const ButtonAddFile: FC<buttonAddFileProps> = (props): JSX.Element => {
  const [state, setState] = useState<State>(initialState);
  const { t } = useTranslation();

  useEffect(() => {
    setState({
      ...state,
      selectedImage: !!props.image ? props.image : "",
      file: !!props.image ? props.image : ""
    })

  }, [])

  const onChangeInput = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    let file = await fromBlobToBase64(e.target.files[0])
    setState({
      ...state,
      selectedImage: e.target.files[0]!.name,
      file: file,
    });

    console.log(e.target.files[0])
    props.callback(file);
  };

  return (
    <Box className={style.inputFileContainer}>
      <input
        accept="image/*"
        type="file"
        name={state.file}
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
        <Typography className={style.inputFileName} sx={props.error ? { color: 'red' } : {}}>
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
