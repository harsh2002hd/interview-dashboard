# AI Interview Screener

A full-stack application for conducting AI-powered interview screening calls.

## Features

- Upload Job Description and auto-generate interview questions
- Upload candidate list via CSV
- Create and manage interview campaigns
- Conduct automated voice interviews using Text-to-Speech
- Record and transcribe candidate responses
- AI-powered analysis and scoring of responses
- Dashboard for viewing results and recommendations

## Technology Stack

### Backend
- Python with FastAPI
- OpenAI GPT-4 for question generation and response analysis
- Twilio for voice calls
- AWS Polly for Text-to-Speech
- AWS Transcribe for Speech-to-Text

### Frontend
- React with TypeScript
- Material-UI for components
- Axios for API calls
- React Router for navigation

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file with your API keys:
```
OPENAI_API_KEY=your_openai_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
```

5. Start the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. **Upload Job Description**
   - Navigate to the "Upload JD" page
   - Upload a job description file
   - Review auto-generated interview questions

2. **Upload Candidates**
   - Go to "Upload Candidates"
   - Upload a CSV file with candidate information

3. **Create Campaign**
   - Create a new campaign
   - Select questions and candidates
   - Start the interview process

4. **Monitor Results**
   - View the dashboard for interview results
   - Check candidate scores and recommendations

## API Endpoints

- `POST /upload-jd`: Upload job description and generate questions
- `POST /upload-candidates`: Upload candidate list
- `POST /create-campaign`: Create new interview campaign
- `POST /start-interview/{candidate_id}`: Start an interview call
- `POST /analyze-response`: Analyze interview responses

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
