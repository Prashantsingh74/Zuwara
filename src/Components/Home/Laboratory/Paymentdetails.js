import React, { useState, useContext } from "react";
import "../../../Style/payment-details.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../Context";

function Paymentdetails() {
  const [cardHolderName, setCardHolderName] = useState("");
  const [error, setError] = useState(false);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [month, setMonth] = useState("");
  const [monthError, setMonthError] = useState(false);
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState(false);
  const [cvv, setCVV] = useState("");
  const [cvvError, setCVVError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { signupFormData, appointmentData, paymentData } = useContext(Context);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      setCardHolderName(value);
      setError(value.trim() === "");
    }
  };

  const handleNumberChange = (event) => {
    const inputNumber = event.target.value.replace(/\D/g, "");
    setNumber(inputNumber);
    setNumberError(inputNumber.trim().length !== 16);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (
  //     cardHolderName.trim() === "" ||
  //     number.trim().length !== 16 ||
  //     month.trim().length !== 2 ||
  //     isNaN(month) ||
  //     parseInt(month) < 1 ||
  //     parseInt(month) > 12 ||
  //     year.trim().length !== 2 ||
  //     isNaN(year) ||
  //     parseInt(year) < 20 ||
  //     parseInt(year) > 60 ||
  //     cvv.trim().length !== 3 ||
  //     isNaN(cvv)
  //   ) {
  //     return;
  //   }
  // };

  const handleMonthChange = (event) => {
    const inputMonth = event.target.value;
    setMonth(inputMonth);
    setMonthError(
      inputMonth.trim().length !== 2 ||
        isNaN(inputMonth) ||
        parseInt(inputMonth) < 1 ||
        parseInt(inputMonth) > 12
    );
  };

  const handleYearChange = (event) => {
    const inputYear = event.target.value;
    setYear(inputYear);
    setYearError(
      inputYear.trim().length !== 2 ||
        isNaN(inputYear) ||
        parseInt(inputYear) < 20 ||
        parseInt(inputYear) > 60
    );
  };

  const handleCVVChange = (event) => {
    const inputCVV = event.target.value;
    setCVV(inputCVV);
    setCVVError(inputCVV.trim().length !== 3 || isNaN(inputCVV));
  };

  const handleCloseModal = () => {
    if (
      cardHolderName.trim() === "" ||
      number.trim().length !== 16 ||
      month.trim().length !== 2 ||
      isNaN(month) ||
      parseInt(month) < 1 ||
      parseInt(month) > 12 ||
      year.trim().length !== 2 ||
      isNaN(year) ||
      parseInt(year) < 20 ||
      parseInt(year) > 60 ||
      cvv.trim().length !== 3 ||
      isNaN(cvv)
    ) {
      return (
        setError(true),
        setNumberError(true),
        setMonthError(true),
        setYearError(true),
        setCVVError(true)
      );
    }

    setIsModalOpen(false);
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      cardHolderName,
      number,
      month,
      year,
      cvv,
    });

    const formData = new FormData();
    // formData.append('transacationid', 'trab1');
    formData.append("servicename", appointmentData.Servicename);
    formData.append("packagename", appointmentData.Subservices);
    // formData.append('subservicename', appointmentData.Subservices);
    formData.append("firstname", signupFormData.Firstname);
    formData.append("lastname", signupFormData.Lastname);
    formData.append("email", signupFormData.Email);
    formData.append("phone", signupFormData.Phone);
    formData.append("address", appointmentData.Address);
    formData.append("country", signupFormData.Country);
    formData.append("paymentdate", new Date().toISOString().split("T")[0]);
    formData.append("bookingdate", appointmentData.Date);
    formData.append("timeslot", appointmentData.Timeslot);
    formData.append("price", appointmentData.Price);
    formData.append("paymentmethod", paymentData.paymentmethod);
    formData.append("cardholdername", cardHolderName);
    formData.append("cardno", number);
    formData.append("cardexpdate", `${month}/${year}`);
    formData.append("cvvno", cvv);
    // formData.append('description', appointmentData.Description);

    try {
      console.log("Sending request");
      const response = await fetch(
        "https://zuwara.net/admin/public/api/storepayment",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Payment stored successfully:", result);
        setIsModalOpen(false);
        navigate("/");
      } else {
        console.error("Error storing payment:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="zw_popup" onClick={handleCloseModal}>
          <div
            className="modal fade zw_Healthpackage"
            id="Paymentdetails"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
            onClick={handleModalClick}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-dialogg"
              role="document"
            >
              <div className="modal-content rounded-5">
                <div className="modal-body">
                  <div className="btn-space">
                    <button
                      type="button"
                      className="sps-dialog-close  regv2back"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i className="icon-close"></i>
                    </button>
                  </div>
                  <div className="px-3">
                    <div>
                      <p className="poppins-medium zw_22 zw_text_color">
                        Selected card /add new cardd
                      </p>
                    </div>
                    <div className="add-new-card">
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            className="pay-img-size ps-0 pe-4"
                            src="/images/add_card_payment_icon.svg"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="poppins-medium zw_24 zw_title_color mb-0">
                            Add new card
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <img
                          className="pay-img-size"
                          src="/images/image-81.png"
                          alt=""
                        />
                        <img
                          className="pay-img-size"
                          src="/images/image-84.png"
                          alt=""
                        />
                        <img
                          className="pay-img-size"
                          src="/images/image-82.png"
                          alt=""
                        />
                        <img
                          className="pay-img-size"
                          src="/images/image-85.png"
                          alt=""
                        />
                        <img
                          className="pay-img-size"
                          src="/images/image-86.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <form onSubmit={handleSubmit}>
                        <div className="card-name">
                          <p className="poppins-regular zw_20 zw_text_color">
                            Name on card
                          </p>
                          <div className="auto-group-m6jy-V9n poppins-regular zw_18 zw_secondary">
                            <input
                              className="poppins-regular zw_18"
                              type="text"
                              value={cardHolderName}
                              onChange={handleInputChange}
                              placeholder="card holder name"
                            />
                          </div>
                          {error && (
                            <p className="error-message">
                              Please enter the card holder name
                            </p>
                          )}
                        </div>

                        <div className="card-name mt-5">
                          <p className="poppins-regular zw_20 zw_text_color">
                            Card Number
                          </p>
                          <div className="auto-group-m6jy-V9n poppins-regular zw_18 zw_secondary">
                            <input
                              type="number"
                              className="auto-group-joye-DEC poppins-regular zw_18"
                              value={number}
                              onChange={handleNumberChange}
                              placeholder="0000 0000 0000 0000"
                              style={{ width: "228px" }}
                            />
                          </div>

                          {numberError && (
                            <p className="error-message">
                              Please enter a valid 16-digit number
                            </p>
                          )}
                        </div>

                        <div className="card-details mt-5">
                          <div className="card-name">
                            <p className="poppins-regular zw_20 zw_text_color">
                              Card Details
                            </p>
                            <div className="card-detailsss">
                              <div className="mx-3">
                                <div className="auto-group-vezg-ES8 poppins-regular zw_18 zw_secondary">
                                  <input
                                    type="text"
                                    value={month}
                                    onChange={handleMonthChange}
                                    placeholder="MM"
                                    className="pay-input-size poppins-regular zw_18"
                                  />
                                </div>
                                {monthError && (
                                  <p
                                    className="error-message"
                                    style={{ marginTop: "10px" }}
                                  >
                                    Please enter a valid month (MM)
                                  </p>
                                )}
                              </div>
                              <div className="mx-3">
                                <div className="auto-group-vezg-ES8 poppins-regular zw_18 zw_secondary">
                                  <input
                                    type="text"
                                    value={year}
                                    onChange={handleYearChange}
                                    placeholder="YY"
                                    className="pay-input-size poppins-regular zw_18"
                                  />
                                </div>
                                {yearError && (
                                  <p
                                    className="error-message"
                                    style={{ marginTop: "10px" }}
                                  >
                                    Please enter a valid year (YY)
                                  </p>
                                )}
                              </div>
                              <div
                                className="mx-3 cid-cvv"
                            
                              >
                                <p className="poppins-regular zw_20 zw_text_color">
                                  CID/CVV
                                </p>
                                <div className="auto-group-vezg-ES8 poppins-regular zw_18 zw_secondary">
                                  <input
                                    type="number"
                                    value={cvv}
                                    onChange={handleCVVChange}
                                    placeholder="CID/CVV"
                                    maxLength={3}
                                    className="pay-input-size poppins-regular zw_18"
                                  />
                                </div>
                                {cvvError && (
                                  <p
                                    className="error-message"
                                    style={{ marginTop: "10px" }}
                                  >
                                    Please enter a valid 3-digit CID/CVV
                                  </p>
                                )}
                              </div>
                            </div>

                        
                              <div className="d-flex mt-4">
                                <label className="switch" style={{cursor:'pointer'}}>
                                  <input type="checkbox"></input>
                                  <span className="slider1 round"></span>
                                  <p className="save-this-card-6jE">
                                  Save this card
                                </p>
                                </label>
                               
                              </div>
                      
                          </div>
                        </div>

                        {/* <Link
                          to="/Payment"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <p className="close-iGk" onClick={handleCloseModal}>
                            submit
                          </p>
                        </Link> */}
                        <button
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          className="close-iGk poppins-medium zw_28 zw_text_fff zw_bg_gradient border-0 rounded"
                          onClick={handleSubmit}
                        >
                          Continue
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Paymentdetails;
