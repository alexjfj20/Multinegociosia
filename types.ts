export enum ProductStatus {
  Activo = "Activo",
  Inactivo = "Inactivo",
  Agotado = "Agotado",
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  idea: string;
  generatedDescription: string;
  imagePreviewUrls?: string[];
  status: ProductStatus;
  createdAt: number; 
  stock?: number; // Campo para la cantidad en stock
}

export interface ProductInput { 
  name: string;
  category: string;
  price: string;
  idea: string;
  status?: ProductStatus; 
  stock?: string; // Campo para la cantidad en stock en el formulario (como string)
}


export enum ProductCategory {
  CLOTHING = "Ropa y Accesorios",
  FOOD_DRINK = "Alimentos y Bebidas",
  TECHNOLOGY = "Tecnología y Electrónicos",
  HOME_GARDEN = "Hogar y Jardín",
  BEAUTY_PERSONAL_CARE = "Belleza y Cuidado Personal",
  SPORTS_OUTDOORS = "Deportes y Aire Libre",
  TOYS_GAMES = "Juguetes y Juegos",
  BOOKS_MEDIA = "Libros y Multimedia",
  SERVICES = "Servicios",
  OTHER = "Otro",
}

export interface BusinessSettings {
  businessName?: string;
  businessCategory?: string; // Nueva categoría del negocio
  primaryColor?: string; // e.g., #2563eb
  logoPreviewUrl?: string;
  contactInfo?: string;
  whatsappNumber?: string; 
  whatsappOrderTemplate?: string; // Plantilla para mensajes de pedido
  whatsappInquiryTemplate?: string; // Plantilla para mensajes de consulta
  
  // Nuevos campos para configuración de pagos
  enableCashOnDelivery?: boolean;
  cashOnDeliveryInstructions?: string;
  stripeApiKeyMock?: string;
  stripeSecretKeyMock?: string;
  paypalEmailMock?: string;

  // Nuevos campos para QR y Nequi
  enableQrPayment?: boolean;
  qrCodeImageUrl?: string;
  qrPaymentInstructions?: string;
  enableNequiPayment?: boolean;
  nequiPhoneNumber?: string;
  nequiPaymentInstructions?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: string; // Mantener como string por consistencia con Product
  quantity: number;
  imagePreviewUrl?: string; // Solo la primera imagen para la vista del carrito
}

export type OnboardingStatus =
  | 'NOT_STARTED'
  | 'BUSINESS_INFO_SUBMITTED' // Step 1 (business name, category) done
  | 'PERSONALIZATION_SUBMITTED' // Step 2 (logo/color/contact) done, needs first product
  | 'COMPLETED'; // Onboarding finished and first product added (or skipped if allowed)

export enum OrderStatus {
  PENDIENTE = "Pendiente",
  EN_PROCESO = "En Proceso",
  COMPLETADO = "Completado",
  CANCELADO = "Cancelado",
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerNotes?: string;
  orderDate: number; // Timestamp
  status: OrderStatus;
}

// Tipos para Autenticación
export type UserRole = 'sme' | 'superadmin';

export interface User {
  id: string;
  email: string;
  name?: string; // Nombre opcional del usuario
  role?: UserRole; // Rol del usuario
  // storeId?: string; // Se podría añadir en el futuro para multi-tenancy
}

export interface AuthResponse {
  token: string;
  user: User;
}

// --- Tipos para Superadmin Panel ---
export enum AdminAccountStatus { // Explicit enum for clarity
  Active = "active",
  Inactive = "inactive",
  Suspended = "suspended",
}
// export type AdminAccountStatus = 'active' | 'inactive' | 'suspended'; // Previous definition

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  status: AdminAccountStatus;
  planId?: string; // ID del plan de suscripción asignado
  createdAt: number;
  lastLogin?: number;
}

export interface SubscriptionPlanFeature {
  text: string;
  enabled: boolean;
}

export interface SubscriptionPlanLimits {
  maxProducts?: number;
  aiGenerationsPerMonth?: number;
  // ... otros límites
}

export interface SubscriptionPlan {
  id: string;
  name: string; // e.g., "Gratis", "Bronce", "Plata", "Oro"
  price: number; // Precio mensual
  priceSuffix?: string; // e.g., "/mes"
  features: SubscriptionPlanFeature[];
  limits: SubscriptionPlanLimits;
  isPopular?: boolean;
  isArchived?: boolean; // Para ocultar planes viejos sin borrarlos
}

export interface AIProviderConfig {
  id: string;
  providerName: string; // e.g., "OpenAI GPT-4", "Gemini Pro"
  apiKey: string; // Almacenar de forma segura, aquí solo para mock
  endpointUrl?: string;
  status: 'active' | 'inactive' | 'error';
  isDefault: boolean; // Si es el proveedor por defecto para nuevos usuarios
  monthlyLimit?: number; // Límite de tokens o requests
  dailyLimit?: number;
  perUserLimit?: number;
  avgResponseTimeMs?: number; // Registrado por el sistema
  successRatePercent?: number; // Registrado por el sistema
}

export type AdminMessageCategory = 'info' | 'alert' | 'payment_reminder' | 'feature_update' | 'congratulations';

export interface AdminMessage {
  id: string;
  subject: string;
  body: string; // Podría ser HTML si se usa un editor rico
  recipients: string[]; // Array de IDs de AdminAccount
  category: AdminMessageCategory;
  sentAt: number;
  readBy?: string[]; // IDs de AdminAccount que lo han leído
}

export interface BackupLog {
  id: string;
  type: 'full_system' | 'account_specific';
  accountId?: string; // Si es account_specific
  timestamp: number;
  status: 'completed' | 'failed' | 'in_progress';
  filePath?: string; // Path simulado o URL
  sizeMb?: number;
  triggeredBy: 'manual' | 'scheduled';
}