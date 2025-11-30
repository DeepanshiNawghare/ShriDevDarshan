// src/components/PujaSection.jsx
import React, { useState } from 'react';
import { Share2, ChevronRight } from 'lucide-react';
import { Card, Button, Badge, IconButton } from '../ui';
import PujaOffcanvas, { allPujas } from './PujaOffcanvas';
import PujaModal from './puja/PujaModal';

export default function PujaSection() {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPuja, setSelectedPuja] = useState(null);

    const handleBookNow = (puja) => {
        setSelectedPuja(puja);
        setIsModalOpen(true);
    };

    const handleViewAll = () => {
        setIsOffcanvasOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPuja(null);
    };

    const handleShare = async (puja, e) => {
        e?.stopPropagation();
        const shareData = {
            title: puja.title,
            text: puja.desc,
            url: `${window.location.origin}/puja/${puja.id}`,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.log('Share failed:', err);
        }
    };

    return (
        <section className="py-12 lg:py-20 bg-gradient-to-b from-background to-orange-50/30">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                        <h2 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Popular Pujas
                        </h2>
                        <p className="text-muted-foreground mt-2 text-base lg:text-lg">
                            Book authentic pujas performed by experienced pandits with live streaming
                        </p>
                    </div>

                    <Button
                        onClick={handleViewAll}
                        variant="ghost"
                        size="md"
                        icon={ChevronRight}
                        iconPosition="right"
                        className="bg-primary/10 hover:bg-primary/20 text-primary hover:shadow-lg hover:shadow-primary/20"
                    >
                        View All
                    </Button>
                </div>

                {/* Puja Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allPujas.slice(0, 4).map((puja) => (
                        <Card
                            key={puja.id}
                            variant="default"
                            padding=""
                            className="group hover:shadow-2xl hover:shadow-primary/20"
                        >
                            {/* Image */}
                            <div className="relative h-56 lg:h-64 overflow-hidden">
                                <img
                                    src={puja.image}
                                    alt={puja.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Dynamic Badge */}
                                {puja.badge && (
                                    <Badge
                                        size="sm"
                                        className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary"
                                    >
                                        {puja.badge}
                                    </Badge>
                                )}

                                {/* Share Button */}
                                <IconButton
                                    icon={Share2}
                                    variant="glass"
                                    size="md"
                                    className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    onClick={(e) => handleShare(puja, e)}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>

                            {/* Content */}
                            <Card.Content className="p-6">
                                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                                    {puja.title}
                                </h3>
                                <Card.Description className="line-clamp-2">
                                    {puja.desc}
                                </Card.Description>

                                {/* Book Now Button */}
                                <Button
                                    onClick={() => handleBookNow(puja)}
                                    variant="primary"
                                    size="md"
                                    fullWidth
                                    className="mt-5"
                                >
                                    Book Now
                                </Button>
                            </Card.Content>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Puja Offcanvas */}
            <PujaOffcanvas
                isOpen={isOffcanvasOpen}
                onClose={() => setIsOffcanvasOpen(false)}
            />

            {/* Puja Detail Modal */}
            <PujaModal
                isOpen={isModalOpen}
                onClose={closeModal}
                puja={selectedPuja}
            />
        </section>
    );
}
