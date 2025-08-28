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
				content: input.trim(),
			};

			// Add user message immediately and clear input
			setMessages((prev) => [...prev, userMessage]);
			setInput('');
			setIsLoading(true);

			// Create an empty assistant message to append to
			const assistantId = generateId();
			setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

			try {
				console.log('Sending streaming request to API...');
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
			} catch (error) {
				console.error('Error getting AI response:', error);
				const messageFromError = `Apologies, the AI Medical Assistant is currently experiencing technical difficulties. Please try again later. If the issue persists, please contact support at terd.zentariph.com for assistance.`;
				const errorMessage = {
					id: generateId(),
					role: 'assistant',
					content: messageFromError,
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
		setInput, // Export setInput for direct manipulation if needed
	};
} 