// WhyChooseUs.jsx
import React from 'react';
import {
    Shield,
    Heart,
    Clock,
    MapPin,
    Users,
    Star,
    Sparkles,
    CheckCircle2,
} from 'lucide-react';
import { Card } from '../ui';

// Default features for the component
const defaultFeatures = [
    {
        icon: Shield,
        title: 'Authentic Pujas',
        description: 'Every ritual performed by certified Vedic priests following ancient scriptures',
        highlight: '100% Authentic',
    },
    {
        icon: MapPin,
        title: '108+ Sacred Temples',
        description: 'Connected with temples across India including all 12 Jyotirlingas',
        highlight: 'Pan India',
    },
    {
        icon: Clock,
        title: '24/7 Live Darshan',
        description: 'Watch live aarti and darshan anytime from the comfort of your home',
        highlight: 'Always Live',
    },
    {
        icon: Heart,
        title: 'Prasad Delivery',
        description: 'Sacred prasad delivered to your doorstep with love and devotion',
        highlight: 'Free Delivery',
    },
    {
        icon: Users,
        title: '15M+ Devotees',
        description: 'Trusted by millions of devotees worldwide for their spiritual needs',
        highlight: 'Community',
    },
    {
        icon: Star,
        title: 'Expert Guidance',
        description: 'Get personalized spiritual guidance from experienced astrologers',
        highlight: 'Expert Support',
    },
];

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, highlight, index }) {
    return (
        <div
            className="group relative"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <Card
                variant="glass"
                hover
                padding="p-0"
                className="h-full overflow-visible"
            >
                <div className="p-6 lg:p-8 h-full flex flex-col">
                    {/* Icon Container */}
                    <div className="relative mb-5">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Icon
                                className="w-7 h-7 lg:w-8 lg:h-8 text-primary group-hover:text-secondary transition-colors duration-300"
                                strokeWidth={1.5}
                            />
                        </div>
                        {/* Floating highlight badge */}
                        {highlight && (
                            <span className="absolute -top-2 -right-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg">
                                {highlight}
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg lg:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed flex-grow">
                        {description}
                    </p>

                    {/* Bottom accent line */}
                    <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs text-primary font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Trusted & Verified</span>
                        </div>
                    </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
        </div>
    );
}

// Main Why Choose Us Component
export default function WhyChooseUs({
    title = 'Why Choose Shri Dev Darshan?',
    subtitle = 'Experience divine blessings with authenticity, trust, and devotion',
    features = defaultFeatures,
    columns = 3,
    showDecoration = true,
    className = '',
}) {
    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <section className={`container mx-auto px-5 py-12 lg:py-20 ${className}`}>
            {/* Section Header */}
            <div className="text-center mb-12 lg:mb-16 relative">
                {/* Decorative sparkles */}
                {showDecoration && (
                    <>
                        <Sparkles className="absolute top-0 left-1/4 w-6 h-6 text-secondary/40 animate-pulse" />
                        <Sparkles className="absolute top-8 right-1/4 w-4 h-4 text-primary/40 animate-pulse delay-300" />
                    </>
                )}

                {/* Small label */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6">
                    <Star className="w-4 h-4 text-secondary" fill="currentColor" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        Why Us
                    </span>
                    <Star className="w-4 h-4 text-secondary" fill="currentColor" />
                </div>

                {/* Main title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-primary via-secondary to-orange-600 bg-clip-text text-transparent">
                        {title}
                    </span>
                </h2>

                {/* Subtitle */}
                <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>

                {/* Decorative line */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    <div className="h-px w-24 bg-gradient-to-r from-primary to-secondary" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary to-primary" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-secondary/50" />
                </div>
            </div>

            {/* Features Grid */}
            <div className={`grid grid-cols-1 ${gridCols[columns] || gridCols[3]} gap-6 lg:gap-8`}>
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        {...feature}
                        index={index}
                    />
                ))}
            </div>

            {/* Bottom CTA Section */}
            <div className="mt-12 lg:mt-16 text-center">
                <Card
                    variant="gradient"
                    padding="p-8 lg:p-12"
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-left">
                            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                                Ready to Begin Your Spiritual Journey?
                            </h3>
                            <p className="text-muted-foreground">
                                Join millions of devotees experiencing divine blessings
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-card flex items-center justify-center text-white text-xs font-bold"
                                    >
                                        {['🙏', '✨', '🪔', '🕉️'][i - 1]}
                                    </div>
                                ))}
                            </div>
                            <div className="text-left">
                                <div className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    15M+
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Happy Devotees
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}

// Export FeatureCard for custom usage
WhyChooseUs.FeatureCard = FeatureCard;

