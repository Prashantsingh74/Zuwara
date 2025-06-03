// import React, { useState, useEffect } from 'react';
// import Navbar from '../../Layout/Navbar';
// import Footer from '../../Layout/Footer';
// import '../../../Style/Wallet.css';
// import { Link } from 'react-router-dom';
// import countryList from 'react-select-country-list';

// function Savedcards() {

//     const [options, setOptions] = useState([]);

//     useEffect(() => {
//         const countries = countryList().getData();
//         setOptions(countries);
//     }, []);

//     const [cardHolderName, setCardHolderName] = useState('');
//     const [error, setError] = useState(false);
//     const [number, setNumber] = useState('');
//     const [numberError, setNumberError] = useState(false);
//     const [month, setMonth] = useState('');
//     const [monthError, setMonthError] = useState(false);
//     const [year, setYear] = useState('');
//     const [yearError, setYearError] = useState(false);
//     const [cvv, setCVV] = useState('');
//     const [cvvError, setCVVError] = useState(false);
//     // const [isModalOpen, setIsModalOpen] = useState(true);

//     const handleInputChange = (event) => {
//         const { value } = event.target;
//         if (/^[A-Za-z\s]+$/.test(value) || value === '') {
//             setCardHolderName(value);
//             setError(value.trim() === '');
//         }
//     };

//     const handleNumberChange = (event) => {
//         const inputNumber = event.target.value.replace(/\D/g, '');
//         setNumber(inputNumber);
//         setNumberError(inputNumber.trim().length !== 16);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         if (cardHolderName.trim() === '' || number.trim().length !== 16 || month.trim().length !== 2 || isNaN(month) || parseInt(month) < 1 || parseInt(month) > 12 || year.trim().length !== 2 || isNaN(year) || parseInt(year) < 20 || parseInt(year) > 60 || cvv.trim().length !== 3 || isNaN(cvv)) {
//             return;
//         }

//     };

//     const handleMonthChange = (event) => {
//         const inputMonth = event.target.value;
//         setMonth(inputMonth);
//         setMonthError(inputMonth.trim().length !== 2 || isNaN(inputMonth) || parseInt(inputMonth) < 1 || parseInt(inputMonth) > 12);
//     };

//     const handleYearChange = (event) => {
//         const inputYear = event.target.value;
//         setYear(inputYear);
//         setYearError(inputYear.trim().length !== 2 || isNaN(inputYear) || parseInt(inputYear) < 20 || parseInt(inputYear) > 60);
//     };

//     const handleCVVChange = (event) => {
//         const inputCVV = event.target.value;
//         setCVV(inputCVV);
//         setCVVError(inputCVV.trim().length !== 3 || isNaN(inputCVV));
//     };
//     return (
//         <div>
//             <div>
//                 <Navbar />
//                 <div className="my-wallet-TQp" >
//                     <div className="auto-group-sjb2-96c">
//                         <div className="frame-1261154258-Ueg">

//                             <div className="frame-1261154257-mdn">
//                                 <Link to="/appointment">
//                                     <div className="group-1261154933-XN4">
//                                         <img className="vector-3bJ" src="./images/vector-j6C.png" alt='' />
//                                         <div className="appointments-mnC">Appointments</div>
//                                     </div>
//                                 </Link>
//                                 <img className="line-4-JGL" src="./images/line-4-dP2.png" alt='' />
//                                 <Link to="/precription">
//                                     <div className="group-1261154786-2y2">
//                                         <Link to="/precription">
//                                             <img className="vector-Zi4" src="/images/vector-6hS.png" alt='' />
//                                         </Link>
//                                         <div className="prescription-u1E">Prescription</div>
//                                     </div>
//                                 </Link>
//                                 <img className="line-5-2rY" src="./images/line-5-Lrg.png" alt='' />
//                                 <Link to="/reports">
//                                     <div className="group-1261154785-Axk">
//                                         <img className="report-svgrepo-com-1-HXa" src="./images/report-svgrepo-com-1-ivQ.png" alt='' />
//                                         <div className="reports-p1i">Reports</div>
//                                     </div>
//                                 </Link>
//                             </div>
//                         </div>
//                         <div className="group-1261154818-8HJ">
//                             <div className="group-1261154816-qxQ">
//                                 <p className="muhammad-shiekh-mr4">
//                                     Muhammad
//                                     <br />
//                                     Shiekh
//                                 </p>
//                                 <img className="rectangle-39635-gTE" src="./images/rectangle-39635-dHe.png" alt='' />
//                                 <img className="group-1261154791-onk" src="./images/group-1261154791-p6Y.png" alt='' />
//                             </div>
//                             <div className="group-1261154747-XCx">
//                                 <p className="my-zwaara-5kG">My ZWAARA</p>
//                                 <p className="all-your-health-related-information-is-here-your-test-results-summary-of-previous-appointments-and-medical-reports-you-can-review-the-summaries-of-yours-and-your-dependents-whenever-you-want-in-your-zwaara-account-oRN">All your health related information is here. Your test results, summary of previous appointments, and medical reports You can review the summaries of yours and your dependents whenever you want in your Zwaara account.</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="medical-records-bs2">Medical Records</div>
//                     <div className="auto-group-ori4-usi">
//                         <div className="auto-group-xyng-pzg">
//                             <div className="group-1261154812-MUp">
//                                 <div className="frame-1261154254-Vqv">
//                                     <div className="image-87-obi">
//                                     </div>
//                                     <div className="auto-group-pbfa-53S">
//                                         <div className="zwaara-is-a-licensed-company-by-the-saudi-ministry-of-health-with-license-dKr">
//                                             zwaara is a licensed company by the
//                                             <br />
//                                             Saudi Ministry of Health with License
//                                         </div>
//                                         <div className="no--i6Q">No: ***********</div>
//                                     </div>
//                                 </div>
//                                 <div className="group-1261154811-o7r">
//                                     <div className="frame-37119-9xQ">
//                                         <img className="group-1261154759-HHv" src="./images/group-1261154759-CN8.png" alt='' />
//                                         <div className="blood-donation-DSU">Blood Donation</div>
//                                         <div className="update-ie8" data-bs-toggle="modal" data-bs-target="#BloodGroupBackdrop">Update</div>
//                                     </div>
//                                     <div class="modal fade" id="BloodGroupBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ marginTop: "100px" }}>
//                                         <div class="modal-dialog">
//                                             <div class="modal-content" style={{ width: "500px" }}>
//                                                 <div >

//                                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                                 </div>


//                                                 <div className="modal-body" style={{ margin: "25px" }} >
//                                                     <h3 style={{ marginBottom: "30px" }}> Select Blood Group</h3>
//                                                     <div>
//                                                         <div style={{ width: "100%", height: "40px" }}>
//                                                             <label style={{ borderRadius: "10px", padding: "5px", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center" }}>
//                                                                 <input type="radio" name="option" value="option1" style={{ height: "20px", width: "100px", marginRight: "5px" }} />
//                                                                 A+
//                                                             </label>
//                                                         </div>

//                                                         <div style={{ width: "100%", height: "40px" }}>
//                                                             <label style={{ borderRadius: "10px", padding: "5px", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center" }}>
//                                                                 <input type="radio" name="option" value="option2" style={{ height: "20px", width: "100px", marginRight: "5px" }} />
//                                                                 A-
//                                                             </label>
//                                                         </div>

//                                                         <div style={{ width: "100%", height: "40px" }}>
//                                                             <label style={{ borderRadius: "10px", padding: "5px", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center" }}>
//                                                                 <input type="radio" name="option" value="option3" style={{ height: "20px", width: "100px", marginRight: "5px" }} />
//                                                                 B+
//                                                             </label>
//                                                         </div>

//                                                         <div style={{ width: "100%", height: "40px" }}>
//                                                             <label style={{ borderRadius: "10px", padding: "5px", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center" }}>
//                                                                 <input type="radio" name="option" value="option4" style={{ height: "20px", width: "100px", marginRight: "5px" }} />
//                                                                 B-
//                                                             </label>
//                                                         </div>

//                                                         <div style={{ width: "100%", height: "40px" }}>
//                                                             <label style={{ borderRadius: "10px", padding: "5px", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center" }}>
//                                                                 <input type="radio" name="option" value="option5" style={{ height: "20px", width: "100px", marginRight: "5px" }} />
//                                                                 AB+
//                                                             </label>
//                                                         </div>

//                                                         <div style={{ width: "100%", height: "40px" }}>
//                                                             <label style={{ borderRadius: "10px", padding: "5px", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center" }}>
//                                                                 <input type="radio" name="option" value="option6" style={{ height: "20px", width: "100px", marginRight: "5px" }} />
//                                                                 AB-
//                                                             </label>
//                                                         </div>

//                                                         <div style={{ width: "100%", height: "40px" }}>
//                                                             <label style={{ borderRadius: "10px", padding: "5px", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center" }}>
//                                                                 <input type="radio" name="option" value="option7" style={{ height: "20px", width: "100px", marginRight: "5px" }} />
//                                                                 O+
//                                                             </label>
//                                                         </div>

//                                                         <div style={{ width: "100%", height: "40px" }}>
//                                                             <label style={{ borderRadius: "10px", padding: "5px", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center" }}>
//                                                                 <input type="radio" name="option" value="option8" style={{ height: "20px", width: "100px", marginRight: "5px" }} />
//                                                                 O-
//                                                             </label>
//                                                         </div>

//                                                         <div style={{ width: "100%", height: "40px" }}>
//                                                             <label style={{ borderRadius: "10px", padding: "5px", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center" }}>
//                                                                 <input type="radio" name="option" value="option9" style={{ height: "20px", width: "100px", marginRight: "5px" }} />
//                                                                 I don't know
//                                                             </label>
//                                                         </div>
//                                                         <div className="d-grid gap-2 col-12 mx-auto mt-3" data-bs-dismiss="modal" aria-label="Close">
//                                                             <button type="button" style={{ height: "30px", marginTop: "20px" }} >Save</button>
//                                                         </div>
//                                                     </div>



//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="group-1261154919-pBN">
//                                 <Link to="/records">
//                                 <div className="auto-group-r48k-MBJ">
//                                     <img className="group-1261154891-5NC" src="/images/group-1261154891.png" alt='' />
//                                     <div className="patients-list-Ptg">Patients list</div>
//                                 </div>
//                                 </Link>
//                                 <Link to="/addresslist">
//                                     <div className="auto-group-r48k-MBJ">
//                                         <img className="group-1261154891-5NC" src="/images/Addresslist.png" alt='' />
//                                         <div className="patients-list-Ptg">Address list</div>
//                                     </div>
//                                 </Link>
//                                 <Link to="/wallet">
//                                     <div className="auto-group-5pgp-WiQ">
//                                         <img className="group-1261154895-Dcp" src="./images/group-1261154895-gUC.png" alt='' />
//                                         <div className="wallet-wYp">Wallet</div>
//                                     </div>
//                                 </Link>

//                                 <Link to="/mydocter">
//                                     <div className="auto-group-uyjp-5Q8">
//                                         <img className="group-1261154894-QhJ" src="./images/group-1261154894.png" alt='' />
//                                         <div className="my-doctor-Y2p">My Doctor</div>
//                                     </div>
//                                 </Link>
//                                 <div className="auto-group-r48k-MBJ">
//                                     <img className="group-1261154891-5NC" src="/images/savecards.png" alt='' />
//                                     <div className="patients-list-Ptg">Saved Cards</div>
//                                 </div>
//                                 <div className="auto-group-r48k-MBJ">
//                                     <img className="group-1261154891-5NC" src="/images/order-svgrepo-com-1.png" alt='' />
//                                     <div className="patients-list-Ptg">Docters Orders</div>
//                                 </div>
//                                 <div className="auto-group-r48k-MBJ" data-bs-toggle="modal" data-bs-target="#CountryBackdrop">
//                                     <img className="group-1261154891-5NC" src="/images/country.png" alt='' />
//                                     <div className="patients-list-Ptg">Country</div>

//                                 </div>
//                                 <div class="modal fade" id="CountryBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ marginTop: "200px" }}>
//                                     <div class="modal-dialog">
//                                         <div class="modal-content" style={{ width: "650px", height: "200px" }}>
//                                             <div >

//                                                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                             </div>


//                                             <div className="modal-body" style={{ margin: "20px" }}>
//                                                 <label className="zw_poppins_regular poppins-regular zw_20 zw_text_111535" htmlFor="">Select Country</label>
//                                                 <select className="form-select zw_form_control zw_secondary poppins-regular zw_16" style={{ width: "100%", height: "40px" }}>
//                                                     <option value="" selected disabled>Select Country</option>
//                                                     {options.map(country => (
//                                                         <option key={country.value} value={country.value}>{country.label}</option>
//                                                     ))}
//                                                 </select>
//                                                 <div className="d-grid gap-2 col-12 mx-auto mt-3" data-bs-dismiss="modal" aria-label="Close">
//                                                     <button type="button" style={{ height: "30px", marginTop: "20px" }} >Save</button>
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="auto-group-uhgq-USG" data-bs-toggle="modal" data-bs-target="#logoutBackdrop">
//                                     <img className="group-1261154887-Due" src="./images/group-1261154887.png" alt='' />
//                                     <div className="logout-j7J">Logout</div>
//                                 </div>
//                                 <div class="modal fade" id="logoutBackdrop" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: "200px" }}>
//                                     <div class="modal-dialog">
//                                         <div class="modal-content" style={{ width: "600px" }}>


//                                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

//                                             <div class="modal-body" style={{ margin: "30px", color: "#AF2245", fontFamily: "poppins,sans-serif" }}>
//                                                 <h1>
//                                                     Are you sure ,you want to logout ?
//                                                 </h1>
//                                                 <div class="d-grid gap-2 d-md-block" style={{ marginTop: "30px", marginRight: "5px" }}>
//                                                     <button class="btn btn" type="button" style={{ width: "200px", borderColor: "#AF2245", marginRight: "10px", height: "40px", borderRadius: "10px", }} data-bs-dismiss="modal" aria-label="Close">Yes</button>
//                                                     <button class="btn btn" type="button" style={{ width: "200px", borderColor: "#AF2245", height: "40px", borderRadius: "10px", backgroundColor: "#AF2245", color: "Background" }} data-bs-dismiss="modal" aria-label="Close">No</button>
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="group-1261154869-2s6" style={{ height: "200px", marginTop: "60px" }}>
//                             <Link to="/profile">
//                                 <div className="group-1261154838-YqS" style={{ marginTop: "-80px" }}>
//                                     <img className="group-1261154072-Sfv" src="./images/group-1261154072-y5v.png" alt='' />
//                                     <p className="back-kRi">Back</p>
//                                 </div>
//                             </Link>
//                             <div className='titlesavedcard' style={{ marginTop: "30px", fontFamily: "sans-serif", marginLeft: "30px", }} data-bs-toggle="modal" data-bs-target="#AddcardBackdrop">
//                                 <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>Saved Cards</h4>
//                                 <button type="button" class="btn btn " style={{ position: "absolute", top: "30px", right: "30px", borderColor: "#AF2245", padding: "10px", fontSize: "15px", fontFamily: "sans-serif" }}>

//                                     <i class="icon-saved-card" style={{ "padding": "10px" }}></i>
//                                     Add credit / debit card
//                                     <i class="icon-right-arrow" style={{ "padding": "10px" }}></i>
//                                 </button>
//                             </div>
//                             <div>

//                             </div>
//                             <div class="modal fade" id="AddcardBackdrop" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
//                                 <div class="modal-dialog">
//                                     <div class="modal-content" style={{ marginTop: "0px", width: "850px", height: "700px" }} >


//                                         {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}

//                                         <div class="modal-body" >
//                                             <div className="modal-body">
//                                                 <div className='btn-space'>
//                                                     <button type="button" className="sps-dialog-close  regv2back" data-bs-dismiss="modal" aria-label="Close">
//                                                         <i className="icon-close" style={{ marginTop: "30px" }}></i>
//                                                     </button>
//                                                 </div>
//                                                 <div className="payment-details-toe" style={{ marginLeft: "-100px", width: "900px", marginTop: "-85px" }}>
//                                                     <div className="group-1261154744-FzC">

//                                                         <div className="group-1261154935-Cnx">
//                                                             <img className="group-1261154937-LPN" src="/images/group-1261154937.png" alt='' />
//                                                             <p className="add-new-card-gCL">Add new card</p>
//                                                         </div>

//                                                         <form onSubmit={handleSubmit}>
//                                                             <div className="group-1261154699-pZS">
//                                                                 <p className="name-on-card-ZG8">Name on card</p>
//                                                                 <div className="auto-group-m6jy-V9n">
//                                                                     <input
//                                                                         type="text"
//                                                                         value={cardHolderName}
//                                                                         onChange={handleInputChange}
//                                                                         placeholder="card holder name"
//                                                                         style={{ width: "630px" }}
//                                                                     />
//                                                                 </div>
//                                                                 {error && <p className="error-message">Please enter the card holder name</p>}
//                                                             </div>

//                                                             <div className="group-1261154729-MSt">
//                                                                 <p className="call-number-fyN">Card Number</p>
//                                                                 <input
//                                                                     type="number"
//                                                                     className="auto-group-joye-DEC"
//                                                                     value={number}
//                                                                     onChange={handleNumberChange}
//                                                                     placeholder="0000 0000 0000 0000"

//                                                                 />
//                                                                 {numberError && <p className="error-message">Please enter a valid 16-digit number</p>}
//                                                             </div>

//                                                             <div className="group-1261154743-Xu6">
//                                                                 <div className="group-1261154742-TXr">
//                                                                     <div className="group-1261154741-CVS">
//                                                                         <div className="group-1261154730-whv">
//                                                                             <p className="call-number-6ap">Card Details</p>
//                                                                             <div className="auto-group-vezg-ES8">
//                                                                                 <input
//                                                                                     type="text"
//                                                                                     value={month}
//                                                                                     onChange={handleMonthChange}
//                                                                                     placeholder="MM"
//                                                                                 />
//                                                                             </div>
//                                                                             {monthError && <p className="error-message" style={{ marginTop: "-28px" }}>Please enter a valid month (MM)</p>}

//                                                                             {/* <div>
//                                                                                 <label className="switch">
//                                                                                     <input type="checkbox"></input>
//                                                                                     <span className="slider1 round"></span>
//                                                                                 </label>
//                                                                             </div> */}

//                                                                         </div>
//                                                                     </div>
//                                                                     <div className="group-1261154739-p9S" >
//                                                                         <input
//                                                                             type="text"
//                                                                             value={year}
//                                                                             onChange={handleYearChange}
//                                                                             placeholder="YY"
//                                                                         />
//                                                                         {yearError && <p className="error-message" style={{ color: "red", fontSize: "10px", marginTop: "10px", marginLeft: '-30px' }}>Please enter a valid year (YY)</p>}
//                                                                     </div>

//                                                                 </div>
//                                                                 <div className="group-1261154740-dcg" >
//                                                                     <p className="cid-cvv-b3i">CID/CVV</p>
//                                                                     <div className="auto-group-wzly-vbn">
//                                                                         <input
//                                                                             type="number"
//                                                                             value={cvv}
//                                                                             onChange={handleCVVChange}
//                                                                             placeholder="CID/CVV"
//                                                                             maxLength={3}
//                                                                         />
//                                                                     </div>
//                                                                     {cvvError && <p className="error-message">Please enter a valid 3-digit CID/CVV</p>}
//                                                                 </div>
//                                                                 <br />
//                                                                 <div className="col-12 col-md-12" style={{ marginTop: "150px", marginLeft: "-730px", backgroundColor: "#FFF8E4", color: "#a19999", fontSize: "10px" }}>
//                                                                     <h3 className="col-12 col-md-12">
//                                                                         Note: To verify your card, an amount of <b>SAR 3.75  </b>will be deducted from your account. <br />
//                                                                         <span style={{ display: " block", "text-align": "center" }}>The amount will be automatically refunded to your account</span>
//                                                                     </h3>

//                                                                 </div>

//                                                                 <button class="btn btn" type="button" style={{ "marginTop": "250px", marginLeft: "-730px", width: "750px", height: "50px", backgroundColor: "#AF2245", color: "white", fontSize: "20px" }} data-bs-dismiss="modal" aria-label="Close">Save</button>


//                                                             </div>



//                                                             {/* <Link to='/Payment' >
//                                                                 <p className="close-iGk" onClick={handleCloseModal} >submit</p>
//                                                             </Link> */}

//                                                             <img className="image-81-Rwr" src="/images/image-81.png" alt='' />
//                                                             <img className="image-82-ZYG" src="/images/image-82.png" alt='' />
//                                                             <img className="image-84-taY" src="/images/image-84.png" alt='' />
//                                                             <img className="image-85-pj6" src="/images/image-85.png" alt='' />
//                                                             <img className="image-86-uVe" src="/images/image-86.png" alt='' />

//                                                         </form>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>
//                             <h3 style={{ marginTop: "90px", marginLeft: "300px" }}>No data found</h3>
//                         </div>
//                     </div>
//                 </div>
//                 <br />
//                 <br />
//                 <br />
//                 <Footer />
//             </div>
//         </div>
//     )
// }

// export default Savedcards
