import { useState, FC, BaseSyntheticEvent, useEffect } from "react";

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
  bgColor: string;
  txtColor: string;
}

interface colorPickerProp {
  callbackBg: Function;
  callbackTxt: Function;
  bg?: string;
  txt?: string;
  background?: string;
  text?: string;
}

const initState: State = {
  bgToggleOne: false,
  txtToggleOne: false,
  bgColor: "#262e36",
  txtColor: "#ffffff",
};

const ColorPicker: FC<colorPickerProp> = (props): JSX.Element => {
  const [state, setState] = useState<State>(initState);

  useEffect(() => {
    setState({
      ...state,
      bgColor: props.bg,
      txtColor: props.txt,
    });
  }, []);

  const openColorPicker = (e: BaseSyntheticEvent): void => {
    console.log(e.target.id);
    setState({
      ...state,
      [e.target.id]: true,
    });
  };

  const setChangedColorBg = (color: ColorResult): void => {
    setState({
      ...state,
      bgColor: color.hex,
    });
    props.callbackBg(color.hex);
  };

  const setChangedColorTxt = (color: ColorResult): void => {
    setState({
      ...state,
      txtColor: color.hex,
    });
    props.callbackTxt(color.hex);
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
          style={{ backgroundColor: state.bgColor }}
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
        <p>{props.background}</p>
      </Box>
      <Box className={style.whole}>
        <Box
          id="txtToggleOne"
          className={style.color}
          style={{ backgroundColor: state.txtColor }}
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
        <p>{props.text}</p>
      </Box>
    </Box>
  );
};
export default ColorPicker;
