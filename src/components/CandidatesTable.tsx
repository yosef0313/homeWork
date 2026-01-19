import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
 import { alpha } from '@mui/material/styles';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Button,
  Box,
  Alert,
  InputAdornment,
  LinearProgress,
  Chip, 
   useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Divider,
  Snackbar 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import TimelineIcon from '@mui/icons-material/Timeline';
import { filterCandidates } from '../utils/filterCandidates';


interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  status: string;
  experience: number;
}

interface FilterState {
  name: string;
  position: string;
  status: string;
  experience: string;
}

const POSITIONS = ['Frontend Developer', 'Backend Developer', 'Product Manager', 'Designer'];
const STATUSES = ['New', 'Interview', 'Hired', 'Rejected'];

const initialFilters: FilterState = { name: '', position: '', status: '', experience: '' };

function CandidatesTable() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Data is fetched from JSON Server using TanStack Query for caching/loading/error handling.
  const {
    data: candidates = [],
    isLoading,
    error,
  } = useQuery<Candidate[], Error>({
    queryKey: ['candidates'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/candidates');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as Candidate[];
    },
  });

  // Real-time filtering: all active filters are combined with AND logic; memoized for performance.
  const filteredCandidates = useMemo(
  () => filterCandidates(candidates, filters),
  [candidates, filters]
);



  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };

      if (key === 'name' && value === '') {
        newFilters.position = '';
        newFilters.status = '';
      }
      if (key === 'position' && value === '') {
        newFilters.status = '';
      }

      return newFilters;
    });
  };

  const handleReset = () => setFilters(initialFilters);

// Conditional filters: Position is enabled only after Name is filled; Status only after Position is selected.
  const isPositionDisabled = filters.name.trim().length === 0;
  const isStatusDisabled = filters.position === '' || isPositionDisabled;


// UX: double-click copies the email to clipboard and shows visual feedback.
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setSnackbarOpen(true);
  };


  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Hired': return theme.palette.status.hired;
      case 'Rejected': return theme.palette.status.rejected;
      case 'Interview': return theme.palette.status.interview;
      default: return theme.palette.status.new;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, minHeight: '100dvh', bgcolor: 'background.default' }}>
      <Box sx={{
        mb: 4,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 2, sm: 0 },
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
            Recruitment <span style={{ color: theme.palette.primary.main }}>Portal</span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage candidates efficiently
          </Typography>
        </Box>
        {!isLoading && !error && (
          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {filteredCandidates.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Candidates
            </Typography>
          </Paper>
        )}
      </Box>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.04)',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                fullWidth
                label="Candidate Name"
                id="searchName"
                name="searchname"
                variant="outlined"
                placeholder="Search by name..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'action.hover',
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                select
                fullWidth
                id="filterPosition"
                name="filter-position"
                label="Position"
                value={filters.position}
                onChange={(e) => handleFilterChange('position', e.target.value)}
                disabled={isPositionDisabled}
                helperText={isPositionDisabled ? "Type name to unlock" : " "}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'action.hover',
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  },
                  '& .MuiFormHelperText-root': {
                    color: isPositionDisabled ? 'text.disabled' : 'text.secondary',
                    whiteSpace: 'nowrap'
                  }
                }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {POSITIONS.map((pos) => (
                  <MenuItem key={pos} value={pos}>{pos}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                select
                fullWidth
                label="Status"
                id="filterStatus"
                name="filter-status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                disabled={isStatusDisabled}
                helperText={isStatusDisabled ? "Select position to unlock" : " "}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'action.hover',
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  },
                  '& .MuiFormHelperText-root': {
                    color: isStatusDisabled ? 'text.disabled' : 'text.secondary',
                    whiteSpace: 'nowrap'
                  }
                }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {STATUSES.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
              <TextField
                fullWidth
                label="Experience"
                placeholder="0"
                type="number"
                id="filtErexp"
                name="filter-exp"
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                slotProps={{ htmlInput: { min: 0 } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'action.hover',
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  }
                }}
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleReset}
                startIcon={<RestartAltIcon />}
                sx={{
                  height: '56px',
                  borderRadius: 3,
                  bgcolor: 'secondary.main',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  '&:hover': { bgcolor: 'text.primary' }
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>

        {error ? (
          <Alert severity="error" sx={{ borderRadius: 3 }}>
            Failed to fetch data. Ensure JSON Server is running. ({error.message})
          </Alert>
        ) : isLoading ? (
          <LinearProgress sx={{ borderRadius: 4, height: 6 }} />
        ) : filteredCandidates.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">No results found</Typography>
          </Box>

        ) : isMobile ? (
          <Stack spacing={2}>
            {filteredCandidates.map((row) => {
              const statusColors = getStatusStyle(row.status);
              return (
                <Card key={row.id} variant="outlined" sx={{ borderRadius: 3, bgcolor: 'action.hover' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>{row.name}</Typography>
                      <Chip label={row.status} size="small" sx={{ bgcolor: statusColors.bg, color: statusColors.color, fontWeight: 700 }} />
                    </Box>
                    <Divider sx={{ my: 1.5 }} />
                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <WorkIcon fontSize="small" color="action" />
                        <Typography variant="body2">{row.position}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <EmailIcon fontSize="small" color="action" />
                        <Typography
                          variant="body2"
                          sx={{
                            wordBreak: 'break-all',
                            cursor: 'pointer',
                            '&:hover': { color: 'primary.main' }
                          }}
                          onDoubleClick={() => handleCopyEmail(row.email)}
                          title="Double click to copy"
                        >
                          {row.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <TimelineIcon fontSize="small" color="action" />
                        <Typography variant="body2">{row.experience} Years Exp</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>) : (
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'text.disabled', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>NAME</TableCell>
                  <TableCell sx={{ color: 'text.disabled', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>CONTACT</TableCell>
                  <TableCell sx={{ color: 'text.disabled', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>ROLE</TableCell>
                  <TableCell sx={{ color: 'text.disabled', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>EXPERIENCE</TableCell>
                  <TableCell sx={{ color: 'text.disabled', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCandidates.map((row) => {
                   const statusColors = getStatusStyle(row.status);
                   return (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04) },
                      transition: '0.2s'
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, fontSize: '1rem', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
                      {row.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'text.secondary',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main', fontWeight: 500 },
                        transition: '0.2s'
                      }}
                      onDoubleClick={() => handleCopyEmail(row.email)}
                      title="Double click to copy"
                    >
                      {row.email}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.position}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Chip
                        label={`${row.experience} Yrs`}
                        size="small"
                        sx={{ bgcolor: 'action.hover', fontWeight: 600, color: 'text.secondary' }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          borderRadius: 2,
                          px: 1,
                          bgcolor: statusColors.bg,
                          color: statusColors.color,
                          border: '1px solid transparent'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Email copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
}

export default CandidatesTable;
