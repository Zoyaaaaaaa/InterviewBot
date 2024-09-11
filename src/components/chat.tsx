'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from "ai/react";
import Recorder from "./recorder";
import { Button } from "@/components/ui/button";
import { Send, Camera, Mic } from "lucide-react";

const Chat = () => {
  const [isCameraSharing, setIsCameraSharing] = useState(false);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { messages, handleSubmit, setInput, input } = useChat({
    async onFinish(message) {
      if (message.role !== "user") {
        await handleTextToVoice(message.content);
      }
    },
  });

  const handleTextToVoice = async (content: string) => {
    if (process.env.NEXT_PUBLIC_MODE === "UI") return;
    setIsInterviewerSpeaking(true);
    try {
      const response = await fetch("/api/deepgram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) throw Error("Deepgram error");
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setIsInterviewerSpeaking(false);
      };
    } catch (error) {
      console.error(error);
      setIsInterviewerSpeaking(false);
    }
  };

  const handleCameraSharing = async () => {
    if (isCameraSharing) {
      stopCameraSharing();
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(newStream);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
        setIsCameraSharing(true);
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    }
  };

  const stopCameraSharing = () => {
    stream?.getTracks().forEach(track => track.stop());
    setIsCameraSharing(false);
    setStream(null);
  };

  useEffect(() => {
    if (input) {
      if (process.env.NEXT_PUBLIC_MODE === "UI") return;
      handleSubmit();
    }
  }, [input, handleSubmit]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-900 to-indigo-950 text-white">
      <div className="w-1/2 flex flex-col items-center justify-center p-8 border-r border-blue-800">
        <div className="w-full max-w-md relative">
          {isCameraSharing ? (
            <video
              ref={videoRef}
              autoPlay
              className="w-full h-auto rounded-2xl shadow-lg border-4 border-blue-600"
            />
          ) : (
            <div className="aspect-video bg-blue-950 rounded-2xl flex items-center justify-center">
              <p className="text-lg text-center px-4">Your video will appear here</p>
            </div>
          )}
          <Button
            onClick={handleCameraSharing}
            className="absolute bottom-4 right-4 bg-blue-700 hover:bg-blue-800 text-white rounded-full p-3 transition-colors duration-200"
          >
            <Camera size={24} />
          </Button>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-between p-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-blue-200">Interviewer</h2>
            {isInterviewerSpeaking && (
              <div className="animate-pulse">
                <Mic size={64} className="mx-auto text-blue-400" />
                <p className="mt-4 text-xl text-blue-300">Speaking...</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Recorder
            recordingCompleted={(input) => {
              setInput(input);
            }}
          />
          {/* <Button
            onClick={() => setInput("Test input")}
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <Send size={20} />
            <span className="text-lg">Send</span>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;