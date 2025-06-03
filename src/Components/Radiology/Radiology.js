import React, { useState, useContext, useEffect } from "react";
import "../../Style/Radiology.css";
import "../../Style/VaccinationList.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
 
// images
import ultrasoundImg from "../../images/Ultrasound.png";
import xray from "../../images/X-Ray.png";
import ecg from "../../images/ECG.png";
 
import { Context } from "../../Context";
import MapLocationPop from "../MapLocationPop";
 
function Radiology() {
  // const RadiologyData = [
  //   {
  //     headingName: 'Ultrasound',
  //     description: 'Ultrasound is a diagnostic tool that helps visualize the internal organs of the body. It can be used to diagnose a range of conditions such as thyroid diseases, liver diseases and tumors, gallbladder diseases and tumors, kidney and urinary system diseases, prostate diseases and tumors in men, uterine fibroids, and ovarian cysts and tumors in women.',
  //     subDescription: 'Includes Ultrasound machine ،medical gel, medical disinfectant, masks and sterilization for the medical team,Medical gloves for one use',
  //     img: ultrasoundImg,
  //   },
  //   {
  //     headingName: 'X-Ray',
  //     description: 'X-rays are diagnostic tool used to examine various parts of the body. They can diagnose arthritis and knee problems, lung diseases including tuberculosis and lung cancer, and an enlarged hear. Xrays can also identify fractures or infections in the bones.',
  //     subDescription: 'Includes X-ray machine with all its accessories, medical gloves for one use, medical disinfectant, medical gel, masks and sterilization for the medical team',
  //     img: xray,
  //   },
  //   {
  //     headingName: 'ECG',
  //     description: "ECG is a painless procedure used to detect heart problems such as arrhythmias, blocked or narrowed arteries in the heart, previous heart attacks, monitoring response to heart treatments such as a pacemaker. It is considered a routine procedure for middle-aged and elderly people, even if they don't show any symptoms.",
  //     subDescription: 'Includes ECG with all its contents, medical antiseptic, medical gel, alcohol wipes, disposable gloves, masks and sterilization for medical staff',
  //     img: ecg,
  //   }
  // ]
 
  const [selectedTest, setSelectedTest] = useState([]);
  const [RadiologyData, setRadiologyData] = useState([]);
  // for serch fillter
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(RadiologyData);
  const [count, setCount] = useState(Array(filteredData.length).fill(1));
  const [testQuantity, setTestQuantity] = useState({});
  const [locationName, setLocationName] = useState("");
  const { show, setShow } = useContext(Context);
  const navigate = useNavigate();
 
  // const showLocation = (loc) => setLocationName(loc);
 
  const showLocation = (loc) => {
    setLocationName(loc);
    updateAppointmentData({ Address: loc });
    const latitude = 45.07187238118124;
    const longitude = 26.286879877969852;
    fetchZoneData(latitude, longitude);
  };
  const handleMinus = (test) => {
    setTestQuantity((prevState) => {
      const prevQuantity = prevState[test] || 1;
      const newQuantity = Math.max(prevQuantity - 1, 0);
      return { ...prevState, [test]: newQuantity };
    });
  };
 
  const handleAdd = (test) => {
    setTestQuantity((prevState) => {
      const prevQuantity = prevState[test] || 1;
      const newQuantity = prevQuantity + 1;
      return { ...prevState, [test]: newQuantity };
    });
  };
 
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
 
    const filtered = RadiologyData.filter((item) =>
      item.Enname.toLowerCase().includes(value.toLowerCase())
    );
 
    setFilteredData(filtered);
  };
  // end serch filter
 
  // Handler for when an item is clicked
  // const handleToggleSelect = (item) => {
  // setSelectedIndices(prevSelectedIndices => {
  //   if (prevSelectedIndices.includes(index)) {
  //     return prevSelectedIndices.filter(i => i !== index);
  //   } else {
  //     return [...prevSelectedIndices, index];
  //   }
  // });
  //   if (selectedTest.includes(item)) {
  //     setSelectedTest(prevSelected => prevSelected.filter(selected => selected !== item));
  //     setTestQuantity(prevState => ({ ...prevState, [item.headingName]: 1 }))
  //   } else {
  //     setSelectedTest(prevSelected => [...prevSelected, item]);
  //   }
  // };
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
 
  // const handleSelectedTest = (testTitle) => {
  //   setSelectedTest(prevSelectedItem => {
  //     if (prevSelectedItem.includes(testTitle)) {
  //       return prevSelectedItem.filter(i => i !== testTitle);
  //     } else {
  //       return [...prevSelectedItem, testTitle];
  //     }
  //   });
  // };
 
  // const incrementCount = (index) => {
  //   setCount((prevCounts) => {
  //     const newCounts = [...prevCounts];
  //     newCounts[index] += 1;
  //     return newCounts;
  //   });
  // };
 
  // Function to handle decrementing count
  // const decrementCount = (index) => {
  //   setCount((prevCounts) => {
  //     const newCounts = [...prevCounts];
  //     if (newCounts[index] > 1) {
  //       newCounts[index] -= 1;
  //     }
  //     return newCounts;
  //   });
  // };
  // const incrementCount = (index) => {
  //   setCount(count + 1);
  // };
 
  // const decrementCount = (index) => {
  //   if (count > 1) {
  //       setCount(count - 1);
  //   }
  // };
 
  // useEffect(() => {
  //   if(selectedTestClicked &&  !selectedTest.includes(selectedTestClicked)){
  //       setSelectedTest((prevSelectedTest) => [selectedTestClicked, ...prevSelectedTest])
  //       setSelectedTestClicked('');
  //   }
  //   if(removeSelectedTest && selectedTest.includes(removeSelectedTest)){
  //       const newArr = selectedTest.filter((test) => test !== removeSelectedTest);
  //       setSelectedTest(newArr);
  //       setRemoveSelectedTest('')
  //   }
  // }, [selectedTestClicked, removeSelectedTest])
 
  // useEffect(() => {
  //   console.log("selectedTest===>", selectedTest);
  // })
 
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
    navigate("/Selectcenter");
  };
  // const handlenext = async (e) => {
  //       e.preventDefault();
  //       if (selectedTest.length === 0) return; // Prevent continuation without selection
  //       console.log("Step 2 data", appointmentData);
  //       const subservicesJson = JSON.stringify(selectedTest.map(test => (test.Enname)));
  //       updateAppointmentData({ Subservices: subservicesJson });
  //       navigate("/Selectcenter");
  // };
 
  useEffect(() => {
    fetch(
      "https://zuwara.net/admin/public/api/subservices?id=12&servicetype=single"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRadiologyData(data);
        setFilteredData(data);
      });
  }, []);
 
  return (
    <div>
      <Navbar />
      <div className="vaccination vaccination-head">
        <div className="container-17">
          <div className="group-1261154093">
            <div>
              <a href="/">
                <div class="d-flex">
                  <img
                    class="group-1261154072"
                    src="/images/Group 1261154072.png"
                    alt="Group"
                  />
                  <span class="back poppins-medium zw_18 zw_black">Back</span>
                </div>
              </a>
            </div>
            <div className="line_indicator_container">
              <div className="each_line_indicator active"></div>
              <div className="each_line_indicator"></div>
              <div className="each_line_indicator"></div>
              <div className="each_line_indicator"></div>
            </div>
          </div>
          <div className="vaccination-list poppins-semibold zw_34 zw_text_color mx-4">
            Radiology
          </div>
          <div className="container-13 gap-4">
            <div className="col-xl-5 col-lg-6 col-md-12 mx-4 frames-37119 p-4">
              <div
                className="align-self-center d-flex select-location-hover"
                onClick={() => setShow(true)}
              >
                <img className="grouped-1" src="/images/location.png" alt="" />
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
            <div class="search-container">
              <form style={{ display: "flex" }}>
                <input
                  style={{
                    width: "38rem",
                    borderRadius: "5px 0px 0px 5px",
                    padding: "13px",
                  }}
                  type="text"
                  className="search-input zw_14 poppins-regular"
                  placeholder="Search your lab tests & Packages"
                  value={query}
                  onChange={handleSearchInputChange}
                />
                <button
                  style={{ borderRadius: "0px 5px 5px 0px " }}
                  type="submit"
                  class="search-button zw_bgwhite"
                >
                  <i class="icon-search zw_black "></i>
                </button>
              </form>
            </div>
          </div>
        </div>
 
        {/* <div
          className="container-4"
          style={{ padding: "1px 7%", gap: "12rem" }}
        >
          <div>
            {filteredData.length > 0 ? (
              filteredData?.map((item, index) => (
                <div className="children-vaccination-card" key={item?.Enname}>
                  {console.log(item.Enname)}
                  <div className="vaccination-box">
                    <div
                      className={`select_box ${selectedTest.includes(item) ? "select-box-bg" : ""
                        }`}
                      onClick={() => handleToggleSelect(item)}
                    ></div>
                    <div className="children-vaccination">
                      <img
                        className="vaccination-img"
                        src={`https://zuwara.net/admin/public/${item?.Logo}`}
                        alt=""
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
                    <div className="vaccination-details ultrasound-details">
                      <span className="poppins-regular zw_16 zw_secondary">
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
          </div>
          <div className="ms-4">
            <div className="selected-test poppins-semibold zw_16 zw_text_color">
              Selected test
            </div>
            <div className="container-11">
              {selectedTest?.map((item, index) => (
                <div className="frame-1261154252">
                  <div className="selected-test-details">
                    <div className="poppins-medium zw_12 zw_title_color">
                      {item?.Enname}
                    </div>
                    <div style={{ display: "flex" }}>
                      <button className="btn-circle">
                        <div
                          className="btn-minus"
                          onClick={() => handleMinus(item.Enname)}
                        >
                          -
                        </div>
                      </button>
                      <span className="test-number">
                        {testQuantity[item.Enname] || 1}
                      </span>
                      <button className="btn-circle select-box-bg">
                        <div
                          className="btn-plus"
                          onClick={() => handleAdd(item.Enname)}
                        >
                          +
                        </div>
                      </button>
                    </div>
                  </div>
                  <button
                    className="component-1"
                    onClick={() => handleToggleSelect(item)}
                  >
                    <img src="./images/close.svg" alt="" />
                  </button>
                </div>
              ))}
              <Link to={`${selectedTest?.length !== 0 ? "/Selectcenter" : ""}`}>
                <button
                  className={`frame-37121 poppins-regular zw_14 zw_text_fff ${selectedTest?.length === 0 ? "disabled" : ""
                    }`}
                  style={{
                    cursor:
                      selectedTest?.length === 0 ? "not-allowed" : "pointer",
                  }}
                  onClick={handlenext}
                >
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
 
      <div className="container">
        <div className="row  padd-x">
          <div className="col-lg-8 col-md-12 mb-5">
            {filteredData.length > 0 ? (
              filteredData?.map((item, index) => (
                <div class="card mb-3" style={{ border: "1px dashed #898B9F", padding: '8px' }}>
                  <div className="shhhh">
                    <div className="ro">
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
                          {/* <div className="select_boxx"
                            ></div> */}
 
                          <h5 class="card-tit poppins-bold zw_24 zw_text_color my-3">
                            {item?.Enname}
                          </h5>
                          <p class="card-tex poppins-regular zw_16 zw_secondary">
                            {item?.Endescription}
                          </p>
                          {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
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
                    <div className="selected-test-details">
                      <div className="poppins-medium zw_12 zw_title_color">
                        {item?.Enname}
                      </div>
                      <div style={{ display: "flex" }}>
                        <button className="btn-circle">
                          <div
                            className="btn-minus"
                            onClick={() => handleMinus(item.Enname)}
                          >
                            -
                          </div>
                        </button>
                        <span className="test-number">
                          {testQuantity[item.Enname] || 1}
                        </span>
                        <button className="btn-circle select-box-bg">
                          <div
                            className="btn-plus"
                            onClick={() => handleAdd(item.Enname)}
                          >
                            +
                          </div>
                        </button>
 
                      </div>
                      </div>
                      <button
                        className="component-11 componenttt-11"
                        onClick={() => handleToggleSelect(item)}
                      >
                        <img src="./images/close.svg" alt="" style={{ height: "100%", width: "100%" }} />
                      </button>
                    </div>
                ))}
                   
                <Link to={`${selectedTest?.length !== 0 ? "/Selectcenter" : ""}`}>
                  <button
                    className={`frame-371211 poppins-regular zw_14 zw_text_fff border-0 w-100 ${selectedTest?.length === 0 ? "disabled" : ""
                      }`}
                    style={{
                      cursor:
                        selectedTest?.length === 0 ? "not-allowed" : "pointer",
                    }}
                    onClick={handlenext}
                  >
                    Continue
                  </button>
                </Link>
 
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* Location Popup */}
        {show ? <MapLocationPop path={"samePage"} locName={showLocation} /> : ""}
        <Footer />
      </div>
      );
}
      export default Radiology