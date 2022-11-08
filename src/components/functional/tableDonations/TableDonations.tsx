import { useState, FC, useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

//style
import style from "../../../assets/styles/common.module.scss";

//components
import ButtonIcon from '../buttonIcon/ButtonIcon';

//icon
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

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
    open: []
}

const TableDonations: FC<TableDonationsProps> = (props) => {

    const [state, setState] = useState<State>(initialState)

    //component did mount
    useEffect(() => {
        prepare()
    }, [])

    //assegno false a tutti i collapse
    const prepare = (): void => {
        let o: Array<boolean> = []
        for (let i = 0; i < props.rows.length; i++)
            o.push(false)
        setState({
            ...state,
            open: o
        })
    }

    //converto la data per stamparla
    const getDate = (value: any): string => {
        return value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear()
    }

    //setto lo stato goiusto epr il collapse
    const collapse = (value: number) => (): void => {
        console.log(value)
        let o: Array<boolean> = state.open
        o[value] = !o[value]
        setState({
            ...state,
            open: o
        })
    }

    return (
        <TableBody>
            {
                props.rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row: any, key: number) => {
                    return (
                        <Fragment key={key}>

                            <TableRow sx={{ width: "100%" }}>
                                <TableCell sx={{ width: "25%" }}>{row.id}</TableCell>
                                <TableCell sx={{ width: "25%" }}>{row.amount.toFixed(2)} €</TableCell>
                                <TableCell sx={{ width: "45%" }}>{getDate(row.date)}</TableCell>
                                <TableCell sx={{ width: "5%" }} align="right">
                                    <ButtonIcon
                                        aria-label="expand row"
                                        callback={collapse(key)}
                                    >
                                        <RemoveRedEyeOutlinedIcon />
                                    </ButtonIcon>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={state.open[key]} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h5" gutterBottom component="div">
                                                Transazione
                                            </Typography>
                                            <Table size="small" aria-label="purchases">
                                                <TableHead>
                                                    <TableRow sx={{backgroundColor: style.ternaryColor}}>
                                                        <TableCell sx={{fontWeight:"700"}}>ID</TableCell>
                                                        <TableCell sx={{fontWeight:"700"}}>EMAIL</TableCell>
                                                        <TableCell sx={{fontWeight:"700"}}>VALORE</TableCell>
                                                        <TableCell sx={{fontWeight:"700"}}>DATA</TableCell>
                                                        <TableCell sx={{fontWeight:"700"}}>ANONIMA</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableCell >{row.id}</TableCell>
                                                    <TableCell >{row.email}</TableCell>
                                                    <TableCell >{row.amount.toFixed(2)} €</TableCell>
                                                    <TableCell >{getDate(row.date)}</TableCell>
                                                    <TableCell >{row.anonyme.toString()==="true"? "si":"no"}</TableCell>
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>

                        </Fragment>
                    )
                })
            }
        </TableBody>
    );
}
export default TableDonations
