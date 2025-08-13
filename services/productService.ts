import { Product, ProductStatus } from '../types';
import { getAuthHeaders } from './authService'; // Importar para cabeceras autenticadas

const API_BASE_URL = 'http://localhost:3001/api/products'; // Asumiendo que el backend gestiona el scope por usuario via JWT

const handleApiResponse = async (response: Response) => {
  if (response.status === 204) { // No content, como en DELETE
    return null;
  }
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    // error.data = data; // Podrías añadir más info al error si es necesario
    throw error;
  }
  return data;
};

// Función de mapeo (puede ser más simple si el backend devuelve datos ya bien formados)
const mapProductData = (productData: any): Product => {
  return {
    ...productData,
    id: String(productData.id),
    name: String(productData.name),
    category: String(productData.category),
    price: String(productData.price),
    idea: String(productData.idea),
    generatedDescription: String(productData.generatedDescription),
    imagePreviewUrls: Array.isArray(productData.imagePreviewUrls) ? productData.imagePreviewUrls : [],
    status: productData.status as ProductStatus || ProductStatus.Activo,
    createdAt: Number(productData.createdAt || Date.now()),
    stock: productData.stock !== undefined ? Number(productData.stock) : undefined,
  };
};


export const getProducts = async (): Promise<Product[]> => {
  console.log(`%cproductService: Obteniendo productos vía API`, "color: blue; font-weight: bold;");
  const response = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
  const data = await handleApiResponse(response);
  return Array.isArray(data) ? data.map(mapProductData) : [];
};

export const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  console.log(`%cproductService: Añadiendo producto vía API`, "color: blue;", productData);
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });
  const data = await handleApiResponse(response);
  return mapProductData(data);
};

export const updateProduct = async (updatedProductData: Product): Promise<Product> => {
  console.log(`%cproductService: Actualizando producto ${updatedProductData.id} vía API`, "color: blue;");
  const response = await fetch(`${API_BASE_URL}/${updatedProductData.id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedProductData),
  });
  const data = await handleApiResponse(response);
  return mapProductData(data);
};

export const deleteProduct = async (productId: string): Promise<void> => {
  console.log(`%cproductService: Eliminando producto ${productId} vía API`, "color: blue;");
  const response = await fetch(`${API_BASE_URL}/${productId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  await handleApiResponse(response); // No espera contenido para DELETE 204
};
