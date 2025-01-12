import React, {useEffect, useState, useRef} from 'react';
import {AContainer, AHeader, ALayout, ALeftSide, ARightSide, ARSItem, ASpace, AUnderline} from "./appointment.element";
import useRegion from '../../hook/useRegion';
import useSpeciality from '../../hook/useSpeciality';
import useAccount from '../../hook/useAccount';
import AppointmentModal from '../../components/AppointmentModal';
import useAppointment from '../../hook/useAppointment';
import InsuranceModal from '../../components/InsuranceModal';
import { useAppContext } from '../../context/AppContext';
import LoadingAnimation from '../../components/LoadingAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const Appointment = () => {
    const [regionLoading, regionHook] = useRegion();
    const insuranceModalRef = useRef(null);
    const [specialityLoading, specialityHook] = useSpeciality();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [filteredDoctor, setFilterDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [healthIssues, setHealthIssues] = useState('');
    const [typeService, setTypeService] = useState('appointment');
    const [
        , 
        , 
        loadingAccount, 
        , 
        , 
        filterDoctorList, 
        getAccountByEmail, 
        , 
        , 
        , 
        getDoctorActiveList, 
        , 
        , 
        , 
        , 
        , 
        , 
        , 
        ,
        ,
        ,
        getAccountStatus
        ] = useAccount();
    const [appointmentLoading, , addAppointment] = useAppointment();
    const [doctorActiveHour, setDoctorActiveHour] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentDay, setAppointmentDay] = useState('');
    const [appointmentTimeStart, setAppointmentTimeStart] = useState('');
    const [appointmentTimeEnd, setAppointmentTimeEnd] = useState('');
    const [selectedDoctorID, setSelectedDoctorID] = useState('');
    const [userID, setUserID] = useState('');
    const [appointmentInfo, setAppointmentInfo] = useState({});
    const {sharedData, setSharedData} = useAppContext();
    const [userInfo, setUserInfo] = useState({});
    let intervalId;

    useEffect(() => {
        const fetchAccount = async () => {
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                const AccountInfo = await getAccountByEmail(obj?.email);
                setUserID(AccountInfo?._id); 
                setUserInfo(AccountInfo);
            }
        };
        const fetchSharedData = () => {
            if (sharedData) {
                setSelectedRegion(sharedData?.region_id?.name);
                setSelectedSpeciality(sharedData?.speciality_id?.name);
                setSelectedDoctor(sharedData?.username);
                setSelectedDoctorID(sharedData?._id);
                setDoctorActiveHour(sharedData?.active_hours);
            }
        }
        fetchAccount();
        fetchSharedData();
    }, []);

    useEffect(() => {
       const fetchFilterDoctor = async() => {
            const FilteredDoctors = await filterDoctorList(selectedSpeciality, selectedRegion);
            setFilterDoctor(FilteredDoctors);
       }
       if (selectedSpeciality !== '') {
            fetchFilterDoctor();
       }
       
    }, [selectedRegion, selectedSpeciality]);

    useEffect(() => {
        if (filteredDoctor.length === 1) {
            setSelectedDoctor(filteredDoctor[0].username);
        }
    }, [filteredDoctor]);

    useEffect(() => {
        const doctor = filteredDoctor.find(item => item.username === selectedDoctor);
        const fetchActiveHour = async() => {
            if (doctor) {
                const activeHourList = await getDoctorActiveList(doctor?._id);
                setDoctorActiveHour(activeHourList?.active_hours);
                setSelectedDoctorID(doctor?._id);
            } else {
                
                setDoctorActiveHour([]);
                setSelectedDoctorID('');
            }
        }
        if (!sharedData) {
            fetchActiveHour();
        }

        const checkDoctorExistancePeriodically = async () => {
            const status = await getAccountStatus(doctor?.email || "");
            if (status && typeof status === 'object') {
                if (status?.is_deleted) {
                    alert("Tài khoản bác sĩ đã bị vô hiệu hóa, vui lòng thử lại sau!");
                    window.location.reload();
                }
            }
            else if (status && typeof status !== 'object') {
                if (status === "No user found") {
                    alert("Không tìm thấy tài khoản bác sĩ, vui lòng thử lại sau!");
                    window.location.reload();
                }
            }
        };
        
        if (selectedDoctor !== "") {
            intervalId = setInterval(() => {
                checkDoctorExistancePeriodically();
            }, 5000);
        }

        return () => {
            clearInterval(intervalId);
        };
        
    }, [selectedDoctor]);  
    
     const handleSubmitActiveHour = (data) => {
         const [startTime, endTime] = data.selectedTime.split(' - ');
          setAppointmentDate(`${data.dayName} ${data.formattedDate} ${data.selectedTime}`);
          setAppointmentDay(`${data.dayName} ${data.formattedDate}`);

          setAppointmentTimeStart(startTime); 
          setAppointmentTimeEnd(endTime);
      };

     const handleSubmitAppointment = async() => {
        if (!healthIssues || !selectedDoctor || !appointmentDate)
        {
            alert("Bạn chưa chọn đủ trường!");
            return;
        }
        let item = localStorage.getItem('isLoginSuccess');
            
        if (userInfo?.__t){
            alert("Bác sĩ không thể đặt lịch khám!");
            return;
        }
        else{
            if (item) {
                const appointment = await addAppointment(userID, selectedDoctorID, appointmentDay, appointmentTimeStart, appointmentTimeEnd, healthIssues, typeService);
                if (appointment && typeof appointment === 'object') {
                    setAppointmentInfo(appointment);
                    if (sharedData) setSharedData(null);
                    if (insuranceModalRef.current) {
                    insuranceModalRef.current.openModal(); 
                  }
                }
                else if (appointment && typeof appointment !== 'object'){
                    alert(appointment);
                }
                else {
                    alert("Có lỗi xảy ra, vui lòng thử lại sau!");
                }
                
            }
            else {
                alert("Bạn cần đăng nhập để đặt lịch khám!");
            }
        }

     }

      if (loadingAccount || specialityLoading || regionLoading || appointmentLoading)
         return (
             <LoadingAnimation></LoadingAnimation>
         )

    return (
        <form>
            <ALayout>
                <ASpace/>
                <AContainer>
                    <AHeader>
                        <p>ĐĂNG KÍ KHÁM BỆNH</p>
                        <AUnderline/>
                    </AHeader>
                    <ALeftSide>
                        <h3>LƯU Ý:</h3>
                        <p>Lịch hẹn có hiệu lực sau khi <br/> có xác nhận chính thức từ <br/> Phòng khám Bệnh viện
                            Đại <br/> học Y Dược 1.</p>
                        <p>Quý khách sử dụng dịch vụ <br/> đặt hẹn trực tuyến, xin vui <br/> lòng đặt trước ít nhất là
                            <br/> 24 giờ trước khi đến khám.</p>

                        <p>
                            Trong trường hợp khẩn cấp <br/> hoặc nghi ngờ có các triệu <br/> chứng nguy hiểm,
                            quý <br/> khách vui lòng <strong> ĐẾN
                            TRỰC <br/> TIẾP </strong> Phòng khám hoặc các <br/>trung tâm y tế gần nhất để <br/> kịp thời
                            xử lý.
                        </p>

                        <ARightSide>
                        <ARSItem>
                            <p>Chọn địa điểm khám</p>
                            <select 
                                value={selectedRegion} 
                                onChange={(e) => setSelectedRegion(e.target.value)}
                            >
                                <option value="">Chọn địa điểm</option>
                                {regionHook.map((item, index) => (
                                    <option key={index} value={item?.name}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        </ARSItem>

                        <ARSItem>
                            <p>Chọn chuyên khoa</p>
                            <select 
                                value={selectedSpeciality} 
                                onChange={(e) => setSelectedSpeciality(e.target.value)}
                                disabled={!selectedRegion}
                            >
                                <option value="">Chọn chuyên khoa</option>
                                {specialityHook.map((item, index) => (
                                    <option key={index} value={item?.name}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        </ARSItem>

                        <ARSItem>
                            <p>Chọn bác sĩ</p>
                            <select 
                                value={selectedDoctor} 
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                disabled={!selectedSpeciality}
                            >
                                <option value="">Chọn bác sĩ</option>
                                {(filteredDoctor || []).map((item) => (
                                    <option key={item?._id} value={item?.username}>
                                        {item?.username}
                                    </option>
                                ))}
                            </select>
                        </ARSItem>

                        <ARSItem>
                            <p>Chọn ngày - khung giờ muốn khám</p>
                            <input type='text' placeholder='Chọn ngày - khung giờ muốn khám' value={appointmentDate} readOnly />
                            <AppointmentModal 
                                data={doctorActiveHour} 
                                onSubmit={handleSubmitActiveHour} 
                                disabled={!selectedDoctor}
                            >
                                <FontAwesomeIcon icon={faCalendar} className={`calendar-icon ${!selectedDoctor ? 'disabled' : ''}`} disabled={!selectedDoctor}></FontAwesomeIcon>
                            </AppointmentModal>
                        </ARSItem>

                        <ARSItem>
                            <p>Nhập vấn đề về sức khoẻ</p>
                            <textarea 
                                rows="10" 
                                cols="50" 
                                value={healthIssues} 
                                onChange={(e) => setHealthIssues(e.target.value)} 
                                disabled={!appointmentDate}
                            ></textarea>
                        </ARSItem>

                        <ARSItem>
                            <button 
                                type = "button"
                                onClick={handleSubmitAppointment} 
                                className="next-button"
                            >
                                TIẾP THEO
                            </button>
                        </ARSItem>
                        {appointmentInfo && (
                            <ARSItem className="hidden">
                            <InsuranceModal ref={insuranceModalRef} data={appointmentInfo}>BHYT</InsuranceModal>
                            </ARSItem>
                        )}
                        
                    </ARightSide>



                    </ALeftSide>


                </AContainer>
                <ASpace/>
            </ALayout>


        </form>
    );
};

export default Appointment;
