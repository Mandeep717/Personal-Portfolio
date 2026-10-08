import { apiRequest } from './client';
import type { ApiResponse, ChatRequest, ChatResponseData } from '../types';

/**
 * Sends a chat query to the backend AI assistant.
 * If conversationId is provided, it is sent strictly INSIDE the JSON request body.
 */
export async function sendChatMessage(
  query: string,
  conversationId?: string
): Promise<ChatResponseData> {
  const payload: ChatRequest = {
    query: query.trim(),
  };

  if (conversationId) {
    payload.conversationId = conversationId;
  }

  const response = await apiRequest<ApiResponse<ChatResponseData>>('/viewer/chat', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
}
