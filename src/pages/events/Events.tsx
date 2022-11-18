import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//mui
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

//PAGES
import PAGES from "../../router/pages";

//style
import common from "../../assets/styles/common.module.scss";

//components
import Title from "../../components/functional/title/Title";
import ButtonGeneric from "../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../components/functional/table/CustomTable";
import LabelText from "../../components/functional/labelText/LabelText";
import ButtonIcon from "../../components/functional/buttonIcon/ButtonIcon";
import CustomSnackbar from "../../components/functional/customSnackbar/CustomSnackbar";

//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";

//modal
import DeleteModal from "../../components/functional/deleteModal/DeleteModal";
//translation
import { useTranslation } from "react-i18next";

//api
import { fetchData } from "../../utils/fetchData";
import {
  getAllEventsApi,
  deleteEventByIdApi,
} from "../../services/api/events/eventsApi";

//date
import dayjs from "dayjs";

interface State {
  modalIsOpen: boolean;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackAdd: boolean;
  snackServerError: boolean;
  snackRequestError: boolean;
  eventsList: Array<Object>;
  scheduledEvents: Array<Object>;
  archiveEvents: Array<Object>;
  currentEventId: Number | null;
  isReady: boolean;
}
const initialState: State = {
  modalIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackAdd: false,
  snackServerError: false,
  snackRequestError: false,
  eventsList: [],
  scheduledEvents: [],
  archiveEvents: [],
  currentEventId: null,
  isReady: false,
};

const Events: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  if (location?.state !== null) {
    setTimeout(resetLocationState, 3000);
  }

  const { t } = useTranslation();

  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents(flag: boolean = null): Promise<void> {
    const resp = await fetchData(getAllEventsApi);
    const status = resp?.status;
    if (status !== 200) {
      handleResponseStatus(status);
    } else {
      splitEvents(resp?.data, flag);
    }
  }

  function splitEvents(events: Array<any>, flag: boolean = null): void {
    const scheduledEvents = events?.filter((el, index) => {
      el.eventDate = el.eventDate.substring(0, el.eventDate.length - 9);
      return dayjs().isBefore(el.eventDate);
    });
    const archiveEvents = events?.filter((el, index) => {
      return dayjs().isAfter(el.eventDate);
    });

    if (flag === null) {
      setState({
        ...state,
        snackIsOpen: location?.state?.open,
        isReady: true,
        eventsList: events,
        scheduledEvents: scheduledEvents,
        archiveEvents: archiveEvents,
      });
    } else {
      setState({
        ...state,
        snackIsOpen: location?.state?.open,
        eventsList: events,
        isReady: true,
        scheduledEvents: scheduledEvents,
        archiveEvents: archiveEvents,
        modalIsOpen: false,
        snackDeleteIsOpen: true,
      });
    }
  }

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
      snackDeleteIsOpen: false,
      snackServerError: false,
      snackRequestError: false,
    });
  };

  //Modal
  const openDeleteModal =
    (row: any): any =>
    (): void => {
      setState({
        ...state,
        modalIsOpen: !state.modalIsOpen,
        currentEventId: row?.id,
      });
    };

  //chiudo il modale
  const closeDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  };

  //elimino l'evento
  const deleteEvent = async (): Promise<void> => {
    let resp = await deleteEventByIdApi(state?.currentEventId);
    const status = resp?.status;
    handleResponseStatus(status);
    if (status === 200) {
      getEvents(true);
    }
  };

  //modifica evento
  const updateEvent = (row: object) => (): void => {
    navigate(PAGES.editorEvents, { state: { row: row } });
  };

  const addEvent = (): void => {
    navigate(PAGES.editorEvents, { state: { showAdd: true } });
  };

  function handleResponseStatus(status: Number): void {
    switch (status) {
      case 400:
        setState({
          ...state,
          snackRequestError: true,
        });
        break;
      case 500:
        setState({
          ...state,
          snackServerError: true,
        });
    }
  }

  function resetLocationState(): void {
    navigate("#", {
      state: null,
    });
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
          <ButtonIcon callback={updateEvent(params.row)}>
            <CreateIcon sx={{ fontSize: "18px" }} />
          </ButtonIcon>
          <ButtonIcon callback={openDeleteModal(params.row)}>
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
          <ButtonIcon callback={openDeleteModal(params.row)}>
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
      field: "eventDate",
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
      field: "eventDate",
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
    },
  ];

  return (
    <>
      {state?.isReady ? (
        <Box className={common.component}>
          <Box className={common.singleComponent}>
            <LabelText>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Title
                  text={t("Events.NewEvents.title")}
                  textInfo={t("Events.NewEvents.info")}
                />
                <ButtonGeneric color={"green"} callback={addEvent}>
                  + {t("addButton")}
                </ButtonGeneric>
              </Box>

              {/* sezione eventi in programma*/}
              <CustomTable
                columns={columns_1}
                rows={state?.scheduledEvents}
                pageSize={5}
              />
            </LabelText>

            <Box sx={{ height: "20px" }}></Box>

            {/* sezione archivio eventi  */}
            <LabelText>
              <Title
                text={t("Events.OldEvents.title")}
                textInfo={t("Events.OldEvents.info")}
              />
              <CustomTable
                columns={columns_2}
                rows={state?.archiveEvents}
                pageSize={5}
              />
            </LabelText>
          </Box>

          {/* delete modal */}
          <DeleteModal
            open={state?.modalIsOpen}
            closeCallback={closeDeleteModal}
            deleteCallback={deleteEvent}
          />
          {location?.state?.openChange && (
            <CustomSnackbar
              message={t("changesSnack")}
              severity={"success"}
              callback={handleClose}
            />
          )}
          {state?.snackDeleteIsOpen && (
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
          {state?.snackRequestError && (
            <CustomSnackbar
              message={t("responseErrorSnack")}
              severity={"warning"}
              callback={handleClose}
            />
          )}
          {state?.snackServerError && (
            <CustomSnackbar
              message={t("responseErrorSnack")}
              severity={"error"}
              callback={handleClose}
            />
          )}
        </Box>
      ) : (
        <Box className={common.loaderBox}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Events;
