import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useFirestore } from "../../hooks/useFirestore";
import "./transactionList.scss";
const TransactionList = ({ transactions }) => {
  const { deleteDocument, response } = useFirestore("transactions");
  console.log(response);
  const userColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
    },
    { field: "amount", headerName: "Amount", width: 100 },
  ];

  return (
    <>
      <ul className="transactions">
        {transactions.map((single) => (
          <li key={single.id}>
            <p className="name">{single.name}</p>
            <p className="amount">${single.amount}</p>
            <button onClick={() => deleteDocument(single.id)}>x</button>
          </li>
        ))}
      </ul>

      {/* <div className="datatable">
        <DataGrid
          rows={transactions}
          columns={userColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />
      </div> */}
    </>
  );
};

export default TransactionList;
