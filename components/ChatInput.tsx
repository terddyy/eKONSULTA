import React, { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

/**
 * Chat input component that handles user message input and submission
 */
const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter key (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid new line
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="border-t border-gray-200 bg-white p-4 rounded-b-lg">
      <div className="flex items-end space-x-2">
        <textarea
          ref={textareaRef}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          placeholder="Describe your symptoms..."
          rows={2}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          className={`px-4 py-2 rounded-md bg-accent text-white font-medium ${
            isLoading || !message.trim() 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-opacity-90'
          }`}
          onClick={handleSendMessage}
          disabled={isLoading || !message.trim()}
        >
          Send
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Press Enter to send, Shift+Enter for a new line
      </p>
    </div>
  );
};

export default ChatInput; 