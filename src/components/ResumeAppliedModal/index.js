import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from './ResumeAppliedModal.module.scss';
import Button from "../Button";
import useAccount from "../../hook/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFile as faFileSolid } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import useResumeApplied from "../../hook/useResumeApplied";
import useResume from "../../hook/useResume";

const cx = classNames.bind(styles);

export default function ResumeAppliedModal({children , data, jobPost, onSubmitModal, onDelete, type, userInfo, employerId}) {
  const [modal, setModal] = useState(false);
  const [resumeID, setResumeID] = useState('');
  const [jobPostID, setJobPostID] = useState('');
  const [email, setEmail] = useState('');
  const [allResume, setAllResume] = useState([]);
  const [appliedResumes, setAppliedResumes] = useState([]);
  const [resumeAppliedLoading, resumeAppliedHook, getResumeAppliedByEmail, getSpecificResumeApplied, addResumeApplied, deleteResumeApplied] = useResumeApplied();
  const [resumeLoading, resumeHook, getResume, getAttachedResume, getDefaultResume, getResumeByEmail, addResume, updateResume, uploadAttachedFile] = useResume();

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(()=>{
    const fetchInfo = () => {
      let item = localStorage.getItem('isLoginSuccess');
            
      if (item) {
        let obj = JSON.parse(item);
        if (obj?.email) {
          setEmail(obj?.email);
          if (jobPost) setJobPostID(jobPost)
        }
      }
    }
    fetchInfo();
  },[jobPost]);

  useEffect(() => {
    const fetchResume = async () => {
      if (email) {
        const resumes = await getResumeByEmail(email);
        if (resumes && resumes.length > 0) {
          setAllResume(resumes);

          const defaultResume = resumes.find(resume => resume.is_default === true);
          if (defaultResume) {
            setResumeID(defaultResume._id);
          }
        }
      }
    };

    fetchResume(); // Đừng quên gọi hàm fetchResume bên trong useEffect
  }, [email]);

  const handleAddResumeApplied = async() => {
      const appliedResume = await addResumeApplied(resumeID, jobPostID, email, employerId);
      if (appliedResume && typeof appliedResume === 'object') {
        setAppliedResumes(appliedResume);
        onSubmitModal(appliedResume);
        toggleModal();
      }
  }

  const handleDeleteResumeApplied = async() => {
    console.log("id: ", data?._id);
    const deletedResumeApplied = await deleteResumeApplied(data?._id);
    if (deletedResumeApplied) onDelete();
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  return (
    <>
      {
        (type === "add") ? (
          <button className={cx('apply-button')} onClick={toggleModal}>
              <FontAwesomeIcon className={cx('apply-icon')} icon={faPaperPlane}></FontAwesomeIcon>
              Nộp hồ sơ
          </button>
        ) : (
          <button className={cx('applied-button')} onClick={handleDeleteResumeApplied}>
              <FontAwesomeIcon className={cx('applied-icon')} icon={faPaperPlane}></FontAwesomeIcon>
              Rút hồ sơ
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
                            <span>Chọn hồ sơ ứng tuyển</span>
                        </div>
                        <div className = {cx('resume-applied-container')}>
                            {
                              (allResume || []).map((resume,index)=>(
                                  <div className = {cx('resume-applied')}>
                                    <input checked={resume?._id === resumeID} type="radio" className={cx('radio-button')} name="rate" value={resume?._id} onClick={()=>{setResumeID(resume?._id)}}></input>
                                    <div className = {cx('resume-info')}>
                                        <div className={cx('resume-name')}>
                                          <span>
                                              {resume?.desired_position}
                                          </span>
                                        </div>
                                        {
                                          resume?.attached_file ? (
                                            <div className={cx('resume-type-container')}>
                                                <FontAwesomeIcon className={cx('resume-type-icon-two')} icon={faFileSolid}></FontAwesomeIcon>
                                                <div className={cx('resume-type-two')}>
                                                  <span>
                                                    Hồ sơ đính kèm
                                                  </span>
                                                </div>
                                            </div>
                                          ) : (
                                            <div className={cx('resume-type-container')}>
                                                <FontAwesomeIcon className={cx('resume-type-icon')} icon={faFile}></FontAwesomeIcon>
                                                <div className={cx('resume-type')}>
                                                  <span>
                                                    Hồ sơ mặc định
                                                  </span>
                                                </div>
                                            </div>
                                          )
                                        }
                                    </div>
                                </div>
                              ))
                            }
                        </div>
                    </div>
                  </div>
                </div>
                <Button primary onClick={handleAddResumeApplied}>
                  Xác nhận
                </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
