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
  const [useStreaming, setUseStreaming] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [deviceSpecificHeight, setDeviceSpecificHeight] = useState('60vh');

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
  }, [messages, isTyping]);

  // Adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = window.innerWidth < 640 ? 100 : 200;
      const newHeight = Math.min(scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
      setTextareaHeight(`${newHeight}px`);
    }
  }, [input]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    if (!useStreaming) {
      setIsTyping(true);
      await handleSubmit(e);
      setIsTyping(false);
      if (window.innerWidth < 768) setTimeout(() => textareaRef.current?.focus(), 100);
      return;
    }

    // Streaming path
    setIsTyping(true);

    // Add user message immediately
    const userMessage = {
      id: Date.now().toString(36),
      role: 'user',
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Create an empty assistant message to append to
    const assistantId = `${Date.now().toString(36)}-ai`;
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    // Clear input
    const currentInput = input.trim();
    (document.activeElement)?.blur?.();

    try {
      const url = `${window.location.origin}/api/consult/stream`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
        cache: 'no-store'
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Server error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          const chunk = decoder.decode(value);
          setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: m.content + chunk } : m));
        }
      }
    } catch (err) {
      const message = err?.message || 'Streaming failed';
      setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: message } : m));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const startNewConsultation = () => {
    setMessages([]);
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
              <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">AI Medical Assistant</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Professional medical consultation</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setUseStreaming(!useStreaming)} className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
              {useStreaming ? 'Streaming: On' : 'Streaming: Off'}
            </Button>
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
                <Avatar className={`h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 flex-shrink-0 ${message.role === 'user' ? 'bg-blue-100 border-2 border-blue-200' : 'bg-emerald-100 border-2 border-emerald-200'}`}>
                  <AvatarFallback className="flex items-center justify-center">
                    {message.role === 'user' ? (
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 max-w-[80%] xs:max-w-[85%] sm:max-w-[90%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 xs:p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl ${message.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-50 text-gray-900 rounded-bl-none border border-gray-200'}`}>
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</div>
                  </div>
                  <div className={`text-[9px] xs:text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>{message.role === 'user' ? 'You' : 'AI Medical Assistant'}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 p-2 xs:p-3 sm:p-4 md:p-6 flex-shrink-0">
            <form onSubmit={onSubmit} className="flex space-x-2 sm:space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your symptoms in detail..."
                  style={{ height: textareaHeight }}
                  className="w-full pr-8 sm:pr-10 py-1.5 sm:py-2 md:py-3 px-2.5 sm:px-3 md:px-4 text-xs sm:text-sm md:text-base border border-gray-200 rounded-md sm:rounded-lg focus:outline-none focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 resize-none min-h-[32px] sm:min-h-[40px] md:min-h-[48px]"
                  rows={1}
                  disabled={isTyping}
                  aria-label="Message input"
                />
              </div>
              <Button type="submit" disabled={isTyping || !input.trim()} className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-md sm:rounded-lg transition-colors self-end h-8 sm:h-10 w-8 sm:w-auto flex-shrink-0 flex items-center justify-center" aria-label="Send message">
                <Send className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-white" />
                <span className="hidden sm:inline ml-1">Send</span>
              </Button>
            </form>
            <div className="text-[10px] sm:text-xs text-gray-500 mt-2 text-center">Streaming: {useStreaming ? 'On' : 'Off'}</div>

            {/* Recommendations */}
            <div className="mt-3 sm:mt-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Quick recommendations</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
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
                      // Simulate user typing the suggestion and submit
                      const fakeEvent = { preventDefault: () => {} };
                      textareaRef.current && (textareaRef.current.value = item.t);
                      // set state and call submit (handles streaming if enabled)
                      const inputEvent = { target: { value: item.t } };
                      handleInputChange(inputEvent);
                      onSubmit(fakeEvent);
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