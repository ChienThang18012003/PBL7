import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './CityModal.module.scss';
import Button from "../Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus} from '@fortawesome/free-solid-svg-icons';
import useCity from "../../hook/useCity";

const cx = classNames.bind(styles);

export default function CityModal({children , data, onSubmitModal, type, userInfo}) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [cityID, setCityID] = useState('');
  const [cityLoading, , addCity, updateCity, deleteCity] = useCity();
  const [originalName, setOriginalName] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if (type === "update") {
      setName(data?.name);
      setOriginalName(data?.name);
    } else if (type === "add") {
      setCityID(data?._id || '');
    }
  },[data]);

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleSubmitModal = async() => {
    if (type==='add') {
      if (!name) {
        alert('Bạn chưa nhập tên tỉnh/thành phố');
        return;
      } else {
        const newCity = await addCity(name);
        if (newCity && typeof newCity === 'object') {
          setName('');
          onSubmitModal(newCity);
          alert('Thêm tỉnh/thành phố thành công!')
        }
      }
    }
    else if (type==='update') {
      if (!name) {
        alert('Bạn chưa nhập tên tỉnh/thành phố');
        return;
      } else {
        if (name===originalName) {
          return;
        } else {
          const newCity = await updateCity(data?._id, name);
          if (newCity && typeof newCity === 'object') {
            onSubmitModal(newCity);
            alert('Cập nhật tỉnh/thành phố thành công!')
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
                      Thêm tỉnh/thành phố
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
