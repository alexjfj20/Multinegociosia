
import React from 'react';

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

export const LoadingSpinnerIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`animate-spin h-5 w-5 ${className || 'text-white'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="status"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className, strokeWidth = 2 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-primary'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className, strokeWidth = 2 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-yellow-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className, strokeWidth = 2 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-success'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ClipboardCopyIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m4 4H8m4-8H8" /> {/* Simplified content lines */}
  </svg>
);

export const ArchiveIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    {/* Simplified path for a generic tag icon */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.586 2.586a2 2 0 00-2.828 0L2.172 10.172a2 2 0 000 2.828l7.414 7.414a2 2 0 002.828 0l7.414-7.414a2 2 0 000-2.828L12.586 2.586zM7 11a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);


export const CashIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const LoginIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1" />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className, strokeWidth = 2 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const PhotoIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const XCircleIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-red-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const MinusCircleIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ExclamationCircleIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-yellow-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className, strokeWidth = 2 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const CogIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const UploadCloudIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export const BuildingStorefrontIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6" /> {/* Simplified storefront awning */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 21h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v4" /> {/* Door line */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 21a.5.5 0 11-1 0 .5.5 0 011 0zM16.5 21a.5.5 0 11-1 0 .5.5 0 011 0z" /> {/* Store window details */}
 </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className, strokeWidth = 2 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className, strokeWidth = 0 }) => ( // strokeWidth=0 as it's a filled icon
  <svg
    className={`h-5 w-5 ${className || 'text-white'}`} // Default white for use on colored buttons
    viewBox="0 0 24 24"
    fill="currentColor" // Use fill for this icon
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.43 16.79L2 22L7.32 20.59C8.74 21.38 10.35 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.27 20.92 6.81 19.11 4.99C17.3 3.18 14.83 2 12.04 2ZM12.04 20.13C10.52 20.13 9.05 19.72 7.78 18.99L7.41 18.78L4.3 19.58L5.12 16.55L4.89 16.19C4.08 14.82 3.63 13.28 3.63 11.91C3.63 7.36 7.41 3.58 12.04 3.58C14.28 3.58 16.3 4.47 17.82 6C19.33 7.51 20.24 9.53 20.24 11.91C20.24 16.46 16.46 20.13 12.04 20.13ZM16.56 14.45C16.33 14.34 15.11 13.78 14.89 13.7C14.67 13.62 14.52 13.58 14.38 13.81C14.24 14.04 13.78 14.59 13.64 14.74C13.5 14.88 13.36 14.9 13.13 14.82C12.9 14.74 12.07 14.45 11.08 13.56C10.32 12.89 9.81 12.08 9.69 11.85C9.57 11.62 9.68 11.5 9.8 11.38C9.91 11.27 10.05 11.09 10.19 10.93C10.33 10.77 10.38 10.66 10.47 10.5C10.56 10.34 10.52 10.2 10.45 10.09C10.38 9.98 9.93 8.76 9.74 8.3C9.56 7.84 9.37 7.89 9.24 7.89C9.13 7.89 8.98 7.89 8.84 7.89C8.7 7.89 8.44 7.95 8.22 8.18C8 8.41 7.45 8.9 7.45 10.01C7.45 11.12 8.24 12.18 8.38 12.32C8.52 12.46 9.91 14.68 12.01 15.55C12.57 15.79 13.01 15.94 13.35 16.03C13.88 16.16 14.34 16.13 14.69 16.06C15.09 15.97 16.14 15.39 16.38 14.76C16.62 14.13 16.62 13.62 16.56 13.48C16.56 14.45 16.56 14.45 16.56 14.45Z"
    />
  </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const PlusCircleIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const Square2StackIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-8.25A2.25 2.25 0 017.5 18v-2.25m8.25-8.25l-6 6" />
  </svg>
);

export const CubeIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-400'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.5c0 .398-.223.75-.5.937l-7.5 4.5c-.27.162-.63.162-.9 0l-7.5-4.5A.937.937 0 013 16.5V7.5c0-.398.223-.75.5-.937l7.5-4.5c.27-.162.63-.162.9 0l7.5 4.5c.277.187.5.54.5.937V16.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5L12 12m0 0l8.25-4.5M12 12v9.75m0-9.75L3.75 7.5m8.25 4.5l8.25-4.5" />
  </svg>
);

export const SwitchHorizontalIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg 
    className={`h-5 w-5 ${className || 'text-neutral-500'}`}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

export const ClipboardListIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg 
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-600'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.044.588.05H11.25m-3.445 2.186c.195-.025.39-.044.588-.05H11.25m0 0V5.25m0 7.5V18.75M5.25 12H18.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.428-.03-.85-.086-1.269M15 5.25V3m0 2.25H12.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 9l-3.75-3.75M15 9h3.75" />
  </svg>
);
// MenuIcon para el menú hamburger
export const MenuIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const ChatBubbleLeftEllipsisIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337zM7.5 10.5h.008v.008H7.5V10.5zm3 0h.008v.008H10.5V10.5zm3 0h.008v.008H13.5V10.5z" />
  </svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

export const CurrencyDollarIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const QrCodeIcon: React.FC<IconProps> = ({ className, strokeWidth = 2 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h4v4H4V4zm0 12h4v4H4v-4zm12 0h4v4h-4v-4zM6 6h2M6 14h2m8 2h2M14 6h2M4 10h1.5M10 4h1.5M10 9.5h4.5V14H10V9.5zM16 4h4v4h-4V4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 10H20M10 18.5V20" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M16 16v1.5h1.5V16H16z m2.5 0v1.5H20V16h-1.5z M16 18.5v1.5h1.5V18.5H16z" /> {/* Bottom right small squares */}
  </svg>
);

export const BanknotesIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg 
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 012.25 4.5h.75A.75.75 0 013.75 6H3m12.75-3H2.25A2.25 2.25 0 000 5.25v10.5A2.25 2.25 0 002.25 18h15A2.25 2.25 0 0019.5 15.75V5.25A2.25 2.25 0 0017.25 3H16.5M16.5 3c0-1.657 1.343-3 3-3V0M16.5 18c0 1.657 1.343 3 3 3v-3M16.5 3.001v15" />
  </svg>
);

export const DevicePhoneMobileIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg 
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75A2.25 2.25 0 0015.75 1.5h-2.25m-3 0V3m3 0V3m0 0h.008v16.5h-.008V3zM10.5 0a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75h3c.414 0 .75-.336.75-.75v-1.5A.75.75 0 0013.5 0h-3z" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className, strokeWidth = 2.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-600'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className, strokeWidth = 2.5 }) => (
  <svg
    className={`h-5 w-5 ${className || 'text-neutral-600'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export const UserCircleIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
  <svg
    className={`h-6 w-6 ${className || 'text-neutral-700'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
