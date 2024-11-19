import React, { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import styles from './AppointmentInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faQuestion, faMagnifyingGlass, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import useAppointment from "../../hook/useAppointment";

const cx = classNames.bind(styles);

function AppointmentInfo({data}) {
    const [appointmentLoading, appointmentHook, addAppointment, getAllAppointmentByUserID, cancelAppointment] = useAppointment();
    const handleCancelAppointment = async() => {
        const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (userConfirmed) {
            console.log("Data ID: ", data._id);
            await cancelAppointment(data._id);
            console.log("Hủy thành công");
        } else {
           return;
         }
    }
    return(
        <div className={cx('wrapper')} >
            <div className={cx('appointment-title-wrapper')}>
                <div className={cx('title')}>
                    <span>THÔNG TIN LỊCH HẸN</span>
                </div>
                <button className={cx('cancel-button')} onClick={handleCancelAppointment}>
                    <FontAwesomeIcon icon={faXmark} className={cx('cancel-button-icon')}></FontAwesomeIcon>
                </button>
            </div>
            <div className={cx('appointment-info-wrapper')}>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Tên bệnh nhân: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data.user_id.username}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Tên bác sĩ: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data.doctor_id.username}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Ngày hẹn: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data.appointment_day}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Giờ bắt đầu: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data.appointment_time_start}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Giờ kết thúc: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data.appointment_time_end}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Vấn đề sức khỏe: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data.health_issue}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Dịch vụ khám bệnh: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data.type_service}</span>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default AppointmentInfo;