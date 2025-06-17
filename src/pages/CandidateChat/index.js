import classNames from 'classnames/bind';
import styles from './CandidateChat.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import useAccount from '../../hook/useAccount';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import 'react-toastify/dist/ReactToastify.css';
import useResumeApplied from '../../hook/useResumeApplied';
import useConversation from '../../hook/useConversation';
import useMessage from '../../hook/useMessage';
import useDebounce from '../../hook/useDebounce';

const cx = classNames.bind(styles);

function CandidateChat() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const [employerInfo, setEmployerInfo] = useState({});
    const [displayedResumeApplied, setDisplayedResumeApplied] = useState([]);
    const [resumeAppliedLoading, resumeAppliedHook, getResumeAppliedByEmail, getSpecificResumeApplied, addResumeApplied, deleteResumeApplied, updateResumeApplied, countResumeAppliedByUser, statisticResumeAppliedByDate, statisticResumeAppliedByStatus, getDistictResumeApplied] = useResumeApplied();
    const [conversationLoading, conversationHook, addConversation, getConversationByEmail] = useConversation();
    const [messageLoading, messageHook, addMessage, getMessageBetweenUsers, getNewMessage] = useMessage();
    const [allConversation, setAllConversation] = useState([]);
    const [currentConversation, setCurrentConversation] = useState({});
    const [currentReceiver, setCurrentReceiver] = useState({})
    const [allMessage, setAllMessage] = useState([]);
    const [chatContent, setChatContent] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [displayedConversation, setDisplayedConversation] = useState([]);
    const debounced = useDebounce(searchValue, 500);
    const chatEndRef = useRef(null);
    useEffect(() => {
        if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [allMessage]);

    useEffect(() => {
    if (!debounced.trim()) {
        setDisplayedConversation(allConversation || []);
        return;
    }

    const fetchSearchResult = () => {
            const lowerDebounced = debounced.toLowerCase();

            const filteredConversations = (allConversation || []).filter((conversation) => {
                const otherMember = (conversation.members || []).find(
                    (member) => member.email !== email
                );

                return (
                    otherMember &&
                    otherMember.username?.toLowerCase().includes(lowerDebounced)
                );
            });
            setDisplayedConversation(filteredConversations);
        };

        fetchSearchResult();
    }, [debounced, allConversation]);


    useEffect(()=>{
        const fetchEmailAndRole = () =>{
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email) setEmail(obj?.email);
                if (obj?.role) setRole(obj?.role);
            }
        }
        fetchEmailAndRole();
    },[])

    useEffect(() => {
    let isMounted = true;

    const pollNewMessages = async () => {
        if (!currentConversation?._id || allMessage.length === 0) return;

            const lastTime = allMessage[allMessage.length - 1]?.createdAt;
            try {
                const newMessages = await getNewMessage(currentConversation._id, lastTime);
                if (newMessages?.length > 0 && isMounted) {
                    setAllMessage(prev => [...prev, ...newMessages]);
                }
            } catch (err) {
                console.error('Lỗi khi polling:', err);
            } finally {
                if (isMounted) {
                    setTimeout(pollNewMessages, 2000); // lặp lại sau 2s
                }
            }
        };

        if (currentConversation?._id && allMessage.length > 0) {
            pollNewMessages();
        }

        return () => {
            isMounted = false;
        };
    }, [currentConversation, allMessage]);

    useEffect(()=>{
        const fetchResumeApplied = async() => {
            const resume = await getDistictResumeApplied(email, role);
            if (resume) {setEmployerInfo(resume?.user); setDisplayedResumeApplied(resume?.distinctEmployers);}
        }
        const fetchConversation = async() => {
            const conversation = await getConversationByEmail(email);
            if (conversation) {setAllConversation(conversation); setDisplayedConversation(conversation)};
        }
        if (email && role) {
            fetchResumeApplied();
            fetchConversation();
        }
    },[email, role])

    function formatDateTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();

        const isToday =
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        const pad = (n) => String(n).padStart(2, '0');

        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());

        if (isToday) {
            return `Hôm nay ${hours}:${minutes}`;
        }

        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }



    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-section')}>
                <div className={cx('nav-wrapper')}>
                    <div className={cx('logo-container')}>
                        <Image className={cx('logo')} src={assets.PhoneLogo}></Image>
                    </div>
                    <div className={cx('nav-button')} onClick={()=>{navigate('/')}}>
                        <FontAwesomeIcon icon={faArrowLeft} className={cx('nav-button-icon')}></FontAwesomeIcon>
                        <div className={cx('nav-button-text')}>
                            <span>
                                Về trang chủ
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('input-container')}>
                    <input placeholder='Nhập tên ứng viên' type='text' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} className={cx('user-input-field')}></input>
                </div>
                <div className={cx('chat-member-container')}>
                {(displayedConversation || []).map((conversation, index) => {
                    const otherMember = (conversation.members || []).find(
                    (member) => member.email !== email
                    );

                    if (!otherMember) return null;

                    return (
                    <div className={cx('chat-member-item')} key={index} onClick={async()=>{
                        setCurrentConversation(conversation);
                        setCurrentReceiver(otherMember);
                        const messages = await getMessageBetweenUsers(email, otherMember?._id);
                        console.log(messages);
                        if (messages) setAllMessage(messages?.messages);
                    }}>
                        <Image
                        src={otherMember?.profile_image || ''}
                        fallback={assets.UserImage}
                        className={cx('chat-member-avatar')}
                        />
                        <div className={cx('chat-member-info')}>
                        <div className={cx('chat-member-name')}>
                            <span>{otherMember?.username}</span>
                        </div>
                        <div className={cx('chat-member-email')}>
                            <span>{otherMember?.email}</span>
                        </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
            <div className={cx('chat-section')}>
                <div className={cx('chat-member-item-two')}>
                    {
                        Object.keys(currentReceiver).length !== 0 && (
                            <>
                                <Image src={currentReceiver?.profile_image || ''} fallback={assets.UserImage} className={cx('chat-member-avatar-two')}></Image>
                                <div className={cx('chat-member-info-two')}>
                                    <div className={cx('chat-member-name')}>
                                        <span>
                                            {currentReceiver?.username}
                                        </span>
                                    </div>
                                    <div className={cx('chat-member-email')}>
                                        <span>
                                            {currentReceiver?.email}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className={cx('chat-content-wrapper')}>
                    {
                        (allMessage || []).map((message, index) => {
                            let isSender;
                            if (message?.senderId?.email === email) {isSender=true} else {isSender=false};
                            return (
                                isSender ? (
                                    <div className={cx('right-chat-item')}>
                                        <div className={cx('right-chat-content-wrapper')}>
                                            <div className={cx('right-chat-content-container')}>
                                                <div className={cx('right-chat-content')}>
                                                    <span>
                                                        {message?.text}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={cx('right-chat-timestamp')}>
                                                <span>
                                                    {formatDateTime(message?.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                        <Image src={message?.senderId?.profile_image || ''} fallback={assets.UserImage} className={cx('right-chat-avatar')}></Image>
                                    </div>
                                ) : (
                                    <div className={cx('left-chat-item')}>
                                        <Image src={message?.senderId?.profile_image || ''} fallback={assets.UserImage} className={cx('left-chat-avatar')}></Image>
                                        <div className={cx('left-chat-content-wrapper')}>
                                            <div className={cx('left-chat-content-container')}>
                                                <div className={cx('left-chat-content')}>
                                                    <span>
                                                        {message?.text}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={cx('left-chat-timestamp')}>
                                                <span>
                                                    {formatDateTime(message?.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        })
                    }
                    <div ref={chatEndRef} />
                </div>
                <div className={cx('chat-bar-wrapper')}>
                    {
                        Object.keys(currentReceiver).length !== 0 && (
                            <>
                                <div className={cx('input-container-two')}>
                                    <input placeholder='Nhập nội dung chat' type='text' value={chatContent} onChange={(e)=>{setChatContent(e.target.value)}} className={cx('user-input-field')}></input>
                                </div>
                                <button className={cx('nav-button-two')} disabled={chatContent ? false : true} onClick={async()=>{
                                    const newMessage = await addMessage(currentConversation?._id, email, chatContent);
                                    if (newMessage) setAllMessage((prev) => [...prev, newMessage]);
                                    setChatContent('');
                                }}>
                                    <div className={cx('nav-button-text-two')}>
                                        <span>
                                            Gửi
                                        </span>
                                    </div>
                                    <FontAwesomeIcon icon={faPaperPlane} className={cx('nav-button-icon-two')}></FontAwesomeIcon>
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
            <div className={cx('apply-section')}>
                <div className={cx('apply-title-container')}>
                    <div className={cx('apply-title')}>
                        <span>
                            CÔNG TY ĐÃ ỨNG TUYỂN
                        </span>
                    </div>
                </div>
                <div className={cx('apply-container')}>
                    {
                        (displayedResumeApplied || []).map((resume, index)=>(
                            <div className={cx('apply-member-item')} key={index}>
                                <Image src={resume?.profile_image || ''} fallback={assets.UserImage} className={cx('chat-member-avatar')}></Image>
                                <div className={cx('apply-member-info')}>
                                    <div className={cx('chat-member-name')}>
                                        <span>
                                            {resume?.username || 'Chưa xác định'}
                                        </span>
                                    </div>
                                    <div className={cx('chat-member-email')}>
                                        <span>
                                            {resume?.email || 'Chưa xác định'}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('chat-button-container')}>
                                    <button className={cx('chat-button')} onClick={async()=>{
                                        const newConversation = await addConversation(email, resume?._id);
                                        if (!newConversation) return;

                                        const exists = allConversation.some(convo => convo._id === newConversation._id);
                                        if (!exists) {
                                            setAllConversation(prev => [...prev, newConversation]);
                                        }

                                        setCurrentConversation(newConversation);
                                    }}>
                                        <FontAwesomeIcon icon={faPaperPlane} className={cx('chat-button-icon')}></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CandidateChat;