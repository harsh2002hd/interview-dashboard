import { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import axios from 'axios';

const CandidateUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8000/upload-candidates', formData);
        setCandidates(response.data.candidates);
      } catch (error) {
        console.error('Error uploading candidates:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upload Candidates
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Button variant="contained" component="label">
          Upload CSV
          <input type="file" hidden onChange={handleFileUpload} accept=".csv" />
        </Button>
        {file && <Typography sx={{ mt: 2 }}>Selected file: {file.name}</Typography>}
      </Paper>

      {candidates.length > 0 && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Uploaded Candidates
          </Typography>
          <Box>
            {candidates.map((candidate, index) => (
              <Typography key={index} paragraph>
                {candidate.name} - {candidate.email}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default CandidateUpload;
