import { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//mui
import { Box } from "@mui/material";

//PAGES
import PAGES from "../../router/pages";

//style
import style from "../../assets/styles/common.module.scss";

//components
import Title from "../../components/functional/title/Title";
import ButtonGeneric from "../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../components/functional/table/CustomTable";
import LabelText from "../../components/functional/labelText/LabelText";
import ButtonIcon from "../../components/functional/buttonIcon/ButtonIcon";
import CustomSnackbar from "../../components/functional/customSnackbar/CustomSnackbar";

//data
import { events } from "../../utils/mockup/data";

//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";

//modal
import DeleteModal from "../../components/functional/deleteModal/DeleteModal";

interface State {
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  modalIsOpen: boolean;
}

const initialState: State = {
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  modalIsOpen: false
};

const Events: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState<State>(initialState);

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
      snackDeleteIsOpen: false
    })
  }

  //mostro/nascondo modal di eliminazione dell'evento
  const showDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen
    })
  }

  //elimina evento
  const deleteEvent = (): void => {
    setState({
      ...state,
      snackDeleteIsOpen: true,
      modalIsOpen: false
    })
  };

  //functions
  function goToEditor(): void {
    navigate(PAGES.editorEvents);
  }

  //Colonne del DataGrid
  const renderDetailsButton_1 = () => {
    return (
      <>
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
      </>
    );
  };

  const renderDetailsButton_2 = () => {
    return (
      <>
        <Box
          style={{
            display: "flex",
            gap: "5px",
          }}
        >
          <ButtonIcon callback={showDeleteModal}>
            <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
          </ButtonIcon>
        </Box>
      </>
    );
  };

  const columns_1 = [
    {
      field: "title",
      headerName: "TITOLO",
      flex: 1,
    },
    {
      field: "place",
      headerName: "LUOGO",
      flex: 1,
    },
    {
      field: "date",
      headerName: "DATA",
      type: "date",
      flex: 1,
    },
    {
      field: "icone",
      headerName: "",
      type: "number",
      sortable: false,
      flex: 1,
      renderCell: renderDetailsButton_1,
      // valueGetter: (params: any) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const columns_2 = [
    {
      field: "title",
      headerName: "TITOLO",
      flex: 1,
    },
    {
      field: "place",
      headerName: "LUOGO",
      flex: 1,
    },
    {
      field: "date",
      headerName: "DATA",
      type: "date",
      flex: 1,
    },
    {
      field: "icone",
      headerName: "",
      type: "number",
      sortable: false,
      flex: 1,
      renderCell: renderDetailsButton_2,
      // valueGetter: (params: any) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  return (
    <Box className={style.component}>
      <Box className={style.singleComponent}>
        <LabelText>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Title
              text={"Eventi in programma"}
              textInfo={
                "Tabella dove vengono visualizzati i prossimi eventi in programma"
              }
            />
            <ButtonGeneric color={"green"} callback={goToEditor}>
              + Aggiungi
            </ButtonGeneric>
          </Box>

          {/* sezione eventi in programma*/}
          <CustomTable columns={columns_1} rows={events} />
        </LabelText>

        {/* sezione archivio eventi  */}
        <Box sx={{ marginTop: "20px" }}>
          <LabelText>
            <Title
              text={"Archivio eventi"}
              textInfo={
                "Tabella dove viene visualizzato l'archivio di tutti gli eventi passati"
              }
            />

            <CustomTable columns={columns_2} rows={events} />
          </LabelText>
        </Box>
      </Box>


      {/* delete modal */}
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={showDeleteModal}
        deleteCallback={deleteEvent}
      />

      {/* snackbar */}
      {
        location?.state?.open &&
        <CustomSnackbar message={"Modifiche avvenute con successo"} severity={"success"} callback={handleClose} />
      }
      {
        state.snackDeleteIsOpen &&
        <CustomSnackbar message={"Eliminazione avvenuta con successo"} severity={"info"} callback={handleClose} />
      }


    </Box >
  );
};

export default Events;