import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, ArrowLeft, Clock, MapPin, Calendar, CheckCircle, Star, Users } from 'lucide-react';
import { Button, Badge, IconButton, Card } from '../ui';
import { allPujas } from '../sections/puja/PujaOffcanvas';
import PujaBookingForm from '../sections/puja/PujaBookingForm';

export default function PujaDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showBookingForm, setShowBookingForm] = useState(false);

    // Find the puja by id
    const puja = allPujas.find(p => p.id === parseInt(id));

    const handleShare = async () => {
        if (!puja) return;

        const shareData = {
            title: puja.title,
            text: puja.desc,
            url: window.location.href,
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

    const handleProceedToBook = () => {
        setShowBookingForm(true);
    };

    const handleCloseBooking = () => {
        setShowBookingForm(false);
    };

    // Show 404 if puja not found
    if (!puja) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background to-orange-50/30 dark:to-orange-950/20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Puja Not Found</h1>
                    <p className="text-muted-foreground mb-6">The puja you're looking for doesn't exist.</p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        Go Back Home
                    </Button>
                </div>
            </div>
        );
    }

    // Show booking form when user clicks "Proceed to Book"
    if (showBookingForm) {
        return (
            <PujaBookingForm
                isOpen={true}
                onClose={handleCloseBooking}
                puja={puja}
                onBack={handleCloseBooking}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-orange-50/30 dark:to-orange-950/20">
            {/* Hero Section with Image */}
            <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
                <img
                    src={puja.image}
                    alt={puja.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Back Button */}
                <Button
                    variant="glass"
                    size="sm"
                    icon={ArrowLeft}
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 md:left-10 lg:left-20 z-10 bg-black/30 hover:bg-black/50 text-white"
                >
                    Back
                </Button>

                {/* Share Button */}
                <IconButton
                    icon={Share2}
                    variant="glass"
                    size="md"
                    className="absolute top-4 right-4 md:right-10 lg:right-20 z-10 bg-black/30 hover:bg-black/50"
                    onClick={handleShare}
                />

                {/* Badge */}
                {puja.badge && (
                    <Badge
                        size="md"
                        className="absolute top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary"
                    >
                        {puja.badge}
                    </Badge>
                )}

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            {puja.category && <Badge size="sm" variant="muted" className="bg-white/20 text-white">{puja.category}</Badge>}
                            {puja.region && <Badge size="sm" variant="muted" className="bg-white/20 text-white">{puja.region}</Badge>}
                            {puja.trending && <Badge size="sm" variant="muted" className="bg-white/20 text-white">{puja.trending}</Badge>}
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">
                            {puja.title}
                        </h1>
                        <p className="text-white/80 text-lg lg:text-xl max-w-2xl">
                            {puja.desc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* About Section */}
                        <Card variant="default" className="overflow-hidden">
                            <Card.Content>
                                <h2 className="text-2xl font-bold text-foreground mb-4">About This Puja</h2>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {puja.desc} This sacred ritual is performed by our experienced pandits following traditional Vedic procedures.
                                    The puja includes all essential rituals, mantras, and offerings to invoke divine blessings.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Our team ensures that every aspect of the puja is conducted with utmost devotion and authenticity.
                                    You can participate in the puja through our live streaming service or receive the recorded video after completion.
                                </p>
                            </Card.Content>
                        </Card>

                        {/* What's Included */}
                        <Card variant="default" className="overflow-hidden">
                            <Card.Content>
                                <h2 className="text-2xl font-bold text-foreground mb-6">What's Included</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        'Live streaming of complete puja',
                                        'Experienced and certified pandits',
                                        'Prasad delivery to your address',
                                        'Photo & video coverage',
                                        'Personalized sankalp with your name',
                                        'Post-puja consultation',
                                        'Certificate of completion',
                                        'Energized items delivery'
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                            <span className="text-foreground text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card.Content>
                        </Card>

                        {/* Puja Process */}
                        <Card variant="default" className="overflow-hidden">
                            <Card.Content>
                                <h2 className="text-2xl font-bold text-foreground mb-6">Puja Process</h2>
                                <div className="space-y-4">
                                    {[
                                        { step: 1, title: 'Booking Confirmation', desc: 'Complete your booking and receive confirmation with puja details' },
                                        { step: 2, title: 'Sankalp', desc: 'Your name and gotra will be used for personalized sankalp' },
                                        { step: 3, title: 'Puja Performance', desc: 'Watch the live streaming or receive recorded video' },
                                        { step: 4, title: 'Prasad Delivery', desc: 'Receive blessed prasad and energized items at your doorstep' },
                                    ].map((item) => (
                                        <div key={item.step} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {item.step}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{item.title}</h3>
                                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Content>
                        </Card>

                        {/* Reviews */}
                        <Card variant="default" className="overflow-hidden">
                            <Card.Content>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-foreground">Reviews</h2>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        <span className="font-bold text-foreground">4.9</span>
                                        <span className="text-muted-foreground">(128 reviews)</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Rajesh Kumar', rating: 5, review: 'Excellent puja service. The pandits were very knowledgeable and the live streaming quality was great.' },
                                        { name: 'Priya Sharma', rating: 5, review: 'Very satisfied with the service. Prasad was delivered on time and the entire process was smooth.' },
                                        { name: 'Amit Patel', rating: 4, review: 'Good experience overall. The pandit explained each step during the puja.' },
                                    ].map((review, index) => (
                                        <div key={index} className="p-4 rounded-xl bg-muted/30 border border-border/50">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
                                                    {review.name[0]}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{review.review}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card.Content>
                        </Card>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <Card variant="glass" className="overflow-hidden border-primary/20">
                                <Card.Content>
                                    <h3 className="text-xl font-bold text-foreground mb-4">Book This Puja</h3>

                                    {/* Info Items */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Clock className="w-5 h-5 text-primary" />
                                            <span>Duration: 2-3 Hours</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <MapPin className="w-5 h-5 text-primary" />
                                            <span>Location: {puja.region}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            <span>Available: Daily</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Users className="w-5 h-5 text-primary" />
                                            <span>150+ bookings this month</span>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="bg-primary/5 rounded-xl p-4 mb-6 border border-primary/10">
                                        <h4 className="font-semibold text-foreground mb-2">Highlights</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                                100% Authentic Vedic Rituals
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                                Certified Pandits
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                                Live Streaming Available
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                                Prasad Delivery Pan-India
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Book Button */}
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        onClick={handleProceedToBook}
                                        className="mb-3"
                                    >
                                        Proceed to Book
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground">
                                        Secure booking • Instant confirmation
                                    </p>
                                </Card.Content>
                            </Card>

                            {/* Need Help Card */}
                            <Card variant="default" className="mt-4 overflow-hidden">
                                <Card.Content>
                                    <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Our team is here to assist you with any questions.
                                    </p>
                                    <Button variant="outline" size="sm" fullWidth>
                                        Contact Support
                                    </Button>
                                </Card.Content>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

