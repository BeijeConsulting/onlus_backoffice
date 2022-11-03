import { Box } from "@mui/material";
import { FC, useState, useEffect } from "react";

//navigation
import { useLocation, useNavigate } from "react-router-dom";

//components
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../../components/functional/table/CustomTable";
import DeleteModal from "../../../components/functional/deleteModal/DeleteModal";
import ButtonIcon from "../../../components/functional/buttonIcon/ButtonIcon";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

//mockup data
import { articles } from "../../../utils/mockup/data";

//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";

//pages
import PAGES from "../../../router/pages";

//style
import common from "../../../assets/styles/common.module.scss";
import style from "./blogStyle.module.scss";

//interfaces
interface State {
  modalIsOpen: boolean;
  snackIsOpen: boolean
}

const initState: State = {
  modalIsOpen: false,
  snackIsOpen: false
};

const Blog: FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>(initState);

  const location = useLocation();
  
  useEffect(()=>{
    setState({
      ...state,
      snackIsOpen: location?.state?.openSnack
    })
  },[])


  const handleModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  };

  const goToEditor = (): void => {
    navigate(PAGES.editorBlog);
  };

  const renderDetailsButton = () => {
    return (
      <Box
        style={{
          display: "flex",
          gap: "5px",
        }}
      >
        <ButtonIcon callback={goToEditor}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={handleModal}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </Box>
    );
  };

  const columns = [
    {
      field: "title",
      headerName: "TITOLO",
      flex: 2,
    },
    {
      field: "author",
      headerName: "AUTORE",
      flex: 2,
      valueGetter: (params: any) =>
        `${params.row.name || ""} ${params.row.surname || ""}`,
    },
    {
      field: "date",
      headerName: "DATA",
      flex: 2,
    },
    {
      field: "status",
      headerName: "STATO",
      flex: 2,
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
      <Box className={common.singleComponent}>
        <Box className={`${common.row} ${style.justify}`}>
          <Title
            text={"Archivio Blog"}
            textInfo={
              "tabella dove vengono viualizzati tutti gli articoli pubblicati, nel caso del singolo blogger vedrà solo i suoi articoli, gli admin vedranno tutti gli articoli"
            }
          />
          <ButtonGeneric color={common.ternaryColor} callback={goToEditor}>
            + Nuovo Articolo
          </ButtonGeneric>
        </Box>
        <Box className={style.tableContainer}>
          <CustomTable columns={columns} rows={articles} pageSize={8} />
        </Box>
      </Box>
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={handleModal}
        deleteCallback={handleModal}
      />

      {/* snackbar */}
      {
        state.snackIsOpen && 
        <CustomSnackbar 
          message={"Il salvataggio è andato "}
          severity={"success"}
        />
      }

    </Box>
  );
};

export default Blog;
