import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const uploadJD = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/upload-jd`, formData);
  return response.data;
};

export const uploadCandidates = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/upload-candidates`, formData);
  return response.data;
};

export const createCampaign = async (campaignData: any) => {
  const response = await axios.post(`${API_URL}/create-campaign`, campaignData);
  return response.data;
};

export const startInterview = async (candidateId: string, question: string) => {
  const response = await axios.post(`${API_URL}/start-interview/${candidateId}`, {
    question,
  });
  return response.data;
};

export const analyzeResponse = async (audioUrl: string, question: string) => {
  const response = await axios.post(`${API_URL}/analyze-response`, {
    audio_url: audioUrl,
    question,
  });
  return response.data;
};
