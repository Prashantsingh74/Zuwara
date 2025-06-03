import React, { useState,useEffect,useRef } from "react";
import "../Style/Doctor_Specialist.css";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { allCountries } from 'country-telephone-data';
import CountryFlag from 'react-country-flag';
function RequestNow() {
  const [reqformData, setReqFormData] = useState({
    Firstname: "",
    Lastname: "",
    Phone: "",
    Details: "",
  });
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState("");
  const [code, setCode] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const countries = [
    { code: "in", name: "India", countryCode: "+91" },
    { code: "sa", name: "Saudi Arabia", countryCode: "+966" },
    { code: "eg", name: "Egypt", countryCode: "+20" },
    { code: "au", name: "Australia", countryCode: "+61" },
    { code: "cn", name: "Canada", countryCode: "+1" },
    { code: "fr", name: "France", countryCode: "+33" },
    { code: "pk", name: "Pakistan", countryCode: "+92" },
    { code: "sl", name: "Sri Lanka", countryCode: "+94" },
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
 


  const validate = () => {
    const newErrors = {};
    if (!reqformData.Firstname) newErrors.Firstname = "First name is required";
    if (!reqformData.Lastname) newErrors.Lastname = "Last name is required";
    if (!reqformData.Phone) newErrors.Phone = "Phone number is required";
    else if (!/^\d{10,15}$/.test(reqformData.Phone))
      newErrors.Phone = "Phone number must be between 10 to 15 digits";
    if (!reqformData.Details)
      newErrors.Details = "Service details is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReqFormData({ ...reqformData, [name]: value });
    // Clear errors for the field being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(reqformData);
       // Reset form data
       setReqFormData({
        Firstname: "",
        Lastname: "",
        Phone: "",
        Details: "",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container glob-prgh top-space">
        <div>
          <div
            className="card-shadow service-prov"
            style={{
              top: "95px",
              marginBottom: "115px",
            }}
          >
            <div className="row">
              <div className="col">
                <div className="">
                  <Link to={-1}>
                    <img
                      className="group-1261154072"
                      src="/images/Group 1261154072.png"
                      alt="Group1"
                    />
                    <span className="back poppins-medium zw_18 zw_black align-middle mx-3 mb-0">
                      Back
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <h3 className="poppins-semibold zw_34 zw_title_color">
              Personalized service request form
              </h3>
              <p className="poppins-regular zw_16 zw_text_color my-5">
              Would you like to get an additional service other than our service that suit your needs?
              </p>
            </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-6 col-md-6 col-sm-6 col-xs-12" >
                    <div className="form-group">
                      <label
                        htmlFor="Firstname"
                        className="poppins-regular zw_20 zw_text_color"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="poppins-regular zw_18 zw_secondary pb-0"
                        placeholder="First Name"
                        id="Firstname"
                        name="Firstname"
                        value={reqformData.Firstname}
                        onChange={handleChange}
                        style={{
                          border: "none",
                          padding: "1em",
                          width: "100%",
                        }}
                      />
                      <div
                        style={{
                          borderRadius: "6px",
                          borderBottom: "2px solid #AF2245",
                          height: "11px",
                        }}
                      ></div>
                      {errors.Firstname && (
                        <span className="error">{errors.Firstname}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <label
                        htmlFor="Lastname"
                        className="poppins-regular zw_20 zw_text_color"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="poppins-regular zw_18 zw_secondary pb-0"
                        placeholder="Last Name"
                        id="Lastname"
                        name="Lastname"
                        value={reqformData.Lastname}
                        onChange={handleChange}
                        style={{
                          border: "none",
                          padding: "1em",
                          width: "100%",
                        }}
                      />
                      <div
                        style={{
                          borderRadius: "6px",
                          borderBottom: "2px solid #AF2245",
                          height: "11px",
                        }}
                      ></div>
                      {errors.Lastname && (
                        <span className="error">{errors.Lastname}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label className="poppins-regular zw_20 zw_text_color mt-4">
                    Mobile Number
                  </label>
                  <div className="col-md-2">
                    <div
                      className="form-group d-flex m-0 align-items-center poppins-regular zw_18 zw_secondary pb-0"
                      style={{ position: "relative", fontSize: "1.5em" }}
                    >
                      <div
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5em",
                        }}
                      >
                        {flag === "" ? (
                          <>
                            <img
                              src={`https://sanar-assets.com/flags/sa_64.png`}
                              alt="Country Flags"
                              height={30}
                              width={30}
                            />{" "}
                            +966
                          </>
                        ) : (
                          <>
                            <img
                              src={`https://sanar-assets.com/flags/${flag}_64.png`}
                              alt="Country Flags"
                              height={30}
                              width={30}
                            />{" "}
                            {code}
                          </>
                        )}
                        <i
                          className="icon-down-arrow form-icon-jb dropdown-icons ms-5"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        ></i>
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
                    <div
                      style={{
                        borderRadius: "6px",
                        borderBottom: "2px solid #AF2245",
                        height: "5px",
                      }}
                    ></div>
                  </div>
                  <div className="col-md-10">
                    <div className="form-group">
                      <input
                        maxLength="15"
                        type="tel"
                        className="poppins-regular zw_18 zw_secondary pb-0 px-4"
                        placeholder="Mobile Number"
                        id="Phone"
                        name="Phone"
                        value={reqformData.Phone}
                        onChange={handleChange}
                        style={{ border: "none", width: "100%" }}
                      />
                      <div
                        style={{
                          borderRadius: "6px",
                          borderBottom: "2px solid #AF2245",
                          height: "11px",
                        }}
                      ></div>
                      {errors.Phone && (
                        <span className="error">{errors.Phone}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="Details"
                    className="poppins-regular zw_20 zw_text_color"
                  >
                   Wanted service details
                  </label>
                  <textarea
                    className="poppins-regular zw_18 zw_secondary pb-0"
                    placeholder="Write the details here...."
                    id="Details"
                    name="Details"
                    value={reqformData.Details}
                    onChange={handleChange}
                    style={{
                      border: "none",
                      padding: "1em",
                      width: "100%",
                      outline: "none",
                    }}
                  ></textarea>
                  <div
                    style={{
                      borderRadius: "6px",
                      borderBottom: "2px solid #AF2245",
                      height: "11px",
                    }}
                  ></div>
                  {errors.Details && (
                    <span className="error">{errors.Details}</span>
                  )}
                </div>

              <div className="text-center">
              <div
                    className=" mt-5"
                    
                  >
                    <span className="poppins-regular zw_18 zw_title_color mb-0 me-4">
                    Send Request
                    </span>
                    <button type="submit" className="btn_bg_color_provider px-5">
                      <img
                        className="btn_pro_provider"
                        src="../../../../images/next.png"
                        alt="btn"
                      />
                    </button>
                  </div>
              </div>
              </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RequestNow;
