import React, { useState, useRef, useEffect, useContext } from 'react';
import '../../Style/login_popup.css';
import { Context } from '../../Context';

function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef([]);
  const { signupFormData } = useContext(Context);
  const { Phone } = signupFormData;

  useEffect(() => {
    // Focus on the first input field when the component mounts
    inputRefs.current[0].focus();
  }, []);

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on the next input field if the current one is filled
      if (index < otp.length - 1 && value !== '') {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus on the previous input field if Backspace is pressed and the current input is empty
      inputRefs.current[index - 1].focus();
    }
  };

  const otpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    const combinedOtp = otp.join(''); // Combine OTP inputs

    try {
      // Initialize FormData correctly
      const formData = new FormData();
      formData.append('Phone', Phone);
      formData.append('Otp', combinedOtp);

      const response = await fetch('https://zuwara.net/admin/public/api/verify-otp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      const result = await response.json(); // Parse JSON response

      if (response.ok) {
        console.log('OTP Verification Success:', result.message);

        // Show success modal and hide the current one
        const nextModal = new window.bootstrap.Modal(document.getElementById('successs'));
        const currentModal = window.bootstrap.Modal.getInstance(document.getElementById('OTP'));
        currentModal.hide();
        nextModal.show();
      } else {
        setErrorMessage(result.message || 'Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className='zw_popup'>
      <div className="modal fade" id="OTP" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered ms-auto" role="document">
          <div className="modal-content">
            <div className="modal-body mb-4">
              <div className="reg-spcv1 regspcv2">
                <button type="button" className="sps-dialog-close regv2back" data-bs-dismiss="modal" aria-label="Close">
                  <img src="/images/crossicon.png" alt="" style={{ width: "16px" }} />
                </button>

                <div className="set-up mob-header mt-5 d-flex">
                  <img
                    src="/images/backmark.png"
                    className="ms-5"
                    style={{ height: '3rem', cursor: 'pointer' }}
                    alt="Back"
                  />
                  <h6 className='poppins-semibold zw_text_color zw_28 mb-4' style={{ textAlign: "center" }}>Account Setup</h6>
                </div>

                <div className="container ps-5">
                  <p className='poppins-regular zw_24 zw_9B9B9B mb-0'>Step 3 completed of 4</p>
                  <div className='line_indicator_container w-100'>
                    <div className='line-indicator-bg each_line_indicator active'></div>
                    <div className='line-indicator-bg each_line_indicator active'></div>
                    <div className='line-indicator-bg each_line_indicator active'></div>
                    <div className='line-indicator-bg each_line_indicator active'></div>
                  </div>
                </div>

                <div className="container">
                  <div className="form-group verifi-code">
                    <div className=" dir-ltr dir-ltrrr mx-5">
                      {otp.map((digit, index) => (
                        <div className="" key={index}>
                          <input
                            type="tel"
                            placeholder='1'
                            maxLength="1"
                            className="mb-3 zw_secondary poppins-regular zw_24 zw_form_control text-center plr10 otpfield"
                            name="Otp"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(el) => (inputRefs.current[index] = el)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center dir-ltr m-4">
                    <p className="zw_20 poppins-medium zw_text_color verification-link" style={{ marginTop: "-30px" }}>Please type the verification code</p>
                    <span className='zw_20 poppins-semibold zw_text_color'>{Phone}</span>
                  </div>
                  {errorMessage && (
                    <div className="text-center text-danger">
                      <p>{errorMessage}</p>
                    </div>
                  )}
                  <div className="d-flex justify-content-center mt-5">
                    <button
                      type='button'
                      className='zw_text_fff mt-3 poppins-regular zw_24 zw_bg_gradient zw_btn_18 zw_border_none p-2'
                      onClick={otpSubmit}
                      style={{ width: "340px", height: "55px", borderRadius: '6px' }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
              <div className="reg-spcv3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTP;
