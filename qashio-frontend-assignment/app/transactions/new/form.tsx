'use client';

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  MenuItem,
  Typography,
  Paper
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface Category {
  id: number;
  name: string;
}
const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch("http://localhost:3000/categories?limit=20");
  const data = await res.json();
  return data.data;
};

export default function Form() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          type,
          categoryId: Number(categoryId),
        }),
      });

      if (!res.ok) throw new Error("Failed to create transaction");
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      router.push("/transactions"); 
    } catch (error) {
      console.error(error);
      alert("Error creating transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Create Transaction
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />

            <TextField
              label="Type"
              select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>

            <TextField
              label="Category"
              select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              required
              disabled={isCategoriesLoading}
            >
              {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Creating..." : "Create Transaction"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}