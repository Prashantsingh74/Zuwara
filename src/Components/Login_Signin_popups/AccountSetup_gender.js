import React, { useState, useRef, useContext } from "react";
import Accountsetup_Bdate from "./Accountsetup_Bdate";
import { Context } from "../../Context";
import "../../Style/login_popup.css";

function AccountSetup_gender() {
  const modalRef = useRef(null);
  const { signupFormData, updateSignupFormData } = useContext(Context);
  const [openBdate, setOpenBdate] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handOpenBdate = () => setOpenBdate(true);

  const handleSlectedDate = (data) => {
    updateSignupFormData({ Dob: data });
    setOpenBdate(false);
    clearError("Dob");
  };

  const handleGenderChange = (event) => {
    updateSignupFormData({ Gender: event.target.value });
    clearError("Gender");
  };

  const clearError = (field) => {
    const newErrors = { ...formErrors };
    delete newErrors[field];
    setFormErrors(newErrors);
  };

  const validate = () => {
    const errors = {};
    if (!signupFormData.Dob) {
      errors.Dob = "Date of Birth is required!";
    }
    if (!signupFormData.Gender) {
      errors.Gender = "Gender is required!";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlenext = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validate()) {
      updateSignupFormData(signupFormData);
      console.log("Step 3 data", signupFormData);
      const nextModal = new window.bootstrap.Modal(
        document.getElementById("accountsetup_captcha")
      );
      const currentModal = window.bootstrap.Modal.getInstance(
        document.getElementById("accountsetup_gender")
      );
      currentModal.hide();
      nextModal.show();
    }
  };

  const labelStyle = (checked) => ({
    backgroundColor: checked ? "#AF2245" : "#fff",
    color: checked ? "#fff" : "#000",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
  });

  const radioStyle = (checked) => ({
    // borderRadius: "50%",
    // width: "15px",
    // height: "15px",
    border: `2px solid ${checked ? "#C1BCBC" : "#ccc"}`,
    backgroundColor: checked ? "#af2245" : "#fff",
    display: "inline-block",
    verticalAlign: "middle",
    // marginRight: "8px",
  });

  return (
    <>
      <div className="zw_popup">
        <div
          className="modal fade"
          id="accountsetup_gender"
          role="dialog"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered ms-auto" role="document">
            <div className="modal-content">
              <div className="modal-body">
                {openBdate ? (
                  <Accountsetup_Bdate handleSlectedDate={handleSlectedDate} />
                ) : (
                  <>
                    <div className="btn-space">
                      <button
                        type="button"
                        className="sps-dialog-close regv2back"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <i className="icon-close"></i>
                      </button>
                    </div>
                    <div>
                      <h6
                        className="poppins-semibold zw_text_color zw_30 mb-4"
                        style={{ textAlign: "center", color: "#11111", fontSize: "25px", top: "-2rem", marginBottom: "0rem !important" }}
                      >
                        Account Setup
                      </h6>
                    </div>
                    <div className="container ps-5">
                      <p className='poppins-regular zw_24 zw_9B9B9B mb-0' style={{ fontSize: "18px" }}>
                        Step 2 completed of 4
                      </p>
                      {/* <div className="line_indicator_container w-100">
                        <div className="line-indicator-bg each_line_indicator active"></div>
                        <div className="line-indicator-bg each_line_indicator active"></div>
                        <div className="line-indicator-bg each_line_indicator"></div>
                        <div className="line-indicator-bg each_line_indicator"></div>
                      </div> */}
                      <div className="prog-grid1">
                        <div
                          className="prog-bar1"
                          style={{ backgroundColor: "#DDE0E6", height: "8px", borderRadius: "4px" }}
                        >
                          <div className="prog-bar-per" style={{ width: "55%", backgroundColor: "#af2245", height: "88%", borderRadius: "4px" }}></div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="container"
                      style={{ padding: "20px", marginTop: "18px" }}
                    >
                      <form>
                        <div className="form-group zw_form_group mb-0">
                          <div
                            className="date-picker form-control zw_form_control zw_secondary poppins-regular zw_16 pt-2 zw_date "
                            onClick={handOpenBdate}
                          >
                            <i
                              className="fa fa-calendar cal fs-2"
                              style={{ marginLeft: "25px" }}
                              aria-hidden="true"
                            ></i>
                            <input
                              type="text"
                              className="poppins-regular zw_22 zw_secondary"
                              placeholder="Select"
                              value={signupFormData.Dob}
                              readOnly
                            />
                          </div>
                        </div>
                        {formErrors.Dob && (
                          <span
                            className="sa-error-message zw_14"
                            style={{ color: "red" }}
                          >
                            {formErrors.Dob}
                          </span>
                        )}
                        <div className="mt-5 d-flex">
                          <label className="poppins-medium zw_text_color zw_24 zw_radio_btn_label mb-4">
                            Gender
                          </label>
                          <div className="zw_radio_group w-100">
                            <label className="zw_radio_btn poppins-regular zw_22 zw_secondary px-2 mb-4 radio-gender"
                              style={labelStyle(signupFormData.Gender === "male")}
                            >
                              <input
                                type="radio"
                                className="radio-btn-signup"
                                name="gender"
                                value="male"
                                checked={signupFormData.Gender === "male"}
                                onChange={handleGenderChange}
                                style={{ display: "none" }}
                              />
                              <div
                                className="opacity-0"
                                style={radioStyle(
                                  signupFormData.Gender === "male"
                                )}
                              ></div>
                              Male
                            </label>
                            <label className="zw_radio_btn poppins-regular zw_22 zw_secondary px-2 mb-4 radio-gender"
                              style={labelStyle(signupFormData.Gender === "female")}
                            >
                              <input
                                type="radio"
                                className="radio-btn-signup"
                                name="gender"
                                value="female"
                                checked={signupFormData.Gender === "female"}
                                onChange={handleGenderChange}
                                style={{ display: "none" }} // Hide the default radio button
                              />
                              <div
                                className="opacity-0"
                                style={radioStyle(
                                  signupFormData.Gender === "female"
                                )}
                              ></div>
                              Female
                            </label>
                            <label className="zw_radio_btn poppins-regular zw_22 zw_secondary px-2 mb-4 radio-gender"
                              style={labelStyle(signupFormData.Gender === "other")}
                            >
                              <input
                                type="radio"
                                className="radio-btn-signup"
                                name="gender"
                                value="other"
                                checked={signupFormData.Gender === "other"}
                                onChange={handleGenderChange}
                                style={{ display: "none" }} // Hide the default radio button
                              />
                              <div
                                className="opacity-0"
                                style={radioStyle(
                                  signupFormData.Gender === "other"
                                )}
                              ></div>
                              Other
                            </label>
                          </div>
                        </div>
                        {formErrors.Gender && (
                          <span
                            className="sa-error-message zw_14"
                            style={{ color: "red" }}
                          >
                            {formErrors.Gender}
                          </span>
                        )}
                        <div className="d-flex justify-content-center mt-5">
                          <button type='submit' className='zw_text_fff  poppins-medium zw_bg_gradient zw_btn_18 zw_border_none p-2' style={{ width: "340px", height: "55px", borderRadius: '6px' }} onClick={handlenext}>
                            Next
                          </button>
                        </div>
                        {/* <button
                          type="button"
                          className="mt-5 zw_text_fff mt-3 poppins-medium zw_24 zw_bg_gradient zw_btn_18 zw_border_none p-2"
                          onClick={handlenext}
                          style={{
                            width: "80%",
                            margin: " 0 10%",
                            borderRadius: "6px",
                          }}
                        >
                          Next
                        </button> */}
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountSetup_gender;
