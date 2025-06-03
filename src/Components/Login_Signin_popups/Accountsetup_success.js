import React, { useContext } from 'react';
import { Context } from '../../Context';
import { useNavigate } from 'react-router-dom';

function Accountsetup_success() {
    const { signupFormData } = useContext(Context);
    const { Firstname, Lastname } = signupFormData;
    const navigate = useNavigate();
    const handleClose = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <div className='zw_popup'>
            <div className="modal fade" id="successs" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ right: "200px" }} >
                <div className="modal-dialog modal-dialog-centered ms-auto" role="document" style={{ maxWidth: '100rem' }}>
                    <div className="modal-content" >
                        <div className="modal-body">
                            <div className="dialog signin-dialog">
                                <div className="dialog-body dialog-center dialog-body-sm">
                                    <div className='btn-space'>
                                        <button type="button" onClick={handleClose} className="sps-dialog-close  regv2back" data-bs-dismiss="modal" aria-label="Close" style={{ color: "red" }}>
                                            <img src="/images/crossicon2.png" alt="" style={{ width: "16px", }} />
                                        </button>
                                    </div>
                                    <div className="text-center mb-5">
                                        <div className="avtar-1 avtar-1-md d-f-end">
                                            <img src="./images/acc-set-comp.png" className="img-cover-1" alt="" style={{ height: "70px", borderRadius: "100%" }} />
                                        </div>
                                        <h3 className="zw_text_color poppins-semibold zw_30 mt-3">
                                            {Firstname} {Lastname}!
                                        </h3>
                                        <p className="poppins-regular zw_22 zw_86909D">You are signeed in to Zwaara&nbsp;</p>
                                        <p className="poppins-semibold zw_24 zw_title_color" style={{ margin: "20px" }}>Successfully!</p>
                                        <p className='poppins-regular zw_20 zw_text_color zw_succ_p '>Your ID is not recognized as a citizen of Saudi Arabia, therefore the </p>
                                        <p className='poppins-regular zw_20 zw_text_color zw_succ_p  ' style={{ margintop: "-15px" }}>VAT Value will be applicable</p>
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

export default Accountsetup_success;
