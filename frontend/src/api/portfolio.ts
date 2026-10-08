import { apiRequest } from './client';
import type { ApiResponse, PortfolioItem } from '../types';

export async function getPortfolios(): Promise<PortfolioItem[]> {
  const response = await apiRequest<ApiResponse<PortfolioItem[]>>('/viewer/portfolios');
  return response.data;
}

export async function getPortfolioById(id: string): Promise<PortfolioItem> {
  const response = await apiRequest<ApiResponse<PortfolioItem>>(`/viewer/portfolios/${id}`);
  return response.data;
}
