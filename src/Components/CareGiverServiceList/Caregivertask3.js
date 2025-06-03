import React from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Caregivert1.css';
function Caregivertask1() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/selectlabs');
    };

    const caregiverTaskdata3 = [
        {
            image: require('../../assets/img/care_3.png'),
            title: 'Caregiver - After Giving Birth (Postpartum)',
            subtitle: 'Taking care of you and your newborn during the postpartum period, monitoring your medication and diet, helping you during breastfeeding, taking care of your personal hygiene and carrying your baby. Staying at home and working for 12 hours.',
            notehead: 'Includes',
            note: '** Does not include specialized nursing services such as injections.',
            noteimg: require('../../assets/img/radio Button.png')
        }
    ];
    return (
        <div>
            <Navbar />

            <div className="nursing-task-hRe">
                <div className='group-1261155501-1WC'>
                <div className="group-1261154093 d-flex">
                        <div>
                            <Link to={'/caregiver'}>
                                <div className="d-flex me-4 gap-4">
                                    <img className="group-1261154072" src="/images/Group 1261154072.png" alt='Group' />
                                    <span className="back poppins-medium zw_18 zw_black">
                                        Back
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className="line_indicator_container d-none-sm">
                            <div className="each_line_indicator active">
                            </div>
                            <div className="each_line_indicator active">
                            </div>
                            <div className="each_line_indicator">
                            </div>
                            <div className="each_line_indicator">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5" >
                <div className="row gap-5 padd-x">{
                    caregiverTaskdata3.map((item, index) => (
                        <div className="col-lg-7" key={index}>
                        <div className="sa-info-light-bg  sa-caregiver-helper ">
                            <div className="d-flex sel-caregiver-task">
                                <figure>
                                    <img src={item.image} alt="" style={{ width: "215px", height: "110px", borderRadius: '10px' }} />
                                </figure>
                                <p className='poppins-semibold zw_24 zw_text_color ms-4 d-flex align-items-center'>{item.title}</p>
                            </div>
                            <p className='px-4 poppins-regular zw_16 zw_secondary'>
                            {item.subtitle}
                            </p>
                            <div className='px-4 py-3 '>
                                <h6 className="poppins-bold zw_16 zw_title_color px-3 my-4" >{item.notehead}</h6>
                                <div className='d-flex'>
                                    <img src={item.noteimg} alt="" style={{ width: "26px", height: "26px", }} />
                                    {/* <label className="custom-radio">
                                        <input type="radio" name="radio" />
                                        <span className="checkmark"></span>
                                </label> */}
                                    <p className='px-3  poppins-regular zw_16 zw_title_color'>
                                    {item.note}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                   
                    <div className="col-lg-4 col-md-7">
                        <h3 className="poppins-semibold zw-16 zw_text_color" >Selected test</h3>
                        <div className="" style={{padding: '15px', background: '#f6f7f9', borderRadius: "10px" }}>
                            <h3 className=" poppins-semibold zw-16 zw_text_color" >
                                1 Week - 12 Hours
                            </h3>
                            <button className="sa-select-durationn zw_bg my-3 poppins-regular zw_14 zw_text_fff border-0" style={{ padding: "15px", borderRadius: "5px" }} onClick={handleButtonClick}>
                                Start from SAR 3000
                            </button>
                        </div>
                        <div className="" style={{padding: '15px', background: '#f6f7f9', borderRadius: "10px" }}>
                            <h3 className=" poppins-semibold zw-16 zw_text_color" >
                                2 Weeks - 12 Hours
                            </h3>
                            <button className="sa-select-durationn zw_bg my-3 poppins-regular zw_14 zw_text_fff border-0" style={{ padding: "15px", borderRadius: "5px" }} onClick={handleButtonClick}>
                                Start from SAR 3000
                            </button>
                        </div>
                        <div className="" style={{padding: '15px', background: '#f6f7f9', borderRadius: "10px" }}>
                            <h3 className=" poppins-semibold zw-16 zw_text_color" >
                                3 Weeks - 12 Hours
                            </h3>
                            <button className="sa-select-durationn zw_bg my-3 poppins-regular zw_14 zw_text_fff border-0" style={{ padding: "15px", borderRadius: "5px" }} onClick={handleButtonClick}>
                                Start from SAR 3000
                            </button>
                        </div>
                        <div className="" style={{padding: '15px', background: '#f6f7f9', borderRadius: "10px" }}>
                            <h3 className=" poppins-semibold zw-16 zw_text_color" >
                                4 Weeks - 12 Hours
                            </h3>
                            <button className="sa-select-durationn zw_bg my-3 poppins-regular zw_14 zw_text_fff border-0" style={{ padding: "15px", borderRadius: "5px" }} onClick={handleButtonClick}>
                                Start from SAR 3000
                            </button>
                        </div>
                    </div>
                </div>
                <br />
            </div>
            <Footer />
        </div>
    )
}

export default Caregivertask1
