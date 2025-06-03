import React, { useState, useEffect, useRef } from "react";
import "../.././Style/Contact.css";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { allCountries } from "country-telephone-data";
import CountryFlag from "react-country-flag";
const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    subject: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [flag, setFlag] = useState("sa");
  const [code, setCode] = useState("+966");
  const [countryName, setCountryName] = useState("Saudi Arabia");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Filtered list based on search query
  const filteredCountries = allCountries.filter((country) =>
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = new FormData();
    formPayload.append("Subject", formData.subject);
    formPayload.append("Email", formData.email);
    formPayload.append("Phone", formData.phoneNumber);
    formPayload.append("Message", formData.comments);

    try {
      const response = await fetch(
        "https://zuwara.net/admin/public/api/supportsrequest",
        {
          method: "POST",
          headers: {
            Cookie: "zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ",
          },
          body: formPayload,
        }
      );


      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error("An error occurred while sending your message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div id="contus">
        <div  className="container">
          <div className="row justify-content-between">
            <div className="col-lg-7 me-4">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="poppins-medium zw_32 zw_title_color">
                  Contact Us
                </h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="FirstName"
                        className="poppins-regular zw_20 zw_text_color"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="poppins-regular zw_18 zw_secondary pb-0 pt-3 bg-transparent mb-0"
                        placeholder="First Name"
                        id="FirstName"
                        name="firstname"
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
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="email"
                        className="poppins-regular zw_text_color pb-2 zw_20"
                      >
                        E-mail ID
                      </label>
                      <input
                        className="poppins-regular zw_secondary zw_16 bg-transparent pb-0 pt-3 mb-0 "
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail ID"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
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
                <div className="row justify-content-between">
                  <label
                    htmlFor="phoneNumber"
                    className="poppins-regular zw_text_color zw_20"
                  >
                    Phone Number
                  </label>
                  <div className="col-md-4" style={{ marginTop: "1rem" }}>
                    <div className="form-group d-flex m-0 align-items-center poppins-regular zw_18 zw_secondary pb-0 ">
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
                          className="icon-down-arrow form-icon-jb dropdown-icons drop-icon-con "
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        ></i>
                      </div>
                      <div
                        className="dpcontent poppins-regular zw_18 zw_secondary pb-0"
                        style={{
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
                        }}
                      >
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
                          className="poppins-regular zw_secondary zw_16 bg-transparent mb-0 pb-0"
                          placeholder="Search country..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "5px",
                            marginBottom: "10px",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />

                        {/* Filtered country list */}
                        {filteredCountries.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setCode(item.dialCode);
                              setFlag(item.iso2);
                              setCountryName(item.name);
                              setDropdownOpen(false);
                              setSearchQuery(""); // Reset search on selection
                            }}
                          >
                            <CountryFlag
                              countryCode={item.iso2.toUpperCase()}
                              svg
                              style={{ width: "30px", height: "30px" }}
                            />
                            {item.name} {item.dialCode}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      style={{
                        borderRadius: "6px",
                        borderBottom: "2px solid #AF2245",
                        height: "7px",
                      }}
                    ></div>
                  </div>
                  <div className="col-md-7">
                    <input
                      className="poppins-regular zw_secondary zw_16 bg-transparent mb-0 pb-0"
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Mobile Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />{" "}
                    <div
                      style={{
                        borderRadius: "6px",
                        borderBottom: "2px solid #AF2245",
                        height: "11px",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="subject"
                    className="poppins-regular zw_text_color zw_20 mt-4"
                  >
                    Subject
                  </label>
                  <input
                    className="poppins-regular zw_secondary zw_16 bg-transparent mb-0 pb-0"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Write the subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <div
                    style={{
                      borderRadius: "6px",
                      borderBottom: "2px solid #AF2245",
                      height: "11px",
                    }}
                  ></div>
                  {/* {errors.email && <div className="error">{errors.email}</div>} */}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="comments"
                    className="poppins-regular zw_text_color zw_20"
                  >
                    Write your comments
                  </label>
                  <textarea
                    className="poppins-regular zw_secondary zw_16 border-0 bg-transparent mb-0"
                    style={{ outline: "none" }}
                    id="comments"
                    name="comments"
                    placeholder="Write your comments"
                    value={formData.comments}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <div
                    style={{
                      borderRadius: "6px",
                      borderBottom: "2px solid #AF2245",
                      height: "11px",
                    }}
                  ></div>
                  {/* {errors.email && <div className="error">{errors.email}</div>} */}
                </div>

                <button
                  type="submit"
                  className="poppins-regular zw_text_color zw_20 link_btn mt-5"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
            <div className="col-lg-4 ">
              <div className="contact-sec-2">
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src="../../images/contactus-icon.png"
                    alt="contact_icon"
                  />
                </div>
                <div>
                  <p className="poppins-medium zw_16 zw_text_color mb-0">
                    ZwarahAddress
                  </p>
                  <img src="./images/address-icon-con.svg" alt="b" />
                  <span className="ms-3 poppins-regular zw_16 zw_secondary">
                    Riyadh
                  </span>
                </div>
                <div>
                  <p className="poppins-medium zw_16 zw_text_color mb-0 mt-3">
                    Contact Number
                  </p>
                  <div className="d-flex contactus-mob justify-content-between">
                    <div>
                      <img src="./images/contact-icon-con.svg" alt="a" />
                      <span className="ms-3 poppins-regular zw_16 zw_secondary">
                        +966 5577898
                      </span>
                    </div>
                    <div>
                      <img src="./images/contact-icon-con.svg" alt="c" />
                      <span className="ms-3 poppins-regular zw_16 zw_secondary">
                        +966 5577898
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="poppins-medium zw_16 zw_text_color mb-0 mt-3">
                      Gerneral enquiries
                    </p>
                    <span className="poppins-regular zw_16 zw_secondary">
                      Customercare@zwarah.sa
                    </span>
                  </div>
                  <div>
                    <p className="poppins-medium zw_16 zw_text_color mb-0 mt-3">
                      Hospitals and doctors inquiries
                    </p>
                    <span className="poppins-regular zw_16 zw_secondary">
                      Support@zwarah.sa
                    </span>
                  </div>
                  <div>
                    <p className="poppins-medium zw_16 zw_text_color mb-0 mt-3">
                      For service
                    </p>
                    <span className="poppins-regular zw_16 zw_secondary">
                      Service@zwarah.sa
                    </span>
                  </div>
                  <div>
                    <p className="poppins-medium zw_16 zw_text_color mb-0 mt-3">
                      Technical support
                    </p>
                    <span className="poppins-regular zw_16 zw_secondary">
                      Technicalsupport@zwarah.sa
                    </span>
                  </div>
                  <div className="mt-5 d-flex justify-content-between">
                    <img src="./images/linkedin-icon-con.svg" alt="linkedin" />
                    <img
                      src="./images/whatsapp-con.svg"
                      width={"65px"}
                      alt="whatsapp"
                    />
                    <img src="./images/x-icon-con.svg" alt="x-icon" />
                    <img src="./images/insta-icon-con.svg" alt="insta" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsForm;
