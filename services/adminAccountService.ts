import { AdminAccount, AdminAccountStatus } from '../types';
import { getAuthHeaders } from './authService';

const API_BASE_URL = 'http://localhost:3001/api/superadmin/accounts';

const handleApiResponse = async (response: Response) => {
  if (response.status === 204) return null;
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    throw error;
  }
  return data;
};

const mapAdminAccountData = (data: any): AdminAccount => ({
  id: String(data.id),
  name: String(data.name),
  email: String(data.email),
  status: data.status as AdminAccountStatus || AdminAccountStatus.Inactive,
  planId: data.planId ? String(data.planId) : undefined,
  createdAt: Number(data.createdAt || Date.now()),
  lastLogin: data.lastLogin ? Number(data.lastLogin) : undefined,
});

export const getAdminAccounts = async (): Promise<AdminAccount[]> => {
  console.log(`adminAccountService: Obteniendo cuentas de administrador vía API`);
  const response = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
  const data = await handleApiResponse(response);
  return Array.isArray(data) ? data.map(mapAdminAccountData) : [];
};

// Modificar para incluir password en la creación si el backend lo espera
export type AddAdminAccountData = Omit<AdminAccount, 'id' | 'createdAt' | 'lastLogin'> & { password?: string };

export const addAdminAccount = async (accountData: AddAdminAccountData): Promise<AdminAccount> => {
  console.log(`adminAccountService: Añadiendo cuenta de admin vía API`, accountData);
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(accountData),
  });
  const data = await handleApiResponse(response);
  return mapAdminAccountData(data);
};

export const updateAdminAccount = async (updatedAccountData: AdminAccount): Promise<AdminAccount> => {
  console.log(`adminAccountService: Actualizando cuenta de admin ${updatedAccountData.id} vía API`);
  const response = await fetch(`${API_BASE_URL}/${updatedAccountData.id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedAccountData),
  });
  const data = await handleApiResponse(response);
  return mapAdminAccountData(data);
};

export const deleteAdminAccount = async (accountId: string): Promise<void> => {
  console.log(`adminAccountService: Eliminando cuenta de admin ${accountId} vía API`);
  const response = await fetch(`${API_BASE_URL}/${accountId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleApiResponse(response);
};
