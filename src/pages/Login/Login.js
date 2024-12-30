import React, { useState } from 'react';
import {
    Deco2, Deco4,
    LoginButton,
    LoginContainer, LoginDeco, LoginDeco2,
    LoginHeader,
    LoginItem, LoginItemAndHeader,
    LoginItemList,
    LoginLayout,
    LoginLink,
    LoginItem2,
    LoginLink2,
    LoginLogo
} from "./login.element";
import useAccount from '../../hook/useAccount';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../assets/assets_fe/assets';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkLogin] = useAccount();
    const navigate = useNavigate();

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
                localStorage.setItem('isLoginSuccess', JSON.stringify(isLoginSuccess));
                 navigate('/');
            }
            else if (isLoginSuccess && typeof isLoginSuccess !== 'object') {
                toast.error(isLoginSuccess);
            }
            else {
                toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
            }
        }
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    const handleLogoClick = () => {
        navigate("/");
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <ToastContainer position="top-right" autoClose={3000} />
            <LoginLayout>
                <LoginContainer>
                    <LoginDeco>
                        <Deco2 />
                    </LoginDeco>

                    <LoginItemAndHeader>
                        <LoginLogo>
                            <img src={assets.MobileLogo} onClick={handleLogoClick}></img>
                        </LoginLogo>
                        <LoginHeader>Đăng Nhập</LoginHeader>
                        <LoginItemList>
                            <LoginItem>
                                <p>Email</p>
                                <input autoFocus value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                            </LoginItem>
                            <LoginItem>
                                <p>Mật khẩu</p>
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </LoginItem>
                            <LoginButton onClick={handleLogin}>
                                Đăng Nhập
                            </LoginButton>
                            <LoginLink>
                                <p onClick={handleForgotPassword}>Quên mật khẩu?</p>
                            </LoginLink>
                            <LoginItem2>
                                <p>Bạn chưa có tài khoản?</p>
                                <LoginLink2 onClick={handleRegister}>Tạo tài khoản</LoginLink2>
                            </LoginItem2>
                        </LoginItemList>
                    </LoginItemAndHeader>

                    <LoginDeco2>
                        <Deco4 />
                    </LoginDeco2>
                </LoginContainer>
            </LoginLayout>
        </form>
    );
};

export default Login;
