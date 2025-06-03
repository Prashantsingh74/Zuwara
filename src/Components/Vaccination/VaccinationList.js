import React, { useState, useEffect, useContext } from "react";
import "../../Style/VaccinationList.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";



import close from "../../images/close.svg";

import { Context } from "../../Context";
import MapLocationPop from "../MapLocationPop";
function VaccinationList() {

  const navigate = useNavigate();

  const [selectedTest, setSelectedTest] = useState([]);

  const [query, setQuery] = useState("");
  const [VaccinationData, setVaccinationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;

    setQuery(value);
    const filtered = VaccinationData.filter((item) =>
      item.Enname.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);

  }

  const handleToggleSelect = (item) => {
    setSelectedTest((prevSelected) => {
      const isSelected = prevSelected.some(
        (selected) => selected.Enname === item.Enname
      );
      if (isSelected) {
        return prevSelected.filter(
          (selected) => selected.Enname !== item.Enname
        );
      } else {
        return [...prevSelected, item];
      }
    });
  };



  const [locationName, setLocationName] = useState("");
  const { show, setShow } = useContext(Context);



  const { appointmentData, updateAppointmentData, addressList } =
    useContext(Context);
  const [zoneData, setZoneData] = useState([]);
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

  useEffect(() => {
    fetch(
      "https://zuwara.net/admin/public/api/subservices?id=10&servicetype=single"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVaccinationData(data);
        setFilteredData(data);
      });
  }, []);

  const showLocation = (loc) => {
    setLocationName(loc);
    updateAppointmentData({ Address: loc });
    const latitude = 45.07187238118124;
    const longitude = 26.286879877969852;
    fetchZoneData(latitude, longitude);
  };
  //
  // Prepare the JSON string for Subservices
  const prepareSubservicesJson = () => {
    return JSON.stringify(
      selectedTest.map((item) => ({
        name: item.Enname,
        price: item.Price,
      }))
    );
  };

  const handlenext = async (e) => {
    e.preventDefault();
    if (selectedTest.length === 0) return;
    const subservicesJson = prepareSubservicesJson(); // Create the JSON string
    console.log("Subservices JSON:", subservicesJson);
    updateAppointmentData({ Subservices: subservicesJson });
    navigate("/Vaccinationcenter");
  };

  return (
    <div>
      <Navbar />
      <div className="vaccination vaccination-head">
        <div className="container-17">
          <div className="group-1261154093">
            <Link to={"/"}>
              <div className="d-flex">
                <img
                  className="group-1261154072"
                  src="/images/Group 1261154072.png"
                  alt=""
                />
                <span className="back poppins-medium zw_18 zw_black">Back</span>
              </div>
            </Link>
            <div className="line_indicator_container">
              <div className="each_line_indicator active"></div>
              <div className="each_line_indicator"></div>
              <div className="each_line_indicator"></div>
              <div className="each_line_indicator"></div>
            </div>
          </div>
          <div className="vaccination-list poppins-semibold zw_34 zw_text_color mx-4">
            Vaccination List
          </div>
          <div className="container-13 gap-4">
            <div className="col-xl-5 col-lg-6 col-md-12 mx-4 frames-37119 p-4" style={{ position: 'relative', }}>
              <div
                className="align-self-center d-flex select-location-hover "
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
              <div className="pe-2">
                <span className="poppins-semibold zw_14 zw_title_color">
                  {appointmentData.Address}
                </span>
              </div>
              {/* <img
                className="vector-19"
                style={{ position: "absolute", right: "3rem" }}
                src="/images/downarrow.png"
                alt="downarrow"
              /> */}
            </div>
            <div class="search-container">
              <form style={{ display: "flex" }}>
                <input
                  style={{
                    width: "38rem", color: '#999999',

                    borderRadius: "5px 0px 0px 5px",
                    padding: "13px",
                  }}
                  type="text"
                  className="search-input zw_14 poppins-regular"
                  placeholder="Search your lab tests & Packages"
                  value={query}
                  onChange={handleSearchInputChange}
                />
                <button style={{ borderRadius: "0px 5px 5px 0px " }} class="search-button zw_bgwhite">
                  <i class="icon-search zw_black "></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row padd-x">
          <div className="col-lg-8 col-md-12 mb-5">
            {/* <div>
                {VaccinationData.length > 0 ? (
                  VaccinationData?.map((item, index) => (
                    <div className="children-vaccination-card" key={item?.Enname}>
                      <div className="vaccination-box">
                        
                        <div
                          className={`select_box ${selectedTest.includes(item) ? "select-box-bg" : ""
                            }`}
                          onClick={() => handleToggleSelect(item)}
                        ></div>
                        <div className="children-vaccination">
                          <img
                            src={`https://zuwara.net/admin/public/${item?.Logo}`}
                            className="vaccination-img"
                            alt="Logo"
                          />
                          <div>
                            <div
                              className="childrens-vaccination-age-2-month poppins-bold zw_24 zw_text_color"
                              style={{ marginLeft: 0, marginTop: 0 }}
                            >
                              {item?.Enname}
                            </div>
                            <div className="vaccination-subtext poppins-regular zw_16 zw_secondary">
                              {item?.Endescription}
                            </div>
                          </div>
                        </div>
                        <div className="vaccination-details">
                          <span className="poppins-regular zw_16 zw_title_color">
                            {item?.Ardescription}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data-found poppins-semibold zw_18 zw_text_color">
                    No data found
                  </div>
                )}
              </div> */}

            {filteredData.length > 0 ? (
              filteredData?.map((item, index) => (
                <div class="card mb-3" style={{ border: '1px dashed #898B9F', padding: "8px" }} >
                  <div className="shhhh">
                    <div className="">
                      <div
                        className={`select_boxx ${selectedTest.includes(item) ? "select-box-bg" : ""
                          }`}
                        onClick={() => handleToggleSelect(item)}
                      ></div>
                    </div>
                    <div class="row g-0">

                      <div class="col-md-3">
                        <img src={`https://zuwara.net/admin/public/${item?.Logo}`} class="img-fluid vaccination-img" alt="logo" />
                      </div>

                      <div class="col-md-8">
                        <div class="card-body">


                          <h5 class="card-tit poppins-bold zw_24 zw_text_color my-3"> {item?.Enname}</h5>
                          <p class="card-tex poppins-regular zw_16 zw_secondary">{item?.Endescription}</p>
                        </div>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="my-3 border-0 bg-transparent poppins-regular zw_16 zw_title_color">
                          {item?.Ardescription}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data-found poppins-semibold zw_18 zw_text_color">
                No data found
              </div>
            )}
          </div>
          <div className="col-lg-4 col-sm-8 mb-5">
            <div className="">
              <div className="selected-testt poppins-semibold zw_16 zw_text_color">
                Selected test
              </div>
              <div className="container-111 w-100">
                {selectedTest?.map((item, index) => (
                  <div className="frame-12611542522">
                    <div className="group-12611541611">
                      <span className="poppins-regular zw_12 zw_title_color">
                        {item?.Enname}
                      </span>
                    </div>
                    <button
                      className="component-11"
                      onClick={() => handleToggleSelect(item)}
                    >
                      <img
                        src={close}
                        style={{ height: "100%", width: "100%" }}
                        alt=""
                      />
                    </button>
                  </div>
                ))}

                <Link
                  to={`${selectedTest?.length !== 0 ? "/vaccinationcenter" : ""}`}
                >
                  <button
                    onClick={handlenext}
                    className={`frame-371211 poppins-regular zw_14 zw_text_fff border-0 w-100 ${selectedTest?.length === 0 ? "disabled" : ""
                      }`}
                  >
                    Continue
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show ? (
        <MapLocationPop path={"samePage"} locName={showLocation} />
      ) : (
        ""
      )}
      <Footer />
    </div>
  );
}

export default VaccinationList;
