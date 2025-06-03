import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../../Style/Home.css'
import Modal from 'react-bootstrap/Modal';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import mapmarker from '../../../images/marker.jpeg'

function LocationPopup() {

    const [show, setShow] = useState(false);
    const [pagename, setPagename] = useState('');

    const openModel = (id) => {
        setShow(true);
        setPagename(id);
    }

    const handleClose = () => {
        setShow(false);
    }


    const [viewport, setViewport] = useState({
        latitude: 20.9471,
        longitude: 72.8990,
        zoom: 10
    });

    const logEvents = useCallback(event => {
        console.log(event);
    }, []);

    const setMarker = useCallback(() => {
    }, []);

    const handleViewportChange = useCallback(viewport => {
        setViewport(viewport);
    }, []);

    const marker = { longitude: 0, latitude: 0 };
    const [markerPosition, setMarkerPosition] = useState({
        longitude: 0,
        latitude: 0
    });

    const onMarkerDragStart = useCallback(event => {
        // logEvents(_events => ({ ..._events, onDragStart: event.lngLat }));
    }, []);

    const onMarkerDrag = useCallback(event => {
        // logEvents(_events => ({ ..._events, onDrag: event.lngLat }));
    }, []);

    const onMarkerDragEnd = useCallback(event => {
        // logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));
        setMarker({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        });
    }, []);
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <div className="sps-dialog sps-dialog-full zw_select_location">
                    <div className="sps-dialog-body sps-dialog-overflow-unset sps-map">
                        <button className="sps-dialog-close" onClick={handleClose}>
                            <i className="icon-close"></i>
                        </button>
                        <div className="sps-loc-map">
                            <div id="spsmapbox" className="sps-mapboxgl-map" >
                                <ReactMapGL
                                    initialViewState={{
                                        longitude: -122.4,
                                        latitude: 37.8,
                                        zoom: 14
                                    }}
                                    style={{ width: "100vw", height: "100vh" }}
                                    mapStyle="mapbox://styles/mapbox/streets-v9"
                                    mapboxAccessToken='pk.eyJ1IjoiYWJkdWxyYTdtYW4iLCJhIjoiY2x0bzlvNTEwMDVoZTJrbWg4bHRxeXRwciJ9._WDrK6r6rayfB4WnardOwA'
                                >
                                    <Marker
                                        longitude={markerPosition.longitude}
                                        latitude={markerPosition.latitude}
                                        draggable
                                        onDragStart={onMarkerDragStart}
                                        onDrag={onMarkerDrag}
                                        onDragEnd={onMarkerDragEnd}
                                    >
                                        <img src={mapmarker} alt="Marker" />
                                    </Marker>
                                    <NavigationControl showZoom={true}></NavigationControl>
                                </ReactMapGL>

                                <header className="sps-loc-header zw_current_loc">
                                    <button type="submit" className="sps-btn sps-loc-crnt-btn icon-current-location"></button>
                                    <div className="sps-loc-field">
                                        <i className="sps-sprite sps-search"></i>
                                        <input placeholder="Search" className="sps-form-control search-location pac-target-input zw_secondary poppins-regular zw_16" type="text" id="search" name="search" autoComplete="off"></input>
                                        <i className="icon-close2 sps-form-icon"></i>
                                    </div>
                                </header>
                            </div>
                        </div>
                        <footer className="sps-loc-footer zw_loc_footer">
                            <div className="row">
                                <div className="col-md-6 sps-d-f-sbetween">
                                    <h5 className="sps-sprite sps-loc-map-ico sps-loc-type poppins-semibold zw_16">
                                        Visit Location
                                    </h5>
                                </div>
                                <div className='col-md-6'>
                                    <h5 className="poppins-semibold zw_16 text-right">
                                        Use my curent location
                                    </h5>
                                </div>
                            </div>
                            <div className='row zw_loc_icon'>
                                <div className="col-md-12 sps-mt10">
                                    <div className="sps-lcn-card">
                                        <div className="sps-d-f-sbetween">
                                            <h5>
                                                <i className="icon-location2 sps-mr5 zw_title_color"></i>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mt-4'>
                                <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                                    <button type="submit" className="btn btn-outline-primary sps-btn-view zw_btn_view ">View saved address</button>
                                </div>
                                <div className="col-md-6 sps-ftr-res-btn poppins-medium zw_btn_18">
                                    <button id='locbtn' data-bs-dismiss="modal" className="btn btn-primary sps-btn-confirm zw_btn_confirm " type="submit">
                                        <Link to='/laboratory'>
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
    )
}

export default LocationPopup
