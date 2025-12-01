import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

const positions = {
    left: {
        panel: 'left-0 top-0 h-full w-80 max-w-[85vw]',
        translate: {
            open: 'translate-x-0',
            closed: '-translate-x-full',
        },
    },
    right: {
        panel: 'right-0 top-0 h-full w-80 max-w-[85vw]',
        translate: {
            open: 'translate-x-0',
            closed: 'translate-x-full',
        },
    },
    top: {
        panel: 'top-0 left-0 w-full h-auto max-h-[85vh]',
        translate: {
            open: 'translate-y-0',
            closed: '-translate-y-full',
        },
    },
    bottom: {
        panel: 'bottom-0 left-0 w-full h-auto max-h-[85vh]',
        translate: {
            open: 'translate-y-0',
            closed: 'translate-y-full',
        },
    },
};

const variants = {
    default: 'bg-card border-primary/20',
    glass: 'bg-card/90 backdrop-blur-xl border-primary/10',
    gradient: 'bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border-primary/20',
    solid: 'bg-card border-border',
};

export default function Offcanvas({
    isOpen = false,
    onClose,
    position = 'right',
    variant = 'default',
    showBackdrop = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    showCloseButton = true,
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

    const handleBackdropClick = () => {
        if (closeOnBackdropClick && onClose) {
            onClose();
        }
    };

    const positionConfig = positions[position] || positions.right;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`
                    fixed inset-0 z-[100] 
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'visible' : 'invisible pointer-events-none'}
                    ${showBackdrop ? (isOpen ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent') : ''}
                    ${backdropClassName}
                `.trim().replace(/\s+/g, ' ')}
                onClick={handleBackdropClick}
                aria-hidden="true"
            />

            {/* Offcanvas Panel */}
            <div
                className={`
                    fixed z-[110]
                    ${positionConfig.panel}
                    ${isOpen ? positionConfig.translate.open : positionConfig.translate.closed}
                    ${variants[variant] || variants.default}
                    border shadow-2xl
                    transition-transform duration-300 ease-in-out
                    flex flex-col
                    ${className}
                `.trim().replace(/\s+/g, ' ')}
                role="dialog"
                aria-modal={isOpen}
                inert={!isOpen || undefined}
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
        </>
    );
}

// Sub-component for Offcanvas Header
Offcanvas.Header = function OffcanvasHeader({ children, className = '' }) {
    return (
        <div className={`p-6 pb-4 border-b border-border/50 ${className}`}>
            {children}
        </div>
    );
};

// Sub-component for Offcanvas Title
Offcanvas.Title = function OffcanvasTitle({ children, variant = 'primary', className = '' }) {
    const gradients = {
        primary: 'from-primary to-secondary',
        secondary: 'from-secondary to-orange-700',
    };

    return (
        <h3 className={`text-lg lg:text-2xl font-bold bg-gradient-to-r ${gradients[variant]} bg-clip-text text-transparent ${className}`}>
            {children}
        </h3>
    );
};

// Sub-component for Offcanvas Body
Offcanvas.Body = function OffcanvasBody({ children, className = '' }) {
    return (
        <div className={`flex-1 overflow-y-auto p-6 ${className}`}>
            {children}
        </div>
    );
};

// Sub-component for Offcanvas Footer
Offcanvas.Footer = function OffcanvasFooter({ children, className = '' }) {
    return (
        <div className={`p-6 pt-4 border-t border-border/50 ${className}`}>
            {children}
        </div>
    );
};

