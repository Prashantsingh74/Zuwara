import React, { useState, useContext, useEffect } from 'react';
import '../../../Style/add-details.css';
import Footer from '../../Layout/Footer';
import Navbar from '../../Layout/Navbar';
import { Link } from 'react-router-dom';
import Addpatient from './Addpatient';
import vertLine from './../../../assets/img/Line 1.png';
import searchIcon from './../../../assets/img/vector-vFW.png';
import attachIcon from './../../../assets/img/group-vrG.png';
import attachFile from './../../../assets/img/file-icon2.svg';
import { Context } from "../../../Context";
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/zawara_select_logo.jpg';

function Adddetails() {
    const navigate = useNavigate();
    const { PatientName,signupFormData, isAuthenticated,userDetails} = useContext(Context);
    const initialItems = ['Zwaara Care'];

    const [items, setItems] = useState(initialItems);
    const [searchTerm, setSearchTerm] = useState('');
    const [counter, setCounter] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('');
    const [files, setFiles] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState([]);
    const [error, setError] = useState('');
    const { appointmentData, updateAppointmentData } = useContext(Context);
    const [appointmentId, setAppointmentId] = useState(null);


    const [defaultHealthcare] = useState(appointmentData.HealthcareName);
    const [defaultService] = useState(appointmentData.Servicename);

    const [filteredResults, setFilteredResults] = useState([{
        Healthcare: appointmentData.HealthcareName,
        Servicename: appointmentData.Servicename
    }]);
    

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        if (term.trim() === '') {
            // Show default content when search term is empty
            setFilteredResults([{
                Healthcare: appointmentData.HealthcareName,
                Servicename: appointmentData.Servicename
            }]);
        } else {
            // Filter results based on the search term
            const healthcareName = appointmentData.HealthcareName.toLowerCase();
            const serviceName = appointmentData.Servicename.toLowerCase();

            if (healthcareName.includes(term) || serviceName.includes(term)) {
                setFilteredResults([{
                    Healthcare: appointmentData.HealthcareName,
                    Servicename: appointmentData.Servicename
                }]);
            } else {
                setFilteredResults([]);
            }
        }
    };

    useEffect(() => {

        setFilteredResults([{
            Healthcare: appointmentData.HealthcareName,
            Servicename: appointmentData.Servicename
        }]);
    }, [appointmentData]);




    const decrement = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    };

    const increment = () => {
        setCounter(counter + 1);
    };

    const handleClick = () => {
        setIsEditing(true);
        setText('');
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleBlur = () => {
        if (text.trim() === '') {
            setIsEditing(false);
        }
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const handlePatientSelection = (patient) => {
        setSelectedPatients(prevSelectedPatients =>
            prevSelectedPatients.includes(patient)
                ? prevSelectedPatients.filter(p => p !== patient)
                : [...prevSelectedPatients, patient]
        );
    };

    const isPatientSelected = (patient) => selectedPatients.includes(patient);

    const handleSubmit = async () => {
        if (counter !== selectedPatients.length) {
            setError('The number of patients selected is not equal to the selected test.');
            return;
        }

        setError('');
        const newPrice = appointmentData.Price * counter;
        const newQuantity = appointmentData.Qty * counter;

        updateAppointmentData({
            Patients: JSON.stringify(selectedPatients),
            Price: newPrice,
            Qty: newQuantity,
            Description: text
        });

        const formData = new FormData();
        formData.append('Servicename', appointmentData.Servicename);
        let subservices = appointmentData.Subservices;
            if (typeof subservices === 'string') {
                try {
                    subservices = JSON.parse(subservices);
                } catch (e) {
                    console.error('Failed to parse Subservices:', e);
                }
            }
        formData.append('Subservices', JSON.stringify(subservices));
        formData.append('Address', appointmentData.Address);
        formData.append('Qty', appointmentData.Qty.toString());
        formData.append('Date', appointmentData.Date);
        formData.append('Typeoftest', appointmentData.Typeoftest);
        formData.append('Typeofvisit', appointmentData.Typeofvisit);
        formData.append('Timeslot', appointmentData.Timeslot);
        formData.append('Healthcare', appointmentData.Healthcare);
        formData.append('Price', newPrice.toString());
        formData.append('Patients', JSON.stringify(selectedPatients));
        formData.append('Description', text);
        formData.append('Gender', appointmentData.Gender);

        try {
            const response = await fetch('https://zuwara.net/admin/public/api/createappointment', {
                method: 'POST',
                body: formData,
                headers: {
                    'Cookie': 'zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }

            const result = await response.json();
            console.log('Appointment created successfully:', result);

            // Access the appointment id
            const appointmentId = result.Appointmentdetails?.id;

            if (appointmentId) {
                setAppointmentId(appointmentId);

                if (files.length > 0) {
                    const fileUploadFormData = new FormData();
                    files.forEach(file => {
                        fileUploadFormData.append('file[]', file);
                    });

                    const uploadResponse = await fetch(`https://zuwara.net/admin/public/api/appointment/${appointmentId}/attachments`, {
                        method: 'POST',
                        body: fileUploadFormData,
                        headers: {
                            'Cookie': 'zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ'
                        }
                    });

                    if (!uploadResponse.ok) {
                        throw new Error('Failed to upload files');
                    }

                    const uploadResult = await uploadResponse.json();
                    console.log('Files uploaded successfully:', uploadResult);
                    navigate('/Payment');
                } else {
                    navigate('/Payment');
                }
            } else {
                throw new Error('Appointment ID not found in the response');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };
     // Parse and extract Subservices
     let subservicesText1 = '';
     try {
         const subservices = JSON.parse(appointmentData.Subservices || '[]');
         subservicesText1 = subservices.map(service => service.name).join(', ');
     } catch (error) {
         console.error('Error parsing JSON:', error);
     }

    // // Parse and format Subservices
    // let subservices = [];
    // try {
    //     subservices = JSON.parse(appointmentData.Subservices || '[]');
    // } catch (error) {
    //     console.error('Error parsing JSON:', error);
    // }
    // const subservicesText = subservices.join(', ');

    return (
        <div>
            <Navbar />
            <div className="add-details-72t" style={{ marginTop: "90px" }}>
                <div className="auto-group-dwhz-hqe">
                    <div className="group-1261154093-2d2">
                        <div className="group-1261154076-tEg" onClick={() => navigate(-1)}>
                            <div className="group-1261154076-wEC">
                                <img className="group-1261154072-Ujv" src="/images/group-1261154072-3nL.png" alt='group' />
                                <p className="poppins-medium zw_18 zw_black">Back</p>
                            </div>
                        </div>
                        <div className='line_indicator_container'>
                            <div className="each_line_indicator active"></div>
                            <div className="each_line_indicator active"></div>
                            <div className="each_line_indicator active"></div>
                            <div className="each_line_indicator"></div>
                        </div>
                    </div>

                    <div className="frame-37120-wfS">
                        <input type="text" className="poppins-regular zw_999999 zw_14 w-100" placeholder="Search your lab tests & Packages" value={searchTerm} onChange={handleSearch} />
                        <img src={vertLine} className='line-1CbN' alt='vertLine'></img>
                        <img src={searchIcon} className='vector-Lha' alt='searchIcon'></img>
                    </div>
                </div>
                <div className="auto-group-fd7r-3bz pe-0">
                    <div className='add-details-sidebar'>
                        <div className='group-1261154677-WEg'>
                            <div className="group-1261154676-dKJ">
                                <img src={logo} className='group-1261154676-dKJ' alt='logo' style={{ height: '10rem', width: '10rem', objectFit: 'cover' }} />
                                {/* <div className="group-1261154672-vJQ alignment">
                                    {filteredResults.length > 0 ? (
                                        <>
                                            <h3 className="poppins-medium zw_18 zw_black">{filteredResults[0].Healthcare}</h3>
                                            <p className="poppins-medium zw_14 zw_black">{filteredResults[0].Servicename}</p>
                                        </>
                                    ) : (
                                        <p className="poppins-medium zw_14 zw_black">No results found</p>
                                    )}
                                </div> */}
                                <div className="group-1261154672-vJQ alignment">
                                    {filteredResults.length > 0 ? (
                                        <>
                                            <h3 className="poppins-medium zw_18 zw_black " style={{ marginBottom: "10px", color: "#af2245" }}>{filteredResults[0].Healthcare}</h3>
                                            <p className="poppins-medium zw_14 zw_black">{filteredResults[0].Servicename}</p>
                                        </>
                                    ) : (
                                        <p className="poppins-medium zw_14 zw_black">No results found</p>
                                    )}
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="auto-group-k7dv-4Z2">
                        <div className="auto-group-vgpe-omW d-flex justify-content-between">
                            <div className="text-capitalize poppins-semibold zw_text_color zw_34">
                                <p>add details</p>
                                <div className="poppins-semibold zw_16 zw_title_color">Select Patient</div>
                            </div>
                            <button className='btn-add-patient zw_light_bg zw_title_color mt-4' data-bs-toggle="modal" data-bs-target="#LogInPopUpModal41">
                                <div className="add-patient-btn poppins-regular zw_14">
                                    Add Patient
                                </div>
                            </button>
                        </div>
                        <Addpatient />
                        <div className="auto-group-ck56-pRi mb-5">
                            <div className='health-package gap-5'>
                                <p className="poppins-semibold zw_16 zw_title_color">{subservicesText1}</p>
                                <p className="d-flex justify-content-center align-items-end poppins-semibold zw_16 zw_title_color text-center" style={{ width: '12rem' }}>SAR {appointmentData.Price * counter}</p>
                            </div>
                            <div className='add-test pb-0'>
                                <p className="poppins-regular zw_16 zw_text_color pe-2">Choose one or more patients for this test</p>

                                <div className="group-1171275053-xVJ top-0">
                                    <div className="group-1171275049-esv zw_18 zw_text_color" onClick={decrement} style={{ cursor: "pointer" }}>–</div>
                                    <p className="item-1-WfE mt-0">{counter}</p>
                                    <div className="group-371-Er8">
                                        <div className="ellipse-57-BmN">
                                            <p className="item--6tL m-0" onClick={increment} style={{ cursor: "pointer" }}>+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4' style={{ rowGap: '1rem' }} >
                                    {userDetails.map((item, index) => (
                                     <div className="col"  key={index}>
                                        <div
                                            className={`patient-name poppins-regular zw_16 zw_text_color text-center ${isPatientSelected(item) ? 'selected' : ''}`}
                                            onClick={() => handlePatientSelection(item)}
                                            style={{ backgroundColor: isPatientSelected(item) ? '#af2245' : '#F7E8EC', color: isPatientSelected(item) ? '#ffffff' : '#000000' }}
                                        >
                                            {/* {`${username}`} */}
                                            {item.username}
                                            {isPatientSelected(item) && <span className="checkbox">✔</span>}
                                        </div>
                                    </div> 
                                    ))}
                                    {PatientName.map((pitem, index) => (
                                        <div className="col"  key={index}>
                                            <div
                                                className={`patient-name poppins-regular zw_16 zw_text_color text-center ${isPatientSelected(pitem) ? 'selected' : ''}`}
                                                onClick={() => handlePatientSelection(pitem)}
                                                style={{ backgroundColor: isPatientSelected(pitem) ? '#af2245' : '#F7E8EC', color: isPatientSelected(pitem) ? '#ffffff' : '#000000' }}
                                            >
                                                {pitem.Firstname} {pitem.Lastname}
                                                {isPatientSelected(pitem) && <span className="checkbox">✔</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {error && <p className="mt-4 poppins-regular zw_14" style={{ color: 'red' }}>{error}</p>}
                        </div>
                        <div className="auto-group-dsgg-mzU">
                            <p className="poppins-medium zw_16 zw_title_color">{subservicesText1}</p>
                            <p className="poppins-regular zw_16 zw_text_color">
                                If you have a medical condition, Allergies or are taking any medication please mention it
                            </p>
                            <div className='text-note'>
                                <p className="poppins-medium zw_16 zw_title_color">Text note (Optional)</p>
                                <div className='text-add-icon'>
                                    <img src={attachIcon} className='group-k7e' alt='attachIcon'></img>
                                    <p className="poppins-medium zw_16 zw_888B9E m-0">ADD</p>
                                </div>
                            </div>
                            <div className="group-1261154938-D1E poppins-regular zw_12 zw_888B9E">
                                <textarea
                                    className='poppins-regular px-2 zw_14'
                                    value={text}
                                    onChange={handleTextChange}
                                    onBlur={handleBlur}
                                    style={{ border: "none", width: "100%", height: "100%", backgroundColor: "#F6F7F9", resize: "none", outline: 'none' }}
                                    placeholder='Add your text notes here...'
                                />
                            </div>
                            <div className="group-1261154926-t7N">
                                <p className="text-capitalize poppins-medium zw_title_color zw_16">Attach document</p>
                                <label className='label-file cursor-pointer' htmlFor="fileInput">
                                    <img src={attachFile} className='group-1261154923-tWg' alt='file'></img>
                                    <p className="poppins-medium zw_16 zw_888B9E m-0">File</p>
                                </label>
                            </div>
                            <input type="file" id="fileInput" accept=".pdf, .doc, .docx" onChange={handleFileChange} style={{ display: 'none' }} multiple />
                            {files.length > 0 && (
                                <div className='text-end'>
                                    {files.map((file, index) => (
                                        <p key={index} className='poppins-regular zw_14 zw_title_color'>{file.name}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="poppins-regular zw_16 zw_text_color">
                            <span>By clicking continue you agree to our </span>
                            <span className="terms_condition poppins-regular zw_16 zw_title_color"> Terms & Conditions</span>
                        </p>
                        <button className='frame-37121-wmn me-0 mt-5 border-0' onClick={handleSubmit} style={{ textDecoration: 'none' }}>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Adddetails;