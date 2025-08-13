import type { User, AuthResponse, UserRole } from '../types';

const AUTH_TOKEN_KEY = 'aiProductGeneratorApp_authToken';
const CURRENT_USER_KEY = 'aiProductGeneratorApp_currentUser';
const API_BASE_URL = 'http://localhost:3001/api'; // Esto debería ser una variable de entorno

interface ApiErrorResponse {
  message: string;
  errors?: Array<{param: string, msg: string}>; // Para errores de validación, por ejemplo
}

const handleApiResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    const error: Error & { data?: ApiErrorResponse } = new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    error.data = data;
    throw error;
  }
  return data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  console.log(`AuthService: Intentando login para ${email} vía API`);
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data: AuthResponse = await handleApiResponse(response);
  
  // Asumimos que la respuesta del backend para /login es { token: string, user: User }
  // y que el `user` incluye el `role`.
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    // Asegurarse de que el usuario de la API tenga el rol correcto antes de guardarlo.
    const userToStore: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role || 'sme', // Default a 'sme' si no viene, aunque el backend DEBE enviarlo.
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore));
    console.log('AuthService: Login API exitoso, token y usuario guardados.', userToStore);
    return data;
  } catch (error) {
    console.error("AuthService: Error al guardar en localStorage después de login API:", error);
    throw new Error('Error del sistema al procesar el inicio de sesión.');
  }
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  console.log(`AuthService: Intentando registrar a ${email} vía API`);
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data: AuthResponse = await handleApiResponse(response);
    // Asumimos que la respuesta del backend para /register es { token: string, user: User }
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    const userToStore: User = { // Similar a login, asegurar que el rol esté
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role || 'sme',
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore));
    console.log('AuthService: Registro API exitoso, token y usuario guardados.', userToStore);
    return data;
  } catch (error) {
    console.error("AuthService: Error al guardar en localStorage después de registro API:", error);
    throw new Error('Error del sistema al procesar el registro.');
  }
};


export const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    // Opcional: llamar a un endpoint de backend para invalidar el token si el backend lo soporta
    // await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', headers: getAuthHeaders() });
    console.log('AuthService: Logout, token y usuario eliminados.');
  } catch (error) {
    console.error("AuthService: Error al limpiar localStorage o llamar a API de logout:", error);
  }
  return Promise.resolve();
};

export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    if (userStr) {
      const user = JSON.parse(userStr) as User;
       // Validar estructura básica del usuario, incluyendo el rol
      if (user && typeof user.id === 'string' && typeof user.email === 'string' && (user.role === 'sme' || user.role === 'superadmin')) {
        return user;
      }
      console.warn("AuthService: Datos de usuario en localStorage corruptos, mal formados o con rol inválido.", userStr);
      localStorage.removeItem(CURRENT_USER_KEY);
      localStorage.removeItem(AUTH_TOKEN_KEY); 
    }
  } catch (error) {
    console.error("AuthService: Error al parsear usuario desde localStorage:", error);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
  return null;
};

export const getToken = (): string | null => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("AuthService: Error al obtener token desde localStorage:", error);
    return null;
  }
};

// Helper para obtener cabeceras de autenticación
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};
