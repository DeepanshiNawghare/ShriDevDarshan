import React from 'react'
import HeroSection from '../sections/HeroSection'
import PujaSection from '../sections/puja/PujaSection'
import WhyChooseUs from '../sections/WhyChooseUs'

export default function Home() {
    return (
        <div className=''>
            <HeroSection />
            <PujaSection />
            <WhyChooseUs />
        </div>
    )
}
