import React, { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import styles from './ListModal.module.scss';
import Button from "../Button";
import AppointmentInfo from "../AppointmentInfo";
import useAppointment from "../../hook/useAppointment";

const cx = classNames.bind(styles);

export default function ListModal({ children, disabled = false, data: initialData }) {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(initialData?.appointment_list || []);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedButton, setSelectedButton] = useState("incoming");
  const [, , , getAllAppointmentByUserID, , getAllAppointmentByDoctor] = useAppointment();


  const toggleModal = () => {
    if (disabled) return;
    setModal(!modal);

    if (!modal) {
      filterAppointments("incoming");
    }
  };

  const filterAppointments = (filterType) => {
    const today = new Date();
    let filtered = Array.isArray(data) ? data.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointment_day.split(" ")[1]);
      if (filterType === "done") {
        return appointmentDate < today && appointment.is_deleted === false;
      } else if (filterType === "incoming") {
        return appointmentDate >= today && appointment.is_deleted === false;
      } else if (filterType === "canceled") {
        return appointment.is_deleted === true;
      }
      return false;
    }) : [];

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.appointment_day.split(" ")[1]);
      const dateB = new Date(b.appointment_day.split(" ")[1]);
      return dateA - dateB; 
    });

    setFilteredAppointments(filtered);
    setSelectedButton(filterType);
  };

  const handleUpdateData = (action, payload) => {
    if (action === "delete") {
      setData((prev) => prev.filter((appointment) => appointment?._id !== payload));
    } else if (action === "update") {
      setData((prev) =>
        prev.map((appointment) =>
          appointment?._id === payload?._id ? { ...appointment, ...payload } : appointment
        )
      );
    }
  };

  useEffect(()=>{
    const fetchAppointmentsPeriodically = async () => {
      if (initialData?.is_doc) {
        let appointments = await getAllAppointmentByDoctor(initialData?._id, false);
        if (appointments && Array.isArray(appointments)) setData(appointments);
      } else if (!initialData?.is_doc) {
        let appointments = await getAllAppointmentByUserID(initialData?._id, false);
        if (appointments && Array.isArray(appointments)) setData(appointments);
      }
  };

  const intervalId = setInterval(() => {
    fetchAppointmentsPeriodically();
  }, 5000);

  return () => {
      clearInterval(intervalId);
  };
  }, [initialData])

  useEffect(() => {
    filterAppointments(selectedButton);
  },[data])

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <Button rounded type="button" primary onClick={toggleModal}>
        {children}
      </Button>

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('button-container')}>
              <button
                className={cx('status-button', { selected: selectedButton === "done" })}
                onClick={() => filterAppointments("done")}
              >
                Done
              </button>
              <button
                className={cx('status-button', { selected: selectedButton === "incoming" })}
                onClick={() => filterAppointments("incoming")}
              >
                Incoming
              </button>
              
            </div>
            <div className={cx('modal-field-container')}>
              {Array.isArray(filteredAppointments) && filteredAppointments.map((appointment, index) => (
                <AppointmentInfo key={index} data={appointment} onUpdateData={handleUpdateData}/>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
