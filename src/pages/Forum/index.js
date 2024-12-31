import classNames from 'classnames/bind';
import styles from './Forum.module.scss';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import { useState, useEffect } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ForumItem from '../../components/ForumItem';
import useSpeciality from '../../hook/useSpeciality';
import usePost from '../../hook/usePost';
import Pagination from '../../components/Pagination';
import useAccount from '../../hook/useAccount';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';

const cx = classNames.bind(styles);

function Forum() {
    const [specialityLoading, specialityHook] = useSpeciality();
    const [postLoading, postHook, getAllPostsBySpecialty, sortAllPosts, addPost, searchPost, , , , , , getAllPosts, getFilteredPosts, sortFilterdPosts] = usePost();
    const [selectedFaculty, setSelectedFaculty] = useState('all');
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [formSelectedFaculty, setFormSelectedFaculty] = useState('');
    const [postTitle, setPostTitle] = useState();
    const [postContent, setPostContent] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(4);
    const [userInfo, setUserInfo] = useState({});
    const [, , loadingAccount, , , filterDoctorList, getAccountByEmail] = useAccount();
    let intervalId;

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = (displayedPosts || []).slice(firstPostIndex, lastPostIndex);

    const handleFacultyChange = (event) => {
        setSelectedFaculty(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleFormFacultyChange = (event) => {
        setFormSelectedFaculty(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmitSearch = async () => {
        const relatedPosts = await searchPost(searchValue, displayedPosts);
        setCurrentPage(1);
        setDisplayedPosts(relatedPosts);
    };

    const handleHashtagClick = (specialityName) => {
        setSelectedFaculty(specialityName);
    }

    const handleSubmitForm = async () => {
        let item = localStorage.getItem('isLoginSuccess');
        if (item) {
            let obj = JSON.parse(item);
            if (!postTitle) {
                alert("Vui lòng nhập tiêu đề câu hỏi!");
                return;
            }
            if (!postContent) {
                alert("Vui lòng nhập nội dung câu hỏi!");
                return;
            }
            if (!formSelectedFaculty) {
                alert("Vui lòng chọn chuyên khoa!");
                return;
            }
            const newPost = await addPost(userInfo?.email, postTitle, postContent, formSelectedFaculty);
            if (newPost && typeof newPost === 'object'){
                setPostTitle('');
                setPostContent('');
                setFormSelectedFaculty(specialityHook[0] || "");
                alert("Thêm câu hỏi thành công!");
                window.location.reload();
            }
            else if (newPost && typeof newPost !== 'object'){
                alert(newPost);
            }
            else {
                alert("Có lỗi xảy ra, vui lòng thử lại sau!");
            }
            
        }
        else {
            alert("Bạn cần đăng nhập để đăng câu hỏi!");
        }
    };

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

    useEffect(() => {
        if (specialityHook.length > 0) {
            setFormSelectedFaculty(specialityHook[0].name);
        }
    }, [specialityHook]);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getAllPostsBySpecialty(selectedFaculty, sortBy);
            setCurrentPage(1);
            setDisplayedPosts(posts);
        };

        const sortPosts = async () => {
            const posts = sortAllPosts(sortBy);
            setCurrentPage(1);
            setDisplayedPosts(posts);
        };

        if (selectedFaculty === 'all') {
            sortPosts();
        } else {
            fetchPosts();
        }

        const fetchPostsPeriodically = async () => {
            if (selectedFaculty === 'all') {
                const allPost = await getAllPosts();
                if (allPost && Array.isArray(allPost)) {
                    const sortedPost = sortFilterdPosts(sortBy, allPost);
                    setDisplayedPosts(sortedPost);
                }
            } else {
                const filteredPost = await getFilteredPosts(selectedFaculty, sortBy);
                if (filteredPost && Array.isArray(filteredPost)) setDisplayedPosts(filteredPost);
            }
        };
        
            intervalId = setInterval(() => {
                fetchPostsPeriodically();
            }, 5000);
            

        return () => {
            clearInterval(intervalId);
        };
    }, [selectedFaculty, sortBy, postHook]);

    if (postLoading || specialityLoading || loadingAccount) {
        return (
            <LoadingAnimation></LoadingAnimation>
        )
    }
    return (
        <div className={cx('wrapper')}>
            <PageTitle>CHUYÊN MỤC TƯ VẤN</PageTitle>
            <div className={cx('search-section')}>
                <div className={cx('search-section-title-wrapper')}>
                    <h4 className={cx('search-section-title')}>
                        <span>Thông tin tra cứu</span>
                    </h4>
                </div>
                <div className={cx('search-section-options-wrapper')}>
                    <div className={cx('search-section_faculty-wrapper')}>
                        <h4 className={cx('search-section_option-title')}>
                            <span>Chuyên khoa</span>
                        </h4>
                        <select
                            className={cx('faculty')}
                            name="faculty"
                            value={selectedFaculty}
                            onChange={handleFacultyChange}
                        >
                            <option value={'all'}>All</option>
                            {specialityHook.map((speciality) => (
                                <option key={speciality?.id} value={speciality?.name}>
                                    {speciality?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('search-section_bar-wrapper')}>
                        <h4 className={cx('search-section_option-title')}>
                            <span>Tìm kiếm</span>
                        </h4>
                        <div className={cx('search-bar')}>
                            <input
                                className={cx('search-bar-textbox')}
                                type="text"
                                value={searchValue}
                                onChange={handleSearchChange}
                                placeholder='Nhập chủ đề'
                            ></input>
                            <button className={cx('search-bar-button')} onClick={handleSubmitSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                    <div className={cx('search-section_sort-wrapper')}>
                        <h4 className={cx('search-section_option-title')}>
                            <span>Sắp xếp</span>
                        </h4>
                        <select className={cx('sort')} name="sort" value={sortBy} onChange={handleSortChange}>
                            <option value="newest">Mới nhất</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={cx('forum-questions-wrapper')}>
                {(currentPosts || []).map((post) => {
                    return <ForumItem data={post} onHashtagClick={handleHashtagClick}></ForumItem>;
                })}
            </div>
            {displayedPosts.length > 4 && (
                <div className={cx('pagination-wrapper')}>
                    <div className={cx('pagination')}>
                        <Pagination
                            totalPosts={displayedPosts.length}
                            postsPerPage={postPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        ></Pagination>
                    </div>
                </div>
            )}

            <PageTitle>ĐẶT CÂU HỎI</PageTitle>
            <div className={cx('forum-form')}>
                <div className={cx('user-avatar-section')}>
                    <Image
                        className={cx('user-avatar')}
                        src={userInfo?.profile_image}
                        fallback={assets.UserImage}
                    ></Image>
                </div>
                <div className={cx('question-info-section')}>
                    <div className={cx('question-info')}>
                        <div className={cx('question_faculty-wrapper')}>
                            <h4 className={cx('question_option-title')}>
                                <span>Chọn khoa tư vấn</span>
                            </h4>
                            <select
                                className={cx('question-faculty')}
                                name="faculty"
                                value={formSelectedFaculty}
                                onChange={handleFormFacultyChange}
                            >
                                {specialityHook.map((speciality) => (
                                    <option key={speciality?.id} value={speciality?.name}>
                                        {speciality?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('question_topic-wrapper')}>
                            <h4 className={cx('question_option-title')}>
                                <span>Chủ đề thảo luận</span>
                            </h4>
                            <textarea
                                name="topic"
                                placeholder='Nhập chủ đề'
                                className={cx('question-topic')}
                                value={postTitle}
                                onChange={(e) => {
                                    setPostTitle(e.target.value);
                                }}
                                rows="4"
                                cols="50"
                            ></textarea>
                        </div>
                    </div>
                    <div className={cx('question-content-wrapper')}>
                        <div className={cx('question_content')}>
                            <h4 className={cx('question_option-title')}>
                                <span>Đặt câu hỏi</span>
                            </h4>
                            <textarea
                                name="question"
                                placeholder='Nhập câu hỏi'
                                className={cx('question')}
                                value={postContent}
                                onChange={(e) => {
                                    setPostContent(e.target.value);
                                }}
                                rows="4"
                                cols="50"
                            ></textarea>
                            <div className={cx('submit-button-container')}>
                                <Button submitTwo onClick={handleSubmitForm} type="button">
                                    GỬI CÂU HỎI
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forum;
