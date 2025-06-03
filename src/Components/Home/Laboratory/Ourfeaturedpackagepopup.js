import React from 'react';
import '../../../Style/Ourfeaturetestspopup.css'
function Ourfeaturedpackagepopup() {


  return (
    <div className='zw_popup'>
      <div className="modal fade zw_Healthpackage" id="ourfeaturedpackage" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className='btn-space'>
                <button type="button" className="sps-dialog-close  regv2back" data-bs-dismiss="modal" aria-label="Close">
                  <i className="icon-close"></i>
                </button>
              </div>
              <div className="our-featured-tests-pop-up-hEc">
                <div className="group-1261154596-dV6" >
                  <div className="group-1261154601-MAC">
                    <div className="group-1261154877-nWx">
                      <p className="health-check-packages-VnC poppins-semibold zw_24">CBC (complete blood count)</p>
                      <div className='row mb-4'>
                        <div className='col-8'>
                          <div className="group-1171275053-Wxk">
                            <div className="group-1171275049-1ec zw_btn_18">–</div>
                            <p className="item-1-fz4 zw_btn_18 ">1</p>
                            <div className="group-371-Pv4">
                              <div className="ellipse-57-9eL item--sqE zw_btn_18">+</div>
                            </div>
                          </div>
                        </div>
                        <div className='col-4 zw_select_btn'>
                          <div className="group-1261154603-x5z poppins-regular zw_16 zw_bg_gradient zw_white_text">Select </div>
                        </div>
                      </div>
                    </div>
                    <div className="group-1261154877-nWx">
                      <div className="group-1261154592-pxt mb-4">
                        <div className="group-1261154551-xJQ zw_light_bg">
                          <div className="row">
                            <div className='col-4'>
                              <div className='zw_bgwhite p-3 zw_sbmtbtn_radius'>
                                <img className='img-fluid m-2' src='images/blood.svg' />
                                <span className="m-2 poppins-semibold zw_btn_18 zw_000 mb-0 zw_report_name">BLOOD</span>
                              </div>
                            </div>
                            <div className='col-8 zw_bgwhite p-3 zw_sbmtbtn_radius'>
                              <div className='m-2'>
                                <span className="poppins-semibold zw_btn_18 zw_000 mb-0 zw_report_name">The test does not require fastting</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Ourfeaturedpackagepopup;
