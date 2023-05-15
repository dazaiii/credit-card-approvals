import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { historyApi } from "./api/history";
import { ResponseHistory } from "./constant";
import { useEffect, useState } from "react";

export const HistoryTable = () => {
  const columns: GridColDef[] = [
    { field: "date", headerName: "Data", width: 150 },
    { field: "yearsEmployed", headerName: "Staż pracy w latach", width: 200 },
    { field: "income", headerName: "Zarobki", width: 200 },
    { field: "age", headerName: "Wiek", width: 150 },
    { field: "gender", headerName: "Płeć", width: 200 },
    { field: "bankCustomer", headerName: "Klient banku", width: 150 },
    { field: "ethnicity", headerName: "Etniczność", width: 200 },
  ];

  const [rows, setRows] = useState<ResponseHistory[]>([]);

  useEffect(() => {
    historyApi
      .getDataHistory()
      .then((response: ResponseHistory[]) => setRows(response));
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};
