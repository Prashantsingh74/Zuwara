import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "../../../../Style/Calender.css";
import LoginPopup from "../../../Login_Signin_popups/LoginPopup";
import Signup from "../../../Login_Signin_popups/Signup";
import AccountSetup_details from "../../../Login_Signin_popups/AccountSetup_details";
import AccountSetup_gender from "../../../Login_Signin_popups/AccountSetup_gender";
import AccountSetup_captcha from "../../../Login_Signin_popups/AccountSetup_captcha";
import OTP from "../../../Login_Signin_popups/OTP";
import Accountsetup_success from "../../../Login_Signin_popups/Accountsetup_success";
import { Context } from "../../../../Context";

const Time = ({ change, currentTime }) => {
  const [upcomingTimes, setUpcomingTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null); // Track the selected time slot
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    // Fetch time slots from API
    const healthcareId = 10; // Replace with actual healthcare ID or pass as prop

    fetch("https://zuwara.net/admin/public/api/getsessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: "zwarra_session=q3ei4VMHZzytvKDUsxsnbXAx1tH0DqgsfnG4wLmR",
      },
      body: JSON.stringify({
        dayname: "Sunday",
        servicetype: "Nurse",
        healthcareid: healthcareId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const times = data.time_slots.map((slot) => moment(slot, "HH:mm"));
        setUpcomingTimes(times);
      })
      .catch((error) => {
        console.error("Error fetching timeslots:", error);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(false); // Hide any modal if authenticated
    } else {
      setShowModal("login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleModalOpen = () => {
      document.body.style.overflow = 'auto'; // Allow background scrolling
    };

    const handleModalClose = () => {
      document.body.style.overflow = ''; // Restore default behavior
    };

    // Attach event listeners for modal open and close
    const modalElement = document.getElementById('Loginmodal');
    if (modalElement) {
      modalElement.addEventListener('show.bs.modal', handleModalOpen);
      modalElement.addEventListener('hide.bs.modal', handleModalClose);
    }

    // Cleanup event listeners on unmount
    return () => {
      if (modalElement) {
        modalElement.removeEventListener('show.bs.modal', handleModalOpen);
        modalElement.removeEventListener('hide.bs.modal', handleModalClose);
      }
    };
  }, []);

  const handleTimeClick = (time) => {
    if (isAuthenticated) {
      setSelectedTime(time); // Set the selected time slot
      change(time.toDate()); // Perform the action with the selected time slot
      setShowModal(false);
    } else {
      setShowModal("login"); // Show the login modal if not authenticated
    }
  };

  const isSelectedTime = (time) => moment(time).isSame(selectedTime, "minute");

  return (
    <div>
      <div
        className="calendar1-css"
        style={{
          overflowX: "scroll",
          width: "auto",
          scrollBehavior: "smooth",
          scrollbarColor: "transparent transparent",
        }}
      >
        {upcomingTimes.map((time, index) => (
          <div
            className={`calendar-con1 ${isSelectedTime(time) ? "selected" : ""}`}
            key={index}
            style={{
              display: "inline-block",
              margin: "10px",
              textAlign: "center",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #af2245",
              cursor: "pointer",
              backgroundColor: isSelectedTime(time) ? "#AF2245" : "#fff",
              color: isSelectedTime(time) ? "#fff" : "#000",
              transition: "background-color 0.3s ease-in-out",
            }}
            onClick={() => handleTimeClick(time)}
            onMouseOver={(e) => {
              if (!isSelectedTime(time)) {
                e.currentTarget.style.backgroundColor = "#af2245";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseOut={(e) => {
              if (!isSelectedTime(time)) {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#000";
              }
            }}
            data-bs-toggle={showModal === "login" ? "modal" : ""}
            data-bs-target={showModal === "login" ? "#Loginmodal" : ""}
          >
            <p
              style={{ background: "transparent", marginBottom: "0px" }}
              className={isSelectedTime(time) ? "color-red" : ""}
            >
              {time.format("HH:mm")}
            </p>
          </div>
        ))}
      </div>

      {/* Modals */}
      
    </div>
  );
};

export default Time;
