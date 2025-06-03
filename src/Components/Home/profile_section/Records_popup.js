import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RecordContext } from "./RecordContext";

const Records_popup = () => {
  const [gender, setGender] = useState("");
  const [errorGender, setErrorGender] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [errorBloodGroup, setErrorBloodGroup] = useState(false);
  const [relationship, setRelationship] = useState("");
  const [errorRelationship, setErrorRelationship] = useState(false);
  const [company, setCompany] = useState("");
  const [errorCompany, setErrorCompany] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [insuranceAccNo, setInsuranceAccNo] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [patientRecords, setPatientRecords] = useState([]);

  const { addDoctor } = useContext(RecordContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation logic
    if (!gender || !bloodGroup || !relationship || !company) {
      if (!gender) setErrorGender(true);
      if (!bloodGroup) setErrorBloodGroup(true);
      if (!relationship) setErrorRelationship(true);
      if (!company) setErrorCompany(true);
      return;
    }

    try {
      const response = await fetch(
        "https://zwarra.biztechnosys.com/api/getpatients/1",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Successfully fetched patients:", data);

      // Update state with fetched patient records
      setPatientRecords(data.patient_record);

      // Call context function to add doctor
      addDoctor({
        gender,
        bloodGroup,
        relationship,
        company,
        startDate,
        email,
        username,
        insuranceAccNo,
        type,
        status,
        nationalId,
      });

      // Reset form after submission
      setGender("");
      setErrorGender(false);
      setBloodGroup("");
      setErrorBloodGroup(false);
      setRelationship("");
      setErrorRelationship(false);
      setCompany("");
      setErrorCompany(false);
      setStartDate(new Date());
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setInsuranceAccNo("");
      setType("");
      setStatus("");
      setNationalId("");
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setErrorGender(false);
  };

  const handleBloodChange = (event) => {
    setBloodGroup(event.target.value);
    setErrorBloodGroup(false);
  };

  const handleRelationshipChange = (event) => {
    setRelationship(event.target.value);
    setErrorRelationship(false);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
    setErrorCompany(false);
  };

  return (
    <div>
      <div
        className="text-center"
        style={{ cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <img
          className="carbon-add-filled-XNU"
          src="./images/carbon-add-filled.png"
          alt="add icon"
        />
        <div className="add-records-Ndz">Add records</div>
      </div>
      <div
        className="modal fade record-modal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content record-content">
            <h6
              className="poppins-semibold zw_text_color zw_32 mb-4"
              style={{ textAlign: "left", padding: "20px" }}
            >
              Add Patient
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="modal-body">
              <div
              id="addppa"
                className="container"
                style={{ padding: "20px", marginTop: "20px" }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className=" col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group zw_form_group text-start text-start">
                        <label
                          className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                          htmlFor="id"
                        >
                          ID
                        </label>
                        <input
                          type="text"
                          id="id"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          placeholder="Enter ID"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                          htmlFor="relatedto"
                        >
                          Related To
                        </label>
                        <input
                          type="text"
                          id="relatedto"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          placeholder="Enter Related To"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          placeholder="Enter First Name"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          placeholder="Enter Last Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Gender
                        </label>
                        <select
                          className={`form-control zw_form_control zw_secondary poppins-regular zw_16 ${
                            errorGender ? "is-invalid" : ""
                          }`}
                          value={gender}
                          onChange={handleGenderChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {errorGender && (
                          <p className="error-message">Please select Gender</p>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Blood Group
                        </label>
                        <select
                          className={`form-control zw_form_control zw_secondary poppins-regular zw_16 ${
                            errorBloodGroup ? "is-invalid" : ""
                          }`}
                          value={bloodGroup}
                          onChange={handleBloodChange}
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                        {errorBloodGroup && (
                          <p className="error-message">
                            Please select Blood Group
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Relationship
                        </label>
                        <select
                          className={`form-control zw_form_control zw_secondary poppins-regular zw_16 ${
                            errorRelationship ? "is-invalid" : ""
                          }`}
                          value={relationship}
                          onChange={handleRelationshipChange}
                        >
                          <option value="">Select Relationship</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Brother">Brother</option>
                          <option value="Sister">Sister</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Other">Other</option>
                        </select>
                        {errorRelationship && (
                          <p className="error-message">
                            Please select Relationship
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          className={`form-control zw_form_control zw_secondary poppins-regular zw_16 ${
                            errorCompany ? "is-invalid" : ""
                          }`}
                          value={company}
                          onChange={handleCompanyChange}
                        />
                        {errorCompany && (
                          <p className="error-message">Please enter Company</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Start Date
                        </label>
                        <div>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Insurance Account No.
                        </label>
                        <input
                          type="text"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          value={insuranceAccNo}
                          onChange={(e) => setInsuranceAccNo(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Type
                        </label>
                        <input
                          type="text"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          Status
                        </label>
                        <input
                          type="text"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group zw_form_group text-start">
                        <label
                          className="zw_text_color poppins-regular zw_20 zw_text_111535"
                          style={{ marginBottom: "5px" }}
                        >
                          National ID
                        </label>
                        <input
                          type="text"
                          className="form-control zw_form_control zw_secondary poppins-regular zw_16"
                          value={nationalId}
                          onChange={(e) => setNationalId(e.target.value)}
                        />
                      </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records_popup;
