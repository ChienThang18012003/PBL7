import React, { useState } from "react";
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import bcrypt from "bcryptjs";

const cx = classNames.bind(styles);

export default function Modal({children , data}) {
  const [modal, setModal] = useState(false);
  const [checkLogin, signUp, loadingAccount, doctorsHook, getAccountByID, filterDoctorList, getAccountByEmail, checkAccountType, uploadProof, changePassword, getDoctorActiveList, addDoctorActiveHour] = useAccount();
  const [newPass, setNewPass] = useState('');
  const [rewriteNewPass, setRewriteNewPass] = useState('');
  const [currentPass, setCurrentPass] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleChangePassword = async() => {
    if (currentPass === '') {
      alert('Vui lòng nhập mật khẩu hiện tại');
      return;
    }
    if (newPass === ''){
      alert('Vui lòng nhập mật khẩu mới');
      return;
    }
    else if (rewriteNewPass === ''){
      alert('Vui lòng nhập lại mật khẩu mới');
      return;
    }
    else if (newPass !== rewriteNewPass){
      alert('Mật khẩu nhập lại không chính xác');
      return;
    }
    const isMatch = await bcrypt.compare(currentPass, data.password);
    if (!isMatch) {
      alert('Mật khẩu hiện tại không đúng');
      return;
    }

    try {
      const changePass = await changePassword(data.email, newPass);
      if (changePass && typeof changePass === 'object') {
        alert('Đổi mật khẩu thành công!');
        setModal(false);
      }
      else if (changePass && typeof changePass !== 'object') {
        alert(changePass);
      }
      else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
      
    } catch (error) {
      alert("Đổi mật khẩu thất bại:", error);
    }
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
                        <span>Nhập mật khẩu hiện tại</span>
                    </div>
                    <input className={cx('field-input')} value={currentPass} onChange={(e)=>{setCurrentPass(e.target.value)}}></input>
                </div>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Nhập mật khẩu mới</span>
                    </div>
                    <input className={cx('field-input')} value={newPass} onChange={(e)=>{setNewPass(e.target.value)}}></input>
                </div>
                <div className={cx('field-container')}>
                    <div className={cx('field-name')}>
                        <span>Nhập lại mật khẩu mới</span>
                    </div>
                    <input className={cx('field-input')} value={rewriteNewPass} onChange={(e)=>{setRewriteNewPass(e.target.value)}}></input>
                </div>
                <Button submitTwo onClick={handleChangePassword}>
                  Đổi mật khẩu
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
