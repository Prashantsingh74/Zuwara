import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../../../Context";
import { Link } from "react-router-dom";
import { allCountries } from 'country-telephone-data';
import CountryFlag from 'react-country-flag';
function Iqamaaddpatient() {
    const countries = [
        { code: 'sa', name: 'Saudi Arabia', countryCode: '+966' },
        { code: 'af', name: 'Afghanistan', countryCode: '+93' },
        { code: 'al', name: 'Algeria', countryCode: '+213' },
        { code: 'ar', name: 'Argentina', countryCode: '+54' },
        { code: 'as', name: 'American Samoa', countryCode: '+1 684' },
        { code: 'at', name: 'Austria', countryCode: '+43' },
        { code: 'au', name: 'Australia', countryCode: '+61' },
        { code: 'bd', name: 'Bangladesh', countryCode: '+880' },
        { code: 'be', name: 'Belgium', countryCode: '+32' },
        { code: 'bg', name: 'Bulgaria', countryCode: '+359' },
        { code: 'bn', name: 'Brunei', countryCode: '+673' },
        { code: 'br', name: 'Brazil', countryCode: '+55' },
        { code: 'bt', name: 'Bhutan', countryCode: '+975' },
        { code: 'ca', name: 'Canada', countryCode: '+1' },
        { code: 'ch', name: 'Switzerland', countryCode: '+41' },
        { code: 'ck', name: 'Cook Islands', countryCode: '+682' },
        { code: 'cl', name: 'Chile', countryCode: '+56' },
        { code: 'cn', name: 'China', countryCode: '+86' },
        { code: 'co', name: 'Colombia', countryCode: '+57' },
        { code: 'cz', name: 'Czech Republic', countryCode: '+420' },
        { code: 'de', name: 'Germany', countryCode: '+49' },
        { code: 'dk', name: 'Denmark', countryCode: '+45' },
        { code: 'dz', name: 'Algeria', countryCode: '+213' },
        { code: 'eg', name: 'Egypt', countryCode: '+20' },
        { code: 'es', name: 'Spain', countryCode: '+34' },
        { code: 'fi', name: 'Finland', countryCode: '+358' },
        { code: 'fj', name: 'Fiji', countryCode: '+679' },
        { code: 'fm', name: 'Micronesia', countryCode: '+691' },
        { code: 'fr', name: 'France', countryCode: '+33' },
        { code: 'gh', name: 'Ghana', countryCode: '+233' },
        { code: 'gr', name: 'Greece', countryCode: '+30' },
        { code: 'gu', name: 'Guam', countryCode: '+1 671' },
        { code: 'hr', name: 'Croatia', countryCode: '+385' },
        { code: 'hu', name: 'Hungary', countryCode: '+36' },
        { code: 'id', name: 'Indonesia', countryCode: '+62' },
        { code: 'ie', name: 'Ireland', countryCode: '+353' },
        { code: 'il', name: 'Israel', countryCode: '+972' },
        { code: 'in', name: 'India', countryCode: '+91' },
        { code: 'iq', name: 'Iraq', countryCode: '+964' },
        { code: 'jo', name: 'Jordan', countryCode: '+962' },
        { code: 'jp', name: 'Japan', countryCode: '+81' },
        { code: 'ke', name: 'Kenya', countryCode: '+254' },
        { code: 'kg', name: 'Kyrgyzstan', countryCode: '+996' },
        { code: 'kh', name: 'Cambodia', countryCode: '+855' },
        { code: 'kp', name: 'North Korea', countryCode: '+850' },
        { code: 'kr', name: 'South Korea', countryCode: '+82' },
        { code: 'kw', name: 'Kuwait', countryCode: '+965' },
        { code: 'la', name: 'Laos', countryCode: '+856' },
        { code: 'lb', name: 'Lebanon', countryCode: '+961' },
        { code: 'lk', name: 'Sri Lanka', countryCode: '+94' },
        { code: 'ma', name: 'Morocco', countryCode: '+212' },
        { code: 'mh', name: 'Marshall Islands', countryCode: '+692' },
        { code: 'mm', name: 'Myanmar', countryCode: '+95' },
        { code: 'mn', name: 'Mongolia', countryCode: '+976' },
        { code: 'mp', name: 'Northern Mariana Islands', countryCode: '+1 670' },
        { code: 'mv', name: 'Maldives', countryCode: '+960' },
        { code: 'mx', name: 'Mexico', countryCode: '+52' },
        { code: 'my', name: 'Malaysia', countryCode: '+60' },
        { code: 'nc', name: 'New Caledonia', countryCode: '+687' },
        { code: 'ng', name: 'Nigeria', countryCode: '+234' },
        { code: 'nl', name: 'Netherlands', countryCode: '+31' },
        { code: 'no', name: 'Norway', countryCode: '+47' },
        { code: 'np', name: 'Nepal', countryCode: '+977' },
        { code: 'nz', name: 'New Zealand', countryCode: '+64' },
        { code: 'om', name: 'Oman', countryCode: '+968' },
        { code: 'pe', name: 'Peru', countryCode: '+51' },
        { code: 'ph', name: 'Philippines', countryCode: '+63' },
        { code: 'pk', name: 'Pakistan', countryCode: '+92' },
        { code: 'pl', name: 'Poland', countryCode: '+48' },
        { code: 'pt', name: 'Portugal', countryCode: '+351' },
        { code: 'pw', name: 'Palau', countryCode: '+680' },
        { code: 'qa', name: 'Qatar', countryCode: '+974' },
        { code: 'ro', name: 'Romania', countryCode: '+40' },
        { code: 'rs', name: 'Serbia', countryCode: '+381' },
        { code: 'ru', name: 'Russia', countryCode: '+7' },
        { code: 'sa', name: 'Saudi Arabia', countryCode: '+966' },
        { code: 'sb', name: 'Solomon Islands', countryCode: '+677' },
        { code: 'se', name: 'Sweden', countryCode: '+46' },
        { code: 'sg', name: 'Singapore', countryCode: '+65' },
        { code: 'si', name: 'Slovenia', countryCode: '+386' },
        { code: 'sk', name: 'Slovakia', countryCode: '+421' },
        { code: 'sy', name: 'Syria', countryCode: '+963' },
        { code: 'th', name: 'Thailand', countryCode: '+66' },
        { code: 'tj', name: 'Tajikistan', countryCode: '+992' },
        { code: 'tm', name: 'Turkmenistan', countryCode: '+993' },
        { code: 'to', name: 'Tonga', countryCode: '+676' },
        { code: 'tr', name: 'Turkey', countryCode: '+90' },
        { code: 'tv', name: 'Tuvalu', countryCode: '+688' },
        { code: 'tz', name: 'Tanzania', countryCode: '+255' },
        { code: 'ua', name: 'Ukraine', countryCode: '+380' },
        { code: 'uk', name: 'United Kingdom', countryCode: '+44' },
        { code: 'us', name: 'United States', countryCode: '+1' },
        { code: 'uy', name: 'Uruguay', countryCode: '+598' },
        { code: 'uz', name: 'Uzbekistan', countryCode: '+998' },
        { code: 've', name: 'Venezuela', countryCode: '+58' },
        { code: 'vn', name: 'Vietnam', countryCode: '+84' },
        { code: 'vu', name: 'Vanuatu', countryCode: '+678' },
        { code: 'ws', name: 'Samoa', countryCode: '+685' },
        { code: 'ye', name: 'Yemen', countryCode: '+967' },
        { code: 'za', name: 'South Africa', countryCode: '+27' }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countryName, setCountryName] = useState('Saudi Arabia');
    const [errorNationality, setErrorNationality] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [country, setCountry] = useState("");
    const [passportid, setpassportid] = useState("");
    const [borderno, setBorderno] = useState("");
    const [sponserid, setSponserid] = useState("");
    const [iqamatype, setIqamatype] = useState("Iqama patient");
    const [dob, setDob] = useState("");
    const [type, setType] = useState("Iqama");
    const [bloodgroup, setBloodgroup] = useState("");
    const [phone, setPhone] = useState("");
    const [relationship, setRelationship] = useState("");
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");
    const [errorMsg, setErrorMsg] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [flag, setFlag] = useState("");
    const [code, setCode] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef(null);


    // Filtered list based on search query
    const filteredCountries = allCountries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())

    );

    // Handle click outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            // If the modal is open, set a timeout to close it after 1 second
            const timeout = setTimeout(() => {
                setIsModalOpen(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [isModalOpen]);



    const { IqamaPatientName, setIqamaPatientName } = useContext(Context);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let valid = true;

        if (!firstname) {
            setErrorMsg((prevState) => ({ ...prevState, Firstname: "Please provide your First Name" }));
            valid = false;
        }

        if (!lastname) {
            setErrorMsg((prevState) => ({ ...prevState, Lastname: "Please provide your Last Name" }));
            valid = false;
        }

        if (!dob) {
            setErrorMsg((prevState) => ({ ...prevState, Dob: "Please provide your Date of Birth" }));
            valid = false;
        }

        if (!bloodgroup) {
            setErrorMsg((prevState) => ({ ...prevState, Bloodgroup: "Please provide your Bloodgroup" }));
            valid = false;
        }

        if (!country) {
            setErrorMsg((prevState) => ({ ...prevState, Nationality: "Please provide your Nationality" }));
            valid = false;
        }

        if (!passportid) {
            setErrorMsg((prevState) => ({ ...prevState, passportid: "Please provide your Passport/ID number" }));
            valid = false;
        }

        if (!relationship) {
            setErrorMsg((prevState) => ({ ...prevState, Relationship: "Please provide your Relationship" }));
            valid = false;
        }

        if (!phone) {
            setErrorMsg((prevState) => ({ ...prevState, Phone: "Please provide your Mobile Number" }));
            valid = false;
        } else if (phone.length !== 10) {
            setErrorMsg((prevState) => ({ ...prevState, Phone: "Mobile Number must be 10 digits" }));
            valid = false;
        }

        if (!gender) {
            setErrorMsg((prevState) => ({ ...prevState, Gender: "Please select your Gender" }));
            valid = false;
        }

        if (valid) {


            // API integration using fetch
            try {
                const formData = new FormData();
                formData.append('Firstname', firstname);
                formData.append('Lastname', lastname);
                formData.append('Nationality', country);
                formData.append('Passportid', passportid);
                formData.append('Borderno', borderno);
                formData.append('Sponserid', sponserid);
                formData.append('Iqamatype', iqamatype);
                formData.append('Dob', dob);
                formData.append('Type', type);
                formData.append('Bloodgroup', bloodgroup);
                formData.append('Phone', phone);
                formData.append('Relationship', relationship);
                formData.append('Gender', gender);
                formData.append('Description', description);

                const response = await fetch('https://zuwara.net/admin/public/api/registerpatient', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Cookie': 'zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ'
                    }
                });

                const result = await response.json();
                if (response.ok) {
                    console.log('Patient registered successfully:', result);
                    // alert("Patient Profile created successfully");
                    setIqamaPatientName([
                        ...IqamaPatientName,
                        {
                            Firstname: firstname,
                            Lastname: lastname,
                            Dob: dob,
                            Phone: phone,
                            Gender: gender,
                            Country: country,
                            Nationalid: passportid
                        },
                    ]);
                    setFirstname("");
                    setLastname("");
                    setCountry("");
                    setpassportid("");
                    setBorderno("");
                    setSponserid("");
                    setIqamatype("Iqama patient");
                    setDob("");
                    setBloodgroup("");
                    setPhone("");
                    setRelationship("");
                    setGender("");
                    setDescription("");
                    setErrorMsg({});
                    setIsModalOpen(true);

                } else {
                    console.error('Error registering patient:', result);
                    // Handle error (e.g., show an error message)
                }
            } catch (error) {
                console.error('Network error:', error);
                // Handle network error (e.g., show a network error message)
            }
        }
    };

    return (
        <div className="zw_popup zw_addgray">
            <div
                className="modal fade zw_Healthpackage"
                id="LogInPopUpModal41"
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true"
                show={isModalOpen} onHide={() => setIsModalOpen(false)}
            >
                <div id="adddetailsmodal" className="modal-dialog modal-dialog-centered" role="document">
                    <div
                        className="modal-content px-4"

                    >
                        <div className="modal-body">
                            <div className="btn-space">
                                <button
                                    className="sps-dialog-close regv2back"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <i className="icon-close"></i>
                                </button>
                            </div>
                            <div>
                                <h6
                                    className="poppins-semibold zw_text_color zw_32 mb-2 py-3"
                                    style={{ textAlign: "left" }}
                                >
                                    Add Patient
                                </h6>
                            </div>
                            <div className="container">
                                <div className="cont-us top-space">
                                    <div>
                                        <div className="row gutter">
                                            <form onSubmit={handleSubmit}> 
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label
                                                            htmlFor="Firstname"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            First Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            id="firstName"
                                                            name="Firstname"
                                                            placeholder="First name"
                                                            value={firstname}
                                                            onChange={(e) => setFirstname(e.target.value)}
                                                        />
                                                        {errorMsg.Firstname && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {errorMsg.Firstname}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="col">
                                                        <label
                                                            htmlFor="Lastname"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            Last Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            id="lastName"
                                                            name="Lastname"
                                                            placeholder="Last name"
                                                            value={lastname}
                                                            onChange={(e) => setLastname(e.target.value)}
                                                        />
                                                        {errorMsg.Lastname && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {errorMsg.Lastname}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label
                                                            htmlFor="Country"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            Country
                                                        </label>
                                                        {/* <input
                                                            type="text"
                                                            className="form-control"
                                                            id="country"
                                                            name="Country"
                                                            placeholder="Enter country"
                                                            value={country}
                                                            onChange={(e) => setCountry(e.target.value)}
                                                        /> */}

                                                        <i className="icon-down-arrow form-icon zw_icon_drop mt-5"></i>
                                                        <select
                                                            id="countrycode"
                                                            name="Country"
                                                            className={`form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16 ${errorNationality ? "is-invalid" : ""
                                                                }`}
                                                            value={country}
                                                            onChange={(e) => setCountry(e.target.value)}
                                                        >
                                                            <option value="">Select Nationality</option>
                                                            {countries.map((country) => (
                                                                <option key={country.code} value={country.code}>
                                                                    {country.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errorMsg.Country && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {errorMsg.Country}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="col">
                                                        <label
                                                            htmlFor="passportid"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            Passport/ID number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            id="passportid"
                                                            name="passportid"
                                                            placeholder="Enter national ID"
                                                            value={passportid}
                                                            onChange={(e) => setpassportid(e.target.value)}
                                                        />
                                                        {errorMsg.passportid && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {errorMsg.passportid}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label
                                                            htmlFor="Border"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            Border No *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            id="borderno"
                                                            name="borderno"
                                                            placeholder="Enter Border no"
                                                            value={borderno}
                                                            onChange={(e) => setBorderno(e.target.value)}


                                                        />

                                                        <i className="icon-down-arrow form-icon zw_icon_drop mt-5"></i>

                                                        {errorMsg.Borderno && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >

                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="col">
                                                        <label
                                                            htmlFor="passportid"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            Sponsor ID Number *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            id="sponserid"
                                                            name="sponserid"
                                                            placeholder="Enter sponsor ID"
                                                            value={sponserid}
                                                            onChange={(e) => setSponserid(e.target.value)}


                                                        />
                                                        {errorMsg.sponserid && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {errorMsg.sponserid}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label
                                                            htmlFor="Gender"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            Gender
                                                        </label>
                                                        {/* <select
                              id="gender"
                              name="Gender"
                              className="form-control"
                              required
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select> */}

                                                        <i className="icon-down-arrow form-icon zw_icon_drop mt-5"></i>
                                                        <select
                                                            id="gendercode"
                                                            name="Gender"
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            value={gender}
                                                            onChange={(e) => setGender(e.target.value)}
                                                        >
                                                            <option value="">Select Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                        {errorMsg.Gender && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {errorMsg.Gender}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="col">
                                                        <label
                                                            htmlFor="Dob"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            Date of Birth
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            id="dob"
                                                            name="Dob"
                                                            placeholder="Enter date of birth"
                                                            value={dob}
                                                            onChange={(e) => setDob(e.target.value)}
                                                        />
                                                        {errorMsg.Dob && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {errorMsg.Dob}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <input
                                                            type="text"
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            id="description"
                                                            name="description"
                                                            placeholder="Add your text notes here..."
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}

                                                            style={{ height: "80px", backgroundColor: "#F6F7F9" }}
                                                        />


                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label
                                                            htmlFor="BloodGroup"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            Iqama type
                                                        </label>
                                                        <input

                                                            type="text"
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            id="iqamatype"
                                                            name="iqamatype"
                                                            placeholder="Enter Iqama type"
                                                            value={iqamatype}
                                                            onChange={(e) => setIqamatype(e.target.value)}
                                                        />
                                                        {/* <div>
                                                            <i className="icon-down-arrow form-icon zw_icon_drop mt-5"></i>
                                                            <select
                                                                id="bloodGroup"
                                                                name="Bloodgroup"
                                                                className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                                value={bloodgroup}
                                                               
                                                            >
                                                                <option value="">Select Blood Group</option>
                                                                
                                                                <option value="B-">Residence examination
                                                                </option>
                                                                <option value="O+">driver's license examination</option>
                                                                <option value="O-">municipal examination</option>
                                                            </select>
                                                        </div> */}
                                                        {errorMsg.Iqamatype && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {errorMsg.Iqamatype}
                                                            </p>
                                                        )}
                                                        {/* <div>
                                                            <i className="icon-down-arrow form-icon zw_icon_drop mt-5"></i>
                                                            <select
                                                                id="bloodGroup"
                                                                name="Bloodgroup"
                                                                className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"


                                                            >
                                                                <option value="">Select Iqama type</option>

                                                                <option value="B-">Residence examination
                                                                </option>
                                                                <option value="O+">driver's license examination</option>
                                                                <option value="O-">municipal examination</option>
                                                            </select>
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label
                                                            htmlFor="BloodGroup"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            Blood Group
                                                        </label>
                                                        {/* <input
                              type="text"
                              className="form-control"
                              id="bloodGroup"
                              name="Bloodgroup"
                              placeholder="Enter blood group"
                              value={bloodgroup}
                              onChange={(e) => setBloodgroup(e.target.value)}
                            /> */}
                                                        <div>
                                                            <i className="icon-down-arrow form-icon zw_icon_drop mt-5"></i>
                                                            <select
                                                                id="bloodGroup"
                                                                name="Bloodgroup"
                                                                className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                                value={bloodgroup}
                                                                onChange={(e) => setBloodgroup(e.target.value)}
                                                            >
                                                                <option value="">Select Blood Group</option>
                                                                <option value="A+">A+</option>
                                                                <option value="A-">A-</option>
                                                                <option value="AB+">AB+</option>
                                                                <option value="AB-">AB-</option>
                                                                <option value="B+">B+</option>
                                                                <option value="B-">B-</option>
                                                                <option value="O+">O+</option>
                                                                <option value="O-">O-</option>
                                                            </select>
                                                        </div>
                                                        {errorMsg.Bloodgroup && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {errorMsg.Bloodgroup}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div class="row mb-4">
                                                    <div className="col-12 col-md-12">
                                                        <label
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                            style={{ marginBottom: "5px" }}
                                                        >
                                                            Mobile Number (Optional)
                                                        </label>
                                                    </div>
                                                    <div class="col-4 col-md-4">
                                                        <div
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            style={{ height: "49px" }}
                                                        >
                                                            <div
                                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "start",
                                                                    alignItems: "center",
                                                                    height: "100%",
                                                                    paddingLeft: "1px",
                                                                }}
                                                            >
                                                                <div className="zw_secondary poppins-regular zw_16">
                                                                    <div>
                                                                        {flag === "" ? (
                                                                            <>
                                                                                <img
                                                                                    src={`https://sanar-assets.com/flags/sa_64.png`}
                                                                                    alt="Country Flags"
                                                                                    height={20}
                                                                                    width={20}
                                                                                />{" "}
                                                                                +966
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <img
                                                                                    src={`https://sanar-assets.com/flags/${flag}_64.png`}
                                                                                    alt="Country Flags"
                                                                                    height={20}
                                                                                    width={20}
                                                                                />{" "}
                                                                                {code}
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <div className='dpcontent poppins-regular zw_18 zw_secondary pb-0' style={{
                                                                        position: "absolute",
                                                                        top: "100%",
                                                                        left: "0",
                                                                        backgroundColor: "white",
                                                                        padding: "10px",
                                                                        width: "100%",
                                                                        fontSize: "0.7em",
                                                                        maxHeight: dropdownOpen ? "250px" : "0",
                                                                        zIndex: "10",
                                                                        overflow: "auto",
                                                                        cursor: "pointer",
                                                                        display: dropdownOpen ? "block" : "none",
                                                                        border: "2px solid #ddd",
                                                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                                                    }}>

                                                                        {/* Search input field */}
                                                                        <input
                                                                            type="text"
                                                                            className='poppins-regular zw_secondary zw_16 bg-transparent mb-0 pb-0'
                                                                            placeholder="Search country..."
                                                                            value={searchQuery}
                                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                                            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        />

                                                                        {/* Filtered country list */}
                                                                        {filteredCountries.map((item, index) => (
                                                                            <div key={index} onClick={() => {
                                                                                setCode(item.dialCode);
                                                                                setFlag(item.iso2);
                                                                                setCountryName(item.name);
                                                                                setDropdownOpen(false);
                                                                                setSearchQuery(''); // Reset search on selection
                                                                            }}>


                                                                                {/* {allCountries.map((item, index) => (
                                                                            <div key={index} onClick={() => {
                                                                                setCode(item.dialCode);
                                                                                setFlag(item.iso2);
                                                                                setCountryName(item.name);
                                                                                setDropdownOpen(false);
                                                                            }}> */}
                                                                                <CountryFlag countryCode={item.iso2.toUpperCase()} svg style={{ width: '30px', height: '30px' }} />
                                                                                {item.name} {item.dialCode}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <i className="icon-down-arrow form-icon zw_icon_drop pl-4 "></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-8 col-md-8">
                                                        <div className="form-group zw_form_group">
                                                            <input
                                                                style={{ width: "97%" }}
                                                                type="text"
                                                                name="Phone"
                                                                placeholder="Enter phone number"
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                                className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16"
                                                            ></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label
                                                            htmlFor="Relationship"
                                                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                                                        >
                                                            Relationship
                                                        </label>
                                                        <i className="icon-down-arrow form-icon zw_icon_drop mt-5"></i>
                                                        <select
                                                            id="gendercode"
                                                            name="Relationship"
                                                            className="form-control form-controll-add-patient zw_form_control zw_secondary poppins-regular zw_16 "
                                                            value={relationship}
                                                            onChange={(e) => setRelationship(e.target.value)}
                                                        >
                                                            <option key="" value="">
                                                                Select Relationship
                                                            </option>
                                                            <option key="" value="Father">
                                                                Father
                                                            </option>
                                                            <option key="" value="Mother">
                                                                Mother
                                                            </option>
                                                            <option key="" value="Brother">
                                                                Brother
                                                            </option>
                                                            <option key="" value="Sister">
                                                                Sister
                                                            </option>
                                                            <option key="" value="Son">
                                                                Son
                                                            </option>
                                                            <option key="" value="Other">
                                                                Other
                                                            </option>
                                                        </select>
                                                        {errorMsg.Relationship && (
                                                            <p
                                                                style={{
                                                                    color: "red",
                                                                    margin: 0,
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {errorMsg.Relationship}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-group poppins-regular zw_18 zw_000">
                                                    By clicking add patient you, agree to our &nbsp;
                                                    <Link
                                                        to="/termsandcondition"
                                                        className=""
                                                        style={{ color: "#602D8A" }}
                                                    >
                                                        Terms &amp; Conditions
                                                    </Link>{" "}
                                                    and{" "}
                                                    <Link
                                                        to="/privacypolicy"
                                                        className=""
                                                        style={{ color: "#602D8A" }}
                                                    >
                                                        Privacy Policy
                                                    </Link>
                                                </div>
                                                <div className="d-grid gap-2 col-6 mx-auto">
                                                    <button
                                                        className="bt btn-primar zw_bg_gradient py-4 border-0 rounded poppins-regular zw_14 zw_text_fff "
                                                        type="submit"
                                                        variant="secondary"
                                                        // onClick={handleSubmit}
                                                        data-bs-dismiss="modal"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Iqamaaddpatient;