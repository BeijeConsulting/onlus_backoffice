import { Box, Typography, Modal } from "@mui/material";
import { FC, useState, useRef, BaseSyntheticEvent } from "react";

//style
import style from "../../../assets/styles/common.module.scss";
import categoriesStyle from "./categoriesStyle.module.scss";

//components
import Title from "../../../components/functional/title/Title";
import ButtonGeneric from "../../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../../components/functional/table/CustomTable";
import CustomTextField from "../../../components/functional/textField/CustomTextField";
import CustomSnackbar from "../../../components/functional/customSnackbar/CustomSnackbar";
import LabelText from "../../../components/functional/labelText/LabelText";

//mockup data
import { categories } from "../../../utils/mockup/data";
import ButtonIcon from "../../../components/functional/buttonIcon/ButtonIcon";

//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";

//custom hook
import checkEmptyText from "../../../customHooks/useEmptyText";

//modal
import DeleteModal from "../../../components/functional/deleteModal/DeleteModal";

//state
interface State {
  inputError: boolean;
  textError: string;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackUpdateIsOpen: boolean;
  modalIsOpen: boolean;
  modalUpdateIsOpen: boolean;
  addModal: boolean;
  updateName: string;
  updateErrorMesssage: string;
  updateError: boolean;
  addCategoryName: string;
}
const initialState: State = {
  addModal: false,
  inputError: false,
  textError: "",
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackUpdateIsOpen: false,
  modalIsOpen: false,
  modalUpdateIsOpen: false,
  updateName: "",
  updateErrorMesssage: "",
  updateError: false,
  addCategoryName: ""
};

const Categories: FC = (props) => {

  const [state, setState] = useState<State>(initialState);

  const ref: any = useRef<HTMLInputElement>(null);

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
      snackDeleteIsOpen: false,
      snackUpdateIsOpen: false
    })
  }

  //mostro/nascondo modal di eliminazione di una categoria
  const showDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: !state.modalIsOpen
    })
  }

  //mostro/nascondo modal di modifica di una categoria
  const showUpdateModal = (name: string) => (): void => {
    setState({
      ...state,
      modalUpdateIsOpen: !state.modalUpdateIsOpen,
      updateName: name
    })
  }

  //mostro/nascondo il modal per l'aggiunta della categoria
  const showModalCategory = (e: BaseSyntheticEvent): void => {
    const inputText: string = e.target.form[0].value.toLowerCase();
    const isEmpty: boolean = checkEmptyText(inputText);
    const isUnique: boolean = checkUniqueCategory(inputText);
    let textE: string = ""
    let inputE: boolean = false
    let addModal: boolean = true

    if (isEmpty) {
      textE = "Inserisci una categoria"
      inputE = true
      addModal = false
    }
    if (!isUnique) {
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

  //elimina categoria
  const deleteCategory = (): void => {
    setState({
      ...state,
      snackDeleteIsOpen: true,
      modalIsOpen: false
    })
  };

  //aggiorna categoria
  const updateCategory = (e: BaseSyntheticEvent): void => {
    const inputText: string = e.target.form[0].value.toLowerCase();
    const isEmpty: boolean = checkEmptyText(inputText);
    const isUnique: boolean = checkUniqueCategory(inputText);
    let textU: string = ""
    let inputE: boolean = false
    let isOpen: boolean = false
    let snack: boolean = true

    if (isEmpty) {
      textU = "Inserisci una categoria"
      inputE = true
      isOpen = true
      snack = false
    }
    if (!isUnique) {
      textU = "Categoria già esistente"
      inputE = true
      isOpen = true
      snack = false
    }

    setState({
      ...state,
      updateErrorMesssage: textU,
      updateError: inputE,
      modalUpdateIsOpen: isOpen,
      snackUpdateIsOpen: snack
    })
  };

  //aggiungi categoria
  const addCategory = (): void => {
    if (ref.current)
      ref.current.value = ""

    setState({
      ...state,
      addModal: false,
      snackIsOpen: true,
      addCategoryName: ""
    })
  }

  //nascondo modal aggiunta
  const hideAddModal = (): void => {
    setState({
      ...state,
      addModal: false
    })
  }

  //nascondo modal modifica
  const hideUpdateModal = (): void => {
    setState({
      ...state,
      modalUpdateIsOpen: false
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
          <ButtonIcon callback={showUpdateModal(params.row.name)}>
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
        <LabelText>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Title
              text={"Categorie"}
              textInfo={
                "Tabella dove vengono visualizzate le categorie che vengono associate ad un articolo"
              }
            />

            <form>
              <Box sx={{ display: "flex", width: "350px", gap: "10px" }}>
                <CustomTextField
                  placeholder={"Inserisci categoria"}
                  error={state?.inputError}
                  errorMessage={state?.textError}
                  refCustom={ref}
                />
                <ButtonGeneric color={"green"} callback={showModalCategory}>
                  + Aggiungi
                </ButtonGeneric>
              </Box>

              {/* modale per la conferma aggiunta categoria */}
              <Modal
                open={state?.addModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className={categoriesStyle.modal}>
                  <Typography>
                    Sei sicuro di voler aggiungere il seguente elemento?
                  </Typography>
                  <Box className={categoriesStyle.modalButtons}>
                    <ButtonGeneric color={"green"} callback={addCategory}>
                      Aggiungi
                    </ButtonGeneric>
                    <ButtonGeneric color={style.saveButtonColor} callback={hideAddModal}>
                      Annulla
                    </ButtonGeneric>
                  </Box>
                </Box>
              </Modal>
            </form>

          </Box>
          <CustomTable columns={columns} rows={categories} />

        </LabelText>
      </Box >

      {/* modale per la conferma eliminazione */}
      <DeleteModal
        open={state?.modalIsOpen}
        closeCallback={showDeleteModal}
        deleteCallback={deleteCategory}
      />

      {/* modale per la modifica della categoria */}
      <Modal
        open={state?.modalUpdateIsOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form>
          <Box className={categoriesStyle.modal}>
            <CustomTextField
              defaultValue={state?.updateName}
              placeholder={"Inserisci categoria"}
              errorMessage={state?.updateErrorMesssage}
              error={state?.updateError}
            />
            <Box className={categoriesStyle.modalButtons}>
              <ButtonGeneric color={"green"} callback={updateCategory}>
                Modifica
              </ButtonGeneric>
              <ButtonGeneric color={style.saveButtonColor} callback={hideUpdateModal}>
                Annulla
              </ButtonGeneric>
            </Box>
          </Box>
        </form>
      </Modal >

      {
        state?.snackIsOpen &&
        <CustomSnackbar message={"Inserimento avvenuto con successo"} severity={"success"} callback={handleClose} />
      }
      {
        state?.snackUpdateIsOpen &&
        <CustomSnackbar message={"Modifiche avvenute con successo"} severity={"success"} callback={handleClose} />
      }
      {
        state?.snackDeleteIsOpen &&
        <CustomSnackbar message={"Eliminazione avvenuta con successo"} severity={"info"} callback={handleClose} />
      }

    </Box >
  );
};

export default Categories;