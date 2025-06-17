import classNames from 'classnames/bind';
import styles from './Chatbot.module.scss';
import Image from '../Image';
import { assets } from '../../assets/assets_fe/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import useAccount from '../../hook/useAccount';
import useJobPost from '../../hook/useJobPost';
import { useAppContext } from '../../context/AppContext';

const cx = classNames.bind(styles);

function Chatbot() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    changeAccountInfo,
    getAccountByEmail
    ] = useAccount();
    const [isChatboxVisible, setIsChatBotVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [
        jobPostHook,
        jobPostLoading,
        getAllJobPosts,
        filterJobPostList,
        searchJobPost,
        getJobPost,
        updateJobPostView,
        getJobPostByEmail,
        addJobPost,
        updateJobPost,
        deleteJobPost,
        getJobPostNameByEmail,
        getJobPostByCompany,
        countJobPostByUser,
        statisticJobPostByAcademicLevel,
        statisticTop5JobPostByResumeApplied,
        getJobPostByIds,
        suggestJobPostByEmail,
        extractIntent,
        answerLoading
    ] = useJobPost();
    const { chatMessages, setChatMessages } = useAppContext();
    const chatEndRef = useRef(null);
    useEffect(() => {
        if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    const renderResults = (message) => {

        switch (message?.intent) {
        case "find_job":
            return (
            <>
                <p>{message?.reply}</p>
                <ul>
                {(message?.results||[]).map((job) => (
                    <li key={job?._id} style={{marginLeft: "20px"}}>
                    <a onClick={() => navigate(`/job-info/${job?._id}`)} style={{ cursor: "pointer", color: "blue" }}>
                        {job?.job_name}
                    </a>
                    </li>
                ))}
                </ul>
            </>
            );

        case "find_company":
            return (
            <>
                <p>{message?.reply}</p>
                <ul>
                {(message?.results||[]).map((company) => (
                    <li key={company?._id} style={{marginLeft: "20px"}}>
                    <a onClick={() => navigate(`/company-info/${company?._id}`)} style={{ cursor: "pointer", color: "blue" }}>
                        {company?.company_name}
                    </a>
                    </li>
                ))}
                </ul>
            </>
            );

        case "find_resume":
            return (
            <>
                <p>{message?.reply}</p>
                <ul style={{marginLeft: "20px"}}>
                {(message?.results||[]).map((resume) => (
                    <li key={resume?._id}>{resume?.desired_position}</li>
                ))}
                </ul>
            </>
            );

        case "find_applications":
            return (
            <>
                <p>{message?.reply}</p>
                <ul>
                {(message?.results||[]).map((app, idx) => (
                    <li key={idx} style={{marginLeft: "20px"}}>
                    {app?.job_name} sử dụng hồ sơ {app?.resume_name || ""}
                    </li>
                ))}
                </ul>
            </>
            );

        case "tutorial":
        case "other_question":
        case "unknown":
            return <p>{message?.reply}</p>;

        default:
            return <p>Tôi không hiểu câu hỏi của bạn, vui lòng đặt lại câu hỏi khác.</p>;
        }
    };


    useEffect(() => {
        const fetchAccount = async() => {
            let item = localStorage.getItem('isLoginSuccess');

            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    const AccountInfo = await getAccountByEmail(obj?.email);
                    if (AccountInfo?.role) setRole(AccountInfo?.role);
                    setUserInfo(AccountInfo);
                }
                else {
                    navigate('/login');
                    return;
                }
                
            }
        }
        setIsLoggedin(isObjectInLocalStorage('isLoginSuccess'));
        fetchAccount();
    }, []);

    const isObjectInLocalStorage = (key) => {
        const storedData = localStorage.getItem(key);
    
        if (storedData === null) {
            return false;
        }
    
        try {
            const parsedData = JSON.parse(storedData);
            return parsedData !== null;
        } catch (error) {
            return false;
        }
    };

    const handleSubmitQuestion = async () => {
        const userMessage = searchValue;
        setSearchValue('');
        setChatMessages(prev => [...prev, { sender: 'user', message: userMessage }]);

        const botResponse = await extractIntent(userMessage);
        setChatMessages(prev => [...prev, { sender: 'bot', message: botResponse }]);
    };

    if (!isLoggedin) return (
        <>
        </>
    )

    return (
        <div className={cx('wrapper')} onClick={()=>{setIsChatBotVisible(!isChatboxVisible)}}>
            <Image className={cx('chatbot-image')} src={assets.ChatbotLogo}></Image>
            {
                isChatboxVisible && (
                    <div className={cx('chat-box-wrapper')} onClick={(e)=>{e.stopPropagation()}}>
                        <div className={cx('chat-box-header')}>
                            <Image className={cx('chat-box-icon')} src={assets.ChatbotIconOne}></Image>
                            <div className={cx('chat-box-title')}>
                                <span>
                                    Chatbot AI
                                </span>
                            </div>
                            <FontAwesomeIcon icon={faChevronDown} className={cx('drop-down-icon')} onClick={()=>{setIsChatBotVisible(false)}}></FontAwesomeIcon>
                        </div>
                        <div className={cx('chat-wrapper')}>
                            {chatMessages.map((chat, index) => (
                                chat.sender === 'user' ? (
                                    <div key={index} className={cx('right-chat-item')}>
                                        <div className={cx('right-chat-content-wrapper')}>
                                            <div className={cx('right-chat-content-container')}>
                                                <div className={cx('right-chat-content')}>
                                                    <span>{chat?.message}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={index} className={cx('left-chat-item')}>
                                        <Image src={assets.ChatbotIconTwo} className={cx('left-chat-avatar')} />
                                        <div className={cx('left-chat-content-wrapper')}>
                                            <div className={cx('left-chat-content-container')}>
                                                <div className={cx('left-chat-content')}>
                                                    <span>{renderResults(chat?.message)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                            {
                                answerLoading && (
                                    <div className={cx('left-chat-item')}>
                                        <Image src={assets.ChatbotIconTwo} className={cx('left-chat-avatar')} />
                                        <div className={cx('left-chat-content-wrapper')}>
                                            <div className={cx('left-chat-content-container')}>
                                                <Image src={assets.TextLoading} className={cx('text-loading')}></Image>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div ref={chatEndRef} />
                        </div>
                        <div className={cx('chat-box-container')}>
                            <input type='text' className={cx('chat-box')} placeholder='Nhập câu hỏi...' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
                            <button className={cx('chat-box-button')} disabled={!searchValue} onClick={handleSubmitQuestion}>
                                <FontAwesomeIcon icon={faPaperPlane} className={cx('chatbox-button-icon')}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Chatbot;
