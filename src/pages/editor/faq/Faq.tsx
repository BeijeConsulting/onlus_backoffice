import React, { FC, useState } from "react";

//Navigazione
import { useNavigate, useLocation } from "react-router-dom";
import PAGES from "../../../router/pages";

//Style
import common from "../../../assets/styles/common.module.scss";
import style from "./faq.module.scss";

//MUI
import { Box } from "@mui/system";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

//Components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../../components/functional/table/CustomTable";
import ButtonIcon from "../../../components/functional/buttonIcon/ButtonIcon";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";
import DeleteModal from "../../../components/functional/deleteModal/DeleteModal";

//Data
import { faq } from "../../../utils/mockup/data";

interface State {
  titleError: boolean;
  textError: boolean;
  snackIsOpen: boolean;
  modalIsOpen: boolean;
  snackDeleteIsOpen: boolean;
}

const initState: State = {
  titleError: false,
  textError: false,
  modalIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
};

const Faq: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);

  const navigate = useNavigate();
  const location = useLocation();

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
      snackDeleteIsOpen: false,
    });
  };

  //Funzione per salvare le modifiche della sezione info
  const onSaveInfo = (e: any): void => {
    let titleErr = false;
    let textErr = false;
    let show = false;

    if (e.target.form[0].value === "") {
      titleErr = true;
    }

    if (e.target.form[2].value === "") {
      textErr = true;
    }

    if (!titleErr && !textErr) {
      let info = {
        title: e.target.form[0].value,
        text: e.target.form[2].value,
      };

      console.log(info);
      show = true;
    }

    setState({
      ...state,
      snackIsOpen: show,
      titleError: titleErr,
      textError: textErr,
    });
  };

  //Navigazione allo screen EditorFaq
  const addQna = (): void => {
    navigate(PAGES.editorFaq);
  };

  //Funzioni di modifica e cancella
  const updateQna = (row: object) => () => {
    console.log(row);
    navigate(PAGES.editorFaq, { state: { row } });
  };

  //elimino faq
  const deleteQna = (): void => {
    setState({
      ...state,
      snackDeleteIsOpen: true,
      modalIsOpen: false,
    });
  };

  //mostro/nascondo modal di eliminazione della faq
  const showDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  };

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <>
        <ButtonIcon callback={updateQna(params.row)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={showDeleteModal}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </>
    );
  };

  const columns = [
    {
      field: "question",
      headerName: "DOMANDA",
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
      <Box
        className={common.singleComponent}
        sx={{
          marginBottom: "1%",
          textAlign: "right",
        }}
      >
        <form>
          <LabelText>
            <Title
              text={"Info"}
              textInfo={
                "Sezione Info della pagina FAQ, clicca sul pulsante Salva modifiche per accettare i cambiamenti della pagina"
              }
            />

            <CustomTextField
              defaultValue={!!faq.info.title ? faq.info.title : ""}
              errorMessage="Inserisci un Titolo"
              error={state.titleError}
              placeholder={"Titolo"}
            />

            <CustomTextField
              defaultValue={!!faq.info.text ? faq.info.text : ""}
              errorMessage="Inserisci del testo"
              error={state.textError}
              placeholder={"Inserisci testo"}
              minrow={4}
              maxrow={20}
              multiline={true}
            />
          </LabelText>

          <Box className={style.saveBtn}>
            <ButtonGeneric color={common.saveButtonColor} callback={onSaveInfo}>
              Salva modifiche
            </ButtonGeneric>
          </Box>
        </form>
      </Box>

      <Box className={common.singleComponent}>
        <LabelText>
          <Box className={style.faqRow}>
            <Title
              text={"Faq"}
              textInfo={
                "Domande presenti nella sezione FAQ della pagina, clicca sul pulsante +Aggiungi per aggiungere una nuova domanda e risposta, clicca sui bottoni modifica o cancella per cambiare la struttura dati"
              }
            />

            <ButtonGeneric color={common.ternaryColor} callback={addQna}>
              + Aggiungi
            </ButtonGeneric>
          </Box>

          <CustomTable columns={columns} rows={faq.qna} pageSize={3} />
        </LabelText>
      </Box>

      {/* delete modal */}
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={showDeleteModal}
        deleteCallback={deleteQna}
      />

      {location?.state?.open && (
        <CustomSnackbar
          message={"Modifiche avvenute con successo"}
          severity={"success"}
          callback={handleClose}
        />
      )}

      {state.snackIsOpen && (
        <CustomSnackbar
          message={"Modifiche ad info salvate con successo"}
          severity={"success"}
          callback={handleClose}
        />
      )}
      {state.snackDeleteIsOpen && (
        <CustomSnackbar
          message={"Eliminazione avvenuta con successo"}
          severity={"info"}
          callback={handleClose}
        />
      )}
    </Box>
  );
};

export default Faq;
