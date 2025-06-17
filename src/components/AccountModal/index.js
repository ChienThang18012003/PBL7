import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './AccountModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import bcrypt from "bcryptjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import useLocate from "../../hook/useLocate";
import useDistrict from "../../hook/useDistrict";
import useCity from "../../hook/useCity";

const cx = classNames.bind(styles);

export default function AccountModal({children , data, onSubmitModal, type="confirm", userInfo}) {
  const [modal, setModal] = useState(false);
  const [, , , , , , , , , changePassword] = useAccount();

  const [birthday, setBirthday] = useState(data?.date_of_birth || null);
  const [phone, setPhoneNum] = useState(data?.phone || '');
  const [username, setUserName] = useState(data?.username || '');
  const [gender, setGender] = useState(data?.gender || '');
  const [martial_status, setMartialStatus] = useState(data?.martial_status || '');
  const [address, setAddress] = useState(data?.address || '');
  const [city, setCity] = useState(data?.city || '');
  const [district, setDistrict] = useState(data?.district || '');
  const [city_id, setCityID] = useState(data?.city_id || '');
  const [district_id, setDistrictID] = useState(data?.district_id || '');
  const [orgAddress, setOrgAddress] = useState('');
  const [cityLoading, cityHook] = useCity();
  const [districtLoading, districtHook, getAllDistricts, getAllDistrictsByCity] = useDistrict();
  const [displayedDistricts, setDisplayedDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    changeAccountInfo,
    getAccountByEmail
    ] = useAccount();
  const [locationLoading, locationHook, getAllLocations, addLocation, changeLocation] = useLocate();

  const toggleModal = () => {
    setModal(!modal);
  };

  const createUserObject = () => {
        const cityInfo = splitTwoPartString(selectedCity);
        const districtInfo = splitTwoPartString(selectedDistrict);
        let isLocationChange = false;
        if (city_id !== cityInfo?.first) isLocationChange = true;
        if (district_id !== districtInfo?.first) isLocationChange = true;
        if (orgAddress !== address) isLocationChange = true;
        return {
            username,
            phone,
            gender,
            date_of_birth: birthday,
            martial_status,
            address,
            city_id: cityInfo?.first,
            district_id: districtInfo?.first,
            city: cityInfo?.second,
            district: districtInfo?.second,
            isLocationChange
        };
    };

  function formatToDateInputValue(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(()=>{
    setBirthday(formatToDateInputValue(data?.date_of_birth));
    setPhoneNum(data?.phone);
    setUserName(data?.username);
    setGender(data?.gender);
    setMartialStatus(data?.martial_status);
    setAddress(data?.address);
    setOrgAddress(data?.address);
    setCity(data?.city || '');
    setDistrict(data?.district || '');
    setCityID(data?.city_id || '');
    setDistrictID(data?.district_id || '');
    if (data?.city && data?.city_id) setSelectedCity(data?.city_id + ' ' + data?.city);
    if (data?.district && data?.district_id) setSelectedDistrict(data?.district_id + ' ' + data?.district);
  },[data]);

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
          return { first: str, second: '' }; // hoặc null tùy yêu cầu
      }
      const first = str.slice(0, index).trim();
      const second = str.slice(index + 1).trim();
      return { first, second };
  };


  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value); // yyyy-MM-dd
  };

  const handleSubmitModal = async() => {
    if (type === 'confirm') {
      onSubmitModal(createUserObject());
      setModal(false);
    }
    else if (type === "update") {
      let locationInfo = {};
      const cityInfo = splitTwoPartString(selectedCity);
      const districtInfo = splitTwoPartString(selectedDistrict);
      if (userInfo?.location_id) {
          locationInfo = await changeLocation(userInfo?.location_id?._id, cityInfo?.second, districtInfo?.first, address);
      }
      else {
          if (city && district) {
              locationInfo = await addLocation(cityInfo?.second, districtInfo?.first, address)
          }
      }
      if (locationInfo?._id){
          const AccountInfo = await changeAccountInfo(
          userInfo?._id, 
          username, 
          phone, 
          martial_status, 
          birthday, 
          gender,
          locationInfo?._id,
          null
          );
      }
      else {
          const AccountInfo = await changeAccountInfo(
          userInfo?._id, 
          username, 
          phone, 
          martial_status, 
          birthday, 
          gender,
          null,
          null
          );
      }
      onSubmitModal(createUserObject());
      setModal(false);
    }
  }

  return (
    <>
      <button className={cx('update-button-wrapper')} onClick={toggleModal}>
        <FontAwesomeIcon icon={faPen} className={cx('update-icon')}></FontAwesomeIcon>
      </button>

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
                <div className={cx('eight-field-container')}>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Họ và tên</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập họ và tên' value={username} onChange={(e)=>{setUserName(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Số điện thoại</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập số điện thoại' value={phone} onChange={(e)=>{setPhoneNum(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Giới tính</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập giới tính' value={gender} onChange={(e)=>{setGender(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Ngày sinh</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                        <input 
                            type="date" 
                            className={cx('field-input')} 
                            value={birthday || ''} 
                            onChange={handleBirthdayChange}
                        />
                        </div>
                    </div>
                  </div>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Tỉnh/Thành phố</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} name="city" value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)}>
                              <option key={'1'} value={''}>
                                --Chọn tỉnh/thành phố
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
                            <span>Quận/Huyện</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} name="district" value={selectedDistrict} onChange={(e)=>setSelectedDistrict(e.target.value)}>
                            <option key={'1'} value={''}>
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
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Địa chỉ</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập địa chỉ' value={address} onChange={(e)=>{setAddress(e.target.value)}}></input>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Tình trạng hôn nhân</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tình trạng hôn nhân' value={martial_status} onChange={(e)=>{setMartialStatus(e.target.value)}}></input>
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
