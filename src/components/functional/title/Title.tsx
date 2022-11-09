import React, { FC, useState } from "react";

//style
import style from "./titleStyle.module.scss";

//mui
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

//icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

//props
interface titleProps {
  text: string;
  textInfo: string;
}
//state
interface State {
  anchorEl: HTMLElement | null;
}
const initialState: State = {
  anchorEl: null
}

const Title: FC<titleProps> = (props) :JSX.Element => {

  const [state, setState] = useState(initialState)
  const open = Boolean(state.anchorEl);

  //all'apertura del popover
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setState({
      ...state,
      anchorEl: event.currentTarget
    })
  };

  //alla chiusura del popover
  const handlePopoverClose = (): void => {
    setState({
      ...state,
      anchorEl: null
    })
  };


  return (
    <Box className={style.labelTextRow}>
      <label className={style.labelText}>
        {props.text}
      </label>

      <Box
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      > <InfoOutlinedIcon className={style.infoIcon} /></Box>



      <Popover
        open={open}
        sx={{
          pointerEvents: 'none'
        }}
        anchorEl={state.anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box className={style.popover}>{props.textInfo}</Box>
      </Popover>


    </Box>
  );
};

export default Title;