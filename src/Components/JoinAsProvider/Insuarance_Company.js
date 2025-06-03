import React, { useState , useContext,useEffect,useRef } from 'react'
import '../../Style/Doctor_Specialist.css';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { Link , Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../../Context';
import { allCountries } from 'country-telephone-data';
import CountryFlag from 'react-country-flag';
function Insuarance_Company() {
    const {formData, setFormData} = useContext(Context);
    const [response, setResponse] = useState(null);
    // const { formData, setFormData } = useContext(Context);
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
        return country ? country.length : 9 ; // Default length if country code not found
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.Firstname) newErrors.Firstname = 'Insurance Company Name is required';
        if (!formData.Phone) {
            newErrors.Phone = 'Mobile Number is required';
        }
        const expectedLength = getCountryLength(flag);
        if (formData.Phone && formData.Phone.length !== expectedLength) {
            newErrors.Phone = `Mobile Number must be ${expectedLength} digits for ${code}`;
        }
        if (!formData.Email) {
            newErrors.Email = 'Email Address is required';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log("Submitting Step1 data:")
        console.log(formData)
        navigate('/insurance2');
        // try {
        //     const res = await fetch('https://zuwara.net/admin/public/api/creategeneralrequest', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });
        //     const data = await res.json();
        //     console.log('Step1 data:',data)
        //     setResponse(data);
        //     navigate('/insurance2');
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    };

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        // Clear error for the field being updated
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error for the specific field
        }));
    };
    


    return (
        <>
            <Navbar />
            <div className="container py-4">
                <div className="card-shadow service-prov" style={{ top: "77px", marginBottom: "115px" }}>
                    <span className="btn-back mob-block">
                        <i className="icon-arrow-left"></i>
                    </span>
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
                        <div className="row gutter5">
                            <div className="col-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label className='poppins-regular zw_20 zw_text_color'>Insurance Company Name</label>
                                    <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Insurance Company Name" id="insurance" name="Firstname" value={formData.Firstname} onChange={handleChange} style={{ width: "100%", border: "none", padding: "1%" }}></input>
                                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    {errors.Firstname && <span className="error">{errors.Firstname}</span>}
                                </div>
                                
                            </div>
                        </div>

                        <div className="row">
                            <label className='poppins-regular zw_20 zw_text_color mt-3'>Mobile Number</label>
                            <div className="col-4 col-sm-4 col-md-2">
                                {/* <div className="form-group d-flex m-0 align-items-center">
                                    <img className="form-icon-jb form-img-jb" src="../../../../images/Group 1261156053.svg" alt='' />
                                    <select className="w-100 inp-flag mt-3 poppins-regular zw_18 zw_secondary pb-3" id="countryCode" name="countryCode" style={{ border: "none", backgroundColor: 'transparent', marginTop: '1rem' }} readOnly>
                                        <option value="+91">+91</option>
                                        <option value="+..">+..</option>
                                        <option value="+..">+..</option>
                                        <option value="+..">+..</option>
                                    </select> */}
                                    {/* <i className="icon-down-arrow form-icon-jb dropdown-icons"></i> */}
                                {/* </div>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "5px" }}></div>
                            </div> */}
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
                                    <input maxLength="15" type="number" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Mobile Number" id="Phone" name="Phone" value={formData.Phone} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    {errors.Phone && <span className="error">{errors.Phone}</span>}

                                </div>
                            </div>
                        </div>



                        <div className="form-group">
                            <label htmlFor="Email" className='poppins-regular zw_20 zw_text_color'>Email Address</label>
                            <input type="email" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="E-mail ID" id="Email" name="Email" value={formData.Email} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                            <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                            {errors.Email && <span className="error">{errors.Email}</span>}
                        </div>
                        {/* <div className="pag-btn">
                    <span className="cursor">
                        <button type="button" className="btn-primary" style={{float:"left"}}>
                            <i className="icon-arrow-left"></i>
                        </button>
                        <span className="primary-text ml10">Previous</span>
                    </span>
                    <span className="cursor">
                        <span className="primary-text mr10">Next</span>
                        <button type="button" className="btn-primary" style={{float:"right"}}>
                            <i className="icon-arrow-right"></i>
                        </button>
                    </span>
                </div> */}
                {/* <Link > */}
                        {/* <button className='link_btn btn-submit-form'>Submit</button> */}
                {/* </Link> */}

                <div className='d-flex justify-content-between my-5'>
                            <div className='d-flex align-items-center mt-5' onClick={() => navigate(-1)}>
                                <div className='btn_bg_color_provider'>
                                    <img className='btn_pro_provider' src="../../../../images/previous.png" alt="btn" />
                                </div>
                                <p className='poppins-regular zw_18 zw_title_color mb-0 ms-4'>Previous</p>
                            </div>
                            <div className='d-flex align-items-center mt-5'  onClick={handleSubmit}>
                                <p className='poppins-regular zw_18 zw_title_color mb-0 me-4'>Next</p>
                                <div className='btn_bg_color_provider'>
                                    <img className='btn_pro_provider' src="../../../../images/next.png" alt="btn" />
                                </div>
                            </div>
                        </div>

                {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "95%" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={() => navigate(-1)}>
                                    <button className='link_btn' style={{ width: "100%" }}><img src='/images/Left.png'></img></button>Previous
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={handleSubmit}>
                                    Next<button className='link_btn btn-submit-form' style={{ width: "100%" }}><img src='/images/Right.png'></img></button>
                                </div>
                            </div> */}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Insuarance_Company