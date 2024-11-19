import React, { useState } from "react";
import classNames from 'classnames/bind';
import styles from './InsuranceModal.module.scss';
import Button from "../Button";

const cx = classNames.bind(styles);

export default function InsuranceModal({children}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <Button primary onClick={toggleModal} >
        {children}
      </Button>

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Tên bảo hiểm</span>
                    </div>
                    <input className={cx('field-input')}></input>
                </div>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Mã số</span>
                    </div>
                    <input className={cx('field-input')}></input>
                </div>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Nơi cấp</span>
                    </div>
                    <input className={cx('field-input')}></input>
                </div>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Ngày hết hạn</span>
                    </div>
                    <input type='date' className={cx('field-input')}></input>
                </div>
                <Button submitTwo onClick={toggleModal}>
                  Đổi thông tin
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
