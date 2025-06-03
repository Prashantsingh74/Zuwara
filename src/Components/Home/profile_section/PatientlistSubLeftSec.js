import React, { useContext } from "react";
import "../../../Style/Records_addpatient.css";
import { NavLink } from "react-router-dom";
import { Context } from "../../../Context.js";

function PatientlistSubLeftSec() {
  const { username, profileImage } = useContext(Context);

  return (
    <>
      <div className="auto-group-2hh6-wCg">
        <div className="frame-1261154254-H1e">
          {/* Display the profile image */}
          {profileImage ? (
            <img
              className="rectangle-39635-zwe"
              src={profileImage}
              alt="Profile"
            />
          ) : (
            <p>No profile image available</p>
          )}
          <div className="aha-iMr">{username}</div>
        </div>
        <div className="auto-group-sbhn-cy2">
          <div className="group-1261154801-Mfi">
            <div className="group-1261154793-fwJ">
              <NavLink
                to="/records"
                className={({ isActive }) =>
                  isActive ? "bgg-active" : "auto-group-5wv4-Nz8"
                }
              >
                <img
                  className="icon-WaY"
                  src="./images/record-icon-ac.png"
                  alt="vector-x6Y"
                />
                <div className="personal-3aU">Records</div>
              </NavLink>
              <NavLink
                to="/personal"
                className={({ isActive }) =>
                  isActive ? "bgg-active" : "auto-group-5wv4-Nz8"
                }
              >
                <img
                  className="icon-WaY"
                  src="./images/icon.png"
                  alt="icon"
                />
                <div className="personal-3aU">Personal</div>
              </NavLink>
              <NavLink
                to="/medical"
                className={({ isActive }) =>
                  isActive ? "bgg-active" : "auto-group-5wv4-Nz8"
                }
              >
                <img
                  className="icon-WaY"
                  src="./images/group-1261154885.png"
                  alt="group-1261154885"
                />
                <div className="personal-3aU">Medical</div>
              </NavLink>
              <NavLink
                to="/lifestyle"
                className={({ isActive }) =>
                  isActive ? "bgg-active" : "auto-group-5wv4-Nz8"
                }
              >
                <img
                  className="icon-WaY"
                  src="./images/vec.png"
                  alt="vector-QTe"
                />
                <div className="personal-3aU">Life Style</div>
              </NavLink>
            </div>
          </div>
          <div className="my-zwrrar-7cG">My Zwrrar</div>
          <div className="group-1261154808-FCg">
            <div className="rectangle-39639-P3z">
              <img
                className="group-1261154897-Py6"
                src="./images/group-1261154897.png"
                alt="group-1261154897"
              />
              <div className="my-programs-Vcp">My Programs</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientlistSubLeftSec;
