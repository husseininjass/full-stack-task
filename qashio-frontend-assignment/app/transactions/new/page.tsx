'use client';

import { Box, Typography } from '@mui/material';
import Form from './form';

export default function TransactionsPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Transactions
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Add New Transaction
      </Typography>
      <Form />
    </Box>
  );
} 