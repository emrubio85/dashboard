import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

interface HeaderProps {
    children?: ReactNode;
}

export default function HeaderUI({ children }: HeaderProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
                Dashboard del Clima
            </Typography>
            {children}
        </Box>
    );
}