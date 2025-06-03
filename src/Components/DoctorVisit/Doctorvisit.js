import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Calender from '../../Home/Laboratory/SelectLab/Calender';
import moment from "moment";
import Time from '../Home/Laboratory/SelectLab/Time';
import Calender from "../Home/Laboratory/SelectLab/Calender.js"
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { data } from '../../Components/Home/Laboratory/Doctorvisitlistfordata';

import backBtnImg from '../../../src/assets/img/Group 1261154072.png';
import searchIcon from '../../../src/assets/img/vector-vFW.png';
import vertLine from '../../../src/assets/img/Line 1.png';
import logo from '../../../src/assets/img/logo-2.png';
import caleIcon from '../../../src/assets/img/caleIcon.png';

function Doctorvisit() {

    const changeDateFromScroll = (date) => {
        setStartDate(date)
    }
    const changeTimeFromScroll = (newTime) => {
        setStartTime(newTime);
    };
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [showDoctorList, setShowDoctorList] = useState(data);
    const [search, setSearch] = useState('');
    let navigate = useNavigate();

    const setLowToHigh = () => {
        const sortedList = data.sort((a, b) => a.price - b.price);
        setShowDoctorList([...sortedList]);
    };

    const setHighToLow = () => {
        const sortedList = data.sort((a, b) => b.price - a.price);
        setShowDoctorList([...sortedList]);
    };

    const filteredList = showDoctorList.filter((item) => {
        return search.toLowerCase() === ''
            ? item
            : item.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <Navbar />
            <div className="nusres-list-u3z" style={{ marginTop: "60px" }}>
                <div className="group-1261155035-4Fe">
                    <div className="group-1261154093-ApU">
                        <div className="group-1261154076-tEg select-location-hover " onClick={() => navigate(-1)}>
                            <img src={backBtnImg} className="group-1261154072-Qyi" alt="Back Button" />
                            <p className="poppins-medium zw_18 zw_333333" style={{ margin: '0' }}>Back</p>
                        </div>
                        <div className="line_indicator_container">
                            <div className="each_line_indicator active"></div>
                            <div className="each_line_indicator active"></div>
                            <div className="each_line_indicator"></div>
                            <div className="each_line_indicator"></div>
                        </div>
                    </div>

                    <div className="auto-group-k2fv-DTJ">
                        <div className="frame-37120-mUp">
                            <input
                                type="text"
                                placeholder="Search your lab tests & Packages"
                                className="poppins-reguler zw_14 zw_999999"
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ width: "310px", outline: "none", fontFamily: "Poppins, 'Source Sans Pro'" }}
                            />
                            <img src={vertLine} className="group-1261154962-pT6" alt="Vertical Line" />
                            <img src={searchIcon} className="search-icon-img" alt="Search Icon" />
                        </div>

                        <div className="group-1261154694-KPr">
                            <div className="horizontal-calendar">
                                <Calender change={changeDateFromScroll} currentDate={startDate} />
                            </div>
                            <div className="z-date-picker" style={{ width: '14.5rem' }}>
                                <i className="fa fa-calendar z-cal" aria-hidden="true"></i>
                                <DatePicker
                                    className="custom-input poppins-regular zw_16 zw_text_color"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    minDate={new Date()}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auto-group-quuj-e44">
                    <div className="group-1261154989-ksn">
                        <div>
                            <p className="filters-4da poppins-semibold zw_30 zw_text_color">Filters</p>
                            <p className="price-QBe poppins-semibold zw_title_color zw_16">Price</p>
                            <div className="radio_btn_container">
                                <label className="radio_btn_label">
                                    <input
                                        className="radio-button-4X6"
                                        onClick={setLowToHigh}
                                        type="radio"
                                        name="LowtoHigh"
                                        id="exampleRadios1"
                                    />
                                    <span className="radio-button-span poppins-regular zw_16 zw_text_222">Low to High</span>
                                </label>
                            </div>
                            <div className="radio_btn_container">
                                <label className="radio_btn_label">
                                    <input
                                        className="radio-button-4X6"
                                        onClick={setHighToLow}
                                        type="radio"
                                        name="LowtoHigh"
                                        id="exampleRadios1"
                                    />
                                    <span className="radio-button-span poppins-regular zw_16 zw_text_222">High to Low</span>
                                </label>
                            </div>
                        </div>
                        <div className="group-1261154656-k2Y">
                            <p className="select-gender-gwn poppins-semibold zw_15 zw_text_color">Select gender</p>
                            <div className="auto-group-hjik-dc8">
                                <div className="radio_btn_container">
                                    <label className="radio_btn_label">
                                        <input className="radio-button-4X6" type="radio" name="Selectgender" id="exampleRadios1" />
                                        <span className="radio-button-span poppins-regular zw_16 zw_text_222">Any</span>
                                    </label>
                                </div>
                                <div className="radio_btn_container">
                                    <label className="radio_btn_label">
                                        <input className="radio-button-4X6" type="radio" name="Selectgender" id="exampleRadios1" />
                                        <span className="radio-button-span poppins-regular zw_16 zw_text_222">Male</span>
                                    </label>
                                </div>
                                <div className="radio_btn_container">
                                    <label className="radio_btn_label">
                                        <input className="radio-button-4X6" type="radio" name="Selectgender" id="exampleRadios1" />
                                        <span className="radio-button-span poppins-regular zw_16 zw_text_222">Female</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="auto-group-f5yx-byE nusres-list-bdE">

                        <div className="auto-group-nbnc-Es6">
                            <p className="poppins-semibold zw_30 zw_text_color">SELECT DOCTOR</p>

                            {filteredList.length === 0 ? (
                                <div className='no-data-found'>
                                    <p className="no-results poppins-regular zw_16 zw_text_color">No results found</p>
                                </div>
                            ) : (
                                filteredList.map((item) => (
                                    <div className="group-1261155003-zbN" key={item.id}>

                                        <div className='d-flex select-labs-card sel-doc-slot'>

                                            {/* <div className='d-flex justify-content-between w-100'> */}
                                            {/* <div className='d-flex'> */}
                                                {/* <div> */}
                                                    <img src={item.logo} className='logoOnPage' alt=''></img>

                                                {/* </div> */}


                                            {/* </div> */}
                                            <div className='d-flex justify-content-between w-100 px-sm-3 py-3'>
                                                <div>
                                                    <p className="dr-sarah-mitchell-FBr">{item.name}</p>
                                                    <p className="experience-6-years-zdJ" style={{ color: "black" }}>{item.designation}</p>
                                                    <p className="experience-6-years-zdJ">{item.experience}</p>

                                                    <p className="dr-sarah-mitchell-FBr" style={{ textDecoration: "underline" }}>{item.telemedicine}</p>
                                                </div>
                                                <div className='d-flex' style={{ gap: '2rem' }}>

                                                    <img className="line-3-8Rz" src="/images/Line 3.png" alt='' />
                                                    <div className="group-1261154663-keQ">
                                                        <p className="price-fmN">Price</p>
                                                        <p className="sar-9Re">SAR {item.price}</p>

                                                        <p className='poppins-semibold zw_10 zw_86909D'>Included visit fee</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="time-slider-box">

                                            <div className="group-1261154689-Vvk">
                                                <div className="carousel-slide">
                                                    <p className="carousel slot poppins-regular zw_16 zw_text_color">

                                                        <Time
                                                            className="carousel slot time-slot poppins-regular zw_16 zw_text_color "
                                                            change={changeTimeFromScroll}
                                                            currentTime={startTime}
                                                            style={{ border: "black" }}
                                                        />
                                                    </p>
                                                </div>
                                                <div className='d-flex time-slot-select'>
                                                    <div className="desktop-1-s8g">
                                                        <div className="group-1261154687-QNp m-3" >
                                                            <img className="vector-7o2" src={caleIcon} alt="" />
                                                            <p className="next-day-tue-24-Tbz" >Next day</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                ))
                            )}
                            <div className='sel-cen-con-btn'>
                            <Link to="/Adddetails">
                                <button className="button-frame-cont  poppins-regular" disabled={startTime === '' && true} >Continue</button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Doctorvisit;
