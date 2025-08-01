import { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    candidates: [],
    questions: []
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/create-campaign', campaignData);
      navigate('/');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Interview Campaign
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Campaign Name"
            value={campaignData.name}
            onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            value={campaignData.description}
            onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
            multiline
            rows={4}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            Create Campaign
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateCampaign;
