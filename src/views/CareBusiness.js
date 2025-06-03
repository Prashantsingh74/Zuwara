import React from "react";
import "../Style/CareBussiness.css";
import { Link } from "react-router-dom";
// import img1 from "../../src/assets/img/careimg1.png";
// import img2 from "../../src/assets/img/careimg2.jpg";
// import img3 from "../../src/assets/img/careimge3.jpg";
// import img4 from "../../src/assets/img/careimg4.jpg";
import img8 from "../../src/assets/img/image 87.png";
import img9 from "../../src/assets/img/Group 1261155856 1.png";
import img10 from "../../src/assets/img/Rectangle 39715.png";
import img11 from "../../src/assets/img/Rectangle 39717.png";
import img12 from "../../src/assets/img/uncheck.svg";
import img13 from "../../src/assets/img/Rectangle 39716.png";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";

function BussinessBanner() {
  const indicard2data = [
    {
      title: "Productivity Guarantee:",
      image: "./images/careimg4.jpg",
      description: "Empower employees to manage their physical and mental health, enabling them to focus on their work and ensure wellness at both home and the workplace."
    },
    {
      title: "Employee Stability & Success:",
      image: "./images/careimge3.jpg",
      description: "Retain top talent and create an attractive work environment that promotes job satisfaction."
    },
    {
      title: "Enhance Your Organization's Image: ",
      image: "./images/careimg2.jpg",
      description: "Foster a health-promoting environment to increase employee loyalty and attract quality professionals."
    },
    {
      title: "Reduce Healthcare Costs:",
      image: "./images/careimg1.png",
      description: "Achieve one of the key goals of health promotion programs by lowering healthcare costs for your organization."
    },

  ];
  return (
    <>
      <Navbar />
      <section className="cb-banner">
        <div className="container py-5">
          <div className="business-banner my-4">
            <div className="busi-care">
              <h1 className="zw_56 poppins-extrabold text_gradient heading-text-sm" >
                Zuwara Business
              </h1>
              <p className="poppins-semibold zw_46 text_gradient heading-text-sm">
                Your Partner in Enhancing Employee Health & Well-being
              </p>
              <p className="poppins-regular zw_16 zw_text_color" >
                Zuwara offers comprehensive medical solutions to help companies maintain and improve
                their employees’ health, ensuring they have access to medical services anytime, anywhere.
              </p>
              <div>
                <Link to="/contactus">
                  <div className="container-12 w-100">
                    <div className="my-4">
                      <button className="px-5 py-3 poppins-medium zw_text_fff zw_bg_gradient zw_18" style={{ border: "none", borderRadius: "5px", fontFamily: "Poppins, 'Source Sans Pro'" }}>
                        Contact Us
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="mt-5 d-flex">
                <div>
                  <img src={img8} alt="" className="ellipseim" />
                </div>
                <span className="poppins-regular zw_16 zw_text_color mx-3" >
                  {" "}
                  All our service providers are certified and licensed by the Ministry of Health, ensuring the
                  highest quality and reliable healthcare.
                </span>
              </div>
            </div>
            <div className="align-self-center d-none d-sm-block">
              <img src={img9} alt="" className="banner_img_size" />
            </div>
          </div>
        </div>
      </section>
      <section className="my-5">
        <div className="container ">
          <div className="row">
            <div className="col text-center">
              <h1 className="mt-5 poppins-bold zw_46 text_gradient" >
                Why Zuwara Business?
              </h1>
            </div>
          </div>
          <div className="row my-3">
            <div className="col text-center">
              <p className="poppins-regular zw_18 " >
                We support you in apply occupational safety and health to
                enhance loyality of all of your employees
              </p>
            </div>
          </div>
          <section className="">
            <div className="container">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">

                {indicard2data.map((indiitem2) => {
                  return (
                    <div className=" my-4">
                      <div className="card get-size-2 gap-3">
                        <img className="iv-drip-2" src={indiitem2.image} />
                        <div className="">
                          <p className=" poppins-bold zw_22 zw_text_color">

                            {indiitem2.title}
                          </p>
                          <p className="poppins-regular zw_18">

                            {indiitem2.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="custom-section">
        <div
          className="container px-4 py-4 rounded"
          style={{ backgroundColor: "#F6F7F9" }}
        >
          <div className=" busines-page">
            <div className="images-column">
              <div>
                <img src={img10} alt="" className="cardb_img_size" />
              </div>
              <div className="mt-5">
                <img src={img13} alt="" className="cardb_img_size" />
              </div>
            </div>
            <div className="content-column mx-4">
              <h1 className="poppins-semibold zwaara_title heading-text-sm" >
                Our Programs for Companies & Groups
              </h1>
              <p className="poppins-regular zw_16 zw_secondary my-3" >
                Health issues affect both individuals and organizations, leading to higher insurance costs,
                lower morale, and reduced productivity. Zuwara’s solutions are designed to address these
                challenges and support employers in creating healthier work environments.
              </p>
              <ul className="mt-4 p-0">
                <li className="my-2 d-flex">
                  <img src={img12} alt="Icon 2" />
                  <p className="mx-4 zw_16 zw_002a56 poppins-regular" >
                    Medical & Psychological Counseling
                  </p>
                </li>
                <li className="my-2 d-flex">
                  <img src={img12} alt="Icon 1" />
                  <p className="mx-4 zw_16 zw_002a56 poppins-regular" >
                    Chronic Disease Management Program
                  </p>
                </li>
                <li className="my-2 d-flex">
                  <img src={img12} alt="Icon 1" />
                  <p className="mx-4 zw_16 zw_002a56 poppins-regular" >
                    Routine Employee Health Checks
                  </p>
                </li>
                <li className="my-2 d-flex">
                  <img src={img12} alt="Icon 1" />
                  <p className="mx-4 zw_16 zw_002a56 poppins-regular" >
                    Seasonal Vaccinations for Employees
                  </p>
                </li>
                <li className="my-2 d-flex">
                  <img src={img12} alt="Icon 1" />
                  <p className="mx-4 zw_16 zw_002a56 poppins-regular" >
                    Health Certificate Reservation Management (Baladi)
                  </p>
                </li>
                <li className="my-2 d-flex">
                  <img src={img12} alt="Icon 1" />
                  <p className="mx-4 zw_16 zw_002a56 poppins-regular" >
                    Hajj Packages for Hajj Campaigns
                  </p>
                </li>
                <li className="my-2 d-flex">
                  <img src={img12} alt="Icon 1" />
                  <p className="mx-4 zw_16 zw_002a56 poppins-regular" >
                    Pregnancy Follow-up Program
                  </p>
                </li>
                <li className="my-2 d-flex">
                  <img src={img12} alt="Icon 1" />
                  <p className="mx-4 zw_16 zw_002a56 poppins-regular" >
                    And More...
                  </p>
                </li>
              </ul>
            </div>
            <div className="banner-column">
              <div>
                <img src={img11} alt="" className="cardbt_img_size" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="take-care-emp">
        <div className="container cb-banner py-5">
          <div className="row">
            <div className="col text-center py-5">
              <h1 className="zw_24 poppins-bold text_gradient my-3 py-3" >
                Take care of your employees’
              </h1>
              <p className="poppins-regular zw_16 zw_black my-4" >
                health and join leading companies to ensure wellness and success at work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default BussinessBanner;
