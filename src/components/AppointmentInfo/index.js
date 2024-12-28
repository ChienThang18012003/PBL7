import classNames from 'classnames/bind';
import styles from './AppointmentInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faRotate } from '@fortawesome/free-solid-svg-icons';
import useAppointment from "../../hook/useAppointment";

const cx = classNames.bind(styles);

function AppointmentInfo({data, onUpdateData}) {
    const [ , , , , cancelAppointment, , , softDeleteAppointment, restoreAppointment] = useAppointment();
    const handleCancelAppointment = async() => {
        if (data?.is_deleted) {
            const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa cuộc hẹn này không?");
            if (userConfirmed) {
                const canceledAppointment = await cancelAppointment(data?._id);
                if (canceledAppointment && typeof canceledAppointment === 'object') {
                    alert("Xóa cuộc hẹn thành công!");
                    onUpdateData("delete", data?._id);
                    return;
                }
                else if (canceledAppointment && typeof canceledAppointment !== 'object') {
                    alert(canceledAppointment);
                    return;
                }
                else {
                    alert("Có lỗi xảy ra, vui lòng thử lại sau!");
                    return;
                }
                
            } else {
            return;
            }
        }
        else {
            const userConfirmed = window.confirm("Bạn có chắc chắn muốn hủy cuộc hẹn này không?");
            if (userConfirmed) {
                const deletedAppointment = await softDeleteAppointment(data?._id);
                if (deletedAppointment && typeof deletedAppointment === 'object') {
                    alert("Hủy cuộc hẹn thành công!");
                    onUpdateData("update", { ...data, is_deleted: true });
                    return;
                }
                else if (deletedAppointment && typeof deletedAppointment !== 'object') {
                    alert(deletedAppointment);
                }
                else {
                    alert("Có lỗi xảy ra, vui lòng thử lại sau!");
                    return;
                }
            } else {
            return;
            }
        }
        
    }
    const handleRestoreAppointment = async() => { 
        const userConfirmed = window.confirm("Bạn có chắc chắn muốn khôi phục cuộc hẹn này không?");
        if (userConfirmed) {
            const restoredAppointment = await restoreAppointment(data?._id);
            if (restoredAppointment) {
                alert("Khôi phục cuộc hẹn thành công!");
                onUpdateData("update", { ...data, is_deleted: false });
                return;
            }
            else {
                alert("Có lỗi xảy ra, vui lòng thử lại sau!");
            }
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
                <div className={cx('buttons-container')}>
                    {
                        data?.is_deleted && (
                            <button className={cx('cancel-button')} onClick={handleRestoreAppointment}>
                                <FontAwesomeIcon icon={faRotate} className={cx('cancel-button-icon')}></FontAwesomeIcon>
                            </button>
                        )
                    }
                    <button className={cx('cancel-button')} onClick={handleCancelAppointment}>
                        <FontAwesomeIcon icon={faXmark} className={cx('cancel-button-icon')}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
            <div className={cx('appointment-info-wrapper')}>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Tên bệnh nhân: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data?.user_id?.username}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Tên bác sĩ: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data?.doctor_id?.username}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Ngày hẹn: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data?.appointment_day}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Giờ bắt đầu: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data?.appointment_time_start}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Giờ kết thúc: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data?.appointment_time_end}</span>
                    </div>
                 </div>
                 <div className={cx('appointment-field-wrapper')}>
                    <div className={cx('appointment-field-title')}>
                        <span>Vấn đề sức khỏe: </span>
                    </div>
                    <div className={cx('appointment-field')}>
                        <span>{data?.health_issue}</span>
                    </div>
                 </div>
                 {(data?.insurance || []).length > 0 && 
                    (
                        <div className={cx('appointment-field-wrapper')}>
                            <div className={cx('appointment-field-title')}>
                                <span>Bảo hiểm: </span>
                             </div>
                        </div>
                    )
                 }
                 
                 {(data?.insurance || []).map((insurance) => (
                     
                    <>
                        <div className={cx('appointment-field-wrapper')}>
                            <div className={cx('appointment-field-title')}>
                                <span>Tên bảo hiểm: </span>
                            </div>
                            <div className={cx('appointment-field')}>
                                <span>{insurance?.name}</span>
                            </div>
                        </div>   
                        <div className={cx('appointment-field-wrapper')}>
                            <div className={cx('appointment-field-title')}>
                                <span>Mã số: </span>
                            </div>
                            <div className={cx('appointment-field')}>
                                <span>{insurance?.number}</span>
                            </div>
                        </div>   
                        <div className={cx('appointment-field-wrapper')}>
                            <div className={cx('appointment-field-title')}>
                                <span>Nơi cấp: </span>
                            </div>
                            <div className={cx('appointment-field')}>
                                <span>{insurance?.location}</span>
                            </div>
                        </div>   
                        <div className={cx('appointment-field-wrapper')}>
                            <div className={cx('appointment-field-title')}>
                                <span>Ngày hết hạn: </span>
                            </div>
                            <div className={cx('appointment-field')}>
                                <span>{insurance?.exp_date}</span>
                            </div>
                        </div>   
                    </>
                    
                ))}
            </div>
        </div>
    )
}

export default AppointmentInfo;