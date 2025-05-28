'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useChat } from '@/lib/useChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Stethoscope, Plus, Send, User, Bot, Home, Menu, X } from '@/components/ui/icons';

export default function MedicalChatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
      setTextareaHeight(`${newHeight}px`);
    }
  }, [input]);

  // Handle viewport resize due to virtual keyboard on mobile
  useEffect(() => {
    function handleResize() {
      // On iOS, viewport height changes when keyboard appears
      if (messageContainerRef.current) {
        const viewportHeight = window.innerHeight;
        const maxHeight = viewportHeight * (window.innerWidth < 640 ? 0.45 : 0.6);
        messageContainerRef.current.style.maxHeight = `${maxHeight}px`;
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    setIsTyping(true);
    handleSubmit(e).finally(() => {
      setIsTyping(false);
      // Focus back to textarea after sending message on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => textareaRef.current?.focus(), 100);
      }
    });
  };
  
  const handleKeyDown = (e) => {
    // If Shift+Enter is pressed, insert a new line
    if (e.key === 'Enter' && e.shiftKey) {
      return; // Default behavior - new line
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
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    // Focus on textarea
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100 relative z-10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-emerald-100 p-1.5 sm:p-2 rounded-full">
              <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">AI Medical Assistant</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Professional medical consultation</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
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
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 p-1"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full z-20">
            <div className="px-3 py-2 space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  startNewConsultation();
                  setMobileMenuOpen(false);
                }}
                className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 justify-start"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Consultation
              </Button>
              <Link href="/" className="w-full block" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full text-gray-600 hover:text-gray-900 justify-start">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-4 md:py-6">
        <Card className="bg-white shadow-md sm:shadow-lg border-0 rounded-lg sm:rounded-xl overflow-hidden">
          {/* Welcome Message - now hidden since we have initial greeting */}
          {messages.length === 0 && (
            <div className="p-3 sm:p-5 md:p-8 text-center border-b border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Stethoscope className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">Welcome to AI Medical Assistant</h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-md mx-auto">
                Describe your symptoms and I'll help provide medical guidance. Please remember that this is not a
                substitute for professional medical care.
              </p>
            </div>
          )}

          {/* Messages */}
          <div 
            ref={messageContainerRef}
            className="h-[45vh] xs:h-[50vh] sm:h-[60vh] md:h-[65vh] overflow-y-auto p-2 xs:p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 scroll-smooth"
            style={{scrollBehavior: 'smooth'}}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 sm:space-x-3 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar
                  className={`h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-blue-100 border-2 border-blue-200"
                      : "bg-emerald-100 border-2 border-emerald-200"
                  }`}
                >
                  <AvatarFallback>
                    {message.role === "user" ? (
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className={`flex-1 max-w-[80%] xs:max-w-[85%] sm:max-w-[90%] ${message.role === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-2 xs:p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-50 text-gray-900 rounded-bl-none border border-gray-200"
                    }`}
                  >
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</div>
                  </div>
                  <div className={`text-[9px] xs:text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 ${message.role === "user" ? "text-right" : "text-left"}`}>
                    {message.role === "user" ? "You" : "AI Medical Assistant"}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 bg-emerald-100 border-2 border-emerald-200 flex-shrink-0">
                  <AvatarFallback>
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl rounded-bl-none p-2 xs:p-2.5 sm:p-3 md:p-4">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Invisible element for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 p-2 xs:p-3 sm:p-4 md:p-6">
            <form onSubmit={onSubmit} className="flex space-x-2 sm:space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your symptoms in detail..."
                  style={{ height: textareaHeight }}
                  className="w-full pr-8 sm:pr-10 py-1.5 sm:py-2 md:py-3 px-2.5 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base border border-gray-200 rounded-md sm:rounded-lg focus:outline-none focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 resize-none min-h-[32px] sm:min-h-[40px] md:min-h-[60px]"
                  rows={1}
                  disabled={isTyping}
                  aria-label="Message input"
                />
              </div>
              <Button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-md sm:rounded-lg transition-colors self-end h-8 sm:h-10 w-8 sm:w-auto"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline ml-1">Send</span>
              </Button>
            </form>
            <p className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2 md:mt-3 text-center">
              Press Enter to send, Shift+Enter for a new line. This AI assistant provides general medical information. 
              Always consult healthcare professionals for serious symptoms.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
} 