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

interface Transaction {
  id: number;
  type: string;
  amount: string;
  category: string;
  date: string;
}

interface EditProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function Edit({ open, onClose, transaction }: EditProps) {
  const [form, setForm] = useState<Transaction | null>(transaction);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(transaction);
  }, [transaction]);

  const handleChange = (field: keyof Transaction, value: string) => {
    if (!form) return;
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    if (!form) return;
    setLoading(true);
    try {
        await updateTransaction(form);
        alert("transaction has been updated");
        onClose(); 
    } catch (error) {
        alert("Could not update transaction. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const updateTransaction = async (trx: Transaction) => {
    const res = await fetch(`http://localhost:3000/transactions/${trx.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: trx.type,
        amount: Number(trx.amount),
        categoryId: Number(trx.category),
      }),
    });

    if (!res.ok) throw new Error("Failed to update transaction");
    return await res.json();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Transaction</DialogTitle>
      <DialogContent>
        {form && (
          <Stack spacing={2} mt={1}>
            <TextField
              label="Type"
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              fullWidth
            />
            <TextField
              label="Amount"
              type="number"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              fullWidth
            />
            <TextField
              label="Category"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              fullWidth
            />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}