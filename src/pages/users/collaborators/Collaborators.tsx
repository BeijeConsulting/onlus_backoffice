import React, { FC, useState, useEffect } from 'react'

//Navigazione
import { useLocation, useNavigate } from "react-router-dom";
import PAGES from "../../../router/pages";

//Data
import { users } from "../../../utils/mockup/data";

//Style
import common from "../../../assets/styles/common.module.scss";
import style from "./collaborators.module.scss";

//MUI
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

//Components
import Title from '../../../components/functional/title/Title';
import CustomTable from '../../../components/functional/table/CustomTable';
import ButtonIcon from '../../../components/functional/buttonIcon/ButtonIcon';
import DeleteModal from '../../../components/functional/deleteModal/DeleteModal';
import LabelText from '../../../components/functional/labelText/LabelText'
import CustomSnackbar from '../../../components/functional/customSnackbar/CustomSnackbar'
import ButtonGeneric from '../../../components/functional/buttonGeneric/ButtonGeneric';

//i18n
import { useTranslation } from 'react-i18next';

interface State {
  modalIsOpen: boolean;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackAdd: boolean
}

const initialState: State = {
  modalIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackAdd: false
};

const Collaborators: FC = (): JSX.Element => {

  const [state, setState] = useState<State>(initialState);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setState({
      ...state,
      snackIsOpen: location?.state?.open,
    });
  }, [])

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
      snackDeleteIsOpen: false
    })
  }

  //Modal
  const openDeleteModal = (row: object) => (): void => {

    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  }

  const closeDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
      snackDeleteIsOpen: true
    });
  }

  //Funzioni di modifica e cancella
  const updateAdmin = (row: object) => (): void => {
    navigate(PAGES.editorCollaborators, { state: { row } })
  };

  const addAdmin = (): void => {
    navigate(PAGES.editorCollaborators, { state: {showAdd: true} })
  }

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    
    return (
      <>
        <ButtonIcon callback={updateAdmin(params.row)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={openDeleteModal(params.row)}>
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
      // valueGetter: (params: any) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  return (
    <Box className={common.component}>
      <Box className={common.singleComponent}>
        <LabelText>
          {/*titolo*/}
          <Box className={style.titleRow}>
            <Title
              text={t("Collaborators.title")}
              textInfo={t("Collaborators.info")}
            />

            <ButtonGeneric color={common.ternaryColor} callback={addAdmin}>
              + {t("addButton")}
            </ButtonGeneric>
          </Box>

          {/*tabella*/}
          <CustomTable
            columns={columns}
            rows={users}
            pageSize={5}
          />
        </LabelText>

        <DeleteModal
          open={state.modalIsOpen}
          closeCallback={closeDeleteModal}
          deleteCallback={closeDeleteModal /*API delete*/}
        />
      </Box>
      {
        state.snackIsOpen &&
        <CustomSnackbar message={"Modifiche avvenute con successo"} severity={"success"} callback={handleClose}/>
      }
      {
        state.snackDeleteIsOpen &&
        <CustomSnackbar message={"Eliminazione avvenuta con successo"} severity={"info"} callback={handleClose} />
      }
      {
       location?.state?.openAdd &&
        <CustomSnackbar message={"Inserimento avvenuto con successo"} severity={"success"} callback={handleClose} />
      }
    </Box>
  )
}

export default Collaborators