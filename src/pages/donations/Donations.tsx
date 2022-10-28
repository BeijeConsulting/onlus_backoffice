import { FC, useState } from "react";

//style
import style from "../../assets/styles/common.module.scss";

//mui
import { Typography, Box} from "@mui/material";

//components
import LabelText from "../../components/functional/labelText/LabelText";
import Title from "../../components/functional/title/Title";
import CustomTextField from "../../components/functional/textField/CustomTextField";
import ButtonAddFile from "../../components/functional/buttonAddFile/ButtonAddFile";
import ButtonGeneric from "../../components/functional/buttonGeneric/ButtonGeneric";
import CustomTable from "../../components/functional/table/CustomTable";
import ButtonIcon from "../../components/functional/buttonIcon/ButtonIcon";
import {donations} from "../../utils/mockup/data"

//icon
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

let key: number = 0

//Colonne del DataGrid
const renderDetailsButton = (params: any) => {
  return (
    <>
      <ButtonIcon callback={()=> console.log(params)}>
        <RemoveRedEyeOutlinedIcon
          sx={{ fontSize: "18px" }}
        />
      </ButtonIcon>
    </>
  );
};
//colonne tabella
const columns = [
  {
    field: "id",
    headerName: "ID Transazione",
    flex: 1,
  },
  {
    field: "amount",
    headerName: "Valore",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Data",
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
  }
]

const Donations: FC = () => {

  //calcolo il totale delle donazioni
  const getTotal = (): string => {
    let total:number = 0
    donations.map((element)=>{
      total += element.amount
    })
    return total.toString()+"€"
  }

  //salvo le modifiche
  const save = (): void => {
    
  }

  return (

    <Box className={style.component}>
      <Box className={style.singleComponent}>
        <Box sx={{ display: 'flex', flexDirection: 'raw', justifyContent: 'flex-end' }}>
          <Typography sx={{ fontWeight: 'bold' }}>TOTALE DONAZIONI:</Typography>
          <Typography sx={{marginBottom:'20px', marginLeft:'5px'}}>{getTotal()}</Typography>
        </Box>
        <LabelText>
          {/*titolo*/}
          <Title text="Donazioni" textInfo="Titolo della pagina con la tabella delle donazioni" />

          {/*tabella*/}
          <CustomTable
            columns={columns}
            rows={donations}
          />

          {/*salva modifiche*/}
          <ButtonGeneric
            color="#a4b3ad"
            callback={save}
          >
            Salva modifiche
          </ButtonGeneric>
        </LabelText>
      </Box>
    </Box>
  )
}

export default Donations;