import { useState, FC, useEffect, Fragment } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

//style
import style from "../../../assets/styles/common.module.scss";

//components
import ButtonIcon from "../buttonIcon/ButtonIcon";

//icon
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
//translation
import { useTranslation } from "react-i18next";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

//props
interface TableDonationsProps {
  rows: any;
  page: number;
  rowsPerPage: number;
}
//state
interface State {
  open: Array<boolean>;
}
const initialState: State = {
  open: [],
};

const TableDonations: FC<TableDonationsProps> = (props) => {
  const [state, setState] = useState<State>(initialState);
  const { t } = useTranslation();

  //component did mount
  useEffect(() => {
    prepare();
  }, []);

  //assegno false a tutti i collapse
  const prepare = (): void => {
    let o: Array<boolean> = [];
    for (let i = 0; i < props.rows.length; i++) o.push(false);
    setState({
      ...state,
      open: o,
    });
  };

  //converto la data per stamparla
  const getDate = (value: any): string => {
    return (
      value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear()
    );
  };

  //setto lo stato goiusto epr il collapse
  const collapse = (value: number) => (): void => {
    console.log(value);
    let o: Array<boolean> = state.open;
    o[value] = !o[value];
    setState({
      ...state,
      open: o,
    });
  };

  return (
    <TableBody>
      {props.rows
        .slice(
          props.page * props.rowsPerPage,
          props.page * props.rowsPerPage + props.rowsPerPage
        )
        .map((row: any, key: number) => {
          return (
            <Fragment key={key}>
              <TableRow sx={{ width: "100%" }}>
                <TableCell sx={{ width: "25%" }}>{row.id}</TableCell>
                <TableCell sx={{ width: "25%" }}>
                  {row.amount.toFixed(2)} €
                </TableCell>
                <TableCell sx={{ width: "45%" }}>{getDate(row.date)}</TableCell>
                <TableCell sx={{ width: "5%" }} align="right">
                  <ButtonIcon aria-label="expand row" callback={collapse(key)}>
                    <RemoveRedEyeOutlinedIcon />
                  </ButtonIcon>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={state.open[key]} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h5" gutterBottom component="div">
                        {t("Donation.subTable.title")}
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow
                            sx={{ backgroundColor: style.ternaryColor }}
                          >
                            <TableCell sx={{ fontWeight: "700" }}>
                              {t("Donation.subTable.id")}
                            </TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>
                              {t("Donation.subTable.email")}
                            </TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>
                              {t("Donation.subTable.value")}
                            </TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>
                              {t("Donation.subTable.date")}
                            </TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>
                              {t("Donation.subTable.anonimus")}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.amount.toFixed(2)} €</TableCell>
                          <TableCell>{getDate(row.date)}</TableCell>
                          <TableCell>
                            {row.anonyme.toString() === "true" ? "si" : "no"}
                          </TableCell>
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          );
        })}
      {/*
        
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {/*row.name
                </TableCell>
                <TableCell>{props.row.id}</TableCell>
                <TableCell>{props.row.amount}</TableCell>
                <TableCell>{props.row.date}</TableCell>
                <TableCell>
                    
                        <ButtonIcon
                            aria-label="expand row"
                            callback={() => setState({ open: !state.open })}
                        >
                            <RemoveRedEyeOutlinedIcon />
                        </ButtonIcon>
    
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={state.open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Transazione
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>EMAIL</TableCell>
                                        <TableCell>VALORE</TableCell>
                                        <TableCell >DATA</TableCell>
                                        <TableCell>ANONIMA</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    row.history.map((historyRow: any) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.date}
                                                </TableCell>
                                                <TableCell>{historyRow.customerId}</TableCell>
                                                <TableCell align="right">{historyRow.amount}</TableCell>
                                                <TableCell align="right">
                                                    {Math.round(historyRow.amount * row.price * 100) / 100}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
                                    */}
    </TableBody>
  );
};
export default TableDonations;
