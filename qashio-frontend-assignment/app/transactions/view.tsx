import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Box,
  Divider,
  Chip
} from "@mui/material";
import { useState } from "react";

interface Budget {
  id: number;
  limit: number;
  period: number;
}
interface Category {
  id: number;
  createdAt: Date;
  name: string;
  budget: Budget;
}
interface Transaction {
  id: number;
  type: string;
  amount: string;
  category: Category;
  date: Date;
}

interface ViewProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function View({ open, onClose, transaction }: ViewProps) {
  const [loading, setLoading] = useState(false);
  const DataRow = ({ label, value, bold = false }: { label: string; value: string | number; bold?: boolean }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: bold ? 700 : 500 }}>{value}</Typography>
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: 'center', pb: 0 }}>Transaction Details</DialogTitle>
      
      <DialogContent>
        {transaction ? (
          <Stack spacing={2} sx={{ mt: 2 }}>
            
            <Box sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: 'action.hover', 
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'divider'
            }}>
              <Chip 
                label={transaction.type.toUpperCase()} 
                size="small" 
                color={transaction.type === 'income' ? 'success' : 'error'} 
                sx={{ mb: 1, fontWeight: 'bold' }}
              />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                ${transaction.amount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ID: #{transaction.id}
              </Typography>
            </Box>

            <Box>
              <DataRow label="Date" value={new Date(transaction.date).toLocaleDateString()} />
              <Divider />
              <DataRow label="Category" value={transaction.category.name} bold />
              <DataRow label="Category Created" value={new Date(transaction.category.createdAt).toLocaleDateString()} />
            </Box>

            {transaction.category.budget && (
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                border: '1px dashed', 
                borderColor: 'primary.main',
                bgcolor: 'primary.main',
                backgroundOpacity: 0.05 
              }} style={{ backgroundColor: 'rgba(25, 118, 210, 0.04)' }}>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Budget Information
                </Typography>
                <DataRow label="Budget ID" value={transaction.category.budget.id} />
                <DataRow label="Limit" value={`$${transaction.category.budget.limit}`} />
                <DataRow label="Period" value={`${transaction.category.budget.period} Days`} />
              </Box>
            )}

          </Stack>
        ) : (
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <Typography color="text.secondary">No transaction selected.</Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose} 
          color="inherit" 
          variant="outlined" 
          disabled={loading}
          fullWidth
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}