'use client';

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Paper
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useQueryClient } from '@tanstack/react-query';

export default function Form() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [budget, setBudget] = useState<number | "">("");
  const [period, setPeriod] = useState<number | "">("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: Number(budget),
          period: Number(period),
          name
        }),
      });

      if (!res.ok) throw new Error("Failed to create category");
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      router.push("/categories");
    } catch (error) {
      console.error(error);
      alert("Error creating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Create Category
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>

            <TextField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              required
            />

            <TextField
              label="Period (days)"
              type="number"
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              required
            />

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Creating..." : "Create Category"}
            </Button>

          </Stack>
        </form>
      </Paper>
    </Box>
  );
}