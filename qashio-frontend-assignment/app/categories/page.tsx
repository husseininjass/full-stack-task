'use client';

import { Box, Typography } from '@mui/material';
import CategoriesTable from './categoriestable';

export default function CategoriesPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Categories
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View and manage your categories
      </Typography>
      <CategoriesTable />
    </Box>
  );
} 