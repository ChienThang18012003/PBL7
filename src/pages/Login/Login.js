import React, { useState } from 'react';
import {
    Deco2, Deco3, Deco4,
    LoginButton,
    LoginContainer, LoginDeco, LoginDeco2,
    LoginHeader,
    LoginItem, LoginItemAndHeader,
    LoginItemList,
    LoginLayout,
    LoginLink
} from "./login.element";
import useAccount from '../../hook/useAccount';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkLogin] = useAccount();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email === "") {
            toast.error("Vui lòng nhập email!");
        }
        else if (password === "") {
            toast.error("Vui lòng nhập password!");
        }
        else {
            const isLoginSuccess = await checkLogin(email, password);
            if (isLoginSuccess === null) {
                toast.error("Tài khoản hoặc mật khẩu không tồn tại!");
            }
            else {
                 localStorage.setItem('isLoginSuccess', JSON.stringify(isLoginSuccess));
                 console.log("Login success");
                 navigate('/');
             }
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <ToastContainer position="top-right" autoClose={3000} />
            <LoginLayout>
                <LoginContainer>
                    <LoginDeco>
                        <Deco2 />
                    </LoginDeco>

                    <LoginItemAndHeader>
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
                            <LoginLink>Quên mật khẩu</LoginLink>
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
