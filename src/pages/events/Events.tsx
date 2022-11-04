import { Box, Typography, Modal } from "@mui/material";
import { FC, useState, useEffect } from "react";

//router dom
import { useNavigate, useLocation } from "react-router-dom";

//PAGES
import PAGES from "../../router/pages";

//style
import style from "../../assets/styles/common.module.scss";
import eventsStyle from "./eventsStyle.module.scss";

//components
import Title from "../../components/functional/title/Title";
import ButtonGeneric from "../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../components/functional/table/CustomTable";
import ButtonIcon from "../../components/functional/buttonIcon/ButtonIcon";

//mockup data
import { events } from "../../utils/mockup/data";

//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";

//modal
import DeleteModal from "../../components/functional/deleteModal/DeleteModal";
import CustomSnackbar from "../../components/functional/customSnackbar/CustomSnackbar";

interface eventsProps {}

interface State {
  modalIsOpen: boolean;
  snackIsOpen: boolean
}

const initialState: State = {
  modalIsOpen: false,
  snackIsOpen: false
};

const Events: FC<eventsProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState<State>(initialState);

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
    })
  }

  useEffect(()=>{
    setState({
      ...state,
      snackIsOpen: location?.state?.openSnack
    })
  },[])

  function openDeleteModal(): void {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  }

 
  //functions
  function goToEditor(): void {
    navigate(PAGES.editorEvents);
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
          <ButtonIcon callback={goToEditor}>
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
        <Box className={eventsStyle.titleFlex}>
          <Title
            text={"Eventi in programma"}
            textInfo={
              "Tabella dove vengono visualizzati i prossimi eventi in programma"
            }
          />
          <ButtonGeneric color={style.ternaryColor} callback={goToEditor}>
            + Aggiungi evento
          </ButtonGeneric>
        </Box>

        {/* sezione eventi in programma*/}
        <Box className={eventsStyle.tableContainer}>
          <CustomTable columns={columns_1} rows={events} />
        </Box>

        {/* sezione archivio eventi  */}
        <Box className={eventsStyle.archivesContainer}>
          <Title
            text={"Archivio eventi"}
            textInfo={
              "Tabella dove viene visualizzato l'archivio di tutti gli eventi passati"
            }
          />
          <Box className={eventsStyle.tableContainer}>
            <CustomTable columns={columns_2} rows={events} />
          </Box>
        </Box>
      </Box>

      {/* modal */}
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={openDeleteModal}
        deleteCallback={openDeleteModal}
      />

      {/* snackbar */}
      {
        state.snackIsOpen && 
        <CustomSnackbar 
          message={"Il salvataggio è andato "}
          severity={"success"} 
          callback={handleClose}
        />
      }

    </Box>
  );
};

export default Events;
