import React, { useContext, useState,useEffect,useRef } from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { useNavigate } from "react-router-dom";
import '../../Style/Doctor_Specialist.css';
import { Context } from '../../Context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { allCountries } from 'country-telephone-data';
import CountryFlag from 'react-country-flag';
export default function Doctor_Specialist() {
  const [startDate, setStartDate] = useState(new Date());
  const { formData3, setFormData3 } = useContext(Context);
  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState('');
  const [code, setCode] = useState('');
  const [countryName, setCountryName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const countries = [
    { code: 'sa', name: 'Saudi Arabia', countryCode: '+966', length: 9 },
    { code: 'in', name: 'India', countryCode: '+91', length: 10 },

    { code: 'eg', name: 'Egypt', countryCode: '+20', length: 11 },
    { code: 'au', name: 'Australia', countryCode: '+61', length: 9 },
    { code: 'cn', name: 'Canada', countryCode: '+1', length: 10 },
    { code: 'fr', name: 'France', countryCode: '+33', length: 9 },
    { code: 'pk', name: 'Pakistan', countryCode: '+92', length: 10 },
    { code: 'sl', name: 'Sri Lanka', countryCode: '+94', length: 10 },
  ];

  const dropdownRef = useRef(null);


  // Filtered list based on search query
  const filteredCountries = allCountries.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
      
  );
 
   // Handle click outside to close the dropdown
   useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setDropdownOpen(false);
          }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, []);
 

  const getCountryLength = (code) => {
    const country = countries.find((item) => item.code === code);
    return country ? country.length : 9; // Default length if country code not found
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData3({ ...formData3, [name]: value });
    // Clear error for the field being updated
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error for the specific field
    }));
  };



  const validateForm = () => {
    const newErrors = {};

    if (!formData3.firstname) newErrors.firstname = "First Name is required";
    if (!formData3.lastname) newErrors.lastname = "Last Name is required";
    if (!formData3.language) newErrors.language = "Language is required";
    if (!formData3.department) newErrors.department = "Department is required";
    if (!formData3.degree) newErrors.degree = "Degree is required";
    if (!formData3.med_reg_expiry) newErrors.med_reg_expiry = "Medical Registration Expiry is required";
    if (!formData3.med_reg_no) newErrors.med_reg_no = "Medical Registration Number is required";
    if (!formData3.email) newErrors.email = "Email is required";
    if (!formData3.country) newErrors.country = "Country is required";
    if (!formData3.city) newErrors.city = "City is required";
    if (!formData3.gender) newErrors.gender = "Gender is required";
    if (!formData3.phone) newErrors.phone = "Phone number is required";
    const expectedLength = getCountryLength(flag);
    if (formData3.phone && formData3.phone.length !== expectedLength) {
      newErrors.phone = `Mobile Number must be ${expectedLength} digits for ${code}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log("Step1 doctor service:", formData3);
    navigate('/Doctor_Specialist_2');
    // const formDataToSend = new FormData();
    // formDataToSend.append('firstname', formData3.firstname);
    // formDataToSend.append('lastname', formData3.lastname);
    // formDataToSend.append('language', formData3.language);
    // formDataToSend.append('department', formData3.department);
    // formDataToSend.append('degree', formData3.degree);
    // formDataToSend.append('gender', formData3.gender);
    // formDataToSend.append('med_reg_expiry', formData3.med_reg_expiry);
    // formDataToSend.append('med_reg_no', formData3.med_reg_no);
    // formDataToSend.append('email', formData3.email);
    // formDataToSend.append('phone', formData3.phone);
    // formDataToSend.append('country', formData3.country);
    // formDataToSend.append('city', formData3.city);
    // formDataToSend.append('service_type[]', formData3.service_type);

    // console.log("Submitting step1 data:",formData3);
    // setFormData3({...formData3, service_type: ['homevisit',] });
    // try {
    //   const res = await fetch('https://zuwara.net/admin/public/api/createdoctorrequest', {
    //     method: 'POST',
    //     body: formDataToSend,
    //     headers: {
    //       // 'Content-Type': 'multipart/form-data',
    //       'Cookie': 'zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ'
    //     },
    //     //  body: JSON.stringify(formData3)
    //   });



    //   if (!res.ok) {
    //     const errorMessage = await res.json();
    //     throw new Error(errorMessage.error || 'Failed to submit form data');
    //   }

    //   const data = await res.json();
    //   console.log("Step1:", data);
    //   setResponse(data);
    //   navigate('/doctorspecialist2');

    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  // let navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="card-shadow service-prov" style={{ top: "77px", marginBottom: "115px" }}>
          <h4 className="tit mob-header mob-block">Request Form</h4>
          <div className="text-center">
            <h3 className='poppins-semibold zw_34 zw_title_color '>Provide My Services Via Zuwarh Request Form</h3>
            <p className='poppins-regular zw_16 zw_text_color my-5'>We are pleased to cooperate with us in providing and facilitating access to your services Via Zuwarh platform</p>
          </div>
          <div className='d-flex align-items-center justify-content-center mb-5'>
            <div className='d-flex justify-content-center align-items-center progressbar_provider active'>
              <img src="../../../../images/Vector.svg" alt="" />
            </div>
            <div className='progress_bar_line'></div>
            <div className='d-flex justify-content-center align-items-center progressbar_provider'>
            </div>
            <div className='progress_bar_line'></div>
            <div className='d-flex justify-content-center align-items-center progressbar_provider'>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="FirstName" className='poppins-regular zw_20 zw_text_color'>First Name</label>
                  <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="First Name" id="FirstName" name="firstname" value={formData3.firstname} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                  <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                  {errors.firstname && <div className="error">{errors.firstname}</div>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="LastName" className='poppins-regular zw_20 zw_text_color'>Last Name</label>
                  <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Last Name" id="LastName" name="lastname" value={formData3.lastname} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                  <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                  {errors.lastname && <div className="error">{errors.lastname}</div>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="language" className='poppins-regular zw_20 zw_text_color mb-3'>Known Languages</label>
                <div className="form-group d-flex m-0 align-items-center">

                  <input className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0 p-1" placeholder="English" id="language" name="language" value={formData3.language} onChange={handleChange} style={{ border: "none" }} />
                  <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>
                </div>
                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                {errors.language && <div className="error">{errors.language}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="Department" className='poppins-regular zw_20 zw_text_color mb-3'>Department</label>
                <div className="form-group d-flex m-0 align-items-center">

                  <input className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0 p-1" placeholder="Department" id="Department" name="department" value={formData3.department} onChange={handleChange} style={{ border: "none" }} />
                  <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>

                </div>
                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                {errors.department && <div className="error">{errors.department}</div>}
              </div>

            </div>

            <div className="row">
              <div className="col-md-6">
                <label htmlFor="Degree" className='poppins-regular zw_20 zw_text_color mb-3 mt-4'>Degree</label>
                <div className="form-group d-flex m-0 align-items-center">

                  <input className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0 p-1" placeholder="Enter your Qualification" id="Degree" name="degree" value={formData3.degree} onChange={handleChange} style={{ border: "none" }} />
                  <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>
                </div>
                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                {errors.degree && <div className="error">{errors.degree}</div>}
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="expiry" className='poppins-regular zw_20 zw_text_color mb-3 mt-4'>Medical Registration Expiry</label>
                  <div className='d-flex m-0 align-items-center'>
                    {/* <input type="date" className='poppins-regular zw_18 zw_secondary p-0 p-1' placeholder="Select Date" id="expiry" name="med_reg_expiry" value={formData3.med_reg_expiry} onChange={handleChange} style={{ border: "none", padding: "0.5em", width: "100%" }} /> */}
                    <img className="form-icon-jb form-img-jb me-3" src="https://pluspng.com/img-png/calendar-icon-1600.png" alt='calendar-icon-1600' style={{ height: '27px' }} />

                    <DatePicker
                      className="poppins-regular zw_18 zw_secondary pb-0 p-1 w-100 cursor"
                      selected={startDate}
                      onChange={(date) => {

                        setStartDate(date);
                        setFormData3({ ...formData3, med_reg_expiry: date.toISOString().split('T')[0] });
                      }}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      placeholderText="DD/MM/YYYY"
                      value={formData3.med_reg_expiry}
                      name="med_reg_expiry"
                      style={{ border: "none" }}
                    />
                  </div>

                  <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                  {/* {errors.med_reg_expiry && <div className="error">{errors.med_reg_expiry}</div>} */}
                </div>
              </div>



            </div>
            <div className="form-group">
              <label htmlFor="registration" className='poppins-regular zw_20 zw_text_color'>Medical Registration Number</label>
              <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Medical Registration Number" id="registration" name="med_reg_no" value={formData3.med_reg_no} onChange={handleChange} style={{ border: "none", padding: "0.5em", width: "100%" }} />
              <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
              {errors.med_reg_no && <div className="error">{errors.med_reg_no}</div>}
            </div>


            <div className="form-group">
              <label className='poppins-regular zw_20 zw_text_color mb-3'>Gender</label>

              <div className="d-flex">
                <div className="form-check form-check-inline" style={{ width: "49%" }}>
                  <input type="radio" id="M" name="gender" value="male" checked={formData3.gender === 'male'} onChange={handleChange} className="form-check-input mx-4" />
                  <label htmlFor="M" className=" poppins-regular zw_20 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Male</label>
                  <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                  {errors.gender && <div className="error">{errors.gender}</div>}
                </div>

                <div className="form-check form-check-inline" style={{ width: "49%" }}>
                  <input type="radio" id="F" name="gender" value="female" checked={formData3.gender === 'female'} onChange={handleChange} className="form-check-input mx-4" />
                  <label htmlFor="F" className=" poppins-regular zw_20 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Female</label>
                  <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                </div>

              </div>
            </div>
            <div className="row">
              <label className='poppins-regular zw_20 zw_text_color'>Phone number</label>
              <div className="col-4 col-sm-4 col-md-2">
                {/* <div className="form-group d-flex m-0 align-items-center">
                  <img className="form-icon-jb form-img-jb" src="../../../../images/Group 1261156053.svg" alt='' />
                  <select className="w-100 inp-flag mt-3 poppins-regular zw_18 zw_secondary pb-3" id="countryCode" name="countryCode" value={formData3.countryCode} onChange={handleChange} style={{ border: "none", backgroundColor: 'transparent' }}>
                    <option value="+91">+91</option>
                    <option value="+..">+..</option>
                    <option value="+..">+..</option>
                    <option value="+..">+..</option>
                  </select>
                </div>
                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "5px" }}></div> */}
                <div className="form-group" ></div>
                <div className="form-group d-flex m-0 align-items-center poppins-regular zw_18 zw_secondary pb-0" >

                  <div onClick={() => setDropdownOpen(!dropdownOpen)} style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
                    {flag === '' ? (
                      <>
                        <img src={`https://sanar-assets.com/flags/sa_64.png`} alt="Country Flags" height={30} width={30} /> +966
                      </>
                    ) : (
                      <>
                        <img src={`https://sanar-assets.com/flags/${flag}_64.png`} alt="Country Flags" height={30} width={30} /> {code}
                      </>
                    )}
                    <i className="icon-down-arrow form-icon-jb dropdown-icons ms-4 ms-lg-5" onClick={() => setDropdownOpen(!dropdownOpen)}></i>

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
                                                 {/* Search input field */}
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
                                                {filteredCountries.map((item, index) => (
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

                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "5px" }}></div>
              </div>

              <div className="col-md-10">
                {/* <div className="form-group"> */}
                <input maxLength="15" type="tel" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Mobile Number" id="Phone" name="phone" value={formData3.phone} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>

              {/* </div> */}
            </div>
            <div className="form-group">
              <label htmlFor="Email" className='poppins-regular zw_20 zw_text_color mt-4'>E-mail ID</label>
              <input type="email" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="E-mail ID" id="Email" name="email" value={formData3.email} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
              <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="Country" className='poppins-regular zw_20 zw_text_color mb-3'>Country</label>
                <div className="form-group d-flex m-0 align-items-center">
                  <input className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0" placeholder="Select Country" id="Country" name="country" value={formData3.country} onChange={handleChange} style={{ border: "none" }} />
                  <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>
                </div>
                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                {errors.country && <div className="error">{errors.country}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="City" className='poppins-regular zw_20 zw_text_color mb-3'>City</label>
                <div className="form-group d-flex m-0 align-items-center">
                  <input className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0" placeholder="Select City" id="City" name="city" value={formData3.city} onChange={handleChange} style={{ border: "none" }} />
                  <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>
                </div>
                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                {errors.city && <div className="error">{errors.city}</div>}
              </div>

            </div>
            <div className='d-flex justify-content-between my-5'>
              <div className='d-flex align-items-center mt-5' onClick={() => navigate(-1)}>
                <div className='btn_bg_color_provider'>
                  <img className='btn_pro_provider' src="../../../../images/previous.png" alt="btn" />
                </div>
                <p className='poppins-regular zw_18 zw_title_color mb-0 ms-4'>Previous</p>
              </div>
              <div className='d-flex align-items-center mt-5' onClick={handleSubmit}>
                <p className='poppins-regular zw_18 zw_title_color mb-0 me-4'>Next</p>
                <div className='btn_bg_color_provider'>
                  <img className='btn_pro_provider' src="../../../../images/next.png" alt="btn" />
                </div>
              </div>
            </div>
            {/* { <button className='link_btn btn-submit-form'>Next</button> } */}

          </form>
          {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "95%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={() => navigate(-1)}>
              <button className='link_btn' style={{ width: "100%" }}><img src='/images/Left.png'></img></button>Previous
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={handleSubmit}>
              Next<button className='link_btn btn-submit-form' style={{ width: "100%" }}><img src='/images/Right.png'></img></button>
            </div>
          </div> */}
        </div>
      </div>

      <Footer />
    </>
  );
}

