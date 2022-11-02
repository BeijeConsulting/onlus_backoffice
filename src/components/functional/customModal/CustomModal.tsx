import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

//props
interface customModalProps {
    title: string;
    content: Array<string>;
}
//state
interface State {
    open: boolean;
}
const initialState: State = {
    open: false
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomModal: FC<customModalProps> = (props) => {
    const [state, setState] = useState<State>(initialState);

    const handleClick = (): void => {
        setState({
            ...state,
            open: !state.open
        })
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClick}>
                {props.title}
            </Button>
            <Dialog
                open={state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClick}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.content.map((element)=>{
                            return element
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClick}>Chiudi</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CustomModal