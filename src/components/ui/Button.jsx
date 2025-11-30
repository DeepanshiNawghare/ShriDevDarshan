import React from 'react';
import { Link } from 'react-router-dom';

const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-2xl hover:shadow-primary/60 transform hover:scale-105 transition-all duration-300',
    secondary: 'bg-gradient-to-r from-secondary to-orange-600 text-white font-bold shadow-2xl hover:shadow-secondary/60 transform hover:scale-105 transition-all duration-300',
    ghost: 'bg-muted/60 hover:bg-muted text-foreground transition font-medium',
    outline: 'border border-border bg-transparent hover:bg-muted/60 text-foreground transition font-medium',
};

const sizes = {
    sm: 'px-4 py-2 text-xs rounded-full',
    md: 'px-5 py-3 text-sm rounded-full',
    lg: 'px-6 py-4 text-base rounded-full',
    xl: 'px-8 py-5 text-base rounded-full',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    fullWidth = false,
    ...props
}) {
    const baseClasses = `
        inline-flex items-center justify-center gap-2
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const content = (
        <>
            {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 15 : size === 'lg' || size === 'xl' ? 24 : 18} />}
            {children}
            {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 15 : size === 'lg' || size === 'xl' ? 24 : 18} />}
        </>
    );

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

