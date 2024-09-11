# Interview Bot 🤖🎤

This is a **voice-powered chatbot** designed to conduct mock interviews using voice input and responses. Built using **Next.js**, **Deepgram**, **WebSpeechRecognition**, and **OpenAI**, this application creates a conversational AI that simulates real-world interviews. Users can practice answering questions in a dynamic and interactive environment.

## Features 🌟

- **🎙️ Voice Input:** Users respond to interview questions using their voice for a hands-on experience.
- **🗣️ Voice Output:** The bot listens to your responses and gives feedback or follow-up questions with synthesized speech.
- **🤖 AI-Powered Conversations:** Leverages OpenAI's language models to generate intelligent interview questions and real-time feedback.
- **⚡ Real-time Processing:** Fast and responsive voice-to-voice interaction with the **Vercel AI SDK** for quick and efficient query handling.
- **📈 Interview Feedback:** Provides personalized feedback on your answers to help improve performance.
- **🔄 Custom Interview Modes:** Choose from various interview types—behavioral, technical, or situational—to tailor your practice sessions.

## Technologies Used 💻

- **[Next.js](https://nextjs.org/):** A React framework for building the front-end and handling server-side logic.
- **[Deepgram](https://deepgram.com/):** Converts voice responses into natural-sounding speech for both questions and feedback.
- **[WebSpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API):** Real-time speech-to-text conversion for user input.
- **[OpenAI](https://openai.com/):** Powers the AI-driven interview questions and conversation flow.
- **[Vercel AI SDK](https://vercel.com/):** Seamlessly integrates OpenAI with the application for efficient query handling.

## Getting Started 🚀

### Prerequisites ✅

Ensure the following are installed on your local machine:

- **Node.js** (v14.x or higher)
- **npm** or **yarn**
- **Deepgram API key**
- **OpenAI API key**
- **Vercel account** (optional, for deployment)

### Installation Steps 🛠️

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/interview-bot.git
   cd interview-bot
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the project root with the following:

   ```bash
   DEEPGRAM_API_KEY=your_deepgram_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) in your browser to access the bot.

### Usage 🛠️

- **🎤 Voice Input:** Click the microphone button to begin answering questions. The **WebSpeechRecognition** API converts your spoken input into text.
- **🗣️ Voice Output:** The bot generates interview questions using **OpenAI** and provides voice feedback via **Deepgram**.
- **📑 Review Responses:** Review the transcript of your interview and receive feedback on areas to improve.

### Deployment on Vercel 🚀

1. Push your project to GitHub (or your preferred git repository).
2. Log in to **Vercel**, import your repository, and set up environment variables.
3. Deploy directly from the Vercel dashboard, and your Interview Bot will be live!

### Customization 🎨

- **Interview Types:** Modify the interview question types (behavioral, technical, etc.) using OpenAI prompt settings.
- **Conversation Flow:** Customize feedback, follow-up questions, or the tone of the interview to fit various levels of difficulty.

### Acknowledgements 🙌

- **Deepgram** for powerful speech-to-text and text-to-speech services.
- **OpenAI** for enabling AI-powered natural language conversations.
- **Vercel** for seamless deployment and performance optimization.

---

With **Interview Bot**, mastering interviews is just a conversation away! Get real-time feedback, practice in a simulated environment, and sharpen your skills with voice-driven, AI-powered interactions. 🎯
