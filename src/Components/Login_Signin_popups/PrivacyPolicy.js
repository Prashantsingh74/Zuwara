import React, { useState,useEffect } from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import '../../Style/Privacypolocy.css'
import { useNavigate,useParams } from 'react-router-dom'


function PrivacyPolicy() {
    let navigate = useNavigate();

    const toggleItem = (id) => {
        setActiveItem(prevActiveItem => (prevActiveItem === id ? null : id));
    };

    const [activeItem, setActiveItem] = useState(null);
    const [privacyPolicyData,setPrivacyPolicyData] = useState([]);
    const name = useParams();

    useEffect(() => {
        const fetchPolicyData = async () => {
            try {
                const response = await fetch(`https://zuwara.net/admin/public/api/all-privacy-policy?name=${encodeURIComponent(name)}`, {
                    method: 'GET',
                    headers: {
                        'Cookie': 'zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch terms and conditions');
                }

                const data = await response.json();
                setPrivacyPolicyData(data); // Store the response in state
            } catch (error) {
                console.error('Error fetching terms:', error);
            }
        };

        fetchPolicyData();
    }, [name]);
    return (
        <div>
            <Navbar />

            <section className="zw_faq" style={{ marginTop: '90px' }}>
                <div className="container">
                    <div className="faq-box-inner faq-box-padd">
                        <span className="btn-back zw_btn_18 poppins-medium zw_black" onClick={() => navigate(-1)}>
                            <i className="icon-arrow-left"></i>
                            <span className="mob-none">Back</span>
                        </span>
                        <div className='mt-4 pt-4'>
                            <h4 className="tit zw_24 zw_text_color poppins-semibold">PRIVACY POLICY</h4>
                            <p className='poppins-regular zw_16 zw_text_color' style={{ marginTop: "-15px" }}>Your privacy is critically important to us.</p>
                        </div>
                        <div className="accordion" id="myAccordion">
                            {privacyPolicyData.map((item) => (

                                <div className="accordion-item" key={item.id}>
                                    <h2 className="accordion-header" id={`header${item.id}`}>
                                        <button
                                            type="button"
                                            className={`accordion-button ${activeItem === item.id ? '' : 'collapsed'} poppins-semibold zw_text_color zw_16`}
                                            onClick={() => toggleItem(item.id)}
                                            style={{ fontSize: '16px', color: '#111535', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        >

                                            {item.Name}

                                            <img src="./images/custom-dropdown-icon.png" alt='zxz' style={{ marginLeft: 'auto',width:"15px" }}/>
                                        </button>
                                    </h2>
                                    <div
                                        id={`accordion_${item.id}`}
                                        className={`accordion-collapse collapse ${activeItem === item.id ? 'show' : ''} poppins-regular zw_text_color zw_14`}
                                        data-bs-parent="#myAccordion"
                                    >
                                        <div className="accordion-body">
                                            <p className='px-4 poppins-regular zw_secondary'>{item.Tcenglish}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default PrivacyPolicy
