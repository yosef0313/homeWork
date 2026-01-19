import { createTheme, alpha } from '@mui/material/styles';


declare module '@mui/material/styles' {
  interface Palette {
    status: {
      hired: { bg: string; color: string };
      rejected: { bg: string; color: string };
      interview: { bg: string; color: string };
      new: { bg: string; color: string };
    };
  }
  interface PaletteOptions {
    status?: {
      hired: { bg: string; color: string };
      rejected: { bg: string; color: string };
      interview: { bg: string; color: string };
      new: { bg: string; color: string };
    };
  }
}


const colors = {
  primary: '#ea5b0c',   
  secondary: '#2c2c2c',    
  background: '#f5f5f7',   
  paper: '#ffffff',       
  inputBg: '#fafafa',      
  textSecondary: '#666666',
  border: '#e0e0e0',
};


export const theme = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: { default: colors.background, paper: colors.paper },
    text: { primary: colors.secondary, secondary: colors.textSecondary },
    
    status: {
      hired: { bg: '#e8f5e9', color: '#2e7d32' },
      rejected: { bg: '#ffebee', color: '#d32f2f' },
      interview: { bg: '#fff3e0', color: '#ef6c00' },
      new: { bg: '#e3f2fd', color: '#0288d1' },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      color: colors.secondary,
      letterSpacing: '-0.5px',
    },
    subtitle2: {
      fontWeight: 700,
      color: colors.primary,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          height: '56px',
          boxShadow: 'none',
          fontSize: '1rem',
          '&:hover': { boxShadow: 'none', backgroundColor: '#000' },
        },
        contained: {
          backgroundColor: colors.secondary,
          color: '#fff',
        },
      },
    },
   
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: colors.inputBg,
          transition: 'all 0.2s',
          '& fieldset': { borderColor: 'transparent' }, // ברירת מחדל ללא גבול בולט
          '&:hover fieldset': { borderColor: '#bdbdbd' },
          '&.Mui-focused fieldset': {
            borderColor: colors.primary,
            borderWidth: '1px',
          },
        },
      },
    },
    
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16 },
        elevation0: { border: `1px solid rgba(0,0,0,0.04)` },
      },
    },
   
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#9e9e9e',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '1px',
          borderBottom: '1px solid #f0f0f0',
        },
        body: {
          color: colors.secondary,
          borderBottom: '1px solid #f0f0f0',
          fontSize: '1rem',
          fontWeight: 500, 
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700, borderRadius: 8 },
      },
    },
  },
});