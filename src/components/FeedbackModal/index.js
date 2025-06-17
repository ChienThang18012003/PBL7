import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './FeedbackModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useFeedback from "../../hook/useFeedback";

const cx = classNames.bind(styles);

export default function FeedbackModal({children , data, onSubmitModal, type, userInfo}) {
  const [modal, setModal] = useState(false);
  const [feedbackLoading, feedbackHook, getAllFeedback, getSpecificFeedback, addFeedback, changeFeedback, changeFeedbackStatus, deleteFeedback] = useFeedback();

  const [email, setEmail] = useState(data?.user_id?.email || '');
  const [content, setContent] = useState(data?.content || '');
  const [rating, setRating] = useState(data?.rating || null);
  const [feedbackID, setFeedbackID] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    if (type === "update") {
      setFeedbackID(data?._id || '');
      setContent(data?.content || '');
      setRating(data?.rating || null);
      setEmail(data?.user_id?.email)
    }
  },[data]);

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleSubmitModal = async() => {
      if (type === "add") {
        if (!content) {
          alert("Bạn chưa nhập phản hồi");
          return;
        } else if (!rating) {
          alert("Bạn chưa chọn đánh giá");
          return;
        } else {
          let item = localStorage.getItem('isLoginSuccess');
            
          if (item) {
            let obj = JSON.parse(item);
            if (obj?.email) {
              const newFeedback = await addFeedback(obj?.email, content, rating);
              setEmail('');
              setContent('');
              setRating(null);
              setFeedbackID('')
              onSubmitModal(newFeedback);
            }
          }
        }
      } else if (type === "update") {
        if (!content) {
          alert("Bạn chưa nhập phản hồi");
          return;
        } else if (!rating) {
          alert("Bạn chưa chọn đánh giá");
          return;
        } else {
          const newFeedback = await changeFeedback(data?._id, content, rating);
          onSubmitModal(newFeedback);
        }
      }
      setModal(false);
  }

  return (
    <>
      {
        (type === "add") ? (
          <button className={cx('apply-button')} onClick={toggleModal}>
              <FontAwesomeIcon className={cx('apply-icon')} icon={faPaperPlane}></FontAwesomeIcon>
              Viết phản hồi
          </button>
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
                            <span>Phản hồi</span>
                        </div>
                        <div className = {cx('field-input-container-two')}>
                          <textarea className={cx('field-text-area')} type='text' placeholder='Nhập phản hồi' value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-name')}>
                            <span>Đánh giá</span>
                        </div>
                        <div className = {cx('field-input-container')}>
                          {[...Array(5)].map((star, index) => {
                              const currentRate = index + 1;
                              return(
                                  <>
                                      <label>
                                          <input type="radio" className={cx('star-radio')} name="rate" value={currentRate} onClick={()=>{setRating(currentRate)}}></input>
                                          <FontAwesomeIcon className={cx('level-icon')} color={currentRate <= (Number(rating)) ? "yellow" : "gray"} icon={faStar}></FontAwesomeIcon>
                                      </label>
                                  </>
                              )
                          })}
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
