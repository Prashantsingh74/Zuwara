import React, { useState, useContext } from 'react'
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { useNavigate } from "react-router-dom";
import '../../Style/Doctor_Specialist.css';
import { Context } from '../../Context';

function Doctor_Specialist_2() {
    const { formData4, setFormData4, formData3, setFormData3 } = useContext(Context);
    const [response, setResponse] = useState(null);
    const [file, setFile] = useState('');
    const [isServiceSelected, setIsServiceSelected] = useState(false);
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'service_type') {
            if (value === 'all' && checked) {
                setFormData4(prevState => ({
                    ...prevState,
                    service_type: ['homevisit', 'telemedicine', 'others'],
                }));
                setIsServiceSelected(true);

            } else {

                if (checked) {
                    setFormData4(prevState => ({
                        ...prevState,
                        service_type: [...prevState.service_type, value]
                    }));
                    setIsServiceSelected(true);
                } else {
                    setFormData4(prevState => ({
                        ...prevState,
                        service_type: prevState.service_type.filter(item => item !== value)
                    }));
                }
            }
        } else {
            setFormData4({ ...formData4, [name]: value });
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error for the specific field
        }));
    };



    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const fileInput = e.target;
        const fileName = fileInput.files[0] ? fileInput.files[0].name : '';
        document.getElementById('fileName').textContent = fileName;
        setFormData4({ ...formData4, fileName: e.target.files[0] });
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData4.specialization) {
            newErrors.specialization = 'Specialization is required';
            valid = false;
        }

        if (!formData4.subspecialization) {
            newErrors.subspecialization = 'Sub-Specialization is required';
            valid = false;
        }

        if (!formData4.scfhs) {
            newErrors.scfhs = 'Classification Of Scfhs is required';
            valid = false;
        }

        if (!formData4.scfhsno) {
            newErrors.scfhsno = 'Scfhs File Number is required';
            valid = false;
        }

        // if (file === '') {
        //     newErrors.filenameErr = 'Upload File';
        //     valid = false;
        // }

        if (!formData4.service_type) {
            newErrors.service_type = 'Select Option ';
            valid = false;
        }

        if (!formData4.description) {
            newErrors.description = 'Mention Service is Required ';
            valid = false;
        }



        // // Add more validation rules for other fields as needed

        // console.log("newErrors=====>",newErrors);
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setFormError('Please fill in all required fields.');
            return;
        }
        // let merge = { ...formData3, ...formData4 };
        // console.log(merge)
        // setFormData3(merge)
        // console.log(formData3);
        // setFormData3({ ...formData3, ['Homevisitnparamedic']: tick, ['Telemedicinennurse']: tick2 });
        const formDataToSend = new FormData();
        formDataToSend.append('firstname', formData3.firstname);
        formDataToSend.append('lastname', formData3.lastname);
        formDataToSend.append('language', formData3.language);
        formDataToSend.append('department', formData3.department);
        formDataToSend.append('degree', formData3.degree);
        formDataToSend.append('gender', formData3.gender);
        formDataToSend.append('med_reg_expiry', formData3.med_reg_expiry);
        formDataToSend.append('med_reg_no', formData3.med_reg_no);
        formDataToSend.append('phone', formData3.phone);
        formDataToSend.append('email', formData3.email);
        formDataToSend.append('country', formData3.country);
        formDataToSend.append('city', formData3.city);
        formDataToSend.append('specialization', formData4.specialization);
        formDataToSend.append('subspecialization', formData4.subspecialization);
        formDataToSend.append('scfhs', formData4.scfhs);
        formDataToSend.append('scfhsno', formData4.scfhsno);
        if (file?.name !== undefined) {
            formDataToSend.append('filename', file);
        }
        formData4.service_type.forEach(value => {
            formDataToSend.append('service_type[]', value);
        });

        formDataToSend.append('description', formData4.description);

        try {
            const res = await fetch('https://zuwara.net/admin/public/api/createdoctorrequest', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    // 'Content-Type': 'application/json',
                    'Cookie': 'zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ'
                },
            });

            if (!res.ok) {
                const errorMessage = await res.json();
                throw new Error(errorMessage.error || 'Failed to submit form data');
            }


            const data = await res.json();
            console.log("Step2 data:", data)
            setResponse(data);
            navigate('/thankyou')
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // let navigate = useNavigate();
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
                            <div className="col-md-6">
                                <label htmlFor="Specialization" className='poppins-regular zw_20 zw_text_color mb-3'>Specialization</label>
                                <div className="form-group d-flex m-0 align-items-center">
                                    <select
                                        className="w-100 cursor poppins-regular zw_16 zw_secondary pb-0"
                                        id="Specialization"
                                        name="specialization"
                                        value={formData4.specialization}
                                        onChange={handleChange}
                                        style={{ border: "none", appearance: "none", background: "none" }}
                                    >
                                        <option value="">Select Specialization</option>
                                        <option value="Neurologist">Neurologist</option>
                                        <option value="Critical">Critical care medicine specialist</option>
                                        <option value="Pediatrician">Pediatrician</option>
                                        <option value="oncologist">Radiation oncologist</option>
                                    </select>
                                    <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>
                                </div>
                                <div className='' style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                {errors.specialization && <p className="error">{errors.specialization}</p>}
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="Sub-Specialization" className='poppins-regular zw_20 zw_text_color mb-3'>Sub-Specialization (if any)</label>
                                <div className="form-group d-flex m-0 align-items-center">
                                    <select
                                        className="w-100 cursor poppins-regular zw_16 zw_secondary pb-0"
                                        id="Sub-Specialization"
                                        name="subspecialization"
                                        value={formData4.subspecialization}
                                        onChange={handleChange}
                                        style={{ border: "none", appearance: "none", background: "none" }}
                                    >
                                        <option value="">Select Sub-Specialization</option>
                                        <option value="Pediatric General Practice">Pediatric General Practice</option>
                                        <option value="Pediatric Psychiatry">Pediatric Psychiatry</option>
                                        <option value="Psychotherapy session">Psychotherapy session</option>
                                        <option value="Forensic Psychiatry">Forensic Psychiatry</option>
                                    </select>
                                    <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>
                                </div>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                {errors.subspecialization && <p className="error">{errors.subspecialization}</p>}
                            </div>
                        </div>

                        <div className="row">

                            {/* <div className="form-group"> */}

                            <div className="col-md-6">
                                <label htmlFor="Classification Of Scfhs" className='poppins-regular zw_20 zw_text_color mt-4 mb-3'>Classification Of Scfhs</label>
                                <div className="form-group d-flex m-0 align-items-center">
                                    <select
                                        className="w-100 cursor poppins-regular zw_16 zw_secondary pb-0"
                                        id="Classification Of Scfhs"
                                        name="scfhs"
                                        value={formData4.scfhs}
                                        onChange={handleChange}
                                        style={{ border: "none", appearance: "none", background: "none" }}
                                    >
                                        <option value="">Select Classification Of Scfhs</option>
                                        <option value="Senor Registrar">Senor Registrar</option>
                                        <option value="Registrar">Registrar</option>
                                        <option value="Resident">Resident</option>
                                        <option value="General Practitioner">General Practitioner</option>
                                    </select>
                                    <i className="icon-down-arrow form-icon-cc dropdown-icons"></i>
                                </div>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>

                                {errors.scfhs && <p className="error">{errors.scfhs}</p>}

                            </div>
                            {/* </div> */}
                            <div className="col-md-6">
                                <label htmlFor="Country" className='poppins-regular zw_20 zw_text_color mt-4 mb-3'>Scfhs File Number</label>
                                <div className="form-group d-flex m-0 align-items-center">

                                    <input type='text' className="w-100 cursor poppins-regular zw_16 zw_secondary pb-0" placeholder="Scfhs file number " id="scfhsno" name="scfhsno" value={formData4.scfhsno} onChange={handleChange} style={{ border: "none" }} />
                                    {/* <i className="icon-down-arrow form-icon-cc dropdown-icons"></i> */}
                                </div>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                {errors.scfhsno && <p className="error">{errors.scfhsno}</p>}
                            </div>
                        </div>

                        <div className='d-flex align-items-end '>
                            <div className='upload-file-cont mt-5' onClick={triggerFileInput} >
                                <img className='mx-auto' src="../../../../images/upload-icon.png" alt="" />
                                <input type="file" id="fileInput" name="file" onChange={handleFileChange} value={formData4.filename} style={{ display: 'none' }} />
                                <p className='poppins-regular zw_14 zw_secondary mt-3'>Upload</p>
                            </div>
                            <p id="fileName" className='poppins-regular zw_14 zw_title_color mt-3 ms-2'></p>
                        
                            {errors?.filenameErr && <p className="error">{errors.filenameErr}</p>}
                        </div>




                        <label className='poppins-regular zw_20 zw_text_color mt-4 mb-2'>Select Provided Services</label>
                        <div className="d-flex">
                            <div className="form-check form-check-inline mt-4" style={{ width: "100%" }}>
                                <input type="checkbox" id="para" name="service_type" value="homevisit" checked={formData4.service_type.includes('homevisit')} onChange={handleChange} className="form-check-input mx-4" />
                                <label htmlFor="para" className="poppins-regular zw_16 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Home Visit</label>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                            </div>
                            <div className="form-check form-check-inline mt-4" style={{ width: "100%" }}>
                                <input type="checkbox" id="nurse" name="service_type" value="telemedicine" checked={formData4.service_type.includes('telemedicine')} onChange={handleChange} className="form-check-input mx-4" />
                                <label htmlFor="nurse" className="poppins-regular zw_16 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Telemedicine</label>
                                <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>

                            </div>
                            {errors.nurse && <p className="error">{errors.service_type}</p>}


                        </div>


                        {isServiceSelected && (

                            <div>
                                <label className='poppins-regular zw_20 zw_text_color mt-4 mb-4'>Select Service</label>
                                <div className="d-flex">
                                    <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                        <input type="checkbox" id="all" name="service_type" value="all" onChange={handleChange} className="form-check-input mx-4" />
                                        <label htmlFor="all" className="poppins-regular zw_16 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>All</label>
                                        <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    </div>
                                    <div className="form-check form-check-inline" style={{ width: "100%" }}>
                                        <input type="checkbox" id="others" name="service_type" value="others" onChange={handleChange} className="form-check-input mx-4" />
                                        <label htmlFor="others" className=" poppins-regular zw_16 zw_secondary d-flex align-items-center" style={{ border: "none", backgroundColor: 'transparent' }}>Others</label>
                                        <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                                    </div>

                                </div>

                            </div>
                        )}

                        {/* </div> */}

                        <div className="form-group">
                            {/* <label htmlFor="Email" className='poppins-regular zw_20 zw_text_color'>Select Provider Services</label> */}
                            <label className='poppins-regular zw_20 zw_text_color mt-4'>Mention</label>

                            <input type="text" className='poppins-regular zw_16 zw_secondary pb-0' placeholder="Mention the service you want to provide" name='description' value={formData4.description} onChange={handleChange} style={{ border: "none", padding: "1em", width: "100%" }} />
                            <div style={{ borderRadius: "6px", borderBottom: "2px solid #AF2245", height: "11px" }}></div>
                            {errors.description && <p className="error">{errors.description}</p>}

                        </div>
                        <div className='d-flex justify-content-between my-5'>
                            <div className='d-flex align-items-center mt-5' onClick={() => navigate(-1)}>
                                <div className='btn_bg_color_provider'>
                                    <img className='btn_pro_provider' src="../../../../images/previous.png" alt="btn" />
                                </div>
                                <p className='poppins-regular zw_16 zw_title_color mb-0 ms-4'>Previous</p>
                            </div>
                            <div className='d-flex align-items-center mt-5' onClick={handleSubmit}>
                                <p className='poppins-regular zw_16 zw_title_color mb-0 me-4'>Next</p>
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
                    {response && (
                        <div className="mt-4">
                            <h5 className="poppins-semibold zw_16 zw_secondary">API Response:</h5>
                            <pre>{JSON.stringify(response, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div >
            <Footer />
        </div >
    )
}

export default Doctor_Specialist_2