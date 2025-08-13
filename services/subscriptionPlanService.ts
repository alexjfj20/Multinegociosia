import { SubscriptionPlan, SubscriptionPlanFeature, SubscriptionPlanLimits } from '../types';
import { getAuthHeaders } from './authService';

const API_BASE_URL = 'http://localhost:3001/api/superadmin/plans';

const handleApiResponse = async (response: Response) => {
  if (response.status === 204) return null;
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    throw error;
  }
  return data;
};

const mapPlanData = (data: any): SubscriptionPlan => ({
  id: String(data.id),
  name: String(data.name),
  price: Number(data.price),
  priceSuffix: data.priceSuffix ? String(data.priceSuffix) : '/mes',
  features: Array.isArray(data.features) ? data.features.map((f: any) => ({
    text: String(f.text),
    enabled: Boolean(f.enabled),
  } as SubscriptionPlanFeature)) : [],
  limits: {
    maxProducts: data.limits?.maxProducts !== undefined ? Number(data.limits.maxProducts) : undefined,
    aiGenerationsPerMonth: data.limits?.aiGenerationsPerMonth !== undefined ? Number(data.limits.aiGenerationsPerMonth) : undefined,
    ...data.limits,
  } as SubscriptionPlanLimits,
  isPopular: Boolean(data.isPopular),
  isArchived: Boolean(data.isArchived),
});

export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  console.log(`subscriptionPlanService: Obteniendo planes vía API`);
  const response = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
  const data = await handleApiResponse(response);
  return Array.isArray(data) ? data.map(mapPlanData) : [];
};

export const addSubscriptionPlan = async (planData: Omit<SubscriptionPlan, 'id'>): Promise<SubscriptionPlan> => {
  console.log(`subscriptionPlanService: Añadiendo plan vía API`, planData);
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(planData),
  });
  const data = await handleApiResponse(response);
  return mapPlanData(data);
};

export const updateSubscriptionPlan = async (updatedPlanData: SubscriptionPlan): Promise<SubscriptionPlan> => {
  console.log(`subscriptionPlanService: Actualizando plan ${updatedPlanData.id} vía API`);
  const response = await fetch(`${API_BASE_URL}/${updatedPlanData.id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedPlanData),
  });
  const data = await handleApiResponse(response);
  return mapPlanData(data);
};

export const toggleArchiveSubscriptionPlan = async (planId: string): Promise<SubscriptionPlan | null> => {
    console.log(`subscriptionPlanService: Archivando/Desarchivando plan ${planId} vía API`);
    // El backend podría tener un endpoint específico para esto, o manejarlo en el PUT general.
    // Asumiré un endpoint PATCH para cambiar solo el estado 'isArchived'.
    const plan = (await getSubscriptionPlans()).find(p => p.id === planId);
    if (!plan) throw new Error("Plan no encontrado para archivar/desarchivar");

    const response = await fetch(`${API_BASE_URL}/${planId}/archive-toggle`, { // O podría ser un PUT con el objeto completo
      method: 'PATCH', // o PUT
      headers: getAuthHeaders(),
      body: JSON.stringify({ isArchived: !plan.isArchived })
    });
    const data = await handleApiResponse(response);
    return data ? mapPlanData(data) : null;
};
