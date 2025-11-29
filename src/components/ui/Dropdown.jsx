import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Dropdown({
    options = [],
    value,
    onChange,
    placeholder = 'Select...',
    icon: Icon,
    className = '',
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange?.(option);
        setIsOpen(false);
    };

    const displayValue = value || placeholder;

    return (
        <div className={`relative ${className}`} ref={dropdownRef} {...props}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-5 py-2 bg-muted/60 hover:bg-muted rounded-xl transition text-xs font-medium"
            >
                {Icon && <Icon size={18} className="text-primary" />}
                <span>{displayValue}</span>
                <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                    {options.map((option, index) => {
                        const optionValue = typeof option === 'object' ? option.value : option;
                        const optionLabel = typeof option === 'object' ? option.label : option;

                        return (
                            <button
                                key={index}
                                onClick={() => handleSelect(optionValue)}
                                className={`
                                    w-full text-left px-5 py-2.5 
                                    hover:bg-primary/10 transition 
                                    font-medium text-sm
                                    ${value === optionValue ? 'bg-primary/10 text-primary' : ''}
                                `}
                            >
                                {optionLabel}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

