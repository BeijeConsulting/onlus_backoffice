import { Box } from "@mui/material";
import { FC, useState, useEffect } from "react";

//api
import {
  deleteApiArticleById,
  getApiArticleById,
  getApiArticles,
  postApiArticle,
  putApiArticleById
} from "../../../services/api/blog/blogApi";

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
import { fetchData } from '../../../utils/fetchData'

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
  ready: boolean,
  modalIsOpen: boolean;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackAdd: boolean;
  articles: Array<any>;
}
const initialState: State = {
  ready: false,
  modalIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackAdd: false,
  articles: []
};

const Blog: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>(initialState);
  const { t } = useTranslation();

  const location = useLocation();

  //component did mount
  useEffect(() => {
    getArticles();
  }, []);

  //fetchAPI
  const getArticles = async (): Promise<void> => {
    let res = await fetchData(getApiArticles);
    console.log("Articles",res.data)
    setState({
      ...state,
      articles: res.data,
      ready: true,
      snackIsOpen: location?.state?.open
    })
  };

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

  //modifica articolo
  const updateArticle = (id: number) => (): void => {
    navigate(PAGES.editorBlog, { state: { id: id } });
  };

  //aggiungni articolo
  const addArticle = (): void => {
    navigate(PAGES.editorBlog, { state: { showAdd: true } });
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
        <ButtonIcon callback={updateArticle(params.row.id)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={showDeleteModal}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </Box>
    );
  };

  //colonne del datagrid
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
      {state.ready && (
        <>
          <Box className={common.singleComponent}>
            <LabelText>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Title text={t("articles.title")} textInfo={t("articles.info")} />
                <ButtonGeneric color={"green"} callback={addArticle}>
                  + {t("addButton")}
                </ButtonGeneric>
              </Box>

              {/* sezione eventi in programma*/}
              <CustomTable columns={columns} rows={state.articles} />
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
              message={t("addSnack")}
              severity={"success"}
              callback={handleClose}
            />
          )}

        </>
      )}
    </Box>
  );
};

export default Blog;
