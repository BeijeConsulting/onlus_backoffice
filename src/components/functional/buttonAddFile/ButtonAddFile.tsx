import { ChangeEvent, FC, useEffect, useState } from "react";

//style
import style from "./buttonAddFile.module.scss";

//mui
import { Button, Box, Typography } from "@mui/material";
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
const ButtonAddFile: FC<buttonAddFileProps> = (props) => {
  const [state, setState] = useState<State>(initialState);

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
            backgroundColor: "#e9e3e6",
            color: "black",
            textTransform: "initial",
          }}
          component="span"
        >
          Seleziona file
        </Button>
      </label>
      {state.selectedImage !== "" && (
        <Typography className={style.inputFileName}>
          {state.selectedImage}
        </Typography>
      )}
      {state.selectedImage === "" && (
        <Typography className={style.inputFileName}>
          Nessun file selezionato
        </Typography>
      )}
    </Box>
  );
};

export default ButtonAddFile;
