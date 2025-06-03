import React, { useContext } from "react";
import "../../../Style/Medical.css";
import { Link } from "react-router-dom";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import { Context } from "../../../Context";
import PatientlistSubLeftSec from "./PatientlistSubLeftSec";

function Medical() {
  const { username } = useContext(Context);

  return (
    <div>
      <Navbar />
      <div className="desktop-5-vEY my-5">
        <div className="auto-group-i5de-DUY container">
          {/* <div className="group-182-7pp">
            <img className="logo-Fg8" src="./images/logo-4uz.png" />
            <div className="auto-group-ahac-ztc">
              <div className="group-1261154647-j5W">
                <div className="home-EHA">Home</div>
                <div className="about-kmJ">About</div>
                <div className="join-as-provider-gur">Join as provider</div>
                <div className="get-care-S8L">Get care</div>
              </div>
              <img className="group-179-ye4" src="./images/group-179-4YC.png" />
              <div className="auto-group-pk4u-JAY">Aha</div>
            </div>
          </div> */}
          <Link to="/profile">
            <div className="group-1261154838-vhi">
              <img
                className="group-1261154072-3GY"
                src="./images/group-1261154072-2y2.png"
                alt="group-1261154072-2y2"
              />
              <p className="back-ZEt mb-0">Back</p>
            </div>
          </Link>
          <div className="auto-group-8tme-hM6 row">
            <div className="col-lg-4 col-md-4">
                <PatientlistSubLeftSec/>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="group-1261154855-pxk">
                <div className="group-1261154854-ZQY">
                  <div className="view-patient-Jsv">View Patient</div>
                  <div className="group-1261154853-RxY">
                    <div className="injuries-Bgp">Injuries</div>
                    <div className="group-1261154804-igk">
                      <div className="group-1261154844-Fgg">
                        <div className="have-you-had-any-injuries-the-past-CM2">
                          Have you had any injuries the past?
                        </div>
                        <div className="auto-group-h2q4-KAk row">
                          <div className="group-1261154843-eyi col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-zXn"
                            />
                            <div className="yes-88C">Yes</div>
                          </div>
                          <div className="group-1261154842-SPn col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-PZv"
                            />
                            <div className="no-XRE">No</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group-1261154853-RxY">
                    <div className="injuries-Bgp">Past Medication</div>
                    <div className="group-1261154804-igk">
                      <div className="group-1261154844-Fgg">
                        <div className="have-you-had-any-injuries-the-past-CM2">
                          Have you been on medications in the past?
                        </div>
                        <div className="auto-group-h2q4-KAk row">
                          <div className="group-1261154843-eyi col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-zXn"
                            />
                            <div className="yes-88C">Yes</div>
                          </div>
                          <div className="group-1261154842-SPn col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-PZv"
                            />
                            <div className="no-XRE">No</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group-1261154853-RxY">
                    <div className="injuries-Bgp">Allergies</div>
                    <div className="group-1261154804-igk">
                      <div className="group-1261154844-Fgg">
                        <div className="have-you-had-any-injuries-the-past-CM2">
                          Are you allergic to anything?
                        </div>
                        <div className="auto-group-h2q4-KAk row">
                          <div className="group-1261154843-eyi col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-zXn"
                            />
                            <div className="yes-88C">Yes</div>
                          </div>
                          <div className="group-1261154842-SPn col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-PZv"
                            />
                            <div className="no-XRE">No</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group-1261154853-RxY">
                    <div className="injuries-Bgp">Chronic Diseases</div>
                    <div className="group-1261154804-igk">
                      <div className="group-1261154844-Fgg">
                        <div className="have-you-had-any-injuries-the-past-CM2">
                          Do you have any chronic diseases?
                        </div>
                        <div className="auto-group-h2q4-KAk row">
                          <div className="group-1261154843-eyi col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-zXn"
                            />
                            <div className="yes-88C">Yes</div>
                          </div>
                          <div className="group-1261154842-SPn col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-PZv"
                            />
                            <div className="no-XRE">No</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group-1261154853-RxY">
                    <div className="injuries-Bgp">Current Medication</div>
                    <div className="group-1261154804-igk">
                      <div className="group-1261154844-Fgg">
                        <div className="have-you-had-any-injuries-the-past-CM2">
                          Are you taking any medicines at the moment?
                        </div>
                        <div className="auto-group-h2q4-KAk row">
                          <div className="group-1261154843-eyi col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-zXn"
                            />
                            <div className="yes-88C">Yes</div>
                          </div>
                          <div className="group-1261154842-SPn col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-PZv"
                            />
                            <div className="no-XRE">No</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group-1261154853-RxY">
                    <div className="injuries-Bgp">Surgeries</div>
                    <div className="group-1261154804-igk">
                      <div className="group-1261154844-Fgg">
                        <div className="have-you-had-any-injuries-the-past-CM2">
                          Did you undergo any surgeries?
                        </div>
                        <div className="auto-group-h2q4-KAk row">
                          <div className="group-1261154843-eyi col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-zXn"
                            />
                            <div className="yes-88C">Yes</div>
                          </div>
                          <div className="group-1261154842-SPn col-lg-3 col-md-3">
                            <input
                              type="radio"
                              name="check"
                              className="radiobtnicon radio-button-PZv"
                            />
                            <div className="no-XRE">No</div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Medical;
