import React, { useState } from 'react'
import '../../../Style/Home.css'
import ClinicCardItem from './ClinicCardItem'
import { data } from '../../../ClinicData.js'
import { Link } from 'react-router-dom';

function VirtualConsultationsPopup() {
    const [search, setSearch] = useState('');

    return (
        <>
            <div >
                <div className='mt-5'>
                    <div className='container'>
                        <div>
                            <div className='d-flex flex-column flex-md-row mb-3 ms-4 '>
                                <div className='poppins-regular zw_18 zw_text_color me-4 d-none d-lg-block d-md-block'>Step 1 of 4</div>
                                <div className='line_indicator_container'>
                                    <div className='each_line_indicator active'></div>
                                    <div className='each_line_indicator active'></div>
                                    <div className='each_line_indicator active'></div>
                                    <div className='each_line_indicator active'></div>
                                </div>
                            </div>
                            <div className='row ms-4'>
                                <div className='col-lg-2 poppins-semibold zw_32 zw_text_color'>E-Clinics</div>
                                <div className='col-lg-8'>
                                <div className='row w-100'>
                                    <div className="col-12">
                                        <div className="">
                                            <i className="icon-search z-form-icon"></i>
                                            <input onChange={(e) => setSearch(e.target.value)} autoComplete="off" name="speciality" type="text" placeholder="Search Speciality" className="form-control z-form-control-sm z-form-control-smm poppins-semibold zw_18 zw_text_color" style={{ width: '100%', marginLeft: '0' }} />
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>


                        <div className='row'>
                        <div className='mt-5' style={{ scrollBehavior: "auto" }}>
                            <ul className='z-clinic-card-lis row'>
                                {data.filter((item) => {
                                    return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search);
                                }).map((item) => (
                                    <li key={item.id} className='col-lg-6 col-sm-12'>
                                        {/* <Link to={`/browser/telemedicine/deptid=${item.id}&pId=ST11&stid=ST1`}> */}
                                        <Link to={`/Selectlabs`}>
                                            <ClinicCardItem
                                                title={item.title}
                                                image={item.image}
                                                name={item.name}
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        </div>


                        {/* <div className='box-card-container'>
                        <div className='doctor-card-box'>
                            <div className='doctor-card-box-img'>
                                <img src="./images/virtual-img1.png" alt="" />
                            </div>
                            <div className='doctor-card-box-text'></div>
                        </div>
                        <div></div>
                    </div> */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default VirtualConsultationsPopup
