import React, { useState } from "react";
// import '../../../Style/Reports.css'
import { Link } from "react-router-dom";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";

function Reports() {
    const [selectedOption, setSelectedOption] = useState("");

    const handleCheckboxChange = (value) => {
        setSelectedOption(value);
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
                    <div className="group-1261154802-aUC row">
                        <p className="col-lg-3 col-md-3 appointment-7yv poppins-medium zw_24 zw_title_color">
                            Reports
                        </p>
                        <div className="col-lg-5 col-md-5 selecct-patients">
                            <div className="select-drop-mod">
                                <div className="d-flex" style={{ position: "relative" }}>
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
                                <img
                                    className="group-1261154799-R1W"
                                    src="/images/group-1261154799.png"
                                    alt="sda"
                                    data-bs-toggle="modal"
                                    data-bs-target="#iconBackdrop"
                                    style={{cursor:'pointer'}}
                                />
                            </div>
                        </div>
                        {/* <img className="group-1261154799-R1W" src="/images/group-1261154799.png" alt='sda' data-bs-toggle="modal" data-bs-target="#iconBackdrop" /> */}
                        <div
                            class="modal fade"
                            id="iconBackdrop"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabindex="-1"
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                            style={{ marginTop: "100px" }}
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div>
                                        <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body" style={{ margin: "25px" }}>
                                        <div class="modal-header">
                                            <div class="form-check" style={{ margin: "10px" }}>
                                                <label className="form-check-label poppins-medium zw_18" htmlFor="homeVisit">
                                                    Home Visit
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="homeVisit"
                                                    value="homeVisit"
                                                    checked={selectedOption === "homeVisit"}
                                                    onChange={() => handleCheckboxChange("homeVisit")}
                                                    style={{
                                                        marginLeft: "550px",
                                                        marginTop: "-20px",
                                                        backgroundColor:
                                                            selectedOption === "homeVisit"
                                                                ? "#AF2245"
                                                                : "transparent",
                                                        border: "none",
                                                        borderColor: "none",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div class="modal-header">
                                            <div class="form-check" style={{ margin: "10px" }}>
                                                <label
                                                    className="form-check-label poppins-medium zw_18 "
                                                    htmlFor="telemedicine"
                                                >
                                                    Telemedicine
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="telemedicine"
                                                    value="telemedicine"
                                                    checked={selectedOption === "telemedicine"}
                                                    onChange={() => handleCheckboxChange("telemedicine")}
                                                    style={{
                                                        marginLeft: "550px",
                                                        marginTop: "-20px",
                                                        backgroundColor:
                                                            selectedOption === "telemedicine"
                                                                ? "#AF2245"
                                                                : "transparent",
                                                        border: "none",
                                                        borderColor: "none",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div class="modal-header">
                                            <div class="form-check" style={{ margin: "10px" }}>
                                                <label className="form-check-label poppins-medium zw_18" htmlFor="all">
                                                    All
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="all"
                                                    value="all"
                                                    checked={selectedOption === "all"}
                                                    onChange={() => handleCheckboxChange("all")}
                                                    style={{
                                                        marginLeft: "550px",
                                                        marginTop: "-20px",
                                                        backgroundColor:
                                                            selectedOption === "all"
                                                                ? "#AF2245"
                                                                : "transparent",
                                                        border: "none",
                                                        borderColor: "none",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            class="d-grid gap-2"
                                            style={{ marginTop: "10px", height: "30px" }}
                                        >
                                            <button
                                                class="poppins-medium zw_18 border-0 rounded"
                                                type="button"
                                                style={{
                                                    backgroundColor: "#AF2245",
                                                    borderColor: "#AF2245",
                                                    color:"#fff"
                                                }}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="auto-group-4het-P4G row">
                        <div className="col-lg-4 col-md-4">
                            <div className="group-1261154801-LEQ">
                                <div className="group-1261154793-TZv">
                                    <Link to="/appointment">
                                        <div className="auto-group-mqye-CXW">
                                            <img
                                                className="group-1261154899-8RA"
                                                src="/images/calfor.png"
                                                alt=""
                                            />
                                            <div className="poppins-medium zw_18 zw_text_color">
                                                Appointments
                                            </div>
                                        </div>
                                    </Link>
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
                                    <div
                                        className="auto-group-mqye-CXW"
                                        style={{ backgroundColor: "#AF2245" }}
                                    >
                                        <img
                                            className="group-1261154899-8RA"
                                            src="/images/group-1261154896-fbi.png"
                                            alt=""
                                        />
                                        <div className="poppins-medium zw_18 zw_text_fff">
                                            Reports
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8">
                            <div className="auto-group-pzzj-Tdn">
                                <div className="auto-group-vvxk-nvx">
                                    <button className="active group-1261154912-vnG">Reports</button>
                                </div>
                                <div className="auto-6se">
                                    <input
                                        type="text"
                                        className="search-box poppins-medium zw_18 zw_text_color"
                                        placeholder="Selected patient"
                                    />
                                    <img
                                        className="vector-1vL"
                                        src="/images/vector-vFW.png"
                                        alt=""
                                    />
                                    <div className="poppins-medium zw_18 nodata">No data found</div>
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

export default Reports;
