import React, { useState, useContext, useEffect } from "react";
import "../../../Style/payment.css";
//import { data } from '../../../Components/Home/Laboratory/paymentData.js'
import backArrrow from "./../../../assets/img/Group 1261154072.png";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import promoIcon from "./../../../assets/img/group-1261154767.png";
import tamaraIcon from "./../../../assets/img/image-79.png";
import tabbyIcon from "./../../../assets/img/image-80.png";
import appleIcon from "./../../../assets/img/image-83.png";
import cardPayimg81 from "./../../../assets/img/image-81.png";
import cardPayimg84 from "./../../../assets/img/image-84.png";
import cardPayimg82 from "./../../../assets/img/image-82.png";
import cardPayimg85 from "./../../../assets/img/image-85.png";
import cardPayimg86 from "./../../../assets/img/image-86.png";
import { useNavigate } from "react-router-dom";
import Paymentdetails from "./Paymentdetails";
import { Context } from "../../../Context.js";
import logo from "../../../assets/img/zawara_select_logo.jpg";
import locIcon from "./../../../assets/img/location.png";
// import locIcon from './../../../../public/images/location.png';
import calIcon from "./../../../assets/img/vector-H2U.png";

const formatDate = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

function Payment() {
  const [showPopup, setShowPopup] = useState(false);
  const { userDetails, PatientName, appointmentData } = useContext(Context);
  const [totalAmount, setTotalAmount] = useState(0);

  const homeVisitFee = 100;
  const vatPercentage = 0.2; // VAT is 20%
  let navigate = useNavigate();
  // Calculate VAT
  const calculateVAT = (amount) => {
    return amount * vatPercentage;
  };

  // let subservices = [];
  // try {
  //     subservices = JSON.parse(appointmentData.Subservices || '[]');
  // } catch (error) {
  //     console.error('Error parsing JSON:', error);
  // }
  // const subservicesText = subservices.join(', ');
  let subservicesText1 = "";
  try {
    const subservices = JSON.parse(appointmentData.Subservices || "[]");
    subservicesText1 = subservices.map((service) => service.name).join(", ");
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  // Calculate total amount
  const calculateTotalAmount = (packageAmount) => {
    const vatAmount = calculateVAT(packageAmount + homeVisitFee);
    return packageAmount + homeVisitFee + vatAmount;
  };

  useEffect(() => {
    if (appointmentData && appointmentData.Price) {
      const packageAmount = appointmentData.Price;
      setTotalAmount(calculateTotalAmount(packageAmount));
    }
  }, [appointmentData]);

  const appointmentDate = appointmentData.Date;
  const formattedDate = formatDate(appointmentDate);

  const handlePaymentMethodChange = (event) => {
    // Check if "Split into 3 payments" option is selected
    if (event.target.value === "split") {
      // If selected, show the popup
      setShowPopup(true);
    } else {
      // If any other option is selected, hide the popup
      setShowPopup(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="payment-mxg" style={{ marginTop: "90px" }}>
        <div className="group-1261154697-tnQ">
          <div className="group-1261154093-zqS">
            {/* <div className="group-1261154076-Kcp" data-bs-toggle="modal" data-bs-target="#Cancel">
                            <img className="group-1261154072-sPS" src="./assets/group-1261154072-N5S.png" alt='' />
                            
                            <p className="back-xvg">Back</p>
                        </div> */}
            <div className="group-1261154076-Kcp" onClick={() => navigate(-1)}>
              <img
                src={backArrrow}
                className="group-1261154072-sPS"
                alt=""
              ></img>
              <p className="poppins-medium zw_18 zw_333333">Back</p>
            </div>

            <div className="line_indicator_container">
              <div className="each_line_indicator active"></div>
              <div className="each_line_indicator active"></div>
              <div className="each_line_indicator active"></div>
              <div className="each_line_indicator active"></div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-md-6 first-card">
              <div className="card first-pay-card p-5">
                <div className="">
                  {
                    // data.map((gitem) => {
                    //     return (
                    <div className="">
                      <div className="d-flex">
                        {/* <img className="logo-9Qp" src="./assets/img/logo-hLY.png" alt='' /> */}
                        <div className="">
                          <img src={logo} className="logo-9Qp"></img>
                        </div>
                        <div className="ms-3 d-flex align-items-center ">
                          <div className="group-1261154716-4Gt">
                            <p className="poppins-medium zw_text_color zw_30 mb-2">
                              {appointmentData.HealthcareName}
                            </p>
                            <p className="poppins-medium zw_text_color zw_16"></p>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12 col-md-6">
                          <p className="laboratory-m4p poppins-medium zw_title_color zw_24">
                            {appointmentData.Servicename}
                          </p>
                          <p className="poppins-regular zw_16 zw_999999">
                            {subservicesText1}
                          </p>
                        </div>
                        <div className="col-12 col-md-6 datee">
                          <img
                            src={calIcon}
                            className="mr-4"
                            width={"24px"}
                            style={{ marginRight: "15px" }}
                          ></img>
                          <span className="poppins-medium zw_text_color zw_16">
                            {formattedDate}-{appointmentData.Timeslot}
                          </span>
                        </div>
                        {userDetails.map((pitem, index) => (
                          <div className="col-12" key={index}>
                            <p className="poppins-medium zw_text_color zw_18">
                              {" "}
                              {pitem.username}{" "}
                            </p>
                          </div>
                        ))}
                        {/* {PatientName.map((pitem, index) => (
                                            <div className='col-12' key={index}>
                                                <p className="poppins-medium zw_text_color zw_18"> {pitem.Firstname} {pitem.Lastname}</p>
                                            </div>
                                        ))} */}
                        <div className="col-12 mt-4 d-flex align-items-center">
                          <img
                            src={locIcon}
                            className="mr-4"
                            height={"30px"}
                            style={{ marginRight: "15px" }}
                          ></img>
                          <p className="poppins-medium zw_text_color zw_16 mb-0">
                            {appointmentData.Address}
                          </p>
                        </div>
                      </div>
                    </div>

                    //     )
                    // })
                  }
                </div>
              </div>

              <div className="sec-card">
                <div className="card sec-pay-card mt-3">
                  <div className="input-group mb-3 sec-evr-card">
                    <div className="group-1261154735-nvx">
                      <img
                        src={promoIcon}
                        className="group-1261154767-vXN"
                        alt=""
                        style={{ width: "40px", marginRight: "14px" }}
                      ></img>
                      <input
                        className="poppins-medium zw_text_color zw_18 w-auto"
                        placeholder="Add Promo code Here"
                      ></input>
                    </div>
                    <button
                      type="button"
                      className="poppins-medium zw_title_color zw_18"
                      style={{
                        background: "transparent",
                        border: "none",
                        marginLeft: "100px",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center sec-evr-card">
                    <p
                      className="poppins-medium zw_text_color zw_18"
                      style={{ margin: "0" }}
                    >
                      SAR 0 Use wallet balance
                    </p>

                    <label class="switch">
                      <input type="checkbox"></input>
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <div className="payment-option sec-evr-card">
                    <p className="poppins-medium zw_text_color zw_18">
                      Pay with qitaf point
                    </p>
                    <img
                      className="vector-Znc"
                      src="./images/vector-xzQ.png"
                      alt=""
                    />
                  </div>
                  <div className="payment-option sec-evr-card">
                    <p
                      className="poppins-medium zw_text_color zw_18"
                      style={{ margin: "0" }}
                    >
                      Pay with qitaf point
                    </p>
                    <img
                      className="vector-Znc"
                      src="/images/vector-xzQ.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 third-card">
              <p className="poppins-medium zw_title_color zw_24 py-3 ms-3">
                Select Payment Method
              </p>
              <div className="card p-0">
                <div className="group-1261154745-d3i d-flex justify-content-between sec-evr-card ">
                  <div className="radio_btn_container mb-0 group-1261154734-ApL">
                    <label className="radio_btn_label">
                      <input
                        className="radio-button-4X6 form-check-input radio_pos"
                        value={""}
                        type="radio"
                        name={"Selectgender"}
                        id="exampleRadios1"
                      />
                      <span className="radio-button-span poppins-medium zw_text_color zw_18 padd-left">
                        Split into 3 payments
                      </span>
                    </label>
                  </div>
                  <img src={tamaraIcon} className="image-79-n52"></img>
                </div>

                <div className="group-1261154746-boA d-flex justify-content-between sec-evr-card">
                  <div className="radio_btn_container mb-0 group-1261154735-xdi">
                    <label className="radio_btn_label">
                      <input
                        className="radio-button-4X6 form-check-input radio_pos"
                        value={""}
                        type="radio"
                        name={"Selectgender"}
                        id="exampleRadios1"
                      />
                      <span className="radio-button-span poppins-medium zw_text_color zw_18 padd-left">
                        4 interests-free payment
                      </span>
                    </label>
                  </div>
                  <img src={tabbyIcon} className="image-79-n52"></img>
                </div>

                <div className="group-1261154750-ANQ d-flex justify-content-between sec-evr-card">
                  <div className="radio_btn_container mb-0 group-1261154735-iep">
                    <label className="radio_btn_label">
                      <input
                        className="radio-button-4X6 form-check-input radio_pos"
                        value={""}
                        type="radio"
                        name={"Selectgender"}
                        id="exampleRadios1"
                      />
                      <span className="radio-button-span poppins-medium zw_text_color zw_18 padd-left">
                        Apple Pay
                      </span>
                    </label>
                  </div>
                  <img src={appleIcon} className="image-79-n52"></img>
                </div>

                <div className="group-1261154751-9Nk d-flex justify-content-between sec-evr-card">
                  <div className="radio_btn_container mb-0 group-1261154735-VhW">
                    <div
                      className="radio_btn_container mb-0 group-1261154735-VhW"
                      data-bs-toggle="modal"
                      data-bs-target="#Paymentdetails"
                    >
                      <label className="radio_btn_label">
                        <input
                          className="radio-button-4X6 form-check-input radio_pos"
                          value={""}
                          type="radio"
                          name={"Selectgender"}
                          id="exampleRadios1"
                        />
                        <span className="radio-button-span poppins-medium zw_text_color zw_18 padd-left">
                          Card Payment
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="auto-group-46ep-Y9z">
                    <img src={cardPayimg81} className="image-81-fVW mb-4"></img>
                    <img src={cardPayimg84} className="image-84-zng mb-4"></img>
                    <img src={cardPayimg82} className="image-82-YZJ mb-4"></img>
                    <img src={cardPayimg85} className="image-85-6Kv mb-4"></img>
                    <img src={cardPayimg86} className="image-86-Cdr mb-4"></img>
                  </div>
                  
                </div>
                <Paymentdetails />

                <div className="price-pack-sec p-5">
                  <p className="poppins-medium zw_title_color zw_18">
                    Price Breakup
                  </p>
                  <p className="poppins-medium zw_text_color zw_18">
                    Selected Package
                  </p>
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <td className="poppins-regular zw_16 zw_999999">
                          {subservicesText1}
                        </td>
                        <td className="poppins-medium zw_16 text-end">
                          SAR {appointmentData.Price}
                        </td>
                      </tr>
                      <tr>
                        <td className="poppins-regular zw_16 zw_999999">
                          Home Visit Fee
                        </td>
                        <td className="poppins-medium zw_16 text-end">
                          SAR 100
                        </td>
                      </tr>
                      <tr>
                        <td className="poppins-regular zw_16 zw_999999">
                          VAT
                          <span className="zw_title_color">(+)</span>
                        </td>
                        <td
                          className="poppins-medium zw_16 text-end"
                          style={{ width: "11rem" }}
                        >
                          SAR{" "}
                          {calculateVAT(
                            appointmentData.Price + homeVisitFee
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="amount-pay-btn">
                    <p className="poppins-regular zw_text_fff zw_15">
                      Amount payable
                    </p>
                    <p className="poppins-medium zw_18 zw_text_fff m-l">
                      SAR {totalAmount.toFixed(2)}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="group-1261154783-zX6 pt-4 mt-5">
          <div className="container-fluid">
            <div className="d-flex justify-content-around">
              <div className="">
                <div className="group-1261154782-ue4">
                  <div className="group-1261154778-Tfa">
                    <div className="ellipse-89-tVz">
                      <p className="c-ydv poppins-medium zw_text_fff mt-0">
                        C
                      </p>
                    </div>
                  </div>
                  <p className="poppins-medium zw_text_fff payment-footer">
                    2024 zwaara LLC
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="group-1261154780-kYC">
                  <p className="poppins-medium zw_text_fff payment-footer">
                    Privacy Policy
                  </p>
                  <p className="poppins-medium zw_text_fff payment-footer">
                    Terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          {/* Add your content for the popup here */}
          <p>Details regarding split 3 payments...</p>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Payment;
