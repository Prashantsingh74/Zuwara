import React, { useState, useEffect, useContext, useRef } from 'react'
import '../../Style/Doctor_Specialist.css';
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import { Context } from '../../Context';
import { useNavigate } from "react-router-dom";
import { allCountries } from 'country-telephone-data';
import CountryFlag from 'react-country-flag';

function Practiotioner() {
    const { formData7, setFormData7 } = useContext(Context);
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        console.log("Submitting Step1 data:")
        console.log(formData7);

        try {
            const res = await fetch('https://zuwara.net/admin/public/api/creategeneralrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': 'zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ'
                },
                body: JSON.stringify(formData7),
            });
            const data = await res.json();
            console.log('Submitted data', data)
            setResponse(data);
            navigate('/thankyou');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData7({ ...formData7, [name]: value });

        // Clear error for the field being updated
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error for the specific field
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData7.Firstname) errors.Firstname = "First name is required";
        if (!formData7.Lastname) errors.Lastname = "Last name is required";

        if (!formData7.Email) errors.Email = "Email is required";
        if (!formData7.Country) errors.Country = "Country is required";
        if (!formData7.City) errors.City = "City is required";
        if (!formData7.Phone) errors.Phone = "Phone number is required";
        const expectedLength = getCountryLength(flag);
        if (formData7.Phone && formData7.Phone.length !== expectedLength) {
            errors.Phone = `Mobile Number must be ${expectedLength} digits for ${code}`;
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


    return (
        <div>
            <Navbar />
            <div className="container py-4">
                <div className="card-shadow service-prov" style={{ top: "77px", marginBottom: "115px" }}>
                    {/* <span className="btn-back mob-block">
            <i className="icon-arrow-left"></i>
          </span> */}
                    <h4 className="tit mob-header mob-block">Request Form</h4>
                    <div className="text-center">
                        <h3 className='poppins-semibold zw_34 zw_title_color '>Provide My Services Via Zuwarh Request Form</h3>
                        <p className='poppins-regular zw_16 zw_text_color mb-5'>We are pleased to cooperate with us in providing and facilitating access to your services Via Zuwarh platform</p>
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

                    {/* <ul className="track-order list-unstyled d-flex justify-content-center">
            <li className="accepted">
              <span className="track-dot icon-checked"></span>
            </li>
            <li className="packed">
              <span className="track-dot fill-dot"></span>
            </li>
            <li className="idelivered">
              <span className="track-dot"></span>
            </li>
          </ul> */}
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Firstname" className='poppins-regular zw_20 zw_text_color'>First Name</label>
                                    <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="First Name" id="Firstname" name="Firstname" value={formData7.Firstname} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    {errors.Firstname && <span className="text-danger">{errors.Firstname}</span>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Lastname" className='poppins-regular zw_20 zw_text_color'>Last Name</label>
                                    <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Last Name" id="Lastname" name="Lastname" value={formData7.Lastname} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    {errors.Lastname && <span className="text-danger">{errors.Lastname}</span>}
                                </div>
                            </div>
                        </div>
                        {/* <div className="form-group">
                            <label className='poppins-regular zw_20 zw_text_color mb-4'>Gender</label>
                            <div className="d-flex">
                                <div className="form-check form-check-inline" style={{ width: "49%" }}>
                                    <input type="radio" id="Male" name="Male" value="1" checked={formData7.Male === "1"} onChange={handleChange} className="form-check-input mx-4" />
                                    <label htmlFor="Male" className=" poppins-regular zw_20 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Male</label>
                                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>

                                </div>
                                <div className="form-check form-check-inline" style={{ width: "49%" }}>
                                    <input type="radio" id="Female" name="Female" value="1" checked={formData7.Female === "1"} onChange={handleChange} className="form-check-input mx-4" />
                                    <label htmlFor="Female" className=" poppins-regular zw_20 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Female</label>
                                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                </div>

                            </div>

                        </div> */}
                        <div className="form-group">
                            <label className="poppins-regular zw_20 zw_text_color mb-4">Gender</label>
                            <div className="d-flex">
                                <div className="form-check form-check-inline" style={{ width: "49%" }}>
                                    <input
                                        type="radio"
                                        id="Male"
                                        name="gender" // Use the same name for both radio buttons
                                        value="Male"
                                        checked={formData7.gender === "Male"} // Adjusted to match the gender property
                                        onChange={handleChange}
                                        className="form-check-input mx-4"
                                    />
                                    <label
                                        htmlFor="Male"
                                        className="poppins-regular zw_20 zw_secondary d-flex align-items-center"
                                        style={{ border: "none", backgroundColor: "transparent" }}
                                    >
                                        Male
                                    </label>
                                    <div
                                        style={{
                                            borderRadius: "6px",
                                            borderBottom: "2px solid #AF2245",
                                            height: "11px",
                                        }}
                                    ></div>
                                </div>
                                <div className="form-check form-check-inline" style={{ width: "49%" }}>
                                    <input
                                        type="radio"
                                        id="Female"
                                        name="gender" // Use the same name for both radio buttons
                                        value="Female"
                                        checked={formData7.gender === "Female"} // Adjusted to match the gender property
                                        onChange={handleChange}
                                        className="form-check-input mx-4"
                                    />
                                    <label
                                        htmlFor="Female"
                                        className="poppins-regular zw_20 zw_secondary d-flex align-items-center"
                                        style={{ border: "none", backgroundColor: "transparent" }}
                                    >
                                        Female
                                    </label>
                                    <div
                                        style={{
                                            borderRadius: "6px",
                                            borderBottom: "2px solid #AF2245",
                                            height: "11px",
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <label className='poppins-regular zw_20 zw_text_color'>Phone number</label>
                            <div className="col-4 col-sm-4 col-md-2">
                                <div className="form-group" ></div>
                                <div className="form-group d-flex m-0 align-items-center poppins-regular zw_18 zw_secondary pb-0" style={{ position: "relative", fontSize: "1.5em", marginTop: '1rem' }}>

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
                                    <input maxLength="15" type="tel" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Mobile Number" id="Phone" name="Phone" value={formData7.Phone} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    {errors.Phone && <span className="text-danger">{errors.Phone}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email" className='poppins-regular zw_20 zw_text_color'>Email Address</label>
                            <input type="email" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="abdul.rehman323@hotmail.com" id="Email" name="Email" value={formData7.Email} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                            <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                            {errors.Email && <span className="text-danger">{errors.Email}</span>}
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="Country" className='poppins-regular zw_20 zw_text_color mb-4'>Select Country</label>
                                <div className="form-group d-flex m-0 align-items-center">

                                    <input className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0" placeholder="Select Country" id="Country" name="Country" value={formData7.Country} onChange={handleChange} style={{ border: "none" }} />
                                    <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>
                                </div>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                {errors.Country && <span className="text-danger">{errors.Country}</span>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="City" className='poppins-regular zw_20 zw_text_color mb-4'>Select City</label>
                                <div className="form-group d-flex m-0 align-items-center">

                                    <input className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0" placeholder="Select City" id="City" name="City" value={formData7.City} onChange={handleChange} style={{ border: "none" }} />
                                    <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>

                                </div>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                {errors.City && <span className="text-danger">{errors.City}</span>}
                            </div>
                            <div className="form-group">
                                <label className='poppins-regular zw_20 zw_text_color mt-4 mb-4'>Select Provider Service</label>



                                <div className="row">
                                    <div className='col-12 col-sm-6 col-lg-3 mb-3'>
                                        <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                            <input type="radio" id="Homevisitnparamedic" name="Homevisitnparamedic" value="1" checked={formData7.Homevisitnparamedic === "1"} onChange={handleChange} className="form-check-input mx-4" />
                                            <label htmlFor="Homevisitnparamedic" className="poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Paramedic</label>
                                            <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-lg-3 mb-3'>
                                        <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                            <input type="radio" id="Telemedicinennurse" name="Telemedicinennurse" value="1" checked={formData7.Telemedicinennurse === "1"} onChange={handleChange} className="form-check-input mx-4" />
                                            <label htmlFor="Telemedicinennurse" className=" poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Nurse</label>
                                            <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-lg-3 mb-3'>
                                        <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                            <input type="radio" id="Allnlabtech" name="Allnlabtech" value="1" checked={formData7.Allnlabtech === "1"} onChange={handleChange} className="form-check-input mx-4" />
                                            <label htmlFor="Allnlabtech" className="poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Lab Technician</label>
                                            <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6 col-lg-3 mb-3'>
                                        <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                            <input type="radio" id="Othersnphysio" name="Othersnphysio" value="1" checked={formData7.Othersnphysio === "1"} onChange={handleChange} className="form-check-input mx-4" />
                                            <label htmlFor="Othersnphysio" className=" poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Physiotherapist</label>
                                            <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "95%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={() => navigate(-1)}>
                        <button className='link_btn' style={{ width: "100%" }}><img src='/images/Left.png'></img></button>Previous
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={handleSubmit}>
                        Submit<button className='link_btn btn-submit-form' style={{ width: "100%" }}><img src='/images/Right.png'></img></button>
                    </div>
                </div> */}
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
                    </form>
                    {/* <button className='link_btn btn-submit-form'>Submit</button> */}

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Practiotioner;