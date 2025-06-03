import React, { useState, useContext } from 'react'
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { useNavigate } from "react-router-dom";
import { Context } from '../../Context';

function Insurance_2() {
    const { formData2, setFormData2, formData, setFormData } = useContext(Context);
    const [response, setResponse] = useState(null);
    const [tick, setTick] = useState('');
    const [tick2, setTick2] = useState('');
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData2({ ...formData2, [name]: value });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error for the specific field
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData2.Country) newErrors.Country = 'Country is required';
        if (!formData2.City) newErrors.City = 'City is required';
        if (!formData2.Description) newErrors.Description = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        // let merge = { ...formData, ...formData2,['Homevisitnparamedic']: tick, ['Telemedicinennurse']: tick2 };
        // setFormData(merge)
        // console.log("MergedformData:",merge)

        const formDataToSend = new FormData();
        formDataToSend.append('Type', 'Insurance');
        formDataToSend.append('Firstname', formData.Firstname);
        formDataToSend.append('Email', formData.Email);
        formDataToSend.append('Phone', formData.Phone);
        formDataToSend.append('Country', formData2.Country);
        formDataToSend.append('City', formData2.City);
        formDataToSend.append('Homevisitnparamedic', formData2.Homevisitnparamedic);
        formDataToSend.append('Telemedicinennurse', formData2.Telemedicinennurse);
        formDataToSend.append('Allnlabtech', formData2.Allnlabtech);
        formDataToSend.append('Othersnphysio', formData2.Othersnphysio);
        formDataToSend.append('Description', formData2.Description);



        try {
            const res = await fetch('https://zuwara.net/admin/public/api/creategeneralrequest', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Cookie': 'zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ',
                },
                // body: JSON.stringify(formDataToSend),
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
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="Country" className='poppins-regular zw_20 zw_text_color mb-4'>Select Country</label>
                                <div className="form-group d-flex m-0 align-items-center">

                                    <input type='text' className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0" placeholder="Select Country" id="Country" name="Country" value={formData2.Country} onChange={handleChange} style={{ border: "none" }} />
                                    <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>
                                </div>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                {errors.Country && <p className="error">{errors.Country}</p>}
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="City" className='poppins-regular zw_20 zw_text_color mt-4 mb-4'>Select City</label>
                                <div className="form-group d-flex m-0 align-items-center">

                                    <input type='text' className="w-100 cursor poppins-regular zw_18 zw_secondary pb-0" placeholder="Select City" id="City" name="City" value={formData2.City} onChange={handleChange} style={{ border: "none" }} />
                                    <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>

                                </div>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                {errors.City && <p className="error">{errors.City}</p>}
                            </div>
                        </div>

                        <div className="row">

                            <div className="form-group">
                                <label className='poppins-regular zw_20 zw_text_color mt-4 mb-4'>Select Provided Service</label>
                                <div className="d-flex">
                                    <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                        <input type="radio" id="para" name="Homevisitnparamedic" value="1" onChange={handleChange} className="form-check-input mx-4" />
                                        <label htmlFor="para" className="poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Paramedic</label>
                                        <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    </div>
                                    <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                        <input type="radio" id="nurse" name="Telemedicinennurse" value="1" onChange={handleChange} className="form-check-input mx-4" />
                                        <label htmlFor="nurse" className=" poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Nurse</label>
                                        <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    </div>
                                </div>
                                <label className='poppins-regular zw_20 zw_text_color mt-4 mb-4'>All Services</label>
                                <div className="d-flex">
                                    <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                        <input type="radio" id="all" name="Allnlabtech" value="1" onChange={handleChange} className="form-check-input mx-4" />
                                        <label htmlFor="all" className="poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>All</label>
                                        <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    </div>
                                    <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                        <input type="radio" id="other" name="Othersnphysio" value="1" onChange={handleChange} className="form-check-input mx-4" />
                                        <label htmlFor="other" className=" poppins-regular zw_18 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Other</label>
                                        <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Email" className='poppins-regular zw_20 zw_text_color'>Select Provider Services</label>
                            <label htmlFor="Email" className='poppins-regular zw_20 zw_text_color'>Mention</label>

                            <input type="text" className='poppins-regular zw_18 zw_secondary pb-0' placeholder="Mention the service you want to provide" name='Description' value={formData2.Description} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                            <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                            {errors.Description && <p className="error">{errors.Description}</p>}

                        </div>

                        {/* <div className='d-flex justify-content-between my-5'>
                            <div className='d-flex align-items-center mt-5'>
                                <div className='btn_bg_color_provider'>
                                    <img className='btn_pro_provider' src="../../../../images/previous.png" alt="btn" />
                                </div>
                                <p className='poppins-regular zw_18 zw_title_color mb-0 ms-4'>Previous</p>
                            </div>
                            <div className='d-flex align-items-center mt-5'>
                                <p className='poppins-regular zw_18 zw_title_color mb-0 me-4'>Next</p>
                                <div className='btn_bg_color_provider'>
                                    <img className='btn_pro_provider' src="../../../../images/next.png" alt="btn" />
                                </div>
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


                    {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "95%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={() => navigate(-1)}>
                            <button className='link_btn' style={{ width: "100%" }}><img src='/images/Left.png'></img></button>Previous
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "20%" }} onClick={handleSubmit}>
                            Submit<button className='link_btn btn-submit-form' style={{ width: "100%" }}><img src='/images/Right.png'></img></button>
                        </div>
                    </div>  */}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Insurance_2