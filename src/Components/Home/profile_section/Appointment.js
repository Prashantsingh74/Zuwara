import React, { useState, useEffect, useContext } from "react";
import "../../../Style/Appointment.css";
import { Link } from "react-router-dom";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import { Context } from "../../../Context";

function Appointment() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckboxChange = (value) => {
    setSelectedOption(value);
  };

  // const pastData = [
  //   {
  //     "id": 1,
  //     "Doctorimg": '../../../../images/Rectangle 39755.png',
  //     "Drname": 'Dr.Mohammed John',
  //     "telemedicineIcon": '../../../../images/video-icon.svg',
  //     "telemedicine": 'Telemedicine',
  //     "patientIcon": '../../../../images/patient-icon-app.svg',
  //     "patientnameholder": 'Patient name',
  //     "patientname": 'Sultan Ali(My Self)',
  //     "appointmentIcon": '../../../../images/Appoint-id.svg',
  //     "appointmentholder": 'Appointment ID',
  //     "appointmentId": 'ADC356475',
  //     "calenderIcon": '../../../../images/cale-icon-app.svg',
  //     "Date": '02 Sep 2026',
  //     "timeIcon": '../../../../images/time-icon-app.svg',
  //     "time": '6:00 PM',
  //     "reportIcon": '../../../../images/Report-icon-app.svg',
  //     "report": 'View Report',

  //   },
  // ]

  const [currentView, setCurrentView] = useState("Upcoming");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "https://zuwara.net/admin/public/api/getappointmentbypatient/10",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: "zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ",
          },
        }
      );
      const data = await response.json();
      setAppointments(data.appointment_records);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  return (
    <div>
      <Navbar />
      <div className="appiontments-YKE">
        <div className="auto-group-uzrn-4Ha container my-5">
          {/* <div className="auto-group-sqbn-mSt"></div> */}
          <Link to="/profile">
            <div className="auto-group-fzyn-1Gg">
              <img
                className="group-1261154072-jTa"
                src="/images/group-1261154072-2y2.png"
                alt=""
              />
              <p
                className="poppins-medium zw_18 zw_333333"
                style={{ margin: "0" }}
              >
                Back
              </p>
            </div>
          </Link>
          <div className="group-1261154802-aUC  row">
            <p className="col-lg-3 col-md-3 appointment-7y poppins-medium zw_24 zw_title_color">
              Appointment
            </p>
            <div className="col-lg- col-md-5 selecct-patients">
              <div className="d-flex app-select-patient" style={{ position: "relative" }}>
                <select
                  id="patientcode"
                  name="patientcode"
                  className=" zw_form_control zw_secondary poppins-regular zw_16"
                  style={{
                    borderRadius: "5px",
                    appearance: "none",
                    padding: " 8px 66px 8px 30px",
                  }}
                >
                  <option value="">Selected patient</option>
                  <option value="abc">abc</option>
                  <option value="def">def</option>
                </select>
                <span
                  class="dropdown-icon"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    padding: "0px 17px 0px 31px",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <i className="icon-down-arrow zw_icon_drop fs-3"></i>
                </span>
              </div>
              {/* <img className="group-1261154799-R1W" src="/images/group-1261154799.png" alt='sda' data-bs-toggle="modal" data-bs-target="#iconBackdrop" /> */}
             
            </div>

            {/* </div> */}

            {/* </div> */}
          </div>
          <div className="auto-group-4het-P4G row">
            <div className="col-lg-4 col-md-4 mb-5">
              <div className="group-1261154801-LEQ">
                <div className="group-1261154793-TZv">
                  <div
                    className="auto-group-mqye-CXW"
                    style={{ backgroundColor: "#AF2245" }}
                  >
                    <img
                      className="group-1261154899-8RA"
                      src="/images/appcal.png"
                      alt="app"
                    />
                    <div className="poppins-medium zw_18 zw_text_fff">
                      Appointments
                    </div>
                  </div>
                  <Link to="/prescription">
                    <div className="auto-group-mqye-CXW">
                      <img
                        className="group-1261154899-8RA"
                        src="/images/prescription1-5W4.png"
                        alt=""
                      />
                      <div className="poppins-medium zw_18 zw_text_color">
                        Prescription
                      </div>
                    </div>
                  </Link>
                  <Link to="/reports">
                    <div className="auto-group-mqye-CXW">
                      <img
                        className="group-1261154899-8RA"
                        src="/images/group-1261154896-MBa.png"
                        alt=""
                      />
                      <div className="poppins-medium zw_18 zw_text_color">
                        Reports
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="row upcoming">
                <button
                  className={
                    currentView === "Upcoming"
                      ? "active group-1261154912-vnGg col-lg-3 col-md-3"
                      : "group-1261154912-vnGg col-lg-3 col-md-3"
                  }
                  onClick={() => handleViewChange("Upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={
                    currentView === "Pending"
                      ? "active group-1261154912-vnGg col-lg-3 col-md-3"
                      : "group-1261154912-vnGg col-lg-3 col-md-3"
                  }
                  onClick={() => handleViewChange("Pending")}
                >
                  Pending
                </button>
                <button
                  className={
                    currentView === "Past"
                      ? "active group-1261154912-vnGg col-lg-3 col-md-3"
                      : "group-1261154912-vnGg col-lg-3 col-md-3"
                  }
                  onClick={() => handleViewChange("Past")}
                >
                  Past
                </button>
                <button
                  className={
                    currentView === "Cancelled"
                      ? "active group-1261154912-vnGg col-lg-3 col-md-3"
                      : "group-1261154912-vnGg col-lg-3 col-md-3"
                  }
                  onClick={() => handleViewChange("Cancelled")}
                >
                  Cancelled
                </button>
              </div>

     
              <div className="auto-group-pzzj-Tdn">
                <div className="rectangle-39641-w56">
                  {currentView === "Upcoming" && (
                    <div className="poppins-medium zw_18 zw_text_color d-flex justify-content-center align-items-center h-100">
                      <p className="">No Appointments</p>
                    </div>
                  )}
                  {currentView === "Pending" && (
                    <div className="poppins-medium zw_18 zw_text_color d-flex justify-content-center align-items-center h-100">
                      <p className="">Pending Appointments</p>
                    </div>
                  )}
                  {currentView === "Past" &&
                    appointments.map((pitems) => {
                      const patients = JSON.parse(pitems.Patients);
                      const firstPatient = patients[0];
                      const fullName = `${firstPatient.Firstname} ${firstPatient.Lastname}`;

                      return (
                        <div
                          className="d-flex flex-column flex-md-row gap-5 p-5"
                          key={pitems.id}
                        >
                          <div className="flex-shrink-0">
                            <img
                              src="./images/Rectangle 39755.png"
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div className="w-100">
                            <p className="poppins-semibold zw_18 zw_text_color">
                              {pitems.Healthcare}
                            </p>
                            <div className="d-flex gap-2 mb-1">
                              <img src="./images/video-icon.svg" alt="" />
                              <span className="poppins-medium zw_16">
                                {pitems.Servicename}
                              </span>
                            </div>
                            <div className="d-flex gap-2 my-2">
                              <img src="./images/patient-icon-app.svg" alt="" />
                              <p className="poppins-medium zw_16 zw_secondary mb-0">
                                {pitems.patientnameholder}
                              </p>
                              <p className="poppins-medium zw_16 zw_text_color mb-0">
                                <span className="grey-color">
                                  Patient name :
                                </span>{" "}
                                {fullName}
                              </p>
                            </div>
                            <div className="d-flex gap-2 my-2">
                              <img src="./images/Appoint-id.svg" alt="" />
                              <p className="poppins-medium zw_16 zw_secondary mb-0">
                                {pitems.appointmentholder}
                              </p>
                              <p className="poppins-medium zw_16 zw_text_color mb-0">
                                <span className="grey-color">
                                  Appointment ID :
                                </span>{" "}
                                {pitems.id}
                              </p>
                            </div>
                            <div className=" view-reports">
                              <div className="d-flex gap-2 my-2">
                                <img src="./images/cale-icon-app.svg" alt="" />
                                <p className="poppins-medium zw_16 zw_text_color mb-0 me-4">
                                  {pitems.Date}
                                </p>
                                <img src="./images/time-icon-app.svg" alt="" />
                                <p className="poppins-medium zw_16 zw_text_color mb-0">
                                  {pitems.Timeslot}
                                </p>
                              </div>
                              <button className="border-0 bg-report-app d-flex align-items-end px-4 pb-2">
                                <img
                                  className="reporticonapp me-3"
                                  src="./images/Report-icon-app.svg"
                                  alt=""
                                />
                                <p className="poppins-medium zw_16 zw_title_color mb-0">
                                  View Report
                                </p>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {currentView === "Cancelled" && (
                    <div
                      className="poppins-medium zw_18 zw_text_color d-flex justify-content-center align-items-center h-100"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <p>No Appointments</p>
                    </div>
                  )}
                </div>
              </div>
           
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Appointment;
