import React from 'react';

const variants = {
    default: 'bg-card border border-primary/20 hover:border-primary/40',
    secondary: 'bg-card border border-secondary/20 hover:border-secondary/40',
    glass: 'bg-card/90 backdrop-blur-xl border border-primary/10',
    gradient: 'bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/20',
    solid: 'bg-card border border-border',
};

const gradientBorders = {
    primary: 'bg-gradient-to-r from-primary to-secondary',
    secondary: 'bg-gradient-to-r from-secondary to-orange-600',
    none: '',
};

export default function Card({
    children,
    variant = 'default',
    gradientBorder = 'none',
    hover = false,
    className = '',
    padding = 'p-4 md:p-6 lg:p-8',
    ...props
}) {
    return (
        <div
            className={`
                relative rounded-3xl shadow-2xl overflow-hidden
                transition-all duration-500
                ${variants[variant] || variants.default}
                ${hover ? 'hover:-translate-y-3' : ''}
                ${className}
            `.trim().replace(/\s+/g, ' ')}
            {...props}
        >
            {/* Gradient Top Border */}
            {gradientBorder !== 'none' && (
                <div className={`absolute top-0 inset-x-0 h-1.5 ${gradientBorders[gradientBorder]}`} />
            )}

            {/* Card Content */}
            <div className={padding}>
                {children}
            </div>
        </div>
    );
}

// Sub-component for Card Header
Card.Header = function CardHeader({ children, className = '' }) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
};

// Sub-component for Card Title
Card.Title = function CardTitle({ children, variant = 'primary', className = '' }) {
    const gradients = {
        primary: 'from-primary to-secondary',
        secondary: 'from-secondary to-orange-700',
    };

    return (
        <h3 className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${gradients[variant]} bg-clip-text text-transparent ${className}`}>
            {children}
        </h3>
    );
};

// Sub-component for Card Description
Card.Description = function CardDescription({ children, className = '' }) {
    return (
        <p className={`text-sm lg:text-base text-muted-foreground leading-relaxed ${className}`}>
            {children}
        </p>
    );
};

// Sub-component for Card Content
Card.Content = function CardContent({ children, className = '' }) {
    return <div className={className}>{children}</div>;
};

// Sub-component for Card Footer
Card.Footer = function CardFooter({ children, className = '' }) {
    return <div className={`mt-4 ${className}`}>{children}</div>;
};

