import { FC, useState } from "react";

//style
import style from "../../assets/styles/common.module.scss";

//mui
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Box } from "@mui/material";

//components
import LabelText from "../../components/functional/labelText/LabelText";
import Title from "../../components/functional/title/Title";
import { donations } from "../../utils/mockup/data";
import TableDonations from "../../components/functional/tableDonations/TableDonations";
//translation
import { useTranslation } from "react-i18next";

//state
interface State {
  page: number;
  rowsPerPage: number;
}
const initialState: State = {
  page: 0,
  rowsPerPage: 5,
};

const Donations: FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { t } = useTranslation();

  //calcolo il totale delle donazioni (usare chiamata API)
  const getTotal = (): string => {
    let total: number = 0
    donations.forEach((element) => {
      console.log(element)
      total += element.amount
    })
    return total.toString() + "€"
  }

  //cambia il numero di pagina
  const handleChangePage = (event: unknown, newPage: number) => {
    setState({
      ...state,
      page: newPage,
    });
  };

  //al cambio del numero di righe per pagina
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({
      ...state,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  return (
    <Box className={style.component}>
      <Box className={style.singleComponent}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "raw",
            justifyContent: "flex-end",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {t("Donation.amountDonation")}:
          </Typography>
          <Typography sx={{ marginBottom: "20px", marginLeft: "5px" }}>
            {getTotal()}
          </Typography>
        </Box>
        <LabelText>
          {/*titolo*/}
          <Title text={t("Donation.title")} textInfo={t("Donation.info")} />

          {/*tabella*/}
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead sx={{ backgroundColor: style.ternaryColor }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "700" }}>
                    {t("Donation.table.id")}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "700" }}>
                    {t("Donation.table.value")}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "700" }}>
                    {t("Donation.table.date")}
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              {
                <TableDonations
                  rows={donations}
                  rowsPerPage={state.rowsPerPage}
                  page={state.page}
                />
              }
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[-1]}
            component="div"
            count={donations.length}
            rowsPerPage={state.rowsPerPage}
            page={state.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </LabelText>
      </Box>
    </Box>
  );
};

export default Donations;
