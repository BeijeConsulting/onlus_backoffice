import { FC, useState, useEffect } from "react";

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
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";
import DeleteModal from "../../../components/functional/deleteModal/DeleteModal";

//icon
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";

//navigation
import { useNavigate, useLocation } from "react-router-dom";
import PAGES from "../../../router/pages";
//translation
import { useTranslation } from "react-i18next";
import {
  deleteSocialById,
  getAllSocialApi,
} from "../../../services/api/social/socialApi";

//types
import { SingleSocial } from "../../../utils/mockup/types";

interface State {
  modalIsOpen: boolean;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackAdd: boolean;
  snackServerError: boolean;
  snackRequestError: boolean;
  socialList: Array<SingleSocial>;
  currentSocialId: Number | null;
  getData: boolean;
}
const initialState: State = {
  modalIsOpen: false,
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackAdd: false,
  snackServerError: false,
  snackRequestError: false,
  socialList: [],
  currentSocialId: null,
  getData: false,
};

const Social: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initialState);

  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  if (location?.state !== null) {
    setTimeout(resetLocationState, 3000);
  }

  useEffect(() => {
    getSocial();
  }, []);

  //recupero i social tramite api
  async function getSocial(flag: boolean = null): Promise<void> {
    let resp: any = await getAllSocialApi();
    const status: number = resp?.status;
    if (status !== 200) {
      handleResponseStatus(status);
    } else {
      if (flag === null) {
        setState({
          ...state,
          socialList: resp?.data?.social,
          snackIsOpen: location?.state?.open,
        });
      } else {
        setState({
          ...state,
          socialList: resp?.data?.social,
          snackIsOpen: location?.state?.open,
          modalIsOpen: false,
          snackDeleteIsOpen: true,
        });
      }
    }
  }

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
      snackDeleteIsOpen: false,
      snackRequestError: false,
      snackServerError: false,
    });
  };

  //Modal
  const openDeleteModal =
    (row: any): any =>
    (): void => {
      setState({
        ...state,
        modalIsOpen: !state.modalIsOpen,
        currentSocialId: row.id,
      });
    };

  //chiudo il modale
  const closeDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  };

  //elimino il social
  const deleteSocial = async (): Promise<void> => {
    let resp: any = await deleteSocialById(state?.currentSocialId);
    const status = resp?.status;
    if (status === 200) {
      getSocial(true);
    } else {
      handleResponseStatus(status);
    }
  };

  //Funzioni di modifica e cancella
  const updateSocial = (row: any) => (): void => {
    navigate(PAGES.editorSocial, { state: { data: row.row } });
  };

  const addSocial = (): void => {
    navigate(PAGES.editorSocial, { state: { showAdd: true } });
  };

  //resetta lo stato della location
  function resetLocationState(): void {
    navigate("#", {
      state: null,
    });
  }

  //funzione per gestire errori nelle chiamate api
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

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <>
        <ButtonIcon callback={updateSocial(params)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={openDeleteModal(params.row)}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </>
    );
  };
  const renderDetailsIcon = (params: any) => {
    console.log(params);

    return (
      <img src={params?.row?.iconContent} alt={params?.row?.iconTitle}></img>
    );
  };
  const columns = [
    {
      field: "name",
      headerName: t("social.table.headerTable1"),
      flex: 1,
    },
    {
      field: "iconTitle",
      headerName: t("social.table.headerTable2"),
      flex: 1,
      renderCell: renderDetailsIcon,
    },
    {
      field: "link",
      headerName: t("social.table.headerTable3"),

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
    },
  ];

  return (
    <Box className={common.component}>
      <Box className={common.doubleComponent}>
        <LabelText>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Title text={t("social.title")} textInfo={t("social.info")} />
            <ButtonGeneric color={"green"} callback={addSocial}>
              +{t("addButton")}
            </ButtonGeneric>
          </Box>
          <CustomTable columns={columns} rows={state?.socialList} />
        </LabelText>
      </Box>
      {/* delete modal */}
      <DeleteModal
        open={state?.modalIsOpen}
        closeCallback={closeDeleteModal}
        deleteCallback={deleteSocial}
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
  );
};

export default Social;
