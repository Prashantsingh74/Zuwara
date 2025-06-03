import React from 'react'
import '../../Style/Virtual.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';

function HomeBodyCard() {
    const { t } = useTranslation();
    return (
        <>

            <div className='container'>
                <div className="mb-3 padd-x" >
                    <div className="row g-0">
                        {/* <div className='col-md-12 mt-4 mb-4'> <h2 className='poppins-semibold zwaara_title'>About Us</h2></div> */}

                        <div className='col-md-12 my-4'> <h2 className='poppins-semibold zwaara_title' >About Us</h2></div>

                        <div className="col-md-5 ">
                            <img src="images/about-left.svg" className="img-fluid z-card-img rounded-start" alt="..." />
                        </div>
                        <div className="col-md-7 d-flex align-items-center">
                            <div className="card-body">
                                <div className='z-virtual'>
                                    <div className='zw_title_color my-5'><h1 className="card-title poppins-bold zw_16 ">Who We Are</h1></div>
                                    <p className="card-text poppins-medium zw_16 zw_black my-5">Wilt u de voordelen van zorg op maat ervaren? Ontdek hoe Daily Homecare u kan helpen om
                                        comfortabel en met zorg te leven. Meld u klsiksij juejk jkunweui vandaag nog aan en laat ons uw partner zijn
                                        op uw zorgreis. Wilt u de voordelen van zorg op maat ervaren? Ontdek hoe Daily Homecare u kan helpen om
                                        comfortabel en met zorg te leven. Meld u klsiksij juejk jkunweui vandaag nog aan en laat ons uw partner zijn
                                        op uw zorgreis.</p>

                                    <button className='zw_btn_primary zw_bg my-5'>
                                        <Link to="/aboutus" style={{ color: "#fff", textDecoration: 'none' }}>
                                            <span className='poppins-medium zw_btn_18 '>
                                                Learn More
                                            </span>
                                        </Link>
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeBodyCard