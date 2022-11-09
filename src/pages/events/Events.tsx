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
//translation
import { useTranslation } from "react-i18next";

interface eventsProps {}

interface State {
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  modalIsOpen: boolean;
}

const initialState: State = {
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  modalIsOpen: false,
};

const Events: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [state, setState] = useState<State>(initialState);

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

  //elimina evento
  const deleteEvent = (): void => {
    setState({
      ...state,
      snackDeleteIsOpen: true,
      modalIsOpen: false,
    });
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
      headerName: t("Events.table.title"),
      flex: 1,
    },
    {
      field: "place",
      headerName: t("Events.table.place"),
      flex: 1,
    },
    {
      field: "date",
      headerName: t("Events.table.date"),
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
      headerName: t("Events.table.title"),
      flex: 1,
    },
    {
      field: "place",
      headerName: t("Events.table.place"),
      flex: 1,
    },
    {
      field: "date",
      headerName: t("Events.table.date"),
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
        <Box  sx={{display: "flex", justifyContent: "space-between"}}>
          <Title
            text={t("Events.NewEvents.title")}
            textInfo={t("Events.NewEvents.info")}
          />
          <ButtonGeneric color={"green"} callback={goToEditor}>
            + {t("Events.addButton")}
          </ButtonGeneric>
        </Box>
        <LabelText>

          {/* sezione eventi in programma*/}
          <CustomTable columns={columns_1} rows={events} />
        </LabelText>

        {/* sezione archivio eventi  */}
        <LabelText>
          <Box sx={{marginTop : "20px"}}>
            <Title
              text={t("Events.OldEvents.title")}
              textInfo={t("Events.OldEvents.info")}
            />
              <CustomTable columns={columns_2} rows={events} />
          </Box>
        </LabelText>
        
      </Box>

      {/* delete modal */}
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={showDeleteModal}
        deleteCallback={deleteEvent}
      />

      {/* snackbar */}
      {location?.state?.open && (
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
    </Box>
  );
};

export default Events;