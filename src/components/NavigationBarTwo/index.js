import classNames from 'classnames/bind';
import styles from './NavigationBarTwo.module.scss';
import Image from '../Image';
import { assets } from '../../assets/assets_fe/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import useAccount from '../../hook/useAccount';

const cx = classNames.bind(styles);

function NavigationBarTwo() {
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
                </div>
                <div className={cx('like-wrapper')}>
                </div>
                <div className={cx('search-bar-wrapper')}>
                </div>
                <div className={cx('cart-wrapper')}>
                    <div className={cx('buttons-container')}>
                        {
                            isLoggedin ? (
                              <div className={cx('profile-wrapper')}>
                                <div className={cx('user-wrapper')} onClick={()=>{navigate('/admin-account')}}>
                                    <Image className={cx('profile-image')} src={userInfo?.profile_image} fallback={assets.UserImage}></Image>
                                    <div className={cx('user-name')}>
                                        <span>
                                            {userInfo?.username}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('navigate-button-wrapper')}>
                                    <div className={cx('navigate-button')} onClick={() => {
                                        const userConfirmed = window.confirm("Bạn có chắc muốn đăng xuất không ?")
                                        if (userConfirmed) {
                                            localStorage.removeItem('isLoginSuccess');
                                            if (window.location.pathname === '/account') {
                                                navigate('/sign-in', { replace: true });
                                            } else {
                                                navigate('/sign-in');
                                            }
                                            window.location.reload();
                                        }
                                    }}>
                                        <FontAwesomeIcon className={cx('button-icon')} icon={faRightToBracket}></FontAwesomeIcon>
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
                                    <div className={cx('register-button-wrapper')} onClick={()=>{navigate('sign-up')}}>
                                        <div className={cx('register-icon-wrapper')}>
                                            <FontAwesomeIcon icon={faUserPlus} className={cx('icon')} ></FontAwesomeIcon>
                                        </div>
                                    </div>
                                    <div className={cx('register-button-content')}>
                                        <div className={cx('register-text')}>
                                            <span>
                                                Đăng ký
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('separator')}>
                                    </div>
                                    <div className={cx('login-button-wrapper')} onClick={()=>{navigate('sign-in')}}>
                                        <div className={cx('login-icon-wrapper')}>
                                            <FontAwesomeIcon icon={faRightToBracket} className={cx('icon2')} ></FontAwesomeIcon>
                                        </div>
                                    </div>
                                    <div className={cx('login-button-content')}>
                                        <div className={cx('login-text')}>
                                            <span>
                                                Đăng nhập
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

export default NavigationBarTwo;
