"use client";

import { Message } from "ai";
import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription } from "./ui/card";

interface Props {
  message: Message;
  index?: number;
  len?: number;
}

const ChatMessage = ({ message, index, len }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView(true);
    }
  }, []);

  return (
    <Card
      ref={index == len ? scrollRef : null}
      className={` ${
        message.role == "user"
          ? "ml-auto "
          : "mr-auto border-none outline-none bg-blue-600/80 shadow-md shadow-blue-500"
      } p-4 max-w-[90%]`}
    >
      <CardDescription
        className={`font-medium ${
          message.role != "user" && "text-white"
        } text-base `}
      >
        {message.content}
      </CardDescription>
    </Card>
  );
};

export default ChatMessage;
