import { Box, Typography, Modal } from "@mui/material";
import { FC, useState, useEffect, BaseSyntheticEvent } from "react";

//router dom
import { useNavigate } from "react-router-dom";

//style
import style from "../../../assets/styles/common.module.scss";
import categoriesStyle from "./categoriesStyle.module.scss";

//components
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../../components/functional/table/CustomTable";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";

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

//state
interface State {
  modalIsOpen: boolean;
  addModal: boolean;
  inputError: boolean;
  open: boolean;
  textError:string;
}
const initialState: State = {
  modalIsOpen: false,
  addModal: false,
  inputError: false,
  open: false,
  textError:""
};

const Categories: FC = (props) => {

  const [state, setState] = useState<State>(initialState);

  //mostro/nascondo il modale per eliminare una categoria
  const showDeleteModal = (): void =>{
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen,
    });
  }

  //elimino la categoria
  const deleteCategory = (): void => {
    setState({
      ...state,
      open:true,
      modalIsOpen: !state.modalIsOpen
    })
  }

  //controllo se la categoria da inserire non è già presente fra le mie
  const checkUniqueCategory = (par: string): boolean => {
    let flag = true;
    categories.forEach((el) => {
      if (el.name === par) {
        flag = false;
      }
    });
    return flag;
  }

  //mostro il modal per aggiungere la categoria
  const setAddModal = (e: BaseSyntheticEvent): void => {
    const inputText: string = e.target.form[0].value.toLowerCase();
    const isEmpty: boolean = checkEmptyText(inputText);
    const isUnique: boolean = checkUniqueCategory(inputText);
    let textE: string = ""
    let inputE: boolean = false 
    let addModal: boolean = true

    if(isEmpty){
      textE = "Inserisci una categoria"
      inputE = true
      addModal = false
    }
    if(!isUnique){
      textE = "Categoria già esistente"
      inputE = true
      addModal = false
    }
    
    setState({
      ...state,
      textError: textE,
      addModal: addModal,
      inputError: inputE
    })
  }

  //mostro/nascondo il modal per l'aggiunta della categoria
  const showAddModal = ():void => {
    setState({
      ...state,
      addModal: !state.addModal
    })
  }

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
          <ButtonIcon callback={() => console.log("C'è da aggiungere il modale")}>
            <CreateIcon sx={{ fontSize: "18px" }} />
          </ButtonIcon>
          <ButtonIcon callback={showDeleteModal}>
            <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
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
      renderCell: renderDetailsButton
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
                errorMessage={state.textError}
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
        closeCallback={showDeleteModal}
        deleteCallback={deleteCategory}
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
            <ButtonGeneric color={style.ternaryColor} callback={showAddModal}>
              Annulla
            </ButtonGeneric>
          </Box>
        </Box>
      </Modal>
      {
        state?.open &&
        <CustomSnackbar message={"Modifiche avvenute con successo"} severity={"success"} />
      }
    </Box>
  );
};

export default Categories;
