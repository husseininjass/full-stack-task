'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Box, Button, Stack } from '@mui/material';
import { useQuery, UseQueryOptions , keepPreviousData , useQueryClient } from '@tanstack/react-query';
import Edit from './edit';
interface Transaction {
  id: number;
  type: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionsResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
}

const fetchTransactions = async (page: number, limit: number , sort:string): Promise<TransactionsResponse> => {
  const res = await fetch(`http://localhost:3000/transactions?page=${page}&limit=${limit}&sort=${sort}`);
  const data = await res.json();
  return {
    data: data.data.map((t: any) => ({
      id: t.id,
      type: t.type,
      amount: t.amount,
      category: t.category.name,
      date: t.date,
    })),
    total: data.total,
    page: data.page,
    limit: data.limit,
  };
};
export default function TransactionsTable() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<string>('DESC');
    const [openEdit , setOpenEdit] = useState<boolean>(false)
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const limit = 10;
    const queryOptions: UseQueryOptions<TransactionsResponse, Error> = {
        queryKey: ['transactions', page , sort],
        queryFn: () => fetchTransactions(page, limit , sort),
        placeholderData: keepPreviousData,
    };
    const toggleSort = () => {
        setSort((prev:string) => (prev === 'DESC' ? 'ASC' : 'DESC'));
        setPage(1); 
    };
    const { data, isLoading, error,isPlaceholderData } = useQuery(queryOptions);
    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ p: 4 }}>{error.message}</Typography>;
    if (!data?.data || data.data.length === 0) return <Typography sx={{ p: 4 }}>No transactions found.</Typography>;
    const totalPages = Math.ceil(data.total / data.limit);

    const handleOpenEdit = (trx: Transaction) => {
        setSelectedTransaction(trx);
        setOpenEdit(true);
    };
    const deleteTransaction = async (id: number) => {
    const res = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete transaction");
    return true;
    };

    const handleDelete = async (trx: Transaction) => {
    if (!confirm(`Are you sure you want to delete transaction #${trx.id}?`)) return;
    try {
        await deleteTransaction(trx.id);
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
    } catch (err) {
        console.error(err);
        alert("Failed to delete transaction");
    }
};
    return (
        <Box>
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell 
                    onClick={toggleSort} 
                    sx={{ cursor: 'pointer', fontWeight: 'bold', userSelect: 'none' }}
                    >
                    ID {sort === 'DESC' ? '▼' : '▲'}
                </TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.data.map((trx:Transaction) => (
                <TableRow key={trx.id}>
                    <TableCell>{trx.id}</TableCell>
                    <TableCell>{trx.type}</TableCell>
                    <TableCell>${trx.amount}</TableCell>
                    <TableCell>{trx.category}</TableCell>
                    <TableCell>{new Date(trx.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <Button
                            style={{ marginRight: "8px" }}
                            onClick={() => handleOpenEdit(trx)}
                            >
                            Edit
                        </Button>
                        <Button style={{ marginRight: "8px" }} onClick={()=> handleDelete(trx)}>Delete</Button>
                        <Button>View</Button>
                    </TableCell>   
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <Edit
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            transaction={selectedTransaction}
        />
    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
    <Button
        variant="outlined"
        disabled={page === 1 || isPlaceholderData}
        onClick={() => setPage((prev:number) => Math.max(prev - 1, 1))}
    >
        Previous
    </Button>
    <Box sx={{ display: 'flex', gap: 1 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Button
            key={pageNum}
            variant={page === pageNum ? 'contained' : 'text'}
            size="small"
            sx={{ minWidth: '40px' }}
            onClick={() => setPage(pageNum)}
            disabled={isPlaceholderData}
        >
            {pageNum}
        </Button>
        ))}
    </Box>

    {/* NEXT BUTTON */}
    <Button
        variant="outlined"
        disabled={page === totalPages || isPlaceholderData}
        onClick={() => setPage((prev:number) => Math.min(prev + 1, totalPages))}
    >
        Next
    </Button>
    </Stack>
        </Box>
    );
}