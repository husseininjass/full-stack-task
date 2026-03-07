'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Box, Button, Stack } from '@mui/material';
import { useQuery, UseQueryOptions, useQueryClient , keepPreviousData } from '@tanstack/react-query';

interface Budget {
    id: number;
    limit: number;
    period: number;
    createdAt: Date;
}

interface Category {
    id: number;
    createdAt: Date;
    name: string;
    budget: Budget;
}

interface CategoriesResponse {
    data: Category[];
    total: number;
    page: number;
    limit: number;
}

const fetchCategories = async (page: number, limit: number, sort: string): Promise<CategoriesResponse> => {
    const res = await fetch(`http://localhost:3000/categories?page=${page}&limit=${limit}&sort=${sort}`);
    const data = await res.json();
    return {
        data: data.data.map((c: any) => ({
            id: c.id,
            name: c.name,
            createdAt: new Date(c.createdAt),
            budget: c.budget,
        })),
        total: data.total,
        page: data.page,
        limit: data.limit,
    };
};

export default function CategoriesTable() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<'ASC' | 'DESC'>('DESC');
    const limit = 10;

    const toggleSort = () => {
        setSort((prev : string) => (prev === 'DESC' ? 'ASC' : 'DESC'));
        setPage(1);
    };

    const { data, isLoading, error, isFetching } = useQuery<CategoriesResponse, Error>({
        queryKey: ['categories', page, sort],
        queryFn: () => fetchCategories(page, limit, sort),
        placeholderData: keepPreviousData,
    });

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ p: 4 }}>{error.message}</Typography>;
    if (!data?.data || data.data.length === 0) return <Typography sx={{ p: 4 }}>No categories found.</Typography>;

    const totalPages = Math.ceil(data.total / data.limit);

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
                            <TableCell>Name</TableCell>
                            <TableCell>Budget Limit</TableCell>
                            <TableCell>Budget Period</TableCell>
                            <TableCell>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data.map((cat: Category) => (
                            <TableRow key={cat.id}>
                                <TableCell>{cat.id}</TableCell>
                                <TableCell>{cat.name}</TableCell>
                                <TableCell>${cat.budget.limit}</TableCell>
                                <TableCell>{cat.budget.period} month</TableCell>
                                <TableCell>{cat.createdAt.toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button
                    variant="outlined"
                    disabled={page === 1 || isFetching}
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
                            disabled={isFetching}
                        >
                            {pageNum}
                        </Button>
                    ))}
                </Box>
                <Button
                    variant="outlined"
                    disabled={page === totalPages || isFetching}
                    onClick={() => setPage((prev:number) => Math.min(prev + 1, totalPages))}
                >
                    Next
                </Button>
            </Stack>
        </Box>
    );
}