import { Button, Modal } from "react-bootstrap";
import React, { useRef, useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link, useNavigate } from "react-router-dom";
import "../../../Style/Ourfeaturetestspopup.css";
import "../../../Style/Addrecord.css";
import "../../../Style/Addpatient.css";
import ReactFlagsSelect from "react-flags-select";
import { Context } from "../../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const Addrecord = () => {
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const addPatientModalRef = useRef(null);
  const modalInstanceRef = useRef(null);
  const addPatientModalInstanceRef = useRef(null);
  const { userId, setUserId, patientName } = useContext(Context);
  const [patientData, setPatientData] = useState([]);
  const [selected, setSelected] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]); // New state for uploaded files

  const [errors, setErrors] = useState({}); // For form validation errors

  useEffect(() => {
    if (modalRef.current) {
      modalInstanceRef.current = new window.bootstrap.Modal(modalRef.current);
    }

    if (addPatientModalRef.current) {
      addPatientModalInstanceRef.current = new window.bootstrap.Modal(
        addPatientModalRef.current
      );
    }

    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      const response = await fetch(
        `https://zuwara.net/admin/public/api/getpatients`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: "zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ",
          },
        }
      );

      if (response.status === 301 || response.status === 302) {
        // Follow redirection
        const redirectUrl = response.headers.get("Location");
        response = await fetch(redirectUrl, {
          headers: {
            Cookie: "zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ",
          },
        });
      }

      if (!response.ok) {
        throw new Error("Failed to fetch patient data");
      }

      const data = await response.json();
      // setPatientData(data); // Update patient data state with fetched data

      // Update state with array if data contains it
      if (Array.isArray(data.patient_record)) {
        setPatientData(data.patient_record);
      } else {
        setPatientData([]); // Handle the case where it's not an array
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  // useEffect(() => {
  //   if (userId) {
  //     fetchPatientData(userId);
  //   }
  // }, [userId]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileObjects = files.map((file) => ({
      file,
      url: URL.createObjectURL(file), // Generate a URL for the file
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...fileObjects]);
  };
  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleAddPatientClick = () => {
    if (modalInstanceRef.current) {
      modalInstanceRef.current.hide();
    }
    if (addPatientModalInstanceRef.current) {
      addPatientModalInstanceRef.current.show();
    }
  };

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.get("Firstname"))
      newErrors.Firstname = "First name is required";
    if (!formData.get("Lastname")) newErrors.Lastname = "Last name is required";
    if (!selected) newErrors.Country = "Country is required";
    if (!formData.get("Nationalid"))
      newErrors.Nationalid = "National ID is required";
    if (!formData.get("Gender")) newErrors.Gender = "Gender is required";
    if (!formData.get("Dob")) newErrors.Dob = "Date of Birth is required";
    if (!formData.get("Bloodgroup"))
      newErrors.Bloodgroup = "Blood group is required";
    if (!formData.get("Phone")) newErrors.Phone = "Phone number is required";
    if (!formData.get("Relationship"))
      newErrors.Relationship = "Relationship is required";
    if (!formData.get("InsuranceCompany"))
      newErrors.InsuranceCompany = "InsuranceCompany is required";
    if (!formData.get("InsuranceAccNo"))
      newErrors.InsuranceAccNo = "InsuranceAccNo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Clear specific error based on input change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error for the changed field
    }));
  };

  const handleCountrySelect = (code) => {
    setSelected(code);

    // Clear the country error when a country is selected
    setErrors((prevErrors) => ({
      ...prevErrors,
      Country: "",
    }));
  };

  const handleSubmitPatient = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Clear all errors before validating
    setErrors({});
    if (!validateForm(formData)) return; // Stop submission if form is invalid
    try {
      const response = await fetch(
        "https://zuwara.net/admin/public/api/registerpatient",
        {
          method: "POST",
          headers: {
            Cookie: "zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ", // Adjust headers as per your API requirements
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      // setUserId(data.id);
      setPatientData([...patientData, data.patient_registration]); // Add the new patient to the list
      localStorage.setItem(
        "patientDetails",
        JSON.stringify(data.patient_registration)
      );
      if (addPatientModalInstanceRef.current) {
        addPatientModalInstanceRef.current.hide();
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setShowSecondModal(false);
  };
  const handleSecondModalClose = () => setShowSecondModal(false);
  const handleFirstModalClose = () => setShowFirstModal(false);
  const handleFirstModalShow = () => setShowFirstModal(true);
  const handleSecondModalShow = () => setShowSecondModal(true);

  const [selectedPatientIds, setSelectedPatientIds] = useState([]);

  const handleSelect = (id) => {
    if (selectedPatientIds.includes(id)) {
      // If the card is already selected, remove it from the array (deselect)
      setSelectedPatientIds(
        selectedPatientIds.filter((selectedId) => selectedId !== id)
      );
    } else {
      // Otherwise, add the card's id to the array (select)
      setSelectedPatientIds([...selectedPatientIds, id]);
    }
  };

  return (
    <div className="App">
      <div
        className="group-1261154834-4fN"
        variant="primary"
        onClick={handleFirstModalShow}
        style={{ cursor: "pointer" }}
      >
        <div className="frame-1261154256-z3E">
          <img
            className="component-2-LMz"
            src="/images/component-2.png"
            alt="component-2"
          />

          <div className="poppins-regular zw_16 zw_text_fff">Add Patient</div>
        </div>
      </div>

      <Modal
        id="addpati"
        className="addpatie "
        show={showFirstModal}
        onHide={handleFirstModalClose}
      >
        <Modal.Header closeButton className="border-0">
          <div className=" pt-4 zw_text_color poppins-semibold zw_16 px-5">
            Add Record
          </div>
        </Modal.Header>
        <Modal.Body className="pb-5" style={{padding:'15px 40px'}}>
          {/* <p>This is the first popup.</p> */}
          <div className="container p-4" style={{ border: "2px solid #999999" , borderRadius:'6px' }}>
            <div className="row align-items-center">
              <p className="poppins-semibold zw_18">Select patient</p>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row row-cols-lg-2 row-cols-md-2 row-cols-sm-3">
                  {/* Display existing patients */}
                  {/* {Array.isArray(patientData) && patientData.length > 0 ? ( */}
                  {patientData.map((patient, index) => (
                    <div key={patient.id} className="d-flex">
                      <div
                        className="card my-2 border-0 text-center d-flex align-items-center justify-content-center"
                        style={{
                          width: "16rem",
                          height:'10rem',

                          backgroundColor: selectedPatientIds.includes(
                            patient.id
                          )
                            ? "#622d89"
                            : "#AF22451A",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelect(patient.id)}
                      >
                        <div>
                          <h3
                            className="zw_text_color poppins-regular zw_16"
                            style={{
                              color: selectedPatientIds.includes(patient.id)
                                ? "#fff"
                                : "#000",
                            }}
                          >
                            {patient.Firstname}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* ) : (
                            <p>No patient records found.</p>
                          )} */}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 d-flex justify-content-end">
                <div
                  className="group-1261154931-mvt"
                  variant="secondary"
                  onClick={handleSecondModalShow}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="group-1261154930-5gg"
                    src="/images/group-1261154930.png"
                    alt="group-1261154930"
                  />

                  <div className="add-patient-DH6 bg-transparent border-0">
                    Add patient
                  </div>
                </div>
              </div>
              
            </div>

            <div class="row">
            <p className="select-type-report-W1J poppins-semibold mt-4">
                Select type report
              </p>
              <div class="col-lg-4 col-md-6">
                <div class="card type-rep-card text-center p-3 mb-3 shadow-none">
                  <div class="card-body">
                    <img
                      className="type-report-img"
                      src="/images/i-radiology-svgrepo-com-2.png"
                      alt="i-radiology-svgrepo-com-2"
                    />
                    <h5 class="card-title type-report-title">Radiology</h5>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="card text-center p-3 mb-3 shadow-none">
                  <div class="card-body">
                    <img
                      className="type-report-img"
                      src="/images/group-1261154900.png"
                      alt="group-1261154900"
                    />
                    <h5 class="card-title type-report-title">Lab Research</h5>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="card text-center p-3 mb-3 shadow-none">
                  <div class="card-body">
                    <img
                      src="/images/group-1261154902.png"
                      alt="Prescription"
                      class="type-report-img mb-2"
                    />
                    <h5 class="card-title type-report-title">Prescription</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <p className="file-name-fRE poppins-medium zw_16 mt-5">
                Radiology Type
              </p>
              <div className="group-1261154830-K6U col-12 my-4">
                <select
                  className="auto-group-prhw-onL poppins-medium zw_16 zw_9B9B9B"
                  style={{
                    padding: "2.3rem",
                    outline: "none",
                    appearance: "none",
                  }}
                >
                  <option value="type1">Type One</option>
                  <option value="type2">Type Two</option>
                  <option value="type3">Type Three</option>
                  <option value="type4">Type Four</option>
                </select>

                {/* Add the custom icon */}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="custom-dropdown-icon"
                />
              </div>
            </div>

            <div className="row">
              <p className="file-name-fRE poppins-medium zw_16">File name</p>
              <div className="group-1261154830-K6U my-4 col-12">
                <div className="auto-group-prhw-onLl">
                  <input
                    className="poppins-medium zw_16 zw_9B9B9B py-4 px-3 w-100 "
                    type="text"
                    placeholder="File Name"
                    style={{border:'1px solid #8e8e90', borderRadius:'0.6rem'}}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <p className="poppins-medium zw_16">Attachments</p>
              <div className="auto-group-ojic-E6x">
                <div className="row align-items-end">
                  <div className="col-lg-3 col-md-3 col-sm-3">
                    <div className="group-1261154826-Jcc me-3">
                      <div className="group-1261154825-EFN">
                        <label
                          style={{ cursor: "pointer" }}
                          htmlFor="file-uploads"
                          className="group-1261154824-yye"
                        >
                          <img
                            src="/images/group-1261154824.png"
                            alt="group-1261154824"
                            style={{ width: "55px", marginTop: "10px" }}
                          />
                          <p className="upload-Knc py-3">Upload</p>
                        </label>
                        <input
                          id="file-uploads"
                          type="file"
                          multiple // Allow multiple files
                          style={{ display: "none" }}
                          onChange={handleFileUpload}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-9 col-sm-9">
                    <div className="uploaded-files-container d-flex flex-wrap gap-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="file-thumbnail position-relative"
                        >
                          {file.file.type.includes("image") ? (
                            <img
                              src={file.url}
                              alt="Thumbnail"
                              style={{ width: "50px", height: "50px" }}
                            />
                          ) : (
                            <img
                              src="/images/PDFIcon.svg" // Replace with PDF icon URL
                              alt="PDF Icon"
                              style={{ width: "50px", height: "50px" }}
                            />
                          )}
                          <button
                            className="btn-close-red position-absolute top-0 end-0 border-0 rounded"
                            style={{ backgroundColor: "#ffffff" }}
                            onClick={() => handleRemoveFile(index)}
                            aria-label="Close"
                          >
                            ❌
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="group-1261154827-pzG my-5" style={{cursor:'pointer'}}>
                <div
                  className="group-1261154832-ayS py-4"
                  onHide={handleFirstModalClose}
                >
                  Save
                </div>
              </div>
            </div>
          </div>

          <Modal
            className="addpattientsecond mt-5"
            show={showSecondModal}
            onHide={handleSecondModalClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Patients</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <p>This is the second popup.</p> */}
              <form onSubmit={handleSubmitPatient} className="p-3">
                <div className="row mb-3 ">
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="Firstname"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                      id="firstName"
                      name="Firstname"
                      placeholder="Enter first name"
                      onChange={handleInputChange}
                    />
                    {errors.Firstname && (
                      <div className="text-danger">{errors.Firstname}</div>
                    )}
                  </div>
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="Lastname"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                      id="lastName"
                      name="Lastname"
                      placeholder="Enter last name"
                      onChange={handleInputChange}
                    />
                    {errors.Lastname && (
                      <div className="text-danger">{errors.Lastname}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="Country"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      Country
                    </label>

                    <ReactFlagsSelect
                      onChange={handleInputChange}
                      selected={selected}
                      onSelect={handleCountrySelect}
                      placeholder="Select Country"
                      searchable
                      searchPlaceholder="Search countries"
                      className="menu-flags"
                    />
                    {errors.Country && (
                      <div className="text-danger">{errors.Country}</div>
                    )}
                  </div>
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="Nationalid"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      National ID
                    </label>
                    <input
                      type="text"
                      className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                      id="nationalId"
                      name="Nationalid"
                      placeholder="Enter national ID"
                      onChange={handleInputChange}
                    />
                    {errors.Nationalid && (
                      <div className="text-danger">{errors.Nationalid}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="Gender"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      Gender
                    </label>

                    <i className="icon-down-arrow form-icon zw_icon_drop mt-5"></i>
                    <select
                      onChange={handleInputChange}
                      id="gender"
                      name="Gender"
                      className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.Gender && (
                      <div className="text-danger">{errors.Gender}</div>
                    )}
                  </div>
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="Dob"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                      id="dob"
                      name="Dob"
                      placeholder="Enter date of birth"
                      onChange={handleInputChange}
                    />
                    {errors.Dob && (
                      <div className="text-danger">{errors.Dob}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="BloodGroup"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      Blood Group
                    </label>

                    <div>
                      <i className="icon-down-arrow form-icon zw_icon_drop mt-5"></i>
                      <select
                        onChange={handleInputChange}
                        id="bloodGroup"
                        name="Bloodgroup"
                        className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                      {errors.Bloodgroup && (
                        <div className="text-danger">{errors.Bloodgroup}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="Phone"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                      id="phone"
                      name="Phone"
                      placeholder="Enter phone number"
                      onChange={handleInputChange}
                    />
                    {errors.Phone && (
                      <div className="text-danger">{errors.Phone}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="Relationship"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      Relationship
                    </label>
                    <i className="icon-down-arrow form-icon zw_icon_drop mt-5"></i>
                    <select
                      onChange={handleInputChange}
                      id="relationship"
                      name="Relationship"
                      className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16 "
                    >
                      <option key="" value="">
                        Select Relationship
                      </option>
                      <option key="" value="Father">
                        Father
                      </option>
                      <option key="" value="Mother">
                        Mother
                      </option>
                      <option key="" value="Brother">
                        Brother
                      </option>
                      <option key="" value="Sister">
                        Sister
                      </option>
                      <option key="" value="Son">
                        Son
                      </option>
                      <option key="" value="Other">
                        Other
                      </option>
                    </select>
                    {errors.Relationship && (
                      <div className="text-danger">{errors.Relationship}</div>
                    )}
                  </div>
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="InsuranceCompany"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      Insurance Company
                    </label>
                    <input
                      type="text"
                      className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                      id="insuranceCompany"
                      name="InsuranceCompany"
                      placeholder="Enter insurance company"
                      onChange={handleInputChange}
                    />
                    {errors.InsuranceCompany && (
                      <div className="text-danger">
                        {errors.InsuranceCompany}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label
                      htmlFor="InsuranceAccNo"
                      className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                    >
                      Insurance Account Number
                    </label>
                    <input
                      type="text"
                      className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                      id="insuranceAccNo"
                      name="InsuranceAccNo"
                      placeholder="Enter insurance account number"
                      onChange={handleInputChange}
                    />
                    {errors.InsuranceAccNo && (
                      <div className="text-danger">{errors.InsuranceAccNo}</div>
                    )}
                  </div>
                </div>

                <div className="d-grid gap-2 col-6 mx-auto mt-5">
                  <button
                    className="bt btn-primar zw_bg_gradient py-4 border-0 rounded poppins-regular zw_14 zw_text_fff "
                    type="submit"
                    variant="secondary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={handleSecondModalClose}>
                Close
              </Button> */}
            </Modal.Footer>
          </Modal>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleFirstModalClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default Addrecord;
