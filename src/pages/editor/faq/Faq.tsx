import React, { FC } from 'react'

//Style
import common from "../../../assets/styles/common.module.scss";
import style from "./faq.module.scss";

//MUI
import { Box } from '@mui/system';
import { Anchor } from '@mui/icons-material';

//Components
import LabelText from '../../../components/functional/labelText/LabelText';
import Title from '../../../components/functional/title/Title';
import CustomTextField from '../../../components/functional/textField/CustomTextField';
import ButtonGeneric from '../../../components/functional/buttonGeneric/ButtonGeneric';
import CustomTable from '../../../components/functional/table/CustomTable';
import ButtonIcon from '../../../components/functional/buttonIcon/ButtonIcon';

//Data
import { faq } from "../../../utils/mockup/data";

const Faq: FC = (): JSX.Element => {

  const log = (att: any) => () => {
    console.log(att);
  };

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <>
        <ButtonIcon callback={log(params)}>
          <Anchor
            sx={{ fontSize: "18px" }}
          />
        </ButtonIcon>
        <ButtonIcon>
          <Anchor sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </>
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
      <Box className={common.singleComponent}>
        <LabelText>
          <Title text={"Info"} textInfo={"Sezione Info della pagina FAQ, clicca sul pulsante Salva modifiche per accettare i cambiamenti della pagina"} />

          <CustomTextField
            placeholder={'Titolo'}
            error={false}
          />

          <CustomTextField
            placeholder={'Inserisci testo'}
            error={false}
            minrow={4}
            maxrow={20}
            multiline={true}
          />
        </LabelText>
      </Box>

      <ButtonGeneric color={common.ternaryColor} callback={log}>
        Salva modifiche
      </ButtonGeneric>

      <Box className={common.singleComponent}>
        <Box className={style.faqRow}>
          <Title
            text={"Faq"}
            textInfo={"Domande presenti nella sezione FAQ della pagina, clicca sul pulsante +Aggiungi per aggiungere una nuova domanda e risposta, clicca sui bottoni modifica o cancella per cambiare la struttura dati"}
          />

          <ButtonGeneric color={common.ternaryColor} callback={log}>
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