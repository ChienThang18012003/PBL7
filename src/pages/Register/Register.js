import React, { useState } from 'react';
import {
    Deco,
    RBody,
    RBodyL,
    RBodyLItem,
    RBodyR,
    RBodyRItem,
    RButton, RContent,
    RHeader,
    RLayout,
    RSpace
} from "./register.element";
import {Deco2} from "../Login/login.element";
import useAccount from '../../hook/useAccount';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [ , signUp] = useAccount();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rewritePassword, setRewritePassword] = useState('');
    const [role, setRole] = useState('0');
    const [phone, setPhone] = useState('');  
    const navigate = useNavigate();

    const handleSubmitSignUp = async() => {
        if (userName === ''){
            toast.warning("Vui lòng nhập Họ và tên!");
        } 
        else if (password === ''){
            toast.warning("Vui lòng nhập mật khẩu!");
        }
        else if (rewritePassword === ''){
            toast.warning("Vui lòng nhập lại mật khẩu!");
        }
        else if (email === ''){
            toast.warning("Vui lòng nhập email!");
        }
        else if (phone === ''){
            toast.warning("Vui lòng nhập số điện thoại");
        }
        else if (rewritePassword !== password){
            toast.warning("Mật khẩu nhập lại không chính xác!");
        }
        else {
            const SignUpInfo = await signUp(email, password, userName, phone, role);
            if (SignUpInfo && typeof SignUpInfo === 'object') {
                localStorage.setItem('SignUpInfo', JSON.stringify(SignUpInfo));
                alert("Đăng ký tài khoản thành công, vui lòng kiểm tra email để kích hoạt tài khoản!")
                 navigate('/login');
                
            }
            else if (SignUpInfo && typeof SignUpInfo !== 'object') {
                toast.error(SignUpInfo);
            }
            else {
                toast.error("Đăng ký tài khoản thất bại, vui lòng thử lại sau!");
            }
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <ToastContainer position="top-right" autoClose={3000} />
            <RLayout>
                <RHeader>

                    <Deco>
                        <h1>Đăng kí tài khoản</h1>
                    </Deco>
                </RHeader>
                <RBody>
                    <RContent>
                        <RSpace/>
                        <RBodyL>
                            <RBodyLItem>
                                <p>Họ và tên</p>
                                <input type='text' autoFocus value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                            </RBodyLItem>
                            <RBodyLItem>
                                <p>Mật khẩu</p>
                                <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                            </RBodyLItem>
                            <RBodyLItem>
                                <p>Xác nhận lại mật khẩu</p>
                                <input type='password' value={rewritePassword} onChange={(e) => {setRewritePassword(e.target.value)}}/>
                            </RBodyLItem>


                        </RBodyL>
                        <RBodyR>
                            <RBodyRItem>
                                <p>Email</p>
                                <input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                            </RBodyRItem>
                            <RBodyRItem>
                                <p>Số điện thoại</p>
                                <input type='number' value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                            </RBodyRItem>
                            <RBodyRItem>
                                <p>Bạn là</p>
                                <select value={role} onChange={(e) => {setRole(e.target.value)}}>
                                    <option value="0">Người dùng</option>
                                    <option value="1">Bác sĩ</option>
                                </select>

                            </RBodyRItem>

                        </RBodyR>
                        <RSpace/>
                    </RContent>

                    <RButton>
                        <button onClick={handleSubmitSignUp}>Đăng ký</button>
                    </RButton>
                </RBody>


            </RLayout>


        </form>
    );
};

export default Register;
