import { CartItem } from '../types';
import { getAuthHeaders } from './authService';

const API_BASE_URL = 'http://localhost:3001/api/cart';

const handleApiResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    throw error;
  }
  return data;
};

const mapCartItemData = (item: any): CartItem => {
  return {
    productId: String(item.productId || ''),
    name: String(item.name || 'Producto Desconocido'),
    price: String(item.price || '0.00'),
    quantity: Number(item.quantity || 1),
    imagePreviewUrl: item.imagePreviewUrl ? String(item.imagePreviewUrl) : undefined,
  };
};

export const getCart = async (): Promise<CartItem[]> => {
  console.log(`cartService: Obteniendo carrito vía API`);
  const response = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
  // El backend podría devolver directamente { items: CartItem[] } o solo CartItem[]
  const data = await handleApiResponse(response); 
  const cartItems = data.items || data; // Adaptar según la respuesta del backend
  return Array.isArray(cartItems) ? cartItems.map(mapCartItemData) : [];
};

export const saveCart = async (cartItems: CartItem[]): Promise<CartItem[]> => {
  console.log(`cartService: Guardando carrito vía API`, cartItems);
  // El backend podría esperar un objeto { items: CartItem[] }
  const response = await fetch(API_BASE_URL, {
    method: 'POST', // O PUT si el carrito se considera un recurso único que se actualiza
    headers: getAuthHeaders(),
    body: JSON.stringify({ items: cartItems }), // Enviar como objeto si el backend lo espera así
  });
  const data = await handleApiResponse(response);
  const updatedCartItems = data.items || data;
  return Array.isArray(updatedCartItems) ? updatedCartItems.map(mapCartItemData) : [];
};
