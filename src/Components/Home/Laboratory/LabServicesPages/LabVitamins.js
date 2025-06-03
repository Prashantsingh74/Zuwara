import React, { useState, useEffect,useContext } from 'react';
import '../../../../Style/Laboratory.css'
import { Link } from 'react-router-dom';
import '../../../../Style/lab.css'
import Navbar from '../../../Layout/Navbar';
import Footer from '../../../Layout/Footer';
import { Context } from '../../../../Context';


function LabVitamins() {
  const { selectedTests, setSelectedTests } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [testCounts, setTestCounts] = useState({});
  const [showAllCards, setShowAllCards] = useState(false);

  function toggleSelectedTest(title) {
    const updatedSelectedTests = selectedTests.includes(title)
      ? selectedTests.filter(test => test !== title)
      : [...selectedTests, title];

    setSelectedTests(updatedSelectedTests);
  }

  function increaseCount(title) {
    const updatedCounts = { ...testCounts, [title]: (testCounts[title] || 1) + 1 };
    setTestCounts(updatedCounts);
  }

  function decreaseCount(title) {
    const updatedCounts = { ...testCounts, [title]: Math.max((testCounts[title] || 1) - 1, 1) };
    setTestCounts(updatedCounts);
  }

  function closeSelectedTest(title) {
    const updatedSelectedTests = selectedTests.filter(test => test !== title);
    const updatedTestCounts = { ...testCounts };
    delete updatedTestCounts[title];

    setSelectedTests(updatedSelectedTests);
    setTestCounts(updatedTestCounts);
  }

  const handleClickContinue = () => {
    // Implement the logic to handle the click on the "Continue" button
    console.log("Continue button clicked");
  };

  const isContinueButtonActive = selectedTests.length > 0;

  const [bodyfunctionData, setBodyFunctionData] = useState([]);
  useEffect(() => {
    fetch('https://zuwara.net/admin/public/api/laborotaryservices?TypeOfService=Body Function and Health Concern')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBodyFunctionData(data);
      });
  }, []);

  const mostHelpData = [
    {
      Title: 'Vitamins Package',
      Image: '../../images/diabetes-img.png'
    }
  ];

  const ourFeatureData = [
    {
      Title: 'Vitamin D',
      Image: '../../images/diabities-ind.png'
    },
    {
      Title: 'VITAMIN B12 (CYANOCOBOLAMINE)',
      Image: '../../images/diabities-ind.png'
    },
    {
      Title: 'ZINC (serum)',
      Image: '../../images/diabities-ind.png'
    },
    {
      Title: 'SERUM CA ( Calcium )',
      Image: '../../images/diabities-ind.png'
    },
    {
      Title: 'Folic Acid',
      Image: '../../images/diabities-ind.png'
    },
  ];

  const filteredMostHelpData = mostHelpData.filter(item =>
    item.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOurFeatureData = ourFeatureData.filter(item =>
    item.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="zw_lab_bg pt-3 vaccination-head">
        <div className="laboratory-WM2">
          <div className='container'>
            <div className="auto-group-9h4y-a9r px-2">
              <div className='row pt-4'>
                <div className="group-1261154093-W7N col-lg-12">
                  <div className="group-1261154076-E3N">
                    <Link to="/laboratory" className='d-flex align-items-center'>
                      <img src='./images/back-icon.png' alt='icon' />
                      <p className="ms-3 zw_btn_18 poppins-medium zw_black mb-0">Back</p>
                    </Link>
                  </div>
                  <div className='line_indicator_container'>
                    <div className='each_line_indicator active'></div>
                    <div className='each_line_indicator'></div>
                    <div className='each_line_indicator'></div>
                    <div className='each_line_indicator'></div>
                  </div>
                </div>
              </div>

              <div className='row align-items-center py-5'>
                <div className='col-lg-3'>
                  <p className="lab-tests-packages-1Ac zw_32 zw_uppercase p-0 mt-2">Vitamins</p>
                </div>
                <div className="col-lg-6">
                  <div className="search-container">

                    <form className="search-form">
                      <input
                        autoComplete="off"
                        name="Search Doctor"
                        type="text"
                        placeholder="Search your lab tests & Packages"
                        className="search-input zw_14 poppins-regular"
                        value={searchTerm}
                        onChange={e =>                           setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="search-button zw_bgwhite">
                          <i className="icon-search zw_black"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container zw_lab_health_package mb-5">
          <div className='row mt-4 justify-content-between padd-x'>
            <div className='col-md-7'>
              <div className="laboratory-WM2">
                <div className="auto-group-cncl-P6c">
                  <div className="auto-group-ayeg-thS">
                    <div className="auto-group-9twz-df2">
                      <h1 className='zw_34 poppins-semibold zw_uppercase'>packages</h1>
                      <div className='mt-4'>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {filteredMostHelpData.length > 0 ? (
                          filteredMostHelpData.map((item, index) => (
                            <div
                              key={index}
                              className={`card ${selectedTests.includes(item.Title) ? 'selected' : ''} zw_card`}
                              onClick={() => toggleSelectedTest(item.Title)}
                            >
                              <div className="card-body" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <img className="img-fluid" src={item.Image} alt='' style={{ width: '75px' }} />
                                <p className='poppins-bold zw_11 zw_title_color mb-0 text-uppercase pt-3 text-center'>{item.Title}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className='no-data-found poppins-semibold zw_18 zw_text_color'>
                              No data found
                          </div>
                        )}
                        </div>
                      </div>

                      <div className='mt-4'>
                        <h3 className='zw_30 poppins-semibold zw_uppercase py-5'>Individual Test</h3>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {filteredOurFeatureData.map((item, index) => (
                            <div
                              key={index}
                              className={`card zw_card zw_card_feature ${selectedTests.includes(item.Title) ? 'selected' : ''}`}
                              onClick={() => toggleSelectedTest(item.Title)}
                            >
                              <div className="card-body" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <img className="img-fluid" src={item.Image} alt='' style={{ width: '60px' }} />
                                <p className='poppins-semibold zw_11 zw_title_color mb-0 text-uppercase pt-3 text-center'>{item.Title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="button-see-all zw_14 poppins-regular zw_white_text zw_bg_gradient" style={{ width: "70%", margin: "20px 15%" }}>More test results <i className="fa fa-angle-down"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-5 zw_lab_rightsec'>
              <div className="laboratory-WM2">
                <div className="auto-group-cncl-P6c">
                  <div className="auto-group-ayeg-thS">
                    <div className="group-1261154163-rtL">
                      <p className="selected-test-ooa mt-5">Selected test</p>
                      <div className="group-1261154162-jx8 px-5 py-4">
                        {selectedTests.map((title, index) => (
                          <div className="main-selected-element-4zQ" key={index}>
                            <div className="group-1261154161-1ek">
                              <p className="pregnancy-test-serum-bhcg-uk8 zw_12" style={{ marginRight: "0", whiteSpace: "normal" }}>{title}</p>
                              <div className="group-1171275053-cuS">
                                <div className="group-1171275049-xTW" onClick={() => decreaseCount(title)}>–</div>
                                <p className="item-1-R6C zw_btn_18" style={{ margin: "0" }}>{testCounts[title] || 1}</p>
                                <div className="group-371-jsa" onClick={() => increaseCount(title)}>+</div>
                              </div>
                            </div>
                            <button className="sps-dialog-closed" onClick={() => closeSelectedTest(title)}><i className="icon-close"></i></button>
                          </div>
                        ))}
                        <Link
                          to={isContinueButtonActive ? "/Selectlabs" : "#"}
                          onClick={(e) => {
                            if (!isContinueButtonActive) {
                              e.preventDefault(); // Prevents the navigation
                            }
                          }}
                        >
                          <button
                            className="frame-37121-6be"
                            type="button"
                            onClick={isContinueButtonActive ? handleClickContinue : null}
                            style={{ cursor: isContinueButtonActive ? 'pointer' : 'not-allowed', opacity: isContinueButtonActive ? 1 : 0.5 }}
                          >
                            Continue
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  export default LabVitamins;

