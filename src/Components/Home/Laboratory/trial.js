import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import { Link } from "react-router-dom";
import Geocoder from "./Layout/Geocoder";
import Modal from "react-bootstrap/Modal";
import { useValue } from "./MapContext/MapContextProvider";
import { Context } from "../Context";

function MapLocationPop({ path, locName = (d) => { } }) {
    const { show, setShow } = useContext(Context);

    const handleClose = () => setShow(false);

    const {
        state: {
            location: { lng, lat },
        },
        dispatch,
    } = useValue();

    useEffect(() => {
        if (!lng && !lat) {
            console.log(lng, lat);
            fetch("https://ipapi.co/json")
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    if (mapRef.current) {
                        mapRef.current.flyTo({
                            center: [data.longitude, data.latitude],
                        });
                    }
                    dispatch({
                        type: "UPDATE_LOCATION",
                        payload: { lng: data.longitude, lat: data.latitude },
                    });
                });
        }
    }, []);

    const pathServicePage = (enname) => {
        let newPath;
        switch (enname) {
            case "Vaccination":
                newPath = "/vaccination";
                break;
            case "Nurse visit":
                newPath = "/nurselist";
                break;
            case "Home visit Doctor":
                newPath = "/homevisit";
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
                newPath = "/corporate-wellness";
                break;
            case "Select Labs":
                newPath = "/Selectlabs";
                break;
            case "samePage":
                break;
            default:
                // Default redirection if service not found
                newPath = "/not-found";
                break;
        }
        if (newPath) {
            window.location.href = newPath; // Redirect to the new page
        }
    };

    const mapRef = useRef();

    const f = document.querySelector(".mapboxgl-ctrl-top-right input")?.value;

    const handleConfirmLocation = (locationSelected) => {
        if (locationSelected) pathServicePage(path);
        setShow(false);
        locName(f);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <div className="sps-dialog sps-dialog-full zw_select_location">
                    <div className="sps-dialog-body sps-dialog-overflow-unset sps-map">
                        <button className="sps-dialog-close" onClick={handleClose}>
                            <i className="icon-close"></i>
                        </button>
                        <div className="sps-loc-map">
                            <div id="spsmapbox" className="sps-mapboxgl-map">
                                <ReactMapGL
                                    initialViewState={{
                                        longitude: -122.4,
                                        latitude: 37.8,
                                        zoom: 10,
                                    }}
                                    mapStyle="mapbox://styles/mapbox/streets-v9"
                                    mapboxAccessToken="pk.eyJ1IjoiYWJkdWxyYTdtYW4iLCJhIjoiY2x0bzlvNTEwMDVoZTJrbWg4bHRxeXRwciJ9._WDrK6r6rayfB4WnardOwA"
                                >
                                    <Marker
                                        latitude={lat}
                                        longitude={lng}
                                        draggable
                                        onDragEnd={(e) =>
                                            dispatch({
                                                type: "UPDATE_LOCATION",
                                                payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
                                            })
                                        }
                                    />
                                    <GeolocateControl
                                        position="top-left"
                                        style={{}}
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
                                    <Geocoder />
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
                                        style={{ margin: 0 }}
                                    >
                                        Use my curent location
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
                                            <h4 style={{ margin: 0 }}>{f}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary sps-btn-view zw_btn_view "
                                    >
                                        View saved address
                                    </button>
                                </div>
                                <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                                    <button
                                        id="locbtn"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary sps-btn-confirm zw_btn_confirm "
                                        type="submit"
                                    >
                                        <Link onClick={() => handleConfirmLocation(f)}>
                                            Confirm Location
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default MapLocationPop;
