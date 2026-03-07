import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack
} from "@mui/material";
import { useEffect, useState } from "react";
interface Budget{
    id : number,
    limit : number,
    period : number
}
interface Category{
    id : number,
    createdAt : Date,
    name : string,
    budget : Budget
}
interface Transaction {
  id: number;
  type: string;
  amount: string;
  category: Category;
  date: string;
}

interface ViewProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function View({ open, onClose, transaction }: ViewProps) {
  const [loading, setLoading] = useState(false);


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>View Transaction</DialogTitle>
        <DialogContent>
        {transaction ? (
            <Stack spacing={2}>
            <TextField
                label="ID"
                value={transaction.id}
                InputProps={{ readOnly: true }}
                fullWidth
            />
            <TextField
                label="Type"
                value={transaction.type}
                InputProps={{ readOnly: true }}
                fullWidth
            />
            <TextField
                label="Amount"
                value={transaction.amount}
                InputProps={{ readOnly: true }}
                fullWidth
            />
            <TextField
                label="Date"
                value={transaction.date}
                InputProps={{ readOnly: true }}
                fullWidth
            />
            <TextField
                label="Category Name"
                value={transaction.category.name}
                InputProps={{ readOnly: true }}
                fullWidth
            />
            <TextField
                label="Category Created At"
                value={new Date(transaction.category.createdAt).toLocaleString()}
                InputProps={{ readOnly: true }}
                fullWidth
            />
            {transaction.category.budget && (
                <>
                <TextField
                    label="Budget ID"
                    value={transaction.category.budget.id}
                    InputProps={{ readOnly: true }}
                    fullWidth
                />
                <TextField
                    label="Budget Limit"
                    value={transaction.category.budget.limit}
                    InputProps={{ readOnly: true }}
                    fullWidth
                />
                <TextField
                    label="Budget Period"
                    value={transaction.category.budget.period}
                    InputProps={{ readOnly: true }}
                    fullWidth
                />
                </>
            )}
            </Stack>
        ) : (
            <p>No transaction selected.</p>
        )}
        </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}