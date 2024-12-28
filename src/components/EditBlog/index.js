import classNames from 'classnames/bind';
import styles from './EditBlog.module.scss';
import Image from '../Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar} from '@fortawesome/free-regular-svg-icons';
import { faXmark, faPenToSquare, faRotate} from '@fortawesome/free-solid-svg-icons';
import useArticles from '../../hook/useArticles';
import { useState, useEffect } from 'react';
import Button from '../Button';

const cx = classNames.bind(styles);

function EditBlog({ data : initialData, onUpdateData }) {
    const [isVisible, setIsVisible] = useState(false);
    const [image, setImage] = useState();
    const [data, setData] = useState(initialData);
    const [blogTitle, setBlogTitle] = useState(data?.article_title);
    const [blogContent, setBlogContent] = useState(data?.article_content);
    const [isDisabled, setIsDisabled] = useState(true);
    
    const [
        articlesHook,
        firstArticle,
        fourArticles,
        loading,
        getArticlesByDoctor,
        getArticlesBySpecialty,
        getArticlesByID,
        addComment,
        addArticle,
        getFiveLatestArticles,
        getFourLatestArticles,
        searchArticle,
        getAllArticleByDoctor,
        softDeleteArticle,
        permaDeleteArticle,
        restoreArticle,
        updateArticle
    ] = useArticles();

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setImage(file);
        } else {
            alert("No file selected or invalid file type.");
        }
    };

    useEffect(() => {
        if (!image) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
        return () => {
            image && URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    useEffect(() => {
        if (blogTitle === data?.article_title) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }

    }, [blogTitle]);

    useEffect(() => {
        if (blogContent === data?.article_content) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }

    }, [blogContent]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleUpdateArticle = async() => {
        if (blogTitle === ""){
            alert("Vui lòng nhập tiêu đề bài báo");
            return;
        }

        if (blogContent === ""){
            alert("Vui lòng nhập tiêu đề bài báo");
            return;
        }

        const userConfirmed = window.confirm("Bạn có chắc chắn muốn chỉnh sửa bài báo này không?");
        if (userConfirmed) {
            const message = await updateArticle(data._id, blogTitle, blogContent, image);
            if (message && typeof message === 'object') {
                alert("Chỉnh sửa bài báo thành công!");
                setData(message);
                setBlogTitle(message?.article_title);
                setBlogContent(message?.article_content);
                setImage(null);
                return;
            }
            else if (message && typeof message !== 'object') {
                alert(message);
                return;
            }
            else {
                alert("Có lỗi xảy ra, vui lòng thử lại sau!");
                return;
            }
        }

    }

    const handleDeleteArticle = async () => {
        if (data?.is_deleted) {
          const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa bài báo này vĩnh viễn không?");
          if (userConfirmed) {
            const message = await permaDeleteArticle(data?._id);
            if (message && typeof message === "object") {
              alert("Xóa bài báo vĩnh viễn thành công!");
              onUpdateData("delete", data._id);
            } else {
              alert(message || "Có lỗi xảy ra, vui lòng thử lại sau!");
            }
          }
        } else {
          const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa bài báo này không?");
          if (userConfirmed) {
            const message = await softDeleteArticle(data?._id);
            if (message && typeof message === "object") {
              alert("Xóa bài báo thành công!");
              onUpdateData("update", { ...data, is_deleted: true });
            } else {
              alert(message || "Có lỗi xảy ra, vui lòng thử lại sau!");
            }
          }
        }
      };
    
      const handleRestoreArticle = async () => {
        const userConfirmed = window.confirm("Bạn có chắc chắn muốn khôi phục bài báo này không?");
        if (userConfirmed) {
          const message = await restoreArticle(data._id);
          if (message && typeof message === "object") {
            alert("Khôi phục bài báo thành công!");
            onUpdateData("update", { ...data, is_deleted: false });
          } else {
            alert(message || "Có lỗi xảy ra, vui lòng thử lại sau!");
          }
        }
      };

    return (
        <div className={cx('blog-wrapper')}>
            <div className={cx('tool-bar')}>
                <div className={cx('posted-date-info')}>
                    <FontAwesomeIcon className={cx('blog-info-calendar-icon')} icon={faCalendar} />
                    <h4 className={cx('blog-post-date')}>
                        <span>{formatDate(data?.date_published)}</span>
                    </h4>
                </div>
                <div className={cx('edit-buttons')}>
                    {
                        data?.is_deleted && (
                            <button className={cx('cancel-button')} onClick={handleRestoreArticle}>
                                <FontAwesomeIcon icon={faRotate} className={cx('cancel-button-icon')}></FontAwesomeIcon>
                            </button>
                        )
                    }
                    {
                        !data?.is_deleted && (
                            <button className={cx('cancel-button')} onClick={()=>{setIsVisible(!isVisible)}}>
                                <FontAwesomeIcon icon={faPenToSquare} className={cx('cancel-button-icon')}></FontAwesomeIcon>
                            </button>
                        )
                    }
                    <button className={cx('cancel-button')} onClick={handleDeleteArticle}>
                        <FontAwesomeIcon icon={faXmark} className={cx('cancel-button-icon')}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
            {
                !isVisible && (
                    <div className={cx('blog-info-wrapper')}>
                        <Image className={cx('blog-image')} src={data?.article_image} alt="Blog_image"></Image>
                        <div className={cx('blog-content')}>
                            <h4 className={cx('blog-title')}>
                                <span>{data?.article_title}</span>
                            </h4>
                            <h4 className={cx('blog-description')}>
                                <span>{data?.article_content}</span>
                            </h4>
                        </div>
                    </div>
                )
            }

            {
                isVisible && (
                    <div className={cx('edit-blog-form-container')}>
                        <div className={cx('edit-blog-form')}>
                            <div className={cx('edit-image-container')}>
                                <img name="image" src={image ? image.preview : data.article_image} alt="" className={cx('edit-blog-image')}></img>
                            </div>
                            <div className={cx('edit-input-file-container')}>
                                <input type="file" className={cx('edit-image-picker')} onChange={handlePreviewImage}></input>
                            </div>
                            <input
                                type="text"
                                name="title"
                                className={cx('edit-blog-title')}
                                placeholder="Tiêu đề"
                                value={blogTitle}
                                onChange={(e) => setBlogTitle(e.target.value)}
                            ></input>
                            <textarea
                                name="content"
                                className={cx('edit-blog-content')}
                                placeholder="Nội dung"
                                rows="4"
                                cols="50"
                                value={blogContent}
                                onChange={(e) => setBlogContent(e.target.value)}
                            ></textarea>
                            <div className={cx('update-buttons-wrapper')}>
                                <button className={cx('update-buttons')} onClick={handleUpdateArticle} disabled={isDisabled}>Lưu</button>
                                <button className={cx('update-buttons')} onClick={()=>{setIsVisible(false)}}>Hủy</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default EditBlog;
