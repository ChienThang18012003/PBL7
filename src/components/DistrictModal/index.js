import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './DistrictModal.module.scss';
import Button from "../Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus} from '@fortawesome/free-solid-svg-icons';
import useDistrict from "../../hook/useDistrict";
import useCity from "../../hook/useCity";

const cx = classNames.bind(styles);

export default function DistrictModal({children , data, onSubmitModal, type, userInfo}) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [cityLoading, cityHook , addCity, updateCity, deleteCity] = useCity();
  const [originalName, setOriginalName] = useState('');
  const [city_name, setCityName] = useState('');
  const [originalCityName, setOriginalCityName] = useState('');
  const [districtLoading, districtHook, getAllDistricts, getAllDistrictsByCity, addDistrict, updateDistrict, deleteDistrict] = useDistrict();

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if (type === "update") {
      setName(data?.name);
      setOriginalName(data?.name);
      setCityName(data?.city_id?.name);
      setOriginalCityName(data?.city_id?.name);
    } else if (type === "add") {
      setDistrictID(data?._id || '');
    }
  },[data]);

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
      } else if (!name) {
        alert('Bạn chưa nhập tên quận/huyện!');
        return;
      } else {
        const newCity = await addDistrict(name, city_name);
        if (newCity && typeof newCity === 'object') {
          setName('');
          setCityName('');
          onSubmitModal(newCity);
          alert('Thêm quận/huyện thành công!')
        }
      }
    }
    else if (type==='update') {
      if (!city_name) {
        alert('Bạn chưa chọn tỉnh/thành phố!');
        return;
      } else if (!name) {
        alert('Bạn chưa nhập tên quận/huyện!');
        return;
      } else {
        if (name === originalName && city_name === originalCityName) {
          return;
        } else {
          const newCity = await updateDistrict(data?._id, name, city_name);
          if (newCity && typeof newCity === 'object') {
            onSubmitModal(newCity);
            alert('Cập nhật quận/huyện thành công!')
          }
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
                      Thêm quận/huyện
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
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tên tỉnh/thành phố' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
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
