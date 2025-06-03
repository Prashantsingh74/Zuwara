import React, { useState, useEffect, useRef, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
// import { data1 } from "../../Faq/ServiceList";
import { data } from "../../../ClinicData.js";
import Geocoder from "../../Layout/Geocoder";
import { useValue } from "../../MapContext/MapContextProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import { Context } from "../../../Context.js";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import ClinicCardItem from "../VirtualConsultation/ClinicCardItem.js";
// import LoginPopup from "../../../Login_Signin_popups/LoginPopup";
import LoginPopup from "../../Login_Signin_popups/LoginPopup.js";
function Service() {
  const { updateAppointmentData } = useContext(Context);
  const { t } = useTranslation();
  const [setZoneData] = useState([]);
  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [redirectTo, setRedirectTo] = useState("");
  const [locationName, setLocationName] = useState(""); // Add locationName state
  const [nonMedicalData, setNonMedicalData] = useState([]);
  const { isAuthenticated } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const openModel = (serviceName) => {
    console.log("Selected service:", serviceName);
    if (
      serviceName === "Virtual consultations" ||
      serviceName === "Corporate wellness"
    ) {
      redirectToServicePage(serviceName);
    } else {
      setRedirectTo(serviceName);
      setShow(true);
      console.log("Updating context with service name:", serviceName);
      updateAppointmentData({ Servicename: serviceName });
      sessionStorage.setItem("selectedService", serviceName);
    }
  };
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

  const handleViewAddressClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      handleClose(); // Close any open modal or state
      navigate("/addresslist"); // Redirect to the address list page
    } else {
      setShowModal(true); // Show login modal
    }
  };
  const buttonStyle = {
    cursor: isAuthenticated ? 'pointer' : 'not-allowed',
    opacity: isAuthenticated ? 1 : 0.5, // Optional: to visually indicate the button is disabled
  };
  const updateLocationName = async (longitude, latitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYWJkdWxyYTdtYW4iLCJhIjoiY2x0bzlvNTEwMDVoZTJrbWg4bHRxeXRwciJ9._WDrK6r6rayfB4WnardOwA`
      );
      const data = await response.json();
      setLocationName(data.features[0]?.place_name || "Unknown location");
    } catch (error) {
      console.error("Error updating location name:", error);
    }
  };
  const showLocation = (loc) => {
    setLocationName(loc);
    updateAppointmentData({ Address: loc });
    const latitude = 45.07187238118124;
    const longitude = 26.286879877969852;
    fetchZoneData(latitude, longitude);
  };
  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
          });
        }
        dispatch({
          type: "UPDATE_LOCATION",
          payload: { lng: longitude, lat: latitude },
        });
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYWJkdWxyYTdtYW4iLCJhIjoiY2x0bzlvNTEwMDVoZTJrbWg4bHRxeXRwciJ9._WDrK6r6rayfB4WnardOwA`
        )
          .then((response) => response.json())
          .then((data) => {
            setLocationName(data.features[0]?.place_name || "Unknown location");
          });
      },
      (error) => {
        console.error("Error retrieving location:", error);
      },
      { enableHighAccuracy: true }
    );
  };

  const openVertualModel = () => {
    setShoww(true);
  };

  const handleClose = () => {
    setShow(false);
    setShoww(false);
  };

  useEffect(() => {
    const savedService = sessionStorage.getItem("selectedService");
    if (savedService) {
      setSelectedService(savedService);
    }
    fetch("https://zuwara.net/admin/public/api/ourservices?type=medical")
      .then((response) => response.json())
      .then((data) => {
        setServicesData(data);
      });

    // Set default location
    fetch("https://ipapi.co/json")
      .then((response) => response.json())
      .then((data) => {
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
            zoom: 14,
          });
        }
        dispatch({
          type: "UPDATE_LOCATION",
          payload: { lng: data.longitude, lat: data.latitude },
        });
        setLocationName(`${data.city}, ${data.region}, ${data.country_name}`);
      });
  }, []);

  const redirectToServicePage = (enname) => {
    let newPath;
    switch (enname) {
      case "Vaccination":
        newPath = "/vaccination";
        break;
      case "Nurse visit":
        newPath = "/nursevisit";
        break;
      case "Home visit Doctor":
        newPath = "/Doctorvisit";
        break;
      case "Vitamin IV Drips":
        newPath = "/vitamin";
        break;
      case "Caregiver":
        newPath = "/caregiver";
        break;
      case "Laboratory":
        newPath = "/laboratory";
        break;
      case "Physiotherapist":
        newPath = "/physiotherapist";
        break;
      case "Radiology":
        newPath = "/radiology";
        break;
      case "Corporate wellness":
        newPath = "/corporate";
        break;
      case "Iqama":
        newPath = "/iqama";
        break;
      case "Virtual Consultation":
        setShoww(true);
        return;
      case "Seasonal flu":
        newPath = "/seasonalflu";
        break;
      case "Iqama":
        newPath = "/iqama";
        break;
      default:
        newPath = "/laboratory";
        break;
    }
    window.location.href = newPath;
  };

  const {
    state: {
      location: { lng, lat },
    },
    dispatch,
  } = useValue();

  const mapRef = useRef();

  const handleConfirmLocation = (loc) => {
    updateAppointmentData({ Address: loc });
    if (loc) redirectToServicePage(redirectTo);
  };

  const handleGeocoderResult = (result) => {
    const { center, place_name } = result;
    const [longitude, latitude] = center;
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 14,
      });
    }
    dispatch({
      type: "UPDATE_LOCATION",
      payload: { lng: longitude, lat: latitude },
    });
    setLocationName(place_name);
  };

  useEffect(() => {
    if (show) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 14,
            });
          }
          dispatch({
            type: "UPDATE_LOCATION",
            payload: { lng: longitude, lat: latitude },
          });
          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYWJkdWxyYTdtYW4iLCJhIjoiY2x0bzlvNTEwMDVoZTJrbWg4bHRxeXRwciJ9._WDrK6r6rayfB4WnardOwA`
          )
            .then((response) => response.json())
            .then((data) => {
              setLocationName(
                data.features[0]?.place_name || "Unknown location"
              );
            });
        },
        (error) => {
          console.error("Error retrieving location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [show, dispatch]);

  useEffect(() => {
    fetch("https://zuwara.net/admin/public/api/ourservices?type=non medical")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNonMedicalData(data);
      });
  }, []);

  return (
    <>
      <div className="container sa-services">
        <h1 className="poppins-semibold zw_title_color zw_34 padd-x">Our Service</h1>
        <h2 className="poppins-semibold zwaara_h2 zw_title_color my-4 ourservice-medical padd-x">
          Medical
        </h2>
        <div className="d-flex justify-content-center padd-x">
          <ul className="z-services-list row">
            {servicesData.map((item) => (
              <li
                className="card border-0 text-center col-12 col-sm-6 col-md-4 col-lg-3 my-3"
                key={item.id}
                id={item.id}
                onClick={() => openModel(item.Enname)}
              >
                <img
                  src={`https://zuwara.net/admin/public/${item.Logo}`}
                  alt="images"
                  title={item.Enname}
                  className="img-fluid"
                />
                <span className="poppins-medium zw_24 zw_24_sm zw_text_color py-4">
                  {t(`${item.Enname}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="poppins-semibold zwaara_h2 zw_title_color my-4 padd-x">
          Non-Medical
        </h2>
        <div
          className="sa-pos-rel d-flex justify-content-center padd-x"
          data-bs-toggle="modal"
          data-bs-target="#nonMedicalBackdrop"
        >
          <ul className="z-services-list row ">
            {nonMedicalData.map((item) => (
              <li className="card border-0 text-center col-12 col-sm-6 col-md-4 col-lg-3 my-3" key={item.id}>
                <img
                  src={`https://zuwara.net/admin/public/${item.Logo}`}
                  alt="images"
                />
                <span className="poppins-medium zw_24 zw_text_color zw_24_sm py-4">
                  {item.Enname}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="modal fade"
        id="nonMedicalBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ marginTop: "150px" }}
          >
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{zIndex: "5"}}
            ></button>
            <div className="modal-body">
              <img
                src="./images/comingsoon.jpg"
                alt="comingsoon"
              />
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <div className="sps-dialog sps-dialog-full zw_select_location">
          <div className="sps-dialog-body sps-dialog-overflow-unset sps-map">
            <button className="sps-dialog-close" onClick={handleClose}>
              {/* <i className="icon-close"></i> */}
              <img src="/images/crossicon2.png" alt="" style={{ width: "18px", }} />
            </button>
            <div className="sps-loc-map">
              <div id="spsmapbox" className="sps-mapboxgl-map">
                <ReactMapGL
                  ref={mapRef}
                  initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 5,
                  }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken="pk.eyJ1IjoiYWJkdWxyYTdtYW4iLCJhIjoiY2x0bzlvNTEwMDVoZTJrbWg4bHRxeXRwciJ9._WDrK6r6rayfB4WnardOwA"
                >
                  <Marker
                    latitude={lat}
                    longitude={lng}
                    draggable
                    onDragEnd={async (e) => {
                      const { lng, lat } = e.lngLat;
                      dispatch({
                        type: "UPDATE_LOCATION",
                        payload: { lng, lat },
                      });
                      await updateLocationName(lng, lat);
                    }}
                  />

                  <GeolocateControl
                    position="top-left"
                    trackUserLocation
                    onGeolocate={(e) =>
                      dispatch({
                        type: "UPDATE_LOCATION",
                        payload: {
                          lng: e.coords.longitude,
                          lat: e.coords.latitude,
                        },
                      })
                    }
                  />
                  <Geocoder onResult={handleGeocoderResult} />
                </ReactMapGL>
              </div>
            </div>
            <footer className="sps-loc-footer zw_loc_footer">
              <div className="row justify-content-between mb-4">
                <div className="col-sm-5 sps-d-f-sbetween">
                  <h5 className="sps-sprite sps-loc-map-ico sps-loc-type poppins-semibold zw_16">
                    Visit Location
                  </h5>
                </div>
                <div className="col-sm-6 curr-loc-align align-self-center">
                  <h5
                    className="poppins-semibold zw_16 "
                    style={{ margin: 0, cursor: "pointer" }}
                    onClick={useCurrentLocation}
                  >
                    Use My Current Location
                  </h5>
                </div>
              </div>
              <div className="row zw_loc_icon">
                <div className="col-md-12 sps-mt10">
                  <div className="sps-lcn-card">
                    <div
                      className="sps-d-f-sbetween"
                      style={{ justifyContent: "flex-start", gap: "10px" }}
                    >
                      <h5 style={{ margin: 0 }}>
                        <i className="icon-location2 sps-mr5 zw_title_color"></i>
                      </h5>
                      <h4 style={{ margin: 0 }}>{locationName}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4 gap-3 gap-md-0">
                <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                  {/* <Link
                    className="w-100"
                    to="/addresslist"
                    onClick={handleClose}
                  >
                    <button
                      type="submit"
                      className="btn sps-btn-view zw_btn_view"
                    >
                      <span className="zw_text_fff poppins-regular zw_14">
                        View Saved Address
                      </span>
                    </button>
                  </Link> */}
                  <Link className="w-100" onClick={handleClose}>
                    <button type="submit" className="btn sps-btn-view zw_btn_view" onClick={handleViewAddressClick} style={buttonStyle}
                      disabled={!isAuthenticated}

                    >

                      <span className="zw_text_fff poppins-regular zw_14">View Saved Address</span>
                    </button>
                  </Link>
                  {showModal && <LoginPopup show={showModal} onHide={() => setShowModal(false)} />}
                </div>
                <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                  <Link
                    className="w-100"
                    onClick={() => handleConfirmLocation(locationName)}
                  >
                    <button
                      id="locbtn"
                      data-bs-dismiss="modal"
                      className="btn sps-btn-view zw_btn_view"
                      type="submit"
                    >
                      <span className="zw_text_fff poppins-regular zw_14">
                        Confirm Location
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </Modal>
      <Modal show={showw} onHide={handleClose} className="vertualConsultationn">
        <Modal.Header closeButton>
          {/* <Modal.Title>{selectedService}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: "1rem 2rem" }}>
            <div className="d-flex flex-column flex-md-row consul-step">
              <div
                className="poppins-regular zw_18 zw_text_color mb-3 mb-md-0 d-none d-lg-block d-md-block"
                style={{ marginRight:'20px' }}
              >
                Step 1 of 4
              </div>
              <div className="line_indicator_container">
                <div className="each_line_indicator active"></div>
                <div className="each_line_indicator each_line_indicator-bg"></div>
                <div className="each_line_indicator each_line_indicator-bg"></div>
                <div className="each_line_indicator each_line_indicator-bg"></div>
              </div>
            </div>
            <div className="row ms-4">
              <div
                className="col-lg-3 poppins-semibold zw_32 zw_text_color mb-3 mb-md-0"
                
              >
                E-Clinics
              </div>
              <div className="col-lg-9">
              <div className="row w-100">
                <div className="col-lg-11">
                  {/* <div className="">
                  
                    <input
                      onChange={(e) => setSearch(e.target.value)}
                      autoComplete="off"
                      name="speciality"
                      type="text"
                      placeholder="Search Speciality"
                      className="z-form-control-sm poppins-regular zw_16"
                      style={{ width: "94%", marginLeft: "0", borderRadius:'8px' }}
                    />
                      <i className="icon-search z-form-icon"></i>
                  </div> */}
                  <div class="search-container">
                    <form className="d-flex">
                      <input
                        onChange={(e) => setSearch(e.target.value)}
                        autoComplete="off"
                        name="speciality"
                        type="text"
                        class="search-input zw_16 poppins-regular"
                        placeholder="Search Speciality"

                        style={{ borderRadius: '8px 0px 0px 8px', padding: '10px', border: "1px solid #999999" }}
                      />
                      <button
                        type="submit"
                        class="search-button zw_bgwhite"
                        style={{ borderRadius: '0px 8px 8px 0px', border: "1px solid #999999" }}
                      >
                        <i class="icon-search zw_black "></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div
              className="mt-4"
              style={{ overflowY: "auto",overflowX:'hidden', maxHeight: "80vh" }}
            >
              {data.filter((item) =>
                search.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(search)
              ).length === 0 ? (
                <div className="text-center" style={{ marginTop: "20px" }}>
                  <p
                    className="poppins-regular zw_text_color"
                    style={{
                      fontSize: "3.25rem",
                      fontWeight: "bold",
                      color: "#666",
                      marginBottom: "380px",
                      marginTop: "200px",
                    }}
                  >
                    No doctors available for this search.
                  </p>
                </div>
              ) : (
                <ul className="z-clinic-card-listt row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2">
                  {data
                    .filter((item) =>
                      search.toLowerCase() === ""
                        ? item
                        : item.title.toLowerCase().includes(search)
                    )
                    .map((item) => (
                      <li key={item.id} className="my-4 mx-4">
                        <Link to={`/Eclinics`}>
                          <ClinicCardItem
                            title={item.title}
                            image={item.image}
                            name={item.name}
                          />
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Service;
