import { FC, useState, useEffect } from 'react'

//mui
import { Box } from "@mui/material";

//style
import common from "../../../assets/styles/common.module.scss";

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

const Social: FC = (): JSX.Element => {

  const [state, setState] = useState<State>(initialState);

  const navigate = useNavigate();
  const location = useLocation();

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

  //elimino il social
  const deleteSocial = (): void => {
    setState({
      ...state,
      modalIsOpen: false,
      snackDeleteIsOpen: true
    })
  }

  //Funzioni di modifica e cancella
  const updateSocial = (row: object) => (): void => {
    navigate(PAGES.editorSocial, { state: { row } })
  };

  const addSocial = (): void => {
    navigate(PAGES.editorSocial, { state: { showAdd: true } })
  }

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <>
        <ButtonIcon callback={updateSocial(params)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={openDeleteModal}>
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
      renderCell: renderDetailsButton
    },
  ];

  return (
    <Box className={common.component}>
      <Box className={common.doubleComponent}>
        <LabelText>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Title text="Social" textInfo="inserisci i social" />
            <ButtonGeneric color={"green"} callback={addSocial}>
              + Aggiungi
            </ButtonGeneric>
          </Box>
          <CustomTable columns={columns} rows={social} />
        </LabelText>
      </Box>
      {/* delete modal */}
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={closeDeleteModal}
        deleteCallback={deleteSocial /*API delete*/}
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
    </Box>
  );
}

export default Social;