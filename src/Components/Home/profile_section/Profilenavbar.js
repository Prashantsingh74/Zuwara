import React, { useState, useEffect, useContext } from "react";
import "../../../Style/Profile.css";
import { Link } from "react-router-dom";
import { Context } from "../../../Context";

function Profilenavbar() {
    const { username, setIsAuthenticated, userId, profileImage, setProfileImage } = useContext(Context);

    // const [profileImage, setProfileImage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const storedSignupFormData = sessionStorage.getItem("signupFormData");
        if (storedSignupFormData) {
            setIsAuthenticated(true);
        }

        // Load profile image from local storage
        const storedProfileImage = localStorage.getItem("profileImage");
        if (storedProfileImage) {
            setProfileImage(storedProfileImage);
        } else {
            fetchProfileImage();
        }
    }, [setIsAuthenticated]);

    const fetchProfileImage = async () => {
        try {
            const response = await fetch(
                `https://zuwara.net/admin/public/api/getprofileimage/${userId}`,
                {
                    headers: {
                        Cookie: "zwarra_session=AseZUluz3zsr6q5MQvNH52FVZ8VDTRkSC3LfoSdF",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data?.profile_image?.image) {
                    setProfileImage(data.profile_image.image);
                    localStorage.setItem("profileImage", data.profile_image.image); // Save to local storage
                }
            } else {
                console.error("API call failed with status:", response.status);
            }
        } catch (error) {
            console.error("Failed to fetch profile image:", error);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];

        if (file && file.type.includes("image")) {
            const formData = new FormData();
            formData.append("profile_image", file);

            try {
                const response = await fetch(
                    `https://zuwara.net/admin/public/api/profileimage/${userId}`,
                    {
                        method: "POST",
                        headers: {
                            Cookie: "zwarra_session=AseZUluz3zsr6q5MQvNH52FVZ8VDTRkSC3LfoSdF",
                        },
                        body: formData,
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data.patient_record?.image) {
                        setProfileImage(data.patient_record.image);
                        localStorage.setItem("profileImage", data.patient_record.image); // Save to local storage
                        setError("");
                    }
                } else {
                    console.error("Failed to upload image. Status:", response.status);
                    setError("Failed to upload the image.");
                }
            } catch (error) {
                console.error("An error occurred during the upload:", error);
                setError("");
            }

            // Convert the uploaded file to Base64 and save it
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                setProfileImage(base64Image);
                localStorage.setItem("profileImage", base64Image); // Save Base64 image
            };
            reader.readAsDataURL(file);
        } else {
            setError("Invalid file type. Please upload an image.");
        }
    };

    return (
        <div className="container">
            <div className="group-1261154818-4we row py-5 ">
                <div className="group-1261154816-bAt col-lg-2 col-md-2">
                    <div className="outimage">
                        {profileImage ? (
                            <div className="file-thumbnail position-relative">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="rectangle-39635-2X6"
                                />
                            </div>
                        ) : (
                            <p className="poppins-regular zw_16 zw_text_fff">
                                No profile image uploaded
                            </p>
                        )}
                        {error && <div className="poppins-medium zw_title_color">{error}</div>}
                    </div>
                    <div className="group-1261154816-bAt">
                        <label htmlFor="file-upload" className="group-1261154824-yye">
                            <img
                                className="group-1261154791-ZG8"
                                src="/images/group-1261154791.png"
                                alt="upload-img"
                            />
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                        />
                    </div>
                    <p className="muhammad-shiekh-7f2 poppins-regular zw_16 zw_text_fff">
                        {username}
                    </p>
                </div>
                <div className="group-1261154747-gLk col-lg-10 col-md-10">
                    <p className="poppins-semibold zw_34 zw_text_fff">My ZUWARA</p>
                    <div>
                        <p className="poppins-regular zw_16 zw_text_fff">
                            All your health-related information is here. Your test results,
                            summary of previous appointments, and medical reports. You can
                            review the summaries of yours and your dependents whenever you
                            want in your Zuwara account.
                        </p>
                    </div>
                    <div className="frame-1261154258-qVE">
                        <div className="group-h1e poppins-medium zw_11">
                            <Link to="/appointment">
                                <div className="group-dAC">
                                    <img src="./images/vector-2KN.png" alt="" />
                                    <div className="zw_000">Appointments</div>
                                </div>
                            </Link>
                            <img className="line-4-DeC" src="./images/Line 4.png" alt="" />
                            <Link to="/prescription">
                                <div className="group-AJY">
                                    <img src="./images/vector-6hS.png" alt="" />
                                    <div className="zw_000">Prescription</div>
                                </div>
                            </Link>
                            <img className="line-4-DeC" src="./images/Line 4.png" alt="" />
                            <Link to="/reports">
                                <div className="group-uQY">
                                    <img src="./images/report-svgrepo-com-1.png" alt="" />
                                    <div className="zw_000">Reports</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profilenavbar;
