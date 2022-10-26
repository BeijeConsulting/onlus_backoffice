import React, { ChangeEvent, FC, useEffect, useState } from 'react'

//style
import style from "./buttonAddFile.module.scss";

//mui
import { Button, Box } from '@mui/material'
//props
interface buttonAddFileProps {
    children?: any;
}
//state
interface State {
    selectedImage: string;
}
const initialState: State = {
    selectedImage: ""
}
const ButtonAddFile: FC<buttonAddFileProps> = (props) => {

    const [state, setState] = useState<State>(initialState)

    const onChangeInput = (e:ChangeEvent<HTMLInputElement>):void => {
        setState({
            ...state,
            selectedImage: e!.target!.files[0]!.name!
        })
    }

    return (
        <Box>

            <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={onChangeInput}
            />
            <label htmlFor="select-image">
                <Button variant="contained" color="primary" component="span">
                    {state.selectedImage}
                </Button>
            </label>
        </Box>
    )
}

export default ButtonAddFile