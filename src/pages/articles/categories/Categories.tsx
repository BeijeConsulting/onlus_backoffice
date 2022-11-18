import { Box, Typography, Modal } from "@mui/material";
import { FC, useState, useRef, BaseSyntheticEvent, useEffect } from "react";

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
import {
  getApiCategories,
  postApiCategory,
  putApiCategoryById,
  deleteApiCategoryById,
} from "../../../services/api/categories/categoriesApi";
import ButtonIcon from "../../../components/functional/buttonIcon/ButtonIcon";

//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";

//custom hook
import checkEmptyText from "../../../utils/checkEmptyText";

//modal
import DeleteModal from "../../../components/functional/deleteModal/DeleteModal";
//translation
import { useTranslation } from "react-i18next";

//state
interface State {
  inputError: boolean;
  textError: string;
  snackIsOpen: boolean;
  snackDeleteIsOpen: boolean;
  snackUpdateIsOpen: boolean;
  snackWarningIsOpen: boolean;
  snackErrorIsOpen: boolean;
  modalIsOpen: boolean;
  modalUpdateIsOpen: boolean;
  addModal: boolean;
  updateName: string;
  updateErrorMesssage: string;
  updateError: boolean;
  addCategoryName: string;
  category: Array<Category>;
  ready: boolean;
  idCategoryApi: number;
}
const initialState: State = {
  addModal: false,
  inputError: false,
  textError: "",
  snackIsOpen: false,
  snackDeleteIsOpen: false,
  snackUpdateIsOpen: false,
  snackWarningIsOpen: false,
  snackErrorIsOpen: false,
  modalIsOpen: false,
  modalUpdateIsOpen: false,
  updateName: "",
  updateErrorMesssage: "",
  updateError: false,
  addCategoryName: "",
  category: [
    {
      id: null,
      name: "",
      // relatedArticles: 0,
    },
  ],
  ready: false,
  idCategoryApi: null,
};

type Category = {
  id?: number;
  name: string;
  //relatedArticles: number;
};

const Categories: FC = (): JSX.Element => {
  const [state, setState] = useState<State>(initialState);
  const { t } = useTranslation();

  const ref: any = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const category: any = await getApiCategories();

    setState({
      ...state,
      category: category.data,
      ready: true,
    });
  };

  //Snackbar
  const handleClose = () => {
    setState({
      ...state,
      snackIsOpen: false,
      snackDeleteIsOpen: false,
      snackUpdateIsOpen: false,
    });
  };

  //mostro/nascondo modal di eliminazione di una categoria
  const showDeleteModal = (row: any) => (): void => {
    setState({
      ...state,
      modalIsOpen: true,
      idCategoryApi: row.id,
    });
  };

  const hideDeleteModal = (): void => {
    setState({
      ...state,
      modalIsOpen: false
    })
  }

  //mostro/nascondo modal di modifica di una categoria
  const showUpdateModal = (row: any) => (): void => {
    setState({
      ...state,
      modalUpdateIsOpen: !state.modalUpdateIsOpen,
      updateName: row.name,
      idCategoryApi: row.id,
    });
  };

  //mostro/nascondo il modal per l'aggiunta della categoria
  const showModalCategory = (e: BaseSyntheticEvent): void => {
    const inputText: string = e.target.form[0].value.toLowerCase();
    const isEmpty: boolean = checkEmptyText(inputText);
    const isUnique: boolean = checkUniqueCategory(inputText);
    let textE: string = "";
    let inputE: boolean = false;
    let addModal: boolean = true;

    if (isEmpty) {
      textE = t("Categories.errorEmpty");
      inputE = true;
      addModal = false;
    }
    if (!isUnique) {
      textE = t("Categories.errorExist");
      inputE = true;
      addModal = false;
    }
    setState({
      ...state,
      textError: textE,
      addModal: addModal,
      inputError: inputE,
    });
  };

  //elimina categoria
  const deleteCategory = async (): Promise<void> => {
    let category: any = state.category;
    let snackWarningIsOpen = false;
    let snackErrorIsOpen = false;
    const response = await deleteApiCategoryById(state.idCategoryApi);

    if (response.status === 200) {
      let categoryData: any = await getApiCategories();
      category = categoryData.data;
    } else if (response.status === 500 || response.status === undefined) {
      snackWarningIsOpen = true;
    } else {
      snackErrorIsOpen = true;
    }
    setState({
      ...state,
      snackDeleteIsOpen: true,
      modalIsOpen: false,
      category: category,
      snackWarningIsOpen: snackWarningIsOpen,
      snackErrorIsOpen: snackErrorIsOpen,
    });
  };

  //aggiorna categoria
  const updateCategory = async (e: BaseSyntheticEvent): Promise<void> => {
    const inputText: string = e.target.form[0].value.toLowerCase();
    const isEmpty: boolean = checkEmptyText(inputText);
    const isUnique: boolean = checkUniqueCategory(inputText);
    let textU: string = "";
    let inputE: boolean = false;
    let isOpen: boolean = false;
    let snack: boolean = true;
    let categoryData: any = state.category;
    let snackWarningIsOpen = false;
    let snackErrorIsOpen = false;

    if (isEmpty) {
      textU = t("Categories.errorEmpty");
      inputE = true;
      isOpen = true;
      snack = false;
    }
    if (!isUnique) {
      textU = t("Categories.errorExist");
      inputE = true;
      isOpen = true;
      snack = false;
    }

    if (!isEmpty && isUnique) {
      const category: Category = {
        id: state.idCategoryApi,
        name: inputText,
        //relatedArticles: 0;
      };
      const response = await putApiCategoryById(state.idCategoryApi, category);

      if (response.status === 200) {
        let categoryApi: any = await getApiCategories();
        categoryData = categoryApi.data;
      } else if (response.status === 500 || response.status === undefined) {
        snackWarningIsOpen = true;
      } else {
        snackErrorIsOpen = true;
      }
    }
    //if falso
    setState({
      ...state,
      snackWarningIsOpen: snackWarningIsOpen,
      snackErrorIsOpen: snackErrorIsOpen,
      updateErrorMesssage: textU,
      updateError: inputE,
      modalUpdateIsOpen: isOpen,
      snackUpdateIsOpen: snack,
      category: categoryData,
    });
  };

  //aggiungi categoria
  const addCategory = async (): Promise<void> => {
    let categories: any = state.category;
    let snackIsOpen = false;
    let snackWarningIsOpen = false;
    let snackErrorIsOpen = false;
    const category: Category = {
      name: ref.current.value,
      //relatedArticles: 0;
    };

    const response = await postApiCategory(category);
    if (response.status === 200) {
      let categoryData: any = await getApiCategories();
      categories = categoryData.data;
      snackIsOpen = true;
    } else if (response.status === 500 || response.status === undefined) {
      snackWarningIsOpen = true;
    } else {
      snackErrorIsOpen = true;
    }

    if (ref.current) ref.current.value = "";

    setState({
      ...state,
      addModal: false,
      snackIsOpen: snackIsOpen,
      snackWarningIsOpen: snackWarningIsOpen,
      snackErrorIsOpen: snackErrorIsOpen,
      addCategoryName: "",
      category: categories,
    });
  };

  //nascondo modal aggiunta
  const hideAddModal = (): void => {
    setState({
      ...state,
      addModal: false,
    });
  };

  //nascondo modal modifica
  const hideUpdateModal = (): void => {
    setState({
      ...state,
      modalUpdateIsOpen: false,
    });
  };

  //controllo se la categoria da inserire non è già presente fra le mie
  const checkUniqueCategory = (par: string): boolean => {
    let flag = true;
    state.category.forEach((el) => {
      if (el.name === par) {
        flag = false;
      }
    });
    return flag;
  };

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
          <ButtonIcon callback={showUpdateModal(params.row)}>
            <CreateIcon sx={{ fontSize: "18px" }} />
          </ButtonIcon>
          <ButtonIcon callback={showDeleteModal(params.row)}>
            <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
          </ButtonIcon>
        </Box>
      </>
    );
  };

  const columns = [
    {
      field: "name",
      headerName: t("Categories.table.categories"),
      flex: 1,
    },
    {
      field: "relatedArticles",
      headerName: t("Categories.table.blog"),
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
    <Box className={style.component}>
      {state?.ready && (
        <>
          <Box className={style.singleComponent}>
            <LabelText>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Title
                  text={t("Categories.title")}
                  textInfo={t("Categories.info")}
                />

                <form>
                  <Box className={categoriesStyle.inputButtonContainer}>
                    <CustomTextField
                      placeholder={t("Categories.placeholder")}
                      error={state?.inputError}
                      errorMessage={state?.textError}
                      refCustom={ref}
                    />
                    <ButtonGeneric color={"green"} callback={showModalCategory}>
                      + {t("addButton")}
                    </ButtonGeneric>
                  </Box>

                  {/* modale per la conferma aggiunta categoria */}
                  <Modal
                    open={state?.addModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box className={categoriesStyle.modal}>
                      <Typography>{t("addModal.text")}</Typography>
                      <Box className={categoriesStyle.modalButtons}>
                        <ButtonGeneric color={"green"} callback={addCategory}>
                          {t("addModal.addButton")}
                        </ButtonGeneric>
                        <ButtonGeneric
                          color={style.secondaryColor}
                          callback={hideAddModal}
                        >
                          {t("addModal.DiscardChangesButton")}
                        </ButtonGeneric>
                      </Box>
                    </Box>
                  </Modal>

                  {/* modale per la conferma aggiunta categoria */}
                  <Modal
                    open={state?.addModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box className={categoriesStyle.modal}>
                      <Typography>{t("addModal.text")}</Typography>
                      <Box className={categoriesStyle.modalButtons}>
                        <ButtonGeneric color={"green"} callback={addCategory}>
                          {t("addButton")}
                        </ButtonGeneric>
                        <ButtonGeneric
                          color={style.secondaryColor}
                          callback={hideAddModal}
                        >
                          {t("deleteModal.DiscardChangesButton")}
                        </ButtonGeneric>
                      </Box>
                    </Box>
                  </Modal>
                </form>
              </Box>
              <CustomTable columns={columns} rows={state?.category} />
            </LabelText>
          </Box>
          {/* modale per la conferma eliminazione */}
          <DeleteModal
            open={state?.modalIsOpen}
            closeCallback={hideDeleteModal}
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
                  placeholder={t("Categories.placeholder")}
                  errorMessage={state?.updateErrorMesssage}
                  error={state?.updateError}
                />
                <Box className={categoriesStyle.modalButtons}>
                  <ButtonGeneric color={"green"} callback={updateCategory}>
                    {t("Categories.categoryModal.changeButton")}
                  </ButtonGeneric>
                  <ButtonGeneric
                    color={style.secondaryColor}
                    callback={hideUpdateModal}
                  >
                    {t("Categories.categoryModal.discardButton")}
                  </ButtonGeneric>
                </Box>
              </Box>
            </form>
          </Modal>
          {state?.snackIsOpen && (
            <CustomSnackbar
              message={t("addSnack")}
              severity={"success"}
              callback={handleClose}
            />
          )}
          {state?.snackUpdateIsOpen && (
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
        </>
      )}
    </Box>
  );
};

export default Categories;
