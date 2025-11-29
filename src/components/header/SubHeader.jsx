// src/components/SubHeader.jsx
import React, { useState, useEffect } from 'react';
import {
    Home, Sun, Music, BookOpen, Calendar,
    Sparkles, Heart, Church, Clock, Gift, Users, Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { IconButton } from '../ui';

export default function SubHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = [
        { name: 'Live Darshan', icon: Home, path: '/live-darshan' },
        { name: 'Horoscope', icon: Sun, path: '/horoscope' },
        { name: 'Aarti & Chalisa', icon: Music, path: '/aarti-chalisa' },
        { name: 'Book Puja', icon: BookOpen, path: '/book-puja' },
        { name: 'Panchang', icon: Calendar, path: '/panchang' },
        { name: 'Festivals', icon: Sparkles, path: '/festivals' },
        { name: 'Temples', icon: Church, path: '/temples' },
        { name: 'Donation', icon: Heart, path: '/donate' },
        { name: 'Aarti Timing', icon: Clock, path: '/aarti-timings' },
        { name: 'Puja Shop', icon: Gift, path: '/shop' },
        { name: 'Community', icon: Users, path: '/community' },
        { name: 'Alerts', icon: Bell, path: '/notifications' },
    ];

    return (
        <div
            className={`relative sticky top-15 z-40 bg-background/95 backdrop-blur shadow-md transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`} >
            <div className="container px-5">
                <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

                    <div className="flex">
                        {categories.map((cat, i) => {
                            const Icon = cat.icon;

                            return (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-1/4 md:w-1/6 px-3"
                                >
                                    <Link
                                        to={cat.path}
                                        className="flex flex-col items-center group"
                                    >
                                        <div className={`transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0 opacity-0 mb-0' : 'h-16'}`} >
                                            <IconButton
                                                icon={Icon}
                                                variant="primary"
                                                size="lg"
                                                shape="rounded"
                                                className="group-hover:bg-primary/20"
                                                as="div"
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-foreground/80 group-hover:text-primary text-center leading-tight">
                                            {cat.name}
                                        </span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
            {/* Gradient Border Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
        </div>
    );
}
