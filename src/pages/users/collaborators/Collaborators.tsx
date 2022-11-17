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
import { getActiveCollaborators, getDeactivatedCollaborators, deleteCollaboratorById, activateCollaboratorById, getActiveGuests, getDeactivatedGuests } from "../../../services/api/collaborators/collaborators";

//i18n
import { useTranslation } from "react-i18next";

//Redux
import { useSelector } from 'react-redux/es/exports'
import roles from '../../../utils/roles'

//Utils
import { User } from "../../../utils/mockup/types";

interface State {
  modalIsOpen: boolean;
  modalActiveIsOpen: boolean;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackAdd: boolean;
  ready: boolean;
  collaborators: Array<User>;
  deactivated: Array<User>;
  idToDelete: number;
  idToActivate: number;
}

const initialState: State = {
  modalIsOpen: false,
  modalActiveIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackAdd: false,
  ready: false,
  collaborators: [],
  deactivated: [],
  idToDelete: null,
  idToActivate: null,
};

const Collaborators: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initialState);
  const { t, i18n } = useTranslation();

  const currentUser = useSelector((state: any) => state.userDuck.user)

  const navigate = useNavigate();
  const location = useLocation();

  //prende i dati dei collaboratori o degli utenti in base alla pagina in cui si trova
  useEffect(() => {
    setState({
      ...state,
      snackIsOpen: location?.state?.open,
      ready: false,
    });

    if (window.location.href.includes('collaborators')) {
      getCollaboratorsData()
    } else {
      getGuestsData()
    }
  }, [window.location.href]);

  //fetchAPI collaborators
  const getCollaboratorsData = async (): Promise<void> => {
    let res = await fetchData(getActiveCollaborators);
    let res2 = await fetchData(getDeactivatedCollaborators);
    console.log("Collab: ", res.data);
    console.log("Deactivated: ", res2.data);

    setState({
      ...state,
      collaborators: res.data,
      deactivated: res2.data,
      ready: true,
      snackIsOpen: location?.state?.open
    })
  }

  //fetchAPI guests
  const getGuestsData = async (): Promise<void> => {
    let res = await fetchData(getActiveGuests);
    let res2 = await fetchData(getDeactivatedGuests);
    console.log("Guests: ", res.data);
    console.log("Deactivated: ", res2.data);

    setState({
      ...state,
      collaborators: res.data,
      deactivated: res2.data,
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

  const openActiveModal = (id: number) => (): void => {
    setState({
      ...state,
      modalActiveIsOpen: !state.modalActiveIsOpen,
      idToActivate: id,
    });
  };

  //chiude il modale
  const closeDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  };

  const closeActiveModal = (): void => {
    setState({
      ...state,
      modalActiveIsOpen: !state.modalActiveIsOpen,
    });
  };

  //elimina l'utente
  const deleteUser = async (): Promise<void> => {

    deleteApi(state.idToDelete)
    let tmp = Object.assign([], state.deactivated)
    let add = state.collaborators.find(obj => obj.id === state.idToDelete)
    add.disableDate = new Date().toDateString()
    tmp.push(add)

    setState({
      ...state,
      modalIsOpen: false,
      snackDeleteIsOpen: true,
      collaborators: state.collaborators.filter((row) => row.id !== state.idToDelete),
      deactivated: tmp,
      idToDelete: null,
    });
  };

  //DeleteAPI
  const deleteApi = async (id: number): Promise<void> => {
    let res = await fetchData(deleteCollaboratorById, id)
    console.log("Delete: ", res.data)
  }

  //riattiva l'utente
  const activateUser = async (): Promise<void> => {

    putActiveApi(state.idToActivate)
    let tmp = Object.assign([], state.collaborators)
    let add = state.deactivated.find(obj => obj.id === state.idToActivate)
    add.disableDate = ''
    tmp.push(add)

    setState({
      ...state,
      modalActiveIsOpen: false,
      snackDeleteIsOpen: true,
      deactivated: state.deactivated.filter((row) => row.id !== state.idToActivate),
      collaborators: tmp,
      idToActivate: null,
    });
  }

  //PutActiveApi
  const putActiveApi = async (id: number): Promise<void> => {
    let res = await fetchData(activateCollaboratorById, id)
    console.log("Active: ", res)
  }

  //Funzioni di modifica e aggiunta
  const updateUser = (row: object) => (): void => {
    if (window.location.href.includes('collaborators')) {
      navigate(PAGES.editorCollaborators, { state: { row } });
    } else {
      navigate(PAGES.editorVolunteers, { state: { row } });
    }
  };

  const addUser = (): void => {
    if (window.location.href.includes('collaborators')) {
      navigate(PAGES.editorCollaborators, { state: { showAdd: true } });
    } else {
      navigate(PAGES.editorVolunteers, { state: { showAdd: true } });
    }
  };

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {

    //tabella disattivi
    if (params.row.disableDate !== '') {
      if (params.row.role.includes(roles.owner) && !currentUser?.permission.includes(roles.owner)) {

        return (
          <ButtonIcon disable={true}>
            <CreateIcon sx={{ fontSize: "18px", color: 'gray' }} />
          </ButtonIcon>
        );

      } else {

        return (
          <ButtonIcon callback={openActiveModal(params.row.id)}>
            <CreateIcon sx={{ fontSize: "18px" }} />
          </ButtonIcon>
        );
      }

    } else {

      //tabella attivi
      if (params.row.role.includes(roles.owner) && !currentUser?.permission.includes(roles.owner)) {
        return (
          <>
            <ButtonIcon disable={true}>
              <CreateIcon sx={{ fontSize: "18px", color: 'gray' }} />
            </ButtonIcon>
            <ButtonIcon disable={true}>
              <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px", color: 'gray' }} />
            </ButtonIcon>
          </>
        );

      } else {
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
      }
    }
  };

  const renderValue = (params: any) => {
    return params.row.role[0];
  }

  const columnsCollaborators = [
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
      valueGetter: renderValue,
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

  const columnsGuest = [
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
      field: "email",
      headerName: "EMAIL",
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
                {
                  window.location.href.includes('collaborators') ?
                    <Title
                      text={t("Collaborators.title")}
                      textInfo={
                        t("Collaborators.info")
                      }
                    />
                    :
                    <Title
                      text={t("Volunteers.title")}
                      textInfo={
                        t("Volunteers.info")
                      }
                    />
                }
                <ButtonGeneric color={"green"} callback={addUser}>
                  + {t("addButton")}
                </ButtonGeneric>
              </Box>

              {/*tabella*/}
              <CustomTable
                columns={
                  window.location.href.includes('collaborators') ?
                    columnsCollaborators
                  :
                    columnsGuest
                }
                rows={state.collaborators}
                pageSize={5}
              />
            </LabelText>

            <Box sx={{ height: "20px" }} />

            <LabelText>
              {/*titolo*/}
              <Box className={style.titleRow}>
                <Title
                  text={t("Collaborators.titleDeactive")}
                  textInfo={
                    t("Collaborators.infoDeactive")
                  }
                />
              </Box>

              {/*tabella*/}
              <CustomTable
                columns={
                  window.location.href.includes('collaborators') ?
                    columnsCollaborators
                  :
                    columnsGuest
                }
                rows={state.deactivated}
                pageSize={5}
              />
            </LabelText>

            <DeleteModal
              open={state.modalIsOpen}
              closeCallback={closeDeleteModal}
              deleteCallback={deleteUser}
            />

            <DeleteModal
              open={state.modalActiveIsOpen}
              closeCallback={closeActiveModal}
              deleteCallback={activateUser}
              modalText={"Collaborators.activeModalText"}
              deleteBtnText={"Collaborators.activeModalBtn"}
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
