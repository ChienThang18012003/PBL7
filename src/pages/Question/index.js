import classNames from 'classnames/bind';
import styles from './Question.module.scss';
import PageTitle from '../../components/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import CommentItem from '../../components/CommentItem';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import usePost from '../../hook/usePost';
import useAccount from '../../hook/useAccount';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';

const cx = classNames.bind(styles);
function Question() {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [, , loadingAccount, , , , getAccountByEmail] = useAccount();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [postByID, setPostByID] = useState(null);
    const [postComments, setPostComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage, setCommentsPerPage] = useState(5);

    const [postLoading, , , , , , getPost, addComment, , , getComments] =
        usePost();

    useEffect(() => {
        const fetchPost = async () => {
            const post = await getPost(id);
            setPostByID(post);
            setPostComments(post?.post_comments);
        };

        fetchPost();

        const fetchCommentsPeriodically = async () => {
            const comments = await getComments(id);
            setPostComments(comments?.comments);
        };
    
        const intervalId = setInterval(() => {
            fetchCommentsPeriodically();
        }, 5000);
    
        return () => {
            clearInterval(intervalId);
        };
    }, [id]);

    useEffect(() => {
        const fetchAccount = async () => {
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                const AccountInfo = await getAccountByEmail(obj?.email);
                setUserInfo(AccountInfo); 
            }
        };
        fetchAccount();
    }, []);

    const lastCommentIndex = currentPage * commentsPerPage;
    const firstCommentIndex = lastCommentIndex - commentsPerPage;
    const currentComment = postComments
        ? postComments.slice(firstCommentIndex, lastCommentIndex)
        : [];
    const renderContent = () => {
        if (!postByID?.post_content) return null; 
        return postByID.post_content.split('\n').map((line, index) => (
            <h4 className={cx('blog-description')} key={index}>
                
                <span>&nbsp;&nbsp;&nbsp;&nbsp;{line.trim()}</span>
            </h4>
        ));
    };

    const handleSubmitComment = async () => {
        let item = localStorage.getItem('isLoginSuccess');
            
        if (item) {
            if (!commentContent) {
                alert("Vui lòng nhập nội dung bình luận!");
                return;
            }

            const newComment = await addComment(id, userInfo.email, commentContent);
            if (newComment && typeof newComment === 'object') {
                setCommentContent('');
                window.location.reload();
            }
            else if (newComment && typeof newComment !== 'object'){
                alert(newComment);
            }
            else {
                alert("Có lỗi xảy ra, vui lòng thử lại sau");
            }
           
        } else {
            alert("Bạn cần đăng nhập để thêm bình luận!");
        }
        
    };

    const handleDeleteCommentInQuestion = (commentId) => {
        setPostByID((prevPost) => ({
            ...prevPost,
            post_comments: prevPost?.post_comments.filter((comment) => comment?._id !== commentId),
        }));
        setPostComments((prevComments) =>
        prevComments.filter((comment) => comment?._id !== commentId)
        );
    };
    

    if (postLoading || !postByID || loadingAccount) {
        return (
            <LoadingAnimation></LoadingAnimation>
        )
    }

    return (
        <div className={cx('wrapper')}>
            <PageTitle>HỎI ĐÁP</PageTitle>
            <div className={cx('blog-content-wrapper')}>
                <div className={cx('blog-wrapper')}>
                    <h4 className={cx('blog-title')}>
                        <span>{postByID?.post_title}</span>
                    </h4>
                    <div className={cx('blog-info-wrapper')}>
                        <div className={cx('info-wrapper')}>
                            <FontAwesomeIcon className={cx('blog-info-user-icon')} icon={faUser} />
                            <h4 className={cx('blog-owner')}>
                                <span>{postByID?.user_id?.username}</span>
                            </h4>
                        </div>
                        <div className={cx('info-wrapper')}>
                            <FontAwesomeIcon className={cx('blog-info-calendar-icon')} icon={faCalendar} />
                            <h4 className={cx('blog-post-date')}>
                                <span>{formatDate(postByID?.createdAt)}</span>
                            </h4>
                        </div>
                    </div>
                    <hr className={cx('list-blog-separator')}></hr>
                    <div className={cx('blog-content-container')}>{renderContent()}</div>
                    <div className={cx('comment-title-wrapper')}>
                        <h4 className={cx('comment-title')}>
                            <span>Bình luận</span>
                        </h4>
                    </div>
                    <hr className={cx('list-blog-separator')}></hr>
                    <div className={cx('comment-section')}>
                        <div className={cx('img-wrapper')}>
                            <Image
                                className={cx('user-avatar')}
                                src={userInfo?.profile_image}
                                alt="User Avatar"
                            ></Image>
                        </div>
                        <textarea
                            name="comment"
                            className={cx('comment')}
                            rows="4"
                            cols="50"
                            placeholder="Viết bình luận..."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        ></textarea>
                        <button className={cx('submit-comment-btn')} onClick={handleSubmitComment}>
                            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div className={cx('comments')}>
                        {currentComment.map((comment) => {
                            return (
                                <CommentItem 
                                    key={comment?._id}
                                    data={comment}
                                    owner={userInfo ? userInfo?.email : ""} 
                                    postID={id} 
                                    onDeleteComment={handleDeleteCommentInQuestion}
                                />
                            );
                        })}
                    </div>
                    <div className={cx('pagination')}>
                        <Pagination
                            totalPosts={(postComments || []).length}
                            postsPerPage={commentsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        ></Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
