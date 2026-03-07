'use client';

import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Transactions', href: '/transactions' },
    { label: 'New Transaction', href: '/transactions/new' },
    { label: 'Categories', href: '/categories' },
    { label: 'New Category', href: '/categories/new' },
  ];

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Typography
          component={Link}
          href="/transactions"
          variant="h6"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          Qashio
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                sx={{
                  fontWeight: active ? 'bold' : 'normal',
                  borderBottom: active
                    ? '2px solid white'
                    : '2px solid transparent',
                  borderRadius: 0,
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}