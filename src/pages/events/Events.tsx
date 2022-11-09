import { FC, useState, useEffect } from "react";
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
  modalIsOpen: boolean;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackAdd: boolean;
}
const initialState: State = {
  modalIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackAdd: false
};

const Events: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState<State>(initialState);

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
  const openDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  }

  //chiudo il modale
  const closeDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen
    });
  }

  //elimino l'evento
  const deleteEvent = (): void => {
    setState({
      ...state,
      modalIsOpen: false,
      snackDeleteIsOpen: true
    })
  }

  //modifica evento
  const updateEvent = (row: object) => (): void => {
    navigate(PAGES.editorEvents, { state: { row } })
  };

  const addEvent = (): void => {
    navigate(PAGES.editorEvents, { state: { showAdd: true } })
  }

  //Colonne del DataGrid
  const renderDetailsButton_1 = (params: any) => {
    return (
      <>
        <Box
          style={{
            display: "flex",
            gap: "5px",
          }}
        >
          <ButtonIcon callback={updateEvent(params)}>
            <CreateIcon sx={{ fontSize: "18px" }} />
          </ButtonIcon>
          <ButtonIcon callback={openDeleteModal}>
            <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
          </ButtonIcon>
        </Box>
      </>
    );
  };

  const renderDetailsButton_2 = (params: any) => {
    return (
      <>
        <Box
          style={{
            display: "flex",
            gap: "5px",
          }}
        >
          <ButtonIcon callback={openDeleteModal}>
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
      renderCell: renderDetailsButton_1
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
      renderCell: renderDetailsButton_2
    },
  ];

  return (
    <Box className={style.component}>
      <Box className={style.singleComponent}>
        <LabelText>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Title
              text={"Eventi in programma"}
              textInfo={
                "Tabella dove vengono visualizzati i prossimi eventi in programma"
              }
            />
            <ButtonGeneric color={"green"} callback={addEvent}>
              + Aggiungi
            </ButtonGeneric>
          </Box>

          {/* sezione eventi in programma*/}
          <CustomTable columns={columns_1} rows={events} pageSize={5} />
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
            <CustomTable columns={columns_2} rows={events} pageSize={5} />
          </LabelText>
        </Box>
      </Box>


      {/* delete modal */}
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={closeDeleteModal}
        deleteCallback={deleteEvent /*API delete*/}
      />
      {
        state.snackIsOpen &&
        <CustomSnackbar message={"Modifiche avvenute con successo"} severity={"success"} callback={handleClose} />
      }
      {
        state.snackDeleteIsOpen &&
        <CustomSnackbar message={"Eliminazione avvenuta con successo"} severity={"info"} callback={handleClose} />
      }
      {
        location?.state?.openAdd &&
        <CustomSnackbar message={"Inserimento avvenuto con successo"} severity={"success"} callback={handleClose} />
      }
    </Box >
  );
};

export default Events;