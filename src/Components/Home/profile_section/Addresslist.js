import React, { useState, useEffect, useContext } from "react";
// import countryList from "react-select-country-list";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import "../../../Style/Wallet.css";
import { Link, useNavigate } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import cardData from './Addresscard';
// import { Context } from '../../Context';
// import MapLocationPop from '../MapLocationPop';
import { Context } from "../../../Context";
import MapLocationPop from "./MapLocationPop";
import EditIcon from "./../../../assets/img/edit.png";
import Profilenavbar from "./Profilenavbar";

const defaultImageUrl =
  "https://th.bing.com/th/id/OIP.awAiMS1BCAQ2xS2lcdXGlwAAAA?rs=1&pid=ImgDetMain"; // Replace with your initial image URL

function Addresslist() {
  // const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("SA");
  const { show, setShow } = useContext(Context);
  const {
    username,
    setUsername,
    addressList,
    setAddressList,
    setIsAuthenticated,
    userId,
  } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // const countries = countryList().getData();
    // setOptions(countries);

    if (userId) {
      const fetchAddress = async () => {
        try {
          const response = await fetch(
            `https://zuwara.net/admin/public/api/getaddress/${userId}`,
            {
              method: "GET",
              headers: {
                Cookie:
                  "zwarra_session=ehKPVgnMkHItOwPyeIxWiVODQtDFbQSmkUJv8UsJ",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched Address:", data);

            // Set the address list
            setAddressList(data);
          } else {
            console.error("Failed to fetch address:", response.status);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };

      fetchAddress();
    } else {
      console.warn("User ID is not set");
    }
  }, [userId, setAddressList]);

  const onLogOut = () => {
    setIsAuthenticated(false);
    setUsername("");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("username"); // Correct typo
    navigate("/");
  };

  const handleRemove = async (addressId, indexToRemove) => {
    try {
      const response = await fetch(
        `https://zuwara.net/admin/public/api/deleteaddress/${addressId}`, // Replace with dynamic addressId
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: "zwarra_session=your_session_cookie", // Replace with your session cookie
          },
          body: new URLSearchParams({
            Userid: userId, // Pass the userId dynamically from context
            Name: addressList[indexToRemove].name,
            Address: addressList[indexToRemove].address,
          }),
        }
      );

      if (response.ok) {
        console.log("Address deleted successfully");

        // Remove the address from the state after deletion
        const updatedList = addressList.filter(
          (_, index) => index !== indexToRemove
        );
        setAddressList(updatedList);
      } else {
        console.error("Failed to delete address:", response.status);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  
 
  return (
    <div>
      <Navbar />
      <div className="my-wallet-TQp">
        <div className="auto-group-9asv-tpt" style={{ marginTop: "80px" }}>
         <Profilenavbar/>
        </div>

        
        <div className="auto-group-ori4-usi my-4 container">
          
          <div className="row">
          <div className="medical-records-bs2 poppins-semibold zw_16 zw_text_color">
          Medical Records
        </div>
            <div className="col-lg-5 col-md-5 mb-5">
              <div className="auto-group-xyng-pzg">
                <div className="group-1261154812-MUp">
                  <div className="frame-1261154254-Vqv">
                    <div>
                      <img
                        className="image-87-obi"
                        src="/images/image-87.png"
                        alt=""
                      />
                    </div>
                    <div className="poppins-regular zw_16 zw_000">
                      <div>
                        All our service providers are certified and licensed by the
                        Ministry of Health, ensuring the highest quality and
                        reliable healthcare.
                      </div>
                      {/* <div style={{ marginTop: '5px' }}>
                                            No: ***********
                                        </div> */}
                    </div>
                  </div>

                  <div className="fram-37119-9xQ">
                    <img
                      className="group-1261154759-HHv"
                      src="/images/group-1261154759-for.png"
                      alt=""
                    />
                    <div className="blood-donation-DSU poppins-medium zw_16 zw_text_color">
                      <div>Blood Donation</div>
                      <div
                        className="zw_title_color cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#BloodGroupBackdrop"
                      >
                        Update
                      </div>
                    </div>
                    <div
                      class="modal fade"
                      id="BloodGroupBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabindex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content" style={{top: '150px'}}>
                          <div>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>

                          <div className="modal-body" style={{ margin: "25px" }}>
                            <h3 style={{ marginBottom: "30px" }}>
                              {" "}
                              Select Blood Group
                            </h3>
                            <div>
                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option1"
                                    className="profile_update_input"
                                  />
                                  A+
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option2"
                                    className="profile_update_input"
                                  />
                                  A-
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option3"
                                    className="profile_update_input"
                                  />
                                  B+
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option4"
                                    className="profile_update_input"
                                  />
                                  B-
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option5"
                                    className="profile_update_input"
                                  />
                                  AB+
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option6"
                                    className="profile_update_input"
                                  />
                                  AB-
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option7"
                                    className="profile_update_input"
                                  />
                                  O+
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option8"
                                    className="profile_update_input"
                                  />
                                  O-
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option9"
                                    className="profile_update_input"
                                  />
                                  I don't know
                                </label>
                              </div>
                              <div
                                className="d-grid gap-2 col-12 mx-auto mt-3"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                <button
                                  type="button"
                                  className="poppins-semibold zw_bg zw_text_fff border-0 rounded zw_16"
                                  style={{ height: "30px", marginTop: "20px" }}
                                >
                                  Save
                                </button>
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
                      <img
                        className="group-1261154891-5NC"
                        src="./images/group-1261154891-zd2.png"
                        alt=""
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        Patients list
                      </div>
                    </div>
                  </Link>
                  <Link to="/addresslist">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC text-col-filter "
                        src="/images/Addresslist.png"
                        alt=""
                      />
                      <div className="poppins-regular zw_16 zw_title_color">
                        Address list
                      </div>
                    </div>
                  </Link>
                  <Link to="/wallet">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC text-black-filter"
                        src="/images/group-1261154895.png"
                        alt=""
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        Wallet
                      </div>
                    </div>
                  </Link>
                  <Link to="/mydocter">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC"
                        src="./images/group-1261154894.png"
                        alt=""
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        My Doctor
                      </div>
                    </div>
                  </Link>
                  {/* <Link to="/savedcards">
                                    <div className="auto-group-r48k-MBJ">
                                        <img className="group-1261154891-5NC" src="./images/savecards.png" alt='' />
                                        <div className="poppins-regular zw_16 zw_text_color">Saved Cards</div>
                                    </div>
                                </Link>
                                <div className="auto-group-r48k-MBJ">
                                    <img className="group-1261154891-5NC" src="/images/order-svgrepo-com-1.png" alt='' />
                                    <div className="poppins-regular zw_16 zw_text_color">Docters Orders</div>
                                </div> */}
                  <div
                    className="auto-group-r48k-MBJ hover-profile"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalcountry"
                  >
                    <img
                      className="group-1261154891-5NC"
                      src="/images/country.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
                      Country
                    </div>
                  </div>
                  <div
                    class="modal fade"
                    id="exampleModalcountry"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content overflow-visible">
                        <div class="modal-header border-0">
                          {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                          <button
                            class="sps-dialog-close regv2back"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i class="icon-close"></i>
                          </button>
                        </div>
                        <div class="modal-body border-0 mt-4">
                          <label
                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                            htmlFor=""
                          >
                            Select Country
                          </label>
                          <div className="custom-flags-select">
                            <ReactFlagsSelect
                              selected={selected}
                              onSelect={(code) => setSelected(code)}
                              placeholder="Select Country"
                              searchable
                              searchPlaceholder="Search countries"
                              className="menu-flags"
                              selectedSize={20}
                              optionsSize={20}
                              selectButtonClassName="menu-flags-button"
                            />
                            {/* Custom arrow icon */}
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              className="custom-arrow-icon"
                            />
                          </div>
                        </div>
                        <div class="modal-footer border-0">
                          <div
                            className="d-grid gap-2 col-12 mx-auto mt-3"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <button
                              className="poppins-regular zw_text_fff zw_bg_gradient border-0 rounded zw_20 py-3 my-2"
                              type="button"
                              style={{ marginTop: "20px" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="auto-group-r48k-MBJ hover-profile"
                    data-bs-toggle="modal"
                    data-bs-target="#logoutBackdrop"
                  >
                    <img
                      className="group-1261154891-5NC"
                      src="./images/group-1261154887.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
                      Logout
                    </div>
                  </div>
                  <div
                    class="modal fade"
                    id="logoutBackdrop"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{ marginTop: "200px" }}
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>

                        <div
                          class="modal-body"
                          style={{
                            margin: "30px",
                            color: "#AF2245",
                            fontFamily: "poppins,sans-serif",
                          }}
                        >
                          <h2>Are you sure ,you want to logout ?</h2>
                          <div
                            class="d-grid gap-2 d-md-block"
                            style={{ marginTop: "30px", marginRight: "5px" }}
                          >
                            {/* <button class="btn btn" type="button" style={{ width: "200px", borderColor: "#AF2245", marginRight: "10px", height: "40px", borderRadius: "10px", }} onMouseEnter={(e) => e.target.style.backgroundColor = "#AF2245"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"} data-bs-dismiss="modal" aria-label="Close">Yes</button> */}
                            <button
                              className="poppins-semibold zw_18 border-0"
                              type="button"
                              style={{
                                width: "200px",
                                borderColor: "#AF2245",
                                height: "40px",
                                borderRadius: "10px",
                                color: "#000000",
                                marginRight: "10px",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#AF2245")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "transparent")
                              }
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={onLogOut}
                            >
                              yes
                            </button>
                            <button
                              className="poppins-semibold zw_18 border-0"
                              type="button"
                              style={{
                                width: "200px",
                                borderColor: "#AF2245",
                                height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#AF2245",
                                color: "Background",
                              }}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              <div className="group-1261154869-2s6">
                <Link to="/profile">
                  <div className="group-1261154838-YqS">
                    <img
                      className="group-1261154072-Sfv"
                      src="./images/group-1261154072-y5v.png"
                      alt=""
                    />
                    <p className="poppins-medium zw_18 zw_text_color mb-0">Back</p>
                  </div>
                </Link>
                <div className="container my-3">
                  <div className="d-flex flex-wrap justify-content-between align-items-center my-4 gap-4">
                    <p className="poppins-semibold zw_20 zw_text_color mb-0">
                      ADDRESS LIST
                    </p>
                    <button
                      className="buttonforaddress d-flex"
                      onClick={() => setShow(true)}
                    >
                      <img src="/images/plusmark.png" alt="" />
                      <p className="poppins-medium zw_16 zw_text_fff ms-3 mb-0">
                        Add New Address
                      </p>
                    </button>
                    {show ? <MapLocationPop path={"samePage"} /> : ""}
                  </div>

                  {addressList && addressList.length > 0 ? (
                    <ul>
                      {addressList.map((address, index) => (
                        <div key={index} className="card mt-5 rounded-3">
                          <div className="d-flex justify-content-between">
                            <p className="poppins-semibold zw_16 zw_text_color">
                              {address.Name}
                            </p>
                            <img
                              src={EditIcon}
                              alt="edit address"
                              // onClick={() => openEditModal(address)}
                              style={{
                                position: "absolute",
                                top: "10px",
                                padding: "5px",
                                right: "10px",
                                cursor: "pointer",
                                color: "#063B5B",
                              }}
                            />
                          </div>
                          <p className="poppins-regular zw_16 zw_text_color">
                            {address.Address}
                          </p>
                          <u
                            className="poppins-regular zw_16 zw_title_color"
                            onClick={() => handleRemove(address.id, index)}
                            style={{ cursor: "pointer" }}
                          >
                            Remove Address
                          </u>
                        </div>
                      ))}
                    </ul>
                  ) : (
                    <p className="poppins-medium zw_16">No addresses saved yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Addresslist;
