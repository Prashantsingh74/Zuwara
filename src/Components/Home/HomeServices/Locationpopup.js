import React from 'react'
import GoogleMapReact from 'google-map-react';
// import { Link } from 'react-router-dom';
function Locationpopup() {
    return (
        <div>
            <div className="modal fade" id="locationPopup" data-bs-backdrop="static" role="dialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Visit location</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="sps-loc-map">
                                <div id="spsmapbox" className="sps-mapboxgl-map" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <div style={{ height: "500px", width: "100%" }}>
                                        <GoogleMapReact
                                            defaultCenter={{ lat: 20.9471, lng: 72.8990 }}
                                            defaultZoom={15}
                                        />
                                    </div>
                                    <form>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label">Recipient:</label>
                                            <input type="text" class="form-control" id="recipient-name" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="message-text" class="col-form-label">Message:</label>
                                            <textarea class="form-control" id="message-text"></textarea>
                                            <div className="mb-3">
                                                <label for="recipient-name" className="col-form-label">Recipient:</label>
                                                <input type="text" className="form-control" id="recipient-name" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="message-text" className="col-form-label">Message:</label>
                                                <textarea className="form-control" id="message-text"></textarea>
                                            </div>
                                        </div>
                                    </form>
                                    <header className="sps-loc-header">
                                        <button type="submit" className="sps-btn sps-loc-crnt-btn icon-current-location"></button>
                                        <div className="sps-loc-field">
                                            <i className="sps-sprite sps-search"></i>
                                            <input placeholder="Search" className="sps-form-control search-location pac-target-input" type="text" id="search" name="search" autoComplete="off"></input>
                                            <i className="icon-close2 sps-form-icon"></i>
                                        </div>
                                    </header>
                                </div>
                            </div>
                            <div className="sps-row">

                                <div className="sps-col12 sps-d-f-sbetween">
                                    <h5 className="sps-sprite sps-loc-map-ico sps-loc-type">
                                        <b>Visit location</b>
                                    </h5>
                                </div>
                                <div className="sps-col12 sps-mt10">
                                    <div className="sps-lcn-card">
                                        <div className="sps-d-f-sbetween">
                                            <h5>
                                                <i className="icon-location2 sps-mr5 sps-success-text"></i>
                                                <b>Madinah</b>
                                            </h5>
                                            <small className="sps-save-lcn-text">Save Location</small>
                                        </div>
                                        <p>Nike Store,  Sultana street, Madinah, Medina, Saudi Arabia</p>
                                    </div>
                                </div>
                                <div className="sps-col12 sps-ftr-res-btn">
                                    <button type="submit" className="btn btn-outline-primary sps-btn-view">View saved address</button>

                                    <button id='locbtn' data-bs-dismiss="modal" className="btn btn-primary sps-btn-confirm" type="submit">
                                        Confirm location
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Locationpopup
