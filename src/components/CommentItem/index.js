import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import { faUserDoctor, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../Image';
import { useState, useEffect } from 'react';
import usePost from '../../hook/usePost';
import { assets } from '../../assets/assets_fe/assets';

const cx = classNames.bind(styles);

function CommentItem({ data, owner, postID, onDeleteComment }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isCommentVisible, setIsCommentVisible] = useState(true);
    const [textareaValue, setTextareaValue] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [updatedComment, setUpdatedComment] = useState("");
    const [originalComment, setOriginalComment] = useState("");

    const [, , , , , , , , updateComment, deleteComment] = usePost();

    useEffect(() => {
        setTextareaValue(data?.comment_content);
        setOriginalComment(data?.comment_content);
     }, [data?.comment_content]);

    useEffect(() => {
       if (textareaValue === originalComment) {
          setIsDisabled(true);
       }
       else {
          setIsDisabled(false);
       }
    }, [textareaValue]);

    const handleDeleteComment = async () => {
        const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?");
        if (userConfirmed) {
            try {
                const deletedComment = await deleteComment(postID, data?._id);
                if (deletedComment && typeof deletedComment === 'object') {
                    alert("Xóa bình luận thành công!");
                    onDeleteComment(data?._id);
                    return;
                } else if (deletedComment && typeof deletedComment !== 'object') {
                    alert(deletedComment);
                    return;
                } else {
                    alert("Có lỗi xảy ra, vui lòng thử lại sau!");
                    return;
                }
            } catch (error) {
                alert("Có lỗi xảy ra: ", error);
                return;
            }
        }
    };

    const handleUpdateComment = async() => {
        if (textareaValue === '') {
            alert("Vui lòng nhập nội dung bình luận!");
            return;
        }
        try{
            const updatedComment = await updateComment(postID, data?._id, textareaValue);
            if (updatedComment && typeof updatedComment === 'object') {
                alert("Cập nhật bình luận thành công!");
                setUpdatedComment(textareaValue);
                setOriginalComment(textareaValue);
                setIsCommentVisible(true);
                return;
            }
            else if (updatedComment && typeof updatedComment !== 'object') {
                alert(updatedComment);
                return;
            }
            else{
                alert("Có lỗi xảy ra, vui lòng thử lại sau!");
                return;
            }
        }
        catch (error){
            alert("Có lỗi xảy ra: ", error);
            return;
        }
        finally{

        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-avatar-section')}>
                <Image className={cx('user-avatar')} src={data?.replier?.profile_image} fallback={assets.UserImage}></Image>
            </div>
            
            {
                isCommentVisible && (
                    <div className={cx('question-section')}>
                
                    <div className={cx('question-title-wrapper')}>
                        <div className={cx('text-wrapper')}>
                            <div className={cx('question-title')}>
                                <span>{data?.replier?.username || 'Unknown'}</span>
                            </div>
                            {data?.replier?.__t && (
                                <div className={cx('icon-wrapper')}><FontAwesomeIcon icon={faUserDoctor} className={cx('icon')}></FontAwesomeIcon></div>
                            )}
                        </div>
                        {owner === data?.replier?.email && (
                            <div className={cx('edit-button-container')}>
                                <button className={cx('edit-button')} onClick = {() => {setIsVisible(!isVisible)}}>
                                    <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                                </button>
                                {
                                   isVisible && (
                                      <div className={cx('buttons-container')}>
                                          <button className={cx('edit-buttons')} onClick={()=>{setIsCommentVisible(!isCommentVisible)}}>
                                            Chỉnh sửa
                                          </button>
                                          <button className={cx('edit-buttons')} onClick={handleDeleteComment}>
                                            Xóa
                                          </button>
                                      </div>
                                   )
                                }
                            </div>
                        )}
                    </div>
                    <div className={cx('question-wrapper')}>
                        <span className={cx('question')}>{updatedComment || data?.comment_content}</span>
                    </div>
                </div>
                )
            }
            
            {
                !isCommentVisible && (
                    <div className={cx('question-section')}>
                        <div className={cx('textarea-wrapper')}>
                        <textarea
                                className={cx('edit-textarea')}
                                value={textareaValue}
                                onChange={(e) => {
                                    setTextareaValue(e.target.value);
                                }}
                                rows="2"
                                cols="50"
                            ></textarea>
                        </div>
                        <div className={cx('update-buttons-wrapper')}>
                             <button className={cx('update-buttons')} onClick={handleUpdateComment} disabled={isDisabled}>Lưu</button>
                             <button className={cx('update-buttons')} onClick={()=>{setIsCommentVisible(!isCommentVisible)}}>Hủy</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default CommentItem;
