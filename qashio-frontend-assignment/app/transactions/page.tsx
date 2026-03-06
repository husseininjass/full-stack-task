'use client';

import { Box, Typography } from '@mui/material';
import TransactionTable from './TransactionTable';

export default function TransactionsPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Transactions
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View and manage your transactions
      </Typography>
      <TransactionTable />
    </Box>
  );
} 