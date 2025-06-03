import React, { useState, useEffect, useRef } from "react";
import "../Style/CareIndividuals.css";
import img11 from "../../src/assets/img/image 87.png";
import img12 from "../../src/assets/img/request-sent-svgrepo-com 1.svg";
import img19 from "../../src/assets/img/uncheck.svg";
import img20 from "../../src/assets/img/Star 1.png";
import img21 from "../../src/assets/img/indi-doctor-image.png";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";
import { Link } from "react-router-dom";
import Geocoder from "../../src/Components/Layout/Geocoder.js";
import Modal from "react-bootstrap/Modal";
import { useValue } from "../../src/Components/MapContext/MapContextProvider.js";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";

function CareIndividuals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [showw, setShoww] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");
  const [locationName, setLocationName] = useState(""); // Add locationName state
  const [show, setShow] = useState(false);

  const nextSlide = () => {
    const newIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const openModel = (redirect) => {
    if (
      redirect === "Virtual consultations" ||
      redirect === "Corporate wellness"
    ) {
      redirectToServicePage(redirect);
    } else {
      setRedirectTo(redirect);
      setShow(true);
    }
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
    // updateAppointmentData({ Address: loc });
    // const latitude = 45.07187238118124;
    // const longitude = 26.286879877969852;
    // fetchZoneData(latitude, longitude);
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

  // const indicard1data = [
  //   { title: "Laboratory", image: Laboratory, path: "/laboratory" },
  //   { title: "Home visit Doctor", image: Homevisit, path: "/doctorvisit" },
  //   { title: "Nurse visit", image: Nursevisit, path: "/nursevisit" },
  //   { title: "Vitamin IV Drips", image: Vitamin, path: "/vitamin" },
  //   { title: "Vaccination", image: vaccination, path: "/vaccination" },
  //   { title: "Physiotherapist", image: Physiotherapist, path: "/physiotherapist" },
  //   { title: "Radiology", image: Radiology, path: "/radiology" },
  //   { title: "Corporate Wellness", image: Corporate, path: "/corporate" },
  //   { title: "Caregiver", image: Caregiver, path: "/caregiver" },
  // ];

  const indicard2data = [
    {
      title: "Easy Treatment Journey",
      image: "./images/careimg4.jpg",
      description:
        "Quick access to specialized doctors without waiting for hours in clinics.",
    },
    {
      title: "Counseling & Integrated Care",
      image: "./images/heart-icon.png",
      description:
        "Accurate diagnosis, prescriptions, and home dispensing of medicines.",
    },
    {
      title: " Integrated Treatment Programs",
      image: "./images/doctor-icon.png",
      description:
        "Ongoing care with regular check-ups and lab tests without hospital visits.",
    },
    {
      title: "Clear Costs & Great Care",
      image: "./images/careimg1.png",
      description:
        "Affordable services with fast insurance integration.",
    },
  ];

  const cards = [
    {
      title: "Dr. Maram Yousef",
      designation: "Subspecialty Consultant",
      description: "Vascular surgeon",
      img: img21,
    },
    {
      title: "Dr. Maram Yousef",
      designation: "Subspecialty Consultant",
      description: "Vascular surgeon",
      img: img21,
    },
    {
      title: "Dr. Maram Yousef",
      designation: "Subspecialty Consultant",
      description: "Vascular surgeon",
      img: img21,
    },
    {
      title: "Dr. Maram Yousef",
      designation: "Subspecialty Consultant",
      description: "Vascular surgeon",
      img: img21,
    },
    {
      title: "Dr. Maram Yousef",
      designation: "Subspecialty Consultant",
      description: "Vascular surgeon",
      img: img21,
    },
    {
      title: "Dr. Maram Yousef",
      designation: "Subspecialty Consultant",
      description: "Vascular surgeon",
      img: img21,
    },
    {
      title: "Dr. Maram Yousef",
      designation: "Subspecialty Consultant",
      description: "Vascular surgeon",
      img: img21,
    },
    // Add more cards as needed
  ];

  return (
    <div>
      <Navbar />
      <div className="individual-page" style={{ marginTop: "90px" }}>
        <div className="indi-meet mt-5 pt-4 heading-text-sm">
          Zuwara: Your Integrated Healthcare Provider at Home
        </div>
        <div className="indi-intigrated">
          We are here to meet the needs of you and your family. Experience healthcare convenience at
          your fingertips, with services delivered to your home quickly, easily, and comfortably
        </div>
      </div>

      <section className="ind-card">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 text-center mx-5">
            {servicesData.map((item) => (
              <div
                className="my-4"
                key={item.id}
                onClick={() => openModel(item.Enname)}
              >
                <div className="card get-size justify-content-between align-items-center">
                  <img
                    className="iv-drip-1"
                    src={`https://zuwara.net/admin/public/${item.Logo}`}
                    alt="images"
                  />
                  <div className="">
                    <p className="poppins-regular zw_20 zw_text_color mb-0">
                      {item.Enname}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Modal show={show} onHide={handleClose} animation={false}>
            <div className="sps-dialog sps-dialog-full zw_select_location">
              <div className="sps-dialog-body sps-dialog-overflow-unset sps-map">
                <button className="sps-dialog-close" onClick={handleClose}>
                  <i className="icon-close"></i>
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
                  <div className="row">
                    <div className="col-md-6 sps-d-f-sbetween">
                      <h5 className="sps-sprite sps-loc-map-ico sps-loc-type poppins-semibold zw_16">
                        Visit Location
                      </h5>
                    </div>
                    <div className="col-md-6" style={{ textAlign: "end" }}>
                      <h5
                        className="poppins-semibold zw_16 text-right"
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
                  <div className="row mt-4">
                    <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                      <Link
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
                      </Link>
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
        </div>
      </section>

      <section className="my-5 accept-bupa">
        <div className="container indi-connect">
          <div className="row py-5">
            <div className="col-lg-8 col-md-8">
              <p className="m-0 poppins-regular zw_16 zw_text_color p-2">
                We connect you with your insurance company
              </p>
            </div>
            <div className="col-lg-4 col-md-4 text-e p-2 insurance-link">
              <a
                href="/"
                className="to-link zw_title_color poppins-regular zw_16 link-border px-2"
              >
                To link your insurance login or sign up
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="my-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className=" get-ourdoc align-items-center">
                <div className="">
                  <img className="iv-drip-" src={img11} alt="" />
                </div>
                <div className="mx-3">
                  <p className="m-0 poppins-regular zw_16 zw_text_color">
                    All our providers are certified and licensed by the Ministry of Health, ensuring the highest
                    quality healthcare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="indicard2">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
            {indicard2data.map((indiitem2) => (
              <div className="my-4" key={indiitem2.title}>
                <div className="card get-size-2">
                  <img
                    className="iv-drip-2"
                    src={indiitem2.image}
                    alt={indiitem2.title}
                  />
                  <div className="">
                    <p className="poppins-bold zw_24 zw_text_color">
                      {indiitem2.title}
                    </p>
                    <p className="poppins-regular zw_18">
                      {indiitem2.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="how-to-join">
                <div className="my-3 poppins-semibold zw_46 how-to-order text-center">
                  How To Order From Zuwarh
                </div>

                <div className="indi-order-page ">
                  <div className="indi-how-order my-3">
                    <img
                      className="undraw-approve-qwp-71"
                      src="/images/undraw_approve_qwp71.png"
                      alt="undraw_approve_qwp71"
                    />
                    <div className="img-sub-title poppins-medium zw_18  ">
                      Select Service
                    </div>
                    <div className="des-width">
                      <p className="poppins-regular  zw_18 m-0">
                        Doctor visits, Lab, vaccinations, home nursing services,
                        etc
                      </p>
                    </div>
                  </div>
                  <img
                    className="vector-1 vector-1-width"
                    src="/images/Vector 1-1.svg"
                    alt="Vector"
                  />
                  <div className="indi-how-order">
                    <img
                      className="undraw-approve-qwp-71"
                      src="/images/undraw-online.png"
                      alt="undraw-online"
                    />
                    <div className="img-sub-title poppins-medium zw_18">
                      Schedule Convenient Appointment
                    </div>
                    <div className="des-width">
                      <p className="poppins-regular text-center zw_18 m-0">
                        Synchronized with your schedule from comfort of your
                        home
                      </p>
                    </div>
                  </div>
                  <img
                    className="vector-1 vector-1-width"
                    src="/images/Vector 1-2.svg"
                    alt="Vector"
                  />
                  <div className="indi-how-order">
                    <img
                      className="undraw-approve-qwp-71"
                      src="/images/undraw-job.png"
                      alt="undraw-job"
                    />
                    <div className="img-sub-title poppins-medium zw_18">
                      Consult with a Doctor
                    </div>
                    <div className="des-width">
                      <p className="poppins-regular text-center zw_18 m-0">
                        And get an appropriate medical diagnosis
                      </p>
                    </div>
                  </div>

                  <img
                    className="vector-1 vector-1-width"
                    src="/images/Vector 1-2.svg"
                    alt="Vector"
                  />
                  <div className="indi-how-order">
                    <img
                      className="undraw-approve-qwp-71"
                      src="/images/undraw-job.png"
                      alt="undraw-job"
                    />
                    <div className="img-sub-title poppins-medium zw_18">
                      Get Reports & Prescriptions
                    </div>
                    <div className="des-width">
                      <p className="poppins-regular text-center zw_18 m-0">
                        Medical reports and prescriptions will be attached to
                        the application
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="indi-licens padd-x">
          <div className="indi-licensed-doctors">
            Our Doctors:
          </div>
          <div className="indi-licens-ellipse">
            <div className="indi-licens-ellipse-sub">
              <div className="indi-licens-ellipse-circle"></div>
            </div>
            <span className="indi-doctor896">
              450+ doctors across various specialties available for immediate consultation,
              including:
            </span>
          </div>
        </div>
      </section>

      <section className="container">
        <div className=" row row-cols-sm-3 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 indi-points my-5">
          <div className="  my-3  get-ourdoc">
            <img className="check-uncheck" src={img19} alt="check-uncheck" />

            <div className="poppins-regular zw_16">
              Pediatrician
            </div>
          </div>
          <div className="  my-3  get-ourdoc">
            <img className="check-uncheck" src={img19} alt="check-uncheck" />

            <div className="poppins-regular zw_16">
              Family Medicine
            </div>
          </div>
          <div className="  my-3  get-ourdoc">
            <img className="check-uncheck" src={img19} alt="check-uncheck" />

            <div className="poppins-regular zw_16">
              Psychiatry
            </div>
          </div>
          <div className="  my-3  get-ourdoc">
            <img className="check-uncheck" src={img19} alt="check-uncheck" />

            <div className="poppins-regular zw_16">Psychologist</div>
          </div>

          <div className="  my-3  get-ourdoc">
            <img className="check-uncheck" src={img19} alt="check-uncheck" />

            <div className="poppins-regular zw_16">
              Neurologist
            </div>
          </div>
          <div className="  my-3  get-ourdoc">
            <img className="check-uncheck" src={img19} alt="check-uncheck" />

            <div className="poppins-regular zw_16">Obstetrician</div>
          </div>
          <div className="  my-3  get-ourdoc">
            <img className="check-uncheck" src={img19} alt="check-uncheck" />

            <div className="poppins-regular zw_16">Vascular Surgeon</div>
          </div>
          <div className="  my-3  get-ourdoc">
            <img className="check-uncheck" src={img19} alt="check-uncheck" />

            <div className="poppins-regular zw_16">
              And other specialties
            </div>
          </div>
        </div>
      </section>

      <section
        className="container"
        style={{ overflowX: "hidden", }}
      >
        <div className="row row-cols-lg-4 row-cols-md-3">
          <div className="col">
            <div className="card-slider">
              <div
                className="slider-wrapper"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {cards.map(
                  (
                    card,
                    index // Ensure cards loop
                  ) => (
                    <div className=" indi-slide-card " key={index}>
                      <div className=" get-ourdoc justify-content-center">
                        {card.img && (
                          <img
                            src={card.img}
                            alt={card.title}
                            className="mx-5"
                            style={{

                              width: "136px",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </div>
                      <div className="card-body text-center">
                        <p className="card-titl img-dr-title  poppins-bold zw_24 ">
                          {card.title}
                        </p>
                        <p className="poppins-medium zw_18 text-color-0C273C">
                          {card.designation}
                        </p>
                        <p className="poppins-regular zw_16 zw_secondary">
                          {card.description}
                        </p>
                      </div>
                      <div className=" border-0 bg-transparent mt-5">
                        <div className=" get-ourdoc justify-content-center">
                          <img className="indi-star" src={img20} alt="star" />
                          <img className="indi-star" src={img20} alt="star" />
                          <img className="indi-star" src={img20} alt="star" />
                          <img className="indi-star" src={img20} alt="star" />
                          <img className="indi-star" src={img20} alt="star" />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className=" get-ourdoc flex-wrap justify-content-between slider-btn">
          <div className=" get-ourdoc my-4">
            <button
              className="prev-btn px-5 py-3 zw_bg_gradient rounded"
              onClick={prevSlide}
            >
              <img src="./images/rightarr.png" alt="right-arrow" />

            </button>
            <button
              className="next-btn px-5 py-3 zw_bg_gradient rounded"
              onClick={nextSlide}
            >
              <img src="./images/leftarr.png" alt="leftarr" />
            </button>
          </div>
          <div className="my-4">
            <button className="px-5 py-3 poppins-semibold zw_bg_gradient zw_16 border-0 zw_text_fff rounded">
              SEE ALL DOCTOR
            </button>
          </div>
        </div>
      </section>

      <section className="mt-4 book-an-appoi" style={{ marginBottom: "4rem" }}>
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="book-appoi px-3">
                <h1 className="poppins-bold px-4">
                Book Now for Immediate Care
                </h1>
                <p className=" my-4 poppins-regular zw_16">
                Request personalized health services tailored to your needs. We'll contact you promptly.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="book-appoi px-3">
                <h1 className="poppins-bold px-5">
                  Request Personalized Health Services
                </h1>
                <p className="poppins-regular zw_16 my-4">
                  We will reach out to tailor healthcare solutions that meet your specific needs.  
                </p>
                <Link to="/request">
                  <button
                    className="py-3 px-5 mt-5 zw_bg_gradient poppins-semibold zw_text_fff border-0 rounded"
                    style={{ cursor: "pointer" }}
                  >
                    <img className="px-4" src={img12} alt="request" />{" "}
                    <span className="zw_14">Request Now</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CareIndividuals;
