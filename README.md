# Voice Conversational AI

This is a voice-to-voice chatbot built using Next.js, Deepgram, WebSpeechRecognition, and OpenAI. The application allows users to interact with the AI using voice commands and receive voice responses, creating a seamless conversational experience.

## Features

- **Voice Input:** Users can interact with the AI using voice commands.
- **Voice Output:** The AI responds to queries with synthesized speech.
- **Natural Language Understanding:** Leverages OpenAI's language models for understanding and generating human-like responses.
- **Real-time Processing:** Quick response time using the Vercel AI SDK for efficient query processing.

## Technologies Used

- **[Next.js](https://nextjs.org/):** React framework used for building the front-end and server-side logic.
- **[Deepgram](https://deepgram.com/):** API used for converting text to high-quality, natural-sounding speech.
- **[WebSpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API):** Browser-based API used for real-time speech-to-text conversion.
- **[OpenAI](https://openai.com/):** Utilized for generating responses based on the user's voice input.
- **[Vercel AI SDK](https://vercel.com/):** Provides a seamless way to integrate OpenAI into the Next.js application.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v14.x or higher)
- npm or yarn
- A Deepgram API key
- An OpenAI API key
- A Vercel account (for deployment, optional)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/voice-conversational-ai.git
   cd voice-conversational-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of your project and add your API keys:

   ```bash
   DEEPGRAM_API_KEY=your_deepgram_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Usage

- **Voice Input:** Click the microphone button to start speaking. The WebSpeechRecognition API will transcribe your voice input to text.
- **Voice Output:** The transcribed text is sent to OpenAI, and the AI's response is then converted to speech using Deepgram, which is played back to the user.

### Deployment

To deploy the application on Vercel:

1. Push your code to GitHub (or any other git hosting).
2. Sign in to Vercel and select your GitHub repository.
3. Set up your environment variables in the Vercel dashboard.
4. Deploy the project directly from the Vercel dashboard.

### Acknowledgements

- **Deepgram** for their powerful text-to-speech API.
- **OpenAI** for providing the natural language processing capabilities.
- **Vercel** for hosting and deployment services.