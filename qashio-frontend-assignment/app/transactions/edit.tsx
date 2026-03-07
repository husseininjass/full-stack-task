import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";

interface Transaction {
  id: number;
  type: string;
  amount: string;
  categoryId: number;
  date: string;
}

interface Category {
  id: number;
  name: string;
}

interface EditProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function Edit({ open, onClose, transaction }: EditProps) {
  const [form, setForm] = useState<Transaction | null>(transaction);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  useEffect(() => {
    setForm(transaction);
  }, [transaction]);

  useEffect(() => {
    if (!open) return;

    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, [open]);

  const handleChange = (field: keyof Transaction, value: string | number) => {
    if (!form) return;
    setForm({ ...form, [field]: value });
  };

  const updateTransaction = async (trx: Transaction) => {
    const res = await fetch(`http://localhost:3000/transactions/${trx.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: trx.type,
        amount: Number(trx.amount),
        categoryId: trx.categoryId
      }),
    });

    if (!res.ok) throw new Error("Failed to update transaction");
    return await res.json();
  };

  const handleSave = async () => {
    if (!form) return;

    setLoading(true);
    try {
      await updateTransaction(form);
      alert("Transaction updated successfully");
      onClose();
    } catch (error) {
      alert("Could not update transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Transaction</DialogTitle>

      <DialogContent>
        {form && (
          <Stack spacing={2} mt={1}>
            <TextField
              select
              label="Type"
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              fullWidth
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>

            <TextField
              label="Amount"
              type="number"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              fullWidth
            />
            <TextField
              select
              label="Category"
              value={form.categoryId}
              onChange={(e) => handleChange("categoryId", Number(e.target.value))}
              fullWidth
              disabled={categoriesLoading}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </Button>

        <Button onClick={handleSave} variant="contained" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}