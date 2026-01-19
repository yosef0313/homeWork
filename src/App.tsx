

import './App.css'
import CandidatesTable from './components/CandidatesTable'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material';

const queryClient = new QueryClient();
function App() {


  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
    <CandidatesTable />
    </ThemeProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
