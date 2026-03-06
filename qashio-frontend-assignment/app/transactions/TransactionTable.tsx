'use client';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function TransactionsTable() {
  // Dummy data
  const transactions = [
    { id: 1, type: 'Income', amount: 1000, category: 'Salary', date: '2026-03-06' },
    { id: 2, type: 'Expense', amount: 50, category: 'Food', date: '2026-03-05' },
    { id: 3, type: 'Expense', amount: 20, category: 'Transport', date: '2026-03-04' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((trx) => (
            <TableRow key={trx.id}>
              <TableCell>{trx.id}</TableCell>
              <TableCell>{trx.type}</TableCell>
              <TableCell>${trx.amount}</TableCell>
              <TableCell>{trx.category}</TableCell>
              <TableCell>{trx.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}