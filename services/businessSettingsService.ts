import { BusinessSettings } from '../types';
import { getAuthHeaders } from './authService';

const API_BASE_URL = 'http://localhost:3001/api/settings/business';

const handleApiResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    throw error;
  }
  return data;
};

const mapBusinessSettingsData = (data: any): BusinessSettings => {
  return {
    businessName: data?.businessName || '',
    businessCategory: data?.businessCategory || '',
    primaryColor: data?.primaryColor || '#2563eb',
    logoPreviewUrl: data?.logoPreviewUrl || '',
    contactInfo: data?.contactInfo || '',
    whatsappNumber: data?.whatsappNumber || '',
    whatsappOrderTemplate: data?.whatsappOrderTemplate || '',
    whatsappInquiryTemplate: data?.whatsappInquiryTemplate || '',
    enableCashOnDelivery: data?.enableCashOnDelivery || false,
    cashOnDeliveryInstructions: data?.cashOnDeliveryInstructions || '',
    stripeApiKeyMock: data?.stripeApiKeyMock || '', // Seguirán siendo mocks en frontend hasta que backend maneje pagos reales
    stripeSecretKeyMock: data?.stripeSecretKeyMock || '',
    paypalEmailMock: data?.paypalEmailMock || '',
    enableQrPayment: data?.enableQrPayment || false,
    qrCodeImageUrl: data?.qrCodeImageUrl || '',
    qrPaymentInstructions: data?.qrPaymentInstructions || '',
    enableNequiPayment: data?.enableNequiPayment || false,
    nequiPhoneNumber: data?.nequiPhoneNumber || '',
    nequiPaymentInstructions: data?.nequiPaymentInstructions || '',
  };
};

export const getBusinessSettings = async (): Promise<BusinessSettings> => {
  console.log(`businessSettingsService: Obteniendo configuración vía API`);
  const response = await fetch(API_BASE_URL, { headers: getAuthHeaders() });
  const data = await handleApiResponse(response);
  return mapBusinessSettingsData(data);
};

export const saveBusinessSettings = async (settings: BusinessSettings): Promise<BusinessSettings> => {
  console.log(`businessSettingsService: Guardando configuración vía API`, settings);
  const response = await fetch(API_BASE_URL, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(settings),
  });
  const data = await handleApiResponse(response);
  return mapBusinessSettingsData(data);
};
