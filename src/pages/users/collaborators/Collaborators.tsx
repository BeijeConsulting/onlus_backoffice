import { FC, useState, useEffect } from "react";

//Navigazione
import { useLocation, useNavigate } from "react-router-dom";
import PAGES from "../../../router/pages";

//Style
import common from "../../../assets/styles/common.module.scss";
import style from "./collaborators.module.scss";

//MUI
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

//Components
import Title from "../../../components/functional/title/Title";
import CustomTable from "../../../components/functional/table/CustomTable";
import ButtonIcon from "../../../components/functional/buttonIcon/ButtonIcon";
import DeleteModal from "../../../components/functional/deleteModal/DeleteModal";
import LabelText from "../../../components/functional/labelText/LabelText";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";

//API
import { fetchData } from "../../../utils/fetchData";
import { getCollaborators, deleteCollaboratorById } from "../../../services/api/collaborators/collaborators";

//i18n
import { useTranslation } from "react-i18next";

interface State {
  modalIsOpen: boolean;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackAdd: boolean;
  ready: boolean;
  collaborators: Array<any>;
  idToDelete: number;
}

const initialState: State = {
  modalIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackAdd: false,
  ready: false,
  collaborators: [],
  idToDelete: null,
};

const Collaborators: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initialState);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getCollaboratorsData()

    setState({
      ...state,
      snackIsOpen: location?.state?.open,
    });
  }, []);

  //fetchAPI
  const getCollaboratorsData = async (): Promise<void> => {
    let res = await fetchData(getCollaborators);
    console.log("Collab: ", res.data);

    setState({
      ...state,
      collaborators: res.data,
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

  //Modal
  const openDeleteModal = (id: number) => (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
      idToDelete: id,
    });
  };

  //chiude il modale
  const closeDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  };

  //elimina l'utente
  const deleteUser = (): void => {

    deleteApi(state.idToDelete)

    setState({
      ...state,
      modalIsOpen: false,
      snackDeleteIsOpen: true,
    });
  };

  //DeleteAPI
  const deleteApi = async (id: number): Promise<void> => {
    let res = await fetchData(deleteCollaboratorById, id)
    console.log("Delete: ", res.data)
  }

  //Funzioni di modifica e aggiunta
  const updateUser = (row: object) => (): void => {
    navigate(PAGES.editorCollaborators, { state: { row } });
  };

  const addUser = (): void => {
    navigate(PAGES.editorCollaborators, { state: { showAdd: true } });
  };

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <>
        <ButtonIcon callback={updateUser(params.row)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={openDeleteModal(params.row.id)}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </>
    );
  };

  const columns = [
    {
      field: "name",
      headerName: t("Collaborators.table.name"),
      flex: 1,
    },
    {
      field: "surname",
      headerName: t("Collaborators.table.surname"),
      flex: 1,
    },
    {
      field: "role",
      headerName: t("Collaborators.table.role"),
      flex: 1,
    },
    {
      field: "publishedArticles",
      headerName: t("Collaborators.table.blog"),
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
              {/*titolo*/}
              <Box className={style.titleRow}>
                <Title
                  text={t("Collaborators.title")}
                  textInfo={
                    t("Collaborators.info")
                  }
                />
                <ButtonGeneric color={"green"} callback={addUser}>
                  + {t("addButton")}
                </ButtonGeneric>
              </Box>

              {/*tabella*/}
              <CustomTable columns={columns} rows={state.collaborators} pageSize={5} />
            </LabelText>

            <DeleteModal
              open={state.modalIsOpen}
              closeCallback={closeDeleteModal}
              deleteCallback={deleteUser /*API delete*/}
            />
          </Box>
          {state.snackIsOpen && (
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
              severity={"success"}
              callback={handleClose}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Collaborators;
