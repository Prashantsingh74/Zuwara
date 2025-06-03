import React from 'react'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'
import HomeBannerSlider from '../Components/Home/HomeServices/HomeBannerSlider'
import Service from '../Components/Home/HomeServices/Service'
import HomeBodyCard from '../Components/Home/HomeBodyCard'
import Carousel from '../Components/Home/Carousel'

import Joinus from '../Components/Home/Joinus'
import HomeFrequentlyQue from '../Components/Home/HomeFrequentlyQue'

import WhatsAppBtn from '../Components/WhatsAppBtn'

function Home() {
    return (
        <>
            <WhatsAppBtn />
            <Navbar />
            <HomeBannerSlider />
            <Service />
            <HomeBodyCard />
            <Carousel />
            <HomeFrequentlyQue />
            <Joinus />
            <Footer />
          

        </>
    )
}

export default Home
