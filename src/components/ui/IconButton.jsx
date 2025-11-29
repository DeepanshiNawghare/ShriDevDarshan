import React from 'react';
import { Link } from 'react-router-dom';

const variants = {
    glass: 'bg-white/20 backdrop-blur-lg hover:bg-white/40 text-white',
    muted: 'bg-muted/60 hover:bg-muted text-foreground',
    primary: 'bg-primary/10 hover:bg-primary/20 text-primary',
    ghost: 'hover:bg-muted/60 text-foreground',
    social: 'bg-background/10 hover:bg-primary hover:text-foreground text-current',
};

const sizes = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
};

const shapes = {
    circle: 'rounded-full',
    rounded: 'rounded-xl',
    square: 'rounded-lg',
};

export default function IconButton({
    icon: Icon,
    iconSize,
    variant = 'muted',
    size = 'md',
    shape = 'circle',
    to,
    href,
    className = '',
    ...props
}) {
    // Determine icon size based on button size if not explicitly provided
    const getIconSize = () => {
        if (iconSize) return iconSize;
        switch (size) {
            case 'sm': return 16;
            case 'lg': return 24;
            default: return 20;
        }
    };

    const baseClasses = `
        inline-flex items-center justify-center
        transition-all duration-300
        ${variants[variant] || variants.muted}
        ${sizes[size] || sizes.md}
        ${shapes[shape] || shapes.circle}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const content = Icon ? <Icon size={getIconSize()} /> : null;

    // If 'to' prop is provided, render as React Router Link
    if (to) {
        return (
            <Link to={to} className={baseClasses} {...props}>
                {content}
            </Link>
        );
    }

    // If 'href' prop is provided, render as anchor tag
    if (href) {
        return (
            <a href={href} className={baseClasses} {...props}>
                {content}
            </a>
        );
    }

    // Default: render as button
    return (
        <button className={baseClasses} {...props}>
            {content}
        </button>
    );
}

