import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';

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

export default function TimeInput({
    value = '',
    onChange,
    placeholder = 'Select time',
    variant = 'default',
    size = 'md',
    shape = 'rounded',
    icon: Icon = Clock,
    iconPosition = 'left',
    label,
    className = '',
    fullWidth = true,
    disabled = false,
    use24Hour = false,
    minuteStep = 5,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [hours, setHours] = useState(12);
    const [minutes, setMinutes] = useState(0);
    const [period, setPeriod] = useState('AM');
    const containerRef = useRef(null);
    const hoursRef = useRef(null);
    const minutesRef = useRef(null);

    const hasIcon = !!Icon;
    const paddingLeft = hasIcon && iconPosition === 'left' ? 'pl-10' : 'pl-4';
    const paddingRight = 'pr-4';

    // Parse value on mount and when value changes
    useEffect(() => {
        if (value) {
            const [h, m] = value.split(':').map(Number);
            if (use24Hour) {
                setHours(h);
                setMinutes(m);
            } else {
                const isPM = h >= 12;
                setHours(h === 0 ? 12 : h > 12 ? h - 12 : h);
                setMinutes(m);
                setPeriod(isPM ? 'PM' : 'AM');
            }
        }
    }, [value, use24Hour]);

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

    const formatTime = (h, m, p) => {
        let hour24 = h;
        if (!use24Hour) {
            if (p === 'AM') {
                hour24 = h === 12 ? 0 : h;
            } else {
                hour24 = h === 12 ? 12 : h + 12;
            }
        }
        return `${String(hour24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    const formatDisplayTime = (timeStr) => {
        if (!timeStr) return '';
        const [h, m] = timeStr.split(':').map(Number);
        if (use24Hour) {
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        }
        const isPM = h >= 12;
        const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
        return `${hour12}:${String(m).padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
    };

    const handleTimeChange = (newHours, newMinutes, newPeriod) => {
        const formattedTime = formatTime(newHours, newMinutes, newPeriod);
        onChange?.({ target: { name: props.name, value: formattedTime } });
    };

    const incrementHours = () => {
        const maxHours = use24Hour ? 23 : 12;
        const minHours = use24Hour ? 0 : 1;
        const newHours = hours >= maxHours ? minHours : hours + 1;
        setHours(newHours);
        handleTimeChange(newHours, minutes, period);
    };

    const decrementHours = () => {
        const maxHours = use24Hour ? 23 : 12;
        const minHours = use24Hour ? 0 : 1;
        const newHours = hours <= minHours ? maxHours : hours - 1;
        setHours(newHours);
        handleTimeChange(newHours, minutes, period);
    };

    const incrementMinutes = () => {
        const newMinutes = minutes + minuteStep >= 60 ? 0 : minutes + minuteStep;
        setMinutes(newMinutes);
        handleTimeChange(hours, newMinutes, period);
    };

    const decrementMinutes = () => {
        const newMinutes = minutes - minuteStep < 0 ? 60 - minuteStep : minutes - minuteStep;
        setMinutes(newMinutes);
        handleTimeChange(hours, newMinutes, period);
    };

    const togglePeriod = () => {
        const newPeriod = period === 'AM' ? 'PM' : 'AM';
        setPeriod(newPeriod);
        handleTimeChange(hours, minutes, newPeriod);
    };

    const handleQuickTime = (h, m, p) => {
        setHours(h);
        setMinutes(m);
        setPeriod(p);
        handleTimeChange(h, m, p);
        setIsOpen(false);
    };

    const quickTimes = [
        { label: 'Morning', time: '6:00 AM', h: 6, m: 0, p: 'AM' },
        { label: 'Mid Morning', time: '9:00 AM', h: 9, m: 0, p: 'AM' },
        { label: 'Noon', time: '12:00 PM', h: 12, m: 0, p: 'PM' },
        { label: 'Afternoon', time: '3:00 PM', h: 3, m: 0, p: 'PM' },
        { label: 'Evening', time: '6:00 PM', h: 6, m: 0, p: 'PM' },
    ];

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
                    {value ? formatDisplayTime(value) : placeholder}
                </button>

                {/* Time Picker Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 z-50 bg-card border border-border rounded-2xl shadow-2xl p-4 min-w-[280px] animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Time Spinners */}
                        <div className="flex items-center justify-center gap-3 mb-4">
                            {/* Hours */}
                            <div className="flex items-center gap-1 bg-muted/50 rounded-xl px-3 py-2">
                                <div
                                    ref={hoursRef}
                                    className="w-10 h-10 flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                                >
                                    {String(hours).padStart(2, '0')}
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        type="button"
                                        onClick={incrementHours}
                                        className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                                    >
                                        <ChevronUp size={12} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={decrementHours}
                                        className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                                    >
                                        <ChevronDown size={12} />
                                    </button>
                                </div>
                            </div>

                            {/* Separator */}
                            <div className="text-2xl font-bold text-primary">:</div>

                            {/* Minutes */}
                            <div className="flex items-center gap-1 bg-muted/50 rounded-xl px-3 py-2">
                                <div
                                    ref={minutesRef}
                                    className="w-10 h-10 flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                                >
                                    {String(minutes).padStart(2, '0')}
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        type="button"
                                        onClick={incrementMinutes}
                                        className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                                    >
                                        <ChevronUp size={12} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={decrementMinutes}
                                        className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                                    >
                                        <ChevronDown size={12} />
                                    </button>
                                </div>
                            </div>

                            {/* AM/PM Toggle */}
                            {!use24Hour && (
                                <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-secondary rounded-xl px-3 py-2 shadow-lg shadow-primary/30">
                                    <div className="w-10 h-10 flex items-center justify-center text-lg font-bold text-white">
                                        {period}
                                    </div>
                                    <div className="flex flex-col">
                                        <button
                                            type="button"
                                            onClick={togglePeriod}
                                            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                                        >
                                            <ChevronUp size={12} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={togglePeriod}
                                            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                                        >
                                            <ChevronDown size={12} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Time Selection */}
                        <div className="border-t border-border pt-3">
                            <p className="text-xs text-muted-foreground mb-2 text-center">Quick Select</p>
                            <div className="grid grid-cols-3 gap-2">
                                {quickTimes.map((qt) => (
                                    <button
                                        key={qt.label}
                                        type="button"
                                        onClick={() => handleQuickTime(qt.h, qt.m, qt.p)}
                                        className="px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                                    >
                                        {qt.time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Done Button */}
                        <div className="mt-3 pt-3 border-t border-border">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-2 text-sm font-bold bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-200"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

