import React, { useState, useEffect, useContext } from "react";
import countryList from "react-select-country-list";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import "../../../Style/Wallet.css";
import "../../../Style/Patient_list.css";
import { Link, useNavigate } from "react-router-dom";
import Addpatient from "../../Home/Laboratory/Addpatient.js";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactFlagsSelect from "react-flags-select";
import { Context } from "../../../Context";
import Profilenavbar from "./Profilenavbar.js";
const defaultImageUrl =
  "https://th.bing.com/th/id/OIP.awAiMS1BCAQ2xS2lcdXGlwAAAA?rs=1&pid=ImgDetMain"; // Replace with your initial image URL
function Patient_list() {
  const { username, setUsername, PatientName, setIsAuthenticated } =
    useContext(Context);

  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("SA");
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const countries = countryList().getData();
    setOptions(countries);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://zuwara.net/admin/public/api/getappointmentbypatient/10",
          {
            method: "GET",
            headers: {
              Cookie: "zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ",
            },
          }
        );
        const data = await response.json();
        setAppointments(data.appointment_records);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    fetchAppointments();
  }, []);

  const onLogOut = () => {
    setIsAuthenticated(false);
    setUsername("");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("username"); // Correct typo
    navigate("/");
  };

  const [uploadedFiles, setUploadedFiles] = useState([
    {
      file: null, // Placeholder, as the file is not available initially
      url: defaultImageUrl,
    },
  ]); // Initial state with one default image
  const [error, setError] = useState(""); // State for error messages
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file (only one allowed)
    // Check if the file is an image
    if (file && file.type.includes("image")) {
      const fileObject = {
        file,
        url: URL.createObjectURL(file), // Generate a URL for the file
      };
      setUploadedFiles([fileObject]); // Replace the previous file with the new one
      setError(""); // Clear any previous error messages
    } else if (file && file.type.includes("pdf")) {
      setError(alert("PDFs are not allowed. Please upload an image.")); // Set an error message if a PDF is selected
      setUploadedFiles([]); // Clear the uploaded files
    } else {
      setError(alert("Invalid file type. Please upload an image.")); // Set a general error message for other file types
      setUploadedFiles([]); // Clear the uploaded files
    }
  };
  return (
    <div>
      <Navbar />
      <div className="my-wallet-TQp">
        <div className="auto-group-9asv-tpt" style={{ marginTop: "80px" }}>
          <Profilenavbar />
        </div>

        {/* <div className="medical-records-bs2 poppins-semibold zw_16 zw_text_color">
          Medical Records
        </div> */}
        <div className="auto-group-ori4-usi container my-4">
          <div className="row ">
            <div className="col-lg-5 col-md-5 mb-5">
              <div className="auto-group-xyng-pzg m-0">
                <div className="group-1261154812-MUp mb-0">
                  <div className="frame-1261154254-Vqv">
                    <div>
                      <img
                        className="image-87-obi"
                        src="/images/image-87.png"
                        alt=""
                      />
                    </div>
                    <div className="poppins-regular zw_16 zw_000">
                      <div>
                        All our service providers are certified and licensed by
                        the Ministry of Health, ensuring the highest quality and
                        reliable healthcare.
                      </div>
                      {/* <div style={{ marginTop: "5px" }}>No: ***********</div> */}
                    </div>
                  </div>
                </div>
                <div className="group-1261154919-pBN ">
                  <Link to="/patientlist">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC text-col-filter "
                        src="./images/group-1261154891-zd2.png"
                        alt=""
                      />
                      <div className="poppins-regular zw_16 zw_title_color">
                        Patients list
                      </div>
                    </div>
                  </Link>
                  <Link to="/addresslist">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC"
                        src="./images/Addresslist.png"
                        alt=""
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        Address list
                      </div>
                    </div>
                  </Link>
                  <Link to="/wallet">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC text-black-filter"
                        src="./images/group-1261154895.png"
                        alt=""
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        Wallet
                      </div>
                    </div>
                  </Link>
                  <Link to="/mydocter">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC"
                        src="./images/group-1261154894.png"
                        alt=""
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        My Doctor
                      </div>
                    </div>
                  </Link>

                  <div
                    className="auto-group-r48k-MBJ hover-profile"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalcountry"
                  >
                    <img
                      className="group-1261154891-5NC"
                      src="/images/country.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
                      Country
                    </div>
                  </div>
                  <div
                    class="modal fade"
                    id="exampleModalcountry"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content overflow-visible">
                        <div class="modal-header border-0">
                          {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                          <button
                            class="sps-dialog-close regv2back"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i class="icon-close"></i>
                          </button>
                        </div>
                        <div class="modal-body border-0 mt-4">
                          <label
                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                            htmlFor=""
                          >
                            Select Country
                          </label>
                          <div className="custom-flags-select">
                            <ReactFlagsSelect
                              selected={selected}
                              onSelect={(code) => setSelected(code)}
                              placeholder="Select Country"
                              searchable
                              searchPlaceholder="Search countries"
                              className="menu-flags"
                              selectedSize={20}
                              optionsSize={20}
                              selectButtonClassName="menu-flags-button"
                            />
                            {/* Custom arrow icon */}
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              className="custom-arrow-icon"
                            />
                          </div>
                        </div>
                        <div class="modal-footer border-0">
                          <div
                            className="d-grid gap-2 col-12 mx-auto mt-3"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <button
                              className="poppins-regular zw_text_fff zw_bg_gradient border-0 rounded zw_20 py-3 my-2"
                              type="button"
                              style={{ marginTop: "20px" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="auto-group-r48k-MBJ hover-profile"
                    data-bs-toggle="modal"
                    data-bs-target="#logoutBackdrop"
                  >
                    <img
                      className="group-1261154891-5NC"
                      src="./images/group-1261154887.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
                      Logout
                    </div>
                  </div>
                  <div
                    class="modal fade"
                    id="logoutBackdrop"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{ marginTop: "200px" }}
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                        <div
                          class="modal-body"
                          style={{
                            margin: "30px",
                            color: "#AF2245",
                            fontFamily: "poppins,sans-serif",
                          }}
                        >
                          <h2>Are you sure ,you want to logout ?</h2>
                          <div
                            class="d-grid gap-2 d-md-block"
                            style={{ marginTop: "30px", marginRight: "5px" }}
                          >
                            <button
                              className="poppins-semibold zw_18 border-0"
                              type="button"
                              style={{
                                width: "200px",
                                borderColor: "#AF2245",
                                height: "40px",
                                borderRadius: "10px",
                                color: "#000000",
                                marginRight: "10px",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#AF2245")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "transparent")
                              }
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={onLogOut}
                            >
                              yes
                            </button>
                            <button
                              className="poppins-semibold zw_18 border-0"
                              type="button"
                              style={{
                                width: "200px",
                                borderColor: "#AF2245",
                                height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#AF2245",
                                color: "Background",
                              }}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-7">
              <div className="group-1261154869-2s6 border-0 shadow">
                <div
                  className="group-1261154838-YqS "
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="poppins-semibold zw_20 zw_text_color mb-0">
                    PATIENT LIST
                  </p>
                  <button className="buttonforaddress d-flex align-items-center">
                    <img src="/images/plusmark.png" alt="" />
                    <p
                      className="poppins-medium zw_16 zw_text_fff ms-3 mb-0"
                      data-bs-toggle="modal"
                      data-bs-target="#LogInPopUpModal41"
                    >
                      Add New Patient
                    </p>
                  </button>
                </div>

                <div className="auto-group-dxnl-WMASS mt-4">
                  {/* <div class="row">
                                    .col-6</div>
                                    <div class="col-6">.col-6</div>
                                </div> */}
                  <div class="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 pati-details mb-2">
                      <Link to="/records">
                        <div className="d-flex justify-content-between">
                          <p className="poppins-medium zw_16 zw_000">
                            {" "}
                            {username}
                          </p>
                          <p className="poppins-regular zw_14 zw_000">
                            My Self
                          </p>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                          <div className="zw_title_color">
                            <img
                              src="/images/files.png"
                              alt="file icon"
                              className="zw_title_color"
                            />
                            <span className="poppins-regular zw_14 zw_title_color mx-3">
                              0 File
                            </span>
                          </div>
                          <p className="poppins-regular zw_14 zw_000">
                            0 Appointments
                          </p>
                        </div>
                      </Link>
                    </div>

                    {PatientName.map((pitem, index) => (
                      <div className="pati-details col-6 mx-2  mb-2  ">
                        <div className="d-flex justify-content-between ">
                          <p className="poppins-medium zw_16 zw_000">
                            {" "}
                            {pitem.Firstname} {pitem.Lastname}
                          </p>
                          <p className="poppins-regular zw_14 zw_000">
                            My Self
                          </p>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                          <div className="zw_title_color">
                            <img
                              src="/images/files.png"
                              alt="file icon"
                              className="zw_title_color"
                            />
                            <span className="poppins-regular zw_14 zw_title_color mx-3">
                              0 File
                            </span>
                          </div>
                          <p className="poppins-regular zw_14 zw_000">
                            0 Appointments
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="recent-appoi ">
                    <div className="">
                      <p className="poppins-semibold zw_20 zw_000">
                        Recent appointments
                      </p>
                    </div>
                    <div className="row row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-5  mt-4 text-center">
                      <p className=" poppins-medium zw_18 zw_secondary">
                        Service
                      </p>
                      <p className=" poppins-medium zw_18 zw_secondary">
                        Patient Name
                      </p>
                      <p className=" poppins-medium zw_18 zw_secondary">
                        Date & Time
                      </p>
                      <p className=" poppins-medium zw_18 zw_secondary">
                        Appointment ID
                      </p>
                      <p className=" poppins-medium zw_18 zw_secondary">
                        Status
                      </p>
                    </div>
                    {appointments.map((appointment, index) => {
                      const patients = JSON.parse(appointment.Patients);
                      const firstPatient = patients[0];
                      const fullName = `${firstPatient.Firstname} ${firstPatient.Lastname}`;

                      const formattedDateTime = `${appointment.Date} ${appointment.Timeslot}`;

                      return (
                        <div
                          key={index}
                          className="telme-bg row row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-5 text-center mt-3 py-5"
                        >
                          <p className="poppins-medium zw_18 zw_000">
                            {appointment.Servicename}
                          </p>
                          <p className="poppins-medium zw_18 zw_000">
                            {fullName}
                          </p>
                          <p className="poppins-medium zw_18 zw_000">
                            {formattedDateTime}
                          </p>
                          <p className="poppins-medium zw_18 zw_000">
                            {appointment.id}
                          </p>
                          <p className="poppins-medium zw_18 zw_000">
                            Completed
                          </p>
                        </div>
                      );
                    })}
                    <Addpatient />
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
}

export default Patient_list;
