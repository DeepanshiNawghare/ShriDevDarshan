// src/components/SubHeader.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PujaOffcanvas from '../sections/puja/PujaOffcanvas';

export default function SubHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPujaOffcanvasOpen, setIsPujaOffcanvasOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = [
        { name: 'Book Puja', image: '/img/icons/puja.png', action: () => setIsPujaOffcanvasOpen(true) },
        { name: 'Panchang', image: '/img/icons/panchang.png', path: '/panchang' },
        { name: 'Horoscope', image: '/img/icons/horoscope.png', path: '/horoscope' },
        { name: 'Kundli', image: '/img/icons/kundli.png', path: '/kundli' },
        { name: 'Matching', image: '/img/icons/matching.png', path: '/matching' },
        { name: 'Festivals', image: '/img/icons/festival.png', path: '/festivals' },
        { name: 'Chadhava', image: '/img/icons/chadhava.png', path: '/chadhava' },
        { name: 'Prasad', image: '/img/icons/prasad.png', path: '/prasad' },
        { name: 'Sahitya', image: '/img/icons/sahitya.png', path: '/sahitya' },
        { name: 'Aarti & Chalisa', image: '/img/icons/aarti-chalisa.png', path: '/aarti-chalisa' },
        { name: 'Temples', image: '/img/icons/temples.png', path: '/temples' },
        { name: 'Live Darshan', image: '/img/icons/live-darshan.png', path: '/live-darshan' },
        { name: 'Puja Shop', image: '/img/icons/puja-shop.png', path: '/shop' },
    ];

    return (
        <>
            <div
                className={`relative sticky top-15 z-40 bg-background/95 backdrop-blur shadow-md transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`} >
                <div className="container px-5">
                    <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

                        <div className="flex">
                            {categories.map((cat, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-1/3 md:w-1/6 lg:w-1/8 px-2"
                                >
                                    <Link
                                        to={cat.path || '#'}
                                        onClick={cat.action ? (e) => { e.preventDefault(); cat.action(); } : undefined}
                                        className="flex flex-col items-center group"
                                    >
                                        {/* Unified background container for image + text */}
                                        <div className={`
                                            bg-gradient-to-br from-primary to-secondary rounded-2xl p-3 
                                            hover:from-primary/70 hover:to-secondary/70
                                            transition-all duration-300
                                            flex flex-col items-center w-full
                                            ${isScrolled ? 'py-2 px-3' : 'py-3 px-4'}
                                        `}>
                                            {/* Image container */}
                                            <div className={`
                                                transition-all duration-300 overflow-hidden
                                                ${isScrolled ? 'h-0 w-0 opacity-0 mb-0' : 'h-10 w-10 mb-2'}
                                            `}>
                                                <img
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            {/* Text */}
                                            <span className="text-xs font-semibold text-white text-center leading-tight whitespace-nowrap">
                                                {cat.name}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                {/* Gradient Border Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
            </div>

            {/* Puja Offcanvas - Rendered outside the sticky container */}
            <PujaOffcanvas
                isOpen={isPujaOffcanvasOpen}
                onClose={() => setIsPujaOffcanvasOpen(false)}
            />
        </>
    );
}
