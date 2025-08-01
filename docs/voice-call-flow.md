# Voice Call Flow Documentation

## Overview

The AI Interview Screener uses Twilio for voice calls and AWS services for text-to-speech and speech-to-text functionality. Here's how the voice call flow works:

1. **Initiating the Call**
   - When an interview starts, the backend creates a Twilio call to the candidate
   - AWS Polly converts the question text to speech
   - Twilio plays the synthesized speech to the candidate

2. **Recording the Response**
   - Twilio records the candidate's response
   - The recording is saved and uploaded to AWS S3
   - AWS Transcribe converts the recording to text

3. **Analysis**
   - The transcribed text is sent to OpenAI's GPT-4
   - GPT-4 analyzes the response based on:
     - Technical accuracy
     - Communication clarity
     - Relevance to the question
   - A score and recommendation are generated

## Technical Implementation

### AWS Services Setup

1. **AWS Polly Configuration**
```python
polly_client = boto3.client('polly')
response = polly_client.synthesize_speech(
    Text=question,
    OutputFormat='mp3',
    VoiceId='Joanna'
)
```

2. **AWS Transcribe Setup**
```python
transcribe_client = boto3.client('transcribe')
response = transcribe_client.start_transcription_job(
    TranscriptionJobName=job_name,
    Media={'MediaFileUri': s3_uri},
    MediaFormat='mp3',
    LanguageCode='en-US'
)
```

### Twilio Integration

1. **TwiML for Voice Calls**
```xml
<Response>
    <Say>Hello, this is the AI Interview Screener</Say>
    <Play>https://your-audio-url.mp3</Play>
    <Record maxLength="300" transcribe="true"/>
</Response>
```

2. **Handling Recordings**
```python
@app.post("/recording-callback")
async def handle_recording(recording_url: str):
    # Download recording
    # Upload to S3
    # Start transcription
    # Trigger analysis
```

### Security Considerations

1. All API endpoints are secured with proper authentication
2. Voice calls are verified using Twilio's signature validation
3. AWS resources are accessed using IAM roles with minimal permissions
4. All sensitive data is encrypted at rest and in transit

## Error Handling

1. **Call Failures**
   - Retry logic for failed calls
   - Notification system for persistent failures
   - Automatic rescheduling if needed

2. **Recording Issues**
   - Quality checks on recordings
   - Fallback to text-based interview if voice fails
   - Manual review triggers for low-quality recordings

3. **Analysis Failures**
   - Multiple retry attempts for transcription
   - Fallback to simpler analysis if GPT-4 fails
   - Manual review option for edge cases
