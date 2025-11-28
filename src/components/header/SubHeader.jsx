import React, { useState, useEffect } from 'react';
import {
    Home,
    Sun,
    Music,
    BookOpen,
    Calendar,
    Sparkles,
    Heart,
    Church,
    Clock,
    Gift,
    Users,
    Bell,
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
        { name: 'Book Pooja', icon: BookOpen, path: '/book-pooja' },
        { name: 'Panchang', icon: Calendar, path: '/panchang' },
        { name: 'Festivals', icon: Sparkles, path: '/festivals' },
        { name: 'Temples', icon: Church, path: '/temples' },
        { name: 'Donation', icon: Heart, path: '/donate' },
        { name: 'Aarti Timing', icon: Clock, path: '/aarti-timings' },
        { name: 'Pooja Shop', icon: Gift, path: '/shop' },
        { name: 'Community', icon: Users, path: '/community' },
        { name: 'Alerts', icon: Bell, path: '/notifications' },
    ];

    return (
        <div
            className={`sticky top-16 lg:top-20 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40 shadow-md transition-all duration-300 ease-out ${isScrolled ? 'py-2' : 'py-4'}`} >
            <div className="container mx-auto px-5">
                <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex gap-4 md:gap-6 lg:gap-8 min-w-full">
                        {categories.map((cat, i) => {
                            const Icon = cat.icon;

                            return (
                                <Link
                                    key={i}
                                    to={cat.path}
                                    className="flex flex-col items-center group flex-shrink-0 transition-all duration-300 basis-1/4 md:basis-1/6 lg:basis-1/6 max-w-[120px]">
                                    {/* Icon wrapper – fixed height keeps layout stable */}
                                    <div
                                        className={`flex flex-col items-center justify-center transition-all duration-300`}
                                        style={{ height: isScrolled ? 0 : 72, overflow: 'hidden' }}
                                    >
                                        <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                                            <Icon size={28} className="text-primary" />
                                        </div>
                                    </div>

                                    {/* Text – stays in place, visually moves into icon space */}
                                    <span
                                        className={`
                    font-semibold text-foreground/80 group-hover:text-primary
                    transition-all duration-300 whitespace-nowrap text-center text-xs
                  `}
                                    >
                                        {cat.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
