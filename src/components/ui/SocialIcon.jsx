import React from 'react';

const platforms = {
    facebook: { name: 'Facebook', baseUrl: 'https://facebook.com/' },
    instagram: { name: 'Instagram', baseUrl: 'https://instagram.com/' },
    twitter: { name: 'Twitter', baseUrl: 'https://twitter.com/' },
    youtube: { name: 'YouTube', baseUrl: 'https://youtube.com/' },
    linkedin: { name: 'LinkedIn', baseUrl: 'https://linkedin.com/in/' },
};

export default function SocialIcon({
    platform,
    username,
    href,
    icon: Icon,
    size = 20,
    className = '',
    ...props
}) {
    const platformData = platforms[platform];
    const finalHref = href || (platformData ? `${platformData.baseUrl}${username}` : '#');
    const label = platformData?.name || 'Social Media';

    return (
        <a
            href={finalHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`
                p-3 bg-background/10 rounded-full
                hover:bg-primary hover:text-foreground
                transition-all duration-300 transform hover:scale-110
                ${className}
            `.trim().replace(/\s+/g, ' ')}
            {...props}
        >
            {Icon && <Icon size={size} />}
        </a>
    );
}

