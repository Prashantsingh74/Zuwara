import React, {useContext} from "react";
import "../../../Style/LifeStyle.css";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import { Link } from "react-router-dom";
import { Context } from "../../../Context";
import PatientlistSubLeftSec from "./PatientlistSubLeftSec";

function LifeStyle() {
    const {username}  = useContext(Context);

    return (
        <div>
             <Navbar />
            <div className="patient-profile-view-fzk">
                <div className="auto-group-rktc-ykY container">
                    
                    <Link to="/profile">
                        <div className="group-1261154838-vDr">
                            <img
                                className="group-1261154072-EEY"
                                src="./images/group-1261154072-2y2.png"
                                alt="group-1261154072-2y2"
                            />
                            <p className="back-w8x m-0">Back</p>
                        </div>
                    </Link>
                    <div className="auto-group-rv4y-Tsz row">
                        
                        <div className="col-lg-4 col-md-4">
                            <PatientlistSubLeftSec/>
                        </div>
                        <div className="col-lg-8 col-md-8">
                            <div className="auto-group-qnds-Ctk">
                                <div className="view-patient-KiU poppins-semibold zw_16 zw_text_color">
                                    View patient
                                </div>
                                <div className="auto-group-qnds-Ctkk">
                                    <form>
                                        <div className="zw_16 zw_text_color poppins-regular mb-2">
                                            Smoking Habits
                                        </div>
                                        <div>
                                            <select className="poppins-regular px-4 zw_text_color life-style-selectfi">
                                                <option>Select</option>
                                                <option>10 Days</option>
                                                <option>1-2 Day</option>
                                                <option>2-3 Days</option>
                                                <option>I used to,but i have quit</option>
                                                <option>Don,t smoke</option>
                                            </select>
                                        </div>

                                        <div className="my-5">
                                            <div className="zw_16 zw_text_color poppins-regular mb-2">
                                                Activity Level
                                            </div>
                                            <select className="poppins-regular px-4 zw_text_color life-style-selectfi">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                        <div className="my-5">
                                            <div className="zw_16 zw_text_color poppins-regular mb-2">
                                                Food Preference
                                            </div>
                                            <select className="poppins-regular px-4 zw_text_color life-style-selectfi">
                                                <option>Select</option>
                                            </select>
                                        </div>
                                        <div className="my-5">
                                            <div className="zw_16 zw_text_color poppins-regular mb-2">
                                                Occupation
                                            </div>
                                            <select className="poppins-regular px-4 zw_text_color life-style-selectfi">
                                                <option>Select</option>
                                            </select>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <button className="poppins-semibold zw_16 zw_text_fff zw_bg_gradient border-0 rounded-3" style={{ height: '53px', width: '39%' }}>Save</button>
                                        </div>
                                    </form>
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

export default LifeStyle;
