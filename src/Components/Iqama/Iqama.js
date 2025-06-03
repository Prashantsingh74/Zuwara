import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Corporatewlness.css';
import '../../Style/Corporatenew.css';
import '../../Style/Iqama.css';
import { Context } from '../../Context';
import MapLocationPop from '../MapLocationPop';

function ExpansionTile({ id, title, description, price, includes, handleCheckboxChange, isChecked }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showText, setShowText] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleText = () => {
    setShowText(!showText);
  };

  return (
    <>
      <li className="sa-cursor sa-card active-border border-0 m-0 iqama-cards">
        <div className='d-flex justify-content-between'>
          <div style={{ display: "flex", alignItems: "center", gap: '1rem' }}>
            <label htmlFor={id} className='poppins-bold zw_14 zw_text_color'>{title}</label>
          </div>
          <div>
            <input
              type="checkbox"
              id={id}
              name={id}
              className='check-boxes'
              onChange={() => handleCheckboxChange(id, title,price)}
              checked={isChecked}
            />
          </div>
        </div>
        <span className="poppins-regular zw_16 zw_secondary pe-5">
          {description}
          {' '}
          {includes && (
            <span className="sa-link sa-ml5" style={{ color: "#Af2245", textDecoration: "underline", }}>
              <span onClick={toggleText} style={{ cursor: 'pointer' }}>
                {showText ? "Hide details" : "More details"}
              </span>
            </span>
          )}
        </span>

        {isExpanded && (
          <div >
            <div className="sa-crp-in poppins-regular zw_16 zw_title_color">
              <span className="sa-primary-text" style={{ color: "#Af2245" }}>Includes:</span> {includes}
            </div>
          </div>
        )}
      </li>
      {showText && <span className='zw_title_color p-3 poppins-regular zw_16 iqama-expended-text'>Includes:{includes}</span>}
    </>
  );
}

function Iqama() {
  const [isChecked, setIsChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { appointmentData, updateAppointmentData } = useContext(Context);
  const [selectedSubservices, setSelectedSubservices] = useState([]);
  const [locationName, setLocationName] = useState(appointmentData?.Address || '');
  const [type, setType] = useState(appointmentData?.Typeoftest || '');

  const handleCheckboxChange = (id, title) => {
    const service = IqamaData.find(service => service.id === id || service.Enname === title);
  
      // Get the price from the service if it exists
    const price = service ? service.Price : 0;
    let updatedSubservices;
    if (selectedSubservices.some(service => service.name === title)) {
      updatedSubservices = selectedSubservices.filter(service => service.name !== title);
    } else {
      updatedSubservices = [...selectedSubservices, { name: title, price }];
    }
    setSelectedSubservices(updatedSubservices);
    setIsChecked(updatedSubservices.length > 0);
  };

  const { show, setShow } = useContext(Context);

  const showLocation = (loc) => {
    setLocationName(loc);
    updateAppointmentData({ Address: loc });
  };

  const [IqamaData, setIqamaData] = useState([]);
  useEffect(() => {
    fetch(
      "https://zuwara.net/admin/public/api/subservices?id=20&servicetype=single"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIqamaData(data);
      });
  }, []);

  let navigate = useNavigate();

  const onRequestService = () => {
    updateAppointmentData({ Subservices: JSON.stringify(selectedSubservices).trim(''), Typeoftest: type });
    navigate('/Iqamaselectlabs');
  };

  return (
    <div>
      <Navbar />
      <div className="nursing-task-hRe">
        <div className="group-1261155501-1WC">
          <div className="group-1261154093-w8x me-4">
            <Link to="/">
              <div className="group-1261154076-3Bz">
                <img className="group-1261154072-Boz" src="./images/Group 1261154072.png" alt="Back" />
                <p className="back-WLU m-0">Back</p>
              </div>
            </Link>
            <div className="frame-37129-eBn">
              <div className="rectangle-39545-ZJk"></div>
              <div className="rectangle-39546-tbv"></div>
            </div>
          </div>
          <p className="nursing-tasks-7Ug mt-4 mb-4">Gov Test</p>
          <div className="col-lg-7 col-sm-9 me-4 frames-37119 p-4">
            <div className='align-self-center d-flex' onClick={() => setShow(true)}>
              <img className="grouped-1" src="/images/location.png" alt='' />
              <div className="ms-3 poppins-semibold zw_14 zw_title_color cursor-pointer" >Selected Location</div>
            </div>
            <div className="lined-1"></div>
            <span className="poppins-semibold zw_14 zw_title_color">{appointmentData.Address}</span>
            {show ? <MapLocationPop path={"samePage"} locName={showLocation} /> : ""}
          </div>
        </div>
      </div >
      <div className="sa-content sa-corpt-wellness container">
        <div className="padd-x ps-4">
          <div className="sa-col12 sa-col-md12 sa-col-sm12 sa-col-xs12">
            <p className="poppins-medium zw_18 zw_text_color " style={{maxWidth: '73rem'}}>
              We provide the best corporate
              health check-up packages specially designed
              for employees working for different sectors
            </p>
            <div className='d-flex iqama-cards-align'>
              <ul className="sa-card-listt iqama-card-lists me-3">
                {IqamaData.map(item => (
                  <ExpansionTile
                    key={item.id}
                    id={item.id}
                    title={item.Enname}
                    description={item.Endescription}
                    includes={item.Ardescription}
                    price={item.Price}
                    handleCheckboxChange={handleCheckboxChange}
                    isChecked={selectedSubservices.some(service => service.name === item.Enname)}
                  />
                ))}
              </ul>
              <div className='col-12 col-md-3 iqama-type '>
                <h3 className='poppins-semibold zw_22'>TYPE*</h3>
                <div className="radio_btn_container mt-3">
                  <label className="radio_btn_label" htmlFor="renewal">
                    <input
                      className="radio-button-4X6"
                      id='renewal'
                      type="radio"
                      name="Typeoftest"
                      value="Renewal"
                      checked={type === "Renewal"}
                      onChange={() => setType("Renewal")}
                    />
                    <span className="radio-button-span checked_text_clr poppins-bold zw_16 zw_text_222">
                      Renewal
                    </span>
                  </label>
                </div>

                <div className="radio_btn_container">
                  <label className="radio_btn_label" htmlFor='NewRelease'>
                    <input
                      className="radio-button-4X6"
                      id='NewRelease'
                      type="radio"
                      name="Typeoftest"
                      value="New Release"
                      checked={type === "New Release"}
                      onChange={() => setType("New Release")}
                    />
                    <span className="radio-button-span checked_text_clr poppins-bold zw_16 zw_text_222">
                      New Release
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="request-service-link padd-x">
        <button className="link_btn my-5 mx-auto" style={{ borderRadius: "5px", border: 'none', maxWidth: "313px", background: isChecked ? "#AF2245" : "#cf5a75",cursor: selectedSubservices?.length === 0 ? 'not-allowed' : 'pointer' }} disabled={selectedSubservices.length === 0}  onClick={onRequestService}>
          Request service
        </button>
      </div>
      
      <Footer />
    </div >
  );
}

export default Iqama;
