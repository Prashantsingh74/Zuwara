import React, { useState, useContext } from 'react'
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { useNavigate } from "react-router-dom";
import { Context } from '../../Context';

function Hospital_Health_Center_2() {
    const { formData6, setFormData6, formData5, setFormData5 } = useContext(Context);
    const [response, setResponse] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // setFormData6({ ...formData6, [name]: value });
        const { name, value, checked } = e.target;
        if (checked) {
            setFormData6({ ...formData6, [name]: formData6[name] ? `${formData6[name]},${value}` : value });
        } else {
            const values = formData6[name].split(',').filter(item => item !== value);
            setFormData6({ ...formData6, [name]: values.join(',') });
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error for the specific field
        }));
    };

    const validate = () => {
        let formErrors = {};
        if (!formData6.service_type) formErrors.service_type = 'Service type is required';
        if (!formData6.description) formErrors.description = 'Description is required';
        
        return formErrors;

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length !== 0) {
            setErrors(formErrors);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('healthcare', formData5.healthcare);
        formDataToSend.append('registernumber', formData5.registernumber);
        formDataToSend.append('email', formData5.email);
        formDataToSend.append('phone', formData5.phone);
        formDataToSend.append('country', formData5.country);
        formDataToSend.append('city', formData5.city);
        formDataToSend.append('service_type', formData6.service_type);
        formDataToSend.append('description', formData6.description);


        try {
            const res = await fetch('https://zuwara.net/admin/public/api/createhealthcarerequest', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    'Cookie': 'zwarra_session=TTg20Hoot38CaNuxW0tXux3VGTUALnvFx8h2ozRr'
                },
            });

            if (!res.ok) {
                const errorMessage = await res.json();
                throw new Error(errorMessage.error || 'Failed to submit form data');
            }

            const data = await res.json();
            console.log("Step2 data:", data)
            setResponse(data);
            navigate('/thankyou');
        } catch (error) {
            console.error('Error:', error);

        }
    };
    let navigate = useNavigate();
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
                        <p className='poppins-regular zw_16 zw_text_color my-5'>We are pleased to cooperate with us in providing and facilitating access to your services Via Zuwarh platform</p>
                    </div>

                    {/* progressbar */}
                    <div className='d-flex align-items-center justify-content-center mb-5'>
                        <div className='d-flex justify-content-center align-items-center progressbar_provider active'>
                            <img src="../../../../images/Vector.svg" alt="" />
                        </div>
                        <div className='progress_bar_line'></div>
                        <div className='d-flex justify-content-center align-items-center progressbar_provider active'>
                            <img src="../../../../images/Vector.svg" alt="" />
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



                        <label className='poppins-regular zw_20 zw_text_color mt-4 mb-4'>Select Provided Services</label>
                        <div className="d-flex">
                            <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                <input type="checkbox" id="para" name="service_type" value="homevisit" onChange={handleChange} className="form-check-input mx-4" />
                                <label htmlFor="para" className="poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Home Visit</label>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                {errors.service_type && <span className="error">{errors.service_type}</span>}
                            </div>
                            <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                <input type="checkbox" id="nurse" name="service_type" value="telemedicine" onChange={handleChange} className="form-check-input mx-4" />
                                <label htmlFor="nurse" className="poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Telemedicine</label>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                            </div>
                        </div>

                        <label className='poppins-regular zw_20 zw_text_color mt-4 mb-4'>Select Service</label>
                        <div className="d-flex">
                            <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                <input type="checkbox" id="all" name="service_type" value="all" onChange={handleChange} className="form-check-input mx-4" />
                                <label htmlFor="all" className="poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>All</label>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                            </div>
                            <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                <input type="checkbox" id="other" name="service_type" value="others" onChange={handleChange} className="form-check-input mx-4" />
                                <label htmlFor="other" className=" poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Others</label>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                            </div>
                        </div>


                        {/* </div> */}

                        <div className="form-group">
                            <label className='poppins-regular zw_20 zw_text_color mt-4'>Mention</label>
                            <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Mention the service you want to provide" name='description' value={formData6.description} onChange={(e) => setFormData6({ ...formData6, description: e.target.value })} style={{ border: "none", padding: "1em", width: "100%" }} />
                            <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                            {errors.description && <span className="error">{errors.description}</span>}
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

                    {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "95%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={() => navigate(-1)}>
                            <button className='link_btn' style={{ width: "100%" }}><img src='/images/Left.png'></img></button>Previous
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={handleSubmit}>
                            Submit<button className='link_btn btn-submit-form' style={{ width: "100%" }}><img src='/images/Right.png'></img></button>
                        </div>
                    </div> */}
                </div>
            </div >
            {response && <div className="response">{JSON.stringify(response)}</div>}
            <Footer />
        </div >

    )
}

export default Hospital_Health_Center_2