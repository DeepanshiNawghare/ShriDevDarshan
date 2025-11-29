import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import playstore from '../../assets/img/playstore.svg';
import applestore from '../../assets/img/applestore.svg';

import { SocialIcon } from '../ui';

export default function Footer() {
    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Live Darshan', path: '/live-darshan' },
        { name: 'All Temples', path: '/temples' },
        { name: 'Daily Pooja', path: '/daily-pooja' },
        { name: 'Aarti Timings', path: '/aarti-timings' },
        { name: 'Donate', path: '/donate' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const legalLinks = [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Refund Policy', path: '/refund-policy' },
    ];

    const socialLinks = [
        { platform: 'facebook', username: 'shridevdarshan', icon: Facebook },
        { platform: 'instagram', username: 'shridevdarshan', icon: Instagram },
        { platform: 'twitter', username: 'shridevdarshan', icon: Twitter },
    ];

    return (
        <footer className="bg-foreground text-background border-t border-border/30">
            <div className="container mx-auto py-15 px-5">

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <img src={logo} alt="ShriDevDarshan" className="w-40 h-auto" />
                        <p className="text-sm leading-relaxed text-background/80 max-w-xs">
                            Experience divine live darshan, daily poojas, and spiritual connection with temples across India — anytime, anywhere.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <SocialIcon
                                    key={social.platform}
                                    platform={social.platform}
                                    username={social.username}
                                    icon={social.icon}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-background/70 hover:text-primary transition-colors text-sm block group flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 bg-primary/60 rounded-full group-hover:bg-primary transition"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-6">Contact Info</h3>
                        <div className="space-y-5 text-sm">
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary" />
                                <span className="text-background/70">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-primary" />
                                <a href="mailto:support@shridevdarshan.com" className="text-background/70 hover:text-primary transition">
                                    support@shridevdarshan.com
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary mt-0.5" />
                                <span className="text-background/70 leading-tight">
                                    123 Temple Street,<br />
                                    Mumbai, Maharashtra 400001
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Download App */}
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-6">Download Our App</h3>
                        <div className="space-y-4">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.shridevdarshan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block transform hover:scale-105 transition-all duration-300"
                            >
                                <img src={playstore} alt="Google Play Store" className="h-12 w-auto" />
                            </a>
                            <a
                                href="https://apps.apple.com/app/shridevdarshan/id123456789"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block transform hover:scale-105 transition-all duration-300"
                            >
                                <img src={applestore} alt="App Store" className="h-12 w-auto" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Legal Links + Om Divider + Copyright */}
                <div className="mt-5">
                    <div className="container mx-auto">

                        {/* Legal Links - Clean & Elegant */}
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10 my-8 text-sm">
                            {legalLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-background/60 hover:text-primary transition-all duration-300 group"
                                >
                                    <span className="group-hover:underline underline-offset-4 font-medium">
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Om Symbol Divider */}
                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-background/20"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-foreground px-6 text-2xl text-primary/70 font-devanagari tracking-widest">
                                    ॐ
                                </span>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="text-center space-y-2">
                            <p className="text-sm text-background/60">
                                © {new Date().getFullYear()} <span className="text-primary font-semibold">ShriDevDarshan</span>. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
