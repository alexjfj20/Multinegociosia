import { BackupLog } from '../types';
import { getAuthHeaders } from './authService';

const API_BASE_URL = 'http://localhost:3001/api/superadmin/backups';

const handleApiResponse = async (response: Response) => {
  if (response.status === 204) return null; // No content, like for DELETE
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    throw error;
  }
  return data;
};

const mapBackupLogData = (data: any): BackupLog => ({
  id: String(data.id),
  type: data.type as 'full_system' | 'account_specific',
  accountId: data.accountId ? String(data.accountId) : undefined,
  timestamp: Number(data.timestamp || Date.now()),
  status: data.status as 'completed' | 'failed' | 'in_progress',
  filePath: data.filePath ? String(data.filePath) : undefined,
  sizeMb: data.sizeMb !== undefined ? Number(data.sizeMb) : undefined,
  triggeredBy: data.triggeredBy as 'manual' | 'scheduled',
});

export const getBackupLogs = async (): Promise<BackupLog[]> => {
  console.log(`backupService: Obteniendo logs de backups vía API`);
  const response = await fetch(`${API_BASE_URL}/logs`, { headers: getAuthHeaders() });
  const data = await handleApiResponse(response);
  return Array.isArray(data) ? data.map(mapBackupLogData) : [];
};

export type CreateBackupLogData = {
  type: 'full_system' | 'account_specific';
  accountId?: string;
  // triggeredBy será deducido por el backend o podría ser parte del request si es manual.
};

export const createBackupLog = async (backupData: CreateBackupLogData): Promise<BackupLog> => {
  console.log(`backupService: Creando log de backup vía API`, backupData);
  // El backend manejará la lógica real de creación del backup y luego el log.
  const response = await fetch(`${API_BASE_URL}/create`, { // Endpoint para iniciar un backup
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(backupData),
  });
  const data = await handleApiResponse(response);
  return mapBackupLogData(data); // El backend devolvería el log creado.
};

export const deleteBackupLog = async (logId: string): Promise<void> => {
  console.log(`backupService: Eliminando log de backup ${logId} vía API`);
  const response = await fetch(`${API_BASE_URL}/logs/${logId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleApiResponse(response);
};

// Simulación de descarga y restauración (estos serían endpoints diferentes)
export const downloadBackup = async (logId: string): Promise<void> => {
  // En una app real, esto podría abrir una URL de descarga o iniciar un stream.
  console.log(`backupService: Solicitando descarga para backup ${logId} (simulado)`);
  alert(`Simulación: Descargando backup ${logId}. En una app real, esto iniciaría una descarga desde el backend.`);
  // window.open(`${API_BASE_URL}/download/${logId}`, '_blank'); // Ejemplo
};

export const restoreFromBackup = async (logId: string): Promise<void> => {
  console.log(`backupService: Solicitando restauración desde backup ${logId} (simulado)`);
  // Esto sería una operación compleja en el backend.
  // const response = await fetch(`${API_BASE_URL}/restore/${logId}`, {
  // method: 'POST',
  // headers: getAuthHeaders(),
  // });
  // await handleApiResponse(response);
  alert(`Simulación: Iniciando restauración desde backup ${logId}. Esta es una operación crítica.`);
};
