import React, { useState } from "react";
import classNames from "classnames/bind";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./AppointmentModal.module.scss";
import Button from "../Button";

const cx = classNames.bind(styles);

export default function AppointmentModal({ children, data = [], onSubmit, disabled = false }) {
  const [modal, setModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const dayName = Object.keys(dayToIndexMap).find(
      (key) => dayToIndexMap[key] === date.getDay()
    );

    const filteredTimes = data
      .filter((item) => item.day === dayName)
      .map((item) => `${item.start_time} - ${item.end_time}`);
    setAvailableTimes(filteredTimes);
    setSelectedTime(""); 
  };

  const handleSubmitActiveHour = async () => {
    const formattedDate = selectedDate.toLocaleDateString("en-CA"); 
    const dayIndex = selectedDate.getDay();
    const dayName = Object.keys(dayToIndexMap).find(
      (key) => dayToIndexMap[key] === dayIndex
    );

    if (!formattedDate || !dayName || !selectedTime) {
      alert("Bạn chưa chọn đủ trường!");
      return;
    }

    onSubmit({
      formattedDate,
      dayName,
      selectedTime,
    });

    setModal(!modal);
  };

  const dayToIndexMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const getHighlightedDates = () => {
    if (!Array.isArray(data)) return []; 
    return data
      .map((item) => dayToIndexMap[item.day])
      .filter((dayIndex) => dayIndex !== undefined);
  };
  

  const tileClassName = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const highlightedDays = getHighlightedDates();

    if (date.toDateString() === selectedDate.toDateString()) {
      return cx("selected-day");
    }

    return highlightedDays.includes(date.getDay()) && date >= today
      ? cx("highlighted-day")
      : null;
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const highlightedDays = getHighlightedDates();

    return !highlightedDays.includes(date.getDay()) || date < today;
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button type="button" className={cx('modal-button')} disabled={disabled} onClick={toggleModal}>
        {children}
      </button>

      {modal && (
        <div className={cx("modal")}>
          <div onClick={toggleModal} className={cx("overlay")}></div>
          <div className={cx("modal-content")}>
            <h1 className={cx("title")}>Chọn ngày và giờ làm việc</h1>

            <div className={cx("calendar-container")}>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={tileClassName}
                tileDisabled={tileDisabled}
              />
            </div>


            <div className={cx("field-container")}>
            
              <select
                id="time-select"
                value={selectedTime}
                className={styles.timePicker}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Chọn giờ</option>
                {availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className={cx("modal-field-container")}>
              <Button type='button' submitTwo onClick={handleSubmitActiveHour}>
                Thêm giờ khám
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
