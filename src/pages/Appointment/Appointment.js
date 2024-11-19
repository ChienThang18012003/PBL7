import React, {useEffect, useState} from 'react';
import {AContainer, AHeader, ALayout, ALeftSide, ARightSide, ARSItem, ASpace, AUnderline} from "./appointment.element";
import {IoIosArrowRoundForward} from "react-icons/io";
import * as provincesService from "../../services/Provinces"
import useRegion from '../../hook/useRegion';
import useSpeciality from '../../hook/useSpeciality';
import useAccount from '../../hook/useAccount';
import AppointmentModal from '../../components/AppointmentModal';
import DateModal from '../../components/DateModal';
import useAppointment from '../../hook/useAppointment';

const Appointment = () => {
    const [provinces, setProvinces] = useState([]);
    const [regionLoading, regionHook] = useRegion();
    const [specialityLoading, specialityHook, getSpecialityByID, searchSpeciality] = useSpeciality();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [filteredDoctor, setFilterDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState([]);
    const [healthIssues, setHealthIssues] = useState('');
    const [typeService, setTypeService] = useState('');
    const [checkLogin, signUp, loadingAccount, doctorsHook, getAccountByID, filterDoctorList, getAccountByEmail, checkAccountType, uploadProof, changePassword, getDoctorActiveList, addDoctorActiveHour, changeAccountInfo, changeDoctorInfo] = useAccount();
    const [appointmentLoading, appointmentHook, addAppointment] = useAppointment();
    const [doctorActiveHour, setDoctorActiveHour] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentDay, setAppointmentDay] = useState('');
    const [appointmentTimeStart, setAppointmentTimeStart] = useState('');
    const [appointmentTimeEnd, setAppointmentTimeEnd] = useState('');
    const [selectedDoctorID, setSelectedDoctorID] = useState('');
    const [userID, setUserID] = useState('');

    const getAllProvinces = async () => {
        const result = await provincesService.apiGetPublicProvinces();
        setProvinces(result.data.results);
    }

    

    useEffect(() => {
        const fetchAccount = async () => {
            let item = localStorage.getItem('isLoginSuccess');
            
            // Nếu item tồn tại, chuyển đổi từ chuỗi JSON thành đối tượng
            if (item) {
                let obj = JSON.parse(item);
                const AccountInfo = await getAccountByEmail(obj.email);
                setUserID(AccountInfo._id);  // Set userInfo
                
            }
        };
        fetchAccount();
    }, []);

    useEffect(() => {
       const fetchFilterDoctor = async() => {
            const FilteredDoctors = await filterDoctorList(selectedSpeciality, selectedRegion);
            console.log("Filter Doctors: ", FilteredDoctors);
            setFilterDoctor(FilteredDoctors);
       }

       fetchFilterDoctor();
    }, [selectedRegion, selectedSpeciality]);

    useEffect(() => {
        if (filteredDoctor.length === 1) {
            setSelectedDoctor(filteredDoctor[0].username);
        }
    }, [filteredDoctor]);

    useEffect(() => {
        const fetchActiveHour = async() => {
            const doctor = filteredDoctor.find(item => item.username === selectedDoctor);
            
            // Check if the doctor object exists before accessing 'active_hours'
            if (doctor) {
                setDoctorActiveHour(doctor.active_hours);
                setSelectedDoctorID(doctor._id);
            } else {
                // If doctor is not found, handle it gracefully, maybe clear active hours or show a message
                setDoctorActiveHour([]);
                setSelectedDoctorID('');
            }
        }
    
        fetchActiveHour();
    }, [selectedDoctor]);  // Make sure 'filteredDoctor' is also a dependency
    
     const handleSubmitActiveHour = (data) => {
         const [startTime, endTime] = data.selectedTime.split(' - ');
          setAppointmentDate(`${data.dayName} ${data.formattedDate} ${data.selectedTime}`);
          setAppointmentDay(`${data.dayName} ${data.formattedDate}`);

          setAppointmentTimeStart(startTime);  // Cập nhật thời gian bắt đầu
          setAppointmentTimeEnd(endTime);      // Cập nhật thời gian kết thúc
      };

     const handleSubmitAppointment = async() => {
        console.log(userID, selectedDoctorID, appointmentDay, appointmentTimeStart, appointmentTimeEnd, healthIssues, typeService);
        await addAppointment(userID, selectedDoctorID, appointmentDay, appointmentTimeStart, appointmentTimeEnd, healthIssues, typeService);
        console.log("Thêm thành công");
     }

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
                                <select value = {selectedRegion} onChange={(e)=>{setSelectedRegion(e.target.value)}}>
                                    {
                                        regionHook.map((item, index) => (
                                            <option key={index} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))
                                    }
                                </select>

                            </ARSItem>

                            <ARSItem>
                                <p>Chọn loại dịch vụ khám</p>
                                <select value = {typeService} onChange={(e)=>{setTypeService(e.target.value)}}>
                                    <option value="Trong giờ">Trong giờ</option>
                                    <option value="Ngoài giờ">Ngoài giờ</option>
                                    <option value="Online">Online</option>
                                </select>
                            </ARSItem>

                            <ARSItem>
                                <p>Chọn chuyên khoa</p>
                                <select value = {selectedSpeciality} onChange={(e)=>{setSelectedSpeciality(e.target.value)}}>
                                    {
                                        specialityHook.map((item, index) => (
                                            <option key={index} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </ARSItem>

                            <ARSItem>
                                <p>Chọn bác sĩ</p>
                                <select value = {selectedDoctor} onChange={(e)=>{setSelectedDoctor(e.target.value)}}>
                                    {
                                        filteredDoctor.map((item) => (
                                            <option key={item._id} value={item.username}>
                                                {item.username}
                                            </option>
                                        ))
                                    }
                                </select>
                            </ARSItem>

                            <ARSItem>
                                <p>Chọn ngày - khung giờ muốn khám</p>
                                <input type='text' value={appointmentDate} readOnly/>
                                <AppointmentModal data={doctorActiveHour} onSubmit={handleSubmitActiveHour}>Chọn</AppointmentModal>
                            </ARSItem>

                            <ARSItem>
                                <p>Nhập vấn đề về sức khoẻ </p>
                                <textarea rows="10" cols="50" value={healthIssues} onChange={(e)=>{setHealthIssues(e.target.value)}}></textarea>
                            </ARSItem>
                            <ARSItem>
                                <button onClick={handleSubmitAppointment}>TIẾP THEO</button>
                            </ARSItem>

                        </ARightSide>


                    </ALeftSide>


                </AContainer>
                <ASpace/>
            </ALayout>


        </form>
    );
};

export default Appointment;
