import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { Button, Badge, IconButton, Modal } from '../../ui';
import PujaBookingForm from './PujaBookingForm';

export default function PujaModal({ isOpen, onClose, puja }) {
    const [showBookingForm, setShowBookingForm] = useState(false);
    const navigate = useNavigate();

    const handleProceedToBook = () => {
        setShowBookingForm(true);
    };

    const handleMoreDetails = () => {
        onClose();
        navigate(`/puja/${puja.id}`);
    };

    const handleBackToDetails = () => {
        setShowBookingForm(false);
    };

    const handleCloseAll = () => {
        setShowBookingForm(false);
        onClose();
    };

    const handleShare = async (e) => {
        e?.stopPropagation();
        if (!puja) return;

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

    // Show booking form when user clicks "Proceed to Book"
    if (showBookingForm) {
        return (
            <PujaBookingForm
                isOpen={isOpen}
                onClose={handleCloseAll}
                puja={puja}
                onBack={handleBackToDetails}
            />
        );
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="3xl"
            variant="glass"
        >
            {puja && (
                <>
                    <Modal.Header>
                        <Modal.Title>{puja.title}</Modal.Title>
                        <Modal.Description>
                            Book this puja with experienced pandits
                        </Modal.Description>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Image Section */}
                            <div className="lg:w-2/5">
                                <div className="relative rounded-2xl overflow-hidden group">
                                    <img
                                        src={puja.image}
                                        alt={puja.title}
                                        className="w-full h-56 sm:h-64 lg:h-72 object-cover"
                                    />
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
                                        className="absolute top-4 right-4"
                                        onClick={handleShare}
                                    />
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="lg:w-3/5">
                                {/* Tags */}
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    {puja.category && <Badge size="sm" variant="muted">{puja.category}</Badge>}
                                    {puja.region && <Badge size="sm" variant="muted">{puja.region}</Badge>}
                                    {puja.trending && <Badge size="sm" variant="muted">{puja.trending}</Badge>}
                                </div>

                                {/* Description */}
                                <p className="text-muted-foreground mb-6 text-sm lg:text-base">
                                    {puja.desc}
                                </p>

                                {/* Features */}
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                                        What's Included
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                                            Live streaming available
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                                            Experienced pandits
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                                            Prasad delivery included
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                                            Photo & video coverage
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Info */}
                                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-muted-foreground">Duration</span>
                                        <span className="font-semibold text-foreground">2-3 Hours</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Available</span>
                                        <span className="font-semibold text-green-600">Book Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="flex-col sm:flex-row gap-3">
                        <Button
                            variant="ghost"
                            onClick={handleMoreDetails}
                            className="w-full sm:w-full"
                        >
                            More Details
                        </Button>
                        <Button
                            variant="primary"
                            className="w-full sm:w-full"
                            onClick={handleProceedToBook}
                        >
                            Proceed to Book
                        </Button>
                    </Modal.Footer>
                </>
            )}
        </Modal>
    );
}

