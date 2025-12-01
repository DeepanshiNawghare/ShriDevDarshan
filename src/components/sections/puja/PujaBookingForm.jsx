import React, { useState } from 'react';
import { MapPin, Video, User, Phone, Mail, Calendar, Clock, Users, ChevronLeft, Check } from 'lucide-react';
import { Button, Input, NumberInput, DateInput, TimeInput, Badge, Modal } from '../../ui';

const pujaTypes = [
    {
        id: 'in-person',
        title: 'Visit Ujjain',
        subtitle: 'Perform puja in person',
        icon: MapPin,
        description: 'Experience the divine atmosphere of Ujjain. Our pandits will guide you through the complete puja rituals at the sacred temple.',
        features: ['Temple darshan included', 'Personal guidance', 'Prasad & offerings', 'Photography allowed'],
        color: 'from-primary to-secondary',
    },
    {
        id: 'video-call',
        title: 'Video Call',
        subtitle: 'Connect virtually',
        icon: Video,
        description: 'Join the puja live from anywhere in the world. Watch the complete ritual performed on your behalf with real-time interaction.',
        features: ['HD live streaming', 'Interactive session', 'Prasad delivery', 'Recording provided'],
        color: 'from-secondary to-primary',
    },
];

export default function PujaBookingForm({ isOpen, onClose, puja, onBack }) {
    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        members: 1,
        gotra: '',
        nakshatra: '',
        specialRequests: '',
        // Video call specific
        platform: 'zoom',
        // In-person specific
        accommodation: false,
        pickupRequired: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(3);
        // Here you would typically send the data to your backend
        console.log('Booking submitted:', { puja, selectedType, formData });
    };

    const handleClose = () => {
        setStep(1);
        setSelectedType(null);
        setFormData({
            fullName: '',
            phone: '',
            email: '',
            date: '',
            time: '',
            members: 1,
            gotra: '',
            nakshatra: '',
            specialRequests: '',
            platform: 'zoom',
            accommodation: false,
            pickupRequired: false,
        });
        onClose();
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                            : 'bg-muted text-muted-foreground'
                            }`}
                    >
                        {step > s ? <Check size={16} /> : s}
                    </div>
                    {s < 3 && (
                        <div
                            className={`w-12 h-0.5 mx-1 transition-all duration-300 ${step > s ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-muted'
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );

    const renderTypeSelection = () => (
        <div className="space-y-4">
            <p className="text-center text-muted-foreground mb-6">
                Choose how you'd like to participate in the puja
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pujaTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                        <button
                            key={type.id}
                            onClick={() => handleTypeSelect(type.id)}
                            className="group relative p-6 rounded-2xl border-2 border-border/50 hover:border-primary/50 bg-muted/30 hover:bg-muted/50 transition-all duration-300 text-left overflow-hidden"
                        >
                            {/* Background gradient on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={24} className="text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-foreground mb-1">{type.title}</h4>
                                <p className="text-sm text-muted-foreground mb-3">{type.subtitle}</p>
                                <p className="text-xs text-muted-foreground/80 mb-4">{type.description}</p>
                                <div className="space-y-1.5">
                                    {type.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${type.color}`} />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const renderBookingForm = () => (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Selected Type Badge */}
            <div className="flex items-center gap-2 mb-2">
                <Badge
                    size="sm"
                    className={`bg-gradient-to-r ${selectedType === 'in-person'
                        ? 'from-primary to-secondary'
                        : 'from-secondary to-primary'
                        } text-white`}
                >
                    {selectedType === 'in-person' ? (
                        <><MapPin size={12} className="mr-1" /> In-Person</>
                    ) : (
                        <><Video size={12} className="mr-1" /> Video Call</>
                    )}
                </Badge>
                <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-primary hover:underline"
                >
                    Change
                </button>
            </div>

            {/* Personal Details */}
            <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wide flex items-center gap-2 text-primary">
                    <User size={14} className="text-primary" /> Personal Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                        name="fullName"
                        placeholder="Full Name *"
                        icon={User}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        shape="rounded"
                    />
                    <Input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number *"
                        icon={Phone}
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        shape="rounded"
                    />
                </div>
                <Input
                    name="email"
                    type="email"
                    placeholder="Email Address *"
                    icon={Mail}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    shape="rounded"
                />
            </div>

            {/* Puja Details */}
            <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wide flex items-center gap-2 text-primary">
                    <Calendar size={14} className="text-primary" /> Schedule & Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <DateInput
                        name="date"
                        placeholder="Preferred Date *"
                        icon={Calendar}
                        value={formData.date}
                        onChange={handleInputChange}
                        shape="rounded"
                        minDate={new Date().toISOString().split('T')[0]}
                    />
                    <TimeInput
                        name="time"
                        placeholder="Preferred Time"
                        icon={Clock}
                        value={formData.time}
                        onChange={handleInputChange}
                        shape="rounded"
                    />
                    <NumberInput
                        name="members"
                        min={1}
                        max={20}
                        placeholder="Members"
                        icon={Users}
                        value={formData.members}
                        onChange={handleInputChange}
                        shape="rounded"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                        name="gotra"
                        placeholder="Gotra (Optional)"
                        value={formData.gotra}
                        onChange={handleInputChange}
                        shape="rounded"
                    />
                    <Input
                        name="nakshatra"
                        placeholder="Nakshatra (Optional)"
                        value={formData.nakshatra}
                        onChange={handleInputChange}
                        shape="rounded"
                    />
                </div>
            </div>

            {/* Type-specific options */}
            {selectedType === 'video-call' && (
                <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wide flex items-center gap-2 text-primary">
                        <Video size={14} className="text-primary" /> Video Call Preferences
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {['zoom', 'google-meet', 'whatsapp'].map((platform) => (
                            <label
                                key={platform}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${formData.platform === platform
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border/50 bg-muted/30 text-muted-primary hover:border-primary/30'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="platform"
                                    value={platform}
                                    checked={formData.platform === platform}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                />
                                <span className="text-sm font-medium capitalize">
                                    {platform.replace('-', ' ')}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {selectedType === 'in-person' && (
                <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wide flex items-center gap-2 text-primary">
                        <MapPin size={14} className="text-primary" /> Travel Assistance
                    </h4>
                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="accommodation"
                                    checked={formData.accommodation}
                                    onChange={handleInputChange}
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 rounded-md border-2 border-border peer-checked:border-primary peer-checked:bg-primary transition-all duration-200 flex items-center justify-center">
                                    {formData.accommodation && <Check size={12} className="text-white" />}
                                </div>
                            </div>
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                Need accommodation help
                            </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="pickupRequired"
                                    checked={formData.pickupRequired}
                                    onChange={handleInputChange}
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 rounded-md border-2 border-border peer-checked:border-primary peer-checked:bg-primary transition-all duration-200 flex items-center justify-center">
                                    {formData.pickupRequired && <Check size={12} className="text-white" />}
                                </div>
                            </div>
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                Airport/Station pickup
                            </span>
                        </label>
                    </div>
                </div>
            )}

            {/* Special Requests */}
            <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wide text-primary">
                    Special Requests
                </h4>
                <textarea
                    name="specialRequests"
                    placeholder="Any special requests or additional information..."
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-200 resize-none text-sm"
                />
            </div>
        </form>
    );

    const renderConfirmation = () => (
        <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-secondary to-orange-700 flex items-center justify-center mx-auto mb-6 animate-bounce shadow-2xl shadow-primary/40">
                <Check size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-orange-700 bg-clip-text text-transparent mb-3">
                Booking Request Submitted!
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Thank you for your booking request for <strong className="text-foreground">{puja?.title}</strong>.
                Our team will contact you shortly to confirm your booking.
            </p>
            <div className="bg-primary/5 rounded-2xl p-6 max-w-sm mx-auto mb-6 border border-primary/10">
                <div className="space-y-3 text-left">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Puja Type:</span>
                        <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {selectedType === 'in-person' ? 'In-Person Visit' : 'Video Call'}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium text-foreground">{formData.date || 'To be confirmed'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contact:</span>
                        <span className="font-medium text-foreground">{formData.phone}</span>
                    </div>
                </div>
            </div>
            <p className="text-xs text-muted-foreground">
                A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="2xl"
            variant="glass"
        >
            <Modal.Header>
                <div className="flex items-center gap-3">
                    {step > 1 && step < 3 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="p-2 rounded-full bg-muted/60 hover:bg-muted transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    )}
                    <div>
                        <Modal.Title>
                            {step === 1 && 'Select Puja Type'}
                            {step === 2 && 'Complete Your Booking'}
                            {step === 3 && 'Booking Confirmed'}
                        </Modal.Title>
                        <Modal.Description>
                            {step === 1 && `Booking for: ${puja?.title}`}
                            {step === 2 && 'Fill in your details to proceed'}
                            {step === 3 && 'Your divine journey begins here'}
                        </Modal.Description>
                    </div>
                </div>
            </Modal.Header>

            <Modal.Body>
                {renderStepIndicator()}
                {step === 1 && renderTypeSelection()}
                {step === 2 && renderBookingForm()}
                {step === 3 && renderConfirmation()}
            </Modal.Body>

            {step !== 3 && (
                <Modal.Footer className="flex-col sm:flex-row gap-3">
                    <Button
                        variant="ghost"
                        onClick={step === 1 ? onBack : () => setStep(1)}
                        className="w-full sm:w-auto"
                    >
                        {step === 1 ? 'Back to Details' : 'Change Type'}
                    </Button>
                    {step === 2 && (
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            className="w-full sm:w-auto"
                        >
                            Confirm Booking
                        </Button>
                    )}
                </Modal.Footer>
            )}

            {step === 3 && (
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={handleClose}
                        className="w-full"
                    >
                        Done
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}

