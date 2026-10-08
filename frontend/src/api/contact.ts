import { apiRequest } from './client';
import type { ApiResponse, Contact } from '../types';

export async function getContact(): Promise<Contact> {
  const response = await apiRequest<ApiResponse<Contact>>('/viewer/contact');
  return response.data;
}
