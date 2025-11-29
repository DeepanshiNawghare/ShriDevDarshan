import React from 'react'
import Header from '../header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from "react-router-dom";
import SubHeader from '../header/SubHeader';

export default function MainLayout() {
    return (
        <div className=''>
            <Header />
            <SubHeader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
