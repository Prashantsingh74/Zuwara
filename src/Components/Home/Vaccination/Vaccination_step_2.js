import React, { useContext, useState } from 'react'
import Vaccination_DoctorList from '../Vaccination/Vaccination_DoctorList.json';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import '../../../Style/Vaccination.css';
import '../../../Style/Laboratory.css'
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';
import TimeCarousel from './TimeCarousel';
// import { data } from './Center_Vaccina.js';
import { VaccinationContext } from './ContextSelected.js';

function Vaccination_step_2() {
  const [startDate, setstartDate] = useState(new Date());
  const [Search, setSearch] = useState('');
  const [, setShowDoctorList] = useState(Vaccination_DoctorList);

  const setLowToHigh = () => {
    const sortedVaccination_DoctorList = Vaccination_DoctorList.sort((a, b) => a.price - b.price);
    setShowDoctorList([...sortedVaccination_DoctorList]);
  };
  const setHighToLow = () => {
    const reverseSortedVaccination_DoctorList = Vaccination_DoctorList.sort((a, b) => b.price - a.price);
    setShowDoctorList([...reverseSortedVaccination_DoctorList]);
  };
  let navigate = useNavigate();
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
  };
  const availableCenters = Vaccination_DoctorList.filter((item) =>
    Search.toLowerCase() === '' ? item : item.center.toLowerCase().includes(Search)
  );
  // const Vaccination_items = "";

  // const { selectedVaccinations } = useContext(VaccinationContext);


  return (
    <>
      <Navbar />

      <div className="browse lab-browse slider_ptl zw_vaccination_step ">
        <div className='browse-hdr zw_lab_bg '>
          <div className="laboratory-WM2">
            <div className='container'>
              <div className="auto-group-9h4y-a9r px-2">
                <div className='row pt-4'>
                  <div className="group-1261154093-W7N col-md-12">

                    <div className="group-1261154076-E3N">
                      <span className=" zw_btn_18 poppins-medium zw_black"><i className="icon-arrow-left" onClick={() => navigate(-1)}></i>Back</span>

                      {/* <span className="z-btn-back" style={{ display: "flex" }}>
                        <i className="icon-arrow-left" onClick={() => navigate(-1)}></i>
                        <span className="mob-none zw_btn_18 poppins-medium zw_black">Back</span></span> */}
                      {/* <span style={{ color: "#000000", fontSize: "20px", fontFamily: "'Poppins',sans-serif" }}><i className="icon-arrow-left"></i>Back</span> */}

                    </div>
                    <div className="frame-37129-R7r">
                      <div className="rectangle-39545-vqJ">
                      </div>
                      <div className="rectangle-39546-G8U">
                      </div>
                      <div className="rectangle-39547-164">
                      </div>
                      <div className="rectangle-39548-wkQ">
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row pt-4'>
                
                  <div className="  col-4"> 
                     {/* <div className="z-srch-field z-mob-none">
                        <i className="icon-search z-form-icon z-form-icon-left"></i>
                        <input onChange={handleSearch} autoComplete="off" name="Search Doctor" type="text" placeholder="Search physiotherapist" className="form-control z-form-control-sm zw_16 poppins-regular" />
                      </div> */}

                    <div class="search-container">
                      <form class="search-form">
                        <input onChange={handleSearch} autoComplete="off" name="Search Doctor" type="text" placeholder="Search physiotherapist" className=" search-input zw_16 poppins-regular"  />
                        <button type="submit" class="search-button zw_bgwhite">
                          <i class="icon-search zw_black "></i>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="  col-6">
                      <div className="horizontal-calendar">
                        <div className="z-date-list" style={{ scrollBehavior: 'auto' }}>
                          <div className="z-date-list-scroll">
                            <div className="z-date-item z-choosed-day">
                              <div className=''>
                                <p className="z-today zw_15 poppins-regular zw_text_color "> Today </p>
                                <p className="z-date-item-date zw_15 poppins-regular zw_text_color"> 8 </p>
                              </div>
                            </div>
                            <div className="z-date-item">
                              <div>
                                <p className="z-date-item-day zw_15 poppins-regular zw_text_color"> Thu </p>
                                <p className="z-date-item-date zw_15 poppins-regular zw_text_color"> 9 </p>
                              </div>
                            </div>
                            <div className="z-date-item">
                              <div>
                                <p className="z-date-item-day zw_15 poppins-regular zw_text_color "> Fri </p>
                                <p className="z-date-item-date zw_15 poppins-regular zw_text_color"> 10 </p>
                              </div>
                            </div>
                            <div className="z-date-item">
                              <div>
                                <p className="z-date-item-day zw_15 poppins-regular zw_text_color"> Sat </p>
                                <p className="z-date-item-date zw_15 poppins-regular zw_text_color"> 11 </p>
                              </div>
                            </div>
                            <div className="z-date-item">
                              <div>
                                <p className="z-date-item-day zw_15 poppins-regular zw_text_color"> Sun </p>
                                <p className="z-date-item-date zw_15 poppins-regular zw_text_color"> 12 </p>
                              </div>
                            </div>
                            <div className="z-date-item">
                              <div>
                                <p className="z-date-item-day zw_15 poppins-regular zw_text_color"> Mon </p>
                                <p className="z-date-item-date zw_15 poppins-regular zw_text_color"> 13 </p>
                              </div>
                            </div>
                            <div className="z-date-item">
                              <div>
                                <p className="z-date-item-day zw_15 poppins-regular zw_text_color"> Tue </p>
                                <p className="z-date-item-date zw_15 poppins-regular zw_text_color"> 14 </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className="  col-2">
                      <div className="z-date-picker">
                        <i className="fa fa-calendar z-cal zw_text_color" aria-hidden="true"></i>
                        <DatePicker className="custom-input poppins-regular zw_16" selected={startDate} onChange={(date) => setstartDate(date)} />
                      </div>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      <div className="container result">
          <div className="row">
            <div className="col-4 col-md-4 col-sm-4 col-xs-12">
              <div className="filter-data mob-none">
                <div className="filter zw_lab_bg">
                  <h4 className="tit zw_30 zw_text_color poppins-semibold">Filters</h4>
                  <div className="filter-list mob-none">
                    <h5 className="tit poppins-semibold zwaara_h2">Price</h5>
                    <div className="form-check">
                      <input className="form-check-input " value='low' type="radio" onClick={setLowToHigh} name="exampleRadios" id="exampleRadios1" />
                      <label className="form-check-label poppins-regular zw_11">
                        Low to High
                      </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" value='high' type="radio" onClick={setHighToLow} name="exampleRadios" id="exampleRadios1" />
                      <label className="form-check-label poppins-regular zw_11">
                        High to Low
                      </label>
                    </div>
                  </div>
                  <div className="filter-list mob-none">
                    <h5 className="mb15 mob-none poppins-semibold zwaara_h2" style={{ marginBottom: "calc(2px* 10)" }}>Select Gender</h5>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" id="any" name="gender" value="0"></input>
                      <label for="any" className="form-check-label poppins-regular zw_11">
                        <i className="icon-other mob-block"></i> Any
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" id="male" name="gender" value="1"></input>
                      <label for="male" className="form-check-label poppins-regular zw_11">
                        <i className="icon-male-lab mob-block"></i> Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" id="female" name="gender" value="1"></input>
                      <label for="female" className="form-check-label poppins-regular zw_11">
                        <i className="icon-female-lab mob-block"></i> Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8 col-md-8 col-sm-8 col-xs-12">
              <h4 className="tit mob-header zw_30 zw_text_color poppins-semibold">Select lab</h4>
              {availableCenters.length > 0 ? (
                <ul className="card-list zw_vac_ul">
                  {Vaccination_DoctorList.filter((item) => {
                    return Search.toLowerCase() === '' ? item : item.center.toLowerCase().includes(Search)
                  }).map((Vaccination) => (
                    <li key={Vaccination.id}>
                      <div className="card-list-box">
                        <figure className="avtar avtar-lg cursor">
                          <img src={Vaccination.image} alt={Vaccination.name} className="img_cover"></img>
                        </figure>
                        <div className="doct-det">
                          <div className="doct-det-data">
                            <h6 className='zw_16 zw_title_color poppins-semibold'>{Vaccination.center} </h6>
                            <span className='poppins-bold zw_11 zw_86909D'>Vaccination - {Vaccination.Location}</span><br></br>
                            <div className="link mob-split zw_16 zw_title_color poppins-semibold" data-bs-toggle="modal" data-bs-target="#Tasks_Modal">View Task Details</div>
                          </div>
                          <div className="doct-price mob-split-lab">
                            <span className="font-normal mob-none zw_16 zw_text_color poppins-semibold">Price</span>
                            <h6 className="price-tag swap-dir zw_16 zw_title_color poppins-semibold">
                              <span className="d-i-dir-ltr ">SAR</span> {Vaccination.price}
                            </h6>
                            <span className="poppins-bold zw_11 zw_86909D">Included visit fee</span>
                          </div>
                        </div>
                      </div>
                      <TimeCarousel />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="result-error">
                  <img src="https://sanar-assets.com/mis/6c7eee353bc2a7667e3bc2a4a28d5788.png" alt="Error Message" className="w30"></img>
                  <h4>No nurse's available for Today !</h4>
                  <button type="submit" className="btn-primary mt20">Check next availability</button>
                </div>
              )}
              <div className="modal fade" id="Tasks_Modal" data-bs-backdrop='static' role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-body">
                      <button className="z-sign-btn" data-bs-dismiss="modal" aria-label="Close">
                        <i className="icon-close"></i>
                      </button>
                      <div className='body-cnt'>
                        <h4 className="tit">Selected task</h4>
                        <div className="gray-light-bg card-no-border">
                          <h6>Instructions</h6>
                          <ul className="unorder-list">
                            <li>Disclosure if your child has a disease treated with cortisone</li>
                            <li>Disclosure if the child suffers from immune diseases</li>
                            <li>Disclosure if you are allergic to some medications, vaccines and foods</li>
                            <li>If the child has a fever or any other complaints, as disclosed, the vaccination will be postponed until the child is well..</li>
                            <li>Disclose any chronic diseases of the child</li>
                          </ul>
                        </div>

                        {/* <ul>
                          {selectedVaccinations.map((item,index) => (
                            <div>
                              <li key={index}>
                                <label className="dark-text">{item.label}</label>
                                <ul className="unorder-list">
                                  <li>{item.p1}</li>
                                  <li>{item.p2}</li>
                                </ul>
                              </li>
                            </div>
                          ))}
                        </ul>   */}                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-4 zw_btn">
                <div class="col-md-6 poppins-medium zw_btn_18">
                  <button type="submit" class="btn zw_bg_gradient">Continue</button>
                </div>
                </div>
            </div>
          
          </div>
        </div> 
      </div>
      <Footer />
    </>
  )
}

export default Vaccination_step_2