import React, { useState } from 'react';
import '../../Style/Home.css';

function Joinus() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (!email) {
            return 'Email is required!';
        } else if (!emailRegex.test(email)) {
            return 'Email must be in lowercase and in a valid format!';
        }
        return '';
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();

        // Validate email
        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Make API request if validation passes
        const response = await fetch('https://zuwara.net/admin/public/api/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log('Subscription successful');
            setSuccess(true);
            setEmail('');
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } else {
            console.error('Failed to subscribe');
            setSuccess(false);
        }

        const result = await response.json();
        console.log(result);
    };

    const handleChange = (e) => {
        if (error) {
            setError('');
        }
        setEmail(e.target.value);
    };

    return (
        <>
            <div className='zw_joinus'>
                <div className='z-join-us-bg'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <img src="images/zawaara-medical portal.svg" className="img-fluid z-card-img rounded-start" alt="..." />
                            </div>
                            <div className='col-md-8 mt-5'>
                                <h6 className='zw_newsletter poppins-semibold zw_16 zw_title_color'>Newsletter</h6>
                                <h6 className='zw_new_title poppins-semibold zw_46 zw_news_text'>JOIN US</h6>
                                <p className='zw_news_des zw_16 poppins-semibold zw_secondary'>
                                    Subscribe to our newsletter for new updates and medical information.
                                </p>
                                <div className="input-group email-subscribe mb-3">
                                    <input
                                        type="text"
                                        className="form-control form-controll-news zw_secondary poppins-bold zw_16 email-input"
                                        placeholder="Your Email"
                                        aria-label="Recipient's email"
                                        aria-describedby="basic-addon2"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                    <div className="input-group-append poppins-regular zw_btn_18">
                                        <button
                                            className="btn-outline-secondary poppins-semibold px-4 border-0 btn-joinus-subs"
                                            type="button"
                                            id="button-addon2"
                                            onClick={handleSubscribe}
                                        >
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                                <div className='zw_error zw_16 poppins-regular'>
                                    {error && <div className="text-danger">{error}</div>}
                                    {success && <div className="text-success">Subscription successful</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Joinus;
