import React from 'react'
import './App.css';
import Home from './views/Home';
import About from './views/About';
import JoinAsProvider from './views/JoinAsProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CareBusiness from './views/CareBusiness';

import RequestService from './Components/Corparatewellness/RequestService';

import CareIndividuals from './views/CareIndividuals';
import Contactus from './Components/Contact/Contactus';

import { data } from '../src/ClinicData.js'

import Doctor_Specialist from './Components/JoinAsProvider/Doctor_Specialist';
import Hospital_Health_Center from './Components/JoinAsProvider/Hospital_Health_Center';
import Hospital_Health_Center_2 from './Components/JoinAsProvider/Hospital_Health_Center_2';
import Insuarance_Company from './Components/JoinAsProvider/Insuarance_Company';

// import Doctorcard from './Components/Home/Physiotherapist/Doctorcard.js';
import Join_button from './Components/JoinAsProvider/Join_button.js';
// import Radiology from './Components/Radiology/Radiology.js';
import VaccinationList from './Components/Vaccination/VaccinationList.js';
import Vaccination_step_2 from './Components/Home/Vaccination/Vaccination_step_2.js';
import Caregiver from './Components/CareGiverServiceList/Caregiver.js';
import VitaminIVs1 from './Components/VitaminVIDrips/VitaminIVs1.js';
import Caregivertask1 from './Components/CareGiverServiceList/Caregivertask1.js';
import Caregivertask2 from './Components/CareGiverServiceList/Caregivertask2.js';
import Caregivertask3 from './Components/CareGiverServiceList/Caregivertask3.js';
import Caregivertask4 from './Components/CareGiverServiceList/Caregivertask4.js';



import Laboratory from './Components/Home/Laboratory/Laboratory.js';



import Terms_Conditions from './Components/Login_Signin_popups/Terms_Conditions.js';
import PrivacyPolicy from './Components/Login_Signin_popups/PrivacyPolicy.js';
import LabDiabetes from './Components/Home/Laboratory/LabServicesPages/LabDiabetes.js'
import Labfullbody from './Components/Home/Laboratory/Labfullbody.js';
import Selectlabs from './Components/Home/Laboratory/Selectlabs.js';
import Iqamaselectlabs from './Components/Home/Laboratory/Iqamaselectlabs.js'
import Adddetails from './Components/Home/Laboratory/Adddetails.js'
import Igamaadddetails from './Components/Home/Laboratory/Iqamaadddetails.js';
import Payment from './Components/Home/Laboratory/Payment.js'
import Addpatient from './Components/Home/Laboratory/Addpatient.js';
import Appointment from './Components/Home/profile_section/Appointment.js';
import Prescription from './Components/Home/profile_section/Prescription.js';
import Reports from './Components/Home/profile_section/Reports.js';
import Wallet from './Components/Home/profile_section/Wallet.js';
import Mydocter from './Components/Home/profile_section/Mydocter.js';
import Profile from './Components/Home/profile_section/Profile.js';
import Addresslist from './Components/Home/profile_section/Addresslist.js';
import HomeBodyCard from './Components/Home/HomeBodyCard';
import Records_patientlist from './Components/Home/profile_section/Records_patientlist.js';
import Medical from './Components/Home/profile_section/Medical.js';
import Personal from './Components/Home/profile_section/Personal.js';
import LifeStyle from './Components/Home/profile_section/LifeStyle.js';
import Savedcards from './Components/Home/profile_section/Savedcards.js';


import Radiology from './Components/Radiology/Radiology.js';
import Doctorvisit from './Components/DoctorVisit/Doctorvisit.js'
import Selectcenter from './Components/Radiology/Selectcenter.js';
import Corporatewellnessnew from './Components/Corporatewellnessnew/Corporatewellnessnew.js';
// import Faq from './Components/Faq/FaqContent.js';
// import FAQ from './views/FAQ.js';

import Physiotherapist from './Components/Home/Physiotherapist/Physiotherapist.js';
import NurseVisitTask from './Components/Home/Nursevisit/NurseVisitTask.js';
import Insurance_2 from './Components/JoinAsProvider/Insurance_2.js';
import Addrecordpatient from './Components/Home/profile_section/Addrecordpatient.js';
import Addrecord from './Components/Home/profile_section/Addrecord.js';

import VirtualConsultationsPopup from './Components/Home/VirtualConsultation/VirtualConsultationsPopup.js';
import Seasonalflu from './Components/SeasonalFlu/Seasonalflu.js';
import Vaccinationcenter from './Components/Vaccination/Vaccinationcenter.js';
import Nursevisitcenter from './Components/Home/Nursevisit/Nursevisitcenter.js';
import { DoctorProvider } from './Components/Home/profile_section/RecordContext.js';
import Practiotioner from './Components/JoinAsProvider/Practiotioner.js';

import LabVitamins from './Components/Home/Laboratory/LabServicesPages/LabVitamins.js';
import LabCholesterol from './Components/Home/Laboratory/LabServicesPages/LabCholesterol.js';
import LabHair from './Components/Home/Laboratory/LabServicesPages/LabHair.js';
import LabSkin from './Components/Home/Laboratory/LabServicesPages/LabSkin.js';
import RequestNow from './views/RequestNow.js';
import Doctor_Specialist_2 from './Components/JoinAsProvider/Doctor_Specialist_2.js';

import Vitamincenter from './Components/VitaminVIDrips/Vitamincenter.js';
import Thankyou from './Components/Home/Thankyou.js'
import Patient_list from './Components/Home/profile_section/Patient_list.js';
import ScrollToTop from './ScrollToTop.js';
import Iqama from './Components/Iqama/Iqama.js';
import Iqamaaddpatient from './Components/Home/Laboratory/Iqamaaddpatient.js';

// import Vitamincenter from './Components/VitaminVIDrips/Vitamincenter.js';

import Eclinics from './Components/Home/VirtualConsultation/Eclinics.js';
import Seasonalflucenter from './Components/SeasonalFlu/Seasonalflucenter.js';
import Payments from './Components/Home/Laboratory/Payments.js';
import Seasonaladddetails from './Components/SeasonalFlu/Seasonaladddetails.js'
import Profilenavbar from './Components/Home/profile_section/Profilenavbar.js';
import PatientlistSubLeftSec from './Components/Home/profile_section/PatientlistSubLeftSec.js';



function App() {
  return (
    <DoctorProvider>
      <div id="ZwaaraApp">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route exact path='/' element={<><Home /></>}></Route>
            <Route exact path='/aboutus' element={<About />}></Route>
            <Route exact path='/joinAsProvider' element={<JoinAsProvider />}></Route>
            <Route exact path='/forbussiness' element={<CareBusiness />}></Route>
            <Route exact path='/profilenavbar' element={<Profilenavbar />}></Route>
            {/* <Route exact path='/faq' element={<FAQ />}></Route> */}
            {/* for join-in button links */}

            <Route exact path='/joinbutton' element={<Join_button />}></Route>
            <Route exact path='/doctorspecialist' element={<Doctor_Specialist />}></Route>
            <Route exact path='/hospitalhealthcenter' element={<Hospital_Health_Center />}></Route>
            <Route exact path='/insuarancecompany' element={<Insuarance_Company />}></Route>


            <Route exact path='/virtualconsultations' element={<VirtualConsultationsPopup />}></Route>

            <Route exact path='/vaccinationcenter' element={<Vaccinationcenter />}></Route>
            <Route exact path='/nursevisitcenter' element={<Nursevisitcenter />}></Route>
            <Route path="/addrecord" element={<Addrecord />} />
            <Route exact path='/addpatientrecord' element={<Addrecordpatient />}></Route>
            {/* <Route exact path='/forindividuals' element={<Careindividuals />}></Route> */}
            {/* <Route exact path='/corporate-wellness' element={<Corparatewellnesscomponent />}></Route> */}
            <Route exact path='/request-service-form' element={<RequestService />}></Route >

            <Route exact path='/forindividuals' element={<CareIndividuals />}></Route>
            <Route exact path='/contactus' element={<Contactus />}></Route>


            <Route exact path='/seasonalflu' element={<Seasonalflu />}></Route>

            <Route exact path='/doctorspecialist' element={<Doctor_Specialist />}></Route>
            <Route exact path='/hospitalhealthcenter' element={<Hospital_Health_Center />}></Route>
            <Route exact path='/insuarancecompany' element={<Insuarance_Company />}></Route>

            <Route exact path='/vaccinationstep2' element={<Vaccination_step_2 />}></Route>

            <Route exact path='/vaccination' element={<VaccinationList />}></Route>

            <Route exact path='/caregiver' element={< Caregiver />} />
            <Route exact path='/caregiver-task1' element={<Caregivertask1 />}></Route>
            <Route exact path='/caregiver-task2' element={<Caregivertask2 />}></Route>
            <Route exact path='/caregiver-task3' element={<Caregivertask3 />}></Route>
            <Route exact path='/caregiver-task4' element={<Caregivertask4 />}></Route>
            {/* <Route exact path='/vitamin/lat=24.7557387&long=46.63021479999999&stid=ST0&gnd=any&pId=ST04' element={< VitaminIVs1 />} /> */}
            <Route exact path='/vitamin' element={< VitaminIVs1 />} />
            <Route exact path='/vitamincenter' element={< Vitamincenter />}></Route>


            <Route exact path='/diabetes' element={<LabDiabetes />}></Route>
            <Route exact path='/cholesterol' element={<LabCholesterol />}></Route>
            <Route exact path='/hair' element={<LabHair />}></Route>
            <Route exact path='/skin' element={<LabSkin />}></Route>
            <Route exact path='/vitamins' element={<LabVitamins />}></Route>



            <Route exact path='/termsandcondition' element={<Terms_Conditions />}></Route>
            <Route exact path='/privacypolicy' element={<PrivacyPolicy />}></Route>
            <Route exact path='/laboratory' element={<Laboratory />}></Route>
            <Route exact path='/Selectlabs' element={<Selectlabs />}></Route>
            <Route exact path='/iqamaselectlabs' element={<Iqamaselectlabs />}></Route>
            <Route exact path='/Adddetails' element={<Adddetails />}></Route>
            <Route exact path='/Iqamaadddetails' element={<Igamaadddetails />}></Route>
            <Route exact path='/Labfullbody' element={<Labfullbody />}></Route>
            <Route exact path='/laboratorydiabetes' element={<LabDiabetes />}></Route>
            <Route exact path='/Payment' element={<Payment />}></Route>
            <Route exact path='/IqamaPayment' element={<Payments />}></Route>
            <Route exact path='/addpatient ' element={<Addpatient />}></Route>
            <Route exact path='/iqamaaddpatient ' element={<Iqamaaddpatient />}></Route>
            <Route exact path='/aboutus ' element={<HomeBodyCard />}></Route>
            <Route exact path='/appointment' element={<Appointment />}></Route>
            <Route exact path='/prescription' element={<Prescription />}></Route>
            <Route exact path='/reports' element={<Reports />}></Route>
            <Route exact path='/wallet' element={<Wallet />}></Route>
            <Route exact path='/profile' element={<Profile />}></Route>
            <Route exact path='/Doctor_Specialist_2' element={<Doctor_Specialist_2 />}></Route>
            <Route exact path='/insurance2' element={<Insurance_2 />}></Route>

            <Route exact path='/addresslist' element={<Addresslist />}></Route>

            <Route exact path='/thankyou' element={<Thankyou />}></Route>
            <Route exact path='/request' element={<RequestNow />}></Route>
            <Route exact path='/iqama' element={<Iqama />}></Route>


            <Route exact path='/mydocter' element={<Mydocter />}></Route>
            <Route exact path='/records' element={<Records_patientlist />}></Route>
            <Route exact path='/patientlsls' element={<PatientlistSubLeftSec />}></Route>
            <Route exact path='/medical' element={<Medical />}></Route>
            <Route exact path='/personal' element={<Personal />}></Route>
            <Route exact path='/lifestyle' element={<LifeStyle />}></Route>
            <Route exact path='/savedcards' element={<Savedcards />}></Route>
            <Route exact path='/Radiology' element={<Radiology />}></Route>
            <Route exact path='/Nursevisit' element={<NurseVisitTask />}></Route>
            <Route exact path='/Doctorvisit' element={< Doctorvisit />}></Route>
            <Route exact path='/Physiotherapist' element={<Physiotherapist />}></Route>
            <Route exact path='/patientlist' element={<Patient_list />}></Route>
            <Route exact path='/hospitalhealthcenter2' element={<Hospital_Health_Center_2 />}></Route>
            <Route exact path='/Practiotioner' element={<Practiotioner />}></Route>
            <Route exact path='/Selectcenter' element={<Selectcenter />}></Route>
            <Route exact path='/corporate' element={<Corporatewellnessnew />}></Route>
            <Route exact path='/eclinics' element={<Eclinics />}></Route>
            <Route exact path='/seasonalflucenter' element={<Seasonalflucenter />}></Route>
            <Route exact path='/seasonaladddetails' element={<Seasonaladddetails />}></Route>





          </Routes>

        </Router>

      </div>
    </DoctorProvider>
  )
}

export default App

