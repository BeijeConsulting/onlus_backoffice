import { DataGrid, GridFilterInputMultipleValue } from "@mui/x-data-grid";
import articles from "../../../utils/mockup/articles";
import ButtonIcon from "../buttonIcon/ButtonIcon";
import { Anchor } from "@mui/icons-material";
import common from "../../../assets/styles/common.module.scss";

const CustomTable = () => {
  const renderDetailsButton = (params: any) => {
    return (
      <>
        <ButtonIcon>
          <Anchor
            sx={{ fontSize: "18px" }}
            onClick={() => {
              console.log("ciao", params.api.getRow);
            }}
          />
        </ButtonIcon>
        <ButtonIcon>
          <Anchor sx={{ fontSize: "18px" }} />
        </ButtonIcon>
      </>
    );
  };

  const columns = [
    {
      field: "title",
      headerName: "titolo",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "author",
      headerName: "autore",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "date",
      headerName: "data",
      type: "date",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "stato",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "icone",
      headerName: "",
      type: "number",
      sortable: false,
      headerClassName: "super-app-theme--header",
      flex: 1,
      renderCell: renderDetailsButton,
      // valueGetter: (params: any) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowHeight={() => "auto"}
        sx={{
          "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
            py: 1,
          },
          "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
            py: "15px",
          },
          "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
            py: "22px",
          },
          "& .super-app-theme--header": {
            backgroundColor: common.ternaryColor,
            fontWeight: "bolder",
          },
        }}
        disableSelectionOnClick
        getEstimatedRowHeight={() => 200}
        disableColumnMenu
        rows={articles}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default CustomTable;
