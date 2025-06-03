import React, { useEffect, useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState([]);
    const [PatientName, setPatientName] = useState([]);
    const [IqamaPatientName, setIqamaPatientName] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [userId, setUserId] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        Firstname: '',
        Email: '',
        Phone: ''
    });

    const [formData2, setFormData2] = useState({
        Country: '',
        City: '',
        Homevisitnparamedic: '0',
        Telemedicinennurse: '0',
        Allnlabtech: '0',
        Othersnphysio: '0',
        Description: ''
    });

    const [formData3, setFormData3] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        phone: '',
        email: '',
        country: '',
        city: '',
        service_type: ['homevisit'],
    });

    const [formData4, setFormData4] = useState({
        specialization: '',
        subspecialization: '',
        scfhs: '',
        scfhsno: '',
        filename: null,
        service_type: [],
        description: ''
    });

    const [formData5, setFormData5] = useState({
        healthcare: '',
        registernumber: '',
        country: '',
        city: '',
        phone: '',
        email: '',
    });

    const [formData6, setFormData6] = useState({
        service_type: '',
        description: ''
    });

    const [formData7, setFormData7] = useState({
        Type: "Nurse",
        Firstname: "",
        Lastname: "",
        Email: "",
        Phone: "",
        Male: "0",
        Female: "0",
        Country: "",
        City: "",
        Homevisitnparamedic: "0",
        Telemedicinennurse: "0",
        Allnlabtech: "0",
        Othersnphysio: "0"
    });

    // loginForm
    const [loginForm, setLoginForm] = useState({
        country: 'India',
        phone: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // SignupForm
    const [signupFormData, setSignupFormData] = useState({
        Firstname: '',
        Lastname: '',
        Email: '',
        Phone: '',
        Password: '',
        Dob: '',
        Gender: '',
        Country: '',
        Nationalid: '',
        Type: 'register'
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState(
        localStorage.getItem("profileImage") || ""
    );
    // const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const storedProfileImage = sessionStorage.getItem("profileImage");
        if (storedProfileImage) {
            setProfileImage(storedProfileImage);  // Load profile image from sessionStorage
        }
    }, []);

    useEffect(() => {
        const storedIsAuthenticated = sessionStorage.getItem('isAuthenticated');
        const storedUsername = sessionStorage.getItem('username');
        if (storedIsAuthenticated && storedUsername) {
            setIsAuthenticated(JSON.parse(storedIsAuthenticated));
            setUsername(JSON.parse(storedUsername));
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (profileImage !== null) {
            sessionStorage.setItem("profileImage", profileImage); // Save profile image to sessionStorage
        }
    }, [profileImage]); // Update sessionStorage when profileImage changes

    const updateSignupFormData = (newData) => {
        setSignupFormData({ ...signupFormData, ...newData });
    };

    const [appointmentData, setAppointmentData] = useState({
        Servicename: '',
        Subservices: [],
        Address: '',
        Qty: '1',
        Date: '',
        Timeslot: '',
        Typeoftest: 'New Release',
        Typeofvisit: 'Visit the center',
        Healthcare: '',
        HealthcareName: '',
        Price: '',
        Patients: [],
        Description: '',
        Gender: '',
    });

    const [isServiceStored, setIsServiceStored] = useState(false);

    useEffect(() => {
        const storedAppointmentData = sessionStorage.getItem('appointmentData');
        if (storedAppointmentData) {
            const parsedData = JSON.parse(storedAppointmentData);
            setAppointmentData(parsedData);
            setIsServiceStored(true);
        }
    }, []);

    const updateAppointmentData = (newData) => {
        setAppointmentData({ ...appointmentData, ...newData });
        sessionStorage.setItem('appointmentData', JSON.stringify({ ...appointmentData, ...newData }));
    };

    const [paymentData, setPaymentData] = useState({
        paymentmethod: 'Card Payment',
        paymentdate: '',
        cardholname: '',
        cardno: '',
        cvvno: '',
        cardexpdate: ''
    });

    useEffect(() => {
        const storedPaymentData = sessionStorage.getItem('paymentData');
        if (storedPaymentData) {
            setPaymentData(JSON.parse(storedPaymentData));
        }
    }, []);

    const updatePaymentData = (newData) => {
        setPaymentData(prevData => ({ ...prevData, ...newData }));
        sessionStorage.setItem('paymentData', JSON.stringify({ ...paymentData, ...newData }));
    };

    const [addressList, setAddressList] = useState([]);

    const addAddress = (address) => {
        const updatedAddressList = [...addressList, address];
        setAddressList(updatedAddressList);
        sessionStorage.setItem('addressList', JSON.stringify(updatedAddressList));
    };

    const [isAddressStored, setIsAddressStored] = useState(false);

    useEffect(() => {
        const storedAddressData = sessionStorage.getItem('addressList');
        if (storedAddressData) {
            const parsedData = JSON.parse(storedAddressData);
            setAddressList(parsedData);
            setIsAddressStored(true);
        }
    }, []);

    const [user, setUser] = useState(null);

    const registerUser = (userData) => {
        setUser(userData);
    };

    return (
        <Context.Provider value={{
            userId, setUserId, userDetails, setUserDetails, selectedTests, setSelectedTests,
            IqamaPatientName, setIqamaPatientName, username, setUsername, addressList, addAddress,
            formData6, setFormData6, formData5, setFormData5, formData4, setFormData4, formData3, setFormData3,
            formData2, setFormData2, formData, setFormData, selectedPackage, setSelectedPackage, selectedItems,
            setSelectedItems, show, setShow, PatientName, setPatientName, formData7, setFormData7, loginForm,
            setLoginForm, isLoading, setIsLoading, error, setError, signupFormData, setSignupFormData,
            updateSignupFormData, isAuthenticated, setIsAuthenticated, user, registerUser, appointmentData,
            setAppointmentData, updateAppointmentData, isServiceStored, setIsServiceStored, paymentData,
            setPaymentData, updatePaymentData, isAddressStored, setIsAddressStored, setAddressList, profileImage,
            setProfileImage
        }}>
            {children}
        </Context.Provider>
    );
};
