import { FC, useState } from "react";
import CustomLink from "../../../components/functional/link/CustomLink";

//style
import style from "../../../assets/styles/common.module.scss";

//mui
import Box from "@mui/material/Box";

//components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import ButtonAddFile from "../../../components/functional/buttonAddFile/ButtonAddFile";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";

//state
interface State {
  addLeft: any;
  addRight: Array<any>;
  buttonColor: string;
}
//init state
const initialState: State = {
  addLeft: [],
  addRight: [],
  buttonColor: style.ternaryColor
}

let key:number = 0

const About: FC = () => {

  const [state, setState] = useState<State>(initialState)

  //ritorno l'elemento con il contenuto
  const getContent = (): any => {
    return <LabelText key={key++}>
      <Title text={"Contenuto"} textInfo={"Testo e media che compongono il contenuto della pagina"} />
      <CustomTextField
        error={false}
        minrow={3}
        maxrow={10}
        multiline={true}
        placeholder={"Inserisci testo"}
      />
      <ButtonAddFile callback={onSelectedFile}></ButtonAddFile>
    </LabelText>
  }

  //alla selezione dell'immagine
  const onSelectedFile = (value: string): void => {
    console.log(value)
  }

  //aggiungo un altro slot contenuto
  const addSlot = (): void => {
    let left: Array<any> = state.addLeft
    let right: Array<any> = state.addRight
    if (left.length === right.length)
      //aggiungo a sinistra
      left.push(getContent())
    else
      //aggiungo a destra
      right.push(getContent())

    setState({
      ...state,
      addLeft: left,
      addRight: right
    })
  }

  //salvo le modifiche
  const save = (): void => {

  }

  return (

    <Box className={style.component}>
      <Box className={style.doubleComponent}>

        <Box className={style.left}>
          {/*hero*/}
          <LabelText>
            <Title text={"Hero"} textInfo={"Hero della pagina con un'immagine e un testo "} />
            <ButtonAddFile callback={onSelectedFile}></ButtonAddFile>
            <CustomTextField
              error={false}
              minrow={7}
              maxrow={10}
              multiline={true}
              placeholder={"Inserisci testo"}
            />
          </LabelText>
          {/*titolo*/}
          <LabelText>
            <Title text={"Titolo"} textInfo={"Titolo della sezione con i contenuti"} />
            <CustomTextField
              error={false}
              placeholder={"Inserisci il titolo"}
            />
          </LabelText>
          {/*contenuto*/}
          {
            state.addLeft.map((element: any) => {
              return element
            })
          }
        </Box>

        <Box className={style.right}>
          {/*contenuto*/}
          {getContent()}
          {getContent()}
          {
            state.addRight.map((element: any) => {
              return element
            })
          }
          {/*link*/}
          <CustomLink
            text={"Aggiungi un altro slot"}
            callback={addSlot}
          />
          {/*salva modifiche*/}
          <ButtonGeneric 
            color={state.buttonColor}
            callback={save}
          >
              Salva modifiche
          </ButtonGeneric>
        </Box>
      </Box>
    </Box>
  )
}

export default About;