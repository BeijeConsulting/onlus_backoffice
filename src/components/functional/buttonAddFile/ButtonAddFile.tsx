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
  mediaContent?: string;
  mediaTitle?: string;
  mediaType?: string;
  customKey?: number;
  error?: boolean;
}
//state
interface State {
  mediaTitle: string | null;
  mediaContent: string;
  mediaType: string
}
const initialState: State = {
  mediaTitle: "",
  mediaContent: "",
  mediaType: ""
};
const ButtonAddFile: FC<buttonAddFileProps> = (props): JSX.Element => {
  const [state, setState] = useState<State>(initialState);
  const { t } = useTranslation();

  useEffect(() => {
    setState({
      ...state,
      mediaTitle: !!props.mediaTitle ? props.mediaTitle : "",
      mediaContent: !!props.mediaContent ? props.mediaContent : "",
      mediaType: !!props.mediaType ? props.mediaType : ""
    })

  }, [])

  const onChangeInput = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    let file: string = await fromBlobToBase64(e.target.files[0])
    file = file.split(',')[1]
    let title: string = e.target.files[0]!.name
    title = title.split(".")[0]
    let type: string = e.target.files[0]!.type
    type = "." + type.split("/")[1]

    setState({
      ...state,
      mediaContent: file,
      mediaTitle: title,
      mediaType: type
    });

    props.callback(file, title, type);
  };

  return (
    <Box className={style.inputFileContainer}>
      <input
        accept="image/*"
        type="file"
        name={state.mediaContent + " " + state.mediaTitle + " " + state.mediaType}
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
      {state.mediaTitle !== "" && (
        <Typography className={style.inputFileName} sx={props.error ? { color: 'red' } : {}}>
          {state.mediaTitle}
        </Typography>
      )}
      {state.mediaTitle === "" && (
        <Typography className={style.inputFileName}>
          {t("buttonAddFile.file")}
        </Typography>
      )}
    </Box>
  );
};

export default ButtonAddFile;
