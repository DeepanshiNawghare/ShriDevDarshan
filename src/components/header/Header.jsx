import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    Menu,
    X,
    Globe,
    BookOpen,
    Home,
    Sun,
    Music,
    ShoppingBag,
    Share2,
    Settings,
    ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

export default function Header() {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('English');

    const langDropdownRef = useRef(null);

    const languages = ['English', 'हिन्दी', 'ગુજરાતી', 'मराठी'];

    const navItems = [
        { name: 'Daily Darshan', path: '/daily-darshan', icon: Home },
        { name: 'Horoscope', path: '/horoscope', icon: Sun },
        { name: 'Aarti & Chalisa', path: '/aarti-chalisa', icon: Music },
        { name: 'Shop', path: '/shop', icon: ShoppingBag },
        { name: 'Share App', path: '/share', icon: Share2 },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    // Close language dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Stop background scroll when off-canvas is open
    useEffect(() => {
        if (isOffcanvasOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOffcanvasOpen]);

    return (
        <>
            {/* Main Header */}
            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/40">
                <div className="container mx-auto px-5">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo + Name */}
                        <Link to="/" className="flex items-center gap-3">
                            <img src={logo} alt="Shri Dev Darshan" className="h-10 lg:h-12 w-auto" />
                            <div className="hidden sm:block">
                                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Shri Dev Darshan
                                </h1>
                            </div>
                        </Link>

                        {/* Desktop Search */}
                        <div className="hidden lg:flex flex-1 max-w-2xl mx-10">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search temples, poojas or cities..."
                                    className="w-full pl-12 pr-6 py-3 bg-muted/60 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                        </div>

                        {/* Desktop Buttons */}
                        <div className="hidden lg:flex items-center gap-6">
                            <div className="relative" ref={langDropdownRef}>
                                <button
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className="flex items-center gap-2 px-5 py-3 bg-muted/60 hover:bg-muted rounded-xl transition text-sm font-medium"
                                >
                                    <Globe size={19} className="text-primary" />
                                    <span>{selectedLang}</span>
                                    <ChevronDown size={16} className={`transition ${isLangOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isLangOpen && (
                                    <div className="absolute top-full mt-2 right-0 w-48 bg-card border border-border rounded-xl shadow-2xl z-50">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => {
                                                    setSelectedLang(lang);
                                                    setIsLangOpen(false);
                                                }}
                                                className="w-full text-left px-5 py-3 hover:bg-primary/10 transition font-medium"
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/book-pooja"
                                className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:scale-105 transition flex items-center gap-2"
                            >
                                <BookOpen size={20} />
                                Book Pooja
                            </Link>
                        </div>

                        {/* Menu Button – Works on ALL devices */}
                        <button
                            onClick={() => setIsOffcanvasOpen(true)}
                            className="p-3 hover:bg-muted/60 rounded-xl transition"
                        >
                            <Menu size={30} className="text-foreground" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Off-Canvas – Visible on ALL devices */}
            {isOffcanvasOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setIsOffcanvasOpen(false)}
                    />

                    {/* Panel */}
                    <div className="relative w-full max-w-md bg-background h-full shadow-2xl flex flex-col">
                        {/* Top */}
                        <div className="flex items-center justify-between p-6 border-b border-border/50">
                            <div className="flex items-center gap-4">
                                <img src={logo} alt="Logo" className="h-12" />
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Shri Dev Darshan
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsOffcanvasOpen(false)}
                                className="p-3 hover:bg-muted rounded-xl"
                            >
                                <X size={26} />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="p-6 border-b border-border/30">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={22} />
                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="w-full pl-14 pr-6 py-4 bg-muted/60 border border-border rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none text-lg"
                                />
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-3 pb-32">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setIsOffcanvasOpen(false)}
                                        className="flex items-center gap-5 p-5 rounded-2xl hover:bg-primary/10 transition"
                                    >
                                        <div className="p-3.5 bg-primary/10 rounded-xl">
                                            <Icon size={26} className="text-primary" />
                                        </div>
                                        <span className="text-lg font-medium">{item.name}</span>
                                    </Link>
                                );
                            })}

                            <Link
                                to="/book-pooja"
                                onClick={() => setIsOffcanvasOpen(false)}
                                className="mt-8 flex justify-center gap-3 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-5 rounded-2xl shadow-xl"
                            >
                                <BookOpen size={26} />
                                Book Pooja Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}