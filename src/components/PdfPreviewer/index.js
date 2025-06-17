import { useEffect, useRef, useState } from 'react';
import styles from './PdfPreviewer.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import ResumeModal from '../ResumeModal';
import useResume from '../../hook/useResume';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const cx = classNames.bind(styles);

function PdfPreviewer({ pdfUrl, title, updatedAt, onEdit, onDelete, data, type = 'view' }) {
    const canvasRef = useRef(null);
    const [pdfData, setPdfData] = useState(null);
    const [resumeInfo, setResumeInfo] = useState({});
    const [resumeLoading, resumeHook, getResume, getAttachedResume, getDefaultResume, getResumeByEmail, addResume, updateResume, uploadAttachedFile, getAllResume, deleteResume] = useResume();
    const createResumeObject = (data) => {
        return {
            career_goal: data?.career_goal,
            desired_position: data?.desired_position,
            desired_job_level: data?.desired_job_level,
            academic_level: data?.academic_level,
            experience: data?.experience,
            salary_min: data?.salary_min,
            salary_max: data?.salary_max,
            job_type: data?.job_type,
            type_of_workplace: data?.type_of_workplace,
            job_city_id: data?.city_id?._id,
            career_id: data?.career_id?._id,
            job_city: data?.city_id?.name,
            career: data?.career_id?.career_name,
            resumeID: data?._id
        };
    };

    const handleDeleteResume = async() => {
        const deletedResume = await deleteResume(data?._id);
        onDelete({_id: resumeInfo?._id})
    }

    const handleUpdateResume = (submittedObject) => {
        console.log(submittedObject);
        if (submittedObject) {onEdit(submittedObject); setResumeInfo(submittedObject);}
    }

    useEffect(() => {
        const fetchPdfData = async () => {
            try {
                const response = await fetch(pdfUrl);
                const arrayBuffer = await response.arrayBuffer();
                setPdfData(arrayBuffer);
            } catch (error) {
                console.error("Failed to fetch PDF:", error);
            }
        };

        fetchPdfData();
    }, [pdfUrl]);

    useEffect(()=>{
        if (data) setResumeInfo(data);
    },[data])

    useEffect(() => {
        if (!pdfData) return;
    
        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        loadingTask.promise.then((pdf) => {
            pdf.getPage(1).then((page) => {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = canvasRef.current;
                if (!canvas) return;
    
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
    
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                page.render(renderContext).promise.then(() => {
                    console.log("PDF page rendered successfully");
                });
            });
        }).catch((error) => {
            console.error("Error rendering PDF:", error);
        });
    }, [pdfData]);

    return (
        <div className={cx('pdf-card')}>
            <canvas ref={canvasRef} className={cx('pdf-preview')} />
            <div className={cx('pdf-info')}>
                <h4 className={cx('pdf-title')}>{title}</h4>
                <p className={cx('pdf-date')}>Cập nhật lần cuối: {updatedAt}</p>
            </div>
            <div className={cx('pdf-actions')}>
                <a href={pdfUrl} download className={cx('download-btn')}>
                    <FontAwesomeIcon className={cx('download-icon')} icon={faDownload} />
                </a>
                {
                    type === 'update' && (
                    <>
                        <ResumeModal data={createResumeObject(resumeInfo)} resumeType='attached' type='confirm' onSubmitModal={handleUpdateResume}></ResumeModal>
                        <button onClick={handleDeleteResume} className={cx('delete-btn')}>
                            <FontAwesomeIcon className={cx('delete-icon')} icon={faTrash} />
                        </button>
                    </>
                    )
                }
            </div>
        </div>
    );
}

export default PdfPreviewer;
