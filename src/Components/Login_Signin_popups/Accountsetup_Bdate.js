import React, { useState, useRef, useEffect } from "react";
import moment from 'moment';
import "../../Style/Login_step4.css";
import "../../Style/login_popup.css";

function Accountsetup_Bdate({ handleSlectedDate }) {
    const [date, setDate] = useState(19);
    const [month, setMonth] = useState("Oct");
    const [year, setYear] = useState(1999);
    const [selectedCalendar, setSelectedCalendar] = useState("gregorian");

    const dateRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);

    const handleSelect = () => {
        const selectedDate = `${date} ${month} ${year}`;
        handleSlectedDate(selectedDate);
    };

    const toggleCalendar = (calendarType) => {
        setSelectedCalendar(calendarType);
    };

    const formatSelectedDate = () => {
        const formattedDate = moment(`${year}-${month}-${date}`, "YYYY-MMM-DD").format("DD-MM-YYYY");
        return formattedDate;
    };

    const handleScroll = (type) => {
        let container, items, setState;

        // Determine which scrollable container is being scrolled
        if (type === "date") {
            container = dateRef.current;
            items = [...container.children];
            setState = setDate;
        } else if (type === "month") {
            container = monthRef.current;
            items = [...container.children];
            setState = setMonth;
        } else if (type === "year") {
            container = yearRef.current;
            items = [...container.children];
            setState = setYear;
        }

        // Detect the center-aligned item
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;

        let closest = null;
        items.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.top + itemRect.height / 2;
            const distance = Math.abs(containerCenter - itemCenter);

            if (!closest || distance < closest.distance) {
                closest = { element: item, distance };
            }
        });

        // Update the selected value
        if (closest) {
            setState(closest.element.textContent);
        }
    };

    return (
        <div className="container my-5">
            <span className="poppins-semibold zw_24 zw_text_color">Select Date of Birth</span>
            <div className='container Date_type_bg' style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
                <button
                    className={`btnn poppins-medium zw_20 zw_title_color py-2 ${selectedCalendar === 'gregorian' ? 'active' : ''}`}
                    style={{ width: "40%" }}
                    onClick={() => toggleCalendar('gregorian')}
                >
                    Gregorian
                </button>
                <button
                    className={`btnn poppins-medium zw_20 zw_title_color py-2 ${selectedCalendar === 'hijri' ? 'active' : ''}`}
                    style={{ width: "40%" }}
                    onClick={() => toggleCalendar('hijri')}
                >
                    Hijri
                </button>
            </div>
            <div className="date-picker-container my-5">
                {/* Date Scroll */}
                <div className="scroll-container" ref={dateRef} onScroll={() => handleScroll("date")}>
                    {["", ...Array(31).keys(), ""].map((d, index) => (
                        <div
                            key={index}
                            className={`scroll-item ${parseInt(date) === d + 1 ? "active" : ""}`}
                        >
                            {d !== "" ? d + 1 : ""}
                            {/* {d + 1} */}
                        </div>
                    ))}
                </div>

                {/* Month Scroll */}
                <div className="scroll-container" ref={monthRef} onScroll={() => handleScroll("month")}>
                    {["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""].map(
                        (m) => (
                            <div
                                key={m}
                                className={`scroll-item ${month === m ? "active" : ""}`}
                            >
                                {m}
                            </div>
                        )
                    )}
                </div>

                {/* Year Scroll */}
                <div className="scroll-container" ref={yearRef} onScroll={() => handleScroll("year")}>
                    {["", ...Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i)].map((y, index) => (
                        <div
                            key={index}
                            className={`scroll-item ${parseInt(year) === y ? "active" : ""}`}
                        >
                            {y !== "" ? y : ""}
                        </div>
                    ))}
                </div>


                {/* Fixed Center Box */}
                <div className="fixed-center-box"></div>
            </div>

            <div className="container mb-4" style={{ display: "flex", justifyContent: "center" }}>
                <button
                    type="button"
                    className="link_btn"
                    style={{ width: "60%", border: "none" }}
                    onClick={handleSelect}
                >
                    Select
                </button>
            </div>
        </div>
    );
}

export default Accountsetup_Bdate;
