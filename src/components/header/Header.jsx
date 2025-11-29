import React, { useState, useEffect } from 'react';
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
    LogIn,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import playstore from '../../assets/img/playstore.svg';
import applestore from '../../assets/img/applestore.svg';

import { Button, Input, IconButton, Dropdown } from '../ui';

export default function Header() {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('English');

    const languages = ['English', 'हिन्दी', 'ગુજરાતી', 'मराठी'];

    const navItems = [
        { name: 'Daily Darshan', path: '/daily-darshan', icon: Home },
        { name: 'Horoscope', path: '/horoscope', icon: Sun },
        { name: 'Aarti & Chalisa', path: '/aarti-chalisa', icon: Music },
        { name: 'Shop', path: '/shop', icon: ShoppingBag },
        { name: 'Share App', path: '/share', icon: Share2 },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

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
                        <div className="hidden lg:flex items-center gap-6">
                            <Dropdown
                                options={languages}
                                value={selectedLang}
                                onChange={setSelectedLang}
                                icon={Globe}
                            />

                            <Button
                                to="/book-pooja"
                                variant="primary"
                                size="sm"
                                icon={BookOpen}
                            >
                                Book Pooja
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

            {/* Off-Canvas – Visible on ALL devices */}
            {isOffcanvasOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setIsOffcanvasOpen(false)}
                    />

                    {/* Panel */}
                    <div className="relative w-full max-w-sm bg-background h-full shadow-2xl flex flex-col">
                        {/* Top */}
                        <div className="flex items-center justify-between p-6 border-b border-border/50">
                            <div className="flex items-center gap-4">
                                <img src={logo} alt="Logo" className="h-12" />
                                <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Shri Dev Darshan
                                </h2>
                            </div>
                            <IconButton
                                icon={X}
                                variant="muted"
                                size="md"
                                shape="rounded"
                                onClick={() => setIsOffcanvasOpen(false)}
                            />
                        </div>

                        {/* Search */}
                        <div className="p-4 border-b border-border/30">
                            <Input
                                type="text"
                                placeholder="Search anything..."
                                icon={Search}
                                size="lg"
                                shape="rounded"
                            />
                        </div>

                        {/* Links */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {navItems.map((item) => {
                                const Icon = item.icon;
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
                        </div>

                        <div className="p-4 border-b border-border/30">
                            <div className="relative">
                                <div>
                                    <h3 className="text-base font-bold text-primary my-2">Download Our App</h3>
                                    <div className="flex gap-4">
                                        <a
                                            href="https://play.google.com/store/apps/details?id=com.shridevdarshan"
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
                                </div>
                                <Button
                                    to="/book-pooja"
                                    variant="primary"
                                    size="lg"
                                    icon={LogIn}
                                    fullWidth
                                    onClick={() => setIsOffcanvasOpen(false)}
                                    className="mt-6"
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
