import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import useAccount from '../../hook/useAccount';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkLogin] = useAccount();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const handleLogin = async () => {
        if (email === "") {
            toast.warning("Vui lòng nhập email!");
        }
        else if (password === "") {
            toast.warning("Vui lòng nhập password!");
        }
        else {
            const isLoginSuccess = await checkLogin(email, password);
            if (isLoginSuccess && typeof isLoginSuccess === 'object') {
                if (isLoginSuccess?.role === 'admin') {
                    localStorage.setItem('isLoginSuccess', JSON.stringify(isLoginSuccess));
                    navigate('/');
                } else {
                    toast.warning("Tài khoản của bạn không có quyền đăng nhập vào trang Admin!");
                    return;
                }
            }
            else if (isLoginSuccess && typeof isLoginSuccess !== 'object') {
                toast.error(isLoginSuccess);
            }
            else {
                toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className={cx('login-background')}>
                <Image className={cx('background')} src={assets.LoginBackground}></Image>
            </div>
            <div className={cx('login-form')}>
                <div className={cx('login-title')}>
                    <span>
                        Đăng nhập
                    </span>
                </div>
                <div className={cx('input-field')}>
                    <input className={cx('password-field')} type='text' placeholder='username' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FontAwesomeIcon icon={faUser}  className={cx('eye-icon')}></FontAwesomeIcon>
                </div>
                <div className={cx('input-field')}>
                    <input className={cx('password-field')} type={isVisible ? 'text' : 'password'} placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} onClick={()=>{setIsVisible(!isVisible)}} className={cx('eye-icon')}></FontAwesomeIcon>
                </div>
                <div className={cx('forgot-pass-link-wrapper')}>
                    <a className={cx('forgot-pass-link')} onClick={()=>{navigate('/forgot-password')}}>
                        <span>
                            Quên mật khẩu?
                        </span>
                    </a>
                </div>
                <button className={cx('login-button')}>
                    <h1 className={cx('login-button-text')} onClick={handleLogin}>
                        Đăng nhập
                    </h1>
                </button>
                <div className={cx('sign-up-link-wrapper')}>
                    <div className={cx('sign-up-title')}>
                        <span>
                            Chưa có tài khoản?
                        </span>
                    </div>
                    <a className={cx('sign-up-link')} onClick={()=>{navigate('/sign-up')}}>
                        <span>
                            Đăng ký
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SignIn;