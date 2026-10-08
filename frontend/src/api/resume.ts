import { apiRequest } from './client';
import type { ApiResponse, Resume } from '../types';

export async function getResume(): Promise<Resume> {
  const response = await apiRequest<ApiResponse<Resume>>('/viewer/resume');
  return response.data;
}
