import React, { FC } from 'react'

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

const Volunteers: FC = (): JSX.Element => {

  const log = (att: any) => () => {
    console.log(att);
  };

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
        <ButtonIcon callback={log(params)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </Box>
    );
  };

  const columns = [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "surname",
      headerName: "Cognome",
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
    </Box>
  )
}

export default Volunteers