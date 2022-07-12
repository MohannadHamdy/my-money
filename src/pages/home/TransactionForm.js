import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useFirestore } from "../../hooks/useFirestore";
const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { addDocument, response } = useFirestore("transactions");

  const addTransactionHandler = (e) => {
    e.preventDefault();

    addDocument({ name, amount, uid });
  };

  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 300,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ marginBottom: "1em" }}
          align="center"
        >
          Add a Transaction
        </Typography>
        <form className="transactionForm" onSubmit={addTransactionHandler}>
          <TextField
            id="Name"
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            required
          />
          <TextField
            id="Amount"
            label="Amount ($)"
            variant="outlined"
            type="number"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            value={amount}
            required
          />

          <Button
            color="secondary"
            variant="contained"
            size="large"
            type="submit"
            disabled={response.isPending}
          >
            Add
          </Button>
        </form>
        {response.error && (
          <Typography
            variant="h6"
            gutterBottom
            sx={{ margin: "1em 0" }}
            align="center"
          >
            {response.error}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default TransactionForm;
