import React from "react";

import "../../../Style/cancelation-policy.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Cancelation() {
  // const navigate = useNavigate()
  // const onClose = () => {
  //   navigate(-1)
  // }
  return (
    <div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="Cancellationpage"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-content1" style={{ marginTop: "19rem" }} >
          <div className="modal-content ">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-5 border-0">
              <div className="cancelation-policy-MVv">
                <div className="group-1261154744-3Cx">
                  {/* <img className="group-1261154722-y6c" src="./assets/group-1261154722-Vf2.png" alt="Cancellation"/> */}
                  <p className="cancellation-and-refund-policy-i4C">Cancellation and refund policy</p>
                  <div className="group-1261154755-btg">
                    <div className="group-1261154753-wBr">
                      <p className="home-visit-HFi">Home visit</p>
                      <p className="refund-of">
                        100% refund of the payment only when appointment is
                        canceled before 5 hours or more
                      </p>
                    </div>
                    <div className="group-1261154752-7Ek">
                      <p className="telemedicine-TpQ">Telemedicine</p>
                      <p className="refund-of">
                        100% refund of the payment only when appointment is
                        canceled before 5 hours or more If the patient misses
                        telemedinice appointment due to “No show” the
                        consultation fees is non-refundable and appointment cant
                        be rescheduled.
                      </p>
                    </div>
                  </div>
                  <Link to="/">
                    <div className="group-1261154754-2FE"  >Close</div></Link>
                </div>
              </div>
              {/* <Link to="/" style={{ textDecoration: "none" }}>
                <div className="frame-37121-wmn">Continue</div>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cancelation;
