import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { Link, useNavigate } from 'react-router-dom';
// import { Corporatedata } from '../Home/HomeServices/Dataforcorporate';
import '../../Style/Corporatewlness.css';
import '../../Style/Corporatenew.css';
// import RequestService from '../Corparatewellness/RequestService';
import { Context } from '../../Context';
import MapLocationPop from '../MapLocationPop';

function ExpansionTile({ id, title, description, includes, moreText, handleCheckboxChange, }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showText, setShowText] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleText = () => {
    setShowText(!showText);
  };



  return (
    <li className="sa-cursor sa-card active-border" style={{ borderRadius: "10px" }}>
      <div className='d-flex justify-content-between'>
        <div style={{ display: "flex", alignItems: "center", gap: '1rem' }}>
          <i className={isExpanded ? "icon-up-arrow" : "icon-down-arrow"} onClick={toggleExpansion}></i>
          <label htmlFor={id} className='poppins-bold zw_14 zw_text_color'>{title}</label>
        </div>
        <div>
          <input
            type="checkbox"
            id={id}
            name={id}
            style={{}}
            className='check-boxes '
            onChange={handleCheckboxChange}
          />


        </div>

      </div>

      <span className="poppins-regular zw_16 zw_secondary">
        {description}
        {' '}
        {showText && <span style={{}}>{moreText}</span>}
        {' '}
        {moreText && (
          <span className="sa-link sa-ml5" style={{ color: "#Af2245", textDecoration: "underline" }}>
            <span onClick={toggleText} style={{ cursor: 'pointer' }}>
              {showText ? "Hide details" : "More details"}
            </span>
          </span>
        )}
      </span>

      {isExpanded && (
        <div>
          <div className="sa-crp-incl poppins-regular zw_16 zw_title_color">
            <span className="sa-primary-text" style={{ color: "#Af2245" }}>Includes:</span> {includes}
          </div>
        </div>
      )}
    </li>
  );
}

function Corparatewellnessnew() {
  const [formData8, setFormData8] = useState({
    Type: "Corporate Wellness",
    Firstname: "",
    Email: "",
    Phone: "",
    Companyname: "",
    City: "",
    Noofemployee: "",
    Insurance: "",
    Description: "",
  })
  const [isChecked, setIsChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCheckboxChange = () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const anyCheckboxChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    setIsChecked(anyCheckboxChecked);
  };
  // const handleCheckboxChange = (id, title) => {
  //   let updatedSubservices;
  //   if (selectedSubservices.some(service => service.name === title)) {
  //     updatedSubservices = selectedSubservices.filter(service => service.name !== title);
  //   } else {
  //     updatedSubservices = [...selectedSubservices, { name: title }];
  //   }
  //   setSelectedSubservices(updatedSubservices);
  // };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const filteredData = Corporatedata.filter(item =>
  //   item.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const [CorporateWellnessData, setCorporateWellnessData] = useState([]);
  useEffect(() => {
    fetch(
      "https://zuwara.net/admin/public/api/subservices?id=13&servicetype=single"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCorporateWellnessData(data);
      });
  }, []);



  //  captcha start 
  const [captcha, setCaptcha] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);


  const generateCaptcha = () => {
    const randomCaptcha = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    setCaptcha(randomCaptcha.toString());
  };
  //  captcha end 


  // validation start 
  const [errors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [locationName, setLocationName] = useState('');
  const { show, setShow } = useContext(Context)
  const { appointmentData, updateAppointmentData } = useContext(Context);
  const [selectedSubservices, setSelectedSubservices] = useState([]);
  const [type, setType] = useState(appointmentData?.Typeoftest || '');
  const navigate = useNavigate();


  const showLocation = (loc) => {
    setLocationName(loc);
    updateAppointmentData({ Address: loc });
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData8({
      ...formData8,
      [name]: value
    });
  };

  //validation
  const validateForm = () => {
    const errors = {};

    // Validation rules
    if (!formData8.Firstname.trim()) {
      errors.Firstname = 'First Name is required';
    }

    if (!formData8.Email) {
      errors.Email = 'Email is required';
    } else {
      formData8.Email = formData8.Email.toLowerCase();
      if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(formData8.Email)) {
        errors.Email = 'Enter a valid email address (in lowercase)';
      }
    }


    if (!formData8.Phone) {
      errors.Phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData8.Phone)) {
      errors.Phone = 'Enter a valid 10-digit phone number';
    }

    if (!formData8.Companyname.trim()) {
      errors.Companyname = 'Company Name is required';
    }

    if (!formData8.Noofemployee) {
      errors.Noofemployee = 'Number of Employees is required';
    } else if (isNaN(formData8.Noofemployee) || formData8.Noofemployee <= 0) {
      errors.Noofemployee = 'Please enter a valid number of employees';
    }

    if (!formData8.City.trim()) {
      errors.City = 'Company City is required';
    }

    if (!formData8.Insurance.trim()) {
      errors.Insurance = 'Insurance is required';
    }

    if (!formData8.Description.trim()) {
      errors.Description = 'Description is required';
    }
    //validate captcha
    if (!formData8.captchaInput) {
      errors.captchaInput = 'Captcha is required';
    } else if (formData8.captchaInput !== captcha) {
      errors.captchaInput = 'Captcha does not match';
    }


    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const isValid = validateForm();
    setIsFormValid(isValid && isChecked);
  }, [formData8, isChecked]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    data.append('Type', 'Corporate Wellness');
    data.append('Firstname', formData8.Firstname);
    data.append('Email', formData8.Email);
    data.append('Phone', formData8.Phone);
    data.append('Companyname', formData8.Companyname);
    data.append('Noofemployee', formData8.Noofemployee);
    data.append('City', formData8.City);
    data.append('Insurance', formData8.Insurance);
    data.append('Description', formData8.Description);

    try {
      const response = await fetch('https://zuwara.net/admin/public/api/creategeneralrequest', {
        method: 'POST',
        headers: {
          'Cookie': 'zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ'
        },
        body: data
      });

      const result = await response.json();
      console.log('Success:', result);
      navigate('/thankyou');
    } catch (error) {
      console.error('Error:', error);
    }

  };

  // const onRequestService = () => {
  //   // updateAppointmentData({ Subservices: JSON.stringify(isChecked), Typeoftest: type });
  //   navigate('/thankyou');
  // };

  // validation end 

  return (
    <div>
      <Navbar />
      <div className="nursing-task-hRe">
        <div className="group-1261155501-1WC">
          <div className="group-1261154093-w8x">
            <Link to="/">
              <div className="group-1261154076-3Bz me-4">
                <img className="group-1261154072-Boz" src="./images/Group 1261154072.png" alt="Back" />
                <p className="back-WLU m-0">Back</p>
              </div>
            </Link>
            <div className="frame-37129-eBn">
              <div className="rectangle-39545-ZJk"></div>
              <div className="rectangle-39546-tbv"></div>
            </div>
          </div>
          <p className="nursing-tasks-7Ug mt-4 mb-4">Corporate Wellness</p>
          {/* <div className="auto-group-7ivg-qfa">
            <div className="group-1261154095-Axk">
              <div className="group-1261154098-vBE"> */}
          <div className="col-xl-5 col-lg-12 col-md-12 frames-37119 p-4 ">
            <div className='align-self-center d-flex cursor-pointer' onClick={() => setShow(true)}>
              <img className="grouped-1" src="/images/location.png" alt='' />
              <div className="ms-3 poppins-semibold zw_14 zw_title_color" >Selected Location</div>
            </div>
            <div className="lined-1"></div>
            <span className="poppins-semibold zw_14 zw_title_color">{appointmentData.Address}</span>
            {show ? <MapLocationPop path={"samePage"} locName={showLocation} /> : ""}
          </div>
          {/* <img className="vector-ppL" src="./images/vector.png" alt="vector" /> */}
        </div>
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* <div className="frame-37120-mUp">
              <input
                type="text"
                placeholder="Search your service "
                className="poppins-reguler zw_16 zw_999999"
                onChange={handleSearchChange}
                style={{ width: "510px", outline: "none", height: "50px" }}
              />
            </div> */}
        {/* </div> */}
        {/* </div> */}
      </div >
      <div className="sa-content sa-corpt-wellness py-4 container">
        <div className="padd-x ps-4">
          <div className="sa-col12 sa-col-md12 sa-col-sm12 sa-col-xs12">
            <p className="poppins-medium zw_18 zw_text_color me-3" style={{ maxWidth: '73rem' }}>
              We provide the best corporate
              health check-up packages specially designed
              for employees working for different sectors
            </p>
            {/* <span className="sa-ser-offer">Service We Offer</span> */}
            <ul className="sa-card-listt me-3">
              {CorporateWellnessData.map(item => (
                <ExpansionTile
                  key={item.id}
                  id={item.Enname}
                  title={item.Arname}
                  description={item.Endescription}
                  includes={item.Ardescription}
                  moreText={item.Eninstrucation}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ))}

              {/* <Link className="request-service-link" to="/request-service-form"> */}

              {/* </Link> */}



            </ul>

          </div>

        </div>
      </div>

      {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}
      <div className="request-service-link padd-x" >
        <button className="link_btn my-5 mx-auto" data-bs-toggle="modal" data-bs-target="#requestservice" style={{ borderRadius: "5px", border: 'none', width: "313px", background: isChecked ? "#AF2245" : "#cf5a75" }} disabled={!isChecked}>
          Request service
        </button>
      </div>

      <div className="modal fade" id="requestservice" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{ marginTop: '13rem' }}>
            <div className="modal-body p-3 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">

                      <label htmlFor="Firstname" className='poppins-regular zw_20 zw_text_color'>First Name <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Enter first name" id="Firstname" name="Firstname" value={formData8.Firstname} onChange={handleInputChange} style={{ border: 'none', padding: "1em", width: "100%" }}></input>
                      <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                      {errors.Firstname && <span className="error">{errors.Firstname}</span>}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group" style={{ display: 'grid' }}>
                      <label htmlFor="Lname" className='poppins-regular zw_20 zw_text_color'>Last Name <span style={{ color: 'red' }}></span></label>
                      <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Last Name" id="regNum" name="lastName" onChange={handleInputChange} style={{ border: "none", padding: "1em", width: "100%" }}></input>
                      <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                      {errors.Lastname && <span className="error" style={{ color: '#af2245', fontSize: '13px' }}>{errors.Lastname}</span>}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="Email" className='poppins-regular zw_20 zw_text_color'>Email <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Enter Email" id="Email" name="Email" value={formData8.Email} onChange={handleInputChange} style={{ border: 'none', padding: "1em", width: "100%" }}></input>
                      <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                      {errors.Email && <span className="error" style={{ color: '#af2245', fontSize: '13px' }}>{errors.Email}</span>}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group" style={{ display: 'grid' }}>
                      <label htmlFor="Phone" className='poppins-regular zw_20 zw_text_color'>Phone Number <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Enter Phone Number" id="Phone" name="Phone" value={formData8.Phone} onChange={handleInputChange} style={{ border: "none", padding: "1em", width: "100%" }}></input>
                      <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                      {errors.Phone && <span className="error" style={{ color: '#af2245', fontSize: '13px' }}>{errors.Phone}</span>}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="Companyname" className='poppins-regular zw_20 zw_text_color'>Company Name <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Company Name" id="Companyname" name="Companyname" value={formData8.Companyname} onChange={handleInputChange} style={{ border: 'none', padding: "1em", width: "100%" }}></input>
                      <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                      {errors.Companyname && <span className="error" style={{ color: '#af2245', fontSize: '13px' }}>{errors.Companyname}</span>}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group" style={{ display: 'grid' }}>
                      <label htmlFor="Noofemployee" className='poppins-regular zw_20 zw_text_color'>Number of Employee <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Number of Employee" id="Noofemployee" name="Noofemployee" value={formData8.Noofemployee} onChange={handleInputChange} style={{ border: "none", padding: "1em", width: "100%" }}></input>
                      <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                      {errors.Noofemployee && <span className="error" style={{ color: '#af2245', fontSize: '13px' }}>{errors.Noofemployee}</span>}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="City" className='poppins-regular zw_20 zw_text_color'>Company City <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Company City" id="City" name="City" value={formData8.City} onChange={handleInputChange} style={{ border: 'none', padding: "1em", width: "100%" }}></input>
                      <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                      {errors.City && <span className="error" style={{ color: '#af2245', fontSize: '13px' }}>{errors.City}</span>}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group" style={{ display: 'grid' }}>
                      <label htmlFor="Insurance" className='poppins-regular zw_20 zw_text_color'>Insurance if Available <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' id="Insurance" name="Insurance" value={formData8.Insurance} onChange={handleInputChange} style={{ border: "none", padding: "1em", width: "100%" }}></input>
                      <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                      {errors.Insurance && <span className="error" style={{ color: '#af2245', fontSize: '13px' }}>{errors.Insurance}</span>}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <div className='d-flex justify-content-between'>
                      <label htmlFor="Description" className='poppins-regular zw_20 zw_text_color'>Notes(Optional)</label>
                      <label className='poppins-regular zw_20 zw_text_color'> 0/500 Words</label>
                    </div>
                    <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' id="Description" name="Description" value={formData8.Description} onChange={handleInputChange} style={{ border: "none", padding: "1em", width: "100%" }}></input>
                    <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="captcha" className='poppins-regular zw_20 zw_text_color'>Enter Captcha <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' id="regNum" name="captchaInput" value={formData8.captchaInput} onChange={handleInputChange} style={{ border: "none", padding: "1em", width: "100%" }}></input>
                      <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                      {errors.captchaInput && <span className="error" style={{ color: '#af2245', fontSize: '13px' }}>{errors.captchaInput}</span>}
                    </div>

                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="sa-form-group d-flex justify-content-evenly mt-5">
                      <h2 id="RandomCaptchaNum" style={{ fontSize: "25px" }}>{captcha}</h2>
                      <button
                        onClick={generateCaptcha}
                        type="button"
                        className="sa-btn sa-btn-transparent ml-auto"
                      >
                        <i className="icon-reload sa-otp-ref" style={{ fontSize: "25px", color: 'black' }}></i>
                      </button>
                    </div>
                  </div>
                </div>

                <button className='link_btn mx-auto my-5' style={{ border: 'none' }} data-bs-dismiss="modal" aria-label="Close" disabled={!isFormValid} >Submit</button>
              </form>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default Corparatewellnessnew;
