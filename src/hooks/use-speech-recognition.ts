"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface SpeechRecognitionHook {
  text: string;
  isListening: boolean;
  start: () => void;
  stop: () => void;
  hasSupport: boolean;
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setText(spokenText);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
        console.warn("Speech recognition not supported in this browser.");
    }
    
    return () => {
        if(recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }
  }, []);

  const start = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        setText("");
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
      }
    }
  }, [isListening]);

  const stop = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error("Error stopping speech recognition:", error);
      } finally {
        setIsListening(false);
      }
    }
  }, [isListening]);

  return {
    text,
    isListening,
    start,
    stop,
    hasSupport: !!recognitionRef.current,
  };
}
