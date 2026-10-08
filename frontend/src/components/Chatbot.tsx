import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { sendChatMessage } from '../api/chat';
import type { ChatMessage } from '../types';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  externalQuery?: string;
  onClearExternalQuery?: () => void;
}

const createWelcomeMessage = (): ChatMessage => ({
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm Mandeep's AI assistant. Ask me about his projects, skills, education, interests, or experience.",
  timestamp: new Date(),
});

const SUGGESTED_PROMPTS = [
  "What are Mandeep's main areas of interest?",
  'Tell me about the Dataset Intelligence Copilot project.',
  "What generative AI skills does Mandeep have?",
  'What awards and hackathons has Mandeep won?',
];

export const Chatbot: React.FC<ChatbotProps> = ({
  isOpen,
  onClose,
  onOpen,
  externalQuery,
  onClearExternalQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    createWelcomeMessage(),
  ]);

  /*
   * Conversation state intentionally exists only in React state.
   *
   * New page/session:
   *   conversationId = null
   *
   * First message:
   *   backend creates a conversation and returns conversationId
   *
   * Following messages:
   *   conversationId is sent inside the JSON request body
   *
   * New Chat:
   *   conversationId is cleared
   */
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    scrollToBottom();

    if (window.innerWidth >= 640) {
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  /*
   * Handle questions triggered externally,
   * for example from a project card.
   */
  useEffect(() => {
    if (!externalQuery || !externalQuery.trim()) {
      return;
    }

    onOpen();

    void handleSend(externalQuery);

    onClearExternalQuery?.();
  }, [externalQuery]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (
      queryText !== undefined ? queryText : input
    ).trim();

    if (!textToSend || isLoading) {
      return;
    }

    setError(null);
    setInput('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      /*
       * IMPORTANT:
       *
       * conversationId is passed to sendChatMessage().
       *
       * api/chat.ts places it inside:
       *
       * {
       *   conversationId: "...",
       *   query: "..."
       * }
       *
       * It is NOT sent as a URL parameter or header.
       */
      const data = await sendChatMessage(
        textToSend,
        conversationId || undefined
      );

      /*
       * First request:
       * conversationId was null.
       *
       * Backend creates a conversation and returns its ID.
       *
       * Subsequent requests use this ID.
       */
      if (data?.conversationId) {
        setConversationId(data.conversationId);
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          data.answer ||
          "I don't have that information in Mandeep's portfolio.",
        timestamp: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch {
      const fallbackErrorMessage =
        "Sorry, I couldn't connect to the AI assistant. Please try again.";

      setError(fallbackErrorMessage);

      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: fallbackErrorMessage,
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleNewChat = () => {
    /*
     * Start a completely new conversation.
     *
     * The existing MongoDB conversation is NOT deleted.
     *
     * The next message will omit conversationId,
     * causing the backend to create a new conversation.
     */
    setConversationId(null);
    setMessages([createWelcomeMessage()]);
    setError(null);
    setInput('');
  };

  const handleRetry = () => {
    /*
     * Find the most recent user message.
     *
     * This excludes the current error message.
     */
    const previousUserMessage = [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === 'user' && !message.isError
      );

    if (previousUserMessage) {
      void handleSend(previousUserMessage.content);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={onOpen}
          aria-label="Open AI Assistant"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white shadow-xl shadow-indigo-600/35 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />

            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />

            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>

          <span className="font-semibold text-sm tracking-tight pr-1">
            Ask Mandeep's AI
          </span>

          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AI Assistant Chat"
          className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[420px] md:w-[460px] h-[100dvh] sm:h-[620px] max-h-[100dvh] sm:max-h-[85vh] flex flex-col bg-white dark:bg-slate-950 border-0 sm:border border-slate-200 dark:border-slate-800 sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-6"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                  <Bot className="w-5 h-5" />
                </div>

                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              </div>

              <div>
                <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                  <span>Ask Mandeep's AI Assistant</span>

                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>

                <p className="text-[11px] text-slate-300 line-clamp-1">
                  Skills, projects, education, experience & interests
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleNewChat}
                title="Start a new conversation"
                aria-label="Start new conversation"
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                aria-label="Close assistant panel"
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conversation status */}
          <div className="bg-slate-100 dark:bg-slate-900/90 px-4 py-2 text-[11px] text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-between">
            <span>
              Powered by Mandeep's AI Knowledge Base
            </span>

            {conversationId && (
              <span className="text-[10px] font-medium text-indigo-500 dark:text-cyan-400">
                Conversation active
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm bg-slate-50 dark:bg-slate-950/60">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isUser ? 'items-end' : 'items-start'
                  } max-w-full`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed break-words shadow-xs ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-br-xs'
                        : msg.isError
                        ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 rounded-bl-xs'
                        : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-cyan-400 mb-1">
                        <Bot className="w-3.5 h-3.5" />
                        <span>Mandeep's AI</span>
                      </div>
                    )}

                    <div className="whitespace-pre-wrap text-sm chat-prose">
                      {msg.content}
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                    {new Intl.DateTimeFormat('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                    }).format(msg.timestamp)}
                  </span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex flex-col items-start max-w-full">
                <div className="rounded-2xl rounded-bl-xs px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-2 shadow-xs">
                  <Bot className="w-4 h-4 text-indigo-500 animate-spin" />

                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Mandeep's AI is thinking
                  </span>

                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && !isLoading && (
              <div className="pt-2">
                <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Suggested Questions:
                </div>

                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => void handleSend(prompt)}
                      className="text-left p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/60 border-t border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-xs text-rose-700 dark:text-rose-300 shrink-0">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />

                <span>{error}</span>
              </div>

              <button
                onClick={handleRetry}
                className="underline font-semibold hover:text-rose-900 dark:hover:text-rose-100"
              >
                Retry
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-800 p-2 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Mandeep..."
                rows={1}
                disabled={isLoading}
                className="w-full bg-transparent resize-none outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 py-1.5 px-2 max-h-32 min-h-[38px] disabled:opacity-50"
              />

              <button
                onClick={() => void handleSend()}
                disabled={!input.trim() || isLoading}
                aria-label="Send query"
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white disabled:text-slate-500 transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 px-1 text-[11px] text-slate-400 dark:text-slate-500">
              <span>
                Enter to send · Shift + Enter for newline
              </span>

              <button
                onClick={handleNewChat}
                className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                New Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};