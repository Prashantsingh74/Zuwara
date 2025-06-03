import React, { useState, useEffect } from "react";
import moment from "moment"; // Assuming you're using moment.js
import "../../../../Style/Calender.css";

const Calendar = ({ change, currentDate }) => {

  const [today, setToday] = useState(moment());
  const [upcomingDates, setUpcomingDates] = useState([]);


  useEffect(() => {

    const dates = [];
    for (let i = 0; i <= 365; i++) {
      const date = moment().add(i, "days");
      dates.push(date);
    }
    setUpcomingDates(dates);
  }, []);

  let w = 0;

  return (
    <div>
      <div
        className="calender-css horizontal-cale-date"
        style={{ overflowX: "scroll", whiteSpace: "nowrap", scrollBehavior: "smooth" }}
      >
        {upcomingDates.map((date, index) => {
          if (date.format("YYYY-MM-DD") ===
            moment(currentDate).format("YYYY-MM-DD")) {
            document.querySelector(".calender-css").scrollLeft = w;
          } else if (index > 1) {
            w += document.querySelectorAll(".calender-con")[index - 2]?.offsetWidth + 20;
          }
          return (
            <>
              <div
                className="calender-con"
                key={index}
                style={{
                  display: "inline-block",
                  margin: "10px",
                  textAlign: "center",
                }}
                onClick={() => change(date._d)}
              >
                <p
                  className={
                    date.format("YYYY-MM-DD") ===
                      moment(currentDate).format("YYYY-MM-DD")
                      ? "color-red"
                      : ""
                  }
                  style={{fontSize:'18px'}}
                >
                  {!index ? "Today" : date.format("ddd").toUpperCase()}
                </p>
                <p
                  className={
                    date.format("YYYY-MM-DD") ===
                      moment(currentDate).format("YYYY-MM-DD")
                      ? "bg-red"
                      : ""
                  }
                  style={{fontSize:'18px'}}
                >
                  {date.format("Do").slice(0, -2)}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
