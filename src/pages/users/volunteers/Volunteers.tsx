import React, { FC, useState } from 'react'

//Navigazione
import { useNavigate } from "react-router-dom";
import PAGES from "../../../router/pages";

//Data
import { users } from "../../../utils/mockup/data";

//Style
import common from "../../../assets/styles/common.module.scss";

//MUI
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

//Components
import Title from '../../../components/functional/title/Title';
import CustomTable from '../../../components/functional/table/CustomTable';
import ButtonIcon from '../../../components/functional/buttonIcon/ButtonIcon';
import DeleteModal from '../../../components/functional/deleteModal/DeleteModal';

interface State {
  modalIsOpen: boolean;
}

const initialState: State = {
  modalIsOpen: false,
};

const Volunteers: FC = (): JSX.Element => {

  const [state, setState] = useState<State>(initialState);

  const navigate = useNavigate();

  //Modal
  const openDeleteModal = (row: object) => (): void => {

    console.log(row);

    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  }

  const closeDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  }

  //Funzioni di modifica e cancella
  const updateGuest = (row: object) => (): void => {
    console.log(row);
    navigate(PAGES.editorVolunteers, { state: { row } })
  };

  const deleteGuest = (row: object) => (): void => {
    console.log(row);
  }

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <Box sx={{
        width: '10%',
        display: 'flex',
        flexGrow: 'row wrap',
        justifyContent: 'space-between',
        marginRight: '2%',
      }}>
        <ButtonIcon callback={updateGuest(params.row)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={openDeleteModal(params.row)}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </Box>
    );
  };

  const columns = [
    {
      field: "name",
      headerName: "NOME",
      flex: 1,
    },
    {
      field: "surname",
      headerName: "COGNOME",
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
        <Title
          text={"Volontari"}
          textInfo={"Utenti registrati al sito, clicca sul pulsante modifica per aggiornare manualmente i dati dell'utente o clicca sul pulsante elimina per cancellare l'utente dal sistema"} />

        <CustomTable
          columns={columns}
          rows={users}
          pageSize={10}
        />
      </Box>

      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={closeDeleteModal}
        deleteCallback={closeDeleteModal /*API delete*/}
      />
    </Box>
  )
}

export default Volunteers