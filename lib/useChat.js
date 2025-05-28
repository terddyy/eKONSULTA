'use client';

import { useState, useCallback, useEffect } from 'react';

// Generate a unique ID without requiring uuid
function generateId() {
  try {
    // Try to use uuid if available
    const { v4: uuidv4 } = require('uuid');
    return uuidv4();
  } catch (error) {
    // Fallback to simple ID generation
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Add initial greeting message when component mounts
  useEffect(() => {
    // Only add initial message if there are no messages yet
    if (messages.length === 0) {
      const initialGreeting = {
        id: generateId(),
        role: 'assistant',
        content: "Hello! I'm here to help with your health concerns. What symptoms are you experiencing?"
      };
      setMessages([initialGreeting]);
    }
  }, []);

  // Handle input changes with support for multiline text
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!input.trim() || isLoading) {
        return;
      }

      const userMessage = {
        id: generateId(),
        role: 'user',
        content: input.trim(), // Preserve line breaks in the content
      };

      // Add user message to state
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        console.log('Sending request to API...');
        // Send messages to API
        const response = await fetch('/api/consult', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', response.status, errorData);
          throw new Error(`Server error: ${response.status} ${errorData.error || ''}`);
        }

        const data = await response.json();

        // Check if response contains expected data
        if (!data || typeof data.response !== 'string') {
          console.error('Invalid response data:', data);
          throw new Error('Invalid response format');
        }

        // Add AI response to state
        const aiMessage = {
          id: generateId(),
          role: 'assistant',
          content: data.response,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        
        // Add more descriptive error message
        const errorMessage = {
          id: generateId(),
          role: 'assistant',
          content: `I'm sorry, I encountered an error: ${error.message || 'Unknown error'}. Please try again.`,
        };
        
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, messages, isLoading]
  );

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  };
} 