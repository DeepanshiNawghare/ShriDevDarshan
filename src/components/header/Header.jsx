import React, { useState, useEffect } from 'react';
import {
    Search,
    Menu,
    X,
    Globe,
    Home,
    Sun,
    Moon,
    Music,
    ShoppingBag,
    Share2,
    Settings,
    LogIn,
    TicketCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import playstore from '../../assets/img/playstore.svg';
import applestore from '../../assets/img/applestore.svg';

import { Button, Input, IconButton, Dropdown, Offcanvas } from '../ui';
import PujaOffcanvas from '../sections/puja/PujaOffcanvas';

export default function Header() {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [isPujaOffcanvasOpen, setIsPujaOffcanvasOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('English');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const languages = ['English', 'हिन्दी', 'ગુજરાતી', 'मराठी'];

    // Initialize dark mode from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

    const navItems = [
        { name: 'Daily Darshan', path: '/daily-darshan', icon: Home },
        { name: 'All Pujas', path: null, icon: TicketCheck, action: () => { setIsOffcanvasOpen(false); setIsPujaOffcanvasOpen(true); } },
        { name: 'Horoscope', path: '/horoscope', icon: Sun },
        { name: 'Aarti & Chalisa', path: '/aarti-chalisa', icon: Music },
        { name: 'Shop', path: '/shop', icon: ShoppingBag },
        { name: 'Share App', path: '/share', icon: Share2 },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <>
            {/* Main Header */}
            <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/40">
                <div className="container px-5">
                    <div className="flex items-center justify-between h-15">

                        {/* Logo + Name */}
                        <Link to="/" className="flex items-center gap-3">
                            <img src={logo} alt="Shri Dev Darshan" className="h-10 lg:h-12 w-auto" />
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Shri Dev Darshan
                                </h1>
                            </div>
                        </Link>

                        {/* Desktop Search */}
                        <div className="hidden lg:flex flex-1 max-w-2xl mx-10">
                            <Input
                                type="text"
                                placeholder="Search temples, poojas or cities..."
                                icon={Search}
                                size="sm"
                                shape="pill"
                            />
                        </div>

                        {/* Desktop Buttons */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Dropdown
                                options={languages}
                                value={selectedLang}
                                onChange={setSelectedLang}
                                icon={Globe}
                            />

                            {/* Dark Mode Toggle */}
                            <IconButton
                                icon={isDarkMode ? Sun : Moon}
                                variant="ghost"
                                size="md"
                                shape="rounded"
                                onClick={toggleDarkMode}
                                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            />

                            <Button
                                onClick={() => setIsPujaOffcanvasOpen(true)}
                                variant="primary"
                                size="sm"
                                icon={TicketCheck}
                            >
                                Book Puja
                            </Button>
                        </div>

                        {/* Menu Button – Works on ALL devices */}
                        <IconButton
                            icon={Menu}
                            variant="ghost"
                            size="md"
                            shape="rounded"
                            onClick={() => setIsOffcanvasOpen(true)}
                            className="ml-5"
                        />
                    </div>
                </div>
            </header>

            {/* Off-Canvas Menu */}
            <Offcanvas
                isOpen={isOffcanvasOpen}
                onClose={() => setIsOffcanvasOpen(false)}
                position="right"
                variant="default"
                showCloseButton={false}
                className="w-full max-w-sm"
            >
                {/* Header */}
                <Offcanvas.Header className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="Logo" className="h-12" />
                        <Offcanvas.Title>Shri Dev Darshan</Offcanvas.Title>
                    </div>
                    <IconButton
                        icon={X}
                        variant="muted"
                        size="md"
                        shape="rounded"
                        onClick={() => setIsOffcanvasOpen(false)}
                    />
                </Offcanvas.Header>

                {/* Search + Dark Mode Toggle */}
                <div className="px-6 py-4 border-b border-border/30 space-y-4">
                    <Input
                        type="text"
                        placeholder="Search anything..."
                        icon={Search}
                        size="lg"
                        shape="rounded"
                    />

                    {/* Dark Mode Toggle for Mobile */}
                    <button
                        onClick={toggleDarkMode}
                        className="flex items-center justify-between w-full p-3 rounded-xl bg-muted/50 hover:bg-muted transition"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                {isDarkMode ? <Sun size={18} className="text-primary" /> : <Moon size={18} className="text-primary" />}
                            </div>
                            <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                    </button>
                </div>

                {/* Navigation Links */}
                <Offcanvas.Body className="space-y-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        // If item has action, render as button
                        if (item.action) {
                            return (
                                <button
                                    key={item.name}
                                    onClick={item.action}
                                    className="flex items-center gap-5 rounded-2xl hover:bg-primary/10 transition p-2 w-full text-left"
                                >
                                    <div className="p-2 bg-primary/10 rounded-xl">
                                        <Icon size={18} className="text-primary" />
                                    </div>
                                    <span className="text-base font-medium">{item.name}</span>
                                </button>
                            );
                        }

                        // Otherwise render as Link
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOffcanvasOpen(false)}
                                className="flex items-center gap-5 rounded-2xl hover:bg-primary/10 transition p-2"
                            >
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <Icon size={18} className="text-primary" />
                                </div>
                                <span className="text-base font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </Offcanvas.Body>

                {/* Footer */}
                <Offcanvas.Footer>
                    <h3 className="text-base font-bold text-primary mb-3">Download Our App</h3>
                    <div className="flex gap-4">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.fovtysolutions.devdarshan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block transform hover:scale-105 transition-all duration-300"
                        >
                            <img src={playstore} alt="Google Play Store" className="h-12 w-auto" />
                        </a>
                        <a
                            href="https://apps.apple.com/app/shridevdarshan/id123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block transform hover:scale-105 transition-all duration-300"
                        >
                            <img src={applestore} alt="App Store" className="h-12 w-auto" />
                        </a>
                    </div>
                    <Button
                        to="/login"
                        variant="primary"
                        size="lg"
                        icon={LogIn}
                        fullWidth
                        onClick={() => setIsOffcanvasOpen(false)}
                        className="mt-6"
                    >
                        Login
                    </Button>
                </Offcanvas.Footer>
            </Offcanvas>

            {/* Puja Offcanvas */}
            <PujaOffcanvas
                isOpen={isPujaOffcanvasOpen}
                onClose={() => setIsPujaOffcanvasOpen(false)}
            />
        </>
    );
}
