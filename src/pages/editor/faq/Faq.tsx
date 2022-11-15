import { FC, useState, BaseSyntheticEvent, useEffect } from "react";

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
import { AlertColor } from "@mui/material";

//Components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../../components/functional/table/CustomTable";
import ButtonIcon from "../../../components/functional/buttonIcon/ButtonIcon";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";
import DeleteModal from "../../../components/functional/deleteModal/DeleteModal";

//API
import { fetchData } from "../../../utils/fetchData";
import { getFaq, putFaqInfo } from "../../../services/api/faq/faqApi";

//Translation
import { useTranslation } from "react-i18next";

//type
type Info = {
  title: string;
  text: string;
}

//interface
interface State {
  titleError: boolean;
  textError: boolean;
  modalIsOpen: boolean;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackAdd: boolean;
  ready: boolean;
  qna: Array<any>;
  info: Info;
}

const initState: State = {
  titleError: false,
  textError: false,
  modalIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackAdd: false,
  ready: false,
  qna: [],
  info: {
    title: '',
    text: '',
  },
};

const Faq: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initState);

  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getFaqData();
  }, [])

  //fetchAPI
  const getFaqData = async (): Promise<void> => {
    let res = await fetchData(getFaq);
    console.log("Faq: ", res.data);

    setState({
      ...state,
      qna: res.data.qna,
      info: res.data.info,
      ready: true,
      snackIsOpen: location?.state?.open
    })
  }

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
      let info: Info = {
        title: e.target.form[0].value,
        text: e.target.form[2].value,
      };

      console.log(info);
      show = true;
      putInfo(info);
    }

    setState({
      ...state,
      snackIsOpen: show,
      titleError: titleErr,
      textError: textErr,
    });
  };

  //PutAPI
  const putInfo = async (info: Info): Promise<void> => {
    let res = await fetchData(putFaqInfo, 1, JSON.stringify(info))
    console.log("Info: ", res.data)
  }

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
      {state.ready && (
        <>
          <Box className={common.singleComponent}>
            <LabelText>
              <Box className={style.faqRow}>
                <Title text={t("Faq.table.title")} textInfo={t("Faq.table.info")} />
                <ButtonGeneric color={"green"} callback={addQna}>
                  + {t("addButton")}
                </ButtonGeneric>
              </Box>

              <CustomTable columns={columns} rows={state.qna} pageSize={5} />
            </LabelText>
          </Box>

          <form style={{ width: "100%", marginTop: "20px" }}>
            <Box className={common.singleComponent}>
              <LabelText>
                <Title text={t("Faq.info.title")} textInfo={t("Faq.info.info")} />

                <CustomTextField
                  defaultValue={!!state.info.title ? state.info.title : ""}
                  errorMessage="Inserisci un Titolo"
                  error={state.titleError}
                  placeholder={t("Faq.info.placeHolderSubTitle")} />

                <CustomTextField
                  defaultValue={!!state.info.text ? state.info.text : ""}
                  errorMessage="Inserisci del testo"
                  error={state.textError}
                  placeholder={t("Faq.info.placeHolderText")}
                  minrow={4}
                  maxrow={20}
                  multiline={true} />
              </LabelText>

              <Box className={style.saveBtn}>
                <ButtonGeneric color={common.saveButtonColor} callback={onSaveInfo}>
                  {t("saveButton")}
                </ButtonGeneric>
              </Box>
            </Box>
          </form>


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
              message={t("addSnack")}
              severity={'success'}
              callback={handleClose}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Faq;
