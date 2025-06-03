import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import "../../Style/Caregiver.css";
import { Link } from "react-router-dom";
import { Caregiverdata } from "../Home/HomeServices/Dataforcaregiver";
import "../../Style/Corporatenew.css";

// import care1 from '../../assets/img/care_1.png';
// import care2 from '../../assets/img/care_2.png';
// import care3 from '../../assets/img/care_3.png';
// import care4 from '../../assets/img/care_4.png';

// const images = {
//     care1,
//     care2,
//     care3,
//     care4
// };

function Caregiver() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = Caregiverdata.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <Navbar />
      <div className="nursing-task-hRe">
        <div className="group-1261155501-1WC">
          <div className="group-1261154093 d-flex">
            <div>
              <Link to={'/'}>
                <div className="d-flex me-4 gap-4">
                  <img className="group-1261154072" src="/images/Group 1261154072.png" alt='Group' />
                  <span className="back poppins-medium zw_18 zw_black">
                    Back
                  </span>
                </div>
              </Link>
            </div>
            <div className="line_indicator_container d-none-sm">
              <div className="each_line_indicator active">
              </div>
              <div className="each_line_indicator">
              </div>
              <div className="each_line_indicator">
              </div>
              <div className="each_line_indicator">
              </div>

      
            </div>
          </div>
        </div>
      </div>


     
      

      <div className="container my-5">
        <h5 className="poppins-semibold zw_30 zw_text_color my-5 px-2">
          How we are working
        </h5>
        <div className="row px-3">
          <div className=" col-lg-12 caregiver-working-card">
            <p className="poppins-regular zw_secondary zw_16">
              Our caregivers have undergone professional training to handle the
              task responsibly. They are also certified by the Ministry of
              Health, Saudi Arabia. They are experienced to aid the patient with
              activities of daily living such as personal care and hygiene,
              bathing, dressing and other defined set of duties and
              responsibilities according to the needs & type of service.
            </p>
          </div>
        </div>
        <h5 className="poppins-semibold zw_30 zw_text_color mt-5 mb-4 px-2">
          Select Caregiver Task
        </h5>
        <div className="row mt-4 padd-x">
          {filteredData.map((task) => (
            <div className="col-md-6  mb-4" key={task.id}>
              <Link className="caregiver-link" to={task.link}>
                <div className="card caregiver-card h-100 p-0">
                  <div className="row g-0">
                    <div className="col-12 col-lg-7">
                      <img
                        className="card-img-top"
                        src={task.images}
                        alt={task.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-12 col-lg-5 d-flex flex-column justify-content-center p-3">
                      <h6 className="poppins-bold zw_16 zw_title_color">
                        {task.duration}
                      </h6>
                      <small className="poppins-bold zw_16 zw_title_color">
                        {task.hours}
                      </small>
                    </div>
                  </div>
                  <div className="card-body ps-4">
                    <h5 className="poppins-bold zw_24 zw_text_color my-4">
                      {task.title}
                    </h5>
                    <p className="poppins-regular zw_16 zw_secondary text-cente">
                      {task.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Caregiver;
