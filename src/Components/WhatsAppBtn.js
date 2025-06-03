import React from "react";
import { Link } from "react-router-dom";

function WhatsAppBtn() {
  return (
    <>
      <Link to={"/contactus"}>
        <div className="d-none d-sm-block"
          style={{
            backgroundColor: "#af2245",
            position: "fixed",
            bottom: 180,
            right: 30,
            padding: "10px 20px",
            zIndex: 100,
            borderRadius: "40px",
            cursor: "pointer",
          }}
        >
        
          <p
            className="poppins-regular zw_16 zw_text_fff m-0"
          >
            Support
          </p>
        </div>
      </Link>
    </>
  );
}

export default WhatsAppBtn;
