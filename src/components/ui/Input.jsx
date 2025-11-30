import React from 'react';

const variants = {
    default: 'bg-muted/60 border border-border focus:ring-2 focus:ring-primary/50',
    filled: 'bg-muted border-0 focus:ring-2 focus:ring-primary/50',
    outline: 'bg-transparent border border-border focus:border-primary focus:ring-2 focus:ring-primary/50',
};

const sizes = {
    sm: 'py-2 text-xs',
    md: 'py-2.5 text-sm',
    lg: 'py-3 text-base',
};

const shapes = {
    rounded: 'rounded-xl',
    pill: 'rounded-full',
    square: 'rounded-lg',
};

export default function Input({
    type = 'text',
    placeholder,
    variant = 'default',
    size = 'md',
    shape = 'pill',
    icon: Icon,
    iconPosition = 'left',
    className = '',
    fullWidth = true,
    ...props
}) {
    const hasIcon = !!Icon;
    const paddingLeft = hasIcon && iconPosition === 'left' ? 'pl-10' : 'pl-4';
    const paddingRight = hasIcon && iconPosition === 'right' ? 'pr-10' : 'pr-4';

    return (
        <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
            {Icon && iconPosition === 'left' && (
                <Icon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={size === 'sm' ? 15 : size === 'lg' ? 20 : 18}
                />
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={`
                    ${fullWidth ? 'w-full' : ''}
                    ${paddingLeft} ${paddingRight}
                    ${variants[variant] || variants.default}
                    ${sizes[size] || sizes.md}
                    ${shapes[shape] || shapes.pill}
                    text-foreground placeholder:text-muted-foreground
                    outline-none transition-all duration-200
                    ${className}
                `.trim().replace(/\s+/g, ' ')}
                {...props}
            />
            {Icon && iconPosition === 'right' && (
                <Icon
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={size === 'sm' ? 15 : size === 'lg' ? 20 : 18}
                />
            )}
        </div>
    );
}

