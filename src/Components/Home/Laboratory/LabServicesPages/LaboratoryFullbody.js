import React, { useState, useEffect } from 'react';
import '../../../../Style/Laboratory.css'
import { Link } from 'react-router-dom';
import '../../../../Style/lab.css'
import Navbar from '../../../Layout/Navbar';
import Footer from '../../../Layout/Footer';



function LaboratoryFullbody() {
  const [searchTerm, setSearchTerm] = useState('');
  const [testCounts, setTestCounts] = useState({});
  const [showAllCards, setShowAllCards] = useState(false);

  const [selectedTests, setSelectedTests] = useState([]);
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

  const [mostHelpData, setMostHelpData] = useState([]);
  useEffect(() => {
    fetch('https://zuwara.net/admin/public/api/laborotaryservices?TypeOfService=Most Help Packages')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMostHelpData(data);
      });
  }, []);

  const [ourFeatureData, setOurFeaturedData] = useState([]);
  useEffect(() => {
    fetch('https://zuwara.net/admin/public/api/laborotaryservices?TypeOfService=Our Featured Tests')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOurFeaturedData(data);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="slider_ptl zw_lab_bg">
        <div className="laboratory-WM2">
          <div className='container'>
            <div className="auto-group-9h4y-a9r px-2">
              <div className='row pt-4'>
                <div className="group-1261154093-W7N col-12">

                  <div className="group-1261154076-E3N">

                    <Link to="/laboratory" className='zw_a'>
                      <span className=" zw_btn_18 poppins-medium zw_black"><i className="icon-arrow-left"></i>Back</span>
                    </Link>
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
              <div className='row'>
                <div className='col-4'>
                  <p className="lab-tests-packages-1Ac zw_32">Full body</p>
                  {/* <div className="group-1261154095-WJQ ">
                    <div className="group-1261154098-EEQ">
                      <div className="frame-37119-bKr">
                        
                      </div>
                    </div>
                  </div> */}
                </div>
                <div class="col-6">
                    <div class="search-container">
                      <form class="search-form">
                        <input autoComplete="off" name="Search Doctor" type="text" placeholder="Search your lab tests & Packages" className=" search-input zw_14 poppins-regular"  />
                        <button type="submit" class="search-button zw_bgwhite">
                          <i class="icon-search zw_black "></i>
                        </button>
                      </form>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container zw_lab_health_package">
        <div className='row mt-4'>
          <div className='col-md-7'>
            <div className="laboratory-WM2">
              <div className="auto-group-cncl-P6c">
                <div className="auto-group-ayeg-thS">
                  <div className="auto-group-9twz-df2">
                    <h1 className='zw_34 poppins-semibold'>Most help packages</h1>
                    <div className='mt-4'>
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {mostHelpData.map((item, index) => (
                          <div
                            key={index}
                            className={`card ${selectedTests.includes(item.Title) ? 'selected' : ''} zw_card`}
                            onClick={() => toggleSelectedTest(item.Title)}
                          >
                            <div className="card-body" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <img className="img-fluid" src={item.Image} alt='' />
                              <p className='poppins-bold zw_11 zw_title_color mb-0 text-uppercase pt-2'>{item.Title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="button-see-all zw_14 poppins-regular zw_title_color" onClick={() => setShowAllCards(!showAllCards)}>See All</button>
                    </div>

                    <div >
                      <h3 className='zw_34 poppins-semibold'>Our Featured Tests</h3>
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {ourFeatureData.map((item, index) => (
                          <div className="card zw_card zw_card_feature" key={index}>
                            <div className="card-body" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <img className="img-fluid" src={item.Image} alt='' />
                              <p className='poppins-bold zw_11 zw_title_color mb-0 text-uppercase pt-2'>{item.Title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="button-see-all zw_14 poppins-regular zw_title_color">See All</button>
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
                    <p className="selected-test-ooa">Selected test</p>
                    <div className="group-1261154162-jx8">
                      {selectedTests.map((title, index) => (
                        <div className="main-selected-element-4zQ" key={index}>
                          <div className="group-1261154161-1ek">
                            <div className='row'>
                              <div className="col-md-7">
                                <p className="pregnancy-test-serum-bhcg-uk8 zw_12" style={{ marginRight: "0", whiteSpace: "normal" }}>{title}</p>
                              </div>
                              <div className="col-md-5">
                                <div className="group-1171275053-cuS">
                                  <div className="group-1171275049-xTW" onClick={() => decreaseCount(title)}>–</div>
                                  <p className="item-1-R6C zw_btn_18" style={{ margin: "0" }}>{testCounts[title] || 1}</p>
                                  <div className="group-371-jsa" onClick={() => increaseCount(title)}>+</div>
                                </div>
                              </div>
                            </div>


                            <button class="sps-dialog-close" onClick={() => closeSelectedTest(title)} ><i class="icon-close"></i></button>
                            {/* <img className="component-1-atC" src="./assets/component-1-Yse.png" alt='' onClick={() => closeSelectedTest(title)} /> */}
                          </div>

                        </div>
                      ))}
                      <button
                        className="frame-37121-6be" type='button' data-bs-toggle="modal" data-bs-target="#locationPopup"
                        onClick={isContinueButtonActive ? handleClickContinue : null}
                        style={{ cursor: isContinueButtonActive ? 'pointer' : 'not-allowed', opacity: isContinueButtonActive ? 1 : 0.5 }}
                      >
                        Continue
                      </button>
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
  )
}

export default LaboratoryFullbody
