import { OnboardingStatus } from '../types';
import { getAuthHeaders } from './authService';

const API_BASE_URL = 'http://localhost:3001/api/onboarding';

const handleApiResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    throw error;
  }
  return data;
};

const mapOnboardingStatus = (status: any): OnboardingStatus => {
  const validStatuses: OnboardingStatus[] = ['NOT_STARTED', 'BUSINESS_INFO_SUBMITTED', 'PERSONALIZATION_SUBMITTED', 'COMPLETED'];
  if (typeof status === 'string' && validStatuses.includes(status as OnboardingStatus)) {
    return status as OnboardingStatus;
  }
  if (typeof status === 'object' && status !== null && typeof status.status === 'string' && validStatuses.includes(status.status as OnboardingStatus)) {
    return status.status as OnboardingStatus; // Si el backend devuelve { status: "..." }
  }
  return 'NOT_STARTED';
};

export const getOnboardingStatus = async (): Promise<OnboardingStatus> => {
  console.log(`onboardingService: Obteniendo estado de onboarding vía API`);
  const response = await fetch(`${API_BASE_URL}/status`, { headers: getAuthHeaders() });
  const data = await handleApiResponse(response);
  // El backend podría devolver { status: "COMPLETED" }
  return mapOnboardingStatus(data.status || data); 
};

export const saveOnboardingStatus = async (status: OnboardingStatus): Promise<OnboardingStatus> => {
  console.log(`onboardingService: Guardando estado de onboarding ${status} vía API`);
  const response = await fetch(`${API_BASE_URL}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  const data = await handleApiResponse(response);
  return mapOnboardingStatus(data.status || data);
};
