"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { AudioWaveform, Mic, Pause, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  recordingCompleted: (input: string) => void;
};

const tsc = `
You are a friendly, helpful, and knowledgeable chatbot designed to assist users in a conversational manner. When responding:\n
Tone: Use a warm and welcoming tone. Your voice should be clear, friendly, and approachable.\n
Language: Keep your language simple, concise, and easy to understand. Avoid jargon unless necessary, and if you do use it, provide a brief explanation.\n
Context Awareness: Tailor your responses to the user's input. If the user asks a question, provide a direct answer. If the user makes a statement, acknowledge it and engage in a relevant follow-up.\n
Clarification: If a user's question or statement is unclear, politely ask for clarification. For example, 'Could you please clarify what you mean by...?'\n
Encouragement: Encourage the user to continue the conversation by asking relevant follow-up questions or offering additional information.\n
Engagement: Vary your responses to maintain engagement. Use different sentence structures and introduce small variations in your phrasing to keep the conversation natural.\n
Politeness: Always be polite and respectful, even if the user is not. Stay calm and composed, redirecting any negative interactions in a positive direction.\n
Ending Conversations: When concluding a conversation, do so politely and offer further assistance. For example, "Is there anything else I can help you with today?"\n
Examples:\n
Greeting: "Hi there! How can I assist you today?"\n
Question Response: "Sure, I can help with that! What specific information are you looking for?"\n
Clarification: "I'm not quite sure I understand. Could you please clarify?"\n
Engagement: "That's interesting! Can you tell me more about that?"\n
Always aim to make the conversation feel natural and enjoyable for the user.
`;

const Recorder = ({ recordingCompleted }: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingComplete, setIsRecordingComplete] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [fullTranscript, setFullTranscript] = useState("");

  const recordRef = useRef<any | null>(null);

  useEffect(() => {
    if (recordRef.current) {
      recordRef.current.stop();
      stopRecording();
    }
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setIsRecordingComplete(false);
    recordRef.current = new window.webkitSpeechRecognition();
    recordRef.current.continuous = true;
    recordRef.current.interimResults = true;

    recordRef.current.onresult = (e: any) => {
      let interimTranscript = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          setFullTranscript((prev) => prev + e.results[i][0].transcript);
        } else {
          interimTranscript += e.results[i][0].transcript;
        }
      }
      setTranscript(interimTranscript);
    };

    recordRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsRecordingComplete(true);
    setTranscript("");
  };

  const toggleRecording = () => {
    if (!recordRef.current) return;
    if (isRecording) {
      recordRef.current.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      recordRef.current.start();
    }
  };

  const handleRecordingComplete = () => {
    if (!recordRef.current) return;

    recordRef.current.stop();

    console.log("FTSC = ", fullTranscript);

    // Handle the final transcript with all recognized speech
    if (fullTranscript) {
      recordingCompleted(fullTranscript);
      setFullTranscript("");
    }

    stopRecording();
  };

  return (
    <div className="text-center flex flex-row justify-center items-center gap-2">
      <Card className="p-2 scroll-smooth max-w-full text-nowrap overflow-x-scroll w-[350px]">
        <CardDescription className="w-full">
          {!isRecording && isRecordingComplete
            ? "Talk with your friendly AI"
            : transcript
            ? transcript
            : "Listening..."}
        </CardDescription>
      </Card>
      <div className="text-center flex flex-row gap-2 justify-center items-center">
        {!isRecording && isRecordingComplete ? (
          <>
            <Button
              onClick={startRecording}
              className="bg-black flex flex-col text-white relative w-[40px] h-[40px] shadow-sm rounded-full"
            >
              <Mic
                size={25}
                className={`${isRecording ? "opacity-0" : "opacity-100"}`}
              />
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleRecordingComplete}
              className="flex flex-col text-white w-[40px] h-[40px] shadow-sm rounded-full"
            >
              <AudioWaveform
                size={25}
                className={` ${
                  !isRecordingComplete ? "opacity-100 " : "opacity-0"
                } ${isRecording ? "animate-pulse" : ""}`}
              />
              {/* <span>Stop</span> */}
            </Button>
            <Button className="relative" onClick={toggleRecording}>
              <Play
                size={25}
                className={` ${
                  isRecording ? "opacity-0" : "opacity-100"
                } transition-all`}
              />
              <Pause
                size={25}
                className={` ${
                  isRecording ? "opacity-100" : "opacity-0"
                } absolute transition-all`}
              />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Recorder;
