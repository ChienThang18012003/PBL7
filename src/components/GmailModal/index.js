import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './GmailModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from "react-quill";

const cx = classNames.bind(styles);

export default function GmailModal({children , data, onSubmitModal, type, userInfo, receiverEmail, receiverName}) {
  const [modal, setModal] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    changeAccountInfo,
    getAccountByEmail,
    sendEmail
    ] = useAccount();

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmitModal = async() => {
    if (!title) {
      alert("Bạn chưa nhập tiêu đề email!");
      return;
    } else if (!content) {
      alert("Bạn chưa nhập nội dung email!");
      return;
    } else {
      let item = localStorage.getItem('isLoginSuccess');
      if (item) {
          let obj = JSON.parse(item);
          if (obj?.email){
            const newGmail = await sendEmail(obj?.email, receiverEmail, title, content);
            if (newGmail) {
              alert("Gửi email thành công");
              setContent('');
              setTitle('');
              setModal(false);
            } else {
              alert("Gửi email thất bại!");
              return;
            }
          }
      }
    }
  }

  return (
    <>
      {
          <div className={cx('add-button')} onClick={toggleModal}>
              <FontAwesomeIcon className={cx('search-icon')} icon={faEnvelope}></FontAwesomeIcon>
              <div className={cx('search-text')}>
                  <span>
                      Gửi email
                  </span>
              </div>
          </div>
      }

      {modal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          <div className={cx('modal-content')}>
            <div className={cx('modal-field-container')}>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Tên người nhận</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tên người nhận' value={receiverName} readOnly></input>
                        </div>
                    </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Email người nhận</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập email người nhận' value={receiverEmail} readOnly></input>
                        </div>
                    </div>
                </div>
                <div className={cx('career-field-container')}>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Tiêu đề email</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          <input className={cx('field-input')} type='text' placeholder='Nhập tiêu đề email' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
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
                            value={content}
                            onChange={setContent}
                            style={{ height: '400px', width: '100%', marginBottom: '50px', marginTop: '10px', border: '2px soild #a8aaac', borderRadius: '5px' }}
                          >
                          </ReactQuill>
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
