import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const InterviewProcess = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [callStatus, setCallStatus] = useState('');

  const startCall = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:8000/start-interview/${id}`, {
        question: currentQuestion
      });
      setCallStatus('Call in progress...');
    } catch (error) {
      console.error('Error starting call:', error);
      setCallStatus('Call failed');
    } finally {
      setLoading(false);
    }
  };

  const analyzeResponse = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/analyze-response', {
        audio_url: 'sample_url',
        question: currentQuestion
      });
      // Handle analysis results
    } catch (error) {
      console.error('Error analyzing response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Interview Process
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">Current Question:</Typography>
          <Typography paragraph>{currentQuestion || 'No question selected'}</Typography>
          
          <Button 
            variant="contained" 
            onClick={startCall}
            disabled={loading || !currentQuestion}
          >
            Start Call
          </Button>
          
          {callStatus && (
            <Typography color="primary">
              {callStatus}
            </Typography>
          )}
          
          {loading && <CircularProgress />}
        </Box>
      </Paper>
    </Container>
  );
};

export default InterviewProcess;
