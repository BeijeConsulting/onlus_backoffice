import { useState, FC, BaseSyntheticEvent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PAGES from "../../router/pages";

//MUI
import { Box, TextField } from "@mui/material";

//components
import CustomTextField from "../../components/functional/textField/CustomTextField";
import LabelText from "../../components/functional/labelText/LabelText";
import Title from "../../components/functional/title/Title";
import ButtonGeneric from "../../components/functional/buttonGeneric/ButtonGeneric";
import ButtonAddFile from "../../components/functional/buttonAddFile/ButtonAddFile";
import CustomSnackbar from "../../components/functional/customSnackbar/CustomSnackbar";

//util function
import checkEmptyText from "../../utils/checkEmptyText";

//date picker
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

//style
import common from "../../assets/styles/common.module.scss";
import editorStyle from "./eventEditorStyle.module.scss";

//translation
import { useTranslation } from "react-i18next";

//api
import {
  createEventApi,
  getEventByIdApi,
  updateEventByIdApi,
} from "../../services/api/events/eventsApi";

//types
import { Event } from "../../utils/mockup/types";

interface state {
  selectedDate: any;
  titleError: boolean;
  descriptionError: boolean;
  requirementsError: boolean;
  placeError: boolean;
  currentEvent: Event;
  isReady: boolean;
  dateToSent: string;
  snackErrorIsOpen: boolean;
  snackWarningIsOpen: boolean;
}

const initialState: state = {
  selectedDate: "",
  dateToSent: "",
  titleError: false,
  descriptionError: false,
  requirementsError: false,
  placeError: false,
  currentEvent: {
    coverContent: "",
    coverTitle: "",
    coverType: "",
    description: "",
    eventDate: "",
    place: "",
    requirements: "",
    title: "",
    id: null,
  },
  isReady: false,
  snackErrorIsOpen: false,
  snackWarningIsOpen: false,
};

const EditorEvents: FC = () => {
  const [state, setState] = useState(initialState);
  const { t } = useTranslation();
  const location = useLocation();

  const idCurrentEvent = location?.state?.row?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.showAdd) {
      getCurrentEvent();
    }
  }, []);

  async function getCurrentEvent() {
    const resp: any = await getEventByIdApi(idCurrentEvent);
    if (resp.status === 200) {
      const event: any = resp.data;

      //change data format
      event.eventDate = event.eventDate.concat(".000Z");

      setState({
        ...state,
        currentEvent: event,
        isReady: true,
      });
    }
  }

  //torno alla pagina eventi
  const onCancel = (): void => {
    navigate(PAGES.events);
  };

  //vado a settare la data in formato ISO e la salvo nello stato
  function setDate(date: Dayjs) {
    let correctFormatDate = date.toISOString();
    console.log(correctFormatDate);

    correctFormatDate = correctFormatDate.substring(
      0,
      correctFormatDate.length - 5
    );

    if (!location?.state?.showAdd) {
      setState({
        ...state,
        dateToSent: correctFormatDate,
        currentEvent: {
          ...state.currentEvent,
          eventDate: date,
        },
      });
    } else {
      setState({
        ...state,
        dateToSent: correctFormatDate,
        selectedDate: date,
      });
    }
  }

  //salvo le modifiche
  const onSave = (e: BaseSyntheticEvent): void => {
    validateForm(e);
  };

  function validateForm(e: BaseSyntheticEvent): void {
    let formIsValid = true;
    let newEvent: Event = null;

    const inputTitle = e.target.form[0];
    const inputDescription = e.target.form[5];
    const coverContent = e.target.form[8].name.split(" ")[0];
    const coverTitle = e.target.form[8].name.split(" ")[1];
    const coverType = e.target.form[8].name.split(" ")[2];
    const inputPlace = e.target.form[9];
    const inputRequirements = e.target.form[11];

    let errorTitle = false;
    let errorDescription = false;
    let errorRequirements = false;
    let errorPlace = false;

    //check if title is empty
    if (checkEmptyText(inputTitle.value)) {
      formIsValid = false;
      errorTitle = true;
    }
    //check if description is empty
    if (checkEmptyText(inputDescription.value)) {
      formIsValid = false;
      errorDescription = true;
    }
    //check if requirements is empty
    if (checkEmptyText(inputRequirements.value)) {
      formIsValid = false;
      errorRequirements = true;
    }
    //check if place is empty
    if (checkEmptyText(inputPlace.value)) {
      formIsValid = false;
      errorPlace = true;
    }

    if (!formIsValid) {
      setState({
        ...state,
        titleError: errorTitle,
        descriptionError: errorDescription,
        placeError: errorPlace,
        requirementsError: errorRequirements,
      });
    } else {
      //oggetto che viene inviato al server
      newEvent = {
        coverContent: coverContent,
        coverTitle: coverTitle,
        coverType: coverType,
        description: inputDescription.value,
        place: inputPlace.value,
        requirements: inputRequirements.value,
        title: inputTitle.value,
        eventDate: state.dateToSent,
      };
      console.log(newEvent);

      if (location?.state?.showAdd) {
        //creazione di un nuovo evento
        sendData(newEvent);
      } else {
        //aggiornamento di un evento già esistente
        updateEvent(newEvent);
      }
    }
  }

  //PutAPI
  async function updateEvent(newEvent: Event) {
    let resp = await updateEventByIdApi(state?.currentEvent?.id, newEvent);
    handleResponse(resp?.status);
    if (resp?.status === 200) {
      navigate(PAGES.events, { state: { openChange: true } });
    }
  }

  //PostAPI
  async function sendData(newEvent: Event) {
    let resp = await createEventApi(newEvent);
    handleResponse(resp?.status);
    if (resp?.status === 200) {
      navigate(PAGES.events, { state: { openAdd: true } });
    }
  }

  //gestisce status snackbar
  const handleResponse = async (status: number) => {
    let snackWarning: boolean = state.snackWarningIsOpen;
    let snackError: boolean = state.snackErrorIsOpen;

    if (status === 500 || status === undefined) snackWarning = true;
    else snackError = true;

    setState({
      ...state,
      snackWarningIsOpen: snackWarning,
      snackErrorIsOpen: snackError,
    });
  };

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackErrorIsOpen: false,
      snackWarningIsOpen: false,
    });
  };

  return (
    <form>
      {(state?.isReady && !location?.state?.showAdd) ||
      location?.state?.showAdd ? (
        <>
          <Box className={common.component}>
            <Box className={common.doubleComponent}>
              <Box className={common.left}>
                <LabelText>
                  <Title
                    text={t("EventsEditor.Title.title")}
                    textInfo={t("EventsEditor.Title.info")}
                  />
                  <CustomTextField
                    placeholder={t("EventsEditor.Title.placeHolderText")}
                    error={state?.titleError}
                    errorMessage={t("EventsEditor.Title.error")}
                    id={"title"}
                    defaultValue={state?.currentEvent?.title}
                  />
                </LabelText>

                <LabelText>
                  <Title
                    text={t("EventsEditor.Date.title")}
                    textInfo={t("EventsEditor.Date.info")}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField size="small" {...props} />
                      )}
                      label={t("EventsEditor.Date.date")}
                      value={
                        !location?.state?.showAdd
                          ? state?.currentEvent?.eventDate
                          : state?.selectedDate
                      }
                      minDateTime={dayjs()}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </LabelText>

                <LabelText>
                  <Title
                    text={t("EventsEditor.Description.title")}
                    textInfo={t("EventsEditor.Description.info")}
                  />
                  <CustomTextField
                    placeholder={t("EventsEditor.Description.placeHolderText")}
                    error={state?.descriptionError}
                    multiline={true}
                    minrow={6}
                    defaultValue={state?.currentEvent?.description}
                    errorMessage={t("EventsEditor.Description.error")}
                  />
                </LabelText>
              </Box>
              <Box className={common.right}>
                <LabelText>
                  <Title
                    text={t("EventsEditor.cover.title")}
                    textInfo={t("EventsEditor.cover.info")}
                  />
                  <ButtonAddFile
                    callback={() => {}}
                    mediaContent={state?.currentEvent.coverContent}
                    mediaTitle={state?.currentEvent.coverTitle}
                    mediaType={state?.currentEvent.coverType}
                  />
                </LabelText>

                <LabelText>
                  <Title
                    text={t("EventsEditor.Place.title")}
                    textInfo={t("EventsEditor.Place.info")}
                  />
                  <CustomTextField
                    placeholder={t("EventsEditor.Place.placeHolderText")}
                    error={state?.placeError}
                    defaultValue={state?.currentEvent?.place}
                    errorMessage={t("EventsEditor.Place.error")}
                  />
                </LabelText>

                <LabelText>
                  <Title
                    text={t("EventsEditor.Requirements.title")}
                    textInfo={t("EventsEditor.Requirements.info")}
                  />
                  <CustomTextField
                    placeholder={t("EventsEditor.Requirements.placeHolderText")}
                    error={state?.requirementsError}
                    multiline={true}
                    minrow={6}
                    defaultValue={state?.currentEvent?.requirements}
                    errorMessage={t("EventsEditor.Requirements.error")}
                  />
                </LabelText>

                <Box className={editorStyle.buttonsContainer}>
                  {location?.state?.showAdd ? (
                    <>
                      <ButtonGeneric color={"green"} callback={onSave}>
                        {t("addButton")}
                      </ButtonGeneric>
                      <ButtonGeneric
                        color={common.secondaryColor}
                        callback={onCancel}
                      >
                        {t("deleteModal.DiscardChangesButton")}
                      </ButtonGeneric>
                    </>
                  ) : (
                    <>
                      <ButtonGeneric
                        color={common.saveButtonColor}
                        callback={onSave}
                      >
                        {t("saveButton")}
                      </ButtonGeneric>
                      <ButtonGeneric
                        color={common.secondaryColor}
                        callback={onCancel}
                      >
                        {t("cancelButton")}
                      </ButtonGeneric>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : null}
      {state?.snackErrorIsOpen && (
        <CustomSnackbar
          message={t("responseErrorSnack")}
          severity={"error"}
          callback={handleClose}
        />
      )}
      {state?.snackWarningIsOpen && (
        <CustomSnackbar
          message={t("responseWarningSnack")}
          severity={"warning"}
          callback={handleClose}
        />
      )}
    </form>
  );
};

export default EditorEvents;
