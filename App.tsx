

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { ProductForm, ProductFormData } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { LoginView } from './components/LoginView';
import { LandingPage } from './components/LandingPage';
import { SettingsPage } from './components/SettingsPage';
import { StorefrontPage } from './components/StorefrontPage';
import { CartPage } from './components/CartPage';
import { OnboardingStep1BusinessInfo, OnboardingStep1Data } from './components/OnboardingStep1BusinessInfo';
import { OnboardingStep2Personalization, OnboardingStep2Data } from './components/OnboardingStep2Personalization';
import { OrdersDashboardPage } from './components/OrdersDashboardPage';
import { AIMarketingAssistantPage } from './components/AIMarketingAssistantPage';
import { SuperadminPanel } from "@/components/SuperadminPanel"; // Import SuperadminPanel using alias
import { SparklesIcon, LogoutIcon, CogIcon, BuildingStorefrontIcon, ClipboardListIcon, MenuIcon, XIcon, ChatBubbleLeftEllipsisIcon } from './components/icons';
import { Product, ProductStatus, BusinessSettings, CartItem, OnboardingStatus, Order, OrderStatus, User, AuthResponse, UserRole } from './types';
import { ProductFilterControls, ActiveFilters } from './components/ProductFilterControls';

import * as authService from './services/authService';
import * as productService from './services/productService';
import * as businessSettingsService from './services/businessSettingsService';
import * as cartService from './services/cartService';
import * as orderService from './services/orderService';
import * as onboardingService from './services/onboardingService';
import { decodeCartFromString, encodeCartToString } from './utils';

// Define Screen type
type Screen =
  | 'landing'
  | 'login'
  | 'onboardingStep1'
  | 'onboardingStep2'
  | 'app' // SME App
  | 'settings'
  | 'storefront'
  | 'cart'
  | 'ordersDashboard'
  | 'marketingAI'
  | 'superadminPanel'; // Nueva pantalla para Superadmin

// Define calculateScreen function
const calculateScreen = (
  user: User | null,
  isAuth: boolean,
  currentOnboardingStatus: OnboardingStatus
): Screen => {
  if (!isAuth) {
    return 'landing';
  }
  // User is authenticated
  if (user?.role === 'superadmin') {
    return 'superadminPanel';
  }

  // SME User onboarding
  if (currentOnboardingStatus === 'NOT_STARTED') {
    return 'onboardingStep1';
  }
  if (currentOnboardingStatus === 'BUSINESS_INFO_SUBMITTED') {
    return 'onboardingStep2';
  }
  // If onboarding is PERSONALIZATION_SUBMITTED or COMPLETED for SME
  return 'app';
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(authService.getCurrentUser());
  const [token, setToken] = useState<string | null>(authService.getToken());
  const isAuthenticated = !!currentUser && !!token;

  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [isLoadingBusinessSettings, setIsLoadingBusinessSettings] = useState<boolean>(false);
  const [isLoadingCart, setIsLoadingCart] = useState<boolean>(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);
  const [isLoadingOnboardingStatus, setIsLoadingOnboardingStatus] = useState<boolean>(false);
  
  const isLoadingSMEData = isLoadingProducts || isLoadingBusinessSettings || isLoadingCart || isLoadingOrders || isLoadingOnboardingStatus;

  const [products, setProducts] = useState<Product[]>([]);
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({});
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus>('NOT_STARTED');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cargar todos los datos cuando el usuario cambia o al inicio (si está autenticado)
  useEffect(() => {
    if (currentUser && currentUser.id && currentUser.role === 'sme') { // Only load SME data for SME users
      setIsLoadingProducts(true);
      setIsLoadingBusinessSettings(true);
      setIsLoadingCart(true);
      setIsLoadingOrders(true);
      setIsLoadingOnboardingStatus(true);

      Promise.all([
        productService.getProducts().then(setProducts).catch(err => { console.error("App: Error al cargar productos:", err); setProducts([]); }),
        businessSettingsService.getBusinessSettings().then(setBusinessSettings).catch(err => { console.error("App: Error al cargar config. negocio:", err); setBusinessSettings({}); }),
        cartService.getCart().then(userCart => {
            const urlParams = new URLSearchParams(window.location.search);
            const sharedCartParam = urlParams.get('sharedCart');
            if (sharedCartParam) {
                const decodedCart = decodeCartFromString(sharedCartParam);
                if (decodedCart) {
                  setCart(decodedCart);
                  cartService.saveCart(decodedCart);
                  const newUrl = window.location.pathname + window.location.hash;
                  window.history.replaceState({}, document.title, newUrl);
                } else {
                  setCart(userCart);
                }
            } else {
                setCart(userCart);
            }
        }).catch(err => { console.error("App: Error al cargar carrito:", err); setCart([]); }),
        orderService.getOrders().then(setOrders).catch(err => { console.error("App: Error al cargar pedidos:", err); setOrders([]); }),
        onboardingService.getOnboardingStatus().then(setOnboardingStatus).catch(err => { console.error("App: Error al cargar estado onboarding:", err); setOnboardingStatus('NOT_STARTED'); })
      ]).finally(() => {
        setIsLoadingProducts(false);
        setIsLoadingBusinessSettings(false);
        setIsLoadingCart(false);
        setIsLoadingOrders(false);
        setIsLoadingOnboardingStatus(false);
      });
    } else if (!currentUser || currentUser.role !== 'sme') { // Clear SME data if not SME or no user
      setProducts([]);
      setBusinessSettings({});
      setCart([]);
      setOrders([]);
      setOnboardingStatus('NOT_STARTED');
      setIsLoadingProducts(false);
      setIsLoadingBusinessSettings(false);
      setIsLoadingCart(false);
      setIsLoadingOrders(false);
      setIsLoadingOnboardingStatus(false);
    }
  }, [currentUser]);


  useEffect(() => {
    document.documentElement.style.setProperty(
      '--app-primary-color',
      businessSettings?.primaryColor || '#2563eb'
    );
  }, [businessSettings?.primaryColor]);

  const [currentScreen, setCurrentScreen] = useState<Screen>(() => 
    calculateScreen(currentUser, isAuthenticated, onboardingStatus)
  );
  
  useEffect(() => {
    const authSensitiveScreens: Screen[] = ['landing', 'login', 'onboardingStep1', 'onboardingStep2', 'superadminPanel'];
    
    if (currentScreen === 'login' && !isAuthenticated) {
      return; 
    }
  
    // Determine the target screen based on current auth state and user role
    const targetScreen = calculateScreen(currentUser, isAuthenticated, onboardingStatus);

    // Update screen if it's different from current, or if it's an auth-sensitive screen that needs re-evaluation
    if (currentScreen !== targetScreen || authSensitiveScreens.includes(currentScreen)) {
        // Special condition for SME app: only navigate to 'app' if onboarding is complete and role is 'sme'
        if (targetScreen === 'app' && currentUser?.role === 'sme' && (onboardingStatus === 'NOT_STARTED' || onboardingStatus === 'BUSINESS_INFO_SUBMITTED')) {
            // Stay on onboarding if SME is not fully onboarded
            setCurrentScreen(calculateScreen(currentUser, isAuthenticated, onboardingStatus));
        } else {
            setCurrentScreen(targetScreen);
        }
    }
  }, [isAuthenticated, onboardingStatus, currentScreen, currentUser]);


  const handleSetBusinessSettings = useCallback(async (settingsUpdate: Partial<BusinessSettings>) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    const newSettings = { ...businessSettings, ...settingsUpdate };
    setBusinessSettings(newSettings);
    try {
      await businessSettingsService.saveBusinessSettings(newSettings);
    } catch (error) {
      console.error("App: Error al guardar config. negocio:", error);
    }
  }, [currentUser, businessSettings]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    searchTerm: '',
    category: '',
    status: '',
    sortOrder: 'date-desc',
  });
  
  const handleNavigateToLogin = useCallback(() => {
    setCurrentScreen('login');
  }, []);

  const handleNavigateToSettings = useCallback(() => {
    setCurrentScreen('settings');
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavigateToStorefront = useCallback(() => {
    setCurrentScreen('storefront');
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavigateToCart = useCallback(() => {
    setCurrentScreen('cart');
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavigateToApp = useCallback(() => { // Navigates SME to their app, Superadmin to their panel
    if (currentUser?.role === 'superadmin') {
        setCurrentScreen('superadminPanel');
    } else {
        setCurrentScreen('app');
    }
    setIsMobileMenuOpen(false);
  }, [currentUser]);

  const handleNavigateToOrdersDashboard = useCallback(() => {
    setCurrentScreen('ordersDashboard');
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavigateToMarketingAI = useCallback(() => {
    setCurrentScreen('marketingAI');
    setIsMobileMenuOpen(false);
  }, []);
  
  const handleOnboardingStep1Submit = useCallback(async (data: OnboardingStep1Data) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    handleSetBusinessSettings({ 
      businessName: data.businessName, 
      businessCategory: data.businessCategory 
    });
    try {
      await onboardingService.saveOnboardingStatus('BUSINESS_INFO_SUBMITTED');
      setOnboardingStatus('BUSINESS_INFO_SUBMITTED'); 
    } catch (error) {
        console.error("App: Error al guardar estado onboarding (step 1):", error);
    }
  }, [currentUser, handleSetBusinessSettings]);

  const handleOnboardingStep2Submit = useCallback(async (settings: OnboardingStep2Data) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    handleSetBusinessSettings(settings);
    try {
      await onboardingService.saveOnboardingStatus('PERSONALIZATION_SUBMITTED');
      setOnboardingStatus('PERSONALIZATION_SUBMITTED'); 
    } catch (error) {
        console.error("App: Error al guardar estado onboarding (step 2):", error);
    }
  }, [currentUser, handleSetBusinessSettings]);


  const handleLoginSuccess = useCallback(async (authData: AuthResponse) => {
    setCurrentUser(authData.user); 
    setToken(authData.token);
    // Data loading for SME user will start due to `currentUser` change (useEffect).
    // For superadmin, data loading will be handled within SuperadminPanel.
    // `currentScreen` will update via its useEffect in response to authData.user and fetched onboarding status.
    if (authData.user.role === 'sme') {
        setIsLoadingProducts(true);
        setIsLoadingBusinessSettings(true);
        setIsLoadingCart(true);
        setIsLoadingOrders(true);
        setIsLoadingOnboardingStatus(true);
    }
  }, []); 

  const handleLogout = useCallback(async () => {
    await authService.logout();
    setCurrentUser(null);
    setToken(null);
    setEditingProduct(null);
    setActiveFilters({ searchTerm: '', category: '', status: '', sortOrder: 'date-desc' });
    setIsMobileMenuOpen(false);
    document.documentElement.style.setProperty('--app-primary-color', '#2563eb'); // Reset color
    // setCurrentScreen will be 'landing' via useEffect
  }, []);

  const addProductHandler = useCallback(async (productFormData: ProductFormData) => {
    if (!currentUser || currentUser.role !== 'sme') {
      console.error("No hay usuario SME actual para añadir el producto.");
      return;
    }

    const { stock: stockString, ...restInput } = productFormData.input;
    let stockAsNumber: number | undefined = undefined;
    if (stockString !== undefined && stockString.trim() !== '') {
      const parsedStock = parseInt(stockString, 10);
      if (!isNaN(parsedStock)) stockAsNumber = parsedStock;
    }

    const productDataForService: Omit<Product, 'id' | 'createdAt'> = {
      ...restInput,
      generatedDescription: productFormData.generatedDescription,
      imagePreviewUrls: productFormData.imagePreviewUrls || [],
      status: productFormData.input.status || ProductStatus.Activo,
      stock: stockAsNumber,
    };

    try {
      const newProduct = await productService.addProduct(productDataForService);
      setProducts(prevProducts => [newProduct, ...prevProducts]);
      setEditingProduct(null);
      if (onboardingStatus === 'PERSONALIZATION_SUBMITTED') {
        await onboardingService.saveOnboardingStatus('COMPLETED');
        setOnboardingStatus('COMPLETED');
      }
    } catch (error) {
      console.error("App: Error al añadir producto vía servicio:", error);
    }
  }, [currentUser, onboardingStatus]);


  const handleSetEditingProduct = useCallback((product: Product | null) => {
    setEditingProduct(product);
    if (product && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleDeleteProduct = useCallback(async (productId: string) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    try {
      await productService.deleteProduct(productId);
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      if (editingProduct && editingProduct.id === productId) {
        setEditingProduct(null);
      }
      const newCart = cart.filter(item => item.productId !== productId);
      if (newCart.length !== cart.length) {
        setCart(newCart);
        await cartService.saveCart(newCart);
      }
    } catch (error) {
      console.error("App: Error al eliminar producto vía servicio:", error);
    }
  }, [currentUser, editingProduct, cart]);

  const handleUpdateProduct = useCallback(async (productToUpdate: Product) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    try {
      const updatedProduct = await productService.updateProduct(productToUpdate);
      setProducts(prevProducts =>
        prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      const newCart = cart.map(item =>
          item.productId === updatedProduct.id
          ? { ...item, name: updatedProduct.name, price: updatedProduct.price, imagePreviewUrl: updatedProduct.imagePreviewUrls?.[0] }
          : item
      );
      if (JSON.stringify(newCart) !== JSON.stringify(cart)) {
          setCart(newCart);
          await cartService.saveCart(newCart);
      }
      handleSetEditingProduct(null);
    } catch (error) {
      console.error("App: Error al actualizar producto vía servicio:", error);
    }
  }, [currentUser, cart, handleSetEditingProduct]);


  const handleDuplicateProduct = useCallback(async (productToDuplicate: Product) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    const duplicatedProductData: Omit<Product, 'id' | 'createdAt'> = {
      ...productToDuplicate, 
      name: `${productToDuplicate.name} (Copia)`,
      status: ProductStatus.Inactivo,
    };
    try {
      const newProduct = await productService.addProduct(duplicatedProductData);
      setProducts(prevProducts => [newProduct, ...prevProducts]);
    } catch (error) {
      console.error("App: Error al duplicar producto vía servicio:", error);
    }
  }, [currentUser]);


  const handleFilterChange = useCallback((filters: ActiveFilters) => {
    setActiveFilters(filters);
  }, []);

  const handleAddToCart = useCallback(async (product: Product) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    let updatedCart;
    const existingItem = cart.find(item => item.productId === product.id);
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imagePreviewUrl: product.imagePreviewUrls?.[0],
        },
      ];
    }
    setCart(updatedCart);
    await cartService.saveCart(updatedCart);
  }, [currentUser, cart]);

  const handleRemoveFromCart = useCallback(async (productId: string) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    await cartService.saveCart(updatedCart);
  }, [currentUser, cart]);

  const handleUpdateCartQuantity = useCallback(async (productId: string, newQuantity: number) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    let updatedCart;
    if (newQuantity <= 0) {
      updatedCart = cart.filter(item => item.productId !== productId);
    } else {
      updatedCart = cart.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
    }
    setCart(updatedCart);
    await cartService.saveCart(updatedCart);
  }, [currentUser, cart]);

  const handleClearCart = useCallback(async () => {
    if (!currentUser || currentUser.role !== 'sme') return;
    setCart([]);
    await cartService.saveCart([]);
  }, [currentUser]);

  const handleUpdateProductStatus = useCallback(async (productId: string) => {
    if(!currentUser || currentUser.role !== 'sme') return;
    
    const productToUpdate = products.find(p => p.id === productId);
    if (!productToUpdate) return;

    let newStatus: ProductStatus;
    switch (productToUpdate.status) {
        case ProductStatus.Activo: newStatus = ProductStatus.Inactivo; break;
        case ProductStatus.Inactivo: newStatus = ProductStatus.Activo; break;
        case ProductStatus.Agotado: newStatus = ProductStatus.Activo; break;
        default: newStatus = ProductStatus.Activo;
    }
    const updatedProductData = { ...productToUpdate, status: newStatus };

    try {
        const updatedProduct = await productService.updateProduct(updatedProductData);
        setProducts(prevProducts =>
            prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
        );
    } catch (error) {
        console.error("App: Error al actualizar estado del producto vía servicio:", error);
    }
  }, [currentUser, products]);

  const handleAddOrder = useCallback(async (orderData: Pick<Order, 'items' | 'totalAmount' | 'customerNotes'>) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    try {
      const newOrder = await orderService.addOrder(orderData);
      setOrders(prevOrders => [newOrder, ...prevOrders]);
    } catch (error) {
      console.error("App: Error al añadir pedido vía servicio:", error);
    }
  }, [currentUser]);

  const handleUpdateOrderStatus = useCallback(async (orderId: string, newStatus: OrderStatus) => {
    if (!currentUser || currentUser.role !== 'sme') return;
    try {
      const updatedOrder = await orderService.updateOrderStatus(orderId, newStatus);
      if (updatedOrder) {
        setOrders(prevOrders =>
          prevOrders.map(order => (order.id === orderId ? updatedOrder : order))
        );
      }
    } catch (error) {
      console.error("App: Error al actualizar estado del pedido vía servicio:", error);
    }
  }, [currentUser]);


  const filteredProducts = useMemo(() => {
    if (currentUser?.role !== 'sme') return []; // No products for superadmin in this view
    let sortedProducts = [...products];

    sortedProducts = sortedProducts.filter(product => {
      const searchTermMatch = activeFilters.searchTerm
        ? product.name.toLowerCase().includes(activeFilters.searchTerm.toLowerCase()) ||
          product.idea.toLowerCase().includes(activeFilters.searchTerm.toLowerCase())
        : true;
      const categoryMatch = activeFilters.category
        ? product.category === activeFilters.category
        : true;
      const statusMatch = activeFilters.status
        ? product.status === activeFilters.status
        : true;
      return searchTermMatch && categoryMatch && statusMatch;
    });

    switch (activeFilters.sortOrder) {
      case 'date-desc':
        sortedProducts.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'date-asc':
        sortedProducts.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.price) || Infinity;
          const priceB = parseFloat(b.price) || Infinity;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.price) || -Infinity;
          const priceB = parseFloat(b.price) || -Infinity;
          return priceB - priceA;
        });
        break;
      default:
        sortedProducts.sort((a, b) => b.createdAt - a.createdAt);
    }
    return sortedProducts;
  }, [products, activeFilters, currentUser]);

  // Render logic based on currentScreen
  
  if (currentUser?.role === 'sme' && isLoadingSMEData && (currentScreen === 'app' || currentScreen === 'marketingAI')) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-100">
            <SparklesIcon className="w-16 h-16 text-primary animate-pulse mb-4" />
            <p className="text-neutral-600">Cargando datos de tu tienda...</p>
        </div>
    );
  }

  // Render specific screens
  if (currentScreen === 'landing') {
    return <LandingPage onNavigateToLogin={handleNavigateToLogin} />;
  }

  if (currentScreen === 'login') {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  // Superadmin Panel
  if (currentScreen === 'superadminPanel' && currentUser?.role === 'superadmin') {
    return <SuperadminPanel currentUser={currentUser} onLogout={handleLogout} />;
  }
  
  // SME Onboarding and App screens (only if user is SME)
  if (currentUser?.role === 'sme') {
    if (currentScreen === 'onboardingStep1') {
      return <OnboardingStep1BusinessInfo 
                initialBusinessName={businessSettings?.businessName || ''}
                initialBusinessCategory={businessSettings?.businessCategory || ''}
                onSubmit={handleOnboardingStep1Submit} 
             />;
    }

    if (currentScreen === 'onboardingStep2') {
      return <OnboardingStep2Personalization 
                initialSettings={{
                  primaryColor: businessSettings?.primaryColor || '#2563eb',
                  logoPreviewUrl: businessSettings?.logoPreviewUrl || '',
                  whatsappNumber: businessSettings?.whatsappNumber || '',
                  contactInfo: businessSettings?.contactInfo || ''
                }}
                onSubmit={handleOnboardingStep2Submit} 
                onNavigateBack={() => setCurrentScreen('onboardingStep1')}
             />;
    }

    if (currentScreen === 'settings') {
      return (
        <SettingsPage
          initialSettings={businessSettings}
          onSaveSettings={handleSetBusinessSettings}
          onNavigateBack={handleNavigateToApp}
        />
      );
    }

    if (currentScreen === 'storefront') {
      return (
        <StorefrontPage
          allProducts={products} 
          settings={businessSettings}
          onNavigateBack={handleNavigateToApp}
          cart={cart}
          onAddToCart={handleAddToCart}
          onNavigateToCart={handleNavigateToCart}
        />
      );
    }

    if (currentScreen === 'cart') {
      return (
        <CartPage
          cartItems={cart}
          settings={businessSettings}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onNavigateBackToStore={handleNavigateToStorefront}
          onAddOrder={handleAddOrder}
          encodeCartToString={encodeCartToString}
        />
      );
    }

    if (currentScreen === 'ordersDashboard') {
      return (
        <OrdersDashboardPage
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onNavigateBack={handleNavigateToApp}
        />
      );
    }

    if (currentScreen === 'marketingAI') {
      return (
        <AIMarketingAssistantPage
          onNavigateBack={handleNavigateToApp}
        />
      );
    }
  }


  // SME App View (default for authenticated and onboarded SME users)
  if (currentScreen === 'app' && currentUser?.role === 'sme') {
    const appTitle = businessSettings?.businessName
      ? `Panel de ${businessSettings.businessName}`
      : 'Gestor de Productos AI';
    
    const showOnboardingProductTip = onboardingStatus === 'PERSONALIZATION_SUBMITTED' && products.length === 0 && !isLoadingProducts;

    const NavButton: React.FC<{onClick: () => void; title: string; ariaLabel: string; icon: JSX.Element; text?: string; className?: string}> = 
      ({onClick, title, ariaLabel, icon, text, className=""}) => (
      <button
        onClick={onClick}
        className={`flex items-center p-2 sm:p-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 shadow-sm transition-colors duration-150 ${className}`}
        title={title}
        aria-label={ariaLabel}
      >
        {icon}
        {text && <span className="ml-1.5 sm:ml-2 text-sm sm:text-base hidden sm:inline">{text}</span>}
      </button>
    );

    const MobileMenuLink: React.FC<{onClick: () => void; icon: JSX.Element; text: string;}> = ({onClick, icon, text}) => (
       <button
          onClick={onClick}
          className="flex items-center w-full px-4 py-3 text-left text-neutral-700 hover:bg-primary/10 hover:text-primary transition-colors duration-150 rounded-md group"
        >
          {React.cloneElement(icon, { className: "w-5 h-5 mr-3 text-neutral-500 group-hover:text-primary"})}
          <span className="text-sm font-medium">{text}</span>
        </button>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 py-8 px-4 flex flex-col items-center">
        <header className="mb-10 w-full max-w-4xl flex items-center justify-between">
          <div className="flex items-center">
            <SparklesIcon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mr-2 sm:mr-3" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800">
                {appTitle}
              </h1>
              <p className="text-sm sm:text-base text-neutral-600">
                {currentUser ? `Hola, ${currentUser.name || currentUser.email}! ` : ''}Gestiona tus ideas y productos.
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
            <NavButton onClick={handleNavigateToOrdersDashboard} title="Ver Pedidos" ariaLabel="Ver Pedidos" icon={<ClipboardListIcon className="w-5 h-5 text-neutral-600" />} />
            <NavButton onClick={handleNavigateToStorefront} title="Ver Mi Tienda" ariaLabel="Ver Mi Tienda" icon={<BuildingStorefrontIcon className="w-5 h-5 text-neutral-600" />} />
            <NavButton onClick={handleNavigateToMarketingAI} title="Asistente Marketing IA" ariaLabel="Asistente de Marketing IA" icon={<ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-neutral-600" />} />
            <NavButton onClick={handleNavigateToSettings} title="Configuración" ariaLabel="Configuración del Negocio" icon={<CogIcon className="w-5 h-5 text-neutral-600" />} />
            <NavButton onClick={handleLogout} title="Cerrar Sesión" ariaLabel="Cerrar Sesión" icon={<LogoutIcon className="w-5 h-5 text-neutral-600" />} text="Salir" className="px-3 sm:px-4"/>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 bg-white border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 shadow-sm"
              title="Abrir menú"
              aria-label="Abrir menú de navegación"
            >
              <MenuIcon className="w-5 h-5 text-neutral-600" />
            </button>
          </div>
        </header>

        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          >
            <div 
              className="fixed top-0 right-0 h-full w-64 sm:w-72 bg-white shadow-xl p-4 transition-transform duration-300 ease-in-out transform translate-x-0"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 id="mobile-menu-title" className="text-lg font-semibold text-primary">Menú</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-neutral-500 hover:text-neutral-700" aria-label="Cerrar menú">
                  <XIcon className="w-5 h-5"/>
                </button>
              </div>
              <nav className="flex flex-col space-y-2">
                <MobileMenuLink onClick={handleNavigateToApp} icon={<SparklesIcon className="w-5 h-5"/>} text="Panel Principal"/>
                <MobileMenuLink onClick={handleNavigateToOrdersDashboard} icon={<ClipboardListIcon className="w-5 h-5" />} text="Ver Pedidos" />
                <MobileMenuLink onClick={handleNavigateToStorefront} icon={<BuildingStorefrontIcon className="w-5 h-5" />} text="Ver Mi Tienda" />
                <MobileMenuLink onClick={handleNavigateToMarketingAI} icon={<ChatBubbleLeftEllipsisIcon className="w-5 h-5" />} text="Asistente Marketing" />
                <MobileMenuLink onClick={handleNavigateToSettings} icon={<CogIcon className="w-5 h-5" />} text="Configuración" />
                <MobileMenuLink onClick={handleLogout} icon={<LogoutIcon className="w-5 h-5" />} text="Cerrar Sesión" />
              </nav>
            </div>
          </div>
        )}

        {showOnboardingProductTip && (
          <div className="w-full max-w-3xl mb-8 p-6 bg-primary/10 border border-primary/30 rounded-lg text-center shadow-md animate-pulse">
            <h3 className="text-lg font-semibold text-primary mb-2">¡Casi listo!</h3>
            <p className="text-neutral-700">
              Solo falta un paso: añade tu primer producto para completar la configuración de tu tienda y hacerla visible.
            </p>
          </div>
        )}

        <div ref={formRef} className="w-full max-w-3xl mb-10">
          <ProductForm
            onAddProduct={addProductHandler}
            productToEdit={editingProduct}
            onUpdateProduct={handleUpdateProduct}
            onCancelEdit={() => setEditingProduct(null)}
            isFirstProductAfterOnboarding={showOnboardingProductTip}
          />
        </div>

        {products.length > 0 && !isLoadingProducts && (
          <ProductFilterControls
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        )}

        <ProductList
          products={filteredProducts}
          onEditProduct={handleSetEditingProduct}
          onDeleteProduct={handleDeleteProduct}
          onDuplicateProduct={handleDuplicateProduct}
          onUpdateProductStatus={handleUpdateProductStatus}
          activeFilters={activeFilters}
        />
        
        <footer className="mt-12 text-center text-neutral-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {businessSettings.businessName || 'Gestor de Productos AI'}. Potenciando PYMEs.</p>
        </footer>
      </div>
    );
  }

  // Fallback if no screen matches (should not happen with proper logic)
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-100">
      <SparklesIcon className="w-16 h-16 text-primary animate-pulse mb-4" />
      <p className="text-neutral-600">Cargando aplicación o estado no reconocido...</p>
    </div>
  );
};

export default App;
