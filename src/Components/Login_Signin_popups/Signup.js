import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../Style/login_popup.css";
import { Context } from "../../Context";
import { allCountries } from 'country-telephone-data';
import CountryFlag from 'react-country-flag';

function Signup() {
  const { signupFormData, updateSignupFormData } = useContext(Context);
  const [formErrors, setFormErrors] = useState({});
  const [flag, setFlag] = useState("");
  const [code, setCode] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [countryName, setCountryName] = useState('Saudi Arabia');
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered list based on search query
  const filteredCountries = allCountries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
 
  );


  const phoneNumberPatterns = {
    "+91": /^[0-9]{10}$/,        // India
    "+966": /^[0-9]{9}$/,        // Saudi Arabia
    "+20": /^[0-9]{10}$/,        // Egypt
    "+61": /^[0-9]{9}$/,         // Australia
    "+1": /^[0-9]{10}$/,         // Canada
    "+33": /^[0-9]{9}$/,         // France
    "+92": /^[0-9]{11}$/,        // Pakistan
    "+94": /^[0-9]{10}$/,        // Sri Lanka
  };

  const validate = (values) => {
    const errors = {};
    const namePattern = /^[A-Za-z]+$/;

    if (!values.Firstname) {
      errors.Firstname = "First Name is required!";
    } else if (!namePattern.test(values.Firstname)) {
      errors.Firstname = "First Name can only contain alphabetic characters!";
    }

    if (!values.Lastname) {
      errors.Lastname = "Last Name is required!";
    } else if (!namePattern.test(values.Lastname)) {
      errors.Lastname = "Last Name can only contain alphabetic characters!";
    }

    if (!values.Phone) {
      errors.Phone = "Mobile Number is required!";
    } else {
      const phonePattern = phoneNumberPatterns[code] || /^[0-9]+$/;
      if (!phonePattern.test(values.Phone)) {
        errors.Phone = "This is not a valid mobile number format for the selected country!";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate(signupFormData);
    if (isValid) {
      const nextModal = new window.bootstrap.Modal(
        document.getElementById("accountsetup_details")
      );
      const currentModal = window.bootstrap.Modal.getInstance(
        document.getElementById("signup")
      );
      updateSignupFormData(signupFormData);
      console.log("Step 1 data", signupFormData);
      currentModal.hide();
      nextModal.show();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSignupFormData({
      ...signupFormData,
      [name]: value,
    });

    const newErrors = { ...formErrors };

    if (name === 'Phone') {

      const phonePattern = phoneNumberPatterns[code] || /^[0-9]+$/;
      if (!value) {
        newErrors.Phone = 'Mobile Number is required!';
      } else if (!phonePattern.test(value)) {

        newErrors.Phone = 'This is not a valid mobile number format for the selected country!';
      } else {
        delete newErrors.Phone;
      }
    } else if (name === 'Firstname' || name === 'Lastname') {
      const namePattern = /^[A-Za-z]+$/;
      if (!value) {
        newErrors[name] = `${name === 'Firstname' ? 'First Name' : 'Last Name'} is required!`;
      } else if (!namePattern.test(value)) {
        newErrors[name] = `${name === 'Firstname' ? 'First Name' : 'Last Name'} can only contain alphabetic characters!`;

      } else {
        delete newErrors[name];
      }
    }

    setFormErrors(newErrors);
  };

  return (
    <div className="zw_popup">
      <div
        className="modal fade"
        id="signup"
        role="dialog"
        data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">

            <div class="modal-header border-0">
              <button type="button" className="sps-dialog-close  regv2back" data-bs-dismiss="modal" aria-label="Close">
                <i className="icon-close"></i>
              </button>
            </div>

            <div className="modal-body">

              <div className="card card-primary-light card-no-border last-child mt-4">
                <div className="login-brd">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-vert mb20">
                      <div className="form-group zw_form_group mb-0">
                        <input
                          type="text"
                          className="w-100 py-3 px-4 zw_form_control zw_secondary poppins-regular zw_16"
                          placeholder="Full Name"
                          name="Firstname"
                          value={signupFormData.Firstname}
                          onChange={handleChange}
                        ></input>
                      </div>
                      {formErrors.Firstname && (
                        <span
                          className="sa-error-message"
                          style={{ color: "red" , fontSize:"12px" }}
                        >
                          {formErrors.Firstname}
                        </span>
                      )}
                      <div className="form-group zw_form_group mb-0 mt-5">
                        <input
                          type="text"
                          className="w-100 py-3 px-4 zw_form_control zw_secondary poppins-regular zw_16 "
                          placeholder="Last Name"
                          name="Lastname"
                          value={signupFormData.Lastname}
                          onChange={handleChange}
                        ></input>
                      </div>
                      {formErrors.Lastname && (
                        <span
                          className="sa-error-message"
                          style={{ color: "red",fontSize:"12px" }}
                        >
                          {formErrors.Lastname}
                        </span>
                      )}

                      <div className="form-group mb-0 mt-5">
                        <div className="row zw_form_control m-0 ">
                          <div
                            className="col-md-3 zw_light_bg zw_border_radius"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <div className="zw_secondary poppins-regular zw_16">
                              <div
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                              >
                                {flag === '' ? (
                                  <>

                                    <img
                                      src={`https://sanar-assets.com/flags/sa_64.png`}
                                      alt="Country Flags"
                                      height={30}
                                      width={28}
                                    />{" "}
                                    +966
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={`https://sanar-assets.com/flags/${flag}_64.png`}
                                      alt="Country Flags"
                                      className="flag-image"
                                      height={30}
                                      width={28}
                                    />{" "}
                                    {code}
                                  </>
                                )}
                              </div>
                              {/* <div
                                className="dpcontent"
                                style={{
                                  position: "absolute",
                                  backgroundColor: "#f7e9ec",
                                  padding: "10%",
                                  width: "100%",
                                  maxHeight: dropdownOpen ? "250px" : "0",
                                  zIndex: "10",
                                  overflow: "auto",
                                  cursor: "pointer",
                                  display: dropdownOpen ? "block" : "none",
                                }}
                              >

                              </div>
                              <div className='dpcontent poppins-regular zw_18 zw_secondary pb-0' style={{
                                position: "absolute",
                                top: "100%",
                                left: "0",
                                backgroundColor: "white",
                                padding: "10px",
                                width: "100%",
                                fontSize: "0.7em",
                                maxHeight: dropdownOpen ? "250px" : "0",
                                zIndex: "10",
                                overflow: "auto",
                                cursor: "pointer",
                                display: dropdownOpen ? "block" : "none",
                                border: "2px solid #ddd",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              }}>
                                {/* {allCountries.map((item, index) => (
                                                <div key={index} onClick={() => {
                                                    setCode(item.dialCode);
                                                    setFlag(item.iso2);
                                                    setCountryName(item.name);
                                                    setDropdownOpen(false);
                                                }}> */}
                                {/* Search input field
                                <input
                                  type="text"
                                  className='poppins-regular zw_secondary zw_16 bg-transparent mb-0 pb-0'
                                  placeholder="Search country..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
                                  onClick={(e) => e.stopPropagation()}
                                />

                                {/* Filtered country list */}
                                {/* {filteredCountries.map((item, index) => (
                                  <div key={index} onClick={() => {
                                    setCode(item.dialCode);
                                    setFlag(item.iso2);
                                    setCountryName(item.name);
                                    setDropdownOpen(false);
                                    setSearchQuery(''); // Reset search on selection
                                  }}>


                                    <CountryFlag countryCode={item.iso2.toUpperCase()} svg style={{ width: '30px', height: '30px' }} />
                                    {item.name} {item.dialCode}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>  */}
                          <div
                                className="dpcontent"
                                style={{
                                  position: "absolute",
                                  top: "105%",
                                  left: "0",
                                  backgroundColor: "#f7e9ec",
                                  padding: "5px",
                                  width: "100%",
                                  maxHeight: dropdownOpen ? "250px" : "0",
                                  zIndex: "10",
                                  overflowY: "auto",
                                  borderRadius: "4px",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                  display: dropdownOpen ? "block" : "none",
                                }}
                              >
                                <input
                                  type="text"
                                  className="w-100 py-2 px-2"
                                  placeholder="Country name..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  style={{
                                    marginBottom: "10px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                    padding: "4px 8px",  
                                    fontSize: "12px", 
                                  }}
                                />
                                {filteredCountries.map((item, index) => (
                                  <div
                                    key={index}
                                    onClick={() => {
                                      setCode(item.dialCode);
                                      setFlag(item.iso2);
                                      setDropdownOpen(false);
                                      setSearchQuery(''); // Reset search on selection
                                    }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      padding: "5px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <CountryFlag countryCode={item.iso2.toUpperCase()} svg style={{ width: '20px', height: '20px', marginRight: '10px' }} />{" "}
                                    {item.dialCode}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="tel"
                              className={`zw_secondary poppins-regular zw_16 py-3 w-100 zw_border_none err-border ${formErrors.Phone && "form-error"
                                }`}
                              id="mobile_number"
                              name="Phone"
                              placeholder="Phone Number"
                              value={signupFormData.Phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                     {formErrors.Phone && (
                        <span
                          className="sa-error-message"
                          style={{ color: "red", fontSize:"12px" }}
                        >
                          {formErrors.Phone}
                        </span>
                      )}
                    </div>

                    <div className="form-group f-size12 poppins-regular zw_16" style={{ top: "-15px", marginBottom: "10px", fontSize: "12px" }}>
                      By clicking continue you agree to our&nbsp;
                      <Link
                        to="/termsandcondition"
                        className="link"
                        // onClick={handleClose}
                        style={{ textDecoration: 'underline' }}
                      >
                        <u style={{ textDecoration: 'underline' }}> Terms &amp; Conditions </u>
                      </Link>{' '}
                      and{' '}
                      <Link
                        to="/privacypolicy"
                        className="link"
                        // onClick={handleClose}

                      >
                        <u style={{ textDecoration: 'underline' }}> Privacy Policy</u>

                      </Link>

                    </div>
                    <button
                      type="submit"
                      className="zw_text_fff  poppins-medium zw_30 zw_bg_gradient zw_btn_18 zw_border_none next-btn-signup"
                      style={{height:"55px",fontSize:"20px",marginTop:"2rem !important"}}
                    >
                      Next
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================  done========================== */}
    </div>
  );
}

export default Signup;