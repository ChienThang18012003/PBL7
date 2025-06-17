import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './JobPostModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import useLocate from "../../hook/useLocate";
import useDistrict from "../../hook/useDistrict";
import useCity from "../../hook/useCity";
import ReactQuill from "react-quill";
import useCareer from "../../hook/useCareer";
import useJobPost from "../../hook/useJobPost";
import useCompany from "../../hook/useCompany";

const cx = classNames.bind(styles);

export default function JobPostModal({children , data, onSubmitModal, type, userInfo, status = 'none'}) {
  const [modal, setModal] = useState(false);

  const [companyID, setCompanyID] = useState('');
  const [job_name, setJobName] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [position, setPosition] = useState('');
  const [type_of_workplace, setTypeOfWorkplace] = useState('');
  const [quantity, setQuantity] = useState('');
  const [salary_min, setSalaryMin] = useState('');
  const [salary_max, setSalaryMax] = useState('');
  const [academic_level, setAcademicLevel] = useState('');
  const [experience, setExperience] = useState('');
  const [job_type, setJobType] = useState('');
  const [gender_required, setGenderRequired] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [job_description, setJobDescription] = useState('');
  const [job_requirement, setJobRequirement] = useState('');
  const [benefit_enjoyed, setBenefitEnjoyed] = useState('');
  const [contact_person_name, setContactPersonName] = useState('');
  const [contact_person_phone, setContactPersonPhone] = useState('');
  const [contact_person_email, setContactPersonEmail] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLAT] = useState('');
  const [lng, setLNG] = useState('');
  const [displayedDistricts, setDisplayedDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [is_urgent, setIsUrgent] = useState(false);
  const [locationLoading, locationHook, getAllLocations, addLocation, changeLocation] = useLocate();
  const [districtLoading, districtHook, getAllDistricts, getAllDistrictsByCity] = useDistrict();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [cityLoading, cityHook] = useCity();
  const [careerLoading, careerHook, getAllCareers] = useCareer();
  const [
        jobPostHook,
        jobPostLoading,
        getAllJobPosts,
        filterJobPostList,
        searchJobPost,
        getJobPost,
        updateJobPostView,
        getJobPostByEmail,
        addJobPost,
        updateJobPost,
        deleteJobPost
    ] = useJobPost();
  const [
        companyHook,
        loading,
        getAllCompanies,
        addCompany,
        filterCompanyList,
        searchCompany,
        getCompany,
        getCompanyIDByEmail
    ] = useCompany();

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    const fetchEmail = async() => {
      let item = localStorage.getItem('isLoginSuccess');
      if (item) {
          let obj = JSON.parse(item);
          if (obj?.email) {
            setEmail(obj?.email);
            const company = await getCompanyIDByEmail(obj?.email);
            setCompanyID(company?.company_id);
          }
      }
    }
    fetchEmail();
  },[]);

  useEffect(()=>{
    if (data && Object.keys(data).length > 0) {
      setJobName(data?.job_name);
      setSelectedCareer(data?.career_id?._id + ' ' + data?.career_id?.career_name);
      setPosition(data?.position);
      setTypeOfWorkplace(data?.type_of_workplace);
      setQuantity(data?.quantity);
      setSalaryMin(data?.salary_min);
      setAcademicLevel(data?.academic_level);
      setExperience(data?.experience);
      setJobType(data?.job_type);
      setGenderRequired(data?.gender_required);
      setSalaryMax(data?.salary_max);
      setDeadline(formatToDateInputValue(data?.deadline));
      setJobDescription(data?.job_description);
      setJobRequirement(data?.job_requirement);
      setBenefitEnjoyed(data?.benefit_enjoyed);
      setSelectedCity(data?.location_id?.city_id?._id + ' ' + data?.location_id?.city_id?.name);
      setSelectedDistrict(data?.location_id?.district_id?._id + ' ' + data?.location_id?.district_id?.name);
      setAddress(data?.location_id?.address);
      setLAT(data?.location_id?.lat);
      setLNG(data?.location_id?.lng);
      setContactPersonEmail(data?.contact_person_email);
      setContactPersonName(data?.contact_person_name);
      setContactPersonPhone(data?.contact_person_phone);
      setIsUrgent(data?.is_urgent);
      setSelectedStatus(data?.status);
    }
  },[data]);

  function formatToDateInputValue(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(()=>{
    const fetchDistrict = async() => {
        if (selectedCity !== "") {
            const city_name = splitTwoPartString(selectedCity);
            const allDistricts = await getAllDistrictsByCity(city_name?.second);
            if (allDistricts && Array.isArray(allDistricts)) setDisplayedDistricts(allDistricts);
        } 
    }
    fetchDistrict();
  },[selectedCity])

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const splitTwoPartString = (str) => {
      const index = str.indexOf(' ');
      if (index === -1) {
          return { first: str, second: '' };
      }
      const first = str.slice(0, index).trim();
      const second = str.slice(index + 1).trim();
      return { first, second };
  };


  const handleSubmitModal = async() => {
    if (type === "add") {
      if (!job_name) {
        alert("Bạn chưa nhập tên công việc");
        return;
      } else if (!selectedCareer) {
        alert("Bạn chưa chọn ngành nghề");
        return;
      } else if (!position) {
        alert("Bạn chưa chọn vị trí/chức vụ");
        return;
      } else if (!type_of_workplace) {
        alert("Bạn chưa chọn nơi làm việc");
        return;
      } else if (!quantity) {
        alert("Bạn chưa nhập số lượng tuyển");
        return;
      } else if (!salary_min) {
        alert("Bạn chưa nhập mức lương tối thiểu");
        return;
      } else if (!salary_max) {
        alert("Bạn chưa nhập mức lương tối đa");
        return;
      } else if (!academic_level) {
        alert("Bạn chưa chọn bằng cấp");
        return;
      } else if (!experience) {
        alert("Bạn chưa chọn kinh nghiệm");
        return;
      } else if (!job_type) {
        alert("Bạn chưa chọn hình thức làm việc");
        return;
      } else if (!gender_required) {
        alert("Bạn chưa chọn yêu cầu giới tính");
        return;
      } else if (!deadline) {
        alert("Bạn chưa chọn hạn nộp hồ sơ");
        return;
      } else if (!job_description) {
        alert("Bạn chưa nhập mô tả công việc");
        return;
      } else if (!job_requirement) {
        alert("Bạn chưa nhập yêu cầu công việc");
        return;
      } else if (!benefit_enjoyed) {
        alert("Bạn chưa nhập lợi ích");
        return;
      } else if (!selectedCity) {
        alert("Bạn chưa chọn tỉnh/thành phố");
        return;
      } else if (!selectedDistrict) {
        alert("Bạn chưa chọn quận/huyện");
        return;
      } else if (!address) {
        alert("Bạn chưa nhập địa chỉ");
        return;
      } else if (!contact_person_name) {
        alert("Bạn chưa nhập tên người liên hệ");
        return;
      } else if (!contact_person_phone) {
        alert("Bạn chưa nhập số điện thoại người liên hệ");
        return;
      } else if (!contact_person_email) {
        alert("Bạn chưa nhập email người liên hệ");
        return;
      } else {
        const cityInfo = splitTwoPartString(selectedCity);
        const districtInfo = splitTwoPartString(selectedDistrict);
        const LocationInfo = await addLocation(cityInfo?.second, districtInfo?.first, address, false, lat, lng);
        if (LocationInfo && typeof LocationInfo === 'object') {
          const careerInfo = splitTwoPartString(selectedCareer);
          const newJob = await addJobPost(email, careerInfo?.first, companyID, LocationInfo?._id, job_name, deadline, quantity, position, type_of_workplace, experience, academic_level, job_type, salary_min, salary_max, job_description, job_requirement, benefit_enjoyed, gender_required, contact_person_name, contact_person_phone, contact_person_email, is_urgent);
          setJobName('');
          setSelectedCareer('');
          setPosition('');
          setTypeOfWorkplace('');
          setQuantity('');
          setSalaryMin('');
          setAcademicLevel('');
          setExperience('');
          setJobType('');
          setGenderRequired('');
          setSalaryMax('');
          setDeadline(null);
          setJobDescription('');
          setJobRequirement('');
          setBenefitEnjoyed('');
          setSelectedCity('');
          setSelectedDistrict('');
          setAddress('');
          setLAT('');
          setLNG('');
          setContactPersonEmail('');
          setContactPersonName('');
          setContactPersonPhone('');
          setIsUrgent(false);
          onSubmitModal(newJob);
          setModal(false);
          alert('Thêm tin đăng thành công!');
        }
      }
    } else if (type === "update") {
      if (!job_name) {
        alert("Bạn chưa nhập tên công việc");
        return;
      } else if (!selectedCareer) {
        alert("Bạn chưa chọn ngành nghề");
        return;
      } else if (!position) {
        alert("Bạn chưa chọn vị trí/chức vụ");
        return;
      } else if (!type_of_workplace) {
        alert("Bạn chưa chọn nơi làm việc");
        return;
      } else if (!quantity) {
        alert("Bạn chưa nhập số lượng tuyển");
        return;
      } else if (!salary_min) {
        alert("Bạn chưa nhập mức lương tối thiểu");
        return;
      } else if (!salary_max) {
        alert("Bạn chưa nhập mức lương tối đa");
        return;
      } else if (!academic_level) {
        alert("Bạn chưa chọn bằng cấp");
        return;
      } else if (!experience) {
        alert("Bạn chưa chọn kinh nghiệm");
        return;
      } else if (!job_type) {
        alert("Bạn chưa chọn hình thức làm việc");
        return;
      } else if (!gender_required) {
        alert("Bạn chưa chọn yêu cầu giới tính");
        return;
      } else if (!deadline) {
        alert("Bạn chưa chọn hạn nộp hồ sơ");
        return;
      } else if (!job_description) {
        alert("Bạn chưa nhập mô tả công việc");
        return;
      } else if (!job_requirement) {
        alert("Bạn chưa nhập yêu cầu công việc");
        return;
      } else if (!benefit_enjoyed) {
        alert("Bạn chưa nhập lợi ích");
        return;
      } else if (!selectedCity) {
        alert("Bạn chưa chọn tỉnh/thành phố");
        return;
      } else if (!selectedDistrict) {
        alert("Bạn chưa chọn quận/huyện");
        return;
      } else if (!address) {
        alert("Bạn chưa nhập địa chỉ");
        return;
      } else if (!lat) {
        alert("Bạn chưa nhập vĩ độ");
        return;
      } else if (!lng) {
        alert("Bạn chưa nhập kinh độ");
        return;
      } else if (!contact_person_name) {
        alert("Bạn chưa nhập tên người liên hệ");
        return;
      } else if (!contact_person_phone) {
        alert("Bạn chưa nhập số điện thoại người liên hệ");
        return;
      } else if (!contact_person_email) {
        alert("Bạn chưa nhập email người liên hệ");
        return;
      } else {
        let LocationInfo = {}
        const cityInfo = splitTwoPartString(selectedCity);
        const districtInfo = splitTwoPartString(selectedDistrict);
        if (data?.location_id) {
          LocationInfo = await changeLocation(data?.location_id?._id, cityInfo?.second, districtInfo?.first, address, lat, lng);
        } else {
          LocationInfo = await addLocation(cityInfo?.second, districtInfo?.first, address, false, lat, lng);
        }

        if (LocationInfo && typeof LocationInfo === 'object') {
          const careerInfo = splitTwoPartString(selectedCareer);
          const newJob = await updateJobPost(data?._id, careerInfo?.first, companyID, LocationInfo?._id, job_name, deadline, quantity, position, type_of_workplace, experience, academic_level, job_type, salary_min, salary_max, job_description, job_requirement, benefit_enjoyed, gender_required, contact_person_name, contact_person_phone, contact_person_email, is_urgent, selectedStatus);
          console.log(is_urgent);
          setJobName('');
          setSelectedCareer('');
          setPosition('');
          setTypeOfWorkplace('');
          setQuantity('');
          setSalaryMin('');
          setAcademicLevel('');
          setExperience('');
          setJobType('');
          setGenderRequired('');
          setSalaryMax('');
          setDeadline(null);
          setJobDescription('');
          setJobRequirement('');
          setBenefitEnjoyed('');
          setSelectedCity('');
          setSelectedDistrict('');
          setAddress('');
          setLAT('');
          setLNG('');
          setContactPersonEmail('');
          setContactPersonName('');
          setContactPersonPhone('');
          setIsUrgent(false);
          setSelectedStatus('');
          onSubmitModal(newJob);
          setModal(false);
          alert('Cập nhật tin đăng thành công!');
        }
      }
    }
  }

  return (
    <>
      {
        (type==='add') ? (
          <div className={cx('add-button')} onClick={toggleModal}>
              <FontAwesomeIcon className={cx('search-icon')} icon={faPlus}></FontAwesomeIcon>
              <div className={cx('search-text')}>
                  <span>
                      Tạo tin mới
                  </span>
              </div>
          </div>
        ) : (
          <button className={cx('update-button')} onClick={toggleModal}>
              <FontAwesomeIcon className={cx('action-button-icon')} icon={faPen}></FontAwesomeIcon>
          </button>
        )
      }

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Tên công việc</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tên công việc' value={job_name} onChange={(e)=>{setJobName(e.target.value)}}></input>
                        </div>
                    </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Ngành nghề</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} type='text' placeholder='Nhập họ và tên' value={selectedCareer} onChange={(e)=>{setSelectedCareer(e.target.value)}} >
                            <option key='40' value=''>
                              --Chọn ngành nghề--
                            </option>
                            {(careerHook || []).map((career) => (
                                <option key={career?._id} value={career?._id + ' ' + career?.career_name}>
                                    {career?.career_name}
                                </option>
                            ))}
                          </select>
                        </div>
                    </div>
                </div>
                <div className={cx('eight-field-container')}>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Vị trí/chức vụ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} type='text' placeholder='Chọn vị trí/chức vụ' value={position} onChange={(e)=>{setPosition(e.target.value)}}>
                            <option key='34' value=''>
                              --Chọn vị trí/chức vụ--
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
                            <span>Nơi làm việc</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} type='text' placeholder='Chọn nơi làm việc' value={type_of_workplace} onChange={(e)=>{setTypeOfWorkplace(e.target.value)}}>
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
                            <span>Số lượng tuyển</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='number' placeholder='Nhập số lượng tuyển' value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}></input>
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
                            placeholder='Nhập mức lương tối thiểu'
                        />
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Bằng cấp</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} type='text' placeholder='Chọn bằng cấp' value={academic_level} onChange={(e)=>{setAcademicLevel(e.target.value)}}>
                            <option key='36' value=''>
                              --Chọn bằng cấp--
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
                  </div>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Kinh nghiệm</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} value={experience} onChange={(e)=>setExperience(e.target.value)}>
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
                            <span>Hình thức làm việc</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} value={job_type} onChange={(e)=>setJobType(e.target.value)}>
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
                            <span>Yêu cầu giới tính</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} placeholder='Chọn giới tính' value={gender_required} onChange={(e)=>{setGenderRequired(e.target.value)}}>
                            <option key='39' value=''>
                              --Chọn giới tính--
                            </option>
                            <option key='31' value='Nam'>
                              Nam
                            </option>
                            <option key='32' value='Nữ'>
                              Nữ
                            </option>
                            <option key='33' value='Khác'>
                              Khác
                            </option>
                          </select>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Mức lương tối đa</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='number' placeholder='Nhập mức lương tối đa' value={salary_max} onChange={(e)=>{setSalaryMax(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Hạn nộp hồ sơ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='date' placeholder='Chọn hạn nộp' value={deadline || ''} onChange={(e)=>{setDeadline(e.target.value)}}></input>
                        </div>
                    </div>
                  </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container-two')}>
                        <div className={cx('field-name')}>
                            <span>Mô tả công việc</span>
                        </div>
                        <div className = {cx('field-input-container-two')}>
                          <ReactQuill
                            theme="snow"
                            value={job_description}
                            onChange={setJobDescription}
                            style={{ height: '200px', width: '100%', marginBottom: '50px', marginTop: '10px', border: '2px soild #a8aaac', borderRadius: '5px' }}
                          >
                          </ReactQuill>
                        </div>
                    </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container-two')}>
                        <div className={cx('field-name')}>
                            <span>Yêu cầu công việc</span>
                        </div>
                        <div className = {cx('field-input-container-two')}>
                          <ReactQuill
                            theme="snow"
                            value={job_requirement}
                            onChange={setJobRequirement}
                            style={{ height: '200px', width: '100%', marginBottom: '50px', marginTop: '10px', border: '2px soild #a8aaac', borderRadius: '5px' }}
                          >
                          </ReactQuill>
                        </div>
                    </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container-two')}>
                        <div className={cx('field-name')}>
                            <span>Lợi ích</span>
                        </div>
                        <div className = {cx('field-input-container-two')}>
                          <ReactQuill
                            theme="snow"
                            value={benefit_enjoyed}
                            onChange={setBenefitEnjoyed}
                            style={{ height: '200px', width: '100%', marginBottom: '50px', marginTop: '10px', border: '2px soild #a8aaac', borderRadius: '5px' }}
                          >
                          </ReactQuill>
                        </div>
                    </div>
                </div>
                <div className={cx('eight-field-container')}>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Tỉnh/Thành phố</span>
                        </div>
                        <select className={cx('field-input')} name="city" value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)}>
                              <option key='41' value=''>
                                --Chọn thành phố--
                              </option>
                              {(cityHook || []).map((city) => (
                                  <option key={city?._id} value={city?._id + ' ' + city?.name}>
                                      {city?.name}
                                  </option>
                              ))}
                          </select>
                    </div>
                  </div>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Quận/huyện</span>
                        </div>
                        <select className={cx('field-input')} name="district" value={selectedDistrict} onChange={(e)=>setSelectedDistrict(e.target.value)}>
                            <option key='1' value=''>
                              --Chọn quận/huyện--
                            </option>
                            {(displayedDistricts || []).map((district) => (
                                <option key={district?._id} value={district?._id + ' ' + district?.name}>
                                    {district?.name}
                                </option>
                            ))}
                          </select>
                    </div>
                  </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Địa chỉ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập địa chỉ' value={address} onChange={(e)=>{setAddress(e.target.value)}}></input>
                        </div>
                    </div>
                </div>
                <div className={cx('eight-field-container')}>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Vĩ độ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập vĩ độ' value={lat} onChange={(e)=>{setLAT(e.target.value)}}></input>
                        </div>
                    </div>
                  </div>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Kinh độ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập kinh độ' value={lng} onChange={(e)=>{setLNG(e.target.value)}}></input>
                        </div>
                    </div>
                  </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Tên người liên hệ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tên người liên hệ' value={contact_person_name} onChange={(e)=>{setContactPersonName(e.target.value)}}></input>
                        </div>
                    </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Số điện thoại người liên hệ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập số điện thoại người liên hệ' value={contact_person_phone} onChange={(e)=>{setContactPersonPhone(e.target.value)}}></input>
                        </div>
                    </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Email người liên hệ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập email người liên hệ' value={contact_person_email} onChange={(e)=>{setContactPersonEmail(e.target.value)}}></input>
                        </div>
                    </div>
                </div>
                {
                  status === 'admin' && (
                    <div className={cx('career-field-container')}>
                        <div className={cx('field-container')}>
                            <div className={cx('field-name')}>
                                <span>Trạng thái duyệt</span>
                            </div>
                            <div className = {cx('field-input-container')}>
                              <select className={cx('field-input')} value={selectedStatus} onChange={(e)=>{setSelectedStatus(e.target.value)}}>
                                <option key='1' value='Chờ duyệt'>
                                    Chờ duyệt
                                </option>
                                <option key='2' value='Không duyệt'>
                                    Không duyệt
                                </option>
                                <option key='2' value='Đã duyệt'>
                                    Đã duyệt
                                </option>
                            </select>
                            </div>
                        </div>
                    </div>
                  )
                }
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container-three')}>
                        <input type="checkbox" checked={is_urgent} onChange={(e)=>setIsUrgent(e.target.checked)} className={cx('check-box')}></input>
                        <div className={cx('field-name')}>
                            <span>Tuyển gấp</span>
                        </div>
                    </div>
                </div>
            </div>
            <Button primary onClick={handleSubmitModal}>
              Xác nhận
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
