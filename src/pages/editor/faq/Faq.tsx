import React, { FC, useState } from 'react'

//Navigazione
import { useNavigate } from "react-router-dom";
import PAGES from "../../../router/pages";

//Style
import common from "../../../assets/styles/common.module.scss";
import style from "./faq.module.scss";

//MUI
import { Box } from '@mui/system';
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

//Components
import LabelText from '../../../components/functional/labelText/LabelText';
import Title from '../../../components/functional/title/Title';
import CustomTextField from '../../../components/functional/textField/CustomTextField';
import ButtonGeneric from '../../../components/functional/buttonGeneric/ButtonGeneric';
import CustomTable from '../../../components/functional/table/CustomTable';
import ButtonIcon from '../../../components/functional/buttonIcon/ButtonIcon';

//Data
import { faq } from "../../../utils/mockup/data";

interface State {
  titleError: boolean;
  textError: boolean;
}

const initState: State = {
  titleError: false,
  textError: false,
};

const Faq: FC = (): JSX.Element => {

  const [state, setState] = useState<State>(initState);

  const navigate = useNavigate();

  //Funzione per salvare le modifiche della sezione info
  const onSaveInfo = (e: any): void => {

    let titleErr = false;
    let textErr = false;

    if (e.target.form[0].value === "") {
      titleErr = true;
    }

    if (e.target.form[2].value === "") {
      textErr = true;
    }

    setState({
      titleError: titleErr,
      textError: textErr,
    })

    if (!titleErr && !textErr) {
      let info = {
        title: e.target.form[0].value,
        text: e.target.form[2].value,
      };

      console.log(info);
    }
  }

  //Navigazione allo screen EditorFaq
  const addQna = (): void => {
    navigate('/' + PAGES.editorFaq)
  }

  //Funzioni di modifica e cancella
  const updateQna = (row: object) => () => {
    console.log(row);
    navigate('/' + PAGES.editorFaq, {state: { row }})
  };

  const deleteQna = (row: object) => () => {
    console.log(row);
  }


  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <Box sx={{
        width: '10%',
        display: 'flex',
        flexGrow: 'row wrap',
        justifyContent: 'space-between',
        marginRight: '2%',
      }}>
        <ButtonIcon callback={updateQna(params.row)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={deleteQna(params.row)}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </Box>
    );
  };

  const columns = [
    {
      field: "question",
      headerName: "Domanda",
      flex: 1,
    },
    {
      field: "icone",
      headerName: "",
      type: "number",
      sortable: false,
      flex: 1,
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <Box className={common.component}>
      <Box className={common.singleComponent} sx={{
        marginBottom: '1%',
        textAlign: 'right',
      }}>
        <form>
          <LabelText>
            <Title text={"Info"} textInfo={"Sezione Info della pagina FAQ, clicca sul pulsante Salva modifiche per accettare i cambiamenti della pagina"} />

            <CustomTextField
              errorMessage="Inserisci un Titolo"
              error={state.titleError}
              placeholder={'Titolo'}
            />

            <CustomTextField
              errorMessage="Inserisci del testo"
              error={state.textError}
              placeholder={'Inserisci testo'}
              minrow={4}
              maxrow={20}
              multiline={true}
            />
          </LabelText>

          <Box className={style.saveBtn}>
            <ButtonGeneric color={common.ternaryColor} callback={onSaveInfo}>
              Salva modifiche
            </ButtonGeneric>
          </Box>
        </form>
      </Box>

      <Box className={common.singleComponent}>
        <Box className={style.faqRow}>
          <Title
            text={"Faq"}
            textInfo={"Domande presenti nella sezione FAQ della pagina, clicca sul pulsante +Aggiungi per aggiungere una nuova domanda e risposta, clicca sui bottoni modifica o cancella per cambiare la struttura dati"}
          />

          <ButtonGeneric color={common.ternaryColor} callback={addQna}>
            +Aggiungi
          </ButtonGeneric>
        </Box>

        <CustomTable
          columns={columns}
          rows={faq.qna}
          pageSize={3}
        />
      </Box>
    </Box>

  )
}

export default Faq