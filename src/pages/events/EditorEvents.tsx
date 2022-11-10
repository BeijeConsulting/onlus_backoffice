import { useState, FC, BaseSyntheticEvent } from "react";
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

//date picker
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

//style
import common from "../../assets/styles/common.module.scss";
import editorStyle from "./eventEditorStyle.module.scss";

//translation
import { useTranslation } from "react-i18next";

interface state {
  selectedDate: any;
}

const initialState: state = {
  selectedDate: dayjs(),
};

const EditorEvents: FC = () => {
  const [state, setState] = useState(initialState);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  //torno alla pagina eventi
  const onCancel = (): void => {
    navigate(PAGES.events);
  };

  //salvo le modifiche
  const onSave = (e: BaseSyntheticEvent): void => {
    if (location?.state?.showAdd) {
      navigate(PAGES.events, { state: { openAdd: true } });
    } else {
      navigate(PAGES.events, { state: { open: true } });
    }
  };

  return (
    <form>
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
                error={false}
              />
            </LabelText>

            <LabelText>
              <Title
                text={t("EventsEditor.Date.title")}
                textInfo={t("EventsEditor.Date.info")}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField size="small" {...props} />}
                  label={t("EventsEditor.Date.date")}
                  value={state.selectedDate}
                  onChange={(newValue) => {
                    setState({
                      ...state,
                      selectedDate: newValue,
                    });
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
                error={false}
                multiline={true}
                minrow={6}
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
                callback={() => {
                  console.log("ciao");
                }}
              />
            </LabelText>

            <LabelText>
              <Title
                text={t("EventsEditor.Place.title")}
                textInfo={t("EventsEditor.Place.info")}
              />
              <CustomTextField
                placeholder={t("EventsEditor.Place.placeHolderText")}
                error={false}
              />
            </LabelText>

            <LabelText>
              <Title
                text={t("EventsEditor.Requirements.title")}
                textInfo={t("EventsEditor.Requirements.info")}
              />
              <CustomTextField
                placeholder={t("EventsEditor.Requirements.placeHolderText")}
                error={false}
                multiline={true}
                minrow={6}
              />
            </LabelText>

            <Box className={editorStyle.buttonsContainer}>
              {location?.state?.showAdd ? (
                <>
                  <ButtonGeneric color={"green"} callback={onSave}>
                    Aggiungi
                  </ButtonGeneric>
                  <ButtonGeneric
                    color={common.secondaryColor}
                    callback={onCancel}
                  >
                    Annulla
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
    </form>
  );
};

export default EditorEvents;
