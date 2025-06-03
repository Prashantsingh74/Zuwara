import React, { useState, useEffect } from 'react';
import '../../../Style/diabetes.css'
import '../../../Style/lab.css'
import Navbar from '../../../Layout/Navbar';
import Footer from '../../../Layout/Footer';



function Laboratory() {
 

  return (
    <>
      <Navbar />
      <div className="diabetes-Nm2 ">
        <div className="auto-group-zlhs-V8p">
          <div className="group-1261154093-ovC">
            <div className="group-1261154076-8Bn">
              <img className="group-1261154072-4bE" src="./assets/group-1261154072-RB2.png" />
              <p className="back-apU">Back</p>
            </div>
            <div className="group-1261154073-jBa">
              <div className="rectangle-39545-r1J">
              </div>
              <div className="rectangle-39546-xKE">
              </div>
              <div className="rectangle-39547-h1v">
              </div>
              <div className="rectangle-39548-SEQ">
              </div>
            </div>
          </div>
          <div className="auto-group-7s5a-arQ">
            <p className="diabetes-KZ6">diabetes</p>
            <div className="group-1261154972-jsi">
              <div className="group-1261154971-Gse">
                <p className="search-your-lab-tests-packages-RkY">Search your lab tests &amp; Packages </p>
                <img className="line-1-9Ak" src="./assets/line-1-CDz.png" />
                <img className="vector-scY" src="./assets/vector-d2C.png" />
              </div>
            </div>
          </div>
        </div>
        <div className="auto-group-4ngu-yfa">
          <div className="auto-group-b6jy-i7N">
            <div className="auto-group-rbfj-Fd6">
              <div className="auto-group-riqi-n7E">
                <p className="packages-hjz">packages</p>
                <div className="group-1261154463-oHE">
                  <div className="group-1261154200-LY4">
                    <div className="group-1261154165-Tcg">
                      <div className="medical-monitoring-of-human-health-1PJ">
                      </div>
                      <p className="diabetes-periodic-test-gEY">Diabetes - Periodic test</p>
                    </div>
                  </div>
                  <div className="group-1261154199-yDe">
                    <div className="group-1261154169-J12">
                      <div className="woman-sitting-in-front-of-a-mirror-brushing-her-hair-3zC">
                      </div>
                      <p className="diabetes-annually-Kgp">Diabetes - Annually</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group-1261154462-SFe">
                <p className="individual-test-zHA">Individual Test</p>
                <div className="group-1261154442-uf2">
                  <div className="auto-group-gwrt-q2t">
                    <div className="group-1261154182-mhE">
                      <div className="group-1261154422-tmr">
                        <div className="group-1261154178-rCt">
                          <img className="group-1261154175-xWp" src="./assets/group-1261154175-MXA.png" />
                        </div>
                        <p className="cumulative-sugar-test-hba1c-67E">Cumulative Sugar Test (HBA1C)</p>
                      </div>
                    </div>
                    <div className="group-1261154432-MYx">
                      <div className="group-1261154431-Gfv">
                        <div className="group-1261154426-pSY">
                          <img className="group-1261154175-x2x" src="./assets/group-1261154175-ABE.png" />
                        </div>
                        <p className="lipase-V2t">LIPASE</p>
                      </div>
                    </div>
                  </div>
                  <div className="auto-group-och2-aa8">
                    <div className="group-1261154435-jT2">
                      <div className="group-1261154434-T88">
                        <div className="group-1261154177-1QY">
                          <img className="group-1261154175-KRE" src="./assets/group-1261154175-scx.png" />
                        </div>
                        <p className="glucose-fbs--3c8">GLUCOSE ( FBS )</p>
                      </div>
                    </div>
                    <div className="group-1261154430-Y36">
                      <div className="group-1261154429-UBe">
                        <div className="group-1261154425-d4Y">
                          <img className="group-1261154175-wL8" src="./assets/group-1261154175-cVA.png" />
                        </div>
                        <p className="amylase-serum-5SL">amylase (serum)</p>
                      </div>
                    </div>
                  </div>
                  <div className="group-1261154437-mpx">
                    <div className="group-1261154446-JZz">
                      <div className="group-1261154423-r5i">
                        <img className="group-1261154175-kwn" src="./assets/group-1261154175-1dn.png" />
                      </div>
                      <p className="glucose-rbs--6Vr">GLUCOSE ( RBS )</p>
                    </div>
                  </div>
                </div>
                <div className="group-1261154445-bSc">
                  <div className="group-1261154444-Vnt">
                    <p className="more-test-results-evg">
                      More test results
                      <br />

                      <br />

                    </p>
                    <img className="vector-o2t" src="./assets/vector-7jA.png" />
                  </div>
                </div>
              </div>
            </div>
            <div className="group-1261154461-YPn">
              <p className="selected-test-hXa">Selected test</p>
              <div className="auto-group-xick-SEG">
                <div className="group-1261154475-xyJ">
                  <div className="main-selected-element-iBn">
                    <div className="group-1261154161-TQG">
                      <p className="pregnancy-test-serum-bhcg-kuA">Pregnancy Test Serum (BHCG)</p>
                      <div className="group-1171275053-4ur">
                        <div className="group-1171275049-p8L">–</div>
                        <p className="item-1-UCt">1</p>
                        <div className="group-371-nDa">+</div>
                      </div>
                    </div>
                    <img className="component-1-djz" src="./assets/component-1-gdA.png" />
                  </div>
                  <div className="main-selected-element-Mfz">
                    <div className="group-1261154161-tfv">
                      <p className="pregnancy-test-serum-bhcg-zix">Pregnancy Test Serum (BHCG)</p>
                      <div className="group-1171275053-WSQ">
                        <div className="group-1171275049-eoW">–</div>
                        <p className="item-1-XcQ">1</p>
                        <div className="group-371-G4C">+</div>
                      </div>
                    </div>
                    <img className="component-1-igt" src="./assets/component-1-TKA.png" />
                  </div>
                  <div className="main-selected-element-Sct">
                    <div className="group-1261154161-PY8">
                      <p className="pregnancy-test-serum-bhcg-6Be">Pregnancy Test Serum (BHCG)</p>
                      <div className="group-1171275053-c9z">
                        <div className="group-1171275049-MdN">–</div>
                        <p className="item-1-2Uc">1</p>
                        <div className="group-371-xNG">+</div>
                      </div>
                    </div>
                    <img className="component-1-DZ6" src="./assets/component-1-T4p.png" />
                  </div>
                  <div className="frame-37121-XZn">Continue</div>
                </div>
              </div>
            </div>
          </div>
          <img className="group-1261154443-M32" src="./assets/group-1261154443-VdN.png" />
        </div>
        <div className="group-1000002072-sXA">
          <div className="group-1261154099-Nip">
            <img className="group-1261154093-gzQ" src="./assets/group-1261154093-nNg.png" />
            <img className="group-1261154040-cdA" src="./assets/group-1261154040-mjJ.png" />
          </div>
          <div className="auto-group-vswv-YWp">
            <p className="company-6HS">Company</p>
            <div className="frame-37135-d2U">
              <p className="home-jrC">Home</p>
              <p className="about-5v4">About</p>
              <p className="join-as-provider-2qJ">Join as provider</p>
              <p className="get-care-a68">Get Care</p>
              <p className="join-us-ii8">Join Us</p>
            </div>
          </div>
          <div className="auto-group-eh7a-4mz">
            <p className="laboratory-1BS">Laboratory</p>
            <div className="frame-37136-9He">
              <p className="general-test-HPr">General test</p>
              <p className="blood-test-pua">Blood test</p>
              <p className="urine-test-a84">Urine test</p>
              <p className="dna-test-vSp">DNA Test</p>
            </div>
          </div>
          <div className="auto-group-9mhw-UDS">
            <p className="contact-us-Qsn">Contact Us</p>
            <p className="item-923489934721-xPW">+923489934721</p>
            <p className="zwaarahealthcom-4xL">Zwaara@health.com</p>
            <p className="riadh-2343-saudi-arabia-PUp">Riadh 2343, Saudi Arabia,</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Laboratory
