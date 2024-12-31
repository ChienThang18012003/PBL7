import React, { useState, forwardRef, useImperativeHandle } from "react";
import classNames from 'classnames/bind';
import styles from './InsuranceModal.module.scss';
import Button from "../Button";
import useAppointment from "../../hook/useAppointment";

const cx = classNames.bind(styles);

const InsuranceModal = forwardRef(({ children, data }, ref) => {
  const [modal, setModal] = useState(false);
  const [insuranceName, setInsuranceName] = useState('');
  const [insuranceID, setInsuranceID] = useState('');
  const [location, setLocation] = useState('');
  const [expiredDate, setExpiredDate] = useState(null);
  const [ , , , , , , addInsurance] = useAppointment();

  const toggleModal = () => {
    setModal(!modal);
  };

  useImperativeHandle(ref, () => ({
    openModal: () => setModal(true),
    closeModal: () => setModal(false),
    toggleModal,
  }));

  const toDateInputFormat = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleExpiredDateChange = (e) => {
    const date = new Date(e.target.value);
    if (!isNaN(date)) {
      setExpiredDate(toDateInputFormat(date));
    }
  };

  const handleAddInsurance = async () => {
    if (!insuranceName || !insuranceID || !location || !expiredDate) {
      alert("Bạn chưa nhập đủ trường");
    } else {
      console.log(data._id, insuranceName, insuranceID, location, expiredDate);
      await addInsurance(data._id, insuranceName, insuranceID, location, expiredDate);
      setInsuranceName('');
      setInsuranceID('');
      setLocation('');
      setExpiredDate(null);
      alert("Thêm bảo hiểm thành công!");
      window.location.reload();
    }
  };

  return (
    <>
      <div className={cx('buttonModal')}>{children}</div>
      {/* <Button primary onClick={toggleModal} className={cx('buttonModal')}>
        {children}
      </Button> */}

      {modal && (
        <div className={cx('modal')}>
          <div
            className={cx('overlay')}
            onClick={(e) => e.stopPropagation()}
          ></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
              <div className={cx('field-container')}>
                <div className={cx('field-name')}>
                  <span>Tên bảo hiểm</span>
                </div>
                <input
                  className={cx('field-input')}
                  value={insuranceName}
                  placeholder="Nhập tên bảo hiểm"
                  onChange={(e) => setInsuranceName(e.target.value)}
                />
              </div>
              <div className={cx('field-container')}>
                <div className={cx('field-name')}>
                  <span>Mã số</span>
                </div>
                <input
                  placeholder="Nhập mã số"
                  className={cx('field-input')}
                  value={insuranceID}
                  onChange={(e) => setInsuranceID(e.target.value)}
                />
              </div>
              <div className={cx('field-container')}>
                <div className={cx('field-name')}>
                  <span>Nơi cấp</span>
                </div>
                <input
                  placeholder="Nhập nơi cấp"
                  className={cx('field-input')}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className={cx('field-container')}>
                <div className={cx('field-name')}>
                  <span>Ngày hết hạn</span>
                </div>
                <input
                  type="date"
                  placeholder="Nhập ngày hết hạn"
                  className={cx('field-input')}
                  value={expiredDate || ''}
                  onChange={handleExpiredDateChange}
                />
              </div>
              <div className={cx('action-buttons')}>
                <Button submitTwo onClick={handleAddInsurance} type="button">
                  Thêm
                </Button>
                <Button
                  submitTwo
                  type="button"
                  onClick={() => {
                    setModal(false);
                    alert("Thêm cuộc hẹn thành công!");
                    window.location.reload();
                  }}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
});

export default InsuranceModal;
