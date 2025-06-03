import React, { useState, useContext,useEffect,useRef } from 'react'
import '../../Style/Doctor_Specialist.css';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../../Context';
import { allCountries } from 'country-telephone-data';
import CountryFlag from 'react-country-flag';

function Hospital_Health_Center() {

    const { formData5, setFormData5 } = useContext(Context);
    const [response, setResponse] = useState(null);
    const [errors, setErrors] = useState({});
    const [flag, setFlag] = useState('');
    const [code, setCode] = useState('');
    
    const [countryName, setCountryName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    let navigate = useNavigate();

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
    const getCountryLength = (code) => {
        const country = countries.find((item) => item.code === code);
        return country ? country.length : 9; // Default length if country code not found
    };
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
 


    
    const validate = () => {
        let tempErrors = {};
        if (!formData5.healthcare) tempErrors.healthcare = "Hospital/Center Name is required";
        if (!formData5.registernumber) tempErrors.registernumber = "Commercial Registration Number is required";
        if (!formData5.country) tempErrors.country = "Country is required";
        if (!formData5.city) tempErrors.city = "City is required";
        if (!formData5.email) tempErrors.email = "Email Address is required";
        if (!formData5.phone) tempErrors.phone = "Mobile Number is required";
        const expectedLength = getCountryLength(flag);
        if (formData5.phone && formData5.phone.length !== expectedLength) {
            tempErrors.phone = `Mobile Number must be ${expectedLength} digits for ${code}`;
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log("Submitting Step1 data:")
        console.log(formData5);
        navigate('/hospitalhealthcenter2')
        // try {
        //     const res = await fetch('https://zuwara.net/admin/public/api/createhealthcarerequest', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Cookie': 'zwarra_session=TTg20Hoot38CaNuxW0tXux3VGTUALnvFx8h2ozRr'
        //         },
        //         body: JSON.stringify(formData5),
        //     });
        //     const data = await res.json();
        //     console.log('Step1 data', data)
        //     setResponse(data);
        //     navigate('/Hospital_Health_Center_2');
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData5({ ...formData5, [name]: value });
    
        // Clear error for the field being updated
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error for the specific field
        }));
    };
    

    return (
        <>
            <Navbar />
            <div className="container glob-prgh top-space">
                <div>
                    <div className="card-shadow service-prov" style={{
                        top: "95px",
                        marginBottom: "115px"
                    }}>
                        {/* <span className="btn-back mob-block">
                    <i className="icon-arrow-left"></i>
                </span> */}

                        <div className="text-center">
                            <h3 className='poppins-semibold zw_34 zw_title_color '>Provide My Services Via Zuwarh Request Form</h3>
                            <p className='poppins-regular zw_16 zw_text_color my-5'>We are pleased to cooperate with us in providing and facilitating access to your services Via Zuwarh platform</p>
                        </div>

                        {/* progressbar */}
                        <div className='d-flex align-items-center justify-content-center mb-5'>
                            <div className='d-flex justify-content-center align-items-center progressbar_provider active'>
                                <img src="../../../../images/Vector.svg" alt="" />
                            </div>
                            <div className='progress_bar_line'></div>
                            <div className='d-flex justify-content-center align-items-center progressbar_provider'>
                                {/* <img src="../../../../images/Vector.svg" alt="" /> */}
                            </div>
                            <div className='progress_bar_line'></div>
                            <div className='d-flex justify-content-center align-items-center progressbar_provider'>
                                {/* <img src="../../../../images/Vector.svg" alt="" /> */}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="Hospital" className='poppins-regular zw_20 zw_text_color'>Hospital /Center Name</label>
                                        <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Hospital / center Name" id="healthcare" name="healthcare" value={formData5.healthcare} onChange={handleChange} style={{ border: 'none', padding: "1em", width: "100%" }}></input>
                                        <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                        {errors.healthcare && <span className="error">{errors.healthcare}</span>}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="regi" className='poppins-regular zw_20 zw_text_color'>Commercial Registration Number</label>
                                        <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Commercial registration number" id="registernumber" name="registernumber" value={formData5.registernumber} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }}></input>
                                        <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                        {errors.registernumber && <span className="error">{errors.registernumber}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="Country" className='poppins-regular zw_20 zw_text_color mb-3 '>Select Country</label>
                                    <div className="form-group d-flex m-0 align-items-center">

                                        <input className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0" placeholder="Select Country" id="country" name="country" value={formData5.country} onChange={handleChange} style={{ border: "none" }} />
                                        <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>
                                    </div>
                                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    {errors.country && <span className="error">{errors.country}</span>}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="City" className='poppins-regular zw_20 zw_text_color mb-3'>Select City</label>
                                    <div className="form-group d-flex m-0 align-items-center">

                                        <input className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0" placeholder="Select City" id="city" name="city" value={formData5.city} onChange={handleChange} style={{ border: "none" }} />
                                        <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>

                                    </div>
                                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    {errors.city && <span className="error">{errors.city}</span>}
                                </div>
                            </div>
                            <div className="row">
                                <label className='poppins-regular zw_20 zw_text_color mt-4'>Mobile Number</label>
                                <div className="col-4 col-sm-4 col-md-2">
                                    {/* <div className="form-group d-flex m-0 align-items-center"> */}
                                    {/* <img className="form-icon-jb form-img-jb" src="../../../../images/Group 1261156053.svg" alt='' />
                                        <select className="w-100 inp-flag mt-3 poppins-regular zw_18 zw_secondary pb-3" id="countryCode" name="countryCode" style={{ border: "none", backgroundColor: 'transparent', marginTop: '1rem' }} readOnly>
                                            <option value="+91">+91</option>
                                            <option value="+..">+..</option>
                                            <option value="+..">+..</option>
                                            <option value="+..">+..</option>
                                        </select>
                                        {/* <i className="icon-down-arrow form-icon-jb dropdown-icons"></i> */}
                                    {/* </div>
                                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "5px" }}></div> */}
                                    <div className="form-group" ></div>
                                    <div className="form-group d-flex m-0 align-items-center poppins-regular zw_18 zw_secondary pb-0" style={{ position: "relative", fontSize: "1.5em" }}>

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
                                                <i className="icon-down-arrow form-icon-jb dropdown-icons ms-5" onClick={() => setDropdownOpen(!dropdownOpen)}></i>

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
                                    <div className="form-group">
                                        <input maxLength="15" type="tel" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Mobile Number" id="phone" name="phone" value={formData5.phone} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                                        <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                        {errors.phone && <span className="error">{errors.phone}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email" className='poppins-regular zw_20 zw_text_color'>Email Address</label>
                                <input type="email" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="E-mail ID" id="email" name="email" value={formData5.email} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            {/* <div className="pag-btn">
                        <span className="cursor">
                            <button type="button" className="btn-primary">
                                <i className="icon-arrow-left"></i>
                            </button>
                            <span className="primary-text ml10">Previous</span>
                        </span>
                        <span className="cursor">
                            <span className="primary-text mr10">Next</span>
                            <button type="button" className="btn-primary">
                                <i className="icon-arrow-right"></i>
                            </button>
                        </span>
                    </div> */}
                            {/* <div className="d-flex justify-content-center">
                       
                    </div> */}

                            {/* <div className='d-flex align-items-center mt-5'>
                                <div className='btn_bg_color_provider'>
                                    <img className='btn_pro_provider' src="../../../../images/previous.png" alt="btn" />
                                </div>
                                <p className='poppins-regular zw_18 zw_title_color mb-0 ms-4'>Previous</p>
                            </div>
                            <div className='d-flex align-items-center mt-5'>
                                <p className='poppins-regular zw_18 zw_title_color mb-0 me-4'>
                                    <Link to="/hospitalhealthcenter2">  
                                    <button className='link_btn btn-submit-form'>Next</button>
                                    </Link>
                                    </p>
                                <div className='btn_bg_color_provider'>
                                    <img className='btn_pro_provider' src="../../../../images/next.png" alt="btn" />
                                </div>
                            </div> */}
                            {/* <button className='link_btn btn-submit-form'>Next</button> */}
                            {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "95%" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={() => navigate(-1)}>
                                        <button className='link_btn' style={{ width: "100%" }}><img src='/images/Left.png'></img></button>Previous
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={handleSubmit}>
                                        Next<button className='link_btn btn-submit-form' style={{ width: "100%" }}><img src='/images/Right.png'></img></button>
                                    </div>
                                </div> */}
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
                        </form>
                        {/* <button className='link_btn btn-submit-form'>Submit</button> */}
                        {/*  
                {response && <div className="response">{JSON.stringify(response)}</div>} */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Hospital_Health_Center
