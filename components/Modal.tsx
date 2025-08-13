
import React, { useEffect, useRef } from 'react';
import { XIcon } from './icons'; // Suponiendo que tienes un icono X para cerrar

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  isLoading?: boolean;
}

// Keyframes definition for the modal animation
const modalKeyframes = `
  @keyframes modalShowAnim {
    0% {
      transform: scale(0.95);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// Flag to ensure keyframes are injected only once globally
let keyframesInjected = false;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmButtonClass = "bg-primary hover:bg-blue-700 focus:ring-primary",
  isLoading = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject keyframes into the document head if not already injected
    if (!keyframesInjected) {
      const styleElement = document.createElement('style');
      styleElement.id = 'modal-animation-keyframes'; // Assign an ID for easier debugging/identification
      styleElement.textContent = modalKeyframes;
      document.head.appendChild(styleElement);
      keyframesInjected = true;
    }
  }, []); // Empty dependency array ensures this runs only once when the first Modal mounts

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      modalRef.current?.focus(); // Focus the modal when it opens
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Cierra si se hace clic en el overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1} // Permite enfocar el modal
        // The `transform` class enables GPU acceleration.
        // `scale-95` and `opacity-0` set the initial state for the animation (0% keyframe).
        // `transition-all` is kept as it might be used for other properties not handled by keyframes.
        // Removed 'animate-modalShow' as its definition is gone; animation is now via inline style.
        className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0"
        onClick={e => e.stopPropagation()} // Evita que el clic en el modal lo cierre
        style={{ 
          animationName: 'modalShowAnim', 
          animationDuration: '0.2s', // Matched duration from original animate-modalShow class
          animationTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Matched timing function
          animationFillMode: 'forwards' 
        }}
      >
        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
          <h3 id="modal-title" className="text-lg font-semibold text-neutral-800">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 text-sm text-neutral-600">
          {children}
        </div>

        <div className="flex justify-end space-x-3 p-5 bg-neutral-50 border-t border-neutral-200 rounded-b-xl">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-400 disabled:opacity-70 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2.5 text-sm font-medium text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-70 transition-colors ${confirmButtonClass} ${isLoading ? 'cursor-wait' : ''}`}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {confirmText}
          </button>
        </div>
      </div>
      {/* The <style jsx global> block has been removed */}
    </div>
  );
};
