import { useState, FC, BaseSyntheticEvent } from "react";

//style
import style from "./colorPickerStyle.module.scss";

//Mui
import { Box, Button } from "@mui/material";

//colorPicker
import { ColorResult, SketchPicker } from "@hello-pangea/color-picker";

//interfaces
interface State {
  bgToggleOne: boolean;
  txtToggleOne: boolean;
  bgColorOne: string;
  txtColorOne: string;
}

interface colorPickerProp {
  callback?: Function;
  bg?: string;
  txt?: string;
}

const initState: State = {
  bgToggleOne: false,
  txtToggleOne: false,
  bgColorOne: "#262e36",
  txtColorOne: "#ffffff",
};

const ColorPicker: FC<colorPickerProp> = (props): JSX.Element => {
  const [state, setState] = useState<State>(initState);

  const openColorPicker = (e: BaseSyntheticEvent): void => {
    console.log(e.target.id);
    setState({
      ...state,
      [e.target.id]: true,
    });
  };

  const setChangedColorBg = (color: ColorResult): void => {
    console.log(props.bg);
    setState({
      ...state,
      [props.bg]: color.hex,
    });
    props.callback(color.hex);
  };

  const setChangedColorTxt = (color: ColorResult): void => {
    console.log(props.txt);
    setState({
      ...state,
      [props.txt]: color.hex,
    });
    props.callback(color.hex);
  };

  const closeColorPicker = (e: BaseSyntheticEvent): void => {
    console.log(e.target.id);
    setState({
      ...state,
      [e.target.id]: false,
    });
  };

  return (
    <Box className={style.row}>
      <Box className={style.whole}>
        <Box
          id="bgToggleOne"
          className={style.color}
          style={{ backgroundColor: state.bgColorOne }}
          onClick={openColorPicker}
        ></Box>
        {state.bgToggleOne === true && (
          <Box className={style.picker}>
            <SketchPicker onChangeComplete={setChangedColorBg} />
            <Button
              variant="contained"
              id="bgToggleOne"
              onClick={closeColorPicker}
            >
              Chiudi
            </Button>
          </Box>
        )}
        <p>Background Primario</p>
      </Box>
      <Box className={style.whole}>
        <Box
          id="txtToggleOne"
          className={style.color}
          style={{ backgroundColor: state.txtColorOne }}
          onClick={openColorPicker}
        ></Box>
        {state.txtToggleOne === true && (
          <Box className={style.picker}>
            <SketchPicker onChangeComplete={setChangedColorTxt} />
            <Button
              variant="contained"
              id="txtToggleOne"
              onClick={closeColorPicker}
            >
              Chiudi
            </Button>
          </Box>
        )}
        <p>Background Primario</p>
      </Box>
    </Box>
  );
};
export default ColorPicker;
