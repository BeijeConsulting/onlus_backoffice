import {FC} from 'react';

//style
import style from './labelTextStyle.module.scss';

interface labelTextProps{
    text: string,
    textInfo: string
}

const LabelText: FC<labelTextProps> = (props) => {
    return(
        <>
            <div className={style.containerLabelText}>

            </div>
        </>
    )
}

export default LabelText;