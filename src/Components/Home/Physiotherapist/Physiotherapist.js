
import React, { useState } from 'react'
import Navbar from '../../Layout/Navbar.js';
import Footer from '../../Layout/Footer.js';
import '../../../Style/nusres-list-RH6.css'
import '../../../Style/nusres-list.css';
import { data } from '../Laboratory/Physiodata.js';
import { Link, useNavigate } from "react-router-dom";
import Calender from "../../Home/Laboratory/SelectLab/Calender.js"
import DatePicker from "react-datepicker";
import backBtnImg from './../../../assets/img/Group 1261154072.png';
import searchIcon from './../../../assets/img/vector-vFW.png';
import vertLine from './../../../assets/img/Line 1.png';
import logo from './../../../assets/img/doctor.png';
import caleIcon from './../../../assets/img/caleIcon.png';
import RadiologyPopup from './../../Radiology/RadiologyPopup';
import moment from "moment";
import Time from '../../Home/Laboratory/SelectLab/Time';

function Physiotherapist() {
    const changeDateFromScroll = (date) => {
        setStartDate(date)
    }
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const changeTimeFromScroll = (newTime) => {
        setStartTime(newTime);
    };

    const [, setShowDoctorList] = useState(data);
    const [Search, setSearch] = useState('');
    let navigate = useNavigate();

    const setLowToHigh = () => {
        const sortedVaccination_DoctorList = data.sort((a, b) => a.price - b.price);
        setShowDoctorList([...sortedVaccination_DoctorList]);
    };
    const setHighToLow = () => {
        const reverseSortedVaccination_DoctorList = data.sort((a, b) => b.price - a.price);
        setShowDoctorList([...reverseSortedVaccination_DoctorList]);
    };
    return (
        <div>
            <div>
                <Navbar />
                <div className="nusres-list-u3z" style={{ marginTop: "60px" }}>

                    <div className="group-1261155035-4Fe">
                        <div className="group-1261154093-ApU">
                            <div className="group-1261154076-tEg" onClick={() => navigate(-1)}>
                                {/* <img className="group-1261154072-Qyi" src="./././assets/img/Group 1261154072.png" alt='' /> */}
                                <img src={backBtnImg} className='group-1261154072-Qyi' alt='' />
                                <p className="poppins-medium zw_18 zw_333333" style={{ margin: '0' }}>Back</p>
                            </div>
                            <div className="line_indicator_container">
                                <div className="each_line_indicator active">
                                </div>
                                <div className="each_line_indicator active">
                                </div>
                                <div className="each_line_indicator">
                                </div>
                                <div className="each_line_indicator">
                                </div>
                            </div>
                        </div>

                        {/* <p className="poppins-semibold zw_34 zw_text_color">E- Clinics</p> */}
                        <div className="auto-group-k2fv-DTJ">
                            <div className="frame-37120-mUp">
                                <input type="text" placeholder="Search your lab tests &amp; Packages" className="poppins-reguler zw_14 zw_999999" onChange={(e) => setSearch(e.target.value)} style={{ width: "310px", outline: "none", fontFamily: "Poppins, 'Source Sans Pro'" }} />
                                {/* <img className="group-1261154962-pT6" src="./../../../assets/img/group-1261154962-kz8.png" alt='' /> */}
                                <img src={vertLine} className='group-1261154962-pT6' alt=''></img>
                                <img src={searchIcon} className='search-icon-img' alt=''></img>
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
                                <div className='radio_btn_container'>
                                    <label className="radio_btn_label">
                                        <input className="radio-button-4X6" value={""} onClick={setLowToHigh} type="radio" name={"LowtoHigh"} id="exampleRadios1" />
                                        <span className='radio-button-span poppins-regular zw_16 zw_text_222'>Low to High</span>
                                    </label>
                                </div>
                                {/* <div className="group-1261154903-8dS">
                    <input className="radio-button-4X6" value='low' onClick={setLowToHigh} type="radio" name="exampleRadios" id="exampleRadios1" />
                    <label className="low-to-high-CdJ">
                        Low to High
                    </label>
                </div> */}
                                <div className='radio_btn_container'>
                                    <label className="radio_btn_label">
                                        <input className="radio-button-4X6" value={""} onClick={setHighToLow} type="radio" name={"LowtoHigh"} id="exampleRadios1" />
                                        <span className='radio-button-span poppins-regular zw_16 zw_text_222'>High to Low</span>
                                    </label>
                                </div>
                            </div>
                            {/* <div className="group-1261154655-8Wx">
                    <input className="radio-button-Tp8" value='high' onClick={setHighToLow} type="radio" name="exampleRadios" id="exampleRadios1" />
                    <label className="high-to-low-1ak">
                        High to Low
                    </label>
                    <img className="radio-button-Tp8" src="./assets/radio-button-WTW.png" alt='' />
                    <p className="high-to-low-1ak">High to low</p>
                </div> */}
                            <div className="group-1261154656-k2Y">
                                <p className="select-gender-gwn poppins-semibold zw_15 zw_text_color">Select gender</p>
                                <div className="auto-group-hjik-dc8">
                                    <div className='radio_btn_container'>
                                        <label className="radio_btn_label">
                                            <input className="radio-button-4X6" value={""} type="radio" name={"Selectgender"} id="exampleRadios1" />
                                            <span className='radio-button-span poppins-regular zw_16 zw_text_222'>Any</span>
                                        </label>
                                    </div>
                                    {/* <div className="group-1261154655-71W">
                            <input className="radio-button-qTJ" type="radio" id="male" name="gender" value="1"></input>
                            <label for="male" className="form-check-label">
                                <i className="male-Ny2"></i> Any
                            </label>
                        </div> */}
                                    {/* <p className="any-NJp">Any</p> */}
                                    <div className='radio_btn_container'>
                                        <label className="radio_btn_label">
                                            <input className="radio-button-4X6" value={""} type="radio" name={"Selectgender"} id="exampleRadios1" />
                                            <span className='radio-button-span poppins-regular zw_16 zw_text_222'>Male</span>
                                        </label>
                                    </div>
                                    {/* <div className="group-1261154655-71W">
                            <input className="radio-button-qTJ" type="radio" id="male" name="gender" value="1"></input>
                            <label for="male" className="form-check-label">
                                <i className="male-Ny2"></i> Male
                            </label>
                        </div> */}
                                    {/* <div className="group-1261154655-71W">
                            <img className="radio-button-qTJ" src="./assets/radio-button-Hzk.png" alt='' />
                            <p className="male-Ny2">Male</p>
                        </div> */}
                                    <div className='radio_btn_container'>
                                        <label className="radio_btn_label">
                                            <input className="radio-button-4X6" value={""} type="radio" name={"Selectgender"} id="exampleRadios1" />
                                            <span className='radio-button-span poppins-regular zw_16 zw_text_222'>Female</span>
                                        </label>
                                    </div>
                                    {/* <div className="group-1261154655-71W">
                            <input className="radio-button-qTJ" type="radio" id="male" name="gender" value="1"></input>
                            <label for="male" className="form-check-label">
                                <i className="male-Ny2"></i> Female
                            </label>
                        </div> */}
                                    {/* <div className="group-1261154656-i1J">
                            <img className="radio-button-4L4" src="./assets/radio-button-Hyv.png" alt='' />
                            <p className="female-zzQ">Female</p>
                        </div> */}
                                </div>
                            </div>
                        </div>





                        <div className="auto-group-f5yx-byE nusres-list-bdE" >


                            {/* <div className="auto-group-f5yx-byE"> */}
                            <div className="auto-group-nbnc-Es6">
                                <p className='sel_lab poppins-semibold zw_30 zw_text_color'>SELECT DOCTOR</p>
                                {data.filter((item) => {
                                    return Search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(Search)
                                }).map((item) => (
                                    <div className="group-1261155003-zbN" key={item.id}>
                                        {/* <div className="group-1261154661-8xU">
                                    <div className="logo-r7n">
                                    </div>
                                </div> */}
                                        {/* <div className="group-1261154922-aJg "> */}
                                        <div className='d-flex select-labs-card sel-doc-slot'>


                                            {/* <div className='d-flex'> */}
                                            {/* <div className='d-flex' style={{ gap: '2rem' }}> */}
                                            <img src={logo} className='logoOnPage' alt='logo' style={{ objectFit: 'cover' }} />

                                            {/* </div> */}


                                            {/* </div> */}
                                            <div className='d-flex justify-content-between w-100 px-sm-3 py-3'>
                                                <div>
                                                    <p className="dr-sarah-mitchell-FBr">{item.name}</p>
                                                    <p className="experience-6-years-zdJ" style={{ color: "black" }}>{item.designation}</p>
                                                    <p className="experience-6-years-zdJ"> Experience:{item.experience}</p>
                                                    <p className="group-1261154991-jPr"><RadiologyPopup /></p>
                                                </div>
                                                <div className='d-flex' style={{ gap: '2rem' }}>

                                                    <img className="line-3-8Rz" src="/images/Line 3.png" alt='' />
                                                    <div className="group-1261154663-keQ">
                                                        <p className="price-fmN">Price</p>
                                                        {/* <div className="group-1261154662-Qyr"> */}
                                                        <p className="sar-9Re">SAR {item.price}</p>
                                                        {/* <p className="item-540-H24"></p> */}
                                                        {/* </div> */}
                                                        <p className='poppins-semibold zw_10 zw_86909D'>Included visit fee</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* <div className="rectangle-39553-bgx">
                                    </div> */}
                                        {/* <div className="line-3-8Rz">
                                    </div> */}
                                        <div className="time-slider-box">
                                            {/* <div style={{ display: 'flex', float: 'right' }}>
                                                <div className="desktop-1-s8g"></div>
                                            </div> */}
                                            {/* <div className="group-1261154689-Vvk">
                                                <div className="carousel-slide">
                                                    <p className="carousel slot time-slot poppins-regular zw_16 zw_text_color" >
                                                        <Time className="carousel slot time-slot poppins-regular zw_16 zw_text_color" change={changeTimeFromScroll} currentTime={startTime} />

                                                    </p>
                                                </div>
                                                <div className="group-1261154687-QNp">
                                                    <img className="vector-7o2" src={caleIcon} alt='' />
                                                    <p className="next-day-tue-24-Tbz">Next day tue 24</p>
                                                </div>
                                            </div> */}
                                            <div className="group-1261154689-Vvk">
                                                <div className="carousel-slide">
                                                    <p className="carousel slot poppins-regular zw_16 zw_text_color">
                                                        {/* <div style={{ display: 'flex', float: 'right' }}>
                                                            <div className="desktop-1-s8g"></div>
                                                        </div> */}
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
                                            {/* <LoginPopup />
                                            <Signup />
                                            <AccountSetup_details />
                                            <AccountSetup_gender />
                                            <AccountSetup_captcha />
                                            {/* <Accountsetup_Bdate /> */}
                                            {/* <OTP />
                                            <Accountsetup_success /> */}
                                        </div>

                                        {/* </div> */}
                                    </div>
                                ))}
                                <Link to="/Adddetails">
                                    <button className="frame-37121-SnY" disabled={startTime === '' && true} style={{ background: "linear-gradient(100.93deg, #af2245 0%, #602d8a 100%)", borderRadius: "0.5rem", color: "#ffffff", height: "5.3rem", width: "300px", border: "none", fontSize: "1.4rem", fontFamily: "Poppins, 'Source Sans Pro'" }}>Continue</button>
                                </Link>
                            </div>

                            {/* </div> */}

                        </div>








                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Physiotherapist
