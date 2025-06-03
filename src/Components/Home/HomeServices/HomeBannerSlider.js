import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../../Context'; // Import the Context
 
function HomeBannerSlider() {
    const { isAuthenticated } = useContext(Context); // Get the isAuthenticated state from context
    const [bannerData, setBannerData] = useState([]);
 
    useEffect(() => {
        fetch('https://zuwara.net/admin/public/api/header-banners')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBannerData(data);
            });
    }, []);
 
    const handleLoginClick = () => {
        if (isAuthenticated) {
            alert('You are already logged in'); // Show alert if already logged in
        }
        // If not authenticated, the modal will open automatically due to data-bs attributes
    };
 
    const getFullImageUrl = (relativePath) => {
        const baseUrl = 'https://zuwara.net/admin/public/'; // Replace with your actual base URL
        return `${baseUrl}${relativePath}`;
    };
 
    return (
        <div className="container zw_home_slider">
            <div id="myCarousel" className="carousel slide slider_pt" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {bannerData.map((item, index) => {
                        // Split the title into two parts: before and after ":"
                        const parts = item.title.split(': '); // Split by ": "
                        const firstPart = parts[0]; // "Bringing Healthcare Home"
                        const secondPart = parts[1] || ''; // "Your Wellness, Our Priority"
 
                        // Further split the second part by the comma to separate into two segments
                        const secondPartSegments = secondPart.split(', '); // ["Your Wellness", "Our Priority"]
 
                        // Constructing the parts for display
                        const line1 = `${firstPart}:`; // "Bringing Healthcare Home:"
                        const line2 = secondPartSegments[0] ? `${secondPartSegments[0]},` : ''; // "Your Wellness,"
                        const line3 = secondPartSegments[1] || ''; // "Our Priority"
 
                        return (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{ height: "49rem" }}>
                                <img src="images/banner.jpg" width="100%" height="100%" className="banner" style={{ height: "49rem" }} alt="Zawaara" />
 
                                <div className="container">
                                    <div className="banner-left me-2">
                                        <h1 className='poppins-bold'>
                                            <span>{line1}</span> {/* First line */}
                                            <span>{line2}</span> {/* Second line */}
                                            <span>{line3}</span> {/* Third line with "Our Priority" */}
                                        </h1>
                                        <p style={{ fontFamily: "Poppins, 'Source Sans Pro'", marginTop: "20px" }}>{item.description}</p>
                                        <button
                                            className='zw_title_color'
                                            data-bs-toggle={!isAuthenticated ? "modal" : undefined}
                                            data-bs-target={!isAuthenticated ? "#Loginmodal" : undefined}
                                            onClick={handleLoginClick}
                                            style={{ width: "200px", height: "50px", fontSize: "22px", marginTop: "30px", fontFamily: "Poppins, 'Source Sans Pro'", border: "none", borderRadius: "5px" }}>
                                            Login
                                        </button>
                                    </div>
                                    <div className="banner-rights">
                                        <img src={getFullImageUrl(item.image_path)} width="100%" alt="Zawaara" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
 
                <div className="carousel-indicators">
                    {bannerData.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#myCarousel"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default HomeBannerSlider;
 
