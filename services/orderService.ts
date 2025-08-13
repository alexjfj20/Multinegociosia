import { Order, OrderStatus, CartItem } from '../types';
import { getAuthHeaders } from './authService';

const API_BASE_URL = 'http://localhost:3001/api/orders';

const handleApiResponse = async (response: Response) => {
  if (response.status === 204) return null; // Para DELETE o PUT sin contenido de respuesta
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    throw error;
  }
  return data;
};

const mapOrderData = (orderData: any): Order => {
  return {
    id: String(orderData.id || `ORD-ERR-${Date.now()}`),
    items: Array.isArray(orderData.items) ? orderData.items.map((item: any) => ({
      productId: String(item.productId || ''),
      name: String(item.name || 'Producto Desconocido'),
      price: String(item.price || '0.00'),
      quantity: Number(item.quantity || 1),
      imagePreviewUrl: item.imagePreviewUrl ? String(item.imagePreviewUrl) : undefined,
    } as CartItem)) : [],
    totalAmount: Number(orderData.totalAmount || 0),
    customerNotes: orderData.customerNotes ? String(orderData.customerNotes) : undefined,
    orderDate: Number(orderData.orderDate || Date.now()),
    status: orderData.status as OrderStatus || OrderStatus.PENDIENTE,
  };
};

export const getOrders = async (): Promise<Order[]> => {
  console.log(`orderService: Obteniendo pedidos vía API`);
  const response = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
  const data = await handleApiResponse(response);
  return Array.isArray(data) ? data.map(mapOrderData) : [];
};

export const addOrder = async (orderData: Pick<Order, 'items' | 'totalAmount' | 'customerNotes'>): Promise<Order> => {
  console.log(`orderService: Añadiendo pedido vía API`, orderData);
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });
  const data = await handleApiResponse(response);
  return mapOrderData(data);
};

export const updateOrderStatus = async (orderId: string, newStatus: OrderStatus): Promise<Order | null> => {
  console.log(`orderService: Actualizando estado del pedido ${orderId} a ${newStatus} vía API`);
  const response = await fetch(`${API_BASE_URL}/${orderId}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status: newStatus }),
  });
  const data = await handleApiResponse(response);
  return data ? mapOrderData(data) : null;
};
