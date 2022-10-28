import React, { FC, useState } from "react";

//style
import style from "./linkStyle.module.scss";

//mui
import Link from "@mui/material/Link";

//props
interface LinkProps {
    text: string;
    callback: Function;
}

const CustomLink: FC<LinkProps> = (props) => {

    const handleClick = ():void => {
        props.callback()
    }

    return (
        <Link
            component="button"
            color="#000000"
            variant="body2"
            onClick={handleClick}
        >
            {props.text}
        </Link>
    );
};

export default CustomLink;
