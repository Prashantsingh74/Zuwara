import React from "react";
import '../../../Style/NurseTask.css';
import { useState, useContext, useEffect } from "react";
import cross from "../../../images/close.svg";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import { Context } from '../../../Context';
import MapLocationPop from '../../MapLocationPop';

function NurseVisitTask() {
    // const NurseVisitData = [
    //     {
    //         headingName: `Injection/Home IV Therapy`,
    //         description:
    //             "The nurse injects a drug or solution directly into the vein or through IV cannula, the nurse will confirm allergy history prior to give IV treatment. Hide details",
    //         subDescription:
    //             "Includes : Syringe and IV tube will be brought. Possibility to check allergy from the prescribed medication by taking a drug allergy test. , * solutions and drugs to be injected are not included. , *Instructions: The patient must present a medical prescription that includes the medication name and dosages",
    //     },
    //     {
    //         headingName: "Wound Care",
    //         description:
    //             "The nurse performs wound cleaning and dressing, including bedsores (pressure ulcers). More details",
    //         subDescription: "Includes : Syringe and IV tube will be brought. Possibility to check allergy from the prescribed medication by taking a drug allergy test. , * solutions and drugs to be injected are not included. , *Instructions: The patient must present a medical prescription that includes the medication name and dosages",
    //     },
    //     {
    //         headingName: "Removal Of Stitches",
    //         description:
    //             "The nurse will remove stitches from injuries and post-surgical wounds. More details",
    //         subDescription: "Includes : Syringe and IV tube will be brought. Possibility to check allergy from the prescribed medication by taking a drug allergy test. , * solutions and drugs to be injected are not included. , *Instructions: The patient must present a medical prescription that includes the medication name and dosages",
    //     },
    //     {
    //         headingName: "Nebulisation",
    //         description: `The nurse will assist you through a session in which you will be able to inhale medicine as a spray through a mask . Shortness of breath and the airway will be improved with this treatment. More details`,
    //         subDescription: "Includes : Syringe and IV tube will be brought. Possibility to check allergy from the prescribed medication by taking a drug allergy test. , * solutions and drugs to be injected are not included. , *Instructions: The patient must present a medical prescription that includes the medication name and dosages",
    //     },
    //     {
    //         headingName: "Oxygen Therapy",
    //         description:
    //             "A 15-30-minute oxygen treatment session will be provided by the nurse to treat shortness of breath (dyspnea) and low blood oxygen levels (hypoxemia).More details",
    //         subDescription: "Includes : Syringe and IV tube will be brought. Possibility to check allergy from the prescribed medication by taking a drug allergy test. , * solutions and drugs to be injected are not included. , *Instructions: The patient must present a medical prescription that includes the medication name and dosages",
    //     },
    // ];

    const [selectedTest, setSelectedTest] = useState([]);
    const [inputText, setInputText] = useState("");
    const [testQuantity, setTestQuantity] = useState({});
    const [NurseVisitData, setNurseVisitData] = useState([]);
    const [filteredData, setFilteredData] = useState(NurseVisitData);
    const [count, setCount] = useState(Array(filteredData.length).fill(0));

    const navigate = useNavigate();
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

    const showLocation = (loc) => {
        setLocationName(loc);
        updateAppointmentData({ Address: loc });
        const latitude = 45.07187238118124;
        const longitude = 26.286879877969852;
        fetchZoneData(latitude, longitude);
    };
    //   const handlenext = async (e) => {
    //     e.preventDefault();
    //     if (selectedTest.length === 0) return; // Prevent continuation without selection
    //     console.log("Step 2 data", appointmentData);
    //     const subservicesJson = JSON.stringify(selectedTest.map(test => (test.Enname)));
    //     updateAppointmentData({ Subservices: subservicesJson });
    //     navigate("/Vaccinationcenter");
    //   };
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

    const handleToggleSelect = (item) => {
        if (selectedTest.includes(item)) {
            setSelectedTest((prevSelected) =>
                prevSelected.filter((selected) => selected !== item)
            );
            setTestQuantity((prevState) => ({ ...prevState, [item.headingName]: 1 }));
        } else {
            setSelectedTest((prevSelected) => [...prevSelected, item]);
        }
    };


    const [query, setQuery] = useState("");
    // const [NurseVisitData, setNurseVisitData] = useState(NurseVisitData);


    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        const filtered = NurseVisitData.filter((item) =>
            item.Enname.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredData(filtered);
    };

    useEffect(() => {
        fetch(
            "https://zuwara.net/admin/public/api/subservices?id=4&servicetype=single"
        )

            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setNurseVisitData(data);
                setFilteredData(data);
            });
    }, []);


    const [locationName, setLocationName] = useState('');
    const { show, setShow } = useContext(Context)



    return (
        <>
            <div>
                <Navbar />
                <div className="vaccination" style={{ marginTop: "60px", width: "100%" }}>
                    <div className="container-17">
                        <div className="group-1261154093">
                            <Link to={"/"}>
                                <div className="d-flex mx-4">

                                    <img
                                        className="group-1261154072"
                                        src="/images/Group 1261154072.png"
                                        alt=""
                                    />
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
                            Nursing Tasks
                        </div>
                        <div className="container-13 gap-4">
                            <div className="col-xl-5 col-lg-6 col-md-12 mx-4 frames-37119 p-4">
                                <div className='align-self-center d-flex select-location-hover ' onClick={() => setShow(true)}>
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
                                <form style={{ display: "flex" }}>
                                    <input
                                        style={{ width: "38rem", borderRadius: '5px 0px 0px 5px', padding: '13px' }}
                                        type="text"
                                        className="search-input zw_14 poppins-regular"
                                        placeholder="Search your lab tests & Packages"
                                        value={query}
                                        onChange={handleSearchInputChange}
                                    />

                                    <button style={{ borderRadius: '0px 5px 5px 0px ', }} type="submit" class="search-button zw_bgwhite">
                                        <i class="icon-search zw_black "></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="container-4 m-0" style={{ padding: '1px 7%', gap: '1rem' }}>
                        <div>
                            {filteredData.length > 0 ? (
                                filteredData?.map((item, index) => (
                                    <div
                                        className="children-vaccination-card" style={{ border: "none" }}
                                        key={item?.Enname}
                                    >
                                        {console.log(item.Enname)}
                                        <div className="vaccination-box">
                                            <div
                                                className={`select_box ${selectedTest.includes(item) ? "select-box-bg" : ""
                                                    }`}
                                                onClick={() => handleToggleSelect(item)}
                                            ></div>
                                            <div className="children-vaccination">
                                                <div>
                                                    <div
                                                        className="childrens-vaccination-age-2-month poppins-bold zw_24 zw_text_color"
                                                        style={{ marginLeft: 0, marginTop: 0 }}
                                                    >
                                                        {item?.Enname}
                                                    </div>
                                                    <div className="poppins-regular zw_16 zw_secondary">
                                                        {item?.Endescription}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="vaccination-details ultrasound-details w-100" style={{ color: "#af2245", display: item.Ardescription.length === 0 ? "none" : "block" }}>
                                                <span className="poppins-regular zw_16">
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

                        <div className="col-lg-4 col-sm-8 mb-5">
                            <div className="selected-test poppins-semibold zw_16 zw_text_color">
                                Selected test
                            </div>
                            <div className="container-11 w-100">
                                {selectedTest?.map((item, index) => (
                                    <div className="frame-1261154252">
                                        <div className="selected-test-details">
                                            <div className="poppins-medium zw_12 zw_title_color">
                                                {item?.Enname}
                                            </div>
                                        </div>
                                        <button
                                            className="component-1"
                                            onClick={() => handleToggleSelect(item)}
                                        >
                                            <img src={cross} alt="" />
                                        </button>
                                    </div>
                                ))}
                                <Link
                                    to={`${selectedTest?.length !== 0 ? "/nursevisitcenter" : ""}`}
                                >
                                    <button
                                        className={`frame-37121 poppins-regular zw_14 zw_text_fff w-100 ${selectedTest?.length === 0 ? "disabled" : ""
                                            }`}
                                        style={{ cursor: selectedTest?.length === 0 ? 'not-allowed' : 'pointer' }}
                                        onClick={handlenext}
                                    >
                                        Continue
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {show ? <MapLocationPop path={"samePage"} locName={showLocation} /> : ""}
                <Footer />
            </div>
        </>
    );
}

export default NurseVisitTask;