// HeroSection.jsx
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { TicketCheck, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Button, Card, Badge, IconButton } from '../ui';
import PujaOffcanvas from './puja/PujaOffcanvas';

const pujaSlides = [
    { img: '/img/puja/mangalnath.png', title: 'Mangal Bhat Puja', sub: 'Mangalik Dosha' },
    { img: '/img/puja/kaalsarpdosh.png', title: 'Kaalsarpdosh Puja', sub: 'Kaalsarpdosh Dosha' },
    { img: '/img/puja/rudrabhishek.jpg', title: 'Rudrabhishek Puja', sub: 'Rudrabhishek Puja' },
];

const darshanSlides = [
    { img: '/img/darshan/mahakaleshwar-jyotirlinga.jpg', title: 'Mahakaleshwar Jyotirling', sub: 'Bhasma Aarti • LIVE' },
    { img: '/img/darshan/somnath-jyotirlinga.png', title: 'Somnath Jyotirling', sub: 'Shiva Puja • LIVE' },
    { img: '/img/darshan/dwarkadhish-temple.png', title: 'Dwarkadhish Temple', sub: 'Evening Aarti • LIVE' },
];

export default function HeroSection() {
    const [isPujaOffcanvasOpen, setIsPujaOffcanvasOpen] = useState(false);

    return (
        <section className="container mx-auto px-5 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="order-1 lg:order-2 lg:col-span-6">
                    <div className="text-center space-y-10">
                        <Card variant="gradient" padding="p-10 lg:p-16" className="mb-2 sm:mb-12">
                            <div className="text-sm font-black bg-gradient-to-r from-primary via-secondary to-orange-700 bg-clip-text text-transparent mb-2 flex items-center justify-center">
                                {/* <span>जय श्री महाकाल</span> */}
                                <img src="/img/jai-shree-mahakal.png" alt="Shri Dev Darshan" className="h-10 w-auto" />
                            </div>

                            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-orange-700 bg-clip-text text-transparent mb-2">
                                Welcome to Shri Dev Darshan
                            </h2>

                            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                                From puja bookings to daily astrology, explore everything spiritual and sacred in one beautifully crafted platform.
                            </p>

                            <Button to="/" variant="primary" size="md" className="mt-4">
                                Explore Now
                            </Button>
                        </Card>

                        <div className="hidden lg:grid grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
                            {["108+", "15M+", "24×7"].map((num, i) => (
                                <Card key={i} variant="glass" hover padding="p-6 md:p-8" className="mb-2 sm:mb-0">
                                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                                        {num}
                                    </div>
                                    <p className="text-muted-foreground font-medium text-xs md:text-base">
                                        {i === 0 ? 'Live Temples' : i === 1 ? 'Devotees' : 'Live Darshan'}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="order-2 lg:order-1 lg:col-span-3">
                    <Card variant="default" gradientBorder="none" className="h-full">
                        <div className="flex flex-col h-full justify-between">
                            <Card.Header>
                                <Card.Title variant="primary">Book Your Puja</Card.Title>

                                <div className="relative my-5">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        loop
                                        autoplay={{ delay: 4000 }}
                                        pagination={{
                                            clickable: true,
                                            bulletClass:
                                                'swiper-pagination-bullet !w-2 !h-2 !bg-white/60 !opacity-100 !rounded-full !mx-1',
                                            bulletActiveClass: '!w-8 !h-2 !bg-white !rounded-full',
                                        }}
                                        navigation={{
                                            prevEl: '.hero-prev-puja',
                                            nextEl: '.hero-next-puja',
                                        }}
                                        className="h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden shadow-2xl"
                                    >
                                        {pujaSlides.map((slide, i) => (
                                            <SwiperSlide key={i}>
                                                <div className="relative h-full">
                                                    <img src={slide.img} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                                    <div className="absolute bottom-8 left-4 text-white">
                                                        <h4 className="text-lg font-bold">{slide.title}</h4>
                                                        <p className="text-sm opacity-90">{slide.sub}</p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    <IconButton
                                        icon={ChevronLeft}
                                        variant="glass"
                                        size="md"
                                        className="hero-prev-puja absolute left-3 top-1/2 -translate-y-1/2 z-10"
                                    />
                                    <IconButton
                                        icon={ChevronRight}
                                        variant="glass"
                                        size="md"
                                        className="hero-next-puja absolute right-3 top-1/2 -translate-y-1/2 z-10"
                                    />
                                </div>

                                <Card.Description className="mt-3">
                                    Authentic live puja with prasad delivery from 108+ temples
                                </Card.Description>
                            </Card.Header>

                            <Button
                                onClick={() => setIsPujaOffcanvasOpen(true)}
                                variant="primary"
                                size="md"
                                icon={TicketCheck}
                                fullWidth
                            >
                                Book Puja Now
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="order-3 lg:order-3 lg:col-span-3">
                    <Card variant="default" gradientBorder="none" className="h-full">
                        <div className="flex flex-col h-full justify-between">
                            <Card.Header>
                                <Card.Title variant="secondary">Daily Darshan</Card.Title>

                                <div className="relative my-5">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        loop
                                        autoplay={{ delay: 4500 }}
                                        pagination={{
                                            clickable: true,
                                            bulletClass:
                                                'swiper-pagination-bullet !w-2 !h-2 !bg-white/60 !opacity-100 !rounded-full !mx-1',
                                            bulletActiveClass: '!w-8 !h-2 !bg-white !rounded-full',
                                        }}
                                        navigation={{
                                            prevEl: '.hero-prev-darshan',
                                            nextEl: '.hero-next-darshan',
                                        }}
                                        className="h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden shadow-2xl"
                                    >
                                        {darshanSlides.map((slide, i) => (
                                            <SwiperSlide key={i}>
                                                <div className="relative h-full">
                                                    <img src={slide.img} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                                    <Badge.Live className="absolute top-4 left-4" />

                                                    <div className="absolute bottom-8 left-4 text-white">
                                                        <h4 className="text-lg font-bold">{slide.title}</h4>
                                                        <p className="text-sm opacity-90">{slide.sub}</p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    <IconButton
                                        icon={ChevronLeft}
                                        variant="glass"
                                        size="md"
                                        className="hero-prev-darshan absolute left-3 top-1/2 -translate-y-1/2 z-10"
                                    />
                                    <IconButton
                                        icon={ChevronRight}
                                        variant="glass"
                                        size="md"
                                        className="hero-next-darshan absolute right-3 top-1/2 -translate-y-1/2 z-10"
                                    />
                                </div>

                                <Card.Description className="mt-3">
                                    Watch live aarti from India's most sacred temples
                                </Card.Description>
                            </Card.Header>

                            <Button
                                to="/daily-darshan"
                                variant="secondary"
                                size="md"
                                icon={Eye}
                                fullWidth
                            >
                                Watch Live Darshan
                            </Button>
                        </div>
                    </Card>
                </div>

            </div>

            {/* Puja Offcanvas */}
            <PujaOffcanvas
                isOpen={isPujaOffcanvasOpen}
                onClose={() => setIsPujaOffcanvasOpen(false)}
            />
        </section>
    );
}
