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
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, setInput } = useChat();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [deviceSpecificHeight, setDeviceSpecificHeight] = useState('60vh');

  // Helper function to render content with clickable links
  const renderContentWithLinks = (text) => {
    const urlRegex = /(\bhttps?:\/\/[^\s]+\b)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // Detect device dimensions and set appropriate heights
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewportHeight(height);
      
      if (width === 1080 && height <= 2400 && height >= 2000) {
        setDeviceSpecificHeight('55vh');
      } else if (height > width * 2) {
        setDeviceSpecificHeight('50vh');
      } else if (width < 640) {
        setDeviceSpecificHeight('42vh');
      } else if (width < 768) {
        setDeviceSpecificHeight('48vh');
      } else if (width < 1024) {
        setDeviceSpecificHeight('55vh');
      } else {
        setDeviceSpecificHeight('60vh');
      }
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Removed auto-resize behavior to keep the prompt box at a fixed height

  // Remove local onSubmit as useChat now handles submission and streaming
  // const onSubmit = async (e) => { /* ... existing code ... */ };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e); // Use handleSubmit from useChat
    }
  };

  const startNewConsultation = () => {
    setMessages([]);
    setInput(''); // Clear input on new consultation
    if (mobileMenuOpen) setMobileMenuOpen(false);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-10 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-emerald-100 p-1.5 sm:p-2 rounded-full flex items-center justify-center">
              <img src="/logo.png" alt="AI Medical Assistant Logo" className="h-9 w-9 sm:h-10 sm:w-10 object-contain" />
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
              <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="whitespace-nowrap">New Consultation</span>
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Home className="h-4 w-4 mr-2 flex-shrink-0" />
                Home
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 p-1 touch-target"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-4 md:py-6 overflow-x-hidden flex-grow flex flex-col w-full">
        <Card className="bg-white shadow-md sm:shadow-lg border-0 rounded-lg sm:rounded-xl overflow-hidden flex flex-col flex-grow">
          {/* Messages */}
          <div 
            ref={messageContainerRef}
            style={{
              height: messages.length === 0 ? 'auto' : deviceSpecificHeight,
              overflowY: 'auto',
              scrollBehavior: 'smooth'
            }}
            className="p-2 xs:p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 flex-grow"
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start space-x-2 sm:space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex-shrink-0 ${message.role === 'user' ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                  <AvatarFallback className="flex items-center justify-center">
                    {message.role === 'user' ? (
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    ) : (
                      <img src="/logo.png" alt="AI Medical Assistant Avatar" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 max-w-[80%] xs:max-w-[85%] sm:max-w-[90%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 xs:p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl ${message.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-50 text-gray-900 rounded-bl-none border border-gray-200'}`}>
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{renderContentWithLinks(message.content)}</div>
                  </div>
                  <div className={`text-[9px] xs:text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>{message.role === 'user' ? 'You' : 'AI Medical Assistant'}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 p-2 xs:p-3 sm:p-4 md:p-6 flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex space-x-2 sm:space-x-3 items-center">
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your symptoms in detail..."
                  className="w-full px-3 sm:px-4 text-sm sm:text-base border border-gray-200 rounded-md sm:rounded-lg focus:outline-none focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 resize-none h-11 sm:h-12 md:h-12 overflow-y-hidden leading-[2.75rem] sm:leading-[3rem]"
                  rows={1}
                  disabled={isLoading}
                  aria-label="Message input"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="h-11 w-11 sm:h-12 sm:w-12 p-0 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md sm:rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-colors flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </Button>
            </form>

            {/* Recommendations */}
            <div className="mt-3 sm:mt-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Quick recommendations</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 overflow-y-auto max-h-28 sm:max-h-40 md:max-h-48 pr-1">
                {[
                  { t: 'I have a headache' },
                  { t: 'I have stomach pain' },
                  { t: 'I have a fever' },
                  { t: 'I have a sore throat' },
                  { t: 'I have back pain' },
                  { t: "I'm having chest pain" },
                  { t: 'I feel dizzy' },
                  { t: "I can't breathe properly" },
                  { t: "I'm having severe abdominal pain" },
                  { t: 'I feel anxious' },
                  { t: 'I have trouble sleeping' },
                  { t: 'I need medication advice' },
                  { t: 'I want to check my symptoms' },
                  { t: 'I have a rash' },
                  { t: 'I injured myself' },
                  { t: "I'm feeling nauseous" },
                  { t: 'I have eye problems' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="text-left bg-white border border-emerald-100 hover:border-emerald-200 hover:shadow-sm transition-all rounded-md sm:rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 text-[11px] sm:text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    aria-label={`Start: ${item.t}`}
                    onClick={() => {
                      const fakeEvent = { preventDefault: () => {} };
                      textareaRef.current && (textareaRef.current.value = item.t);
                      const inputEvent = { target: { value: item.t } };
                      handleInputChange(inputEvent);
                      handleSubmit(fakeEvent); // Use handleSubmit from useChat
                    }}
                  >
                    {item.t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 