import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]',
};

const variants = {
    default: 'bg-white dark:bg-gray-900 border-primary/20',
    glass: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-primary/10',
    gradient: 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20',
    solid: 'bg-card border-border',
};

export default function Modal({
    isOpen = false,
    onClose,
    size = 'md',
    variant = 'default',
    showBackdrop = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    centered = true,
    className = '',
    backdropClassName = '',
    children,
    ...props
}) {
    // Handle Escape key
    const handleEscapeKey = useCallback(
        (e) => {
            if (e.key === 'Escape' && closeOnEscape && onClose) {
                onClose();
            }
        },
        [closeOnEscape, onClose]
    );

    // Add/Remove event listeners & prevent body scroll
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleEscapeKey]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && closeOnBackdropClick && onClose) {
            onClose();
        }
    };

    return (
        <>
            {/* Backdrop + Centering Container */}
            <div
                className={`
                    fixed inset-0 z-[200]
                    transition-all duration-300 ease-out
                    ${isOpen ? 'visible' : 'invisible pointer-events-none'}
                    ${showBackdrop ? (isOpen ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent') : ''}
                    ${centered ? 'flex items-center justify-center' : 'flex items-start justify-center pt-10'}
                    p-4
                    ${backdropClassName}
                `.trim().replace(/\s+/g, ' ')}
                onClick={handleBackdropClick}
                aria-hidden={!isOpen}
            >
                {/* Modal Panel */}
                <div
                    className={`
                        relative w-full
                        ${sizes[size] || sizes.md}
                        ${variants[variant] || variants.default}
                        border rounded-3xl shadow-2xl
                        transition-all duration-300 ease-out
                        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
                        flex flex-col
                        max-h-[90vh]
                        ${className}
                    `.trim().replace(/\s+/g, ' ')}
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => e.stopPropagation()}
                    {...props}
                >
                    {/* Close Button */}
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted transition-colors z-10"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>
                    )}

                    {children}
                </div>
            </div>
        </>
    );
}

// Sub-component for Modal Header
Modal.Header = function ModalHeader({ children, className = '' }) {
    return (
        <div className={`p-6 pb-4 border-b border-border/50 ${className}`}>
            {children}
        </div>
    );
};

// Sub-component for Modal Title
Modal.Title = function ModalTitle({ children, variant = 'primary', className = '' }) {
    const gradients = {
        primary: 'from-primary to-secondary',
        secondary: 'from-secondary to-orange-700',
    };

    return (
        <h3 className={`text-xl lg:text-2xl font-bold bg-gradient-to-r ${gradients[variant]} bg-clip-text text-transparent pr-8 ${className}`}>
            {children}
        </h3>
    );
};

// Sub-component for Modal Description
Modal.Description = function ModalDescription({ children, className = '' }) {
    return (
        <p className={`text-sm text-muted-foreground mt-1 ${className}`}>
            {children}
        </p>
    );
};

// Sub-component for Modal Body
Modal.Body = function ModalBody({ children, className = '' }) {
    return (
        <div className={`flex-1 overflow-y-auto p-6 ${className}`}>
            {children}
        </div>
    );
};

// Sub-component for Modal Footer
Modal.Footer = function ModalFooter({ children, className = '' }) {
    return (
        <div className={`p-6 pt-4 border-t border-border/50 flex items-center justify-end gap-3 ${className}`}>
            {children}
        </div>
    );
};

