import React, { useState, useEffect, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import RadiologyPopup from "../../Radiology/RadiologyPopup";
import "../../../Style/nusres-list-RH6.css";
import "../../../Style/nusres-list.css";
import backBtnImg from "../../../assets/img/Group 1261154072.png";
import searchIcon from "../../../assets/img/vector-vFW.png";
import vertLine from "../../../assets/img/Line 1.png";
import logo from "../../../assets/img/zawara_select_logo.jpg";
import caleIcon from "../../../assets/img/caleIcon.png";
import Calender from "../../Home/Laboratory/SelectLab/Calender";
import Time from "../../Home/Laboratory/SelectLab/Time";


import moment from "moment";
import { Context } from "../../../Context";



function SelectLabs() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [showDoctorList, setShowDoctorList] = useState([]);
  const [search, setSearch] = useState("");
  
  const [selectedHealthcareName, setSelectedHealthcareName] = useState(null);
  const [selectedHealthcareId, setSelectedHealthcareId] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const { appointmentData, updateAppointmentData, isAuthenticated } =
    useContext(Context);

  const [type, setType] = useState(appointmentData?.Typeofvisit || '');
  const [gender,setGender] = useState(appointmentData?.Gender || '')


  let navigate = useNavigate();

  useEffect(() => {
    fetch("https://zuwara.net/admin/public/api/getHealthcare/26", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: "zwarra_session=8svaEnKXoPHya4NjfgtmI4XABhWqWjVpkmz53q2L",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.Healthcare_records) {
          const formattedData = data.Healthcare_records.map((item) => ({
            id: item.id,
            Enname: item.Enname,
            Arname: item.Arname,
            Typeofservice: item.Typeofservice,
            Location: item.Location,
            Logo: item.Logo,
            Visitfees: item.Visitfees,
          }));
          console.log("Formatted Data: ", formattedData)
          setShowDoctorList(formattedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSelectHealthcare = (id, name, price) => {
    setSelectedHealthcareName(name); // For displaying in UI
    setSelectedHealthcareId(id);
    setSelectedPrice(price);
  };

  // const handlenext = () => {
  //   // Ensure all data is available before updating
  //   if (
  //     selectedHealthcare &&
  //     startDate &&
  //     startTime &&
  //     selectedPrice &&
  //     isAuthenticated
  //   ) {
  //     updateAppointmentData({
  //       // ...appointmentData,
  //       Date: startDate.toISOString().split("T")[0],
  //       Visittype: type,
  //       Timeslot: moment(startTime).format("HH:mm"),
  //       Healthcare: selectedHealthcare,
  //       Price: selectedPrice,
  //     });
  //     navigate("/Adddetails");
  //   }
  // };
  const handlenext = () => {

    // Ensure all data is available before updating
    if (
      selectedHealthcareId &&
      startDate &&
      startTime &&
      selectedPrice &&
      isAuthenticated
    ) {
      updateAppointmentData({
        // ...appointmentData,
        Date: startDate.toISOString().split("T")[0],
        Typeofvisii: type,
        Gender: gender,
        Timeslot: moment(startTime).format("HH:mm"),
        Healthcare: selectedHealthcareId,
        HealthcareName: selectedHealthcareName,
        Price: selectedPrice,
      });
      navigate("/Iqamaadddetails");

    }
};

  const changeTimeFromScroll = (newTime) => {
    setStartTime(newTime);
  };

  const changeDateFromScroll = (date) => {
    setStartDate(date);
    // updateAppointmentData({ Date: date.toISOString().split("T")[0] });
  };

  const setLowToHigh = () => {
    const sortedList = [...showDoctorList].sort(
      (a, b) => a.Visitfees - b.Visitfees
    );
    setShowDoctorList(sortedList);
  };

  const setHighToLow = () => {
    const sortedList = [...showDoctorList].sort(
      (a, b) => b.Visitfees - a.Visitfees
    );
    setShowDoctorList(sortedList);
  };

  const filteredData = showDoctorList.filter((item) =>
    search.toLowerCase() === ""
      ? true
      : item.Enname.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <Navbar />
      <div className="nusres-list-u3z" style={{ marginTop: "60px" }}>
        <div className="group-1261155035-4Fe">
          <div className="group-1261154093-ApU">
             <div className="group-1261154076-tEg" onClick={() => navigate(-1)}> 
           
              <div className="group-1261154076-tEg">
                <img src={backBtnImg} className="group-1261154072-Qyi" alt="backimg" />
                <p
                  className="poppins-medium zw_18 zw_333333"
                  style={{ margin: "0" }}
                >
                  Back
                </p>
              </div>
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
                style={{
                  width: "310px",
                  outline: "none",
                  fontFamily: "Poppins, 'Source Sans Pro'",
                }}
              />
              <img src={vertLine} className="group-1261154962-pT6" alt="vertLine" />
              <img src={searchIcon} className="search-icon-img" alt="searchIcon" />
            </div>

            <div className="group-1261154694-KPr">
              <div className="horizontal-calendar">
                <Calender
                  change={changeDateFromScroll}
                  currentDate={startDate}
                />
              </div>
              <div className="z-date-picker" style={{ width: "14.5rem" }}>
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
              <p className="filters-4da poppins-semibold zw_30 zw_text_color">
                Filters
              </p>
              <p className="price-QBe poppins-semibold zw_title_color zw_16">
                Price
              </p>
              <div className="radio_btn_container">
                <label className="radio_btn_label">
                  <input
                    className="radio-button-4X6"
                    onClick={setLowToHigh}
                    type="radio"
                    name="price"
                  />
                  <span className="radio-button-span poppins-regular zw_14 zw_text_222">
                    Low to High
                  </span>
                </label>
              </div>
              <div className="radio_btn_container">
                <label className="radio_btn_label">
                  <input
                    className="radio-button-4X6"
                    onClick={setHighToLow}
                    type="radio"
                    name="price"
                  />
                  <span className="radio-button-span poppins-regular zw_14 zw_text_222">
                    High to Low
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-5">
              <p className="filters-4da poppins-semibold zw_30 zw_text_color select-gender-gwn">
                Type of visit*
              </p>
 
              <div className="radio_btn_container">
                <label className="radio_btn_label" htmlFor="Visitcenter1">
                  <input
                    className="radio-button-4X6"
                    id="Visitcenter1"
                    type="radio"
                    name="Typeofvisit"
                    value="Visit the center"
                    checked={type === "Visit the center"}
                    onChange={() => setType("Visit the center")}
                  />
                  <span className="radio-button-span poppins-regular zw_14 zw_text_222">
                    Visit the center
                  </span>
                </label>
              </div>
 
              <div className="radio_btn_container">
                <label className="radio_btn_label" htmlFor="homevisit1">
                  <input
                    className="radio-button-4X6"
                    id="homevisit1"
                    type="radio"
                    name="Typeofvisit"
                    value="Home visit"
                    checked={type === "Home visit"}
                    onChange={() => setType("Home visit")}
                  />
                  <span className="radio-button-span poppins-regular zw_14 zw_text_222">
                    Home visit
                  </span>
                </label>
              </div>
            </div>
            <div className="group-1261154656-k2Y mt-3">
              <p className="select-gender-gwn poppins-semibold zw_15 zw_text_color">
                Select gender
              </p>
              <div className="auto-group-hjik-dc8">
                <div className="radio_btn_container">
                  <label className="radio_btn_label">
                    <input
                      className="radio-button-4X6"
                      type="radio"
                      name="Gender"
                      value="Any"
                      checked={gender === "Any"}
                      onChange={() => setGender("Any")}
                    />
                    <span className="radio-button-span poppins-regular zw_14 zw_text_222">
                      Any
                    </span>
                  </label>
                </div>
                <div className="radio_btn_container">
                  <label className="radio_btn_label">
                    <input
                      className="radio-button-4X6"
                      type="radio"
                      name="Gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={() => setGender("Male")}

                    />
                    <span className="radio-button-span poppins-regular zw_14 zw_text_222">
                      Male
                    </span>
                  </label>
                </div>
                <div className="radio_btn_container">
                  <label className="radio_btn_label">
                    <input
                      className="radio-button-4X6"
                      type="radio"
                      name="Gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={() => setGender("Female")}
                    />
                    <span className="radio-button-span poppins-regular zw_14 zw_text_222">
                      Female
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="auto-group-f5yx-byE nusres-list-bdE">
            <div className="auto-group-nbnc-Es6">
              <p className="poppins-semibold zw_30 zw_text_color">SELECT LAB</p>
              {filteredData.length === 0 ? (
                <p
                  className="poppins-medium zw_18 zw_333333"
                  style={{ padding: "20px" }}
                >
                  No results found
                </p>
              ) : (
                filteredData.map((item) => (
                  <div
                    className="group-1261155003-zbN"
                    key={item.id}
                    onClick={() =>
                      handleSelectHealthcare(
                        item.id,
                        item.Enname,
                        item.Visitfees
                      )
                    }
                  >
                    <div className="d-flex select-labs-card sel-doc-slot">
                      {/* <div className="d-flex" style={{ gap: "2rem" }}> */}
                        <img src={`https://zuwara.net/admin/public/uploads/${item.Logo}`} className="logoOnPage" alt="logo" style={{height:'15rem', width:'15rem', objectFit:'cover'}}/>
                        
                      {/* </div> */}
                      <div className='d-flex justify-content-between w-100 px-sm-3 py-3'>
                      <div className="group-1261154733-MI8">
                          <p className="poppins-semibold zw_20 zw_text_color">
                            {item.Enname} {item.Arname}
                          </p>
                          <p className="experience-6-years-zdJ">
                            {item.Typeofservice}-{item.Location}
                          </p>
                          <p className="group-1261154991-jPr">
                            <RadiologyPopup />
                          </p>
                        </div>
                      <div className="d-flex" style={{ gap: "1rem" }}>
                        <img
                          className="line-3-8Rz"
                          src="/images/Line 3.png"
                          alt="Line3"
                        />
                        <div className="group-1261154663-keQ">
                          <p className="price-fmN">Price</p>
                          <p className="sar-9Re">SAR {item.Visitfees}</p>
                          <p className="poppins-semibold zw_10 zw_86909D">
                            Included visit fee
                          </p>
                        </div>
                      </div>
                      </div>
                    </div>
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
                            <div>
                              <Time
                                className="carousel slot time-slot poppins-regular zw_16 zw_text_color "
                                change={changeTimeFromScroll}
                                currentTime={startTime}
                                style={{ border: "black" }}
                              />
                            </div>
                          </p>
                        </div>
                        <div className="d-flex time-slot-select">
                          <div className="desktop-1-s8g">
                            <div className="group-1261154687-QNp m-3">
                              <img
                                className="vector-7o2"
                                src={caleIcon}
                                alt="caleIcon"
                              />
                              <p className="next-day-tue-24-Tbz">
                                Next Day
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div className="sel-cen-con-btn">
              <button
                className="frame-37121-SnY continue-button"
                disabled={!startDate || !startTime}
                onClick={handlenext}
                style={{
                  
                  borderRadius: "0.5rem",
                  color: "#ffffff",
                  height: "5.3rem",
                  width: "300px",
                  border: "none",
                  fontSize: "1.4rem",
                  fontFamily: "Poppins, 'Source Sans Pro'",
                  cursor: !startDate || !startTime ? "not-allowed" : "pointer",
                  background:
                    !startDate || !startTime
                      ? " linear-gradient(90deg, #99354e, #742f5d, #5f3a7e)"
                      : "linear-gradient(100.93deg, #af2245 0%, #602d8a 100%)",
                }}
              >
                Continue
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectLabs;
