import { apiRequest } from './client';
import type { ApiResponse, Profile } from '../types';

export async function getProfile(): Promise<Profile> {
  const response = await apiRequest<ApiResponse<Profile>>('/viewer/profile');
  return response.data;
}
