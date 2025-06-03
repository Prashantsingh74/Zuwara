import React, { useState, useEffect, useContext } from 'react';
import '../../Style/login_popup.css';
import { Context } from '../../Context';

function AccountSetup_captcha() {
  const { setIsAuthenticated, setUsername, setPatientName, isLoading, setIsLoading, signupFormData, updateSignupFormData } = useContext(Context);
  const [formErrors, setFormErrors] = useState({});
  const [response, setResponse] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('sa');

  const countries = [
    { "code": "sa", "name": "Saudi Arabia", "countryCode": "+966" },
    { "code": "in", "name": "India", "countryCode": "+91" },
    { "code": "eg", "name": "Egypt", "countryCode": "+20" },
    { "code": "au", "name": "Australia", "countryCode": "+61" },
    { "code": "ca", "name": "Canada", "countryCode": "+1" },
    { "code": "fr", "name": "France", "countryCode": "+33" },
    { "code": "pk", "name": "Pakistan", "countryCode": "+92" },
    { "code": "lk", "name": "Sri Lanka", "countryCode": "+94" },
    { "code": "us", "name": "United States", "countryCode": "+1" },
    { "code": "gb", "name": "United Kingdom", "countryCode": "+44" },
    { "code": "cn", "name": "China", "countryCode": "+86" },
    { "code": "jp", "name": "Japan", "countryCode": "+81" },
    { "code": "de", "name": "Germany", "countryCode": "+49" },
    { "code": "br", "name": "Brazil", "countryCode": "+55" },
    { "code": "za", "name": "South Africa", "countryCode": "+27" },
    { "code": "ng", "name": "Nigeria", "countryCode": "+234" },
    { "code": "ru", "name": "Russia", "countryCode": "+7" },
    { "code": "mx", "name": "Mexico", "countryCode": "+52" },
    { "code": "it", "name": "Italy", "countryCode": "+39" },
    { "code": "es", "name": "Spain", "countryCode": "+34" },
    { "code": "kr", "name": "South Korea", "countryCode": "+82" },
    { "code": "ae", "name": "United Arab Emirates", "countryCode": "+971" },
    { "code": "sg", "name": "Singapore", "countryCode": "+65" },
    { "code": "tr", "name": "Turkey", "countryCode": "+90" },
    { "code": "id", "name": "Indonesia", "countryCode": "+62" },
    { "code": "ph", "name": "Philippines", "countryCode": "+63" },
    { "code": "ar", "name": "Argentina", "countryCode": "+54" },
    { "code": "cl", "name": "Chile", "countryCode": "+56" },
    { "code": "nl", "name": "Netherlands", "countryCode": "+31" },
    { "code": "se", "name": "Sweden", "countryCode": "+46" },
    { "code": "my", "name": "Malaysia", "countryCode": "+60" },
    { "code": "th", "name": "Thailand", "countryCode": "+66" },
    { "code": "vn", "name": "Vietnam", "countryCode": "+84" },
    { "code": "nz", "name": "New Zealand", "countryCode": "+64" },
    { "code": "pl", "name": "Poland", "countryCode": "+48" },
    { "code": "ke", "name": "Kenya", "countryCode": "+254" },
    { "code": "ua", "name": "Ukraine", "countryCode": "+380" },
    { "code": "gr", "name": "Greece", "countryCode": "+30" },
    { "code": "ch", "name": "Switzerland", "countryCode": "+41" },
    { "code": "no", "name": "Norway", "countryCode": "+47" },
    { "code": "dk", "name": "Denmark", "countryCode": "+45" },
    { "code": "fi", "name": "Finland", "countryCode": "+358" },
    { "code": "be", "name": "Belgium", "countryCode": "+32" },
    { "code": "at", "name": "Austria", "countryCode": "+43" },
    { "code": "hu", "name": "Hungary", "countryCode": "+36" },
    { "code": "cz", "name": "Czech Republic", "countryCode": "+420" },
    { "code": "pt", "name": "Portugal", "countryCode": "+351" },
    { "code": "ie", "name": "Ireland", "countryCode": "+353" },
    { "code": "ro", "name": "Romania", "countryCode": "+40" },
    { "code": "bg", "name": "Bulgaria", "countryCode": "+359" },
    { "code": "sk", "name": "Slovakia", "countryCode": "+421" },
    { "code": "si", "name": "Slovenia", "countryCode": "+386" },
    { "code": "hr", "name": "Croatia", "countryCode": "+385" },
    { "code": "rs", "name": "Serbia", "countryCode": "+381" },
    { "code": "il", "name": "Israel", "countryCode": "+972" },
    { "code": "ma", "name": "Morocco", "countryCode": "+212" },
    { "code": "dz", "name": "Algeria", "countryCode": "+213" },
    { "code": "tn", "name": "Tunisia", "countryCode": "+216" },
    { "code": "gh", "name": "Ghana", "countryCode": "+233" },
    { "code": "co", "name": "Colombia", "countryCode": "+57" },
    { "code": "pe", "name": "Peru", "countryCode": "+51" },
    { "code": "ve", "name": "Venezuela", "countryCode": "+58" },
    { "code": "iq", "name": "Iraq", "countryCode": "+964" },
    { "code": "jo", "name": "Jordan", "countryCode": "+962" },
    { "code": "kw", "name": "Kuwait", "countryCode": "+965" },
    { "code": "lb", "name": "Lebanon", "countryCode": "+961" },
    { "code": "om", "name": "Oman", "countryCode": "+968" },
    { "code": "qa", "name": "Qatar", "countryCode": "+974" },
    { "code": "sy", "name": "Syria", "countryCode": "+963" },
    { "code": "ye", "name": "Yemen", "countryCode": "+967" },
    { "code": "af", "name": "Afghanistan", "countryCode": "+93" },
    { "code": "bd", "name": "Bangladesh", "countryCode": "+880" },
    { "code": "bt", "name": "Bhutan", "countryCode": "+975" },
    { "code": "kh", "name": "Cambodia", "countryCode": "+855" },
    { "code": "kz", "name": "Kazakhstan", "countryCode": "+7" },
    { "code": "kg", "name": "Kyrgyzstan", "countryCode": "+996" },
    { "code": "la", "name": "Laos", "countryCode": "+856" },
    { "code": "mm", "name": "Myanmar", "countryCode": "+95" },
    { "code": "np", "name": "Nepal", "countryCode": "+977" },
    { "code": "kp", "name": "North Korea", "countryCode": "+850" },
    { "code": "tw", "name": "Taiwan", "countryCode": "+886" },
    { "code": "tj", "name": "Tajikistan", "countryCode": "+992" },
    { "code": "tm", "name": "Turkmenistan", "countryCode": "+993" },
    { "code": "uz", "name": "Uzbekistan", "countryCode": "+998" },
    { "code": "bn", "name": "Brunei", "countryCode": "+673" },
    { "code": "mn", "name": "Mongolia", "countryCode": "+976" },
    { "code": "mv", "name": "Maldives", "countryCode": "+960" },
    { "code": "pg", "name": "Papua New Guinea", "countryCode": "+675" },
    { "code": "fj", "name": "Fiji", "countryCode": "+679" },
    { "code": "sb", "name": "Solomon Islands", "countryCode": "+677" },
    { "code": "to", "name": "Tonga", "countryCode": "+676" },
    { "code": "vu", "name": "Vanuatu", "countryCode": "+678" },
    { "code": "ws", "name": "Samoa", "countryCode": "+685" },
    { "code": "al", "name": "Albania", "countryCode": "+355" },
    { "code": "am", "name": "Armenia", "countryCode": "+374" },
    { "code": "az", "name": "Azerbaijan", "countryCode": "+994" },
    { "code": "ge", "name": "Georgia", "countryCode": "+995" }
]

  const validate = (values, captchaInput) => {
    const errors = {};
    if (!values.Nationalid) {
      errors.Nationalid = 'National ID Number is required!';
    }
    if (!values.Country) {
      errors.Country = 'Please select a Country';
    }
    if (captchaInput !== captcha) {
      errors.Captcha = 'Captcha does not match!';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSignupFormData({ ...signupFormData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleCountryChange = (event) => {
    const selectedCountry = countries.find(
      (country) => country.code === event.target.value);
    setSelectedCountry(selectedCountry.code);
    updateSignupFormData({ ...signupFormData, Country: selectedCountry.name });
    setFormErrors({ ...formErrors, Country: '' });
  };

  const getCountryCode = (selectedCountry) => {
    const country = countries.find((c) => c.code === selectedCountry);
    return country ? country.countryCode : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(signupFormData, captchaInput);
    setIsLoading(true);

    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      console.log('step 4 data:', signupFormData);

      try {
        const res = await fetch('https://zuwara.net/admin/public/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: 'zwarra_session=TooHVo6rlNr54HH2FoB6T7F0JcpnoLdqI55ELBH3',
          },
          body: JSON.stringify(signupFormData),
        });
        const data = await res.json();
        console.log('Submitted data', data);
        if (data?.errors?.Email) {
          alert(data.errors.Email[0]);
          setFormErrors({ ...formErrors, Email: data.errors.Email[0] });
        }
        if (data?.errors?.Phone) {
          alert(data.errors.Phone[0]);
          setFormErrors({ ...formErrors, Phone: data.errors.Phone[0] });
        }
        if (!data?.errors) {
          setResponse(data);
          let newData = data?.patient_registration;
          let responsDat = {
            Firstname: newData?.Firstname,
            Lastname: newData?.Lastname,
            Email: newData?.Email,
            Phone: newData?.Phone,
            Dob: newData?.Dob,
            Gender: newData?.Gender,
            Country: newData?.Country,
            Nationalid: newData?.Nationalid,
            Type: 'register',
          };

          sessionStorage.setItem('signupFormData', JSON.stringify({ ...responsDat }));

          sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
          sessionStorage.setItem('username', JSON.stringify(`${newData?.Firstname || ''} ${newData?.Lastname || ''}`.trim()));

          setIsAuthenticated(true);
          setUsername(`${newData?.Firstname || ''} ${newData?.Lastname || ''}`.trim());
          setPatientName(newData);
          const nextModal = new window.bootstrap.Modal(document.getElementById('OTP'));
          const currentModal = window.bootstrap.Modal.getInstance(document.getElementById('accountsetup_captcha'));
          currentModal.hide();
          nextModal.show();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormErrors(errors);
    }
  };


  const generateCaptcha = () => {
    const randomCaptcha = Math.floor(1000 + Math.random() * 9000);
    setCaptcha(randomCaptcha.toString());
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <>
      <div className='zw_popup'>
        <div
          className='modal fade zw_captch_popup'
          id='accountsetup_captcha'
          role='dialog'
          data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
        >
          <div className='modal-dialog modal-dialog-centered ms-auto' role='document'>
            <div className='modal-content'>
              <div className='modal-body mb-4'>
                <div className='btn-space'>
                  <button
                    type='button'
                    className='sps-dialog-close regv2back'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  >
                    {/* <i className='icon-close'></i> */}
                  </button>
                </div>
                <div className='container ps-5'>
                  <p className='poppins-regular zw_24 zw_9B9B9B mb-0'>
                    Step 3 completed of 4
                  </p>
                  <div className='line_indicator_container w-100'>
                    <div className='line-indicator-bg each_line_indicator active'></div>
                    <div className='line-indicator-bg each_line_indicator active'></div>
                    <div className='line-indicator-bg each_line_indicator active'></div>
                    <div className='line-indicator-bg each_line_indicator'></div>
                  </div>
                </div>
                <div className='card card-primary-light card-no-border last-child'>
                  <div className='login-brd'>
                    <form onSubmit={handleSubmit}>
                      <div className='input-group input-group-vert mb20 '>
                        <label className='zw_text_color poppins-regular zw_26'>
                          Country
                        </label>
                        <div className='form-group zw_form_group mb-0'>
                          <div className='zw_form_control zw_secondary poppins-regular zw_16'>
                            <div>
                              <div className='zw_country_sec zw_light_bg m-0 rounded-2'>
                                {selectedCountry && (
                                  <img
                                    className='form-icon img-ccode form-img zw_country_flag '
                                    src={`https://sanar-assets.com/flags/${selectedCountry}_64.png`}
                                    alt='Country Flags'
                                  />
                                )}
                                <span className='cuntry-plholder zw_000'>
                                  {getCountryCode(selectedCountry)}
                                </span>
                              </div>
                              {/* <select
                                id='countrycode'
                                name='Country'
                                className='input-no-border poppins-regular zw_22 zw_secondary w-100 pe-4 py-2 '
                                style={{ border: 'none', paddingLeft: '110px', background: 'none' }}
                                value={selectedCountry}
                                onChange={handleCountryChange}
                              >
                                {countries.map((Country) => (
                                  <option
                                    key={Country.code}
                                    value={Country.code}
                                  >
                                    {Country.name}
                                  </option>
                                ))}
                              </select> */}
                              <select
                                id="countrycode"
                                name="countrycode"
                                className="input-no-border poppins-regular zw_22 zw_secondary w-100 pe-4 py-2 "
                                style={{ border: 'none', borderRadius: '4px', WebkitAppearance: 'none', paddingLeft: "11rem " }}
                                //  style="width:30px;-webkit-appearance: none;"
                                // value={selectedCountry}
                                onChange={handleCountryChange}
                              >
                                {countries.map((country) => (
                                  <option key={country.code} value={country.code}>
                                    {country.name}
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
                        {formErrors.Country && (
                          <span className='sa-error-message' style={{ color: 'red' }}>
                            {formErrors.Country}

                          </span>
                        )}
                        <div className='form-group zw_form_group mb-0 mt-5'>
                          <input
                            type='text'
                            className='px-4 py-3 zw_form_control zw_secondary poppins-regular zw_16'
                            placeholder='National ID or Iqama number'
                            name='Nationalid'
                            value={signupFormData.Nationalid}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                          />
                          {/* <input
                            type="text"
                            className="px-4 py-3 zw_form_control zw_secondary poppins-regular zw_16"
                            placeholder="National ID or Iqama number"
                            name="Nationalid"
                            value={signupFormData.Nationalid}
                            style={{width: "100%" }} // Adds left padding to the entered value
                            onChange={(e) => {
                              const { value } = e.target;
                              // Allow only numbers, max length of 10, and ensure the number starts with '2'
                              if (/^2\d{0,9}$/.test(value) || value === "") {
                                handleChange(e); // Call the handleChange function only if the value is valid
                              }
                            }}
                            maxLength="10"

                          /> */}

                        </div>
                        {formErrors.Nationalid && (
                          <span className='sa-error-message' style={{ color: 'red' }}>
                            {formErrors.Nationalid}
                          </span>
                        )}
                      </div>
                      <label className='poppins-regular zw_16 zw_black mb-3'>
                        Enter Captcha
                      </label>
                      <div className='form-group zw_form_group'>
                        <div className='row '>
                          <div className='col-md-7'>
                            <input
                              type="text"
                              className="zw_form_control poppins-regular zw_16 px-2 py-3"
                              placeholder="Captcha"
                              maxLength="4"
                              value={captchaInput}
                              onChange={(e) => {
                                setCaptchaInput(e.target.value);
                                setFormErrors({ ...formErrors, Captcha: '' });
                              }}
                            />

                          </div>
                          <div className='col-md-3'>
                            <p className='captcha-text zw_secondary poppins-semibold zw_16 mt-3' style={{color:"black" }}>
                              {captcha}
                            </p>
                          </div>
                          <div className='col-md-2 mt-3'>
                            {/* <i
                              className='icon-reload sa-otp-ref ' 
                              onClick={generateCaptcha}
                            ></i> */}
                            <img src="./images/captcha_reload.svg" alt="" style={{ width: "25px" }} />
                          </div>
                        </div>
                        {formErrors.Captcha && (
                          <span className='sa-error-message' style={{ color: 'red' }}>
                            {formErrors.Captcha}
                          </span>
                        )}
                      </div>
                      <div className="d-flex justify-content-center mt-5">
                      <button
                        type='submit'
                        className='zw_text_fff mt-3 poppins-regular zw_24 zw_bg_gradient zw_btn_18 zw_border_none p-2 '
                        style={{
                          width: '340px',
                          height: '55px',
                          // margin: '0 10%',
                          // marginLeft: "65px",
                          borderRadius: '6px',
                        }}
                      >
                        Continue
                        {/* {isLoading ? 'Processing...' : 'Continue'} */}
                      </button>


                    
                      </div>
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

export default AccountSetup_captcha;
