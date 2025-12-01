// src/components/sections/puja/PujaOffcanvas.jsx
import React, { useState, useMemo } from 'react';
import { Share2, Search, Filter, X } from 'lucide-react';
import { Card, Button, Badge, IconButton, Offcanvas } from '../../ui';
import PujaModal from './PujaModal';

// Filter Options
const categories = ['All Pujas', 'Health', 'Wealth', 'Peace', 'Protection', 'Success', 'Family'];
const trendingTopics = ['Navratri Special', 'Shivratri', 'Diwali', 'Monthly Puja', 'Daily Rituals'];
const regions = ['North India', 'South India', 'East India', 'West India', 'Pan India'];

const allPujas = [
    {
        id: 1,
        title: "Mahamrityunjaya Jaap",
        desc: "108 times powerful healing mantra for health & longevity",
        image: "/img/puja/mahamrityunjayapuja.png",
        badge: "POPULAR",
        category: "Health",
        trending: "Shivratri",
        region: "North India",
    },
    {
        id: 2,
        title: "Satyanarayan Pooja",
        desc: "Monthly pooja for prosperity, happiness & family well-being",
        image: "/img/puja/satyanarayan.jpg",
        badge: "POPULAR",
        category: "Family",
        trending: "Monthly Puja",
        region: "Pan India",
    },
    {
        id: 3,
        title: "Rudrabhishek",
        desc: "Lord Shiva abhishek with milk, honey & bilva patra",
        image: "/img/puja/rudrabhishek.jpg",
        badge: "POPULAR",
        category: "Peace",
        trending: "Shivratri",
        region: "North India",
    },
    {
        id: 4,
        title: "Baglamukhi Puja",
        desc: "Victory over enemies & court cases",
        image: "/img/puja/baglamukhimaa.jpg",
        badge: "POPULAR",
        category: "Protection",
        trending: "Daily Rituals",
        region: "North India",
    },
    {
        id: 5,
        title: "Ganesh Atharvashirsha",
        desc: "Remove obstacles & bring wisdom",
        image: "/img/puja/ganpatipuja.png",
        badge: null,
        category: "Success",
        trending: "Daily Rituals",
        region: "Pan India",
    },
    {
        id: 6,
        title: "Lakshmi Puja",
        desc: "Invoke goddess of wealth for prosperity and abundance",
        image: "img/puja/lakshmipuja.png",
        badge: "TRENDING",
        category: "Wealth",
        trending: "Diwali",
        region: "Pan India",
    },
    {
        id: 7,
        title: "Durga Saptashati",
        desc: "700 verses dedicated to Goddess Durga for protection",
        image: "/img/puja/durgapuja.jpg",
        badge: "SPECIAL",
        category: "Protection",
        trending: "Navratri Special",
        region: "East India",
    },
    {
        id: 8,
        title: "Kaal Sarp Dosh Puja",
        desc: "Remedy for Kaal Sarp Yoga in horoscope",
        image: "/img/puja/kaalsarpdosh.png",
        badge: null,
        category: "Peace",
        trending: "Monthly Puja",
        region: "South India",
    },
    {
        id: 9,
        title: "Navagraha Shanti",
        desc: "Pacify all nine planets for harmony in life",
        image: "/img/puja/navgrahpuja.png",
        badge: "POPULAR",
        category: "Health",
        trending: "Monthly Puja",
        region: "South India",
    },
];

export { allPujas, categories, trendingTopics, regions };

export default function PujaOffcanvas({ isOpen, onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPuja, setSelectedPuja] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTrending, setSelectedTrending] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);

    // Filtered pujas based on search and filters
    const filteredPujas = useMemo(() => {
        return allPujas.filter((puja) => {
            const matchesSearch = puja.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                puja.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || selectedCategory === 'All Pujas' || puja.category === selectedCategory;
            const matchesTrending = !selectedTrending || puja.trending === selectedTrending;
            const matchesRegion = !selectedRegion || puja.region === selectedRegion;

            return matchesSearch && matchesCategory && matchesTrending && matchesRegion;
        });
    }, [searchQuery, selectedCategory, selectedTrending, selectedRegion]);

    const handleBookNow = (puja) => {
        setSelectedPuja(puja);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPuja(null);
    };

    const clearAllFilters = () => {
        setSelectedCategory(null);
        setSelectedTrending(null);
        setSelectedRegion(null);
        setSearchQuery('');
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

    const hasActiveFilters = (selectedCategory && selectedCategory !== 'All Pujas') || selectedTrending || selectedRegion || searchQuery;

    return (
        <>
            {/* Bottom Offcanvas - 70% Height */}
            <Offcanvas
                isOpen={isOpen}
                onClose={onClose}
                position="bottom"
                variant="glass"
                className="rounded-t-3xl h-[70vh]"
                showCloseButton={false}
            >
                {/* Header with Title and Search */}
                <div className="p-4 lg:p-6 border-b border-border/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Offcanvas.Title>All Pujas</Offcanvas.Title>
                            <span className="text-sm text-muted-foreground">
                                ({filteredPujas.length} results)
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search pujas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                            />
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
                        >
                            <Filter size={18} />
                            Filters
                            {hasActiveFilters && (
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                            )}
                        </button>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition-colors"
                            >
                                <X size={16} />
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content - Filters + Grid */}
                <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">

                    {/* Filters Sidebar - Desktop */}
                    <div className={`
                        lg:w-64 lg:border-r border-border/50 overflow-y-auto
                        ${showMobileFilters ? 'block absolute inset-x-0 top-32 bottom-0 bg-background/95 backdrop-blur-xl z-10 p-4' : 'hidden lg:block'}
                    `}>
                        <div className="p-4 lg:p-6 space-y-6">

                            {/* Mobile Close */}
                            {showMobileFilters && (
                                <div className="flex items-center justify-between lg:hidden mb-4">
                                    <span className="font-semibold">Filters</span>
                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        className="p-2 rounded-full bg-muted/60"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}

                            {/* Categories Filter */}
                            <div>
                                <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                                    Categories
                                </h4>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                            className={`
                                                w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                                                ${selectedCategory === cat
                                                    ? 'bg-primary text-white font-medium'
                                                    : 'hover:bg-muted/60 text-muted-foreground hover:text-foreground'}
                                            `}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Trending Topics Filter */}
                            <div>
                                <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                                    Trending Topics
                                </h4>
                                <div className="space-y-2">
                                    {trendingTopics.map((topic) => (
                                        <button
                                            key={topic}
                                            onClick={() => setSelectedTrending(selectedTrending === topic ? null : topic)}
                                            className={`
                                                w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                                                ${selectedTrending === topic
                                                    ? 'bg-primary text-white font-medium'
                                                    : 'hover:bg-muted/60 text-muted-foreground hover:text-foreground'}
                                            `}
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Regions Filter */}
                            <div>
                                <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                                    Regions
                                </h4>
                                <div className="space-y-2">
                                    {regions.map((region) => (
                                        <button
                                            key={region}
                                            onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                                            className={`
                                                w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                                                ${selectedRegion === region
                                                    ? 'bg-primary text-white font-medium'
                                                    : 'hover:bg-muted/60 text-muted-foreground hover:text-foreground'}
                                            `}
                                        >
                                            {region}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Apply Button */}
                            {showMobileFilters && (
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={() => setShowMobileFilters(false)}
                                    className="mt-4"
                                >
                                    Apply Filters
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Pujas Grid */}
                    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                        {filteredPujas.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                {filteredPujas.map((puja) => (
                                    <Card
                                        key={puja.id}
                                        variant="default"
                                        padding=""
                                        className="group hover:shadow-2xl hover:shadow-primary/20"
                                    >
                                        {/* Image */}
                                        <div className="relative h-40 sm:h-48 overflow-hidden">
                                            <img
                                                src={puja.image}
                                                alt={puja.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />

                                            {/* Dynamic Badge */}
                                            {puja.badge && (
                                                <Badge
                                                    size="sm"
                                                    className="absolute top-3 left-3 bg-gradient-to-r from-primary to-secondary"
                                                >
                                                    {puja.badge}
                                                </Badge>
                                            )}

                                            {/* Share Button */}
                                            <IconButton
                                                icon={Share2}
                                                variant="glass"
                                                size="sm"
                                                className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                onClick={(e) => handleShare(puja, e)}
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </div>

                                        {/* Content */}
                                        <Card.Content className="p-4">
                                            <h3 className="text-base lg:text-lg font-bold text-foreground mb-1 line-clamp-1">
                                                {puja.title}
                                            </h3>
                                            <Card.Description className="line-clamp-2 text-xs lg:text-sm">
                                                {puja.desc}
                                            </Card.Description>

                                            {/* Book Now Button */}
                                            <Button
                                                onClick={() => handleBookNow(puja)}
                                                variant="primary"
                                                size="sm"
                                                fullWidth
                                                className="mt-4"
                                            >
                                                Book Now
                                            </Button>
                                        </Card.Content>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <Search size={48} className="text-muted-foreground/30 mb-4" />
                                <h4 className="font-semibold text-foreground mb-2">No pujas found</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Try adjusting your filters or search query
                                </p>
                                <Button variant="ghost" onClick={clearAllFilters}>
                                    Clear All Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Offcanvas>

            {/* Puja Detail Modal */}
            <PujaModal
                isOpen={isModalOpen}
                onClose={closeModal}
                puja={selectedPuja}
            />
        </>
    );
}

