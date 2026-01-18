

import './App.css'
import CandidatesTable from './components/CandidatesTable'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {


  return (
    <>
    <QueryClientProvider client={queryClient}>
    <CandidatesTable />
    </QueryClientProvider>
    </>
  )
}

export default App
