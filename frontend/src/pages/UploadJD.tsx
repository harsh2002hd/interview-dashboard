import { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Paper } from '@mui/material';
import axios from 'axios';

const UploadJD = () => {
  const [file, setFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8000/upload-jd', formData);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error uploading JD:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upload Job Description
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Button variant="contained" component="label">
          Upload JD
          <input type="file" hidden onChange={handleFileUpload} accept=".txt,.pdf,.doc,.docx" />
        </Button>
        {file && <Typography sx={{ mt: 2 }}>Selected file: {file.name}</Typography>}
      </Paper>

      {questions.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Interview Questions
          </Typography>
          <Box>
            {questions.map((question, index) => (
              <Typography key={index} paragraph>
                {index + 1}. {question}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default UploadJD;
