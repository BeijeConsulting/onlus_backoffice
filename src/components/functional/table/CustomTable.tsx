import { FC } from "react";

//Componenti MUI
import { Box } from "@mui/system";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

//Style
import common from "../../../assets/styles/common.module.scss";

interface Props {
  columns: GridColumns<object>;
  rows: Array<object>;
  pageSize?: number;
}

const CustomTable: FC<Props> = (props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        getRowHeight={() => "auto"}
        sx={{
          "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
            py: 1,
          },
          "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
            py: "12px",
          },
          "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
            py: "22px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: common.ternaryColor,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              backgroundColor: "white",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "white",
          },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              backgroundColor: 'white'
            },
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: 'white'
          }
        }}
        disableSelectionOnClick
        //getEstimatedRowHeight={() => 200}
        disableColumnMenu
        rows={props.rows}
        columns={props.columns}
        pageSize={!!props.pageSize ? props.pageSize : 5}
        //rowsPerPageOptions={[5]}
      />
    </Box>
  );
};

export default CustomTable;
