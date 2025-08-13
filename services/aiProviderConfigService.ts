import { AIProviderConfig } from '../types';
import { getAuthHeaders } from './authService';

const API_BASE_URL = 'http://localhost:3001/api/superadmin/ai-providers';

const handleApiResponse = async (response: Response) => {
  if (response.status === 204) return null;
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    throw error;
  }
  return data;
};

const mapAIProviderData = (data: any): AIProviderConfig => ({
  id: String(data.id),
  providerName: String(data.providerName),
  apiKey: String(data.apiKey), // El backend debería devolver un placeholder o solo info no sensible
  endpointUrl: data.endpointUrl ? String(data.endpointUrl) : undefined,
  status: data.status === 'active' || data.status === 'inactive' || data.status === 'error' ? data.status : 'inactive',
  monthlyLimit: data.monthlyLimit !== undefined ? Number(data.monthlyLimit) : undefined,
  dailyLimit: data.dailyLimit !== undefined ? Number(data.dailyLimit) : undefined,
  perUserLimit: data.perUserLimit !== undefined ? Number(data.perUserLimit) : undefined,
  avgResponseTimeMs: data.avgResponseTimeMs !== undefined ? Number(data.avgResponseTimeMs) : undefined,
  successRatePercent: data.successRatePercent !== undefined ? Number(data.successRatePercent) : undefined,
  isDefault: Boolean(data.isDefault),
});

export const getAIProviders = async (): Promise<AIProviderConfig[]> => {
  console.log(`aiProviderConfigService: Obteniendo proveedores de IA vía API`);
  const response = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
  const data = await handleApiResponse(response);
  return Array.isArray(data) ? data.map(mapAIProviderData) : [];
};

export const addAIProvider = async (providerData: Omit<AIProviderConfig, 'id'>): Promise<AIProviderConfig> => {
  console.log(`aiProviderConfigService: Añadiendo proveedor de IA vía API`, providerData);
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(providerData), // El backend se encargará de encriptar/manejar la API key
  });
  const data = await handleApiResponse(response);
  return mapAIProviderData(data);
};

export const updateAIProvider = async (updatedProviderData: AIProviderConfig): Promise<AIProviderConfig> => {
  console.log(`aiProviderConfigService: Actualizando proveedor de IA ${updatedProviderData.id} vía API`);
  // Al enviar la API key, el backend debe manejarla adecuadamente (no almacenarla en texto plano si ya existe, etc.)
  const response = await fetch(`${API_BASE_URL}/${updatedProviderData.id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedProviderData),
  });
  const data = await handleApiResponse(response);
  return mapAIProviderData(data);
};

export const deleteAIProvider = async (providerId: string): Promise<void> => {
  console.log(`aiProviderConfigService: Eliminando proveedor de IA ${providerId} vía API`);
  const response = await fetch(`${API_BASE_URL}/${providerId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleApiResponse(response);
};
