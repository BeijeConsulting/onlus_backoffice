import { FC,useState } from "react";

//style
import style from "./labelTextStyle.module.scss";

//mui
import TextField from "@mui/material/TextField";

interface labelTextProps {
  text: string;
  textInfo: string;
  error: boolean;
}

const LabelText: FC<labelTextProps> = (props) => {

    const [error,setError] = useState(false);

    function validate(e:any){
        if(e !== 4){
            setError(true)
        }
    }
  return (
    <>
      <div className={style.containerLabelText}>
        <div className="labelTextInfo">
            <h2>{props.text}</h2>
        </div>
        <TextField
          id="outlined-error-helper-text"
          helperText = {props.error ? "Inserire valore" : ""}
          error={props.error} 
        />
      </div>
    </>
  );
};

export default LabelText;
