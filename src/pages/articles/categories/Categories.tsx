import { Box, Typography, Modal } from "@mui/material";
import { FC, useState, useEffect, BaseSyntheticEvent } from "react";

//router dom
import { useNavigate } from "react-router-dom";

//PAGES
import PAGES from "../../../router/pages";

//style
import style from "../../../assets/styles/common.module.scss";
import categoriesStyle from "./categoriesStyle.module.scss";

//components
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../../components/functional/table/CustomTable";
import CustomTextField from "../../../components/functional/textField/CustomTextField";

//mockup data
import { categories } from "../../../utils/mockup/data";
import ButtonIcon from "../../../components/functional/buttonIcon/ButtonIcon";

//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";

//modal
import DeleteModal from "../../../components/functional/deleteModal/DeleteModal";

//custom hook
import checkEmptyText from "../../../customHooks/useEmptyText";

interface State {
  modalIsOpen: boolean;
  addModal: boolean;
  inputError: boolean;
}

const initialState: State = {
  modalIsOpen: false,
  addModal: false,
  inputError: false
};

const Categories: FC = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState<State>(initialState);
  const textError = `- Il campo non può essere vuoto 
  - Categoria già esistente`

  //functions
  function addCategory(): void {}

  function openDeleteModal(): void {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  }

  function checkUniqueCategory(par: string): boolean{
    let flag = false;
    categories.forEach((el,index) => {
      if(el.name === par){
        flag = true;
      }
      
    })
    return flag;
  }

  function setAddModal(e: BaseSyntheticEvent): void {
    const inputText = e.target.form[0].value.toLowerCase();
    const isEmpty: boolean = checkEmptyText(inputText);
    const isUnique = checkUniqueCategory(inputText);

    if(!isEmpty && !isUnique){

      setState({
      ...state,
      addModal: !state.addModal,
    });
    }else{
       setState({
         ...state,
         inputError: true
       })
    }
    
  }

  function validateInput(input: string): void {}

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
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
          <ButtonIcon callback={() => console.log("ciao")}>
            <CreateIcon sx={{ fontSize: "18px" }} />
          </ButtonIcon>
        </Box>
      </>
    );
  };

  const columns = [
    {
      field: "name",
      headerName: "CATEGORIA",
      flex: 1,
    },
    {
      field: "relatedArticles",
      headerName: "ARTICOLI CORRELATI",
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
    <Box className={style.component}>
      <Box className={style.singleComponent}>
        <Box className={categoriesStyle.titleFlex}>
          <Title
            text={"Categorie"}
            textInfo={
              "Tabella dove vengono visualizzate le categorie che vengono associate ad un articolo"
            }
          />

          <form>
            <Box className={categoriesStyle.inputButtonContainer}>
              <CustomTextField
                placeholder={"Inserisci categoria"}
                error={state.inputError}
                errorMessage={textError}
              />
              <ButtonGeneric color={style.ternaryColor} callback={setAddModal}>
                + Aggiungi
              </ButtonGeneric>
            </Box>
          </form>
        </Box>

        {/* sezione eventi in programma*/}
        <Box className={categoriesStyle.tableContainer}>
          <CustomTable columns={columns} rows={categories} />
        </Box>
      </Box>

      {/* modale per la conferma eliminazione */}
      <DeleteModal
        open={state.modalIsOpen}
        closeCallback={openDeleteModal}
        deleteCallback={openDeleteModal}
      />

      {/* modale per la conferma aggiunta categoria */}
      <Modal
        open={state.addModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={categoriesStyle.modal}>
          <Typography>
            Sei sicuro di voler aggiungere il seguente elemento?
          </Typography>
          <Box className={categoriesStyle.modalButtons}>
            <ButtonGeneric color={"green"} callback={setAddModal}>
              Aggiungi
            </ButtonGeneric>
            <ButtonGeneric color={style.ternaryColor} callback={setAddModal}>
              Annulla
            </ButtonGeneric>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Categories;
