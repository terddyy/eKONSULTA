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
				// Build absolute URL from current origin to avoid basePath/assetPrefix issues
				const url = `${window.location.origin}/api/consult`;
				const response = await fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ messages: [...messages, userMessage] }),
					cache: 'no-store'
				});

				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}));
					console.error('API Error:', response.status, errorData);
					const serverMessage = errorData?.error || errorData?.message || `Server error: ${response.status}`;
					throw new Error(serverMessage);
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
				// Display actual server error message instead of hardcoded fallback
				const messageFromError = (error && error.message) ? error.message : 'An unexpected error occurred';
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
	};
} 