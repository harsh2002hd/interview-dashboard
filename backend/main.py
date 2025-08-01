from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import openai
import os
from dotenv import load_dotenv
from twilio.rest import Client
import boto3
import json

load_dotenv()

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize Twilio
twilio_client = Client(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)

# Initialize AWS
aws_session = boto3.Session(
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)
s3_client = aws_session.client('s3')
polly_client = aws_session.client('polly')
transcribe_client = aws_session.client('transcribe')

class Campaign(BaseModel):
    name: str
    description: Optional[str] = None
    candidates: List[dict]
    questions: List[str]

@app.post("/upload-jd")
async def upload_jd(file: UploadFile = File(...)):
    content = await file.read()
    job_description = content.decode()
    
    # Generate interview questions using OpenAI
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Generate 5 relevant technical interview questions based on this job description."},
            {"role": "user", "content": job_description}
        ]
    )
    
    questions = response.choices[0].message.content.split("\n")
    return {"questions": questions}

@app.post("/upload-candidates")
async def upload_candidates(file: UploadFile = File(...)):
    content = await file.read()
    df = pd.read_csv(content)
    candidates = df.to_dict('records')
    return {"candidates": candidates}

@app.post("/create-campaign")
async def create_campaign(campaign: Campaign):
    # Store campaign details in database/storage
    # For MVP, we'll return the campaign data directly
    return campaign

@app.post("/start-interview/{candidate_id}")
async def start_interview(candidate_id: str, question: str):
    # Convert question to speech using AWS Polly
    response = polly_client.synthesize_speech(
        Text=question,
        OutputFormat='mp3',
        VoiceId='Joanna'
    )
    
    # Make Twilio call
    call = twilio_client.calls.create(
        twiml=f'<Response><Say>{question}</Say><Record maxLength="300" transcribe="true"/></Response>',
        to='+1234567890',  # Replace with candidate's number
        from_=os.getenv("TWILIO_PHONE_NUMBER")
    )
    
    return {"call_id": call.sid}

@app.post("/analyze-response")
async def analyze_response(audio_url: str, question: str):
    # Analyze the response using OpenAI
    # First, get transcription from audio
    transcript = "Sample transcript"  # Replace with actual transcription
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Analyze this interview response and score it on: communication (1-10), technical knowledge (1-10), and provide an overall recommendation (select/reject)."},
            {"role": "user", "content": f"Question: {question}\nAnswer: {transcript}"}
        ]
    )
    
    return {"analysis": response.choices[0].message.content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
