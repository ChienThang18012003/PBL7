import classNames from 'classnames/bind';
import styles from './NavigationBar.module.scss';
import Image from '../Image';
import { assets } from '../../assets/assets_fe/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faRightToBracket, faBriefcase, faBuilding, faUser, faFile, faMessage, faRightFromBracket, faHome } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import useAccount from '../../hook/useAccount';

const cx = classNames.bind(styles);

function NavigationBar() {
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
    const [hoveredButton, setHoveredButton] = useState('');


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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('logo-wrapper')}>
                    <div className={cx('logo-container')}>
                        <Image className={cx('logo')} src={assets.PhoneLogo}></Image>
                    </div>
                </div>
                <div className={cx('filter-wrapper')}>
                    <button className={cx('filter-button')} onClick={()=>{navigate('/')}}>
                        <FontAwesomeIcon className={cx('like-icon')} icon={faHome}></FontAwesomeIcon>
                        <div>
                            <span>
                                Trang chủ
                            </span>
                        </div>
                    </button>
                    <button className={cx('filter-button')} onClick={()=>{navigate('/job-post')}}>
                        <FontAwesomeIcon className={cx('like-icon')} icon={faBriefcase}></FontAwesomeIcon>
                        <div>
                            <span>
                                Việc làm
                            </span>
                        </div>
                    </button>
                    <button className={cx('filter-button')} onClick={()=>{navigate('/company')}}>
                        <FontAwesomeIcon className={cx('like-icon')} icon={faBuilding}></FontAwesomeIcon>
                        <div>
                            <span>
                                Công ty
                            </span>
                        </div>
                    </button>
                </div>
                <div className={cx('like-wrapper')}>
                </div>
                <div className={cx('search-bar-wrapper')}>
                    {
                        isLoggedin && (
                            <button className={cx('filter-button-two')} onClick={()=>{navigate('/candidate-chat')}}>
                                <FontAwesomeIcon className={cx('filter-icon')} icon={faMessage}></FontAwesomeIcon>
                            </button>
                        )
                    }
                </div>
                <div className={cx('cart-wrapper')}>
                    <div className={cx('buttons-container')}>
                        {
                            isLoggedin ? (
                              <div className={cx('profile-wrapper')}>
                                <div className={cx('user-wrapper')} onClick={()=>{navigate('/account')}}>
                                    <Image className={cx('profile-image')} src={userInfo?.profile_image} fallback={assets.UserImage}></Image>
                                    <div className={cx('user-name')}>
                                        <span>
                                            {userInfo?.username}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('navigate-button-wrapper')}>
                                    <div className={cx('navigate-button')} onClick={()=>{navigate('/account')}}>
                                        <FontAwesomeIcon className={cx('button-icon')} icon={faUser}></FontAwesomeIcon>
                                        <div className={cx('button-text')}>
                                            <span>
                                                Trang cá nhân
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('navigate-button')} onClick={()=>{navigate('/job-profile')}}>
                                        <FontAwesomeIcon className={cx('button-icon')} icon={faFile}></FontAwesomeIcon>
                                        <div className={cx('button-text')}>
                                            <span>
                                                Hồ sơ việc làm
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('navigate-button')} onClick={()=>{navigate('/company-followed')}}>
                                        <FontAwesomeIcon className={cx('button-icon')} icon={faBuilding}></FontAwesomeIcon>
                                        <div className={cx('button-text')}>
                                            <span>
                                                Công ty đã theo dõi
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('navigate-button')} onClick={()=>{navigate('/job-post-saved')}}>
                                        <FontAwesomeIcon className={cx('button-icon')} icon={faBriefcase}></FontAwesomeIcon>
                                        <div className={cx('button-text')}>
                                            <span>
                                                Việc làm đã lưu
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('navigate-button')} onClick={()=>{navigate('/applied-job')}}>
                                        <FontAwesomeIcon className={cx('button-icon')} icon={faUser}></FontAwesomeIcon>
                                        <div className={cx('button-text')}>
                                            <span>
                                                Việc làm đã ứng tuyển
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('navigate-button')} onClick={() => {
                                        const userConfirmed = window.confirm("Bạn có chắc muốn đăng xuất không ?")
                                        if (userConfirmed) {
                                            localStorage.removeItem('isLoginSuccess');
                                            localStorage.removeItem('chatMessages')
                                            if (window.location.pathname === '/account') {
                                                navigate('/sign-in', { replace: true });
                                            } else {
                                                navigate('/sign-in');
                                            }
                                            window.location.reload();
                                        }
                                    }}>
                                        <FontAwesomeIcon className={cx('button-icon')} icon={faRightFromBracket}></FontAwesomeIcon>
                                        <div className={cx('button-text')}>
                                            <span>
                                                Đăng xuất
                                            </span>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            ) : (
                                <>
                                    <div className={cx('register-button-wrapper')} onClick={()=>{navigate('sign-up')}} onMouseEnter={() => setHoveredButton('register')} onMouseLeave={() => setHoveredButton('')}>
                                        <div className={cx('register-icon-wrapper')}>
                                            <FontAwesomeIcon icon={faUserPlus} className={cx('icon')} ></FontAwesomeIcon>
                                        </div>
                                    </div>
                                    <div className={cx('register-button-content')}>
                                        <div className={cx('register-text')}>
                                            <span>
                                                {hoveredButton === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('separator')}>
                                    </div>
                                    <div className={cx('login-button-wrapper')} onClick={()=>{navigate('sign-in')}} onMouseEnter={() => setHoveredButton('login')} onMouseLeave={() => setHoveredButton('')}>
                                        <div className={cx('login-icon-wrapper')}>
                                            <FontAwesomeIcon icon={faRightToBracket} className={cx('icon2')} ></FontAwesomeIcon>
                                        </div>
                                    </div>
                                    <div className={cx('login-button-content')}>
                                        <div className={cx('login-text')}>
                                            <span>
                                                {hoveredButton === 'register' ? 'Đăng ký' : 'Đăng nhập'}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;
