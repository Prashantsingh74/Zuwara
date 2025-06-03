import React, { useState, useEffect } from 'react';
import '../../Style/Carousel.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import openQuote from "../../assets/img/openquote.png";
import closeQuote from "../../assets/img/closequote.png";

function Carousel() {
    const [reviews, setReviews] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3); // Default to 3 slides

    useEffect(() => {
        const apiUrl = 'https://zuwara.net/admin/public/api/customer-reviews';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching customer reviews:', error));

        const updateSlidesToShow = () => {
            const width = window.innerWidth;
            if (width < 600) {
                setSlidesToShow(1);
            } else if (width < 1024) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };

        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);

        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
        beforeChange: (current, next) => setActiveSlide(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const getMiddleIndex = () => {
        if (slidesToShow % 2 === 1) {
            return Math.floor(slidesToShow / 2);
        }
        return -1; // No middle slide for even numbers
    };

    const middleIndex = getMiddleIndex();
    return (
        <div className='container zw_teatimonial'>
            <div className="padd-x">
                <h1 className="z-carousel-title poppins-semibold zw_title_color zw_46">Customer Review</h1>
            </div>
            <Slider {...settings} id="carouselExample" className="carousel slide z-carousel-container" data-bs-ride="carousel">
                {reviews.map((item, index) => (
                    <div key={index} className={`carousel-item text-center ${index === (activeSlide + middleIndex) % reviews.length ? 'active-slide' : ''}`}>
                        <div className="card-wrapper container-sm d-flex justify-content-around">
                            <div className="z-carousel-item zw_mt">
                                <div className="card-body z-card-show" style={{borderRadius:'15px'}}>
                                    <div className="zw_testimonial_bg zw_tes_des">
                                        <img src={openQuote} alt="Open quotation" className="quote-img" />
                                        
                                        <div className="poppins-bold zw_12 zw_secondary">
                                            {item.Review}
                                                     {/* <img src={closeQuote} className="quote-img2" alt="Close quotation"  />  */}
        
                                        </div>
                                        <img src={closeQuote} className="quote-img2" alt="Close quotation"  />
                                        {/* <img src={openQuote} alt="Open quotation" className="quote-img" /> */}
                                    </div>
                                    <div className="avatar mx-auto">
                                        <img src={item.Image} className="rounded-circle img-fluid" alt={item.Name} />
                                    </div>
                                    <div className="text-center py-3" style={{ fontSize: "25px" }}>
                                        <p className="text-warning mt-3">
                                        {[1, 2, 3, 4, 5].map((star, i) => (
                                                        <span key={i} className={i < parseInt(item.Ratings, 5) ? '' : 'fa fa-star px-2'}></span>
                                                    ))}
                                        </p>
                                        <h5 className="card-title my-2 poppins-bold zw_12 zw_text_color">{item.Name}</h5>
                                        <h5 className="card-title my-2 poppins-medium zw_12 zw_text_color">{item.TypeOfReviewer}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carousel;
