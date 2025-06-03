import React, { useState, useEffect, useContext } from 'react';
import countryList from 'react-select-country-list';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';
import '../../../Style/Wallet.css';
import { Link, useNavigate } from 'react-router-dom';
import ReactFlagsSelect from "react-flags-select";
import { Context } from '../../../Context';
import MapLocationPop from '../../MapLocationPop';

function Addresslist() {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState("IN");
    const { show, setShow } = useContext(Context);
    const { addressList, setAddressList, signupFormData, setIsAuthenticated } = useContext(Context);
    const { Firstname, Lastname } = signupFormData;
    const navigate = useNavigate();

    useEffect(() => {
        const countries = countryList().getData();
        setOptions(countries);
    }, []);

    const onLogOut = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('signupFormData');
        navigate("/");
    };

    const handleRemove = (indexToRemove) => {
        const updatedList = addressList.filter((_, index) => index !== indexToRemove);
        setAddressList(updatedList);
    };

    return (
        <div>
            <Navbar />
            <div className="my-wallet-TQp">
                <div className="auto-group-9asv-tpt" style={{ marginTop: "80px" }}>
                    <div className="group-1261154818-4we">
                        <div className="group-1261154816-bAt">
                            <img className="rectangle-39635-2X6" src="./images/rectangle-39634.png" alt='' />
                            <img className="group-1261154791-ZG8" src="/images/group-1261154791.png" alt='' />
                            <p className="muhammad-shiekh-7f2 poppins-regular zw_16 zw_text_fff">
                                {Firstname} {Lastname}
                            </p>
                        </div>
                        <div className="group-1261154747-gLk">
                            <p className="poppins-semibold zw_34 zw_text_fff">My ZWAARA</p>
                            <div>
                                <p className="poppins-regular zw_16 zw_text_fff">
                                    All your health-related information is here. Your test results, summary of previous appointments, and medical reports. You can review the summaries of yours and your dependents whenever you want in your Zwaara account.
                                </p>
                            </div>
                            <div className="frame-1261154258-qVE">
                                <div className='group-h1e poppins-medium zw_11'>
                                    <Link to='/appointment'>
                                        <div className="group-dAC">
                                            <img src="./images/vector-2KN.png" alt='' />
                                            <div className="zw_000">Appointments</div>
                                        </div>
                                    </Link>
                                    <img className="line-4-DeC" src="./images/Line 4.png" alt='' />
                                    <Link to='/prescription'>
                                        <div className="group-AJY">
                                            <img src="./images/vector-6hS.png" alt='' />
                                            <div className="zw_000">Prescription</div>
                                        </div>
                                    </Link>
                                    <img className="line-4-DeC" src="./images/Line 4.png" alt='' />
                                    <Link to='/reports'>
                                        <div className="group-uQY">
                                            <img src="./images/report-svgrepo-com-1.png" alt='' />
                                            <div className="zw_000">Reports</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="medical-records-bs2 poppins-semibold zw_16 zw_text_color">Medical Records</div>
                <div className="auto-group-ori4-usi">
                    <div className="auto-group-xyng-pzg">
                        <div className="group-1261154812-MUp">
                            <div className="frame-1261154254-Vqv">
                                <div>
                                    <img className="image-87-obi" src="/images/image-87.png" alt='' />
                                </div>
                                <div className='poppins-regular zw_16 zw_000'>
                                    <div>
                                        zwaara is a licensed company by the Saudi Ministry of Health with License
                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        No: ***********
                                    </div>
                                </div>
                            </div>
                            <div className="fram-37119-9xQ">
                                <img className="group-1261154759-HHv" src="/images/group-1261154759-for.png" alt='' />
                                <div className='blood-donation-DSU poppins-medium zw_16 zw_text_color'>
                                    <div>Blood Donation</div>
                                    <div className="zw_title_color" data-bs-toggle="modal" data-bs-target="#BloodGroupBackdrop">Update</div>
                                </div>
                                <div class="modal fade" id="BloodGroupBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content" style={{ width: "500px" }}>
                                            <div>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body" style={{ margin: "25px" }}>
                                                <h3 style={{ marginBottom: "30px" }}> Select Blood Group</h3>
                                                <div>
                                                    {/* Blood group options */}
                                                    {/* ... */}
                                                    <div className="d-grid gap-2 col-12 mx-auto mt-3" data-bs-dismiss="modal" aria-label="Close">
                                                        <button type="button" className="poppins-semibold zw_bg zw_text_fff border-0 rounded zw_16" style={{ height: "30px", marginTop: "20px" }}>Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group-1261154919-pBN">
                            <Link to="/patientlist">
                                <div className="auto-group-r48k-MBJ">
                                    <img className="group-1261154891-5NC" src="./images/group-1261154891-zd2.png" alt='' />
                                    <div className="poppins-regular zw_16 zw_text_color">Patients list</div>
                                </div>
                            </Link>
                            <Link to="/addresslist">
                                <div className="auto-group-r48k-MBJ">
                                    <img className="group-1261154891-5NC text-col-filter" src="/images/Addresslist.png" alt='' />
                                    <div className="poppins-regular zw_16 zw_title_color">Address list</div>
                                </div>
                            </Link>
                            <Link to="/wallet">
                                <div className="auto-group-r48k-MBJ">
                                    <img className="group-1261154891-5NC text-black-filter" src="/images/group-1261154895.png" alt='' />
                                    <div className="poppins-regular zw_16 zw_text_color">Wallet</div>
                                </div>
                            </Link>
                            <Link to="/mydocter">
                                <div className="auto-group-r48k-MBJ">
                                    <img className="group-1261154891-5NC" src="./images/group-1261154894.png" alt='' />
                                    <div className="poppins-regular zw_16 zw_text_color">My Doctor</div>
                                </div>
                            </Link>
                            {/* Other links */}
                            <div className="auto-group-r48k-MBJ hover-profile" data-bs-toggle="modal" data-bs-target="#exampleModalcountry">
                                <img className="group-1261154891-5NC" src="/images/country.png" alt='' />
                                <div className="poppins-regular zw_16 zw_text_color">Country</div>
                            </div>
                            <div class="modal fade" id="exampleModalcountry" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: "130px" }}>
                                <div class="modal-dialog">
                                    <div class="modal-content overflow-visible">
                                        <div class="modal-header border-0">
                                            <button type="button" class="btn-close py-4" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body border-0 mt-4">
                                            <h3>Select Country</h3>
                                            <label for="exampleFormControlInput1" class="form-label poppins-semibold">Select Country</label>
                                            <div style={{ width: "460px", height: "320px", borderRadius: "5px" }}>
                                                <ReactFlagsSelect
                                                    selected={selected}
                                                    onSelect={(code) => setSelected(code)}
                                                    className="menu-flags"
                                                    searchable={true}
                                                    alignOptionsToRight={false}
                                                    fullWidth={false}
                                                />
                                            </div>
                                            <div class="modal-footer border-0 mt-4 d-flex justify-content-center">
                                                <button type="button" class="btn zw_bg border-0 text-white col-12 py-2" data-bs-dismiss="modal">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div onClick={onLogOut} className="poppins-regular zw_16 zw_text_color hover-profile">
                                Logout
                            </div>
                        </div>
                    </div>
                    <div className="group-1261154802-c3A">
                        <div className="group-1261154799-99x">
                            <p className="address-list-CLz poppins-semibold zw_16 zw_text_color">Address List</p>
                            <div className="group-1261154798-sxr">
                                {addressList.map((address, index) => (
                                    <div className="group-1261154797-gci" key={index}>
                                        <div className="frame-1261154287-RdC">
                                            <div className='poppins-regular zw_16 zw_000'>
                                                {/* Display the name and address here */}
                                                <div>{address.name}</div>
                                                <div>{address.address}</div>
                                            </div>
                                            <div className="poppins-regular zw_14 zw_title_color" onClick={() => handleRemove(index)}>Remove Address</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button className="poppins-semibold zw_bg zw_text_fff border-0 rounded zw_16" onClick={() => setShow(true)}>Add New Address</button>
                            </div>
                        </div>
                    </div>
                </div>
                {show && <MapLocationPop />}
            </div>
            <Footer />
        </div>
    );
}

export default Addresslist;
