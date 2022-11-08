import { FC } from "react";

//mui
import Link from "@mui/material/Link";

//props
interface LinkProps {
    text: string;
    callback: Function;
}

const CustomLink: FC<LinkProps> = (props): JSX.Element => {

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
