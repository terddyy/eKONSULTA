import React from 'react';

/**
 * Component to display a typing indicator when the AI is generating a response
 */
const TypingIndicator = () => {
  return (
    <div className="flex justify-start w-full mb-4">
      <div className="bg-white text-gray-800 px-4 py-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%]">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator; 