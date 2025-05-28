'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useChat } from '@/lib/useChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Stethoscope, Plus, Send, User, Bot, Home } from '@/components/ui/icons';

export default function MedicalChatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);

  const onSubmit = (e) => {
    setIsTyping(true);
    handleSubmit(e).finally(() => setIsTyping(false));
  };
  
  const handleKeyDown = (e) => {
    // If Shift+Enter is pressed, insert a new line
    if (e.key === 'Enter' && e.shiftKey) {
      // Do nothing, let the default behavior add a new line
      return;
    }
    
    // If only Enter is pressed, submit the form
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const startNewConsultation = () => {
    // Clear messages first
    setMessages([]);
    
    // The initial greeting will be added automatically via useEffect in useChat.js
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 p-2 rounded-full">
              <Stethoscope className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Medical Assistant</h1>
              <p className="text-sm text-gray-600">Professional medical consultation</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={startNewConsultation}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Consultation
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
          {/* Welcome Message - now hidden since we have initial greeting */}
          {messages.length === 0 && (
            <div className="p-8 text-center border-b border-gray-100">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to AI Medical Assistant</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Describe your symptoms and I'll help provide medical guidance. Please remember that this is not a
                substitute for professional medical care.
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar
                  className={`${
                    message.role === "user"
                      ? "bg-blue-100 border-2 border-blue-200"
                      : "bg-emerald-100 border-2 border-emerald-200"
                  }`}
                >
                  <AvatarFallback>
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-emerald-600" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className={`flex-1 max-w-3xl ${message.role === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-gray-50 text-gray-900 rounded-bl-md border border-gray-200"
                    }`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${message.role === "user" ? "text-right" : "text-left"}`}>
                    {message.role === "user" ? "You" : "AI Medical Assistant"}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <Avatar className="bg-emerald-100 border-2 border-emerald-200">
                  <AvatarFallback>
                    <Bot className="h-4 w-4 text-emerald-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 p-6">
            <form onSubmit={onSubmit} className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your symptoms in detail..."
                  className="w-full pr-12 py-3 px-4 text-base border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 resize-none min-h-[60px]"
                  rows={3}
                  disabled={isTyping}
                />
              </div>
              <Button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Press Enter to send, Shift+Enter for a new line. This AI assistant provides general medical information. 
              Always consult healthcare professionals for serious symptoms.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
} 