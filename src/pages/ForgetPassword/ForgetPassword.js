import React, { useState } from 'react';
import {
    Deco2, Deco4,
    LoginButton,
    LoginContainer, LoginDeco, LoginDeco2,
    LoginHeader,
    LoginItem, LoginItemAndHeader,
    LoginItemList,
    LoginLayout,
    LoginLink
} from "./ForgetPassword.element";
import useAccount from '../../hook/useAccount';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [, , , , , , , , , , , , , , , forgotPassword] = useAccount();
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        if (email===""){
            alert("Bạn chưa nhập email!");
            return;
        }
        else{
            const forgetPassword = await forgotPassword(email);
            navigate("/login");
        }
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
                        <LoginHeader>Quên mật khẩu</LoginHeader>
                        <LoginItemList>
                            <LoginItem>
                                <p>Nhập email của bạn để lấy lại tài khoản</p>
                                <input autoFocus value={email} placeholder='Nhập email' onChange={(e) => setEmail(e.target.value)} type='email' />
                            </LoginItem>
                            <LoginButton onClick={handleForgotPassword}>
                                 Lấy lại mật khẩu
                            </LoginButton>
                            <LoginLink></LoginLink>
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

export default ForgetPassword;
