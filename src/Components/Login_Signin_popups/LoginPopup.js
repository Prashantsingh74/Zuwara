import React, { useState, useContext, useEffect } from 'react';
import '../../Style/Signin_popup.css';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context';

function LoginPopup() {
    const { loginForm, setUsername, setUserId, setUserDetails, setIsAuthenticated, setLoginForm, isLoading, setIsLoading, error, setError, show, setShow } = useContext(Context);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const countries = [
        { "code": "sa", "name": "Saudi Arabia", "countryCode": "+966" },
        { "code": "in", "name": "India", "countryCode": "+91" },
        { "code": "us", "name": "United States", "countryCode": "+1" },
        { "code": "ca", "name": "Canada", "countryCode": "+1" },
        { "code": "gb", "name": "United Kingdom", "countryCode": "+44" },
        { "code": "au", "name": "Australia", "countryCode": "+61" },
        { "code": "ae", "name": "United Arab Emirates", "countryCode": "+971" },
        { "code": "de", "name": "Germany", "countryCode": "+49" },
        { "code": "fr", "name": "France", "countryCode": "+33" },
        { "code": "cn", "name": "China", "countryCode": "+86" },
        { "code": "jp", "name": "Japan", "countryCode": "+81" },
        { "code": "ru", "name": "Russia", "countryCode": "+7" },
        { "code": "br", "name": "Brazil", "countryCode": "+55" },
        { "code": "za", "name": "South Africa", "countryCode": "+27" },
        { "code": "ng", "name": "Nigeria", "countryCode": "+234" },
        { "code": "eg", "name": "Egypt", "countryCode": "+20" },
        { "code": "es", "name": "Spain", "countryCode": "+34" },
        { "code": "it", "name": "Italy", "countryCode": "+39" },
        { "code": "mx", "name": "Mexico", "countryCode": "+52" },
        { "code": "tr", "name": "Turkey", "countryCode": "+90" },
        { "code": "kr", "name": "South Korea", "countryCode": "+82" },
        { "code": "id", "name": "Indonesia", "countryCode": "+62" },
        { "code": "ar", "name": "Argentina", "countryCode": "+54" },
        { "code": "pk", "name": "Pakistan", "countryCode": "+92" },
        { "code": "bd", "name": "Bangladesh", "countryCode": "+880" },
        { "code": "th", "name": "Thailand", "countryCode": "+66" },
        { "code": "vn", "name": "Vietnam", "countryCode": "+84" },
        { "code": "my", "name": "Malaysia", "countryCode": "+60" },
        { "code": "sg", "name": "Singapore", "countryCode": "+65" },
        { "code": "ph", "name": "Philippines", "countryCode": "+63" },
        { "code": "hk", "name": "Hong Kong", "countryCode": "+852" },
        { "code": "nz", "name": "New Zealand", "countryCode": "+64" },
        { "code": "ke", "name": "Kenya", "countryCode": "+254" },
        { "code": "gh", "name": "Ghana", "countryCode": "+233" },
        { "code": "dz", "name": "Algeria", "countryCode": "+213" },
        { "code": "ma", "name": "Morocco", "countryCode": "+212" },
        { "code": "se", "name": "Sweden", "countryCode": "+46" },
        { "code": "no", "name": "Norway", "countryCode": "+47" },
        { "code": "fi", "name": "Finland", "countryCode": "+358" },
        { "code": "dk", "name": "Denmark", "countryCode": "+45" },
        { "code": "ch", "name": "Switzerland", "countryCode": "+41" },
        { "code": "nl", "name": "Netherlands", "countryCode": "+31" },
        { "code": "be", "name": "Belgium", "countryCode": "+32" },
        { "code": "pt", "name": "Portugal", "countryCode": "+351" },
        { "code": "gr", "name": "Greece", "countryCode": "+30" },
        { "code": "pl", "name": "Poland", "countryCode": "+48" },
        { "code": "ua", "name": "Ukraine", "countryCode": "+380" },
        { "code": "il", "name": "Israel", "countryCode": "+972" },
        { "code": "ir", "name": "Iran", "countryCode": "+98" }
    ];



    useEffect(() => {
        setLoginForm({
            ...loginForm,
            country: 'Saudi Arabia',
            countryCode: '+966',
        });
    }, [setLoginForm]);

    useEffect(() => {
        const storedDetails = localStorage.getItem('userDetails');
        if (storedDetails) {
            setUserDetails(JSON.parse(storedDetails));
        }
    }, []);

    // validation
    const validate = (values) => {
        const errors = {};
        const country = countries.find(country => country.name === values.country);

        if (!values.country) {
            errors.country = 'Country is required!';
        }
        if (!values.phone) {
            errors.phone = 'Mobile Number is required!';
        } else if (country) {
            const phoneRegex = getPhoneNumberRegex(country.countryCode);
            if (!phoneRegex.test(values.phone)) {
                errors.phone = ' mobile number format for the selected country!';
            }
        } else {
            errors.phone = 'Invalid country selected!';
        }

        return errors;
    };

    const getPhoneNumberRegex = (countryCode) => {
        const regexMap = {
            '+966': /^5\d{8}$/,        // Saudi Arabia
            '+91': /^[6-9]\d{9}$/,      // India
        };
        return regexMap[countryCode] || /^.+$/;
    };

    const handleCountryChange = (event) => {
        const selectedCountry = countries.find(country => country.code === event.target.value);
        if (selectedCountry) {
            setLoginForm({
                ...loginForm,
                country: selectedCountry.name,
                countryCode: selectedCountry.countryCode
            });
        }
    };

    const getCountryCode = (selectedCountry) => {
        const country = countries.find((c) => c.name === selectedCountry);
        return country ? country.countryCode : '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(loginForm);

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            setError(null);
            try {
                const formData = new FormData();
                formData.append('country', loginForm.country);
                formData.append('phone', loginForm.phone);

                const response = await fetch('https://zuwara.net/admin/public/api/login', {
                    method: 'POST',
                    headers: {
                        'Cookie': 'zwarra_session=q3ei4VMHZzytvKDUsxsnbXAx1tH0DqgsfnG4wLmR'
                    },
                    body: formData,
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Mobile number is not registered');
                    } else {
                        throw new Error('Login failed');
                    }
                }

                const data = await response.json();
                console.log("Logged in successfully!", data);

                if (data.message === 'Login successful' && data.token && data.username) {
                    setShow(false);

                    sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
                    sessionStorage.setItem('username', JSON.stringify(data.username));
                    localStorage.setItem('userid', JSON.stringify(data.id));
                    setIsAuthenticated(true);
                    setUsername(data.username);
                    setUserId(data.id);

                    const details = [
                        {
                            username: data.username,
                            email: data.email,
                            phone: data.phone,
                            dob: data.dob,
                            nationalid: data.nationalid,
                            maritalstatus: data.maritalstatus,
                            country: data.country,
                            gender: data.gender,
                        },
                    ];
                    setUserDetails(details);
                    localStorage.setItem('userDetails', JSON.stringify(details));

                    const currentModal = window.bootstrap.Modal.getInstance(
                        document.getElementById("Loginmodal")
                    );
                    currentModal.hide();

                } else {
                    throw new Error('Login failed');
                }

            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            setFormErrors(errors);
        }
    };

    const handleMobileNumberChange = (event) => {
        const { value } = event.target;
        setLoginForm({ ...loginForm, phone: value });

        if (formErrors.phone) {
            const country = countries.find(country => country.name === loginForm.country);

            if (country) {
                const phoneRegex = getPhoneNumberRegex(country.countryCode);
                if (phoneRegex.test(value)) {
                    setFormErrors({ ...formErrors, phone: undefined });
                }
            }
        }
    };

    // Effect to clean up the modal backdrop
    useEffect(() => {
        if (!show) {
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach(backdrop => backdrop.parentNode.removeChild(backdrop));
            document.body.classList.remove('modal-open'); // Remove modal-open class
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    }, [show]);

    const onSignup = () => {
        const nextModal = new window.bootstrap.Modal(document.getElementById('signup'));
        const currentModal = window.bootstrap.Modal.getInstance(document.getElementById('Loginmodal'));
        currentModal.hide();
        nextModal.show();
    }

    return (
        <>
            <div className={`zw_popup ${show ? 'show' : ''}`}>
                <div className={`modal fade zw_captch_pop ${show ? 'show' : ''}`} id="Loginmodal" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden={!show}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className='btn-space'>
                                    <button type="button" className="sps-dialog-close regv2back" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShow(false)}>
                                        <img src="./images/loginclose.png" alt="" style={{ width: "24px", height: "24px" }} ></img>
                                    </button>
                                </div>
                                <div className="card card-primary-light card-no-border last-child m-auto">
                                    <div className="login-brd">
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-group input-group-vert mb20">
                                                <label className='zw_text_color poppins-regular zw_32'>Country</label>
                                                <div className="form-group zw_form_group">
                                                    <div className='zw_form_control1 zw_secondary poppins-regular zw_16' style={{ position: 'relative' }}>
                                                        <div>
                                                            <select
                                                                id="countrycode"
                                                                name="countrycode"
                                                                className="input-no-border poppins-regular zw_22 zw_secondary w-100 px-4 py-2"
                                                                style={{ border: 'none', borderRadius: '4px', WebkitAppearance: 'none' }}
                                                                value={countries.find(country => country.name === loginForm.country)?.code || ''}
                                                                onChange={handleCountryChange}
                                                            >
                                                                {countries.map((country) => (
                                                                    <option key={country.code} value={country.code}>
                                                                        {`${country.name} (${country.countryCode})`}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="dropdown-icon" style={{
                                                                position: 'absolute',
                                                                right: '10px',
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                pointerEvents: 'none'
                                                            }}>
                                                                <img src="./images/custom-dropdown-icon.png" alt="" style={{ width: "20px" }} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {formErrors.country && <div style={{ color: 'red', fontSize: "12px" }}>{formErrors.country}</div>}
                                                <div className="form-group zw_form_group">
                                                    <div className='zw_country_sec zw_border_radius zw_light_bg'>
                                                        {loginForm.country && (
                                                            <img
                                                                className="img-ccode form-img zw_country_flag"
                                                                src={`https://sanar-assets.com/flags/${countries.find(country => country.name === loginForm.country)?.code}_64.png`}
                                                                alt={`${loginForm.country} Flag`}
                                                            />
                                                        )}
                                                        {/* <span className="cuntry-plholder poppins-regular zw_22">{getCountryCode(loginForm.country)}</span> */}
                                                    </div>
                                                    <input
                                                        type='text'
                                                        className='zw_form_control1 poppins-regular zw_20 zw_secondary py-2'
                                                        placeholder='Number'
                                                        style={{ width: "100%", paddingLeft: "110px", height: "46px" }}
                                                        name="phone"
                                                        value={loginForm.phone}
                                                        onChange={handleMobileNumberChange}
                                                    />
                                                    {formErrors.phone && <div style={{ color: 'red', fontSize: "12px" }}>{formErrors.phone}</div>}
                                                </div>
                                            </div>
                                            {/* <div className="sp-button-block">
                                                <button className="primary_btn zw_w100" disabled={isLoading} type="submit">
                                                    {isLoading ? 'Loading...' : 'Continue'}
                                                </button>
                                            </div> */}

                                            <div className="form-group f-size12 poppins-regular zw_16" style={{ top: "-15px", marginBottom: "10px", fontSize: "12px" }}>
                                                By clicking continue you agree to our&nbsp;
                                                {/* <Link
                                                    to="/termsandcondition"
                                                    className="link"
                                               
                                                    style={{ textDecoration: 'underline' }}
                                                >
                                                    <u style={{ textDecoration: 'underline' }}> Terms &amp; Conditions </u>
                                                </Link>{' '}
                                                and{' '}
                                                <Link
                                                    to="/privacypolicy"
                                                    className="link"
                                                    

                                                >
                                                    <u style={{ textDecoration: 'underline' }}> Privacy Policy</u>
                                                </Link> */}
                                                <Link
                                                    to="/termsandcondition"
                                                    className="link"
                                                    onClick={() => {
                                                        const currentModal = window.bootstrap.Modal.getInstance(document.getElementById('Loginmodal'));
                                                        if (currentModal) currentModal.hide();
                                                    }}
                                                    style={{ textDecoration: 'underline' }}
                                                >
                                                    <u style={{ textDecoration: 'underline' }}>Terms & Conditions</u>
                                                </Link>
                                                &nbsp;and&nbsp;
                                                <Link
                                                    to="/privacypolicy"
                                                    className="link"
                                                    onClick={() => {
                                                        const currentModal = window.bootstrap.Modal.getInstance(document.getElementById('Loginmodal'));
                                                        if (currentModal) currentModal.hide();
                                                    }}
                                                    style={{ textDecoration: 'underline' }}
                                                >
                                                    <u style={{ textDecoration: 'underline' }}>Privacy Policy</u>
                                                </Link>
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn-primary btn-lg btn-block poppins-regular zw_bg_gradient zw_btn_18 zw_sbmtbtn_radius " data-bs-dismiss="modal"
                                            // Center button and set width
                                            >
                                                {isLoading ? 'Logging in...' : 'Login'}
                                            </button>
                                            <p className='poppins-regular zw_20 zw_title_color mt-3' style={{ textAlign: "center" }}>
                                                Don't have an account? <Link className='signup_link' onClick={onSignup} ><span style={{ color: '#602D8A' }}>
                                                    <u style={{ textDecoration: 'underline' }}> Sign Up</u>
                                                </span></Link>
                                            </p>
                                            {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '10px', fontSize: "12px" }}>{error}</div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPopup;
