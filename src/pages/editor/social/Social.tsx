import React, { FC, useEffect, useState } from 'react'

//mui
import { Box } from "@mui/material";

//style
import common from "../../../assets/styles/common.module.scss";
import style from "./social-Style.module.scss";

//function components
import LabelText from "../../../components/functional/labelText/LabelText";
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../../components/functional/table/CustomTable";
import ButtonIcon from "../../../components/functional/buttonIcon/ButtonIcon";
import CustomSnackbar from '../../../components/functional/customSnackbar/CustomSnackbar'
import DeleteModal from '../../../components/functional/deleteModal/DeleteModal';

//icon
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";

//data
import { social } from "../../../utils/mockup/data";

//navigation
import { useNavigate, useLocation } from "react-router-dom";
import PAGES from "../../../router/pages";

/*
TO DO
- i18n
*/

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

const Social: FC = (): JSX.Element => {

  const [state, setState] = useState<State>(initialState);

  const navigate = useNavigate();
  const location = useLocation();

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
      snackDeleteIsOpen: false
    })
  }

  const edit = (att: any) => (): void => {
    console.log("edit", att);
    navigate(PAGES.editorSocial, { state: { data: att.row } });
  };

  const deleteRow = (): void => {
    setState({
      ...state,
      snackDeleteIsOpen: true,
      modalIsOpen: false
    })
  };

  const addSocial = (): void => {
    navigate(PAGES.editorSocial);
  };

  //mostro/nascondo modal di eliminazione della faq
  const showDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen
    })
  }

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <>
        <ButtonIcon callback={edit(params)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={showDeleteModal}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </>
    );
  };
  const columns = [
    {
      field: "name",
      headerName: "SOCIAL",
      flex: 1,
    },
    {
      field: "icon",
      headerName: "ICONA",
      flex: 1,
    },
    {
      field: "link",
      headerName: "LINK",
      type: "date",
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
      <Box className={common.doubleComponent}>
        <LabelText>
          <Box className={style.TitleButton}>
            <Title text="Social" textInfo="inserisci i social" />
            <ButtonGeneric color={common.ternaryColor} callback={addSocial}>
              <p className={style.button}>+Aggiungi</p>
            </ButtonGeneric>
          </Box>
          <CustomTable columns={columns} rows={social} />
        </LabelText>
      </Box>
      {/* delete modal */}
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={showDeleteModal}
        deleteCallback={deleteRow}
      />
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
}

export default Social;
