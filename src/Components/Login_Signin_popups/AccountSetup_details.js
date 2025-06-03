import React, { useContext, useState } from 'react';
import '../../Style/login_popup.css';
import { Context } from '../../Context';


function AccountSetup_details() {
    const { signupFormData, updateSignupFormData } = useContext(Context);
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});

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

    // Username validation function (alphanumeric)
    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!username) {
            return 'Username is required!';
        } else if (!usernameRegex.test(username)) {
            return 'Username must be alphanumeric!';
        }
        return '';
    };

    // Password validation function
    const validatePassword = (password) => {
        const errors = {};
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValidLength = password.length >= 8;

        if (!hasUpperCase) {
            errors.upperCase = 'Password must contain at least one uppercase character!';
        }
        if (!hasLowerCase) {
            errors.lowerCase = 'Password must contain at least one lowercase character!';
        }
        if (!hasDigit) {
            errors.digit = 'Password must contain at least one digit!';
        }
        if (!hasSpecialChar) {
            errors.specialChar = 'Password must contain at least one special character!';
        }
        if (!isValidLength) {
            errors.length = 'Password must be at least 8 characters long!';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailError = validateEmail(signupFormData.Email);
        const usernameError = validateUsername(username);
        const passwordErrors = validatePassword(signupFormData.Password);
        const errors = { ...formErrors };

        if (emailError) errors.Email = emailError;
        if (usernameError) errors.Username = usernameError;
        if (Object.keys(passwordErrors).length > 0) errors.Password = passwordErrors;

        if (Object.keys(errors).length === 0) {
            updateSignupFormData(signupFormData);

            const nextModal = new window.bootstrap.Modal(document.getElementById('accountsetup_gender'));
            const currentModal = window.bootstrap.Modal.getInstance(document.getElementById('accountsetup_details'));
            currentModal.hide();
            nextModal.show();
        } else {
            setFormErrors(errors);
        }
    };

    // Handle dynamic input validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateSignupFormData({
            ...signupFormData,
            [name]: value,
        });

        const newErrors = { ...formErrors };

        if (name === 'Email') {
            const emailError = validateEmail(value);
            if (emailError) newErrors.Email = emailError;
            else delete newErrors.Email;
        }

        if (name === 'Password') {
            const passwordErrors = validatePassword(value);
            if (Object.keys(passwordErrors).length > 0) newErrors.Password = passwordErrors;
            else delete newErrors.Password;
        }

        if (name === 'Password' && value === confirmPassword) {
            delete newErrors.ConfirmPassword;
        }

        setFormErrors(newErrors);
    };

    // Username input handler
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        const newErrors = { ...formErrors };

        const usernameError = validateUsername(event.target.value);
        if (usernameError) {
            newErrors.Username = usernameError;
        } else {
            delete newErrors.Username;
        }

        setFormErrors(newErrors);
    };

    // Confirm Password handler
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        const newErrors = { ...formErrors };
        if (event.target.value !== signupFormData.Password) {
            newErrors.ConfirmPassword = 'Passwords do not match!';
        } else {
            delete newErrors.ConfirmPassword;
        }
        setFormErrors(newErrors);
    };



    return (
        <div className='zw_popup'>
            <div className="modal fade" id="accountsetup_details" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered ms-auto" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className='mt-3'>
                                <button className="sps-dialog-close regv2back" data-bs-dismiss="modal" aria-label="Close">
                                    <i className="icon-close"></i>
                                </button>
                            </div>
                            <div>
                                <h6 className='poppins-semibold zw_text_color zw_32 mb-4' style={{ textAlign: "center", fontSize: "26px", marginBottom: "1.0rem !important" }}>Account Setup</h6>
                            </div>
                            <div className="container ps-5">
                                <p className='poppins-regular zw_24 zw_9B9B9B mb-0' style={{ fontSize: "18px" }}>
                                    Step 1 completed of 4
                                </p>
                                {/* <div className='line_indicator_container w-100'>
                                    <div className='line-indicator-bg each_line_indicator active'></div>
                                    <div className='line-indicator-bg each_line_indicator'></div>
                                    <div className='line-indicator-bg each_line_indicator'></div>
                                    <div className='line-indicator-bg each_line_indicator'></div>
                                </div> */}
                                <div className="prog-grid1">
                                    <div className="prog-bar1" style={{ backgroundColor: "#DDE0E6", height: "8px", borderRadius: "4px" }}>
                                        <div className="prog-bar-per" style={{ width: "55%", backgroundColor: "#af2245", height: "88%", borderRadius: "4px" }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className='container' style={{ backgroundColor: "#f7e9ec", padding: "20px", marginTop: "20px" }}>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group zw_form_group mb-0">
                                        <input type='text' className='px-4 py-3 zw_form_control zw_secondary poppins-regular zw_16' placeholder='Email' style={{ width: "100%" }} name="Email" value={signupFormData.Email} onChange={handleChange}></input>
                                    </div>
                                    {formErrors.Email && <span className="sa-error-message" style={{ 'color': "red", fontSize: "12px" }}>{formErrors.Email}</span>}
                                    <div className="form-group zw_form_group mb-0 mt-5">
                                        <input type='text' className='px-4 py-3 zw_form_control zw_secondary poppins-regular zw_16' placeholder='Username' style={{ width: "100%" }} value={username} onChange={handleUsernameChange}></input>
                                    </div>
                                    {formErrors.Username && <span className="sa-error-message" style={{ 'color': "red", fontSize: "12px" }}>{formErrors.Username}</span>}
                                    <div className="form-group zw_form_group mb-0 mt-5">
                                        <input type='password' className='px-4 py-3 zw_form_control zw_secondary poppins-regular zw_16' placeholder='Create Password' style={{ width: "100%" }} name="Password" value={signupFormData.Password} onChange={handleChange}></input>
                                    </div>
                                    {formErrors.Password && <span className="sa-error-message" style={{ color: "red", fontSize: "12px" }}>
                                        {Object.values(formErrors.Password).map((msg, index) => (
                                            <div key={index}>{msg}</div>
                                        ))}
                                    </span>}
                                    <div className="form-group zw_form_group mb-0 mt-5">
                                        <input type='password' className='px-4 py-3 zw_form_control zw_secondary poppins-regular zw_16' placeholder='Confirm Password' style={{ width: "100%" }} value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                                    </div>
                                    {formErrors.ConfirmPassword && <span className="sa-error-message" style={{ 'color': "red", fontSize: "12px" }}>{formErrors.ConfirmPassword}</span>}
                                    <div className="d-flex justify-content-center mt-5">
                                        <button type='submit' className='zw_text_fff  poppins-medium zw_bg_gradient zw_btn_18 zw_border_none p-2' style={{ width: "340px", height: "55px", borderRadius: '6px' }}>
                                            Next
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ====================================  done  ========================== */}

        </div>
    );
}

export default AccountSetup_details;
