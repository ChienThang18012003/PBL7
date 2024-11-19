import classNames from 'classnames/bind';
import styles from './Forum.module.scss';
import PageTitle from '../../components/PageTitle';
import BlogItem from '../../components/BlogItem';
import Button from '../../components/Button';
import { useState, useEffect } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ForumItem from '../../components/ForumItem';

const cx = classNames.bind(styles);

function Forum() {
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
                        <select className={cx('faculty')} name="faculty">
                            <option value="nhi">Khoa nhi</option>
                            <option value="noi">Khoa nội</option>
                            <option value="rang">Răng hàm mặt</option>
                        </select>
                    </div>
                    <div className={cx('search-section_bar-wrapper')}>
                        <h4 className={cx('search-section_option-title')}>
                            <span>Tìm kiếm</span>
                        </h4>
                        <div className={cx('search-bar')}>
                            <input className={cx('search-bar-textbox')} type="text"></input>
                            <button className={cx('search-bar-button')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                    <div className={cx('search-section_sort-wrapper')}>
                        <h4 className={cx('search-section_option-title')}>
                            <span>Sắp xếp</span>
                        </h4>
                        <select className={cx('sort')} name="sort">
                            <option value="new">Mới nhất</option>
                            <option value="comment">Nhiều bình luận nhất</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={cx('forum-questions-wrapper')}>
                <ForumItem></ForumItem>
                <ForumItem></ForumItem>
                <ForumItem></ForumItem>
                <ForumItem></ForumItem>
            </div>
            <PageTitle>ĐẶT CÂU HỎI</PageTitle>
            <form className={cx('forum-form')}>
                <div className={cx('user-avatar-section')}>
                    <img
                        className={cx('user-avatar')}
                        src="https://cdn.pixabay.com/photo/2021/03/20/11/57/woman-6109643_1280.jpg"
                    ></img>
                </div>
                <div className={cx('question-info-section')}>
                    <div className={cx('question-info')}>
                        <div className={cx('question_faculty-wrapper')}>
                            <h4 className={cx('question_option-title')}>
                                <span>Chọn khoa tư vấn</span>
                            </h4>
                            <select className={cx('faculty')} name="faculty">
                                <option value="nhi">Khoa nhi</option>
                                <option value="noi">Khoa nội</option>
                                <option value="rang">Răng hàm mặt</option>
                            </select>
                        </div>
                        <div className={cx('question_topic-wrapper')}>
                            <h4 className={cx('question_option-title')}>
                                <span>Chủ đề thảo luận</span>
                            </h4>
                            <textarea name="topic" className={cx('question-topic')} rows="4" cols="50"></textarea>
                        </div>
                    </div>
                    <div className={cx('question-content-wrapper')}>
                        <div className={cx('question_content')}>
                            <h4 className={cx('question_option-title')}>
                                <span>Đặt câu hỏi</span>
                            </h4>
                            <textarea name="question" className={cx('question')} rows="4" cols="50"></textarea>
                            <div className={cx('submit-button-container')}>
                                <Button submitTwo>GỬI CÂU HỎI</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Forum;
