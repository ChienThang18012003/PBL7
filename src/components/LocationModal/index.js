import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './LocationModal.module.scss';
import Button from "../Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus} from '@fortawesome/free-solid-svg-icons';
import useLocate from "../../hook/useLocate";
import useDistrict from "../../hook/useDistrict";
import useCity from "../../hook/useCity";

const cx = classNames.bind(styles);

export default function LocationModal({children , data, onSubmitModal, type, userInfo}) {
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState('');
  const [lat, setLAT] = useState('');
  const [lng, setLNG] = useState('');
  const [cityLoading, cityHook , addCity, updateCity, deleteCity] = useCity();
  const [city_name, setCityName] = useState('');
  const [district_name, setDistrictName] = useState('');
  const [districtLoading, districtHook, getAllDistricts, getAllDistrictsByCity, addDistrict, updateDistrict, deleteDistrict] = useDistrict();
  const [displayedDistrict, setDisplayedDistrict] = useState([]);
  const [locationLoading, locationHook, getAllLocations, addLocation, changeLocation, deleteLocation] = useLocate();

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if (type === "update") {
      setAddress(data?.address);
      setCityName(data?.city_id?.name);
      setDistrictName(data?.district_id);
      setLAT(data?.lat);
      setLNG(data?.lng);

    } 
  },[data]);

  useEffect(()=>{
      if (city_name) {
          const district = (districtHook || []).filter(post=>post?.city_id?.name === city_name);
          setDisplayedDistrict(district);
      }
  },[city_name])

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleSubmitModal = async() => {
    if (type==='add') {
      if (!city_name) {
        alert('Bạn chưa chọn tỉnh/thành phố!');
        return;
      } else if (!district_name) {
        alert('Bạn chưa chọn tên quận/huyện!');
        return;
      } else if (!address) {
        alert('Bạn chưa nhập địa chỉ!');
        return;
      } else {
        const newCity = await addLocation(city_name, district_name, address, false, lat, lng);
        if (newCity && typeof newCity === 'object') {
          setAddress('');
          setCityName('');
          setDistrictName('');
          setLAT('');
          setLNG('');
          onSubmitModal(newCity);
          alert('Thêm địa chỉ thành công!')
        }
      }
    }
    else if (type==='update') {
      if (!city_name) {
        alert('Bạn chưa chọn tỉnh/thành phố!');
        return;
      } else if (!district_name) {
        alert('Bạn chưa chọn tên quận/huyện!');
        return;
      } else if (!address) {
        alert('Bạn chưa nhập địa chỉ!');
        return;
      } else {
        const newCity = await changeLocation(data?._id, city_name, district_name, address, lat, lng);
        if (newCity && typeof newCity === 'object') {
          onSubmitModal(newCity);
          alert('Cập nhật địa chỉ thành công!')
        }
      }
    }
    setModal(false);
  }

  return (
    <>
      {
        (type === "add") ? (
          <div className={cx('add-button')} onClick={toggleModal}>
              <FontAwesomeIcon className={cx('search-icon')} icon={faPlus} ></FontAwesomeIcon>
              <div className={cx('search-text')}>
                  <span>
                      Thêm địa chỉ
                  </span>
              </div>
          </div>
        ) : (
          <button className={cx('update-button-wrapper-two')} onClick={toggleModal}>
            <FontAwesomeIcon icon={faPen} className={cx('update-icon-two')}></FontAwesomeIcon>
          </button>
        )
      }

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
                <div className={cx('eight-field-container')}>
                  <div className={cx('four-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Tên tỉnh/thành phố</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} type='text' value={city_name} onChange={(e)=>{setCityName(e.target.value)}}>
                             <option key='0' value=''>
                                --Chọn tỉnh/thành phố--
                             </option>
                             {
                               (cityHook || []).map((city,index) => (
                                  <option key={index} value={city?.name}>
                                     {
                                      city?.name
                                     }
                                  </option>
                               ))
                             }
                          </select>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Tên quận/huyện</span>
                        </div>
                        <select className={cx('field-input')} type='text' value={district_name} onChange={(e)=>{setDistrictName(e.target.value)}}>
                             <option key='0' value=''>
                                --Chọn quận/huyện--
                             </option>
                             {
                               (displayedDistrict || []).map((district,index) => (
                                  <option key={index} value={district?._id}>
                                     {
                                      district?.name
                                     }
                                  </option>
                               ))
                             }
                        </select>
                    </div>
                    <div className={cx('field-container-five')}>
                        <div className={cx('field-name')}>
                            <span>Địa chỉ</span>
                        </div>
                        <input className={cx('field-input')} type='text' value={address} onChange={(e)=>{setAddress(e.target.value)}}>
                        </input>
                    </div>
                    <div className={cx('field-container-five')}>
                        <div className={cx('field-name')}>
                            <span>Vĩ độ</span>
                        </div>
                        <input className={cx('field-input')} type='number' value={lat} onChange={(e)=>{setLAT(e.target.value)}}>
                        </input>
                    </div>
                    <div className={cx('field-container-five')}>
                        <div className={cx('field-name')}>
                            <span>Kinh độ</span>
                        </div>
                        <input className={cx('field-input')} type='number' value={lng} onChange={(e)=>{setLNG(e.target.value)}}>
                        </input>
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
