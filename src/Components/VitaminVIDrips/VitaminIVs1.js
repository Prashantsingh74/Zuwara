import React, { useState, useContext, useEffect } from 'react';
import '../../Style/VaccinationList.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

// images
import vaccine2mon from "../../images/e1.png";

import vaccine4mon from "../../images/h1.png";
import vaccine6mon from "../../images/e1.png";

import close from "../../images/close.svg"

import { Context } from '../../Context';
import MapLocationPop from '../MapLocationPop';
function VitaminVIDrips() {

  const [selectedTest, setSelectedTest] = useState([]);

  const [query, setQuery] = useState('');


  const handleSearchInputChange = (e) => {
    const value = e.target.value;

    setQuery(value);
    const filtered = VitaminIVs1Data.filter((item) =>
      item.Enname.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);

  };

  const handleToggleSelect = (item) => {
    setSelectedTest(prevSelected => {
      const isSelected = prevSelected.some(selected => selected.Enname === item.Enname);
      if (isSelected) {
        return prevSelected.filter(selected => selected.Enname !== item.Enname);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  // const handleToggleSelect = (item) => {
  //   if (selectedTest.includes(item)) {
  //     setSelectedTest(prevSelected => prevSelected.filter(selected => selected !== item));
  //   } else {
  //     setSelectedTest(prevSelected => [...prevSelected, item]);
  //   }
  // }

  // const handleChecked = (item, index) => {

  //     setSelectedTest(prevSelectedItem => {
  //         if (prevSelectedItem.includes(item)) {
  //             return prevSelectedItem.filter(i => i !== item);
  //         } else {
  //             return [...prevSelectedItem, item];
  //         }
  //     });
  //     setCount((prevCounts) => {
  //         const newCounts = [...prevCounts];
  //         newCounts[index] = 1;
  //         return newCounts;
  //     });
  // };

  // const handleSelectedTest = (testTitle) => {

  //     setSelectedTest(prevSelectedItem => {
  //         if (prevSelectedItem.includes(testTitle)) {
  //             const idx = prevSelectedItem.indexOf(testTitle)
  //             prevSelectedItem[idx] = undefined;
  //             return [prevSelectedItem];
  //         } else {
  //             return [...prevSelectedItem, testTitle];
  //         }
  //     });
  // };

  // const incrementCount = (index) => {
  //     setCount((prevCounts) => {
  //         const newCounts = [...prevCounts];
  //         newCounts[index] += 1;
  //         return newCounts;
  //     });
  // };

  // Function to handle decrementing count
  // const decrementCount = (index) => {
  //     setCount((prevCounts) => {
  //         const newCounts = [...prevCounts];
  //         if (newCounts[index] > 1) {
  //             newCounts[index] -= 1;
  //         }
  //         return newCounts;
  //     });
  // };

  const { appointmentData, updateAppointmentData, show, setShow } = useContext(Context);
  const [zoneData, setZoneData] = useState([]);
  const [locationName, setLocationName] = useState('');
  const navigate = useNavigate();

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

  const showLocation = (loc) => {
    setLocationName(loc);
    updateAppointmentData({ Address: loc });
    const latitude = 45.07187238118124;
    const longitude = 26.286879877969852;
    fetchZoneData(latitude, longitude);
  };

  const [VitaminIVs1Data, setVitaminsVs1Data] = useState([]);
  const [filteredData, setFilteredData] = useState(VitaminIVs1Data);
  const [count, setCount] = useState(Array(filteredData.length).fill(1));

  useEffect(() => {
    fetch(
      "https://zuwara.net/admin/public/api/subservices?id=6&servicetype=single"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVitaminsVs1Data(data);
        setFilteredData(data);
      });
  }, []);
  // Prepare the JSON string for Subservices
  const prepareSubservicesJson = () => {

    return JSON.stringify(selectedTest.map(item => ({
      name: item.Enname,
      price: item.Price
    })));
  };

  const handlenext = async (e) => {
    e.preventDefault();
    if (selectedTest.length === 0) return;
    const subservicesJson = prepareSubservicesJson(); // Create the JSON string
    console.log("Subservices JSON:", subservicesJson);
    updateAppointmentData({ Subservices: subservicesJson });
    navigate("/vitamincenter");
  };
  // const handlenext = async (e) => {
  //     e.preventDefault();
  //     if (selectedTest.length === 0) return; // Prevent continuation without selection
  //     console.log("Step 2 data", appointmentData);
  //     const subservicesJson = JSON.stringify(selectedTest.map(test => (test.Enname)));
  //     updateAppointmentData({ Subservices: subservicesJson });
  //     navigate("/vitamincenter");
  //   };

  return (
    <div>
      <Navbar />
      <div className="vaccination vaccination-head">

        <div className="container-17">
          <div className="group-1261154093">
            <Link to={'/'}>
              <div className="d-flex">
                <img className="group-1261154072" src="/images/Group 1261154072.png" alt='Group' />
                <span className="back poppins-medium zw_18 zw_black">
                  Back
                </span>
              </div>
            </Link>
            <div className="line_indicator_container">
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
          <div className="vaccination-list poppins-semibold zw_34 zw_text_color mx-4">
            Packages
          </div>
          <div className="container-13 gap-4">
            <div className="col-xl-5 col-lg-6 col-md-12 frames-37119 mx-4 p-4">
              <div className='align-self-center d-flex select-location-hover' onClick={() => setShow(true)}>
                <img className="grouped-1" src="/images/location.png" alt='' />
                <div className="ms-3 poppins-semibold zw_14 zw_title_color" >Selected Location</div>
              </div>
              <div className="lined-1"></div>
              <div>
                <span className="poppins-semibold zw_14 zw_title_color">{appointmentData.Address}</span>
                {/* <img className="vector-19" src="/images/downarrow.png" alt='' /> */}
              </div>
            </div>
            <div class="search-container">
              <form style={{ display: 'flex' }}>
                <input
                  style={{ width: '40rem', borderRadius: '5px 0px 0px 5px', padding: '13px' }}
                  type="text"
                  className="search-input zw_16 poppins-regular"
                  placeholder="Search "
                  value={query}
                  onChange={handleSearchInputChange}
                />
                <button style={{ borderRadius: '0px 5px 5px 0px ', }} class="search-button zw_bgwhite">
                  <i class="icon-search zw_black "></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* <div className="container-4" style={{ padding: '1px 7%', gap: '12rem' }}>
          <div>
            {filteredData.length > 0 ? (
              filteredData?.map((item, index) => (
                <div className='children-vaccination-card' key={item?.Enname}>
                  <div className='vaccination-box'>
                    <div className={`select_box ${selectedTest.includes(item) ? 'select-box-bg' : ''}`}
                      onClick={() => handleToggleSelect(item)}></div>
                    <div className='children-vaccination'>
                      <img src={`https://zuwara.net/admin/public/${item?.Logo}`} className='' alt="Logo" />
                      <div className='ms-4'>
                        <div className='childrens-vaccination-age-2-month poppins-bold zw_24 zw_text_color' style={{ marginLeft: 0, marginTop: 0 }}>{item?.Enname}</div>
                        <div className='vaccination-subtext poppins-regular zw_16 zw_secondary'>{item?.Erdescription}</div>
                        <p className="poppins-regular zw_16 zw_title_color instructions" >{item?.Eninstrucation}  </p>
                      </div>
                    </div>
                    <div className='vaccination-details'>
                      <span className="poppins-regular zw_16 zw_title_color">
                        {item?.Ardescription}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='no-data-found poppins-semibold zw_18 zw_text_color'>
                No data found
              </div>
            )}
          </div>



          <div className='ms-4'>
            <div className="selected-test poppins-semibold zw_16 zw_text_color">
              Selected test
            </div>
            <div className="container-11">
              {selectedTest?.map((item, index) => (
                <div className="frame-1261154252">
                  <div className="group-1261154161">
                    <span className="poppins-regular zw_12 zw_title_color">
                      {item?.Enname}
                    </span>
                  </div>
                  <button className="component-1" onClick={() => handleToggleSelect(item)}>
                    <img src={close} style={{ height: "100%", width: "100%" }} alt='' />
                  </button>
                </div>
              ))}
             
              <button className={`frame-37121 poppins-regular zw_14 zw_text_fff ${selectedTest?.length === 0 ? 'disabled' : ''}`} onClick={handlenext} style={{ cursor: selectedTest?.length === 0 ? 'not-allowed' : 'pointer' }}>
                Continue
              </button>
        
            </div>
    
          </div>
        </div>
        {show ? <MapLocationPop path={"samePage"} locName={showLocation} /> : ""} */}
      </div>


      <div className="container">
        <div className="row justify-content-between padd-x">
          <div className="col-lg-8 col-md-12 mb-5">

            {filteredData.length > 0 ? (
              filteredData?.map((item, index) => (
                <div class="card mb-3" style={{ border: '1px dashed #9747ff',padding: '8px' }} >
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

                          {/* <h5 class="card-tit poppins-bold zw_24 zw_text_color my-3">{item?.Enname}</h5>
                          <p class="card-tex poppins-regular zw_16 zw_secondary">{item?.Erdescription}</p>
                          <p class="card-tex poppins-regular zw_16 zw_secondary">{item?.Eninstrucation}</p> */}
                          <div className='childrens-vaccination-age-2-month poppins-bold zw_24 zw_text_color' style={{ marginLeft: 0, marginTop: 0 }}>{item?.Enname}</div>
                          <div className='vaccination-subtext poppins-regular zw_16 zw_secondary'>{item?.Erdescription}</div>
                          <p className="poppins-regular zw_16 zw_title_color instructions" >{item?.Eninstrucation}  </p>
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
              <div className='no-data-found poppins-semibold zw_18 zw_text_color'>
                No data found
              </div>
            )}



          </div>
          <div className="col-lg-4 col-sm-8 mb-5">
            <div className=''>
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
                    <button className="component-11 componentt-11" onClick={() => handleToggleSelect(item)}>
                      <img src={close} style={{ height: "100%", width: "100%" }} alt='' />
                    </button>
                  </div>
                ))}
                {/* <Link to="/Selectlabs">
                                <button className="frame-37121 poppins-regular zw_14 zw_text_fff">
                                    Continue
                                </button>
                            </Link> */}
                {/* <Link to={`${selectedTest?.length !== 0 ? '/vitamincenter' : ''}`}> */}
                <button className={`frame-371211 poppins-regular zw_14 zw_text_fff border-0 w-100 ${selectedTest?.length === 0 ? 'disabled' : ''}`} onClick={handlenext} style={{ cursor: selectedTest?.length === 0 ? 'not-allowed' : 'pointer' }}>
                  Continue
                </button>
                {/* </Link> */}
              </div>
              {/* <Link to={`${selectedTest?.length !== 0 ? '/Selectcenter' : ''}`}>
                            <button className={`frame-37121 poppins-regular zw_14 zw_text_fff ${selectedTest?.length === 0 ? 'disabled' : ''}`}>
                                Continue
                            </button>
                        </Link> */}
            </div>
          </div>
          {show ? <MapLocationPop path={"samePage"} locName={showLocation} /> : ""}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default VitaminVIDrips
