import React, { useState, useEffect, useContext } from "react";
import "../../../Style/Laboratory.css";
import { Link, useNavigate } from "react-router-dom";
import "../../../Style/lab.css";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";

import "../../../Style/Ourfeaturetestspopup.css";
import MapLocationPop from "../../MapLocationPop.js";
import { Context } from "../../../Context";

function Laboratory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [Search, setSearch] = useState("");
  const [selectedTest, setSelectedTest] = useState([]);
  const [count, setCount] = useState(1);
  const [testData, setTestData] = useState([]);
  const { appointmentData, updateAppointmentData, selectedTests } =
    useContext(Context);
  const navigate = useNavigate();
  const [zoneData, setZoneData] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [selectedSubservices, setSelectedSubservices] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const combinedTests = [...selectedTests, ...selectedTest];

  const handleTestSelection = (subservice) => {
    setSelectedSubservices((prevSubservices) => {
      const isAlreadySelected = prevSubservices.some(
        (service) => service.name === subservice.name
      );

      if (isAlreadySelected) {
        // Remove the subservice if it's already selected
        return prevSubservices.filter(
          (service) => service.name !== subservice.name
        );
      } else {
        // Add the subservice if it's not already selected
        return [...prevSubservices, subservice];
      }
    });

    setSelectedTest((prevTests) => {
      const isAlreadySelected = prevTests.includes(subservice.name);
      if (isAlreadySelected) {
        // Remove the test if it's already selected
        return prevTests.filter((test) => test !== subservice.name);
      } else {
        // Add the test if it's not already selected
        return [...prevTests, subservice.name];
      }
    });

    // Set default count to 1 if subservice is selected
    setCount((prevCounts) => {
      if (prevCounts[subservice.name] === undefined) {
        return { ...prevCounts, [subservice.name]: 1 };
      }
      return prevCounts;
    });
  };

  function incrementCount(subserviceName) {
    setCount((prevCount) => {
      const newCount = (prevCount[subserviceName] || 1) + 1;
      const updatedCounts = { ...prevCount, [subserviceName]: newCount };
      const totalQty = Object.values(updatedCounts).reduce(
        (sum, current) => sum + current,
        0
      );
      updateAppointmentData({ Qty: totalQty.toString() });
      return updatedCounts;
    });
  }

  function decrementCount(subserviceName) {
    setCount((prevCount) => {
      const newCount = Math.max((prevCount[subserviceName] || 1) - 1, 1);
      const updatedCounts = { ...prevCount, [subserviceName]: newCount };
      const totalQty = Object.values(updatedCounts).reduce(
        (sum, current) => sum + current,
        0
      );
      updateAppointmentData({ Qty: totalQty.toString() });
      return updatedCounts;
    });
  }

  function closeSelectedTest(title) {
    setSelectedTest((prevTests) => {
      const updatedSelectedTests = prevTests.filter((test) => test !== title);
      setCount((prevCount) => {
        const updatedTestCounts = { ...prevCount };
        delete updatedTestCounts[title];
        const totalQty = Object.values(updatedTestCounts).reduce(
          (sum, current) => sum + current,
          0
        );
        updateAppointmentData({ Qty: totalQty.toString() });
        return updatedTestCounts;
      });
      return updatedSelectedTests;
    });
  }

  const { show, setShow } = useContext(Context);
  const [bodyfunctionData, setBodyFunctionData] = useState([]);
  useEffect(() => {
    fetch(
      "https://zuwara.net/admin/public/api/subservices?id=9&servicetype=single"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBodyFunctionData(data);
      });
  }, []);

  const [mostHelpData, setMostHelpData] = useState([]);
  useEffect(() => {
    fetch(
      "https://zuwara.net/admin/public/api/subservicepackagename?service=9&servicetype=package"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMostHelpData(data);
      });
  }, []);

  const [ourFeatureData, setOurFeaturedData] = useState([]);
  useEffect(() => {
    fetch(
      "https://zuwara.net/admin/public/api/subservicesinside?servicename=Full%20Body&servicetype=single"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOurFeaturedData(data);
      });
  }, []);

  // Function to handle fetching tests based on the selected package name
  const fetchTestsByPackageName = async (packageName) => {
    try {
      const response = await fetch(
        `https://zuwara.net/admin/public/api/subservicespackage?id=9&servicetype=package&packagename=${encodeURIComponent(
          packageName
        )}`,
        {
          headers: {
            Cookie: "zwarra_session=rmQc9wnIUEfs5Y8iINAKWW2kWaQVOI6NZzEMAQB1",
          },
        }
      );
      const data = await response.json();
      console.log("Fetched Tests:", data);
      setTestData(data); // Store the fetched test data in state
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  // Call fetchTestsByPackageName when a package is selected from mostHelpData
  const handlePackageSelection = (packageName) => {
    fetchTestsByPackageName(packageName);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log("latitude", latitude);
          console.log("longitude", longitude);
          fetchZoneData(latitude, longitude); // Optionally fetch initial zone data
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation(); // Get the location when the component mounts
  }, []);

  // Function to handle API call for fetching zone data
  const fetchZoneData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://zuwara.net/admin/public/api/fetchZoneData/${latitude}/${longitude}`,
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: "zwarra_session=8svaEnKXoPHya4NjfgtmI4XABhWqWjVpkmz53q2L",
          },
        }
      );
      const data = await response.json();
      setZoneData(data); // Set the fetched zone data to state
      console.log("Zone Data:", data); // Log the zone data
    } catch (error) {
      console.error("Error fetching zone data:", error);
    }
  };

  const showLocation = (loc, latitude, longitude) => {
    setLocationName(loc);
    updateAppointmentData({ Address: loc });
    // const latitude = 45.07187238118124;
    // const longitude = 26.286879877969852;
    fetchZoneData(latitude, longitude);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // const handlenext = async (e) => {
  //   e.preventDefault();
  //   const totalQty = Object.values(count).reduce((sum, current) => sum + current, 0);
  //   if (selectedTest.length === 0) return; // Prevent continuation without selection
  //   console.log("Step 2 data", appointmentData);
  //   updateAppointmentData({ Subservices: JSON.stringify(selectedTest),Qty : totalQty.toString() }); // Store selected tests as a comma-separated string
  //   navigate("/Selectlabs");
  // };

  const handlenext = async (e) => {
    e.preventDefault();
    const totalQty = Object.values(count).reduce(
      (sum, current) => sum + current,
      0
    );
    if (selectedTest.length === 0) return; // Prevent continuation without selection

    // Prepare Subservices data in the required JSON format
    const subservicesJSON = JSON.stringify(selectedSubservices);

    console.log("Step 2 data", appointmentData);

    // Update to include the Subservices JSON string
    updateAppointmentData({
      Subservices: subservicesJSON,
      Qty: totalQty.toString(),
    });
    navigate("/Selectlabs");
  };

  return (
    <>
      <Navbar />
      <div className="zw_lab_bg pt-3 vaccination-head">
        <div className="laboratory-WM2">
          <div className="container">
            <div className="auto-group-9h4y-a9r px-2">
              <div className="row pt-4">
                <div className="group-1261154093-W7N col-12">
                  <div className="group-1261154076-E3N">
                    <Link to="/" className="d-flex align-items-center">
                      <img src="./images/backlab.png" alt="icon" />
                      <p className="ms-3 zw_btn_18 poppins-medium zw_black mb-0">
                        Back
                      </p>
                    </Link>
                  </div>
                  <div className="line_indicator_container">
                    <div className="each_line_indicator active"></div>
                    <div className="each_line_indicator"></div>
                    <div className="each_line_indicator"></div>
                    <div className="each_line_indicator"></div>
                  </div>
                  {/* <div className="frame-37129-R7r">
                    <div className="rectangle-39545-vqJ">
                    </div>
                    <div className="rectangle-39546-G8U">
                    </div>
                    <div className="rectangle-39547-164">
                    </div>
                    <div className="rectangle-39548-wkQ">
                    </div>
                  </div> */}
                </div>
              </div>


              <div className="row justify-content-between">
                <div className="col-lg-9 col-md-8">
                  <div className="row mt-5">
                    <div className="col-lg-6">
                      <p className="poppins-bold zw_26 zw_text_color width-fit-content">
                        Lab Tests & packages

                      </p>
                    </div>
                    {/* search functionality */}
                    <div className="col-lg-6">
                      <div className="search-container">
                        <form className="search-form mb-5">
                          <input
                            type="text"
                            className="search-input zw_14 poppins-regular"
                            placeholder="Search your lab tests & Packages"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                          />
                          <button
                            type="submit"
                            className="search-button zw_bgwhite"
                          >
                            <i className="icon-search zw_black "></i>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* <div className=''> */}

                  {/* </div> */}
                  {/* <div className="group-1261154095-WJQ ">
                    <div className="group-1261154098-EEQ">
                      <div className="frame-37119-bKr"> */}
                  {/* <div className="group-1261154097-E7v"> */}
                  {/* <ul className="group-1261154074-axU"> */}

                  <div className="col-lg-9 frames-37119 p-4 mb-3">

                    <div
                      className="align-self-center d-flex cursor-pointer"
                      onClick={() => setShow(true)}
                    >
                      <img
                        className="grouped-1"
                        src="/images/location.png"
                        alt="location"
                      />
                      <div className="ms-3 poppins-semibold zw_14 zw_title_color">
                        Selected Location
                      </div>
                    </div>
                    <div className="lined-1"></div>
                    <div>
                      <span className="poppins-semibold zw_14 zw_title_color">
                        {appointmentData.Address}
                      </span>
                      {/* <img className="vector-19" src="/images/downarrow.png" alt='' /> */}
                    </div>
                  </div>
                  {show ? (
                    <MapLocationPop path={"samePage"} locName={showLocation} />
                  ) : (
                    ""
                  )}
                  {/* </ul> */}
                  {/* </div> */}
                  {/* </div>
                    </div>
                  </div> */}
                </div>

                <div className="col-lg-3 col-md-4 zw_lab_rightsec d-flex justify-content-center mt-5 d-none d-md-block">

                  <img
                    className="converted-1-ghz"
                    src="images/converted-1.png"
                    alt="converted"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container zw_lab_health">
        <div className="laboratory-WM2">
          <div className="row padd-x">
            <div className="col-md-12">
              <div className="auto-group-cncl-P6c">
                <div className="auto-group-1uqj-hsz">
                  <div className="laboratory-sub-services-dme">
                    <p className="poppins-bold zw_text_color zw_32">
                      Body Function Or Health Concern
                    </p>
                    <ul className="row row-cols-lg-7 row-cols-md-7 group-1261154457-J76">
                      {bodyfunctionData
                        .filter((item) => {
                          return searchQuery.toLowerCase() === ""
                            ? item
                            : item.Enname?.toLowerCase().includes(
                                searchQuery.toLowerCase()
                              );
                        })
                        .map((item, index) => (
                          <li className="col auto-group-evfn-RxQ" key={index}>
                            <Link
                              to={
                                item.Enname === "Skin"
                                  ? "/skin"
                                  : item.Enname === "Hair"
                                  ? "/hair"
                                  : item.Enname === "Vitamins"
                                  ? "/vitamins"
                                  : item.Enname === "Cholesterol"
                                  ? "/cholesterol"
                                  : item.Enname === "Diabetes"
                                  ? "/diabetes"
                                  : "/labfullbody"
                              }
                              className="zw_a"
                            >
                              <div className="auto-group-d4vz-xxL">
                                <div className="group-1261154108-Wix">
                                  <img
                                    className="full-body-RL8 img-fluid"
                                    src={`https://zuwara.net/admin/public/${item.Logo}`}
                                    alt="logo"
                                  />
                                  <p className="poppins-semibold zw_16 zw_title_color">
                                    {item.Enname}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container zw_lab_health_package my-5">
        <div className="row padd-x">
          <div className="col-md-7">
            <div className="laboratory-WM2">
              <div className="auto-group-cncl-P6c">
                <div className="auto-group-ayeg-thS">
                  <div className="auto-group-9twz-df2">
                    <h1 className="zw_28 poppins-semibold zw_text_color mb-2">
                      Most Help Packages
                    </h1>
                    <div className="search-container">
                      <form className="search-form">
                        <input
                          style={{ maxWidth: "85%", border: "1px solid #ccc" }}
                          type="text"
                          className="zw_14 search-input poppins-regular"
                          placeholder="Search your lab tests & Packages"
                          value={Search}
                          onChange={handleSearchChange}
                        />
                        <button
                          style={{ border: "1px solid #ccc" }}
                          type="submit"
                          className="search-button zw_bgwhite"
                        >
                          <i className="icon-search zw_black"></i>
                        </button>
                      </form>
                    </div>
                    <div className="mt-4">
                      <div
                        className="row row-cols-2 row-cols-md-2 row-cols-lg-3 mx-0"
                        id="Most-Help-Packages"
                      >
                        {mostHelpData
                          .filter((item) => {
                            return Search.toLowerCase() === ""
                              ? item
                              : item.Packagename?.toLowerCase().includes(
                                  Search.toLowerCase()
                                );
                          })
                          .map((item, index) => (
                            <div
                              key={index}
                              className="card col"
                              data-bs-toggle="modal"
                              data-bs-target={`#modal-${index}`}
                              style={{
                                width: "30%",
                                marginBottom: "20px",
                                padding: "0px",
                              }}
                              onClick={() =>
                                handlePackageSelection(item.Packagename)
                              }
                            >
                              <div
                                className="card-body card_bg_color"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src={`https://zuwara.net/admin/public/uploads/${item.Packagename.replace(
                                    /\s/g,
                                    ""
                                  )}.png`}
                                  alt="images"
                                />
                                <p className="poppins-bold zw_11 zw_title_color mb-0 text-uppercase pt-2 text-center">
                                  {item.Packagename}
                                </p>
                              </div>
                            </div>
                          ))}
                        {mostHelpData
                          .filter((item) => {
                            return Search.toLowerCase() === ""
                              ? item
                              : item.Packagename?.toLowerCase().includes(
                                  Search.toLowerCase()
                                );
                          })
                          .map((item, index) => (
                            <div className="zw_popup">
                              <div
                                className="modal fade"
                                id={`modal-${index}`}
                                tabIndex="-1"
                                aria-labelledby={`modal-${index}-Label`}
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header border-0">
                                      <h5
                                        className="modal-title zw_002a56 poppins-bold zw_22 zw_title_color"
                                        style={{ marginLeft: "48px" }}
                                        id={`modal-${index}-Label`}
                                      >
                                        {item.Packagename}
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="our-featured-tests-pop-up-hEc">
                                        <div className="group-1261154596-dV6">
                                          <div className="group-1261154601-MAC">
                                            <div className="group-1261154877-nWx">
                                              <div className="row mb-4">
                                                <div className="col-8">
                                                  <div className="group-1171275053-Wxk">
                                                    <div
                                                      className="group-1171275049-1ec zw_btn_18"
                                                      onClick={() =>
                                                        decrementCount(
                                                          item.Packagename
                                                        )
                                                      }
                                                      role="button"
                                                    >
                                                      –
                                                    </div>
                                                    <p className="item-1-fz4 zw_btn_18">
                                                      {count[
                                                        item.Packagename
                                                      ] || 1}
                                                    </p>
                                                    <div className="group-371-Pv4">
                                                      <div
                                                        className="ellipse-57-9eL item--sqE zw_btn_18"
                                                        onClick={() =>
                                                          incrementCount(
                                                            item.Packagename
                                                          )
                                                        }
                                                        role="button"
                                                      >
                                                        +
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-4 zw_select_btn">
                                                  <div
                                                    className="group-1261154603-x5z vitamin-sel-btn poppins-regular zw_16 zw_bg_gradient zw_white_text"
                                                    data-bs-dismiss="modal"
                                                    aria-label="close"
                                                    onClick={(e) => {
                                                      handleTestSelection({
                                                        name: item.Packagename,
                                                        price: item.Price,
                                                      });
                                                      // (
                                                      //   item.Packagename
                                                      // );
                                                      handlePackageSelection(
                                                        item.Packagename
                                                      );
                                                    }}
                                                  >
                                                    Select
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="group-1261154877-nWx">
                                              <p className="poppins-regular zw_16 zw_333333">
                                                A group of tests that should be
                                                performed on regular basis.
                                                These Laboratory tests allow for
                                                the assessment of general health
                                                as well as the diagnosis and
                                                prevention of disease risk
                                                factors.
                                              </p>
                                              <div className="group-1261154592-pxt mb-4">
                                                <div className="group-1261154551-xJQ zw_light_bg">
                                                  <p className="instructions-588 poppins-semibold zw_16 zw_002a56">
                                                    Instructions
                                                  </p>
                                                  <ul className="group-1261154604-oZv">
                                                    <li className="poppins-regular zw_16">
                                                      Before the test, you
                                                      should fast for 10-12
                                                      hours. Nothing should be
                                                      eaten or drunk (other than
                                                      water).
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                              <div className="group-1261154592-pxt">
                                                <div className="group-1261154591-xbE">
                                                  <p className="test-included-in-this-package-7j2 poppins-semibold zw_24 zw_002a56">
                                                    Test Included in this
                                                    Package
                                                  </p>
                                                  <div className="group-1261154590-3Mn">
                                                    <ul className="group-1261154588-MdN">
                                                      {/* <li className="poppins-regular zw_text_color zw_16">
                                                        LDL CHOLESTEROL
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        TRIGLYCERIDES
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        GPT (ALT) GLUTPYRUVIC
                                                        TANSA (Serum Glutamate
                                                        Pyruvate Transaminase)
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        Cumulative Sugar Test
                                                        (HBA1C)
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        CHOLESTEROL
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        Creatinine blood test
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        GOT (AST)
                                                        GLUT-OXALO-ACETIC TRANSA
                                                        (Glutamate Oxaloacetate
                                                        Transaminase)
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        PLATELET COUNT
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        ALBUMIN
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        VITAMIN B12
                                                        (CYANOCOBOLAMINE)
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        ALP (ALKALINE
                                                        PHOSPHATASE)
                                                      </li>
                                                      <li className="poppins-regular zw_text_color zw_16">
                                                        HDL CHOLESTEROL
                                                      </li> */}
                                                      {testData.length > 0 ? (
                                                        testData.map((test) => (
                                                          <li key={test.id}>
                                                            {test.Enname}
                                                          </li>
                                                        ))
                                                      ) : (
                                                        <li className="poppins-regular zw_16 zw_text_color">
                                                          No tests available
                                                        </li>
                                                      )}
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* Removed the modal close button functionality here */}
                                    {/* <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Submit</button>
                                  </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <button className="button-see-all zw_14 poppins-regular zw_title_color">
                        See All
                      </button>
                    </div>
                    <div>
                      <h3 className="zw_34 poppins-semibold zw_text_color">
                        Our Featured Tests
                      </h3>
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {ourFeatureData
                          .filter((item) => {
                            return Search.toLowerCase() === ""
                              ? item
                              : item.Enname?.toLowerCase().includes(
                                  Search.toLowerCase()
                                );
                          })
                          .map((item, index) => (
                            <div
                              className="card zw_card zw_card_feature"
                              key={index}
                              data-bs-toggle="modal"
                              data-bs-target={`#featured-modal-${index}`}
                              style={{ width: "30%", marginBottom: "20px" }}
                            >
                              <div
                                className="card-body text-center"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  className="img-fluid"
                                  src="./images/diabities-ind.png"
                                  alt="logo"
                                />
                                <p className="poppins-bold zw_11 zw_title_color mb-0 text-uppercase pt-2">
                                  {item.Enname}
                                </p>
                              </div>
                            </div>
                          ))}
                        {ourFeatureData
                          .filter((item) => {
                            return Search.toLowerCase() === ""
                              ? item
                              : item.Enname?.toLowerCase().includes(
                                  Search.toLowerCase()
                                );
                          })
                          .map((item, index, title) => (
                            <div className="zw_popup">
                              <div
                                className="modal fade zw_Healthpackage"
                                id={`featured-modal-${index}`}
                                tabIndex="-1"
                                aria-labelledby={`featured-modal-${index}-Label`}
                                aria-hidden="true"
                              >
                                <div
                                  className="modal-dialog modal-dialog-centered"
                                  role="document"
                                >
                                  <div className="modal-content">
                                    <div className="modal-body">
                                      <div className="btn-space">
                                        <button
                                          type="button"
                                          className="sps-dialog-close  regv2back"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                          data-bs-backdrop="static"
                                        >
                                          <i className="icon-close"></i>
                                        </button>
                                      </div>
                                      <div className="our-featured-tests-pop-up-hEc">
                                        <div className="group-1261154596-dV6">
                                          <div className="group-1261154601-MAC">
                                            <div className="group-1261154877-nWx">
                                              <p className="health-check-packages-VnC poppins-semibold zw_24">
                                                {/* {item.Title} */}
                                                {title.title}
                                              </p>
                                              <div className="row mb-4">
                                                <div className="col-6 col-lg-8">
                                                  <div className="group-1171275053-Wxk">
                                                    <div
                                                      className="group-1171275049-1ec zw_btn_18"
                                                      onClick={() =>
                                                        decrementCount(
                                                          item.Enname
                                                        )
                                                      }
                                                      role="button"
                                                    >
                                                      –
                                                    </div>
                                                    <p className="item-1-fz4 zw_btn_18 ">
                                                      {count[item.Enname] || 1}
                                                    </p>
                                                    <div className="group-371-Pv4">
                                                      <div
                                                        className="ellipse-57-9eL item--sqE zw_btn_18"
                                                        onClick={() =>
                                                          incrementCount(
                                                            item.Enname
                                                          )
                                                        }
                                                        role="button"
                                                      >
                                                        +
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-6 col-lg-4 zw_select_btn">
                                                  <div
                                                    className="group-1261154603-x5z poppins-regular zw_16 zw_bg_gradient zw_white_text"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                    onClick={() => {
                                                      handleTestSelection({
                                                        name: item.Enname,
                                                        price: item.Price,
                                                      });
                                                      // (
                                                      //   item.Enname
                                                      // );
                                                    }}
                                                  >
                                                    Select{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="group-1261154877-nWx">
                                              <div className="group-1261154592-pxt mb-4">
                                                <div className="group-1261154551-xJQ zw_light_bg">

                                                  <div className="row gap-3">
                                                    <div className="col-lg-4 col-md-4">
                                                      <div className="zw_bgwhite p-3 zw_sbmtbtn_radius">

                                                        <img
                                                          className="img-fluid m-2"
                                                          src="./images/blood.svg"
                                                          alt="blood"
                                                        />
                                                        <span className="m-2 poppins-semibold zw_btn_18 zw_000 mb-0 zw_report_name">
                                                          BLOOD
                                                        </span>
                                                      </div>
                                                    </div>

                                                    <div className="col-lg-7 col-md-7 zw_bgwhite p-3 zw_sbmtbtn_radius">

                                                      <div className="m-2">
                                                        <span className="poppins-semibold zw_btn_18 zw_000 mb-0 zw_report_name">
                                                          The test does not
                                                          require fastting
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <button className="button-see-all zw_14 poppins-regular zw_title_color">
                        See All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="laboratory-WM2 p-0">
              <div className="auto-group-cncl-P6c">
                <div className="auto-group-ayeg-thS">
                  <div className="group-1261154163-rtL">
                    <p className="poppins-semibold zw_16 zw_text_color">
                      Selected test
                    </p>
                    <div className="group-1261154162-jx8 px-5 py-4">
                      {combinedTests.map((title, index) => (
                        <div className="main-selected-element-4zQ" key={index}>
                          <div className="group-1261154161-1ek">
                            <p
                              className="poppins-regular zw_title_color zw_12"
                              style={{ margin: "0", whiteSpace: "normal" }}
                            >
                              {title}
                            </p>

                            <div className="group-1171275053-cuS">
                              <div
                                className="group-1171275049-xTW"
                                onClick={() => decrementCount(title)}
                              >
                                –
                              </div>
                              <p
                                className="item-1-R6C zw_btn_18"
                                style={{ margin: "0" }}
                              >
                                {count[title] || 1}
                              </p>
                              <div
                                className="group-371-jsa"
                                onClick={() => incrementCount(title)}
                              >
                                +
                              </div>
                            </div>
                          </div>

                          <button
                            className="sps-dialog-closed"
                            onClick={() => closeSelectedTest(title)}
                          >
                            <i className="icon-close"></i>
                          </button>
                        </div>
                      ))}
                      {/* <Link to="/Selectlabs"> */}
                      <button
                        className="zw_bg_gradient w-100 py-4 poppins-regular zw_14 zw_text_fff"
                        type="button"
                        onClick={handlenext}
                        style={{
                          backgroundColor:
                            selectedTest.length === 0 ? "#ccc" : "", // Change background color to light grey if no tests are selected
                          cursor:
                            selectedTest.length === 0
                              ? "not-allowed"
                              : "pointer", // Disable the pointer if no tests are selected
                          border: "none",
                          borderRadius: "6px",
                        }}
                        disabled={selectedTest.length === 0} // Disable the button if no tests are selected
                      >
                        Continue
                      </button>

                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Laboratory;
