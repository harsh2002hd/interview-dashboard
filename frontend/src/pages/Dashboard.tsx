import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CircularProgress, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import '@mui/x-data-grid/themeAugmentation';

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  score: number;
  recommendation: string;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get('http://localhost:8000/candidates');
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      // Add some sample data for testing
      setCandidates([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          status: 'Pending',
          score: 0,
          recommendation: 'Not interviewed'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'score', headerName: 'Score', width: 100 },
    { field: 'recommendation', headerName: 'Recommendation', width: 150 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Interview Dashboard
        </Typography>
        <Button variant="contained" color="primary" onClick={fetchCandidates}>
          Refresh Data
        </Button>
      </Box>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography>
              Total Candidates: {candidates.length}
            </Typography>
            <Typography>
              Pending Interviews: {candidates.filter(c => c.status === 'Pending').length}
            </Typography>
            <Typography>
              Completed: {candidates.filter(c => c.status === 'Completed').length}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ height: 400, width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={candidates}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: 1,
              borderColor: 'divider',
              '& .MuiDataGrid-cell': {
                borderBottom: 1,
                borderColor: 'divider',
              },
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: 2,
                borderColor: 'divider',
              },
              backgroundColor: 'background.paper',
            }}
          />
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
