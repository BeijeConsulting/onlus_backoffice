import { FC, useState, BaseSyntheticEvent } from "react";

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
//translation
import { useTranslation } from "react-i18next";

//interface
interface State {
  titleError: boolean;
  textError: boolean;
  modalIsOpen: boolean;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackAdd: boolean;
}

const initState: State = {
  titleError: false,
  textError: false,
  modalIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackAdd: false,
};

const Faq: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);

  const { t } = useTranslation();

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
  const onSaveInfo = (e: BaseSyntheticEvent): void => {
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
    navigate(PAGES.editorFaq, { state: { showAdd: true } });
  };

  //Funzioni di modifica e cancella
  const updateQna = (row: object) => () => {
    navigate(PAGES.editorFaq, { state: { row } });
  };

  //Modal
  const openDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  };

  //chiudo il modale
  const closeDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  };

  //elimino la faq
  const deleteFaq = (): void => {
    setState({
      ...state,
      modalIsOpen: false,
      snackDeleteIsOpen: true,
    });
  };

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <>
        <ButtonIcon callback={updateQna(params.row)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={openDeleteModal}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </>
    );
  };

  const columns = [
    {
      field: "question",
      headerName: t("Faq.table.question"),
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
            <Title text={t("Faq.info.title")} textInfo={t("Faq.info.info")} />

            <CustomTextField
              defaultValue={!!faq.info.title ? faq.info.title : ""}
              errorMessage="Inserisci un Titolo"
              error={state.titleError}
              placeholder={t("Faq.info.placeHolderSubTitle")}
            />

            <CustomTextField
              defaultValue={!!faq.info.text ? faq.info.text : ""}
              errorMessage="Inserisci del testo"
              error={state.textError}
              placeholder={t("Faq.info.placeHolderText")}
              minrow={4}
              maxrow={20}
              multiline={true}
            />
          </LabelText>

          <Box className={style.saveBtn}>
            <ButtonGeneric color={common.saveButtonColor} callback={onSaveInfo}>
              {t("saveButton")}
            </ButtonGeneric>
          </Box>
        </form>
      </Box>

      <Box className={common.singleComponent}>
        <LabelText>
          <Box className={style.faqRow}>
            <Title text={t("Faq.table.title")} textInfo={t("Faq.table.info")} />
            <ButtonGeneric color={common.ternaryColor} callback={addQna}>
              + {t("addButton")}
            </ButtonGeneric>
          </Box>

          <CustomTable columns={columns} rows={faq.qna} pageSize={5} />
        </LabelText>
      </Box>

      <form style={{ width: "100%", marginTop: "20px" }}>
        <Box className={common.singleComponent}>
          <LabelText>
            <Title
              text={"Info"}
              textInfo={
                "Sezione Info della pagina FAQ, clicca sul pulsante Salva modifiche per accettare i cambiamenti della pagina"
              }
            />
            <Box className={common.row}>
              <Box className={common.rowLeft}>
                <CustomTextField
                  defaultValue={!!faq.info.title ? faq.info.title : ""}
                  errorMessage="Inserisci un Titolo"
                  error={state.titleError}
                  placeholder={"Titolo"}
                />
              </Box>
              <Box className={common.rowRight}>
                <CustomTextField
                  defaultValue={!!faq.info.text ? faq.info.text : ""}
                  errorMessage="Inserisci del testo"
                  error={state.textError}
                  placeholder={"Inserisci testo"}
                  minrow={10}
                  maxrow={20}
                  multiline={true}
                />
              </Box>
            </Box>
          </LabelText>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <ButtonGeneric color={common.saveButtonColor} callback={onSaveInfo}>
            Salva modifiche
          </ButtonGeneric>
        </Box>
      </form>

      {/* delete modal */}
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={closeDeleteModal}
        deleteCallback={deleteFaq /*API delete*/}
      />

      {(state.snackIsOpen || location?.state?.open) && (
        <CustomSnackbar
          message={t("changesSnack")}
          severity={"success"}
          callback={handleClose}
        />
      )}
      {state.snackDeleteIsOpen && (
        <CustomSnackbar
          message={t("deleteSnack")}
          severity={"info"}
          callback={handleClose}
        />
      )}
      {location?.state?.openAdd && (
        <CustomSnackbar
          message={t("Faq.infoSnack")}
          severity={"success"}
          callback={handleClose}
        />
      )}
    </Box>
  );
};

export default Faq;
