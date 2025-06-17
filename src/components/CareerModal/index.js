import React, { useEffect, useRef, useState } from "react";
import classNames from 'classnames/bind';
import styles from './CareerModal.module.scss';
import Button from "../Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus} from '@fortawesome/free-solid-svg-icons';
import useCareer from "../../hook/useCareer";
import { assets } from "../../assets/assets_fe/assets";
import Image from '../../components/Image';

const cx = classNames.bind(styles);

export default function CareerModal({children , data, onSubmitModal, type, userInfo}) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [careerLoading, careerHook, getAllCareers, addCareer, updateCareer, deleteCareer] = useCareer();
  const [originalName, setOriginalName] = useState('');
  const [logo, setLogo] = useState(null);
  const logoRef = useRef(null);
  const [careerInfo, setCareerInfo] = useState({});

  useEffect(() => {
      return () => {
          logo && URL.revokeObjectURL(logo.preview);
      };
  }, [logo]);

  const handlePreviewLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validFileTypes = /image\/(jpeg|jpg|png|gif|bmp)/;
    if (!validFileTypes.test(file.type)) {
        alert("Chỉ chấp nhận các file định dạng .jpg, .jpeg, .png, .gif, hoặc .bmp!");
        return;
    }

    file.preview = URL.createObjectURL(file);
    setLogo(file);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if (type === "update") {
      setName(data?.career_name);
      setOriginalName(data?.career_name);
      if (data) setCareerInfo(data);
    }
  },[data]);

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleSubmitModal = async() => {
    if (type==='add') {
      if (!logo) {
        alert('Bạn chưa chọn logo nghề nghiệp!');
        return;
      } else if (!name) {
        alert('Bạn chưa nhập tên nghề nghiệp!');
        return;
      } else {
        const newCareer = await addCareer(name, logo);
        if (newCareer && typeof newCareer === 'object') {
          setName('');
          setLogo(null);
          onSubmitModal(newCareer);
          alert("Thêm nghề nghiệp thành công!")
        }
      }
    }
    else if (type==='update') {
      if (!name) {
        alert('Bạn chưa nhập tên nghề nghiệp!');
        return;
      } else {
        const newCareer = await updateCareer(data?._id, name, logo);
        if (newCareer && typeof newCareer === 'object') {
          onSubmitModal(newCareer);
          alert("Cập nhật nghề nghiệp thành công!")
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
                      Thêm nghề nghiệp
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
                            <span>Logo nghề nghiệp</span>
                        </div>
                        <div className = {cx('field-input-container-two')}>
                          <div className={cx('company-logo-container')}>
                                <Image className={cx('company-logo')} src={logo?.preview || careerInfo?.career_logo} alt="Company Logo" fallback = {assets.CompanyLogo}></Image>
                            </div>
                            <div className={cx('company-logo-button-container')}>
                                <button className={cx('company-logo-button')} onClick={() => logoRef.current && logoRef.current.click()}>
                                    <FontAwesomeIcon icon={faPen} className={cx('company-logo-icon')}></FontAwesomeIcon>
                                    Thay logo
                                </button>
                                <input type="file" id="file" className={cx("file-input")} onChange={handlePreviewLogo} ref={logoRef}/>
                            </div>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Tên nghề nghiệp</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tên nghề nghiệp' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
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
