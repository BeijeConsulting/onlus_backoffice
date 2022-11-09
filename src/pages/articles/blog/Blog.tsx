import { Box } from "@mui/material";
import { FC, useState } from "react";

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
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  modalIsOpen: boolean;
  loading: boolean;
}
const initialState: State = {
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  modalIsOpen: false,
  loading: true,
};

const Blog: FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>(initialState);
  const { t } = useTranslation();

  const location = useLocation();

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

  const goToEditor = (): void => {
    navigate(PAGES.editorBlog);
  };

  const renderDetailsButton = () => {
    return (
      <Box
        style={{
          display: "flex",
          gap: "5px",
        }}
      >
        <ButtonIcon callback={goToEditor}>
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
        <Box className={`${common.row}`}>
          <Title text={t("articles.title")} textInfo={t("articles.info")} />
          <ButtonGeneric color={common.ternaryColor} callback={goToEditor}>
            + {t("articles.addButton")}
          </ButtonGeneric>
        </Box>
        <Box>
          <CustomTable columns={columns} rows={articles} pageSize={8} />
        </Box>
      </Box>
      {/* delete modal */}
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={showDeleteModal}
        deleteCallback={deleteArticle}
      />

      {/* snackbar */}
      {location?.state?.open && (
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
      </Box>
  );
};

export default Blog;
