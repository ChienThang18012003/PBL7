import React, { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './AppointmentModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";

const cx = classNames.bind(styles);

export default function AppointmentModal({ children, disabled = false, data, onSubmit }) {
  const [modal, setModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Ngày mặc định
  const [selectedHourType, setSelectedHourType] = useState("working"); // Hour type mặc định
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Lưu ngày được chọn
  };

  const handleHourTypeChange = (event) => {
    const hourType = event.target.value;
    setSelectedHourType(hourType);

    // Lọc thời gian theo hour_type
    const filteredTimes = data
      .filter(item => item.hour_type === hourType)
      .map(item => `${item.start_time} - ${item.end_time}`);
    setAvailableTimes(filteredTimes);
    setSelectedTime(""); // Reset thời gian đã chọn
  };

  const handleSubmitActiveHour = async () => {
    const formattedDate = selectedDate.toLocaleDateString('en-CA'); // Định dạng YYYY-MM-DD mà không bị ảnh hưởng bởi UTC
    const dayIndex = selectedDate.getDay(); // Lấy chỉ số thứ trong tuần
    const dayName = Object.keys(dayToIndexMap).find(key => dayToIndexMap[key] === dayIndex); // Lấy tên thứ
  
    // Gửi thông tin
    console.log("Submitting: ", { formattedDate, dayName, selectedTime, selectedHourType });
    onSubmit({
      formattedDate,
      dayName,
      selectedTime,
      selectedHourType
    });
  
    setModal(!modal);
  };
  
  

  // Xác định các ngày được đánh dấu
const getHighlightedDates = () => {
  return data
    .filter(item => item.hour_type === selectedHourType)
    .map(item => {
      const dayIndex = dayToIndexMap[item.day]; // Chuyển đổi thứ thành index
      return dayIndex;
    });
};

// Vô hiệu hóa các ngày không hợp lệ
const tileDisabled = ({ date }) => {
  const today = new Date(); // Ngày hiện tại
  today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili giây về 0

  // Lấy các ngày hợp lệ
  const highlightedDays = getHighlightedDates();

  // Nếu ngày không thuộc các ngày được đánh dấu hoặc nhỏ hơn hôm nay => vô hiệu hóa
  return !highlightedDays.includes(date.getDay()) || date < today;
};


  // Map từ tên thứ sang index của ngày trong tuần
  const dayToIndexMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const tileClassName = ({ date }) => {
    const highlightedDays = getHighlightedDates();
    const dayName = Object.keys(dayToIndexMap).find(key => dayToIndexMap[key] === date.getDay());
    return highlightedDays.includes(dayName) ? cx('highlighted-day') : null;
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <Button type="button" primary onClick={toggleModal}>
        {children}
      </Button>

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <h3>Chọn ngày và giờ làm việc</h3>
            

            {/* Calendar */}
            <div className={cx('calendar-container')}>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={tileClassName} // Highlight các ngày theo hour_type
              tileDisabled={tileDisabled}  // Vô hiệu hóa các ngày không hợp lệ
            />

            </div>

            {/* Select dropdown */}
            
            <div className={cx('field-container')}>
              {/* Radio buttons */}
              
                
                <h3>Ngày bác sĩ có lịch làm việc</h3>
              
              <input
                  type="radio"
                  value="working"
                  checked={selectedHourType === "working"}
                  onChange={handleHourTypeChange}
                  className={cx('radio-button')}
                />
            </div>
            <div className={cx('field-container')}>
            <h3>Ngày bác sĩ có lịch khám</h3>
              <input
                  type="radio"
                  value="appointment"
                  checked={selectedHourType === "appointment"}
                  onChange={handleHourTypeChange}
                  className={cx('radio-button')}
                />
            </div>

            <div className={cx('field-container')}>
              <div className={cx('field-name')}>Chọn giờ:</div>
              <select
                id="time-select"
                value={selectedTime}
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

            <div className={cx('modal-field-container')}>
              <Button submitTwo onClick={handleSubmitActiveHour}>
                Thêm giờ khám
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
