import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

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

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function DateInput({
    value = '',
    onChange,
    placeholder = 'Select date',
    variant = 'default',
    size = 'md',
    shape = 'rounded',
    icon: Icon = Calendar,
    iconPosition = 'left',
    label,
    className = '',
    fullWidth = true,
    disabled = false,
    minDate,
    maxDate,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(() => {
        if (value) return new Date(value);
        return new Date();
    });
    const containerRef = useRef(null);

    const hasIcon = !!Icon;
    const paddingLeft = hasIcon && iconPosition === 'left' ? 'pl-10' : 'pl-4';
    const paddingRight = 'pr-4';

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update viewDate when value changes
    useEffect(() => {
        if (value) {
            setViewDate(new Date(value));
        }
    }, [value]);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDisplayDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = MONTHS[date.getMonth()].slice(0, 3);
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const handleDateSelect = (day) => {
        const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        const formattedDate = formatDate(selectedDate);
        onChange?.({ target: { name: props.name, value: formattedDate } });
        setIsOpen(false);
    };

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const isDateDisabled = (day) => {
        const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        if (minDate && date < new Date(minDate)) return true;
        if (maxDate && date > new Date(maxDate)) return true;
        return false;
    };

    const isToday = (day) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            viewDate.getMonth() === today.getMonth() &&
            viewDate.getFullYear() === today.getFullYear()
        );
    };

    const isSelected = (day) => {
        if (!value) return false;
        const selected = new Date(value);
        return (
            day === selected.getDate() &&
            viewDate.getMonth() === selected.getMonth() &&
            viewDate.getFullYear() === selected.getFullYear()
        );
    };

    const renderCalendar = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        // Empty cells for days before the first day of month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-9 h-9" />);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const disabled = isDateDisabled(day);
            const today = isToday(day);
            const selected = isSelected(day);

            days.push(
                <button
                    key={day}
                    type="button"
                    onClick={() => !disabled && handleDateSelect(day)}
                    disabled={disabled}
                    className={`
                        w-9 h-9 rounded-lg text-sm font-medium
                        transition-all duration-200
                        ${selected
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                            : today
                                ? 'bg-primary/10 text-primary font-bold'
                                : 'text-foreground hover:bg-primary/10 hover:text-primary'
                        }
                        ${disabled ? 'opacity-30 cursor-not-allowed hover:bg-transparent hover:text-foreground' : 'cursor-pointer'}
                    `.trim().replace(/\s+/g, ' ')}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <div className={`${fullWidth ? 'w-full' : ''} ${className}`} ref={containerRef}>
            {label && (
                <label className="block text-sm font-medium text-foreground mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {/* Left Icon */}
                {Icon && iconPosition === 'left' && (
                    <Icon
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10"
                        size={size === 'sm' ? 15 : size === 'lg' ? 20 : 18}
                    />
                )}

                {/* Input Display */}
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`
                        ${fullWidth ? 'w-full' : ''}
                        ${paddingLeft} ${paddingRight}
                        ${variants[variant] || variants.default}
                        ${sizes[size] || sizes.md}
                        ${shapes[shape] || shapes.rounded}
                        text-left
                        ${value ? 'text-foreground' : 'text-muted-foreground'}
                        outline-none transition-all duration-200
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `.trim().replace(/\s+/g, ' ')}
                >
                    {value ? formatDisplayDate(value) : placeholder}
                </button>

                {/* Calendar Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 z-50 bg-card border border-border rounded-2xl shadow-2xl p-4 min-w-[280px] animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                type="button"
                                onClick={handlePrevMonth}
                                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <h4 className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                            </h4>
                            <button
                                type="button"
                                onClick={handleNextMonth}
                                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {DAYS.map((day) => (
                                <div
                                    key={day}
                                    className="w-9 h-8 flex items-center justify-center text-xs font-semibold text-muted-foreground"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {renderCalendar()}
                        </div>

                        {/* Today Button */}
                        <div className="mt-3 pt-3 border-t border-border">
                            <button
                                type="button"
                                onClick={() => {
                                    const today = new Date();
                                    setViewDate(today);
                                    handleDateSelect(today.getDate());
                                }}
                                className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                            >
                                Today
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

