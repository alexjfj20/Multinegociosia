import { ProductInput } from '../types';
import { getAuthHeaders } from './authService'; // Importar para cabeceras autenticadas

const API_BASE_URL = 'http://localhost:3001/api/ai';

const handleApiResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    // error.data = data; // Podrías añadir más info al error si es necesario
    throw error;
  }
  return data;
};

export const generateProductDescription = async (details: ProductInput): Promise<string> => {
  console.log("aiService: Solicitando descripción al backend", details);
  const response = await fetch(`${API_BASE_URL}/generate-description`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(details),
  });
  const data = await handleApiResponse(response);
  // Asumimos que el backend devuelve { description: "..." }
  return data.description || "No se pudo generar la descripción desde el backend.";
};

export const suggestProductCategories = async (productName: string, productIdea: string): Promise<string[]> => {
  console.log("aiService: Solicitando categorías al backend", { productName, productIdea });
  const response = await fetch(`${API_BASE_URL}/suggest-categories`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ productName, productIdea }),
  });
  const data = await handleApiResponse(response);
  // Asumimos que el backend devuelve { categories: ["...", "..."] }
  return Array.isArray(data.categories) ? data.categories : ["Error al obtener categorías del backend"];
};

// Se puede añadir aquí la función para el Asistente de Marketing si se centraliza
export const generateMarketingContent = async (prompt: string): Promise<string> => {
  console.log("aiService: Solicitando contenido de marketing al backend");
  const response = await fetch(`${API_BASE_URL}/generate-marketing-content`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ prompt }),
  });
  const data = await handleApiResponse(response);
  // Asumimos que el backend devuelve { content: "..." }
  return data.content || "No se pudo generar el contenido de marketing desde el backend.";
};