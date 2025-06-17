import React, { useEffect, useRef, useState } from "react";
import classNames from 'classnames/bind';
import styles from './BannerModal.module.scss';
import Button from "../Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus} from '@fortawesome/free-solid-svg-icons';
import { assets } from "../../assets/assets_fe/assets";
import Image from '../../components/Image';
import useBanner from "../../hook/useBanner";

const cx = classNames.bind(styles);

export default function BannerModal({children , data, onSubmitModal, type, userInfo}) {
  const [modal, setModal] = useState(false);
  const [banner, setBanner] = useState(null);
  const bannerRef = useRef(null);
  const [bannerInfo, setBannerInfo] = useState({});
  const [email, setEmail] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [bannerLoading, bannerHook, getAllBanner, addBanner, updateBanner, deleteBanner] = useBanner();

  useEffect(() => {
      return () => {
          banner && URL.revokeObjectURL(banner.preview);
      };
  }, [banner]);

  useEffect(()=>{
    let item = localStorage.getItem('isLoginSuccess');

    if (item) {
      let obj = JSON.parse(item);
      if (obj?.email){
        setEmail(obj?.email);
      }
    }
  },[])

  const handlePreviewBanner = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validFileTypes = /image\/(jpeg|jpg|png|gif|bmp)/;
    if (!validFileTypes.test(file.type)) {
        alert("Chỉ chấp nhận các file định dạng .jpg, .jpeg, .png, .gif, hoặc .bmp!");
        return;
    }

    file.preview = URL.createObjectURL(file);
    setBanner(file);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if (type === "update") {
      if (data) {
        setSelectedType(data?.type);
        setBannerInfo(data);
      }
    }
  },[data]);

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleSubmitModal = async() => {
    if (type==='add') {
      if (!banner) {
        alert('Bạn chưa chọn ảnh banner!');
        return;
      } else if (!selectedType) {
        alert('Bạn chưa chọn loại banner!');
        return;
      } else {
        let item = localStorage.getItem('isLoginSuccess');

        if (item) {
          let obj = JSON.parse(item);
          if (obj?.email){
            const newBanner = await addBanner(obj?.email, selectedType, banner);
            if (newBanner && typeof newBanner === 'object') {
              setSelectedType('');
              setBanner(null);
              onSubmitModal(newBanner);
              alert('Thêm banner thành công!')
            }
          }
        }
      }
    }
    else if (type==='update') {
      if (!selectedType) {
        alert('Bạn chưa chọn loại banner!');
        return;
      } else {
        const newBanner = await updateBanner(data?._id, selectedType, banner);
        if (newBanner && typeof newBanner === 'object') {
          onSubmitModal(newBanner);
          alert('Cập nhật banner thành công!')
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
                      Thêm Banner
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
                            <span>Ảnh banner</span>
                        </div>
                        <div className = {cx('field-input-container-two')}>
                          <div className={cx('company-logo-container')}>
                                <Image className={cx('company-logo')} src={banner?.preview || bannerInfo?.banner_image} alt="Banner" fallback = {assets.DefaultBanner}></Image>
                            </div>
                            <div className={cx('company-logo-button-container')}>
                                <button className={cx('company-logo-button')} onClick={() => bannerRef.current && bannerRef.current.click()}>
                                    <FontAwesomeIcon icon={faPen} className={cx('company-logo-icon')}></FontAwesomeIcon>
                                    Thay banner
                                </button>
                                <input type="file" id="file" className={cx("file-input")} onChange={handlePreviewBanner} ref={bannerRef}/>
                            </div>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Loại banner</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <select className={cx('field-input')} type='text' value={selectedType} onChange={(e)=>{setSelectedType(e.target.value)}}>
                              <option key='0' value=''>
                                  --Loại banner--
                              </option>
                              <option key='1' value='Home'>
                                  Home
                              </option>
                              <option key='2' value='Job'>
                                  Job
                              </option>
                              <option key='3' value='Company'>
                                  Company
                              </option>
                          </select>
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
