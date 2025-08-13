import { AdminMessage, AdminMessageCategory } from '../types';
import { getAuthHeaders } from './authService';

const API_BASE_URL = 'http://localhost:3001/api/superadmin/messages';

const handleApiResponse = async (response: Response) => {
  if (response.status === 204) return null;
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    throw error;
  }
  return data;
};

const mapAdminMessageData = (data: any): AdminMessage => ({
  id: String(data.id),
  subject: String(data.subject),
  body: String(data.body),
  recipients: Array.isArray(data.recipients) ? data.recipients.map(String) : [],
  category: data.category as AdminMessageCategory || 'info',
  sentAt: Number(data.sentAt || Date.now()),
  readBy: Array.isArray(data.readBy) ? data.readBy.map(String) : [],
});

export const getSentMessages = async (): Promise<AdminMessage[]> => {
  console.log(`adminMessagingService: Obteniendo mensajes enviados vía API`);
  const response = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
  const data = await handleApiResponse(response);
  return Array.isArray(data) ? data.map(mapAdminMessageData) : [];
};

export type SendMessageData = Omit<AdminMessage, 'id' | 'sentAt' | 'readBy'>;

export const sendMessage = async (messageData: SendMessageData): Promise<AdminMessage> => {
  console.log(`adminMessagingService: Enviando mensaje vía API`, messageData);
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(messageData),
  });
  const data = await handleApiResponse(response);
  return mapAdminMessageData(data);
};

export const deleteMessage = async (messageId: string): Promise<void> => {
  console.log(`adminMessagingService: Eliminando mensaje ${messageId} vía API`);
  const response = await fetch(`${API_BASE_URL}/${messageId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleApiResponse(response);
};
