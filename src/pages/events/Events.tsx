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

//translation
import { useTranslation } from 'react-i18next';

interface eventsProps {}

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

const Events: FC<eventsProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState<State>(initialState);
  const { t, i18n } = useTranslation();

  useEffect(()=>{
    console.log('mounted')
  },[])

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
          <ButtonIcon callback={showDeleteModal}>
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
        <Box className={eventsStyle.titleFlex}>
          <Title
            text={"Eventi in programma"}
            textInfo={
              "Tabella dove vengono visualizzati i prossimi eventi in programma"
            }
          />
          <ButtonGeneric color={style.ternaryColor} callback={goToEditor}>
            + {t("Events.addButton")}
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
      

    </Box>
  );
};

export default Events;
