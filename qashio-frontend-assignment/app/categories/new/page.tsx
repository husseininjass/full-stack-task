'use client';

import { Box, Typography } from '@mui/material';
import Form from './form';

export default function TransactionsPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Categories
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Add New Categories
      </Typography>
      <Form />
    </Box>
  );
} 