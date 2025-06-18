import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './ResumeModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPen } from '@fortawesome/free-solid-svg-icons';
import useCareer from "../../hook/useCareer";
import useCity from "../../hook/useCity";
import useResume from "../../hook/useResume";

const cx = classNames.bind(styles);

export default function ResumeModal({children , data, onSubmitModal, type="confirm", userInfo, email}) {
  const [modal, setModal] = useState(false);

  const [career_goal, setCareerGoal] = useState('');
  const [desired_position, setDesiredPosition] = useState('');
  const [desired_job_level, setDesiredJobLevel] = useState('');
  const [academic_level, setAcademicLevel] = useState('');
  const [experience, setExperience] = useState('');
  const [career_id, setCareerID] = useState('');
  const [career, setCareer] = useState('');
  const [city, setCity] = useState('');
  const [city_id, setCityID] = useState('');
  const [salary_min, setSalaryMin] = useState('');
  const [salary_max, setSalaryMax] = useState('');
  const [job_type, setJobType] = useState('');
  const [type_of_workplace, setWorkPlace] = useState('');
  const [cityLoading, cityHook] = useCity();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [careerLoading, careerHook, getAllCareers] = useCareer();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [resumeLoading, resumeHook, getResume, getAttachedResume, getDefaultResume, getResumeByEmail, addResume, updateResume, uploadAttachedFile] = useResume();
  const [fileName, setFileName] = useState(null);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Chỉ chấp nhận tệp PDF.");
      setFile(null);
      setFileName(null);
    } else {
      setError("");
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const createResumeObject = () => {
        const cityInfo = splitTwoPartString(selectedCity);
        const careerInfo = splitTwoPartString(selectedCareer);
        return {
            career_goal,
            desired_job_level,
            desired_position,
            academic_level,
            experience,
            salary_min,
            salary_max,
            job_type,
            type_of_workplace,
            city_id: cityInfo?.first,
            career_id: careerInfo?.first,
            city: cityInfo?.second,
            career: careerInfo?.second,
        };
    };

  useEffect(()=>{
    if (type==="confirm") {
    setCareerGoal(data?.career_goal || '');
    setDesiredJobLevel(data?.desired_job_level || '');
    setDesiredPosition(data?.desired_position || '');
    setAcademicLevel(data?.academic_level || '');
    setExperience(data?.experience || '');
    setSalaryMin(data?.salary_min || '');
    setSalaryMax(data?.salary_max || '');
    setJobType(data?.job_type || '');
    setWorkPlace(data?.type_of_workplace || '');
    setCity(data?.job_city || '');
    setCareer(data?.career || '');
    setCityID(data?.job_city_id || '');
    setCareerID(data?.career_id || '');
    if (data?.job_city && data?.job_city_id) setSelectedCity(data?.job_city_id + ' ' + data?.job_city);
    if (data?.career && data?.career_id) setSelectedCareer(data?.career_id + ' ' + data?.career);
    }
  },[data]);

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const splitTwoPartString = (str) => {
      const index = str.indexOf(' ');
      if (index === -1) {
          return { first: str, second: '' }; // hoặc null tùy yêu cầu
      }
      const first = str.slice(0, index).trim();
      const second = str.slice(index + 1).trim();
      return { first, second };
  };

  function toDateInputFormat(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmitModal = async() => {
    if (type==="confirm"){
        const cityInfo = splitTwoPartString(selectedCity);
        const careerInfo = splitTwoPartString(selectedCareer);
        const updatedResume = await updateResume(data?.resumeID, desired_position, desired_job_level, experience, academic_level, type_of_workplace, job_type, salary_min, salary_max, cityInfo?.first, careerInfo?.first, career_goal);
        if (updatedResume) {
          onSubmitModal(createResumeObject());
          setModal(false);
          alert('Cập nhật thông tin hồ sơ thành công!');
        }
    } else if (type==="add"){
        const cityInfo = splitTwoPartString(selectedCity);
        const careerInfo = splitTwoPartString(selectedCareer);
        const newResume = await addResume(email, false, desired_position, desired_job_level, experience, academic_level, type_of_workplace, job_type, salary_min, salary_max, cityInfo?.first, careerInfo?.first, career_goal);
        if (newResume) {
          const uploadedFile = await uploadAttachedFile(file, newResume?._id);
          if (uploadedFile) {
            onSubmitModal(uploadedFile);
            setModal(false);
            alert('Thêm hồ sơ thành công!');
          }
        }
    }
  }

  return (
    <>
      {
        (type==="confirm") ? (
          <button className={cx('update-button-wrapper')} onClick={toggleModal}>
            <FontAwesomeIcon icon={faPen} className={cx('update-icon')}></FontAwesomeIcon>
          </button>
        ) : (
          <button className={cx('like-button')} onClick={toggleModal}>
              <FontAwesomeIcon className={cx('like-icon')} icon={faPen}></FontAwesomeIcon>
              Thêm hồ sơ
          </button>
        )
      }
      

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
                {
                  (type==="add") && (
                    <div className={cx('career-field-container')}>
                      <div className={cx('field-container-three')}>
                          <div className={cx('field-name')}>
                              <span>Tệp đính kèm</span>
                          </div>
                          <div className = {cx('field-input-container')}>
                            <input
                              type="file"
                              className={cx("field-input")}
                              accept=".pdf"
                              onChange={handleFileChange}
                            ></input>
                          </div>
                      </div>
                  </div>
                  )
                }
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container-two')}>
                        <div className={cx('field-name')}>
                            <span>Mục tiêu nghề nghiệp</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <textarea className={cx('field-text-area')} placeholder='Nhập vị trí mong muốn' value={career_goal} onChange={(e)=>{setCareerGoal(e.target.value)}}></textarea>
                        </div>
                    </div>
                </div>
                <div className={cx('eight-field-container')}>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Vị trí mong muốn</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập vị trí mong muốn' value={desired_position} onChange={(e)=>{setDesiredPosition(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Cấp bậc mong muốn</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('fiselect')} type='text' placeholder='Nhập cấp bậc mong muốn' value={desired_job_level} onChange={(e)=>{setDesiredJobLevel(e.target.value)}}>
                            <option key='34' value=''>
                              --Chọn cấp bậc mong muốn--
                            </option>
                            <option key='0' value='Sinh viên/Thực tập sinh'>
                              Sinh viên/Thực tập sinh
                            </option>
                            <option key='1' value='Mới tốt nghiệp'>
                              Mới tốt nghiệp
                            </option>
                            <option key='2' value='Nhân viên'>
                              Nhân viên
                            </option>
                            <option key='3' value='Trưởng nhóm/Giám sát'>
                              Trưởng nhóm/Giám sát
                            </option>
                            <option key='4' value='Quản lý'>
                              Quản lý
                            </option>
                            <option key='5' value='Phó giám đốc'>
                              Phó giám đốc
                            </option>
                            <option key='6' value='Giám đốc'>
                              Giám đốc
                            </option>
                            <option key='7' value='Tổng giám đốc'>
                              Tổng giám đốc
                            </option>
                            <option key='8' value='Chủ tịch'>
                              Chủ tịch
                            </option>
                            <option key='9' value='Phó chủ tịch'>
                              Phó chủ tịch
                            </option>
                          </select>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Trình độ học vấn</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} type='text' placeholder='Nhập giới tính' value={academic_level}  onChange={(e)=>{setAcademicLevel(e.target.value)}}>
                            <option key='36' value=''>
                              --Chọn trình độ học vấn--
                            </option>
                            <option key='13' value='Trên đại học'>
                              Trên đại học
                            </option>
                            <option key='14' value='Đại học'>
                              Đại học
                            </option>
                            <option key='15' value='Cao đẳng'>
                              Cao đẳng
                            </option>
                            <option key='16' value='Trung cấp'>
                              Trung cấp
                            </option>
                            <option key='17' value='Trung học'>
                              Trung học
                            </option>
                            <option key='18' value='Chứng chỉ nghề'>
                              Chứng chỉ nghề
                            </option>
                          </select>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Kinh nghiệm</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                        <select 
                            type="text" 
                            className={cx('field-input')} 
                            value={experience}
                            onChange={(e)=>{setExperience(e.target.value)}}
                        >
                          <option key='37' value=''>
                              --Chọn kinh nghiệm--
                            </option>
                            <option key='19' value='Chưa có kinh nghiệm'>
                              Chưa có kinh nghiệm
                            </option>
                            <option key='20' value='Dưới 1 năm kinh nghiệm'>
                              Dưới 1 năm kinh nghiệm
                            </option>
                            <option key='21' value='1 năm kinh nghiệm'>
                              1 năm kinh nghiệm
                            </option>
                            <option key='22' value='2 năm kinh nghiệm'>
                              2 năm kinh nghiệm
                            </option>
                            <option key='23' value='3 năm kinh nghiệm'>
                              3 năm kinh nghiệm
                            </option>
                            <option key='24' value='4 năm kinh nghiệm'>
                              4 năm kinh nghiệm
                            </option>
                            <option key='25' value='5 năm kinh nghiệm'>
                              5 năm kinh nghiệm
                            </option>
                            <option key='26' value='Trên 5 năm kinh nghiệm'>
                              Trên 5 năm kinh nghiệm
                            </option>
                        </select>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Mức lương tối thiểu</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                        <input 
                            type="number" 
                            className={cx('field-input')} 
                            value={salary_min}
                            onChange={(e)=>{setSalaryMin(e.target.value)}}
                        />
                        </div>
                    </div>
                  </div>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Địa điểm làm việc</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} name="city" value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)}>
                              <option key={'1'} value={''}>
                              </option>
                              {(cityHook || []).map((city) => (
                                  <option key={city?._id} value={city?._id + ' ' + city?.name}>
                                      {city?.name}
                                  </option>
                              ))}
                          </select>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Nghề nghiệp</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} name="career" value={selectedCareer} onChange={(e)=>setSelectedCareer(e.target.value)}>
                            <option key={'1'} value={''}>
                            </option>
                            {(careerHook || []).map((career) => (
                                <option key={career?._id} value={career?._id + ' ' + career?.career_name}>
                                    {career?.career_name}
                                </option>
                            ))}
                          </select>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Nơi làm việc</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} type='text' placeholder='Nhập nơi làm việc' value={type_of_workplace} onChange={(e)=>{setWorkPlace(e.target.value)}}>
                            <option key='35' value=''>
                              --Chọn nơi làm việc--
                            </option>
                            <option key='10' value='Làm việc tại văn phòng'>
                              Làm việc tại văn phòng
                            </option>
                            <option key='11' value='Làm việc kết hợp'>
                              Làm việc kết hợp
                            </option>
                            <option key='12' value='Làm việc tại nhà'>
                              Làm việc tại nhà
                            </option>
                          </select>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Hình thức làm việc</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} type='text' placeholder='Nhập hình thức làm việc' value={job_type} onChange={(e)=>{setJobType(e.target.value)}}>
                            <option key='38' value=''>
                              --Chọn hình thức làm việc--
                            </option>
                            <option key='27' value='Nhân viên chính thức'>
                              Nhân viên chính thức
                            </option>
                            <option key='28' value='Bán thời gian'>
                              Bán thời gian
                            </option>
                            <option key='29' value='Thời vụ - Nghề tự do'>
                              Thời vụ - Nghề tự do
                            </option>
                            <option key='30' value='Thực tập'>
                              Thực tập
                            </option>
                          </select>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Mức lương tối đa</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                        <input 
                            type="number" 
                            className={cx('field-input')} 
                            value={salary_max}
                            onChange={(e)=>{setSalaryMax(e.target.value)}}
                        />
                        </div>
                    </div>
                  </div>
                </div>
                <Button primary onClick={handleSubmitModal}>
                  Xác nhận
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
