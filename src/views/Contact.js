import React from 'react'
import '../.././Style/Contact.css'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'
import Herosection from '../Components/Aboutcomponent/Herosection'
import Container from '../Components/Aboutcomponent/Container'
import Card from '../Components/Aboutcomponent/Card'
import WhyZwaara from '../Components/Aboutcomponent/WhyZwaara'
function ContactApp() {
    return (
        <div>

            <Navbar />
            <Herosection />
            <Container />
            <Card />
            <WhyZwaara />
            <Footer />
        </div>
    )
}

export default ContactApp
