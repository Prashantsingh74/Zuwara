import React, { useState, useContext } from 'react';
import '../../../Style/Personal.css';
import { Link } from 'react-router-dom';
import Footer from '../../Layout/Footer';
import Navbar from '../../Layout/Navbar';
import { Context } from '../../../Context';
import { allCountries } from 'country-telephone-data';
import CountryFlag from 'react-country-flag';
import PatientlistSubLeftSec from './PatientlistSubLeftSec';

function Personal() {
  const { username } = useContext(Context);
  const [maritalStatus, setMaritalStatus] = React.useState('');
  const [formData, setFormData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    phone: '',
    relationship: '',
    dob: '',
    gender: '',
    country: '',
    age: '',
    nationalId: '',
  });

  const [errors, setErrors] = useState({});
  const [phone, setPhone] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [flag, setFlag] = useState('sa');
  const [code, setCode] = useState('+966');
  const [countryName, setCountryName] = useState('Saudi Arabia');
  const [searchQuery, setSearchQuery] = useState("");
  // const dropdownRef = useRef(null);
  const filteredCountries = allCountries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())

  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};

    // if (!formData.id) errors.id = "ID is required.";
    if (!formData.firstname) errors.firstname = "First Name is required.";
    if (!formData.lastname) errors.lastname = "Last Name is required.";
    if (!formData.phone) {
      errors.phone = "Phone Number is required.";
    } else if (!/^\d+$/.test(formData.phone)) {
      errors.phone = "Phone Number must be numeric.";
    }
    if (!formData.relationship) errors.relationship = "Relationship is required.";
    if (!formData.dob) errors.dob = "Date of Birth is required.";
    if (!formData.gender) errors.gender = "Gender is required.";
    if (!formData.country) errors.country = "Country is required.";
    if (!formData.age) errors.age = "Age is required.";
    if (!formData.nationalId) errors.nationalId = "National ID is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updatePatientRecord = async (data) => {
    const apiUrl = 'https://zuwara.net/admin/public/api/updatepatient/1';

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT', // Assuming PUT is the correct method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error Response:', errorText);
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      setApiResponse(result);
      console.log('API Response:', result);
      alert(result.message);

    } catch (error) {
      console.error('Fetch Error:', error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        id: formData.id,
        Relationship: formData.relationship,
        Firstname: formData.firstname,
        Lastname: formData.lastname,
        Phone: formData.phone,
        Dob: formData.dob,
        Gender: formData.gender,
        Country: formData.country,
        Nationalid: formData.nationalId,
      };
      updatePatientRecord(data);
    }
  };

  return (
    <div>
          <Navbar />
      <div className="desktop-4-p36 my-5">
        <div className="auto-group-vzd6-XiC container">
          {/* <div className="group-182-qit">
        
          </div> */}
          <Link to="/profile">
            <div className="group-1261154838-oUg">
              <img className="group-1261154072-XQg" src="./images/group-1261154072-2y2.png" alt='group-1261154072-2y2' />

              <p className="back-EZz mt-3">Back</p>

            </div>
          </Link>
          <div className="auto-group-dvg4-y1n row">

            
            <div className="col-lg-4 col-md-4">
                           <PatientlistSubLeftSec/>
                        </div>
            <div className="col-lg-8 col-md-8">
              <div className="group-1261154803-AtC">
                <form className="contact-form1" onSubmit={handleSubmit}>
                  <h2>View</h2>
                  <div className="row">
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="id" className='poppins-regular zw_text_color zw_20'></label>
                      <input
                        type="hidden"
                        id="1"
                        name="id"
                        placeholder='ID'
                        value={formData.id}
                        onChange={handleChange}
                        required
                      />
                      {errors.id && <span className="error">{errors.id}</span>}
                    </div>

                  </div>
                  <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="firstname" className='poppins-regular zw_text_color zw_20 '> Name</label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        className='inputborder poppins-regular'
                        placeholder='First Name'
                        value={formData.firstname}
                        onChange={handleChange}
                        required

                      />
                      {errors.firstname && <span className="error">{errors.firstname}</span>}
                    </div>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="lastname" className='poppins-regular zw_text_color zw_20 '>Last Name</label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        className='inputborder poppins-regular'
                        placeholder='Last Name'
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                      />
                      {errors.lastname && <span className="error">{errors.lastname}</span>}
                    </div>

                  </div>
                  <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="relationship" className='poppins-regular zw_text_color zw_20'>Relation</label>
                      <input
                        type="text"
                        id="relationship"
                        name="relationship"
                        className='inputborder poppins-regular'
                        placeholder='Relationship'
                        value={formData.relationship}
                        onChange={handleChange}
                        required
                      />
                      {errors.relationship && <span className="error">{errors.relationship}</span>}
                    </div>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="gender" className='poppins-regular zw_text_color zw_20  '>Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        className='inputborder poppins-regular'
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <span className="error">{errors.gender}</span>}
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="dob" className='poppins-regular zw_text_color zw_20'>Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        className='inputborder poppins-regular'
                        placeholder='Date of Birth'
                        value={formData.dob}
                        onChange={handleChange}
                        required

                      />
                      {errors.dob && <span className="error">{errors.dob}</span>}
                    </div>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="age" className='poppins-regular zw_text_color zw_20'>Age</label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        placeholder='Age'
                        value={formData.age}
                        onChange={handleChange}
                        className='inputborder poppins-regular'
                        required
                      />
                      {errors.age && <span className="error">{errors.age}</span>}
                    </div>
                  </div>

                  {/* <div className="row">
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="phone" className='poppins-regular zw_text_color zw_20'>Phone Number</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder='Phone Number'
                        value={formData.phone}
                        onChange={handleChange}
                        className='inputborder poppins-regular'
                        required
                      />
                      {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>

                  </div> */}
                  <div class="row " style={{ marginTop: '20px' }}>
                    <div className="col-12 col-md-12">
                      <label
                        className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                        style={{ marginBottom: "10px" }}
                      >
                        Mobile Number (Optional)
                      </label>
                    </div>
                    <div class="col-4 col-md-4">
                      <div
                        className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                        style={{ border: "1px solid #AF2245" }}
                      >
                        <div
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          style={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            height: "100%",
                            paddingLeft: "1px",

                          }}
                        >
                          <div className="zw_secondary poppins-regular zw_16">
                            <div>
                              {flag === "" ? (
                                <>
                                  <img
                                    src={`https://sanar-assets.com/flags/sa_64.png`}
                                    alt="Country Flags"
                                    height={20}
                                    width={20}
                                  />{" "}
                                  +966
                                </>
                              ) : (
                                <>
                                  <img
                                    src={`https://sanar-assets.com/flags/${flag}_64.png`}
                                    alt="Country Flags"
                                    height={20}
                                    width={20}
                                  />{" "}
                                  {code}
                                </>
                              )}
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
                          <i className="icon-down-arrow form-icon zw_icon_drop pl-4 "></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-8 col-md-8">
                      <div className="form-group zw_form_group" style={{ border: "1px solid #AF2245", borderRadius: "4px", }}>
                        <input
                          style={{ width: "97%" }}
                          type="text"
                          name="Phone"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-control  zw_form_control zw_secondary poppins-regular zw_20"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="country" className='poppins-regular zw_text_color zw_20'>ID/IQAMA NUMBER</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder='Country'
                        value={formData.country}
                        onChange={handleChange}
                        className='inputborder poppins-regular'
                        required
                      />
                      {errors.country && <span className="error">{errors.country}</span>}
                    </div>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="nationalId" className='poppins-regular zw_text_color zw_20'>Nationality</label>
                      <input
                        type="text"
                        id="nationalId"
                        name="nationalId"
                        placeholder='National ID'
                        value={formData.nationalId}
                        className='inputborder poppins-regular'
                        onChange={handleChange}
                        required
                      />
                      {errors.nationalId && <span className="error">{errors.nationalId}</span>}
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-xl-6 col-md-12">
                      <h4 className="poppins-regular zw_20">Additional Information</h4>
                      <h4 className="poppins-regular zw_10  mt-5">Maritial status</h4>
                    </div>
                    <div className="col-xl-6 col-md-12">
                      <fieldset className="form-group">

                        <div style={{ marginTop: "50px" }}>
                          <div className="form-check" style={{ display: 'inline-block', marginRight: '20px' }}>
                            <input
                              type="radio"
                              id="single"
                              name="maritalStatus"
                              value="single"
                              checked={maritalStatus === "single"}
                              onChange={(e) => setMaritalStatus(e.target.value)}
                              className="form-check-input"
                            />
                            <label htmlFor="single" className="form-check-label poppins-regular zw_16">
                              Single
                            </label>
                          </div>
                          <div className="form-check" style={{ display: 'inline-block' }}>
                            <input
                              type="radio"
                              id="married"
                              name="maritalStatus"
                              value="married"
                              checked={maritalStatus === "married"}
                              onChange={(e) => setMaritalStatus(e.target.value)}
                              className="form-check-input"
                            />
                            <label htmlFor="married" className="form-check-label poppins-regular zw_16">
                              Married
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                  </div>
                  <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="country" className='poppins-regular zw_text_color zw_20'>Height</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder='Entry your height'

                        className='inputborder poppins-regular'
                        required
                      />
                      {errors.country && <span className="error">{errors.country}</span>}
                    </div>
                    <div className="col-xl-6 col-md-12">
                      <label htmlFor="nationalId" className='poppins-regular zw_text_color zw_20'>Weight</label>
                      <input
                        type="text"
                        id="nationalId"
                        name="nationalId"
                        placeholder='Enter Your weight'

                        className='inputborder poppins-regular'

                        required
                      />
                      {errors.nationalId && <span className="error">{errors.nationalId}</span>}
                    </div>
                  </div>
                  <button type="submit" className='poppins-regular zw_text_color  link_btn zw_20 mx-auto mt-5 border-0' >Save</button>
                </form>
                {/* {apiResponse && (
                  <div className="api-response">
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Personal;
