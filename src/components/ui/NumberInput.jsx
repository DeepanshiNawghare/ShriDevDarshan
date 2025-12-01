import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const variants = {
    default: 'bg-muted/60 border border-border focus-within:ring-2 focus-within:ring-primary/50',
    filled: 'bg-muted border-0 focus-within:ring-2 focus-within:ring-primary/50',
    outline: 'bg-transparent border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50',
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

export default function NumberInput({
    value = 1,
    onChange,
    min = 1,
    max = 99,
    step = 1,
    placeholder,
    variant = 'default',
    size = 'md',
    shape = 'rounded',
    icon: Icon,
    iconPosition = 'left',
    label,
    className = '',
    fullWidth = true,
    disabled = false,
    ...props
}) {
    const hasIcon = !!Icon;
    const paddingLeft = hasIcon && iconPosition === 'left' ? 'pl-10' : 'pl-4';

    const handleIncrement = () => {
        if (disabled) return;
        const newValue = Math.min(max, Number(value) + step);
        onChange?.({ target: { name: props.name, value: newValue } });
    };

    const handleDecrement = () => {
        if (disabled) return;
        const newValue = Math.max(min, Number(value) - step);
        onChange?.({ target: { name: props.name, value: newValue } });
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        if (newValue === '') {
            onChange?.({ target: { name: props.name, value: '' } });
            return;
        }
        const numValue = Number(newValue);
        if (!isNaN(numValue)) {
            const clampedValue = Math.min(max, Math.max(min, numValue));
            onChange?.({ target: { name: props.name, value: clampedValue } });
        }
    };

    const handleBlur = (e) => {
        if (e.target.value === '' || isNaN(Number(e.target.value))) {
            onChange?.({ target: { name: props.name, value: min } });
        }
        props.onBlur?.(e);
    };

    return (
        <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-foreground mb-1.5">
                    {label}
                </label>
            )}
            <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
                {/* Left Icon */}
                {Icon && iconPosition === 'left' && (
                    <Icon
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={size === 'sm' ? 15 : size === 'lg' ? 20 : 18}
                    />
                )}

                {/* Input */}
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                    className={`
                        ${fullWidth ? 'w-full' : ''}
                        ${paddingLeft} pr-10
                        ${variants[variant] || variants.default}
                        ${sizes[size] || sizes.md}
                        ${shapes[shape] || shapes.rounded}
                        text-foreground placeholder:text-muted-foreground
                        outline-none transition-all duration-200
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `.trim().replace(/\s+/g, ' ')}
                    {...props}
                />

                {/* Custom Spinner Buttons */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
                    <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={disabled || Number(value) >= max}
                        className="flex items-center justify-center w-6 h-4 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-t transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-muted-foreground disabled:hover:bg-transparent"
                        aria-label="Increase"
                        tabIndex={-1}
                    >
                        <ChevronUp size={14} strokeWidth={2.5} />
                    </button>
                    <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={disabled || Number(value) <= min}
                        className="flex items-center justify-center w-6 h-4 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-b transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-muted-foreground disabled:hover:bg-transparent"
                        aria-label="Decrease"
                        tabIndex={-1}
                    >
                        <ChevronDown size={14} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}

