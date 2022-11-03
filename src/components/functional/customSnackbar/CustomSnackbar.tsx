import React, { FC, useState, useEffect } from "react";

//style


//mui
import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

//props
interface snackbarProps {
    message: string;
    severity: AlertColor;
    callback?: Function;
}
//state
interface State {
    open: boolean;
}
const initialState: State = {
    open: false
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar: FC<snackbarProps> = (props) => {

    const [state, setState] = useState<State>(initialState)

    useEffect(() => {
      setState({
        ...state,
        open:true
      })
    },[])
    

    //chiudo la snackbar
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        props.callback();
        if (reason === 'clickaway'){
            return;
        }
        setState({
            open: false
        })
    }

    return (
        <Snackbar open={state.open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
