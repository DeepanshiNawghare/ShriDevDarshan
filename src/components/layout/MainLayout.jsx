import React from 'react'
import Header from '../header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from "react-router-dom";
import SubHeader from '../header/SubHeader';

export default function MainLayout() {
    return (
        <div className='min-h-screen bg-background text-foreground'>
            <Header />
            <SubHeader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
