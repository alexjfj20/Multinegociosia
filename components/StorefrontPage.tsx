
import React, { useState, useMemo, useEffect } from 'react';
import { Product, BusinessSettings, ProductStatus, CartItem } from '../types';
import { ArrowLeftIcon, PhotoIcon, SparklesIcon, WhatsAppIcon, ShoppingCartIcon, SearchIcon, XCircleIcon } from './icons';
import { replacePlaceholders } from '../utils';

interface StorefrontPageProps {
  allProducts: Product[];
  settings: BusinessSettings | null;
  onNavigateBack: () => void;
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onNavigateToCart: () => void;
}

// Subcomponente para la galería de imágenes de la tienda
const StorefrontProductImageGallery: React.FC<{ imageUrls: string[] }> = ({ imageUrls }) => {
  const [currentMainImageUrl, setCurrentMainImageUrl] = useState<string | null>(null);
  const images = imageUrls || [];

  useEffect(() => {
    if (images.length > 0) {
      setCurrentMainImageUrl(images[0]);
    } else {
      setCurrentMainImageUrl(null);
    }
  }, [imageUrls]); // Depend on imageUrls directly

  const handleThumbnailClick = (imageUrl: string) => {
    setCurrentMainImageUrl(imageUrl);
  };

  const MAX_THUMBNAILS_VISIBLE = 4;
  const displayedThumbnails = images.slice(0, MAX_THUMBNAILS_VISIBLE);

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-100">
        <PhotoIcon className="w-16 h-16 text-neutral-400" />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt="Imagen del producto"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    );
  }

  return (
    <div className="w-full h-full flex">
      {/* Thumbnails Column */}
      <div className="w-1/5 h-full flex flex-col space-y-1 p-1 overflow-y-auto custom-scrollbar-thin">
        {displayedThumbnails.map((imgUrl, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(imgUrl)}
            className={`aspect-square w-full rounded-sm overflow-hidden border-2 focus:outline-none transition-all duration-200
                        ${imgUrl === currentMainImageUrl ? 'border-primary shadow-md' : 'border-transparent hover:border-neutral-400 opacity-70 hover:opacity-100'}`}
            aria-label={`Ver imagen ${index + 1}`}
          >
            <img
              src={imgUrl}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      {/* Main Image */}
      <div className="w-4/5 h-full relative">
        {currentMainImageUrl && (
          <img
            src={currentMainImageUrl}
            alt="Imagen principal del producto"
            className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
          />
        )}
      </div>
    </div>
  );
};


export const StorefrontPage: React.FC<StorefrontPageProps> = ({
  allProducts,
  settings,
  onNavigateBack,
  cart,
  onAddToCart,
  onNavigateToCart
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const activeProducts = useMemo(() => {
    return allProducts.filter(product => product.status === ProductStatus.Activo);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return activeProducts;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return activeProducts.filter(product =>
      product.name.toLowerCase().includes(lowercasedSearchTerm) ||
      product.generatedDescription.toLowerCase().includes(lowercasedSearchTerm) ||
      product.idea.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [activeProducts, searchTerm]);

  const businessName = settings?.businessName || "Mi Tienda";
  const logoUrl = settings?.logoPreviewUrl;
  const whatsappNumber = settings?.whatsappNumber;
  const inquiryTemplate = settings?.whatsappInquiryTemplate;


  const handleWhatsAppInquiry = (product: Product) => {
    if (!whatsappNumber) {
      alert("El número de WhatsApp no está configurado por el negocio.");
      return;
    }
    const cleanNumber = whatsappNumber.replace(/[^\d+]/g, '');
    let message: string;

    if (inquiryTemplate) {
      const placeholderData = {
        businessName: businessName,
        productName: product.name,
        productPrice: product.price || "N/A",
      };
      message = replacePlaceholders(inquiryTemplate, placeholderData);
    } else {
      message = `Hola ${businessName}, estoy interesado/a en el producto: "${product.name}". Precio: $${product.price || 'N/A'}. ¿Podrías darme más información?`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };
  
  const handleFloatingWhatsAppInquiry = () => {
     if (!whatsappNumber) {
      alert("El número de WhatsApp no está configurado por el negocio.");
      return;
    }
    const cleanNumber = whatsappNumber.replace(/[^\d+]/g, '');
    let message: string;

    if (inquiryTemplate) {
      const placeholderData = {
        businessName: businessName,
        productName: "", 
        productPrice: "", 
      };
      message = replacePlaceholders(inquiryTemplate, placeholderData);
      if (message.length < `Hola ${businessName}, `.length + 5) { 
         message = `Hola ${businessName}, tengo una consulta general sobre tus productos/servicios.`;
      }
    } else {
      message = `Hola ${businessName}, tengo una consulta general.`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };


  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Storefront Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              {logoUrl ? (
                <img src={logoUrl} alt={`Logo de ${businessName}`} className="h-10 w-auto mr-3 sm:h-12" />
              ) : (
                <SparklesIcon className="h-10 w-10 text-primary mr-3 sm:h-12 sm:w-12" />
              )}
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-800" style={{ color: 'var(--app-primary-color)' }}>
                {businessName}
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary w-32 sm:w-48 md:w-64"
                  aria-label="Buscar productos en la tienda"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-neutral-400" />
                </div>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="absolute inset-y-0 right-8 pr-1 flex items-center"
                    aria-label="Limpiar búsqueda"
                  >
                    <XCircleIcon className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                  </button>
                )}
              </div>
              <button
                onClick={onNavigateToCart}
                className="relative p-2 text-neutral-600 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                aria-label="Ver carrito de compras"
                title="Ver Carrito"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {getTotalCartItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalCartItems()}
                  </span>
                )}
              </button>
              <button
                onClick={onNavigateBack}
                className="hidden sm:flex items-center px-3 py-2 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-200 shadow-sm transition-colors duration-150 text-sm font-medium"
                title="Volver al Panel de Administración"
                aria-label="Volver al Panel de Administración"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1.5 text-neutral-600" />
                Panel
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-800 mb-6 sm:mb-8">
          {searchTerm ? `Resultados para "${searchTerm}"` : "Nuestros Productos"}
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
                <article key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group border border-neutral-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full h-56 bg-neutral-200 overflow-hidden relative">
                     <StorefrontProductImageGallery imageUrls={product.imagePreviewUrls || []} />
                  </div>
                  <div className="p-4 sm:p-5 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-1 group-hover:text-primary transition-colors truncate" title={product.name}>
                      {product.name}
                    </h3>
                    {product.price && (
                      <p className="text-lg font-bold text-primary mb-3">
                        ${product.price}
                      </p>
                    )}
                     <p className="text-xs text-neutral-500 mt-1 mb-2 flex-grow line-clamp-2" title={product.generatedDescription}>
                        {product.generatedDescription}
                     </p>
                    <div className="mt-auto space-y-2">
                       <button
                        onClick={() => onAddToCart(product)}
                        className="w-full flex items-center justify-center px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-150"
                        aria-label={`Añadir ${product.name} al carrito`}
                      >
                        <ShoppingCartIcon className="w-4 h-4 mr-2" />
                        Añadir al Carrito
                      </button>
                      <button
                        onClick={() => handleWhatsAppInquiry(product)}
                        disabled={!whatsappNumber}
                        className="w-full flex items-center justify-center px-4 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 disabled:bg-neutral-300 disabled:cursor-not-allowed"
                        aria-label={`Consultar sobre ${product.name} por WhatsApp`}
                      >
                        <WhatsAppIcon className="w-4 h-4 mr-2" />
                        Consultar por WhatsApp
                      </button>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            {searchTerm ? (
              <>
                <SearchIcon className="w-20 h-20 text-neutral-400 mx-auto mb-4" strokeWidth={1}/>
                <p className="text-xl text-neutral-600">
                  No se encontraron productos para "<strong className="text-neutral-700">{searchTerm}</strong>".
                </p>
                <p className="text-neutral-500 mt-2">
                  Intenta con otra búsqueda o revisa nuestros productos destacados.
                </p>
              </>
            ) : (
              <>
                <PhotoIcon className="w-20 h-20 text-neutral-400 mx-auto mb-4" />
                <p className="text-xl text-neutral-600">
                  Actualmente no hay productos activos para mostrar.
                </p>
                <p className="text-neutral-500 mt-2">
                  Visita el panel de administración para agregar o activar productos.
                </p>
              </>
            )}
          </div>
        )}
      </main>
      
      {whatsappNumber && (
        <button
            onClick={handleFloatingWhatsAppInquiry}
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 z-30"
            aria-label="Contactar por WhatsApp para una consulta general"
            title="Consulta General por WhatsApp"
        >
            <WhatsAppIcon className="w-7 h-7" />
        </button>
      )}


      <footer className="py-8 mt-12 border-t border-neutral-200 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-500 text-sm">
          <p>
            {settings?.contactInfo ? (
              <>
                Contacto: {settings.contactInfo} <br />
              </>
            ) : null}
             {settings?.whatsappNumber ? (
              <>
                WhatsApp: {settings.whatsappNumber} <br />
              </>
            ) : null}
            &copy; {new Date().getFullYear()} {businessName}. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Ensure custom scrollbar styles for thumbnails are available (if not globally defined)
if (typeof document !== 'undefined' && !document.getElementById('custom-scrollbar-thin-styles')) {
    const style = document.createElement('style');
    style.id = 'custom-scrollbar-thin-styles';
    style.textContent = `
      .custom-scrollbar-thin::-webkit-scrollbar {
        width: 4px; /* Ancho de la barra de scroll */
        height: 4px; /* Alto de la barra de scroll (para horizontal) */
      }
      .custom-scrollbar-thin::-webkit-scrollbar-track {
        background: transparent; /* Fondo de la pista */
      }
      .custom-scrollbar-thin::-webkit-scrollbar-thumb {
        background: #94a3b8; /* Color del "pulgar" del scroll (Tailwind neutral-400) */
        border-radius: 2px; /* Bordes redondeados del pulgar */
      }
      .custom-scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: #64748b; /* Color del pulgar al hacer hover (Tailwind neutral-500) */
      }
      /* Para Firefox */
      .custom-scrollbar-thin {
        scrollbar-width: thin;
        scrollbar-color: #94a3b8 transparent; /* thumb track */
      }
    `;
    document.head.appendChild(style);
}
