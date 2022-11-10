import { Box } from "@mui/material";
import { FC, useState, useEffect } from "react";

//navigation
import { useLocation, useNavigate } from "react-router-dom";

//components
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../../components/functional/table/CustomTable";
import DeleteModal from "../../../components/functional/deleteModal/DeleteModal";
import ButtonIcon from "../../../components/functional/buttonIcon/ButtonIcon";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";
import LabelText from "../../../components/functional/labelText/LabelText";

//data
import { articles } from "../../../utils/mockup/data";

//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";

//pages
import PAGES from "../../../router/pages";

//style
import common from "../../../assets/styles/common.module.scss";
//translation
import { useTranslation } from "react-i18next";

//interface
interface State {
  modalIsOpen: boolean;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackAdd: boolean;
}
const initialState: State = {
  modalIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackAdd: false,
};

const Blog: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>(initialState);
  const { t } = useTranslation();

  const location = useLocation();

  useEffect(() => {
    setState({
      ...state,
      snackIsOpen: location?.state?.open,
    });
  }, []);

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
      snackDeleteIsOpen: false,
    });
  };

  //mostro/nascondo modal di eliminazione dell'evento
  const showDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  };

  //elimina articolo
  const deleteArticle = (): void => {
    setState({
      ...state,
      snackDeleteIsOpen: true,
      modalIsOpen: false,
    });
  };

  //Funzioni di modifica e cancella
  const updateArticle = (row: object) => (): void => {
    navigate(PAGES.editorBlog, { state: { row } });
  };

  const addArticle = (): void => {
    navigate(PAGES.editorBlog, { state: { showAdd: true } });
  };

  const goToEditor = (): void => {
    navigate(PAGES.editorBlog);
  };

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <Box
        style={{
          display: "flex",
          gap: "5px",
        }}
      >
        <ButtonIcon callback={updateArticle(params.row)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={showDeleteModal}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </Box>
    );
  };

  const columns = [
    {
      field: "title",
      headerName: t("articles.table.headerTable1"),
      flex: 2,
    },
    {
      field: "author",
      headerName: t("articles.table.headerTable2"),
      flex: 2,
      valueGetter: (params: any) =>
        `${params.row.name || ""} ${params.row.surname || ""}`,
    },
    {
      field: "date",
      headerName: t("articles.table.headerTable3"),
      flex: 2,
    },
    {
      field: "status",
      headerName: t("articles.table.headerTable4"),
      flex: 2,
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Title
                text={"Archivio Blog"}
                textInfo={
                  "tabella dove vengono viualizzati tutti gli articoli pubblicati, nel caso del singolo blogger vedrà solo i suoi articoli, gli admin vedranno tutti gli articoli"
                }
              />
              <ButtonGeneric color={"green"} callback={addArticle}>
                + Aggiungi
              </ButtonGeneric>
            </Box>

            {/* sezione eventi in programma*/}
            <CustomTable columns={columns} rows={articles} />
          </LabelText>
        </Box>

        {/* delete modal */}
        <DeleteModal
          open={state.modalIsOpen}
          closeCallback={showDeleteModal}
          deleteCallback={deleteArticle}
        />

        {/* snackbar */}
        {state.snackIsOpen && (
          <CustomSnackbar
            message={t("changeSnack")}
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
            message={"Inserimento avvenuto con successo"}
            severity={"success"}
            callback={handleClose}
          />
        )}
      </Box>
  );
};

export default Blog;
