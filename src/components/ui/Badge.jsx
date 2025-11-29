import React from 'react';

const variants = {
    live: 'bg-red-600 text-white',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-foreground',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-500 text-foreground',
    muted: 'bg-muted text-muted-foreground',
};

const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
};

export default function Badge({
    children,
    variant = 'primary',
    size = 'md',
    pulse = false,
    icon: Icon,
    className = '',
    ...props
}) {
    return (
        <span
            className={`
                inline-flex items-center gap-2
                rounded-full font-bold shadow-2xl
                ${variants[variant] || variants.primary}
                ${sizes[size] || sizes.md}
                ${className}
            `.trim().replace(/\s+/g, ' ')}
            {...props}
        >
            {/* Pulse indicator for live badges */}
            {pulse && (
                <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 h-2 w-2 bg-white rounded-full animate-ping" />
                    <span className="relative h-2 w-2 bg-white rounded-full" />
                </span>
            )}
            {Icon && <Icon size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />}
            {children}
        </span>
    );
}

// Preset Live Badge
Badge.Live = function LiveBadge({ children = 'LIVE NOW', className = '', ...props }) {
    return (
        <Badge variant="live" pulse className={className} {...props}>
            {children}
        </Badge>
    );
};

