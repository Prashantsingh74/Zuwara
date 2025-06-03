import React from 'react'
import '../.././Style/Corporatewlness.css'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'
import Service from '../Components/Home/Service'
import HomeBodyCard from '../Components/Home/HomeBodyCard'
import Carousel from '../Components/Home/Carousel'
function CorparatewelnesApp() {
    return (
        <div>
            <Navbar />
            <Service />
            <HomeBodyCard />
            <Carousel />
            <Footer />
        </div>
    )
}

export default CorparatewelnesApp
