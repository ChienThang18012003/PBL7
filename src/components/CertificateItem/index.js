import classNames from 'classnames/bind';
import styles from './CertificateItem.module.scss';
import { faCalendar, faHeart as faHeartSolid, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import useCertificate from '../../hook/useCertificate';
import CertificateModal from '../CertificateModal';

const cx = classNames.bind(styles);

function CertificateItem({ data, children, onDeleteCertificate, type="confirm" }) {

    const [certificateData, setCertificateData] = useState({});
    const [certificateLoading, certificateHook, getCertificateByResume, addCertificate, updateCertificate, deleteCertificate] = useCertificate();

    useEffect(()=>{
        setCertificateData(data);
    },[data])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleSubmitModal = (returnObject) => {
        setCertificateData(returnObject);
    }

    const handleDeleteItem = async() => {
        const deletedCer = await deleteCertificate(data?._id);
        onDeleteCertificate({id: certificateData?._id});
    }

    return (
        <div className={cx('container')}>
            <div className={cx('top-circle')}></div>
            <div className={cx('bottom-circle')}></div>
            <div className={cx('wrapper')}>
                <div className={cx('company-info')}>
                    <div className={cx('experience-info-wrapper')}>
                        <div className={cx('experience-info')}>
                            <div className={cx('date-wrapper')}>
                                <FontAwesomeIcon className={cx('date-icon')} icon={faCalendar}></FontAwesomeIcon>
                                <div className={cx('date-info')}>
                                    <span>{formatDate(certificateData?.start_date) || "Chưa xác định"} - {formatDate(certificateData?.expiration_date) || "Chưa xác định"}</span>
                                </div>
                            </div>
                            <div className={cx('exp-info')}>
                                <span>{certificateData?.name}</span>
                            </div>
                            <div className={cx('comp-info')}>
                                <span>{certificateData?.training_place}</span>
                            </div>
                        </div>
                        {
                            type!=="view" && (
                                <div className={cx('action-buttons-wrapper')}>
                                    <button className={cx('delete-button-wrapper')} onClick={handleDeleteItem}>
                                        <FontAwesomeIcon icon={faTrash} className={cx('update-icon')}></FontAwesomeIcon>
                                    </button>
                                    <CertificateModal data={certificateData} type="update" onSubmitModal={handleSubmitModal}></CertificateModal>
                                </div>
                            )
                        }
                    </div>
                    <div className={cx('description-wrapper')}>
                        <div className={cx('description')}>
                            <span>
                                {certificateData?.description}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CertificateItem;
