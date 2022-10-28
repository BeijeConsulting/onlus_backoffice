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
//icon
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateIcon from "@mui/icons-material/Create";
//data
import { social } from "../../../utils/mockup/data";
import { useNavigate } from "react-router-dom";
//route
import PAGES from "../../../router/pages";

/*
TO DO
- i18n
*/

function Social() {
  //const [state, useState] = useState();
  const navigate = useNavigate();

  const edit = (att: any) => (): void => {
    console.log("edit", att);
    navigate(PAGES.editorSocial, { state: { data: att.row } });
  };

  const deleteRow = (att: any) => (): void => {
    console.log("delete", att);
  };

  const addSocial = (): void => {
    navigate(PAGES.editorSocial);
  };

  //Colonne del DataGrid
  const renderDetailsButton = (params: any) => {
    return (
      <>
        <ButtonIcon callback={edit(params)}>
          <CreateIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
        <ButtonIcon callback={deleteRow(params)}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </>
    );
  };
  const columns = [
    {
      field: "name",
      headerName: "Social",
      flex: 1,
    },
    {
      field: "icon",
      headerName: "Icona",
      flex: 1,
    },
    {
      field: "link",
      headerName: "Link",
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
              <p className={style.button}>+ Aggiungi Social</p>
            </ButtonGeneric>
          </Box>
          <CustomTable columns={columns} rows={social} />
        </LabelText>
      </Box>
    </Box>
  );
}

export default Social;
