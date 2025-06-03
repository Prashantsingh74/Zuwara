import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useValue } from "./../../MapContext/MapContextProvider";
import { Context } from "../../../Context";
import Geocoder from "./../../Layout/Geocoder";

function MapLocationPop({ path, locName = (d) => { } }) {
    const { show, setShow, addAddress, userId } = useContext(Context);
    const [locationName, setLocationName] = useState("");
    const [inputName, setInputName] = useState("");
    const { isAuthenticated } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
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
    const {
        state: {
            location: { lng, lat },
        },
        dispatch,
    } = useValue();

    const mapRef = useRef();


    const pathServicePage = (enname) => {
        // Switch case logic...
    };

    const handleConfirmLocation = (locationSelected) => {
        if (locationSelected) pathServicePage(path);
        setShow(false);
        locName(locationSelected);
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
                    fetchAddress(longitude, latitude);
                },
                (error) => {
                    console.error("Error retrieving location:", error);
                },
                { enableHighAccuracy: true }
            );
        }
    }, [show, dispatch]);

    // Fetch address using Mapbox API
    const fetchAddress = (longitude, latitude) => {
        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYWJkdWxyYTdtYW4iLCJhIjoiY2x0bzlvNTEwMDVoZTJrbWg4bHRxeXRwciJ9._WDrK6r6rayfB4WnardOwA`
        )
            .then((response) => response.json())
            .then((data) => {
                setLocationName(data.features[0]?.place_name || "Unknown location");
            })
            .catch((error) => console.error("Error fetching address:", error));
    };


    const handleSaveLocation = async () => {

        if (inputName && userId && locationName) {

            try {
                const formData = new FormData()
                formData.append('Userid', userId);
                formData.append('Name', inputName);
                formData.append('Address', locationName);
                const response = await fetch('https://zuwara.net/admin/public/api/createaddress', {
                    method: 'POST',
                    headers: {
                        'Cookie': 'zwarra_session=q3ei4VMHZzytvKDUsxsnbXAx1tH0DqgsfnG4wLmR',
                    },
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Address saved successfully:", data);
                    addAddress(data);

                } else {
                    console.error("Error saving address:", data);
                }
            } catch (error) {
                console.error("Error making API request:", error);
            }

            setShow(false);
        } else {
            console.log("Name or location address is missing.");
        }
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
                fetchAddress(longitude, latitude);
            },
            (error) => {
                console.error("Error retrieving location:", error);
            },
            { enableHighAccuracy: true }
        );
    };

    // Handle geocoder search result
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


    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <div className="sps-dialog sps-dialog-full zw_select_location">
                    <div className="sps-dialog-body sps-dialog-overflow-unset sps-map">
                        <button className="sps-dialog-close" onClick={handleClose}>
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
                                        onDragEnd={(e) =>
                                            dispatch({
                                                type: "UPDATE_LOCATION",
                                                payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
                                            })
                                        }
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
                                        className="poppins-semibold zw_16"
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
                                                <i
                                                    className="icon-location2 sps-mr5 zw_title_color"
                                                ></i>
                                            </h5>
                                            <h4 style={{ margin: 0 }}>{locationName}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4 gap-3 gap-md-0">
                                <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                                    {/* <Link className="w-100" to="/addresslist" onClick={handleClose}>
                                        <button
                                            type="submit"
                                            className="btn  sps-btn-view zw_btn_view  "
                                        >

                                            <span className="zw_text_fff poppins-regular zw_14">View Saved Address</span>

                                        </button>
                                    </Link> */}
                                    <Link className="w-100" onClick={handleClose}>
                                        <button type="submit" className="btn sps-btn-view zw_btn_view" onClick={handleViewAddressClick} style={buttonStyle}
                                            disabled={!isAuthenticated}

                                        >

                                            <span className="zw_text_fff poppins-regular zw_14">View Saved Address</span>
                                        </button>
                                    </Link>
                                </div>

                                <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                                    <Link className="w-100" onClick={() => handleConfirmLocation(locationName)}>
                                        <button
                                            id="locbtn"
                                            data-bs-dismiss="modal"
                                            className="btn btn-primary sps-btn-confirm zw_btn_confirm"
                                            type="submit"
                                        >
                                            <span className="zw_text_fff poppins-regular zw_14">Confirm Location</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="row mt-4 gap-3 gap-md-0">
                                <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                                    <input
                                        type="text"
                                        value={inputName}
                                        onChange={(e) => setInputName(e.target.value)}
                                        style={{ color: '#ffffff', height: '50px' }}
                                        className="btn zw_btn_view w-100 poppins-regular zw_14 placeholder-white"
                                        placeholder=" Enter your name"
                                    />
                                </div>

                                <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                                    <button
                                        id="locbtn"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary sps-btn-confirm zw_btn_confirm"
                                        type="submit"
                                        onClick={handleSaveLocation}
                                    >
                                        <span className="zw_text_fff poppins-regular zw_14">Save</span>
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
