import React, { useState } from 'react';
import './../../Style/RadiologyPopup.css';

function RadiologyPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    console.log("isPopupOpen===>", isPopupOpen);
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className='' style={{ position: 'absolute', zIndex: '99' }}>
      <button className='poppins-semibold zw_16 zw_title_color' style={{ border: 'none', textDecoration: 'underline', background: 'none' }} onClick={togglePopup}>View Selected Details</button>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={togglePopup}>&times;</span>
            <div className='selected-details'>Selected Details</div>
            <ul className='selected-details-popup'>
              <div className='instruction-text'>Instructions</div>
              <li className='selected-details-text'>Disclosure of chronic diseases in the elderly</li>
              <li className='selected-details-text'>Any Medication, Past History of medication allergy, infection, or pregnancy</li>
              <li className='selected-details-text'>Disclose any chronic diseases of the child</li>

            </ul>
            <div className='poppins-medium zw_18 zw_text_color mt-4'>Ultrasound</div>
            <ul>
              <li className='selected-details-text'>
                {/* <div className='selected-details-text'> */}
                Ultrasound machine, Medical gel,Medical disinfectant, Masks and sterilization for the medical <br /> team,Medical gloves for one use
                {/* </div> */}
              </li>

            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default RadiologyPopup;
