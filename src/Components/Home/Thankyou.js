
import { Link } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import background from '../../assets/img/background.png';


function Requestsuccesfull() {
    return (
        <div>
            <Navbar />
            <div className="p-5" style={{ marginTop: "100px", marginBottom: "80px" }}>
                <span className="btn-back mob-block">
                    <i className="icon-arrow-left"></i>
                </span>
                <div className="text-center">
                    <h3 className='poppins-semibold zw_34 zw_title_color '>Provide My Services Via Zuwarh Request Form</h3>
                    <p className='poppins-regular zw_16 zw_text_color my-5'>We are pleased to cooperate with us in providing and facilitating access to your services Via Zuwarh platform</p>
                </div>

                {/* progressbar */}
                <div className='d-flex align-items-center justify-content-center mb-5'>
                    <div className='d-flex justify-content-center align-items-center progressbar_provider active'>
                        <img src="../../../../images/Vector.svg" alt="" />
                    </div>
                    <div className='progress_bar_line'></div>
                    <div className='d-flex justify-content-center align-items-center progressbar_provider active'>
                        <img src="../../../../images/Vector.svg" alt="" />
                    </div>
                    <div className='progress_bar_line'></div>
                    <div className='d-flex justify-content-center align-items-center progressbar_provider active'>
                        <img src="../../../../images/Vector.svg" alt="" />
                    </div>
                </div>
                <div className='d-flex align-items-center w-100% mt-5'>
                    <img className='mx-auto mt-5' src="../../../images/thanku.png" alt="" />

                </div>
                <div className='d-flex flex-column text-center align-items-center '>
                    <h1 className='poppins-semibold zw_24 my-5'>Thank You</h1>
                    <p className='poppins-medium zw_24 zw_text_color my-5'>You request has been submitted successfully.</p>
                    <Link to="/">
                        <button className='poppins-regular zw_18 zw_title_color px-5 py-4' style={{ backgroundColor: '#F7E9EC', border: '1px solid #A9A9A9', borderRadius: '6px' }}>Home</button>
                    </Link>
                </div>

            </div>
            <Footer />

        </div>
    );
}

export default Requestsuccesfull;
